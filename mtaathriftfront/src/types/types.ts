export type User = {
  id: number;
  email: string;
  role: "customer" | "vendor";
  first_name?: string;
  last_name?: string;
  location?: string;
};

export type AuthResponse = {
  user: User;
  token: string;
  refresh: string;
};

export type SignupPayload = {
  email: string;
  password: string;
  password2: string;
  role?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type ApiError = {
  message: string;
  errors?: Record<string, string[]>;
};

export type NotificationCategory = "Orders" | "Offers" | "Messages";

export type Notification = {
  id: number;
  title: string;
  description: string;
  category: NotificationCategory;
};

export interface Product {
  id: number;
  vendor: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string;
  created_at: string;
}

export interface CartItem {
  id: number;
  product: string;
  price: number;
  quantity: number;
}

export interface WishlistItem {
  id: number;
  product: string;
  price: number;
}

export interface Todo {
  id: number;
  user: number;
  title: string;
  completed: boolean;
  created_at: string;
}
