import React, { useEffect, useState } from "react";
import { getWishlist, removeWishlistItem, addToCart } from "../services/api";
import { FiTrash2, FiHeart, FiShoppingCart } from "react-icons/fi";
import { toast } from "react-toastify";
import type { WishlistItem } from "../types/types";
import { Link } from "react-router-dom";

const Wishlist: React.FC = () => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWishlist()
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(() => toast.error("Failed to load wishlist"))
      .finally(() => setLoading(false));
  }, []);

  const handleRemove = async (id: number) => {
    try {
      await removeWishlistItem(id);
      setItems(items.filter((i) => i.id !== id));
      toast.success("Removed from wishlist");
    } catch {
      toast.error("Failed to remove");
    }
  };

  const handleMoveToCart = async (item: WishlistItem) => {
    try {
      await addToCart(item.id);
      toast.success("Moved to cart");
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  if (loading) return <div className="page"><p className="text-muted">Loading wishlist...</p></div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>My Wishlist</h1>
        <p>{items.length} saved item{items.length !== 1 ? "s" : ""}</p>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <div className="icon"><FiHeart size={48} /></div>
          <h3>Your wishlist is empty</h3>
          <p>Save items you love and come back to them later</p>
          <Link to="/search" className="btn btn-primary">Browse Products</Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {items.map((item) => (
            <div className="wishlist-card" key={item.id}>
              <div>
                <h3>{item.product}</h3>
                <div className="price">KSh {item.price?.toLocaleString() || "—"}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn btn-primary btn-sm" onClick={() => handleMoveToCart(item)}>
                  <FiShoppingCart size={14} /> Add to Cart
                </button>
                <button className="btn btn-ghost btn-sm" onClick={() => handleRemove(item.id)} style={{ color: "var(--danger)" }}>
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
