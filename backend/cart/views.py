from rest_framework.decorators import api_view
from rest_framework.response import Response
from products.models import Product
from .models import Cart, CartItem


@api_view(['POST'])
def add_to_cart(request):
    user = request.user
    product_id = request.data.get("product_id")
    quantity = int(request.data.get("quantity", 1))

    cart, _ = Cart.objects.get_or_create(user=user)
    product = Product.objects.get(id=product_id)

    item, created = CartItem.objects.get_or_create(cart=cart, product=product)

    if not created:
        item.quantity += quantity
    else:
        item.quantity = quantity

    item.save()

    return Response({"message": "Added to cart"})


@api_view(['GET'])
def view_cart(request):
    cart, _ = Cart.objects.get_or_create(user=request.user)
    items = cart.items.all()

    data = []
    for item in items:
        data.append({
            "id": item.id,
            "product": item.product.name,
            "price": item.product.price,
            "quantity": item.quantity
        })

    return Response(data)


@api_view(['POST'])
def update_cart_item(request):
    item_id = request.data.get("item_id")
    quantity = int(request.data.get("quantity"))

    item = CartItem.objects.get(id=item_id)
    item.quantity = quantity
    item.save()

    return Response({"message": "Updated"})


@api_view(['DELETE'])
def remove_from_cart(request, item_id):
    item = CartItem.objects.get(id=item_id)
    item.delete()
    return Response({"message": "Removed"})
