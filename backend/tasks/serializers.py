from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.email')

    class Meta:
        model = Task
        fields = ['id', 'user', 'title', 'is_completed', 'created_at', 'updated_at']