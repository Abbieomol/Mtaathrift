import { useState } from "react";
import { mockNotifications } from "../data/mockNotifications";
import { FiBell } from "react-icons/fi";

type Category = "All" | "Orders" | "Offers" | "Messages";

const Notifications: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<Category>("All");

  const filtered = activeFilter === "All"
    ? mockNotifications
    : mockNotifications.filter((n) => n.category === activeFilter);

  const dotClass = (cat: string) => {
    if (cat === "Orders") return "notif-dot order";
    if (cat === "Offers") return "notif-dot offer";
    return "notif-dot message";
  };

  return (
    <div className="page page-narrow" style={{ maxWidth: 700 }}>
      <div className="page-header">
        <h1>Notifications</h1>
        <p>Stay updated on orders, offers, and messages</p>
      </div>

      <div className="notif-filters">
        {(["All", "Orders", "Offers", "Messages"] as Category[]).map((cat) => (
          <button
            key={cat}
            className={`notif-filter ${activeFilter === cat ? "active" : ""}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="icon"><FiBell size={48} /></div>
          <h3>No notifications</h3>
          <p>You're all caught up!</p>
        </div>
      ) : (
        <div className="notif-list">
          {filtered.map((notif) => (
            <div className="notif-item" key={notif.id}>
              <div className={dotClass(notif.category)} />
              <div>
                <h3>{notif.title}</h3>
                <p>{notif.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
