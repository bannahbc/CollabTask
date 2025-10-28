# tasks/utils.py


from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

def notify_task_users(task, action="created"):
    channel_layer = get_channel_layer()
    payload = {
        "type": "task_update",
        "action": action,
        "payload": {
            "action": action,
            "task_id": task.id,
            "title": task.title,
            "status": task.status,
            "priority": task.priority,
            "due_date": str(task.due_date),
            "description": task.description,
        }
    }

    # Notify owner
    async_to_sync(channel_layer.group_send)(f"user_{task.owner.id}", payload)

    # Notify collaborators
    for user in task.collaborators.all():
        async_to_sync(channel_layer.group_send)(f"user_{user.id}", payload)
