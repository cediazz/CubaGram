from rest_framework.serializers import ModelSerializer
from ..models import Comment
from user_management.serializers import UserSerializer
from cubagram_api.utils import format_date_HMS

class CommentSerializer(ModelSerializer):

    user = UserSerializer(read_only = True)
    
    class Meta:
        model = Comment
        fields = '__all__'
    
    def to_representation(self, instance):
        rep = super().to_representation(instance)
        converted_date = format_date_HMS(rep['comment_date'])
        rep['comment_date'] = converted_date
        return rep
    

class CommentCreateSerializer(ModelSerializer):

    
    class Meta:
        model = Comment
        fields = '__all__'