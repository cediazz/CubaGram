from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..models import Post
from ..serializers.post_serializers import PostSerializer,PostCreateSerializer
from django.db.models import Count
from rest_framework import status
from rest_framework.decorators import action
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.parsers import MultiPartParser, FormParser

class PostView(viewsets.ModelViewSet):
    queryset = Post.objects \
              .order_by('-publication_date')\
              .annotate(numb_comm = Count('comments',distinct=True),numb_likes = Count('likes',distinct=True))
    serializer_class = PostSerializer
    create_serializer_class = PostCreateSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    
    def get_serializer_class(self):
        match self.action:
            case "create":
                return self.create_serializer_class
            case "update" | "partial_update":
                return self.create_serializer_class
            case "retrieve":
                return self.serializer_class
            case "list":
                return self.serializer_class
            case _:
                return self.serializer_class

    @swagger_auto_schema(
            manual_parameters=[
                openapi.Parameter(
                    'page',
                    openapi.IN_QUERY,
                    description="A page number within the paginated result set.",
                    type=openapi.TYPE_INTEGER
                ),
                openapi.Parameter(
                    'user',
                    openapi.IN_QUERY,
                    description="The user to filter",
                    type=openapi.TYPE_INTEGER,
                    required=True
                )
            ],
    )
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
    

   
