from rest_framework.serializers import ModelSerializer
from ..models import Post,Comment,Like
from user_management.serializers import UserSerializer
from .comments_serializers import CommentSerializer
from .like_serializers import LikeSerializer
from rest_framework import serializers
from user_management.models import CustomUser

class PostSerializer(ModelSerializer):

    #user = UserSerializer()
    #user = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())  # Solo muestra el ID del usuario
   
    
    class Meta:
        model = Post
        fields = '__all__'
    
    def to_representation(self, instance):
        # Este método se llama al serializar una instancia del modelo
        representation = super().to_representation(instance)
        representation['user'] = UserSerializer(instance.user).data  # Serializa el usuario completamente
        return representation