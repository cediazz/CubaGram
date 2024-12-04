from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from ..models import Follow
from ..serializers.follow_serializers import FollowSerializer
from django.db.models import Count
from django_filters.rest_framework import DjangoFilterBackend

class FollowView(viewsets.ModelViewSet):
    queryset = Follow.objects.order_by('follow_date')
    serializer_class = FollowSerializer
    #permission_classes = [IsAuthenticated]
    pagination_class = None
    
    

   
