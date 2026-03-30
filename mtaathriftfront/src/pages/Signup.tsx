import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../services/api";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
    role: "customer",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (formData.password !== formData.password2) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await signup({
        email: formData.email,
        password: formData.password,
        password2: formData.password2,
        role: formData.role,
      });

      if (response.status === 201) {
        const data = response.data;
        if (data.user?.role === "vendor") {
          navigate("/vendor");
        } else {
          navigate("/customer");
        }
      }
    } catch (err: unknown) {
      const apiErr = err as { response?: { data?: Record<string, string[]> } };
      if (apiErr.response?.data) {
        const messages = Object.values(apiErr.response.data).flat();
        setError(messages.join(" "));
      } else {
        setError("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page page-narrow">
      <div className="form-container">
        <h1>Create account</h1>
        <p className="form-subtitle">Join MtaaM and start shopping or selling</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="Min 8 characters"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="password2"
              className="form-input"
              placeholder="Re-enter password"
              value={formData.password2}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>I want to</label>
            <select name="role" className="form-select" value={formData.role} onChange={handleChange}>
              <option value="customer">Shop (Customer)</option>
              <option value="vendor">Sell (Vendor)</option>
            </select>
          </div>

          {error && <div className="form-error">{error}</div>}

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="form-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
