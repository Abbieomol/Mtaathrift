from rest_framework.decorators import api_view
from rest_framework.response import Response
from products.models import Product
from .models import Wishlist, WishlistItem


@api_view(['POST'])
def add_to_wishlist(request):
    user = request.user
    product_id = request.data.get("product_id")

    wishlist, _ = Wishlist.objects.get_or_create(user=user)
    product = Product.objects.get(id=product_id)

    WishlistItem.objects.get_or_create(wishlist=wishlist, product=product)

    return Response({"message": "Added to wishlist"})


@api_view(['GET'])
def view_wishlist(request):
    wishlist, _ = Wishlist.objects.get_or_create(user=request.user)
    items = wishlist.items.all()

    data = []
    for item in items:
        data.append({
            "id": item.id,
            "product": item.product.name,
            "price": item.product.price
        })

    return Response(data)


@api_view(['DELETE'])
def remove_from_wishlist(request, item_id):
    item = WishlistItem.objects.get(id=item_id)
    item.delete()
    return Response({"message": "Removed"})
