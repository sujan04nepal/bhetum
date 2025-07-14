import { ServiceCategory } from "@/types";

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "digital-online",
    name: "Digital & Online Services",
    icon: "💻",
    subcategories: [
      // Content & Marketing
      {
        id: "freelance-writing",
        name: "Freelance Writing & Blogging",
        parentId: "digital-online",
      },
      {
        id: "social-media",
        name: "Social Media Management",
        parentId: "digital-online",
      },
      {
        id: "seo-consulting",
        name: "SEO Consulting",
        parentId: "digital-online",
      },
      {
        id: "email-marketing",
        name: "Email Marketing",
        parentId: "digital-online",
      },
      {
        id: "content-planning",
        name: "Content Planning & Calendar",
        parentId: "digital-online",
      },
      // Design & Creative
      {
        id: "graphic-design",
        name: "Graphic Design & Branding",
        parentId: "digital-online",
      },
      { id: "ui-ux-design", name: "UI/UX Design", parentId: "digital-online" },
      {
        id: "video-editing",
        name: "Video Editing & Animation",
        parentId: "digital-online",
      },
      {
        id: "presentation-design",
        name: "Presentation Design",
        parentId: "digital-online",
      },
      // Tech & Development
      {
        id: "web-development",
        name: "Web/App Development",
        parentId: "digital-online",
      },
      {
        id: "wordpress-setup",
        name: "WordPress/Shopify Setup",
        parentId: "digital-online",
      },
      {
        id: "automation",
        name: "Automation & API Integration",
        parentId: "digital-online",
      },
      // Data & Research
      {
        id: "data-entry",
        name: "Data Entry & Analysis",
        parentId: "digital-online",
      },
      {
        id: "research-services",
        name: "Research Services",
        parentId: "digital-online",
      },
      {
        id: "virtual-assistant",
        name: "Virtual Assistant",
        parentId: "digital-online",
      },
    ],
  },
  {
    id: "trade-skilled",
    name: "Trade & Skilled Labor",
    icon: "🔧",
    subcategories: [
      // Home Repair & Improvement
      { id: "plumbing", name: "Plumbing Services", parentId: "trade-skilled" },
      {
        id: "electrical",
        name: "Electrical Repairs",
        parentId: "trade-skilled",
      },
      { id: "carpentry", name: "Carpentry", parentId: "trade-skilled" },
      { id: "painting", name: "Painting Services", parentId: "trade-skilled" },
      {
        id: "flooring",
        name: "Tile & Flooring Work",
        parentId: "trade-skilled",
      },
      {
        id: "installation",
        name: "Fixture Installation",
        parentId: "trade-skilled",
      },
      // Appliance & Technical
      {
        id: "appliance-repair",
        name: "Appliance Repair",
        parentId: "trade-skilled",
      },
      { id: "ac-servicing", name: "AC Servicing", parentId: "trade-skilled" },
      {
        id: "computer-repair",
        name: "Computer/Laptop Repair",
        parentId: "trade-skilled",
      },
      // Cleaning & Maintenance
      {
        id: "deep-cleaning",
        name: "Deep Home Cleaning",
        parentId: "trade-skilled",
      },
      {
        id: "specialized-cleaning",
        name: "Carpet/Sofa Cleaning",
        parentId: "trade-skilled",
      },
      { id: "pest-control", name: "Pest Control", parentId: "trade-skilled" },
    ],
  },
  {
    id: "automotive",
    name: "Automotive Services",
    icon: "🚗",
    subcategories: [
      { id: "car-washing", name: "Car/Bike Washing", parentId: "automotive" },
      {
        id: "tire-repair",
        name: "Tire Repair & Replacement",
        parentId: "automotive",
      },
      { id: "oil-change", name: "Oil Change", parentId: "automotive" },
      { id: "maintenance", name: "Basic Maintenance", parentId: "automotive" },
      {
        id: "battery-service",
        name: "Battery Jump-start",
        parentId: "automotive",
      },
      {
        id: "restoration",
        name: "Headlight Restoration",
        parentId: "automotive",
      },
    ],
  },
  {
    id: "creative-artisanal",
    name: "Creative & Artisanal",
    icon: "🎨",
    subcategories: [
      // Craft & Custom Products
      {
        id: "handmade-items",
        name: "Handmade Jewelry & Gifts",
        parentId: "creative-artisanal",
      },
      {
        id: "textile-crafts",
        name: "Embroidery & Textile Arts",
        parentId: "creative-artisanal",
      },
      {
        id: "soap-candles",
        name: "Soap & Candle Making",
        parentId: "creative-artisanal",
      },
      {
        id: "3d-printing",
        name: "3D Printing Services",
        parentId: "creative-artisanal",
      },
      { id: "resin-art", name: "Resin Art", parentId: "creative-artisanal" },
      // Art & Visuals
      {
        id: "custom-illustration",
        name: "Custom Illustration",
        parentId: "creative-artisanal",
      },
      {
        id: "tattoo-design",
        name: "Tattoo Design",
        parentId: "creative-artisanal",
      },
      {
        id: "henna-mehendi",
        name: "Henna & Mehendi",
        parentId: "creative-artisanal",
      },
      {
        id: "mural-painting",
        name: "Mural Painting",
        parentId: "creative-artisanal",
      },
      {
        id: "calligraphy",
        name: "Calligraphy & Invitations",
        parentId: "creative-artisanal",
      },
    ],
  },
  {
    id: "online-selling",
    name: "Online Business & Passive Income",
    icon: "💰",
    subcategories: [
      {
        id: "digital-templates",
        name: "Digital Templates Creation",
        parentId: "online-selling",
      },
      {
        id: "digital-art-ebooks",
        name: "Digital Art & eBooks",
        parentId: "online-selling",
      },
      {
        id: "stock-content",
        name: "Stock Photography/Videos",
        parentId: "online-selling",
      },
      {
        id: "course-creation",
        name: "Course Creation",
        parentId: "online-selling",
      },
      {
        id: "affiliate-marketing",
        name: "Affiliate Marketing",
        parentId: "online-selling",
      },
      {
        id: "dropshipping",
        name: "Dropshipping Setup",
        parentId: "online-selling",
      },
      {
        id: "print-on-demand",
        name: "Print-on-Demand Business",
        parentId: "online-selling",
      },
      {
        id: "ai-prompts",
        name: "AI Prompt Creation",
        parentId: "online-selling",
      },
    ],
  },
  {
    id: "teaching-coaching",
    name: "Teaching & Coaching",
    icon: "🎓",
    subcategories: [
      // Academic & Skills
      {
        id: "online-tutoring",
        name: "Online Tutoring",
        parentId: "teaching-coaching",
      },
      {
        id: "coding-kids",
        name: "Coding for Kids",
        parentId: "teaching-coaching",
      },
      {
        id: "music-lessons",
        name: "Music & Instrument Lessons",
        parentId: "teaching-coaching",
      },
      {
        id: "public-speaking",
        name: "Public Speaking Training",
        parentId: "teaching-coaching",
      },
      {
        id: "test-prep",
        name: "Test Preparation",
        parentId: "teaching-coaching",
      },
      // Soft Skills & Coaching
      {
        id: "life-coaching",
        name: "Life Coaching",
        parentId: "teaching-coaching",
      },
      {
        id: "career-coaching",
        name: "Career Coaching",
        parentId: "teaching-coaching",
      },
      {
        id: "meditation",
        name: "Meditation & Mindfulness",
        parentId: "teaching-coaching",
      },
      {
        id: "productivity-coaching",
        name: "Productivity Coaching",
        parentId: "teaching-coaching",
      },
    ],
  },
  {
    id: "personal-care",
    name: "Personal Care & Lifestyle",
    icon: "💅",
    subcategories: [
      {
        id: "hair-styling",
        name: "Haircut & Hairstyling",
        parentId: "personal-care",
      },
      {
        id: "makeup-services",
        name: "Makeup Services",
        parentId: "personal-care",
      },
      {
        id: "nail-care",
        name: "Manicure & Pedicure",
        parentId: "personal-care",
      },
      {
        id: "massage-therapy",
        name: "Massage Therapy",
        parentId: "personal-care",
      },
      {
        id: "beauty-treatments",
        name: "Waxing & Threading",
        parentId: "personal-care",
      },
      {
        id: "fitness-training",
        name: "Personal Fitness Training",
        parentId: "personal-care",
      },
      {
        id: "yoga-instruction",
        name: "Yoga Instruction",
        parentId: "personal-care",
      },
      { id: "diet-planning", name: "Diet Planning", parentId: "personal-care" },
    ],
  },
  {
    id: "events-hospitality",
    name: "Events & Hospitality",
    icon: "🎉",
    subcategories: [
      {
        id: "event-planning",
        name: "Birthday & Event Planning",
        parentId: "events-hospitality",
      },
      {
        id: "wedding-decor",
        name: "Wedding Decor",
        parentId: "events-hospitality",
      },
      {
        id: "dj-mc-services",
        name: "DJ & MC Services",
        parentId: "events-hospitality",
      },
      {
        id: "photography",
        name: "Photography & Videography",
        parentId: "events-hospitality",
      },
      {
        id: "face-painting",
        name: "Face Painting for Kids",
        parentId: "events-hospitality",
      },
      {
        id: "catering",
        name: "Food Catering & Baking",
        parentId: "events-hospitality",
      },
      {
        id: "gift-wrapping",
        name: "Custom Gift Wrapping",
        parentId: "events-hospitality",
      },
    ],
  },
  {
    id: "safety-tech-setup",
    name: "Safety & Tech Setup",
    icon: "🔒",
    subcategories: [
      {
        id: "cctv-installation",
        name: "CCTV Installation",
        parentId: "safety-tech-setup",
      },
      {
        id: "smart-devices",
        name: "Smart Lock & Doorbell Setup",
        parentId: "safety-tech-setup",
      },
      {
        id: "wifi-networking",
        name: "Wi-Fi & Networking Setup",
        parentId: "safety-tech-setup",
      },
      {
        id: "device-setup",
        name: "Device Setup & Troubleshooting",
        parentId: "safety-tech-setup",
      },
      {
        id: "elderly-tech",
        name: "Tech Setup for Elderly",
        parentId: "safety-tech-setup",
      },
    ],
  },
  {
    id: "niche-fun",
    name: "Niche & Fun Services",
    icon: "🎲",
    subcategories: [
      { id: "game-coaching", name: "Game Coaching", parentId: "niche-fun" },
      {
        id: "dream-interpretation",
        name: "Dream Interpretation",
        parentId: "niche-fun",
      },
      {
        id: "love-letters",
        name: "Personalized Love Letters",
        parentId: "niche-fun",
      },
      {
        id: "astrology-tarot",
        name: "Astrology & Tarot Readings",
        parentId: "niche-fun",
      },
      {
        id: "virtual-friend",
        name: "Virtual Friend Services",
        parentId: "niche-fun",
      },
      {
        id: "dating-profile",
        name: "Dating Profile Optimization",
        parentId: "niche-fun",
      },
      {
        id: "name-suggestions",
        name: "Business Name Suggestions",
        parentId: "niche-fun",
      },
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

// Vibrant color themes for categories
export const CATEGORY_COLORS = {
  "digital-online": {
    gradient: "from-blue-400 to-purple-600",
    bg: "bg-blue-50",
    text: "text-blue-700",
    accent: "bg-blue-500",
  },
  "trade-skilled": {
    gradient: "from-orange-400 to-red-600",
    bg: "bg-orange-50",
    text: "text-orange-700",
    accent: "bg-orange-500",
  },
  automotive: {
    gradient: "from-gray-400 to-slate-600",
    bg: "bg-gray-50",
    text: "text-gray-700",
    accent: "bg-gray-500",
  },
  "creative-artisanal": {
    gradient: "from-pink-400 to-rose-600",
    bg: "bg-pink-50",
    text: "text-pink-700",
    accent: "bg-pink-500",
  },
  "online-selling": {
    gradient: "from-green-400 to-emerald-600",
    bg: "bg-green-50",
    text: "text-green-700",
    accent: "bg-green-500",
  },
  "teaching-coaching": {
    gradient: "from-indigo-400 to-blue-600",
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    accent: "bg-indigo-500",
  },
  "personal-care": {
    gradient: "from-purple-400 to-pink-600",
    bg: "bg-purple-50",
    text: "text-purple-700",
    accent: "bg-purple-500",
  },
  "events-hospitality": {
    gradient: "from-yellow-400 to-orange-600",
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    accent: "bg-yellow-500",
  },
  "safety-tech-setup": {
    gradient: "from-teal-400 to-cyan-600",
    bg: "bg-teal-50",
    text: "text-teal-700",
    accent: "bg-teal-500",
  },
  "niche-fun": {
    gradient: "from-violet-400 to-purple-600",
    bg: "bg-violet-50",
    text: "text-violet-700",
    accent: "bg-violet-500",
  },
} as const;
