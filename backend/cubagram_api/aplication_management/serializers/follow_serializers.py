from rest_framework.serializers import ModelSerializer
from ..models import Follow
from user_management.serializers import UserSerializer
from rest_framework import serializers

class FollowSerializer(ModelSerializer):

    
    class Meta:
        model = Follow
        fields = '__all__'
    
    def validate(self, attrs):
        if attrs['follower'] == attrs['followed']:
            raise serializers.ValidationError("Un usuario no puede seguirse a sí mismo.")
        return attrs
    
    