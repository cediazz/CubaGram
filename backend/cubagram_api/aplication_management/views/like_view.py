from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from ..models import Like
from ..serializers.like_serializers import LikeSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.response import Response

class LikeView(viewsets.ModelViewSet):
    queryset = Like.objects.order_by('like_date')
    serializer_class = LikeSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None
    filterset_fields = {
        'post': ['exact'],
    }

    def get_existing_like(self,data):
        return Like.objects.filter(user=data['user'], post=data['post']).first()

    def create(self, request, *args, **kwargs):
        existing_like = self.get_existing_like(request.data)
        if existing_like:
            existing_like.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return super().create(request, *args, **kwargs)
    

   
