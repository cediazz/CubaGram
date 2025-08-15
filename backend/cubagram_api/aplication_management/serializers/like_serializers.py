from rest_framework.serializers import ModelSerializer
from ..models import Like
from user_management.serializers import UserSerializer
from urllib.parse import urljoin
from django.conf import settings
import os

class LikeSerializer(ModelSerializer):

   
    
    class Meta:
        model = Like
        fields = '__all__'
    
    
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        user_data = UserSerializer(instance.user).data
        if 'image' in user_data and user_data['image']:
            user_data['image'] = urljoin(
                #os.environ.get('RENDER_EXTERNAL_HOSTNAME', 'http://127.0.0.1:8000'), 
                f"{settings.BASE_URL}",
                user_data['image']
                )
        representation['user'] = user_data
        return representation