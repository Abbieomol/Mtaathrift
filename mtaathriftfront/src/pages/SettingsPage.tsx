import { useEffect, useState, useCallback } from "react";
import type { User } from "../types/types";
import "../App.css";

type Props = {
  user: User;
  onLogout?: () => void; // ✅ added optional prop to fix TS error
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

const DEFAULT_SETTINGS: Settings = {
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

// Stable key helper — guards against undefined user.id
const getStorageKey = (userId: string | number | undefined) =>
  userId != null ? `settings-${userId}` : null;

export default function SettingsPage({ user }: Props) {
  const [settings, setSettings] = useState<Settings>(() => {
    const key = getStorageKey(user?.id);
    if (!key) return DEFAULT_SETTINGS;
    try {
      const saved = localStorage.getItem(key);
      return saved ? (JSON.parse(saved) as Settings) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">("idle");

  // Apply theme classes/data attrs to <body>
  const applySettings = useCallback((s: Settings) => {
    document.body.className = `theme-${s.colorScheme}`;
    document.body.dataset.accent = s.accentColor;
    document.body.dataset.textSize = s.textSize;
    document.body.dataset.sidebar = s.sidebarStyle;
    document.body.dataset.layout = s.postLayout;
  }, []);

  // Apply on every settings change (live preview)
  useEffect(() => {
    applySettings(settings);
  }, [settings, applySettings]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setSaveStatus("idle");
  };

  const handleSave = () => {
    const key = getStorageKey(user?.id);
    if (!key) {
      setSaveStatus("error");
      return;
    }
    try {
      localStorage.setItem(key, JSON.stringify(settings));
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2500);
    } catch {
      setSaveStatus("error");
    }
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    setSaveStatus("idle");
  };

  return (
    <div className="settings-page">
      <div className="settings-wrapper">
        <main className="settings-main">
          <div className="settings-header">
            <h2>Customize Your Experience</h2>
            <p className="settings-subtitle">
              Changes preview instantly — hit <strong>Save</strong> to persist.
            </p>
          </div>

          {/* ── Appearance ── */}
          <section className="settings-section">
            <h3 className="section-title">Appearance</h3>

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
          </section>

          {/* ── Layout ── */}
          <section className="settings-section">
            <h3 className="section-title">Layout</h3>

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
          </section>

          {/* ── Notifications ── */}
          <section className="settings-section">
            <h3 className="section-title">Notifications</h3>

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
          </section>

          {/* ── Privacy ── */}
          <section className="settings-section">
            <h3 className="section-title">Privacy & Visibility</h3>

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

            {user?.role === "customer" && (
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
          </section>

          {/* ── Preferences ── */}
          <section className="settings-section">
            <h3 className="section-title">Preferences</h3>

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
          </section>

          {/* ── Actions ── */}
          <div className="settings-actions">
            <button
              className="reset-button"
              onClick={handleReset}
              type="button"
            >
              Reset to Defaults
            </button>
            <button
              className={`save-button ${
                saveStatus === "saved" ? "saved" : ""
              } ${saveStatus === "error" ? "error" : ""}`}
              onClick={handleSave}
              type="button"
            >
              {saveStatus === "saved"
                ? "✓ Saved!"
                : saveStatus === "error"
                ? "✗ Failed"
                : "Save Settings"}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}