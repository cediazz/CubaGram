from rest_framework.serializers import ModelSerializer
from .models import CustomUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import password_validation
from django.core.exceptions import ValidationError
from rest_framework import serializers
from aplication_management.models import Follow

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        access = refresh.access_token
        data['id'] = self.user.id  
        data["username"] = self.user.username
        data["image"] = f"http://127.0.0.1:8000{self.user.image.url}"
        return data


class UserSerializer(ModelSerializer):
    
    followed_user = serializers.SerializerMethodField()
    numb_followers = serializers.IntegerField(read_only=True)
    numb_followed = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = CustomUser
        fields = ['id','username','image','first_name','last_name','biography','education','location','followed_user','numb_followers','numb_followed']
    
    def get_followed_user(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            # Verificar si el usuario esta siendo seguido por el usuario autenticado
            return Follow.objects.filter(follower=request.user,followed = obj.id).exists()
        return False  
        
        
class UserCreateSerializer(ModelSerializer):
    
    
    class Meta:
        model = CustomUser
        fields = ['username','password','image','first_name','last_name','biography','education','location']
        
        

    def validate_password(self, value):
        try:
            password_validation.validate_password(password=value)
        except ValidationError as e:
            raise serializers.ValidationError(list(e.messages))
        return value
    
    def create(self,validated_data):
        user = CustomUser(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class UserUpdateSerializer(ModelSerializer):
    
    class Meta:
        model = CustomUser
        fields = ['username','image','first_name','last_name','biography','education','location']
    
   
    
    