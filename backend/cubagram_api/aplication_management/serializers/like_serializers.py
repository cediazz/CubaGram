from rest_framework.serializers import ModelSerializer
from ..models import Like
from user_management.serializers import UserSerializer


class LikeSerializer(ModelSerializer):

    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Like
        fields = '__all__'