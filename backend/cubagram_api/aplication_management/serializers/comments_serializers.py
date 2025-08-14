from rest_framework.serializers import ModelSerializer
from ..models import Comment
from user_management.serializers import UserSerializer
from cubagram_api.utils import format_date_HMS
from urllib.parse import urljoin
from django.conf import settings
import os

class CommentSerializer(ModelSerializer):

    user = UserSerializer(read_only = True)
    
    class Meta:
        model = Comment
        fields = '__all__'
    
    def to_representation(self, instance):
        rep = super().to_representation(instance)
        converted_date = format_date_HMS(rep['comment_date'])
        rep['comment_date'] = converted_date
        return rep
    

class CommentCreateSerializer(ModelSerializer):

    
    class Meta:
        model = Comment
        fields = '__all__'
    
    def to_representation(self, instance):
        rep = super().to_representation(instance)
        # Usamos UserSerializer para obtener la representación completa del usuario
        user_data = UserSerializer(instance.user).data
        # Modificar la URL de la imagen para que sea completa
        if 'image' in user_data and user_data['image']:
            user_data['image'] = urljoin(
                os.environ.get('RENDER_EXTERNAL_HOSTNAME', 'http://127.0.0.1:8000'), 
                user_data['image']
                )
        rep['user'] = user_data
        converted_date = format_date_HMS(rep['comment_date'])
        rep['comment_date'] = converted_date
        return rep