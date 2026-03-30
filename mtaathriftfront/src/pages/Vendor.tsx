import { useEffect, useState } from "react";
import { FiPackage, FiDollarSign, FiMapPin, FiPlus, FiTrash2, FiCheck } from "react-icons/fi";
import { fetchProducts, fetchTodos, createTodo, updateTodo, deleteTodo, getProfile, updateProfile } from "../services/api";
import type { User, Product, Todo } from "../types/types";

const Vendor: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [location, setLocation] = useState("");
  const [editingLocation, setEditingLocation] = useState(false);
  const [locationInput, setLocationInput] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
    } catch { /* ignore */ }

    fetchProducts().then(setProducts).catch(() => {});
    fetchTodos().then(setTodos).catch(() => {});
    getProfile().then((data) => {
      setLocation(data.location || "");
      setLocationInput(data.location || "");
    }).catch(() => {});
  }, []);

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const todo = await createTodo(newTodo.trim());
      setTodos([todo, ...todos]);
      setNewTodo("");
    } catch { /* ignore */ }
  };

  const handleToggleTodo = async (todo: Todo) => {
    try {
      const updated = await updateTodo(todo.id, { completed: !todo.completed });
      setTodos(todos.map((t) => (t.id === todo.id ? updated : t)));
    } catch { /* ignore */ }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch { /* ignore */ }
  };

  const handleSaveLocation = async () => {
    try {
      await updateProfile({ location: locationInput.trim() });
      setLocation(locationInput.trim());
      setEditingLocation(false);
    } catch { /* ignore */ }
  };

  const myProducts = products.filter((p) => p.vendor === user?.id);
  const completedTodos = todos.filter((t) => t.completed).length;

  return (
    <div className="page">
      <div className="page-header">
        <h1>Vendor Dashboard</h1>
        <p>Manage your shop and track your tasks</p>
      </div>

      <div className="dashboard">
        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon green"><FiPackage size={20} /></div>
            <div className="stat-info">
              <h3>{myProducts.length}</h3>
              <p>Listed Products</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon blue"><FiDollarSign size={20} /></div>
            <div className="stat-info">
              <h3>0</h3>
              <p>Total Sales</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon orange"><FiCheck size={20} /></div>
            <div className="stat-info">
              <h3>{completedTodos}/{todos.length}</h3>
              <p>Tasks Done</p>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "start" }}>
          {/* Todo List */}
          <div className="panel">
            <div className="panel-header">
              <h2>Todo List</h2>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                {completedTodos} of {todos.length} done
              </span>
            </div>

            <div className="todo-input-row">
              <input
                className="form-input"
                placeholder="Add a task..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
              />
              <button className="btn btn-primary btn-sm" onClick={handleAddTodo}>
                <FiPlus size={16} />
              </button>
            </div>

            <div className="todo-list">
              {todos.length === 0 && (
                <div className="todo-empty">No tasks yet. Add one above!</div>
              )}
              {todos.map((todo) => (
                <div className="todo-item" key={todo.id}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo)}
                  />
                  <span className={todo.completed ? "completed" : ""}>{todo.title}</span>
                  <button className="todo-delete" onClick={() => handleDeleteTodo(todo.id)}>
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Store Profile & Location */}
          <div className="panel">
            <div className="panel-header">
              <h2>Store Profile</h2>
            </div>

            <div className="profile-section">
              <div className="profile-field">
                <label>Email</label>
                <div className="value">{user?.email || "—"}</div>
              </div>

              <div className="profile-field">
                <label>Role</label>
                <div className="value" style={{ textTransform: "capitalize" }}>{user?.role || "—"}</div>
              </div>

              <div className="profile-field">
                <label><FiMapPin size={12} style={{ marginRight: 4 }} />Store Location (optional)</label>
                {!editingLocation ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {location ? (
                      <span className="location-badge"><FiMapPin size={12} />{location}</span>
                    ) : (
                      <span className="text-muted" style={{ fontSize: "0.85rem" }}>No location set</span>
                    )}
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => setEditingLocation(true)}
                    >
                      {location ? "Edit" : "Add"}
                    </button>
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: 8 }}>
                    <input
                      className="form-input"
                      placeholder="e.g. Gikomba Market, Nairobi"
                      value={locationInput}
                      onChange={(e) => setLocationInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSaveLocation()}
                      style={{ flex: 1 }}
                    />
                    <button className="btn btn-primary btn-sm" onClick={handleSaveLocation}>Save</button>
                    <button className="btn btn-ghost btn-sm" onClick={() => { setEditingLocation(false); setLocationInput(location); }}>Cancel</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        {myProducts.length > 0 && (
          <div className="panel">
            <div className="panel-header">
              <h2>Your Products</h2>
            </div>
            <div className="card-grid">
              {myProducts.map((p) => (
                <div className="card" key={p.id}>
                  <div className="card-body">
                    <h3 className="card-title">{p.name}</h3>
                    <p className="card-desc">{p.description}</p>
                    <div className="card-price">KSh {p.price.toLocaleString()}</div>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      Stock: {p.stock}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vendor;
