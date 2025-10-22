from django.urls import path,include
from .views import register_user,EmailLoginView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib import admin
urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/register/', register_user, name='register'),
    path('auth/login/', EmailLoginView.as_view(), name='email_login'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('api/', include('tasks.urls'),name='apis')
    
]
