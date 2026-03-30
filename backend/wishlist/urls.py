from django.urls import path
from . import views

urlpatterns = [
    path('wishlist/', views.view_wishlist, name='view-wishlist'),
    path('wishlist/add/', views.add_to_wishlist, name='add-to-wishlist'),
    path('wishlist/remove/<int:item_id>/', views.remove_from_wishlist, name='remove-from-wishlist'),
]
