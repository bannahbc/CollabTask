from rest_framework import serializers
from .models import Task
from django.contrib.auth.models import User

class TaskSerializer(serializers.ModelSerializer):
    collaborators = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, required=False)

    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ['owner', 'created_at', 'updated_at']

    def create(self, validated_data):
        collaborators = validated_data.pop('collaborators', [])
        task = Task.objects.create(owner=self.context['request'].user, **validated_data)
        task.collaborators.set(collaborators)
        return task

    def update(self, instance, validated_data):
        collaborators = validated_data.pop('collaborators', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if collaborators is not None:
            instance.collaborators.set(collaborators)
        return instance
