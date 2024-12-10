from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from ..models import Follow
from ..serializers.follow_serializers import FollowSerializer
from rest_framework import status
from rest_framework.response import Response

class FollowView(viewsets.ModelViewSet):
    queryset = Follow.objects.order_by('follow_date')
    serializer_class = FollowSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None

    def get_existing_follow(self,data):
        return Follow.objects.filter(follower=data['follower'], followed=data['followed']).first()

    def create(self, request, *args, **kwargs):
        existing_follow = self.get_existing_follow(request.data)
        if existing_follow:
            existing_follow.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return super().create(request, *args, **kwargs)
    
    

   
