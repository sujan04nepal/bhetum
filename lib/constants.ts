import { ServiceCategory } from "@/types";

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "home-services",
    name: "Home Services",
    icon: "🏠",
    subcategories: [
      { id: "cleaning", name: "House Cleaning", parentId: "home-services" },
      { id: "plumbing", name: "Plumbing", parentId: "home-services" },
      { id: "electrical", name: "Electrical", parentId: "home-services" },
      { id: "gardening", name: "Gardening", parentId: "home-services" },
      { id: "painting", name: "Painting", parentId: "home-services" },
      { id: "handyman", name: "Handyman", parentId: "home-services" },
    ],
  },
  {
    id: "tutoring",
    name: "Tutoring & Education",
    icon: "📚",
    subcategories: [
      { id: "math", name: "Mathematics", parentId: "tutoring" },
      { id: "science", name: "Science", parentId: "tutoring" },
      { id: "language", name: "Language Learning", parentId: "tutoring" },
      { id: "music", name: "Music Lessons", parentId: "tutoring" },
      { id: "art", name: "Art Classes", parentId: "tutoring" },
      { id: "test-prep", name: "Test Preparation", parentId: "tutoring" },
    ],
  },
  {
    id: "consulting",
    name: "Business & Consulting",
    icon: "💼",
    subcategories: [
      {
        id: "business-strategy",
        name: "Business Strategy",
        parentId: "consulting",
      },
      { id: "marketing", name: "Marketing", parentId: "consulting" },
      { id: "legal", name: "Legal Services", parentId: "consulting" },
      { id: "accounting", name: "Accounting", parentId: "consulting" },
      { id: "hr", name: "Human Resources", parentId: "consulting" },
      { id: "finance", name: "Financial Planning", parentId: "consulting" },
    ],
  },
  {
    id: "health-wellness",
    name: "Health & Wellness",
    icon: "💪",
    subcategories: [
      {
        id: "personal-training",
        name: "Personal Training",
        parentId: "health-wellness",
      },
      { id: "yoga", name: "Yoga Instruction", parentId: "health-wellness" },
      { id: "massage", name: "Massage Therapy", parentId: "health-wellness" },
      {
        id: "nutrition",
        name: "Nutrition Coaching",
        parentId: "health-wellness",
      },
      {
        id: "mental-health",
        name: "Mental Health",
        parentId: "health-wellness",
      },
      {
        id: "physiotherapy",
        name: "Physiotherapy",
        parentId: "health-wellness",
      },
    ],
  },
  {
    id: "technology",
    name: "Technology",
    icon: "💻",
    subcategories: [
      {
        id: "web-development",
        name: "Web Development",
        parentId: "technology",
      },
      {
        id: "mobile-development",
        name: "Mobile Development",
        parentId: "technology",
      },
      { id: "it-support", name: "IT Support", parentId: "technology" },
      { id: "data-analysis", name: "Data Analysis", parentId: "technology" },
      { id: "cybersecurity", name: "Cybersecurity", parentId: "technology" },
      { id: "ui-ux-design", name: "UI/UX Design", parentId: "technology" },
    ],
  },
  {
    id: "creative",
    name: "Creative Services",
    icon: "🎨",
    subcategories: [
      { id: "graphic-design", name: "Graphic Design", parentId: "creative" },
      { id: "photography", name: "Photography", parentId: "creative" },
      { id: "videography", name: "Videography", parentId: "creative" },
      { id: "writing", name: "Writing & Editing", parentId: "creative" },
      { id: "illustration", name: "Illustration", parentId: "creative" },
      { id: "voice-over", name: "Voice Over", parentId: "creative" },
    ],
  },
];

export const BOOKING_STATUSES = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  ONGOING: "ongoing",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

export const USER_ROLES = {
  SEEKER: "seeker",
  PROVIDER: "provider",
  ADMIN: "admin",
} as const;

export const NOTIFICATION_TYPES = {
  BOOKING: "booking",
  MESSAGE: "message",
  PAYMENT: "payment",
  REVIEW: "review",
  SYSTEM: "system",
} as const;

export const PRICE_TYPES = {
  HOURLY: "hourly",
  FIXED: "fixed",
  PER_PROJECT: "per_project",
} as const;

export const PAYMENT_METHODS = {
  CARD: "card",
  WALLET: "wallet",
  BANK_TRANSFER: "bank_transfer",
} as const;

export const PLATFORM_CONFIG = {
  COMMISSION_RATE: 0.15, // 15% platform fee
  MIN_BOOKING_AMOUNT: 10,
  MAX_BOOKING_AMOUNT: 10000,
  SEARCH_RADIUS_KM: 50,
  REVIEW_RATING_MIN: 1,
  REVIEW_RATING_MAX: 5,
  PROFILE_COMPLETION_THRESHOLD: 80,
} as const;

export const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
];

export const DAYS_OF_WEEK = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const CURRENCY_SYMBOL = "$";
export const DEFAULT_CURRENCY = "USD";
