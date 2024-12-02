from django.db import models
from user_management.models import CustomUser

class Post(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='posts')
    content = models.TextField()
    image = models.ImageField(blank=True)
    publication_date = models.DateTimeField(auto_now_add=True)

    

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    content = models.TextField()
    comment_date = models.DateTimeField(auto_now_add=True)

    

class Like(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    like_date = models.DateTimeField(auto_now_add=True)

    

class Follow(models.Model):
    follower = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='followers')
    followed = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='followed_by')
    follow_date = models.DateTimeField(auto_now_add=True)

    
