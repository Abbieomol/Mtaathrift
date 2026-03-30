import { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { fetchCart, removeFromCart, checkoutCart } from "../services/api";
import "../App.css";

interface CartItem {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const { translate } = useContext(LanguageContext);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Fetch cart items from backend
  useEffect(() => {
    const getCart = async () => {
      try {
        const data = await fetchCart();
        setCartItems(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };
    getCart();
  }, []);

  // Remove item from cart
  const handleRemove = async (id: string) => {
    try {
      await removeFromCart(id);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Checkout cart
  const handleCheckout = async () => {
    try {
      await checkoutCart();
      setCartItems([]);
      alert("Checkout successful!");
    } catch (err) {
      console.error(err);
      alert("Checkout failed!");
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>{error}</p>;

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h1>{translate("Your Cart")}</h1>
      {cartItems.length === 0 ? (
        <p>{translate("Your cart is empty")}</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <h3>{translate(item.title)}</h3>
                  <p>{translate(item.description)}</p>
                  <p>Ksh {item.price} × {item.quantity}</p>
                </div>
                <button onClick={() => handleRemove(item.id)}>
                  {translate("Remove")}
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <p>Total: Ksh {total}</p>
            <button onClick={handleCheckout}>{translate("Checkout Selected Items")}</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;