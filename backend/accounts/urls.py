from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import SignupView, LoginView, ProfileView, TodoListView, TodoDetailView

urlpatterns = [
    path("signup/", SignupView.as_view(), name="signup"),
    path("login/", LoginView.as_view(), name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("profile/", ProfileView.as_view(), name="profile"),
    path("todos/", TodoListView.as_view(), name="todo-list"),
    path("todos/<int:pk>/", TodoDetailView.as_view(), name="todo-detail"),
]
