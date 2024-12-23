from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..models import Post
from ..serializers.post_serializers import PostSerializer,PostCreateSerializer
from django.db.models import Count
from ..filters.post_filters import PostFilter
from rest_framework import status
from rest_framework.decorators import action

class PostView(viewsets.ModelViewSet):
    queryset = Post.objects \
              .order_by('-publication_date')\
              .annotate(numb_comm = Count('comments',distinct=True),numb_likes = Count('likes',distinct=True))
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    #pagination_class = None
    filterset_class = PostFilter

    @action(detail=False, methods=['GET'])
    def get_posts_user(self,request):
        user = request.query_params.get('user')
        posts = Post.objects \
              .filter(user = user) \
              .order_by('-publication_date')\
              .annotate(numb_comm = Count('comments',distinct=True),numb_likes = Count('likes',distinct=True))
        page = self.paginate_queryset(posts)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def create(self, request, *args, **kwargs):
        serializer = PostCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    

   
