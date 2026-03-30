from django.db import models
from accounts.models import User


class Notification(models.Model):
    NOTIFICATION_TYPES = [
        ("order", "Order"),
        ("follow", "Follow"),
        ("system", "System"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notifications")
    message = models.TextField()
    type = models.CharField(max_length=50, choices=NOTIFICATION_TYPES)
    is_read = models.BooleanField(default=False)
    is_delivered = models.BooleanField(default=False)  # ✅ as you requested
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification for {self.user.email}"