from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..models import Post
from ..serializers.post_serializers import PostSerializer

class PostView(viewsets.ModelViewSet):
    queryset = Post.objects.order_by('publication_date')
    serializer_class = PostSerializer
    #permission_classes = [IsAuthenticated]
    pagination_class = None
