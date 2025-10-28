# views.py
from rest_framework import generics, permissions
from django.db.models import Q
from .models import Task
from .serializers import TaskSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import get_object_or_404
# from utils.utils import notify_task_users
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from .notification import notify_task_users



class TaskCreateView(generics.CreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        task = serializer.save(owner=self.request.user)
        print(task,'task')
        channel_layer = get_channel_layer()

        # Send message to group
        async_to_sync(channel_layer.group_send)(
            "collab_tasks",
            {
                "type": "send_task_update",
                "data": {
                    "action": "created",
                    "message": "A new task was created!",
                    "task": {
                        "action": "created",
                        "id": task.id,
                        "title": task.title,
                        "status": task.status,
                        "owner": task.owner.username,
                    },
                },
            },
        )


class TaskListView(generics.ListAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        # Only return tasks where the user is the owner or a collaborator
        queryset = Task.objects.filter(
            Q(owner=user) | Q(collaborators__in=[user])
        ).distinct()

        # Optional: filter by status if provided
        status_filter = self.request.query_params.get('status')
        if status_filter and status_filter.lower() != 'all':
            queryset = queryset.filter(status__iexact=status_filter)

        return queryset


class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(Q(owner=user) | Q(collaborators=user)).distinct()

@api_view(['PUT'])
def update_task(request, pk):
    print("Updataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    task = get_object_or_404(Task, pk=pk)
    serializer = TaskSerializer(task, data=request.data, partial=True)

    if serializer.is_valid():
        task = serializer.save()
        channel_layer = get_channel_layer()

        # Send message to group
        async_to_sync(channel_layer.group_send)(
            "collab_tasks",
            {
                "type": "send_task_update",
                "data": {
                    "action": "created",
                    "message": "A task was updated!",
                    "task": {
                        "action": "updated",
                        "id": task.id,
                        "title": task.title,
                        "status": task.status,
                        "owner": task.owner.username,
                    },
                },
            },
        )
        # notify_task_users(task, action="updated")
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_task(request, pk):
    task = Task.objects.filter(pk=pk).first()
    if task is None:
        return Response({'error': 'Task not found.'}, status=status.HTTP_404_NOT_FOUND)
    task.delete()
    return Response({'message': 'Task deleted successfully'}, status=status.HTTP_200_OK)
    # if task.owner != request.user:
    #     return Response({'error': 'You do not have permission to delete this task.'}, status=status.HTTP_403_FORBIDDEN)