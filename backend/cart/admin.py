from django.contrib import admin
from .models import Cart

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    def save_model(self, request, obj, form, change):
        user = getattr(request, "user", None)
        if user is None or not user.is_authenticated:
            # fallback or raise error
            return
        obj.user = user
        super().save_model(request, obj, form, change)