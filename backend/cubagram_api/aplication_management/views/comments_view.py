from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from ..models import Comment
from ..serializers.comments_serializers import CommentSerializer
from django.db.models import Count
from django_filters.rest_framework import DjangoFilterBackend

class CommentView(viewsets.ModelViewSet):
    queryset = Comment.objects.order_by('comment_date')
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None
    filterset_fields = {
        'post': ['exact'],
    }
    

   
