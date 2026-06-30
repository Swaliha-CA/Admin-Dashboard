export type OrderStatus = "Take Order" | "Completed";
export type PaymentMethod = "Cash" | "UPI";
export type UserRole = "Student" | "Faculty";

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userName: string;
  admissionNumber: string;
  role: UserRole;
  items: OrderItem[];
  totalQuantity: number;
  amount: number;
  paymentMethod: PaymentMethod;
  orderTime: string;
  status: OrderStatus;
}

export interface Payment {
  id: string;
  orderId: string;
  user: string;
  amount: number;
  method: PaymentMethod;
  time: string;
}

export interface RevenuePoint {
  label: string;
  revenue: number;
  orders: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  available: boolean;
  isVeg: boolean;
  images: string[];
  quantitySold: number;
  revenue: number;
  averageDailySales: number;
}

export interface DashboardStats {
  todaysOrders: number;
  todaysRevenue: number;
  pendingOrders: number;
  bestSellingItem: string;
  ordersTrend: number;
  revenueTrend: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}
