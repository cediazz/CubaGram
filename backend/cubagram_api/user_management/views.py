from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import CustomUser
from .serializers import UserSerializer,MyTokenObtainPairSerializer,UserCreateSerializer
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
    permission_classes = [IsAuthenticatedOrCreate]

    

    def create(self, request, *args, **kwargs):
        serializer = UserCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


