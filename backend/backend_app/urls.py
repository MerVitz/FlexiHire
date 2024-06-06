from django.urls import path

from .views import LoginView, LogoutView, UserCreate

urlpatterns = [
    path('register/', UserCreate.as_view(), name='user-create'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
]
