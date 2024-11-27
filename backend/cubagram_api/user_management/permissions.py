from rest_framework.permissions import BasePermission

class IsAuthenticatedOrCreate(BasePermission):
    """
   Allows access to any user to create a new user,
   but requires authentication for other methods.
    """
    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        return bool(request.user and request.user.is_authenticated)