import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types based on our schema
export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  role: "seeker" | "provider" | "admin";
  status: "active" | "inactive" | "suspended" | "pending_verification";
  bio?: string;
  province?: string;
  district?: string;
  municipality?: string;
  language: "ne" | "en";
  created_at: string;
  updated_at: string;
}

export interface ProviderProfile {
  id: string;
  user_id: string;
  business_name?: string;
  years_experience: number;
  total_jobs_completed: number;
  total_earnings: number;
  average_rating: number;
  total_reviews: number;
  verification_status: "pending" | "verified" | "rejected";
  base_hourly_rate?: number;
  created_at: string;
}

export interface ServiceCategory {
  id: string;
  name_en: string;
  name_ne: string;
  description_en?: string;
  description_ne?: string;
  icon?: string;
  color?: string;
  is_active: boolean;
  sort_order: number;
}

export interface ServiceSubcategory {
  id: string;
  category_id: string;
  name_en: string;
  name_ne: string;
  is_active: boolean;
  sort_order: number;
}

export interface Service {
  id: string;
  provider_id: string;
  category_id: string;
  subcategory_id?: string;
  title: string;
  description: string;
  pricing_type: "fixed" | "hourly" | "per_project" | "negotiable";
  price?: number;
  currency: string;
  status: "pending" | "active" | "inactive" | "suspended";
  total_bookings: number;
  average_rating: number;
  total_reviews: number;
  created_at: string;
}

export interface Booking {
  id: string;
  booking_number: string;
  customer_id: string;
  provider_id: string;
  service_id: string;
  service_title: string;
  scheduled_date: string;
  scheduled_time: string;
  service_location: string;
  service_price: number;
  platform_fee: number;
  total_amount: number;
  status:
    | "pending"
    | "confirmed"
    | "in_progress"
    | "completed"
    | "cancelled"
    | "disputed"
    | "refunded";
  customer_rating?: number;
  customer_review?: string;
  created_at: string;
}

export interface PaymentTransaction {
  id: string;
  booking_id: string;
  transaction_reference: string;
  payment_method: "cash" | "esewa" | "khalti" | "ime_pay" | "bank_transfer";
  amount: number;
  status:
    | "pending"
    | "processing"
    | "completed"
    | "failed"
    | "cancelled"
    | "refunded";
  completed_at?: string;
}

export interface Review {
  id: string;
  booking_id: string;
  reviewer_id: string;
  reviewee_id: string;
  service_id: string;
  rating: number;
  title?: string;
  content?: string;
  quality_rating?: number;
  punctuality_rating?: number;
  communication_rating?: number;
  value_rating?: number;
  created_at: string;
}

export interface Conversation {
  id: string;
  booking_id?: string;
  participant_1_id: string;
  participant_2_id: string;
  last_message_at?: string;
  last_message_preview?: string;
  created_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type: "text" | "image" | "file" | "system";
  is_read: boolean;
  created_at: string;
}

// Database service functions
export class DatabaseService {
  // User functions
  static async getUsers(filters?: { role?: string; status?: string }) {
    let query = supabase.from("users").select("*");

    if (filters?.role) {
      query = query.eq("role", filters.role);
    }
    if (filters?.status) {
      query = query.eq("status", filters.status);
    }

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });
    if (error) throw error;
    return data as User[];
  }

  static async getUserById(id: string) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as User;
  }

  static async createUser(user: Partial<User>) {
    const { data, error } = await supabase
      .from("users")
      .insert(user)
      .select()
      .single();

    if (error) throw error;
    return data as User;
  }

  // Provider functions
  static async getProviders(filters?: { verification_status?: string }) {
    let query = supabase.from("provider_profiles").select(`
        *,
        users:user_id (
          id, full_name, email, phone, province, district, municipality, created_at
        )
      `);

    if (filters?.verification_status) {
      query = query.eq("verification_status", filters.verification_status);
    }

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });
    if (error) throw error;
    return data;
  }

  static async getProviderProfile(userId: string) {
    const { data, error } = await supabase
      .from("provider_profiles")
      .select(
        `
        *,
        users:user_id (*)
      `,
      )
      .eq("user_id", userId)
      .single();

    if (error) throw error;
    return data;
  }

  // Service functions
  static async getServices(filters?: {
    provider_id?: string;
    category_id?: string;
    status?: string;
  }) {
    let query = supabase.from("services").select(`
        *,
        users:provider_id (full_name, email),
        service_categories:category_id (name_en, name_ne),
        service_subcategories:subcategory_id (name_en, name_ne)
      `);

    if (filters?.provider_id) {
      query = query.eq("provider_id", filters.provider_id);
    }
    if (filters?.category_id) {
      query = query.eq("category_id", filters.category_id);
    }
    if (filters?.status) {
      query = query.eq("status", filters.status);
    }

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });
    if (error) throw error;
    return data;
  }

  static async getServiceById(id: string) {
    const { data, error } = await supabase
      .from("services")
      .select(
        `
        *,
        users:provider_id (full_name, email, phone),
        service_categories:category_id (name_en, name_ne),
        service_subcategories:subcategory_id (name_en, name_ne)
      `,
      )
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  }

  static async createService(service: Partial<Service>) {
    const { data, error } = await supabase
      .from("services")
      .insert(service)
      .select()
      .single();

    if (error) throw error;
    return data as Service;
  }

  // Category functions
  static async getServiceCategories() {
    const { data, error } = await supabase
      .from("service_categories")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) throw error;
    return data as ServiceCategory[];
  }

  static async getServiceSubcategories(categoryId?: string) {
    let query = supabase
      .from("service_subcategories")
      .select("*")
      .eq("is_active", true);

    if (categoryId) {
      query = query.eq("category_id", categoryId);
    }

    const { data, error } = await query.order("sort_order", {
      ascending: true,
    });
    if (error) throw error;
    return data as ServiceSubcategory[];
  }

  // Booking functions
  static async getBookings(filters?: {
    customer_id?: string;
    provider_id?: string;
    status?: string;
  }) {
    let query = supabase.from("bookings").select(`
        *,
        customer:customer_id (full_name, email, phone),
        provider:provider_id (full_name, email, phone),
        service:service_id (title, category_id),
        payment_transactions (payment_method, status)
      `);

    if (filters?.customer_id) {
      query = query.eq("customer_id", filters.customer_id);
    }
    if (filters?.provider_id) {
      query = query.eq("provider_id", filters.provider_id);
    }
    if (filters?.status) {
      query = query.eq("status", filters.status);
    }

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });
    if (error) throw error;
    return data;
  }

  static async createBooking(booking: Partial<Booking>) {
    const { data, error } = await supabase
      .from("bookings")
      .insert(booking)
      .select()
      .single();

    if (error) throw error;
    return data as Booking;
  }

  static async updateBookingStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Booking;
  }

  // Review functions
  static async getReviews(filters?: {
    reviewee_id?: string;
    service_id?: string;
  }) {
    let query = supabase.from("reviews").select(`
        *,
        reviewer:reviewer_id (full_name),
        reviewee:reviewee_id (full_name),
        service:service_id (title)
      `);

    if (filters?.reviewee_id) {
      query = query.eq("reviewee_id", filters.reviewee_id);
    }
    if (filters?.service_id) {
      query = query.eq("service_id", filters.service_id);
    }

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });
    if (error) throw error;
    return data;
  }

  static async createReview(review: Partial<Review>) {
    const { data, error } = await supabase
      .from("reviews")
      .insert(review)
      .select()
      .single();

    if (error) throw error;
    return data as Review;
  }

  // Messaging functions
  static async getConversations(userId: string) {
    const { data, error } = await supabase
      .from("conversations")
      .select(
        `
        *,
        participant_1:participant_1_id (full_name),
        participant_2:participant_2_id (full_name),
        booking:booking_id (service_title, status)
      `,
      )
      .or(`participant_1_id.eq.${userId},participant_2_id.eq.${userId}`)
      .order("last_message_at", { ascending: false, nullsFirst: false });

    if (error) throw error;
    return data;
  }

  static async getMessages(conversationId: string) {
    const { data, error } = await supabase
      .from("messages")
      .select(
        `
        *,
        sender:sender_id (full_name)
      `,
      )
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data;
  }

  static async sendMessage(message: Partial<Message>) {
    const { data, error } = await supabase
      .from("messages")
      .insert(message)
      .select()
      .single();

    if (error) throw error;
    return data as Message;
  }

  // Payment functions
  static async createPaymentTransaction(
    transaction: Partial<PaymentTransaction>,
  ) {
    const { data, error } = await supabase
      .from("payment_transactions")
      .insert(transaction)
      .select()
      .single();

    if (error) throw error;
    return data as PaymentTransaction;
  }

  static async updatePaymentStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from("payment_transactions")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as PaymentTransaction;
  }

  // Analytics functions
  static async getPlatformAnalytics(startDate?: string, endDate?: string) {
    let query = supabase.from("platform_analytics").select("*");

    if (startDate) {
      query = query.gte("date", startDate);
    }
    if (endDate) {
      query = query.lte("date", endDate);
    }

    const { data, error } = await query.order("date", { ascending: false });
    if (error) throw error;
    return data;
  }

  // Search functions
  static async searchServices(
    query: string,
    filters?: {
      category_id?: string;
      location?: string;
      price_min?: number;
      price_max?: number;
    },
  ) {
    let dbQuery = supabase
      .from("services")
      .select(
        `
        *,
        users:provider_id (full_name, province, district, municipality),
        service_categories:category_id (name_en, name_ne)
      `,
      )
      .eq("status", "active")
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`);

    if (filters?.category_id) {
      dbQuery = dbQuery.eq("category_id", filters.category_id);
    }

    if (filters?.price_min) {
      dbQuery = dbQuery.gte("price", filters.price_min);
    }

    if (filters?.price_max) {
      dbQuery = dbQuery.lte("price", filters.price_max);
    }

    const { data, error } = await dbQuery
      .order("average_rating", { ascending: false })
      .limit(50);

    if (error) throw error;
    return data;
  }
}
