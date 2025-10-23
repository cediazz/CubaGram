import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from aplication_management.models import Comment, Like, Post

class PostConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.post_id = self.scope['url_route']['kwargs']['post_id']
        self.room_group_name = f'post_{self.post_id}'

        # Unirse al grupo del post
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Salir del grupo del post
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Recibir mensaje del WebSocket
    async def receive(self, text_data):
        print(text_data)
        text_data_json = json.loads(text_data)
        message_type = text_data_json['type']
        
        if message_type == 'comment_message':
            await self.handle_new_comment(text_data_json)
        elif message_type == 'new_like':
            await self.handle_new_like(text_data_json)

    # Manejar nuevo comentario
    async def handle_new_comment(self, data):
        # Enviar a todos en el grupo
        await self.channel_layer.group_send(
            self.room_group_name,
            data
            
        )

    # Manejar nuevo like
    async def handle_new_like(self, data):
        like_data = await self.toggle_like(data)
        
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'like_message',
                'like': like_data
            }
        )

    # Recibir mensajes del grupo
    async def comment_message(self, data):
        # Enviar al WebSocket
        await self.send(text_data=json.dumps(data))

    async def like_message(self, event):
        like = event['like']
        
        await self.send(text_data=json.dumps({
            'type': 'like_update',
            'like': like
        }))