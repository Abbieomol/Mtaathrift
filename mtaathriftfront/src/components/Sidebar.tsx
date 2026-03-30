import { useState, useEffect, useRef, useContext, type JSX } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Bell } from "lucide-react";
import { LanguageContext } from "../context/LanguageContext";
import { fetchCart, fetchNotifications } from "../services/api";
import "../styles/App.css";

type IconType = string | JSX.Element;

type LinkItem = {
  to: string;
  label: string;
  icon: IconType;
  count?: number;
};

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [cartCount, setCartCount] = useState<number>(0);
  const [notificationsCount, setNotificationsCount] = useState<number>(0);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const { translate } = useContext(LanguageContext);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".sidebar-toggle-btn")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartRes = await fetchCart();
        setCartCount(cartRes.data.length);

        const notifRes = await fetchNotifications();
        setNotificationsCount(notifRes.data.length);
      } catch (err) {
        console.error("Failed to fetch sidebar data", err);
      }
    };

    fetchData();
  }, []);

  const customerLinks: LinkItem[] = [
    { to: "/", label: "Home", icon: "🏠" },
    { to: "/search", label: "Search", icon: "🔍" },
    { to: "/cart", label: "Cart", icon: "🛒", count: cartCount },
    {
      to: "/notifications",
      label: "Notifications",
      icon: <Bell size={18} />,
      count: notificationsCount,
    },
    { to: "/wishlist", label: "Wishlist", icon: "❤️" },
  ];

  const vendorLinks: LinkItem[] = [
    { to: "/", label: "Home", icon: "🏠" },
    { to: "/vendor", label: "Dashboard", icon: "📊" },
    { to: "/vendor/add-product", label: "Add Product", icon: "➕" },
    { to: "/vendor/manage-products", label: "Manage Products", icon: "📦" },
    {
      to: "/notifications",
      label: "Notifications",
      icon: <Bell size={18} />,
      count: notificationsCount,
    },
  ];

  const guestLinks: LinkItem[] = [
    { to: "/", label: "Home", icon: "🏠" },
    { to: "/login", label: "Login", icon: "🔐" },
    { to: "/signup", label: "Signup", icon: "📝" },
  ];

  let links: LinkItem[] = guestLinks;

  if (user?.role === "customer") links = customerLinks;
  if (user?.role === "vendor") links = vendorLinks;

  return (
    <>
      <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        ref={sidebarRef}
        className={`sidebar ${isOpen ? "open" : "collapsed"}`}
      >
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={() => setIsOpen(false)}
            className="sidebar-link"
          >
            <span className="sidebar-icon">{link.icon}</span>{" "}
            {translate(link.label)}
            {link.count !== undefined && link.count > 0 && (
              <span className="badge">{link.count}</span>
            )}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Sidebar;