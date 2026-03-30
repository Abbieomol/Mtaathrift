import { useState, useEffect } from "react";
import Card from "../components/Card";
import { fetchProducts } from "../services/api";
import type { Product } from "../types/types";
import { FiSearch } from "react-icons/fi";

const categories = ["All", "Jackets", "Dresses", "Shoes", "Accessories"];
const conditions = ["All", "New", "Like New", "Good", "Fair"];

const Search: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = products.filter((p) => {
    const matchesQuery = !query || p.name.toLowerCase().includes(query.toLowerCase())
      || p.description.toLowerCase().includes(query.toLowerCase());
    return matchesQuery;
  });

  return (
    <div className="page page-wide">
      <div className="page-header">
        <h1>Search Products</h1>
        <p>Find thrift deals across all categories</p>
      </div>

      <div className="search-layout">
        <aside className="search-sidebar">
          <div className="panel">
            <div className="filter-group">
              <h4>Category</h4>
              {categories.map((cat) => (
                <label key={cat}>
                  <input
                    type="radio"
                    name="category"
                    checked={category === cat}
                    onChange={() => setCategory(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>

            <div style={{ height: 1, background: "var(--border)", margin: "12px 0" }} />

            <div className="filter-group">
              <h4>Condition</h4>
              {conditions.map((cond) => (
                <label key={cond}>
                  <input type="checkbox" />
                  {cond}
                </label>
              ))}
            </div>
          </div>
        </aside>

        <div className="search-main">
          <div className="search-bar">
            <div style={{ position: "relative", flex: 1 }}>
              <FiSearch size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input
                className="form-input"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ paddingLeft: 36, width: "100%" }}
              />
            </div>
          </div>

          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: 16 }}>
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
          </p>

          {loading && <p className="text-muted">Loading...</p>}

          {!loading && filtered.length === 0 && (
            <div className="empty-state">
              <div className="icon">🔍</div>
              <h3>No products found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div className="card-grid">
              {filtered.map((p) => (
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
    </div>
  );
};

export default Search;
