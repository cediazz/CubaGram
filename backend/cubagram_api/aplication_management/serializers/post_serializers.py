from rest_framework.serializers import ModelSerializer
from ..models import Post,Comment,Like
from user_management.serializers import UserSerializer
from .comments_serializers import CommentSerializer
from .like_serializers import LikeSerializer
from rest_framework import serializers
from user_management.models import CustomUser
from cubagram_api.utils import format_date_HMS

class PostSerializer(ModelSerializer):

    numb_comm = serializers.IntegerField(read_only=True)
    numb_likes = serializers.IntegerField(read_only=True)
    user = UserSerializer(read_only = True)
    
    class Meta:
        model = Post
        fields = '__all__'

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        converted_date = format_date_HMS(rep['publication_date'])
        rep['publication_date'] = converted_date
        return rep
    

class PostCreateSerializer(ModelSerializer):

    
    class Meta:
        model = Post
        fields = '__all__'
        
    
    