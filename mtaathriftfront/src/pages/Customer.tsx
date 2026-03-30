import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiHeart, FiPackage, FiSearch } from "react-icons/fi";
import { fetchCart, getWishlist } from "../services/api";
import type { User } from "../types/types";

interface Props {
  user: User | null;
}

const Customer: React.FC<Props> = ({ user }) => {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    fetchCart().then((data) => setCartCount(Array.isArray(data) ? data.length : 0)).catch(() => {});
    getWishlist().then((data) => setWishlistCount(Array.isArray(data) ? data.length : 0)).catch(() => {});
  }, [user]);

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
          <Link to="/search" className="panel-link">
            <div className="panel panel-clickable">
              <FiSearch size={28} className="panel-icon-primary" />
              <h3 className="panel-title">Browse Products</h3>
              <p className="panel-subtitle">Find thrift deals near you</p>
            </div>
          </Link>
          <Link to="/cart" className="panel-link">
            <div className="panel panel-clickable">
              <FiShoppingCart size={28} className="panel-icon-accent" />
              <h3 className="panel-title">My Cart</h3>
              <p className="panel-subtitle">Review and checkout</p>
            </div>
          </Link>
          <Link to="/wishlist" className="panel-link">
            <div className="panel panel-clickable">
              <FiHeart size={28} className="panel-icon-danger" />
              <h3 className="panel-title">My Wishlist</h3>
              <p className="panel-subtitle">Saved items for later</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Customer;