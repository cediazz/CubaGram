from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..models import Post
from ..serializers.post_serializers import PostSerializer
from django.db.models import Count

class PostView(viewsets.ModelViewSet):
    queryset = Post.objects \
               .order_by('publication_date')\
               .annotate(numb_comm = Count('comments'),numb_likes = Count('likes') )
    serializer_class = PostSerializer
    #permission_classes = [IsAuthenticated]
    pagination_class = None

   
