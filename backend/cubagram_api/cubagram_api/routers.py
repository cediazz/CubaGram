from rest_framework.routers import DefaultRouter
from user_management.views import UserView
from aplication_management.views.post_view import PostView
from aplication_management.views.comments_view import CommentView

router = DefaultRouter()
router.register(r'users',UserView)
router.register(r'posts',PostView)
router.register(r'comments',CommentView)
urlpatterns = router.urls