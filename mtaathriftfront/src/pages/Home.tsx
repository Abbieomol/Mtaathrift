import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { fetchProducts } from "../services/api";
import type { Product } from "../types/types";
import { FiArrowRight } from "react-icons/fi";

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const categories = [
    { icon: "👗", title: "Thrift Clothes", desc: "Tops, dresses, outerwear at great prices" },
    { icon: "👟", title: "Shoes & Bags", desc: "Second-hand shoes, bags, and accessories" },
    { icon: "🏪", title: "Local Vendors", desc: "Support sellers in your community" },
    { icon: "♻️", title: "Sustainable", desc: "Eco-friendly fashion choices" },
  ];

  return (
    <div className="page">
      <div className="hero">
        <h1>Karibu MtaaM</h1>
        <p>
          Your neighborhood thrift marketplace. Discover second-hand treasures, shop
          affordable fashion, and support local sellers across Kenya.
        </p>
        <Link to="/search" className="hero-btn">
          Start Shopping <FiArrowRight />
        </Link>
      </div>

      <div className="section">
        <h2 className="section-title">Browse Categories</h2>
        <div className="category-grid">
          {categories.map((cat, i) => (
            <Link to="/search" key={i} className="category-card" style={{ textDecoration: "none", color: "inherit" }}>
              <div className="cat-icon">{cat.icon}</div>
              <h3>{cat.title}</h3>
              <p>{cat.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Featured Products</h2>
        {loading && <p className="text-muted">Loading products...</p>}
        {!loading && products.length === 0 && (
          <div className="empty-state">
            <div className="icon">🛍️</div>
            <h3>No products yet</h3>
            <p>Check back soon for new thrift finds!</p>
          </div>
        )}
        {!loading && products.length > 0 && (
          <div className="card-grid">
            {products.map((p) => (
              <Card
                key={p.id}
                title={p.name}
                description={p.description}
                price={p.price}
                image={p.image}
                productId={p.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
