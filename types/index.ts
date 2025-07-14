// User Types
export type UserRole = "seeker" | "provider" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Seeker extends User {
  role: "seeker";
  location: string;
  phoneNumber?: string;
  preferences?: {
    maxDistance: number;
    priceRange: [number, number];
    preferredCategories: string[];
  };
}

export interface Provider extends User {
  role: "provider";
  businessName?: string;
  description: string;
  skills: string[];
  serviceCategories: string[];
  location: string;
  phoneNumber: string;
  hourlyRate: number;
  availability: {
    [key: string]: { start: string; end: string }[];
  };
  rating: number;
  totalReviews: number;
  totalBookings: number;
  isBackgroundChecked: boolean;
  portfolio: PortfolioItem[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  images: string[];
  completedAt: Date;
}

// Service Types
export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  subcategories: ServiceSubcategory[];
}

export interface ServiceSubcategory {
  id: string;
  name: string;
  parentId: string;
}

export interface ServiceListing {
  id: string;
  providerId: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  priceType: "hourly" | "fixed" | "per_project";
  duration: number; // in minutes
  images: string[];
  tags: string[];
  isActive: boolean;
  createdAt: Date;
}

// Booking Types
export type BookingStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "ongoing"
  | "completed"
  | "cancelled";

export interface Booking {
  id: string;
  seekerId: string;
  providerId: string;
  serviceId: string;
  status: BookingStatus;
  scheduledDate: Date;
  duration: number;
  location: string;
  totalAmount: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobRequest {
  id: string;
  seekerId: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  location: string;
  deadline: Date;
  attachments?: string[];
  isActive: boolean;
  createdAt: Date;
}

// Payment Types
export interface Transaction {
  id: string;
  bookingId: string;
  payerId: string;
  payeeId: string;
  amount: number;
  fee: number;
  status: "pending" | "completed" | "failed" | "refunded";
  paymentMethod: "card" | "wallet" | "bank_transfer";
  createdAt: Date;
}

// Review Types
export interface Review {
  id: string;
  bookingId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

// Message Types
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  bookingId?: string;
  content: string;
  attachments?: string[];
  readAt?: Date;
  createdAt: Date;
}

export interface ChatRoom {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: Date;
}

// Notification Types
export type NotificationType =
  | "booking"
  | "message"
  | "payment"
  | "review"
  | "system";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  data?: any;
  createdAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}
