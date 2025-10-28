from django.urls import path
from .views import TaskCreateView, TaskListView, TaskDetailView,update_task,delete_task

urlpatterns = [
   path('tasks/', TaskListView.as_view(), name='task-list'),
    path('tasks/create/', TaskCreateView.as_view(), name='task-create'),
    path('tasks/<int:pk>/', TaskDetailView.as_view(), name='task-detail'),
    path('tasks/update/<int:pk>/', update_task, name='update-task'),
    path('tasks/delete/<int:pk>/', delete_task, name='delete-task'),
]
