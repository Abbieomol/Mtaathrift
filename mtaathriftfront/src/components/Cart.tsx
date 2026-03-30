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
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getCart = async () => {
      try {
        const data = await fetchCart();
        setCartItems(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load cart");
      }
    };
    getCart();
  }, []);

  const handleRemove = async (id: string) => {
    try {
      await removeFromCart(id);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

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

  if (error) return <p>{error}</p>;

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h1>{translate("Your Cart")}</h1>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <div className="cart-empty-icon">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#b5924c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </div>
          <h2 className="cart-empty-title">{translate("Your cart is empty")}</h2>
          <p className="cart-empty-subtitle">
            {translate("Looks like you haven't added anything yet. Start exploring our thrift finds!")}
          </p>
          <a href="/" className="cart-empty-cta">
            {translate("Browse Items")}
          </a>
        </div>
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