import json
from channels.generic.websocket import AsyncWebsocketConsumer

class TaskConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Create a single group for all connected users
        self.group_name = "collab_tasks"

        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    # Receive message from Django backend
    async def send_task_update(self, event):
        data = event['data']
        await self.send(text_data=json.dumps(data))
