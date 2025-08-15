from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import CustomUser
from .serializers import UserSerializer,MyTokenObtainPairSerializer,UserCreateSerializer,UserUpdateSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .permissions import IsAuthenticatedOrCreate
from rest_framework import status
from django.db.models import Count

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UserView(viewsets.ModelViewSet):
    queryset = CustomUser.objects \
               .annotate(numb_followers = Count('followers',distinct=True),numb_followed = Count('followed_by',distinct=True))
    serializer_class = UserSerializer
    create_serializer_class = UserCreateSerializer
    update_serializer_class = UserUpdateSerializer
    permission_classes = [IsAuthenticatedOrCreate]
    
    def get_serializer_class(self):
        match self.action:
            case "create":
                return self.create_serializer_class
            case "update" | "partial_update":
                return self.update_serializer_class
            case "retrieve":
                return self.serializer_class
            case "list":
                return self.serializer_class
            case _:
                return self.serializer_class


