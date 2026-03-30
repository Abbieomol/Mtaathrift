import { useEffect, useState } from "react";
import type { User } from "../types/types";
import "../App.css";
//import Sidebar from "../components/Sidebar";

type Props = {
  user: User;
  onLogout: () => void;
};

type Settings = {
  colorScheme: "dark" | "light" | "multicolor";
  accentColor: "green" | "orange" | "blue" | "purple" | "pink" | "red" | "yellow";
  sidebarStyle: "default" | "compact" | "expanded" | "minimal" | "collapsed";
  postLayout: "grid" | "list" | "masonry" | "carousel";
  textSize: "small" | "medium" | "large";
  notificationsEnabled: boolean;
  allowVendorMessaging: boolean;
  emailNotifications: boolean;
  autoplayVideos: boolean;
  profileVisibility: "public" | "private";
  language: "en" | "fr" | "es" | "swahili" | "arabic";
};

export default function SettingsPage({ user }: Props) {
  
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem(`settings-${user.id}`);

    return saved
      ? JSON.parse(saved)
      : {
        colorScheme: "light",
        accentColor: "green",
        sidebarStyle: "default",
        postLayout: "grid",
        textSize: "medium",
        notificationsEnabled: true,
        emailNotifications: false,
        autoplayVideos: false,
        profileVisibility: "public",
        allowVendorMessaging: false,
        language: "en",
        };
  });

  const applySettings = (s: Settings) => {
    document.body.className = "";
    document.body.classList.add(`theme-${s.colorScheme}`);
    document.body.dataset.accent = s.accentColor;
    document.body.dataset.textSize = s.textSize;
  };

  useEffect(() => {
    applySettings(settings);
  }, [settings]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : undefined;

    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem(`settings-${user.id}`, JSON.stringify(settings));
    applySettings(settings);
    alert("Settings saved!");
  };

  return (
    <div className="settings-page">
      {/* <Navbar user={user} onLogout={onLogout} /> */}

      <div className="settings-wrapper">
        {/* <Sidebar user={user} /> */}

        <main className="settings-main">
          <h2>Customize Your Experience</h2>

          
          <div className="setting-group">
            <label htmlFor="colorScheme">Theme</label>
            <select
              id="colorScheme"
              name="colorScheme"
              value={settings.colorScheme}
              onChange={handleChange}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="multicolor">Multicolor</option>
            </select>
          </div>

      {user.role === "customer" && (
  <div className="setting-group checkbox-group">
    <label>
      <input
        type="checkbox"
        name="allowVendorMessaging"
        checked={settings.allowVendorMessaging}
        onChange={handleChange}
      />
      Allow messaging from vendors
    </label>
  </div>
)} 

          <div className="setting-group">
            <label htmlFor="accentColor">Accent Color</label>
            <select
              id="accentColor"
              name="accentColor"
              value={settings.accentColor}
              onChange={handleChange}
            >
              <option value="green">Green</option>
              <option value="orange">Orange</option>
              <option value="blue">Blue</option>
              <option value="purple">Purple</option>
              <option value="pink">Pink</option>
              <option value="yellow">Yellow</option>
              <option value="red">Red</option>
            </select>
          </div>

          <div className="setting-group checkbox-group">
            <label>
            <input
              type="checkbox"
              name="emailNotifications"
              checked={settings.emailNotifications}
              onChange={handleChange}
              />
              Send notifications via Email
              </label>
              </div>

          
          <div className="setting-group">
            <label htmlFor="sidebarStyle">Sidebar Style</label>
            <select
              id="sidebarStyle"
              name="sidebarStyle"
              value={settings.sidebarStyle}
              onChange={handleChange}
            >
              <option value="default">Default</option>
              <option value="compact">Compact</option>
              <option value="expanded">Expanded</option>
              <option value="minimal">Minimal</option>
              <option value="collapsed">Collapsed</option>
            </select>
          </div>

        
          <div className="setting-group">
            <label htmlFor="postLayout">Post Layout</label>
            <select
              id="postLayout"
              name="postLayout"
              value={settings.postLayout}
              onChange={handleChange}
            >
              <option value="grid">Grid</option>
              <option value="list">List</option>
              <option value="masonry">Masonry</option>
              <option value="carousel">Carousel</option>
            </select>
          </div>


          <div className="setting-group">
            <label htmlFor="textSize">Text Size</label>
            <select
              id="textSize"
              name="textSize"
              value={settings.textSize}
              onChange={handleChange}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>


          <div className="setting-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="notificationsEnabled"
                checked={settings.notificationsEnabled}
                onChange={handleChange}
              />
              Enable Notifications
            </label>
          </div>

          {/* Auto-play Videos */}
          <div className="setting-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="autoplayVideos"
                checked={settings.autoplayVideos}
                onChange={handleChange}
              />
              Auto-play Videos
            </label>
          </div>

          <div className="setting-group">
            <label htmlFor="profileVisibility">Profile Visibility</label>
            <select
              id="profileVisibility"
              name="profileVisibility"
              value={settings.profileVisibility}
              onChange={handleChange}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          {/* Language */}
          <div className="setting-group">
            <label htmlFor="language">Language</label>
            <select
              id="language"
              name="language"
              value={settings.language}
              onChange={handleChange}
            >
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
              <option value="swahili">Swahili</option>
              <option value="arabic">Arabic</option>
            </select>
          </div>

          <button className="save-button" onClick={handleSave}>
            Save Settings
          </button>
        </main>
      </div>
    </div>
  );
}