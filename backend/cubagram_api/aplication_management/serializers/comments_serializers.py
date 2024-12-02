from rest_framework.serializers import ModelSerializer
from ..models import Comment
from user_management.serializers import UserSerializer

class CommentSerializer(ModelSerializer):

    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Comment
        fields = '__all__'