import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiHeart, FiPackage, FiSearch } from "react-icons/fi";
import { fetchCart, getWishlist } from "../services/api";
import type { User } from "../types/types";

const Customer: React.FC = () => {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
    } catch { /* ignore */ }

    fetchCart().then((data) => setCartCount(Array.isArray(data) ? data.length : 0)).catch(() => {});
    getWishlist().then((data) => setWishlistCount(Array.isArray(data) ? data.length : 0)).catch(() => {});
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Welcome{user?.email ? `, ${user.email.split("@")[0]}` : ""}!</h1>
        <p>Here's your shopping overview</p>
      </div>

      <div className="dashboard">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon green"><FiShoppingCart size={20} /></div>
            <div className="stat-info">
              <h3>{cartCount}</h3>
              <p>Items in Cart</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon red"><FiHeart size={20} /></div>
            <div className="stat-info">
              <h3>{wishlistCount}</h3>
              <p>Wishlist Items</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon blue"><FiPackage size={20} /></div>
            <div className="stat-info">
              <h3>0</h3>
              <p>Orders</p>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <Link to="/search" style={{ textDecoration: "none" }}>
            <div className="panel" style={{ cursor: "pointer", textAlign: "center", padding: "32px" }}>
              <FiSearch size={28} style={{ color: "var(--primary)", marginBottom: 8 }} />
              <h3 style={{ fontSize: "1rem", marginBottom: 4 }}>Browse Products</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Find thrift deals near you</p>
            </div>
          </Link>
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <div className="panel" style={{ cursor: "pointer", textAlign: "center", padding: "32px" }}>
              <FiShoppingCart size={28} style={{ color: "var(--accent)", marginBottom: 8 }} />
              <h3 style={{ fontSize: "1rem", marginBottom: 4 }}>My Cart</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Review and checkout</p>
            </div>
          </Link>
          <Link to="/wishlist" style={{ textDecoration: "none" }}>
            <div className="panel" style={{ cursor: "pointer", textAlign: "center", padding: "32px" }}>
              <FiHeart size={28} style={{ color: "var(--danger)", marginBottom: 8 }} />
              <h3 style={{ fontSize: "1rem", marginBottom: 4 }}>My Wishlist</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Saved items for later</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Customer;
