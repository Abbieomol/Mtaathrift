import React, { useEffect, useState } from "react";
import { fetchCart, removeFromCart, updateCartItem } from "../services/api";
import { FiTrash2, FiShoppingBag } from "react-icons/fi";
import { toast } from "react-toastify";
import type { CartItem } from "../types/types";
import { Link } from "react-router-dom";

const Cart: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    try {
      const data = await fetchCart();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCart(); }, []);

  const handleRemove = async (itemId: number) => {
    try {
      await removeFromCart(itemId);
      setItems(items.filter((i) => i.id !== itemId));
      toast.success("Removed from cart");
    } catch {
      toast.error("Failed to remove item");
    }
  };

  const handleQuantityChange = async (itemId: number, quantity: number) => {
    if (quantity < 1) return;
    try {
      await updateCartItem(itemId, quantity);
      setItems(items.map((i) => (i.id === itemId ? { ...i, quantity } : i)));
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) return <div className="page"><p className="text-muted">Loading cart...</p></div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>Shopping Cart</h1>
        <p>{items.length} item{items.length !== 1 ? "s" : ""} in your cart</p>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <div className="icon"><FiShoppingBag size={48} /></div>
          <h3>Your cart is empty</h3>
          <p>Browse products and add items to your cart</p>
          <Link to="/search" className="btn btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div>
          <div className="cart-layout">
            {items.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-info">
                  <h3>{item.product}</h3>
                  <p>KSh {item.price.toLocaleString()} each</p>
                </div>
                <div className="cart-item-controls">
                  <input
                    type="number"
                    className="qty-input"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                  />
                  <span className="cart-item-total">
                    KSh {(item.price * item.quantity).toLocaleString()}
                  </span>
                  <button className="btn btn-ghost btn-sm btn-danger" onClick={() => handleRemove(item.id)} title="Remove item from cart">
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary mt-md">
            <div className="total">
              <span>Total</span>
              <span>KSh {total.toLocaleString()}</span>
            </div>
            <button className="btn btn-primary btn-full">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
