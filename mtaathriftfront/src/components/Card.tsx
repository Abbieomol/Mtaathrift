import { addToCart, addToWishlist } from "../services/api";
import { toast } from "react-toastify";
import { FiShoppingCart, FiHeart } from "react-icons/fi";

type CardProps = {
  title: string;
  description: string;
  price?: number;
  image?: string;
  productId?: number;
  showActions?: boolean;
};

const Card: React.FC<CardProps> = ({ title, description, price, image, productId, showActions = true }) => {
  const handleAddToCart = async () => {
    if (!productId) return;
    try {
      await addToCart(productId);
      toast.success("Added to cart");
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  const handleAddToWishlist = async () => {
    if (!productId) return;
    try {
      await addToWishlist(productId);
      toast.success("Added to wishlist");
    } catch {
      toast.error("Failed to add to wishlist");
    }
  };

  return (
    <div className="card">
      {image && <img src={image} alt={title} className="card-img" />}
      {!image && <div className="card-img" style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: "0.85rem" }}>No image</div>}
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-desc">{description}</p>
        {price !== undefined && <div className="card-price">KSh {price.toLocaleString()}</div>}
      </div>
      {showActions && productId && (
        <div className="card-actions">
          <button className="btn btn-primary btn-sm" onClick={handleAddToCart}>
            <FiShoppingCart size={14} /> Add to Cart
          </button>
          <button className="btn btn-outline btn-sm" onClick={handleAddToWishlist}>
            <FiHeart size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
