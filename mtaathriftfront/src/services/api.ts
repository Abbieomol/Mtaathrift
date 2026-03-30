import axios from "axios";

interface SignupData {
  email: string;
  password: string;
  password2: string;
  role?: string;
}

interface LoginData {
  email: string;
  password: string;
}

// Create axios instance
const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// Attach access token to every request except signup/login
API.interceptors.request.use((config) => {
  if (config.url?.includes("/signup/") || config.url?.includes("/login/")) {
    return config;
  }

  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses and refresh token
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const res = await API.post("/auth/token/refresh/", {
            refresh: refreshToken,
          });
          localStorage.setItem("accessToken", res.data.access);
          originalRequest.headers["Authorization"] = `Bearer ${res.data.access}`;
          return API(originalRequest);
        } catch {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");
          window.location.href = "/login";
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  }
);

// Auth
export const signup = async (data: SignupData) => {
  const payload = {
    email: data.email,
    password: data.password,
    password2: data.password2,
    role: data.role || "customer",
  };

  const res = await API.post("/auth/signup/", payload);

  if (res.data.token && res.data.refresh) {
    localStorage.setItem("accessToken", res.data.token);
    localStorage.setItem("refreshToken", res.data.refresh);
  }
  if (res.data.user) {
    localStorage.setItem("user", JSON.stringify(res.data.user));
  }
  return res;
};

export const login = async (data: LoginData) => {
  const res = await API.post("/auth/login/", data);
  if (res.data.token && res.data.refresh) {
    localStorage.setItem("accessToken", res.data.token);
    localStorage.setItem("refreshToken", res.data.refresh);
  }
  if (res.data.user) {
    localStorage.setItem("user", JSON.stringify(res.data.user));
  }
  return res;
};

// Products
export const fetchProducts = async () => {
  const res = await API.get("/api/products/");
  return res.data;
};

// Posts
export const createPost = async (data: FormData) => {
  const res = await API.post("/api/posts/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Cart
export const fetchCart = async () => {
  const res = await API.get("/api/cart/");
  return res.data;
};

export const addToCart = async (product_id: number, quantity = 1) => {
  const res = await API.post("/api/cart/add/", { product_id, quantity });
  return res.data;
};

export const removeFromCart = async (item_id: string | number) => {
  const res = await API.delete(`/api/cart/remove/${item_id}/`);
  return res.data;
};

export const updateCartItem = async (item_id: number, quantity: number) => {
  const res = await API.post("/api/cart/update/", { item_id, quantity });
  return res.data;
};

export const checkoutCart = async () => {
  const res = await API.post("/api/cart/checkout/", {});
  return res.data;
};

// Wishlist
export const addToWishlist = async (product_id: number) => {
  const res = await API.post("/api/wishlist/add/", { product_id });
  return res.data;
};

export const getWishlist = async () => {
  const res = await API.get("/api/wishlist/");
  return res.data;
};

export const removeWishlistItem = async (item_id: number) => {
  const res = await API.delete(`/api/wishlist/remove/${item_id}/`);
  return res.data;
};

// Notifications
export const fetchNotifications = async () => {
  const res = await API.get("/api/notifications/");
  return res.data;
};

// Profile
export const getProfile = async () => {
  const res = await API.get("/auth/profile/");
  return res.data;
};

export const updateProfile = async (data: { first_name?: string; last_name?: string; location?: string }) => {
  const res = await API.patch("/auth/profile/", data);
  return res.data;
};

// Todos
export const fetchTodos = async () => {
  const res = await API.get("/auth/todos/");
  return res.data;
};

export const createTodo = async (title: string) => {
  const res = await API.post("/auth/todos/", { title });
  return res.data;
};

export const updateTodo = async (id: number, data: { title?: string; completed?: boolean }) => {
  const res = await API.patch(`/auth/todos/${id}/`, data);
  return res.data;
};

export const deleteTodo = async (id: number) => {
  const res = await API.delete(`/auth/todos/${id}/`);
  return res.data;
};

// Follow
export const getFollowStatus = async (targetEmail: string) => {
  const res = await API.get(`/api/follow-status/${targetEmail}/`);
  return res.data;
};

export const toggleFollow = async (targetEmail: string) => {
  const res = await API.post(`/api/toggle-follow/${targetEmail}/`);
  return res.data;
};

export default API;
