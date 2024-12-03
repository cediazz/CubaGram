from rest_framework.serializers import ModelSerializer
from ..models import Post,Comment,Like
from user_management.serializers import UserSerializer
from .comments_serializers import CommentSerializer
from .like_serializers import LikeSerializer
from rest_framework import serializers
from user_management.models import CustomUser

class PostSerializer(ModelSerializer):

    numb_comm = serializers.IntegerField(read_only=True)
    numb_likes = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Post
        fields = '__all__'
        
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['user'] = UserSerializer(instance.user).data  # show all user data
        return representation