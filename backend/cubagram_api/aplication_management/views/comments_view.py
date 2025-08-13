from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from ..models import Comment
from ..serializers.comments_serializers import CommentSerializer,CommentCreateSerializer
from rest_framework.response import Response
from rest_framework import status

class CommentView(viewsets.ModelViewSet):
    queryset = Comment.objects.select_related('user','post').order_by('-comment_date')
    serializer_class = CommentSerializer
    create_serializer_class = CommentCreateSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = {
        'post': ['exact'],
    }
    
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
    

   
