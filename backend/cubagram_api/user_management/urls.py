from django.urls import path,include
from rest_framework_simplejwt.views import TokenRefreshView
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenVerifyView,TokenBlacklistView,TokenObtainSlidingView,TokenRefreshSlidingView
 

urlpatterns = [
    path('login/',MyTokenObtainPairView.as_view()),
    path('refresh-token/',TokenRefreshView.as_view()),
    path('token-blacklist/', TokenBlacklistView.as_view()),
]
