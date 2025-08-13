from rest_framework.serializers import ModelSerializer
from ..models import Post,Comment,Like
from user_management.serializers import UserSerializer
from .comments_serializers import CommentSerializer
from rest_framework import serializers
from user_management.models import CustomUser
from cubagram_api.utils import format_date_HMS
from ..models import Like

class PostSerializer(ModelSerializer):

    numb_comm = serializers.IntegerField(read_only=True)
    numb_likes = serializers.IntegerField(read_only=True)
    user = UserSerializer(read_only = True)
    user_liked = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = '__all__'
    
    def get_user_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            # Verifica si el usuario autenticado ha dado like a esta publicación
            return Like.objects.filter(user=request.user, post = obj.id).exists()
        return False  
    
    def to_representation(self, instance):
        rep = super().to_representation(instance)
        converted_date = format_date_HMS(rep['publication_date'])
        rep['publication_date'] = converted_date
        return rep
    

class PostCreateSerializer(ModelSerializer):
    
    class Meta:
        model = Post
        fields = '__all__'
        
    
    