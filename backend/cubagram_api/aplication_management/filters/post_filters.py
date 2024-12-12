from django_filters import rest_framework as filters
from ..models import Post, Follow
from user_management.models import CustomUser

class PostFilter(filters.FilterSet):
    
    class Meta:
        model = Post
        fields = ['user']

    def filter_queryset(self, queryset):
        user = self.request.user
        if user.is_authenticated:
            # Obtener los usuarios que el usuario está siguiendo
            followed_users = Follow.objects.filter(follower=user).values_list('followed', flat=True)
            # Filtrar los posts solo de esos usuarios
            return queryset.filter(user__in=followed_users)
        return queryset.none()  # Si el usuario no está autenticado, no devolver nada