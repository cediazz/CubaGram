from rest_framework.routers import DefaultRouter
from user_management.views import UserView
from aplication_management.views.post_view import PostView

router = DefaultRouter()
router.register(r'users',UserView)
router.register(r'posts',PostView)
urlpatterns = router.urls