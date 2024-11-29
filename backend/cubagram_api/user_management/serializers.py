from rest_framework.serializers import ModelSerializer
from .models import CustomUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import password_validation
from django.core.exceptions import ValidationError
from rest_framework import serializers


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
    
    
    class Meta:
        model = CustomUser
        fields = ['id','username','image','first_name','last_name','biography','education','location']
        
        

    def validate_password(self, value):
        try:
            password_validation.validate_password(password=value)
        except ValidationError as e:
            raise serializers.ValidationError(list(e.messages))
        return value
    
    def create(self,validated_data):
        print(validated_data)
        user = CustomUser(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
    
    