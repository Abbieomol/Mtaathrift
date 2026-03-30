import React, { useState } from "react";
import Navbar from './Navbar';
import '../App.css';
import type { User } from '../types/types';

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <div className="layout">
      {/* Pass required props to Navbar */}
      <Navbar user={user} onLogout={handleLogout} />

      <main className="layout-container">
        {children}
      </main>
    </div>
  );
}

export default Layout;