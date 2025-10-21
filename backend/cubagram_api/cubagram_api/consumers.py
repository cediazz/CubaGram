import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from aplication_management.models import Comment, Like, Post

CustomUser = get_user_model()

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
        
        if message_type == 'new_comment':
            await self.handle_new_comment(text_data_json)
        elif message_type == 'new_like':
            await self.handle_new_like(text_data_json)

    # Manejar nuevo comentario
    async def handle_new_comment(self, data):
        comment = await self.create_comment(data)
        
        # Enviar a todos en el grupo
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'comment_message',
                'comment': {
                    'id': comment.id,
                    'content': comment.content,
                    'user': {
                        'id': comment.user.id,
                        'username': comment.user.username,
                        'profile_picture': comment.user.profile_picture.url if comment.user.profile_picture else None
                    },
                    'comment_date': comment.comment_date.isoformat()
                }
            }
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
    async def comment_message(self, event):
        comment = event['comment']
        
        # Enviar al WebSocket
        await self.send(text_data=json.dumps({
            'type': 'new_comment',
            'comment': comment
        }))

    async def like_message(self, event):
        like = event['like']
        
        await self.send(text_data=json.dumps({
            'type': 'like_update',
            'like': like
        }))

    # Métodos de base de datos
    @database_sync_to_async
    def create_comment(self, data):
        user = CustomUser.objects.get(id=data['user_id'])
        post = Post.objects.get(id=data['post_id'])
        
        comment = Comment.objects.create(
            post=post,
            user=user,
            content=data['content']
        )
        return comment

    @database_sync_to_async
    def toggle_like(self, data):
        user = CustomUser.objects.get(id=data['user_id'])
        post = Post.objects.get(id=data['post_id'])
        
        like, created = Like.objects.get_or_create(
            post=post,
            user=user
        )
        
        if not created:
            like.delete()
            liked = False
        else:
            liked = True
        
        like_count = Like.objects.filter(post=post).count()
        
        return {
            'post_id': post.id,
            'user_id': user.id,
            'liked': liked,
            'like_count': like_count
        }