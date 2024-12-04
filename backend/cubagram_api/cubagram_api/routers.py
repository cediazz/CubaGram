from rest_framework.routers import DefaultRouter
from user_management.views import UserView
from aplication_management.views.post_view import PostView
from aplication_management.views.comments_view import CommentView
from aplication_management.views.like_view import LikeView
from aplication_management.views.follow_view import FollowView

router = DefaultRouter()
router.register(r'users',UserView)
router.register(r'posts',PostView)
router.register(r'comments',CommentView)
router.register(r'likes',LikeView)
router.register(r'follows',FollowView)
urlpatterns = router.urls