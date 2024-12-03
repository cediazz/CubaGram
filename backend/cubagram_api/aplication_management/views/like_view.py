from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from ..models import Like
from ..serializers.like_serializers import LikeSerializer
from django_filters.rest_framework import DjangoFilterBackend

class LikeView(viewsets.ModelViewSet):
    queryset = Like.objects.order_by('like_date')
    serializer_class = LikeSerializer
    #permission_classes = [IsAuthenticated]
    pagination_class = None
    filterset_fields = {
        'post': ['exact'],
    }
    

   
