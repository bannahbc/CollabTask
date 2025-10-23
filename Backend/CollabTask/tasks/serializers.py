# serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Task

class UserSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']  # Add more fields if needed

class TaskSerializer(serializers.ModelSerializer):
    owner = UserSummarySerializer(read_only=True)
    collaborators = UserSummarySerializer(many=True, read_only=True)
    collaborator_ids = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        many=True,
        write_only=True,
        source='collaborators'
    )

    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'status', 'priority', 'due_date',
            'owner', 'collaborators', 'collaborator_ids',
            'created_at', 'updated_at'
        ]
