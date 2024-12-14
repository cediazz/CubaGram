from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from ..models import Comment
from ..serializers.comments_serializers import CommentSerializer,CommentCreateSerializer
from rest_framework.response import Response
from rest_framework import status

class CommentView(viewsets.ModelViewSet):
    queryset = Comment.objects.order_by('-comment_date')
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    #pagination_class = None
    filterset_fields = {
        'post': ['exact'],
    }

    def create(self, request, *args, **kwargs):
        serializer = CommentCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    

   
