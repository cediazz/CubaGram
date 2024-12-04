from rest_framework.serializers import ModelSerializer
from ..models import Like
from user_management.serializers import UserSerializer


class LikeSerializer(ModelSerializer):

    
    class Meta:
        model = Like
        fields = '__all__'
    
    
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['user'] = UserSerializer(instance.user).data  # show all user data
        return representation