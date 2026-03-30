import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
  FiHome,
  FiSearch,
  FiBell,
  FiHeart,
  FiShoppingCart,
  FiGrid,
  FiMenu,
  FiX,
  FiLogOut,
  FiSettings
} from "react-icons/fi";
import { fetchCart, fetchNotifications } from "../services/api";
import type { User } from "../types/types";

interface Props {
  user: User | null;
  onLogout: () => void;
}

const Badge = ({ count }: { count: number }) =>
  count > 0 ? <span className="badge">{count}</span> : null;

const Navbar: React.FC<Props> = ({ user, onLogout }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [notifCount, setNotifCount] = useState(0);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) =>
    location.pathname === path ? "nav-link active" : "nav-link";

  
  const getNavLinks = () => {
    if (!user) return [];

    if (user.role === "customer") {
      return [
        { to: "/search", icon: <FiSearch size={16} />, label: "Search" },
        { to: "/wishlist", icon: <FiHeart size={16} />, label: "Wishlist" },
        {
          to: "/cart",
          icon: <FiShoppingCart size={16} />,
          label: <>Cart <Badge count={cartCount} /></>
        },
        {
          to: "/notifications",
          icon: <FiBell size={16} />,
          label: <>Notifications <Badge count={notifCount} /></>
        },
        { to: "/customer", icon: <FiGrid size={16} />, label: "Dashboard" },
        { to: "/settings", icon: <FiSettings size={16} />, label: "Settings" }
      ];
    }

    if (user.role === "vendor") {
      return [
        { to: "/vendor", icon: <FiGrid size={16} />, label: "Dashboard" },
        {
          to: "/notifications",
          icon: <FiBell size={16} />,
          label: <>Notifications <Badge count={notifCount} /></>
        },
        { to: "/settings", icon: <FiSettings size={16} />, label: "Settings" }
      ];
    }

    return [];
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setSidebarOpen(false);
      }
    };
    if (sidebarOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [sidebarOpen]);

  useEffect(() => {
    if (!user) return;

    const fetchCounts = async () => {
      try {
        const cartData = await fetchCart();
        setCartCount(Array.isArray(cartData) ? cartData.length : 0);
      } catch (error) {
        console.error("Failed to fetch cart data", error);
      }

      try {
        const notifData = await fetchNotifications();
        setNotifCount(Array.isArray(notifData) ? notifData.length : 0);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };

    fetchCounts();
  }, [user]);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          Mtaa<span>M</span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className={isActive("/")}>
            <FiHome size={16} /> Home
          </Link>

          {!user && (
            <>
              <Link to="/login" className={isActive("/login")}>
                Log In
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm">
                Sign Up
              </Link>
            </>
          )}

          
          {getNavLinks().map((link, i) => (
            <Link key={i} to={link.to} className={isActive(link.to)}>
              {link.icon} {link.label}
            </Link>
          ))}
        </div>

        <div className="navbar-right">
          {user && (
            <>
              <span className="navbar-user">{user.email}</span>
              <button
                className="logout-btn"
                onClick={onLogout}
                title="Log out"
              >
                <FiLogOut size={16} />
              </button>
            </>
          )}
          <button
            className="menu-btn"
            onClick={() => setSidebarOpen(true)}
            title="Toggle menu"
          >
            <FiMenu />
          </button>
        </div>
      </nav>

      {sidebarOpen && (
        <>
          <div
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="sidebar" ref={sidebarRef}>
            <div className="sidebar-header">
              <span className="navbar-brand">
                Mtaa<span>M</span>
              </span>
              <button
                className="btn-ghost"
                onClick={() => setSidebarOpen(false)}
                title="Close menu"
              >
                <FiX size={18} />
              </button>
            </div>

            <Link to="/" onClick={() => setSidebarOpen(false)}>
              <FiHome /> Home
            </Link>

            {!user && (
              <>
                <Link to="/login" onClick={() => setSidebarOpen(false)}>
                  Log In
                </Link>
                <Link to="/signup" onClick={() => setSidebarOpen(false)}>
                  Sign Up
                </Link>
              </>
            )}

            
            {getNavLinks().map((link, i) => (
              <Link
                key={i}
                to={link.to}
                onClick={() => setSidebarOpen(false)}
              >
                {link.icon} {link.label}
              </Link>
            ))}

            {user && (
              <button
                onClick={() => {
                  onLogout();
                  setSidebarOpen(false);
                }}
                className="logout-link"
              >
                <FiLogOut /> Log Out
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;