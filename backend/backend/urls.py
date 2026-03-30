from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('accounts.urls')),
    path('api/', include('products.urls')),
    path('api/', include('cart.urls')),
    path('api/', include('wishlist.urls')),
]
