export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          phone?: string;
          role: "seeker" | "provider";
          avatar_url?: string;
          created_at: string;
          updated_at: string;
          is_verified: boolean;
          language_preference: "ne" | "en";
        };
        Insert: {
          id?: string;
          email: string;
          full_name: string;
          phone?: string;
          role: "seeker" | "provider";
          avatar_url?: string;
          created_at?: string;
          updated_at?: string;
          is_verified?: boolean;
          language_preference?: "ne" | "en";
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          phone?: string;
          role?: "seeker" | "provider";
          avatar_url?: string;
          created_at?: string;
          updated_at?: string;
          is_verified?: boolean;
          language_preference?: "ne" | "en";
        };
      };
      service_providers: {
        Row: {
          id: string;
          user_id: string;
          business_name?: string;
          bio?: string;
          experience_years: number;
          province: string;
          district: string;
          municipality: string;
          ward?: number;
          street_address?: string;
          hourly_rate?: number;
          is_available: boolean;
          verified_documents: Json;
          rating_average: number;
          total_reviews: number;
          total_jobs_completed: number;
          response_rate: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          business_name?: string;
          bio?: string;
          experience_years?: number;
          province: string;
          district: string;
          municipality: string;
          ward?: number;
          street_address?: string;
          hourly_rate?: number;
          is_available?: boolean;
          verified_documents?: Json;
          rating_average?: number;
          total_reviews?: number;
          total_jobs_completed?: number;
          response_rate?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          business_name?: string;
          bio?: string;
          experience_years?: number;
          province?: string;
          district?: string;
          municipality?: string;
          ward?: number;
          street_address?: string;
          hourly_rate?: number;
          is_available?: boolean;
          verified_documents?: Json;
          rating_average?: number;
          total_reviews?: number;
          total_jobs_completed?: number;
          response_rate?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      service_categories: {
        Row: {
          id: string;
          name_en: string;
          name_ne: string;
          description_en?: string;
          description_ne?: string;
          icon: string;
          color: string;
          parent_id?: string;
          is_active: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name_en: string;
          name_ne: string;
          description_en?: string;
          description_ne?: string;
          icon: string;
          color: string;
          parent_id?: string;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name_en?: string;
          name_ne?: string;
          description_en?: string;
          description_ne?: string;
          icon?: string;
          color?: string;
          parent_id?: string;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
        };
      };
      provider_services: {
        Row: {
          id: string;
          provider_id: string;
          category_id: string;
          title_en: string;
          title_ne: string;
          description_en?: string;
          description_ne?: string;
          base_rate: number;
          max_rate?: number;
          unit: "hour" | "day" | "project" | "sq_ft";
          is_negotiable: boolean;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          provider_id: string;
          category_id: string;
          title_en: string;
          title_ne: string;
          description_en?: string;
          description_ne?: string;
          base_rate: number;
          max_rate?: number;
          unit?: "hour" | "day" | "project" | "sq_ft";
          is_negotiable?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          provider_id?: string;
          category_id?: string;
          title_en?: string;
          title_ne?: string;
          description_en?: string;
          description_ne?: string;
          base_rate?: number;
          max_rate?: number;
          unit?: "hour" | "day" | "project" | "sq_ft";
          is_negotiable?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          seeker_id: string;
          provider_id: string;
          service_id: string;
          title: string;
          description?: string;
          scheduled_date: string;
          scheduled_time: string;
          duration_hours?: number;
          status:
            | "pending"
            | "confirmed"
            | "in_progress"
            | "completed"
            | "cancelled";
          province: string;
          district: string;
          municipality: string;
          ward?: number;
          street_address?: string;
          special_instructions?: string;
          payment_method: "cash" | "esewa" | "khalti" | "online";
          base_amount: number;
          platform_fee: number;
          total_amount: number;
          payment_status: "pending" | "paid" | "refunded";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          seeker_id: string;
          provider_id: string;
          service_id: string;
          title: string;
          description?: string;
          scheduled_date: string;
          scheduled_time: string;
          duration_hours?: number;
          status?:
            | "pending"
            | "confirmed"
            | "in_progress"
            | "completed"
            | "cancelled";
          province: string;
          district: string;
          municipality: string;
          ward?: number;
          street_address?: string;
          special_instructions?: string;
          payment_method: "cash" | "esewa" | "khalti" | "online";
          base_amount: number;
          platform_fee: number;
          total_amount: number;
          payment_status?: "pending" | "paid" | "refunded";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          seeker_id?: string;
          provider_id?: string;
          service_id?: string;
          title?: string;
          description?: string;
          scheduled_date?: string;
          scheduled_time?: string;
          duration_hours?: number;
          status?:
            | "pending"
            | "confirmed"
            | "in_progress"
            | "completed"
            | "cancelled";
          province?: string;
          district?: string;
          municipality?: string;
          ward?: number;
          street_address?: string;
          special_instructions?: string;
          payment_method?: "cash" | "esewa" | "khalti" | "online";
          base_amount?: number;
          platform_fee?: number;
          total_amount?: number;
          payment_status?: "pending" | "paid" | "refunded";
          created_at?: string;
          updated_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          booking_id: string;
          reviewer_id: string;
          provider_id: string;
          rating: number;
          comment?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          booking_id: string;
          reviewer_id: string;
          provider_id: string;
          rating: number;
          comment?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          booking_id?: string;
          reviewer_id?: string;
          provider_id?: string;
          rating?: number;
          comment?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          booking_id?: string;
          sender_id: string;
          receiver_id: string;
          content: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          booking_id?: string;
          sender_id: string;
          receiver_id: string;
          content: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          booking_id?: string;
          sender_id?: string;
          receiver_id?: string;
          content?: string;
          is_read?: boolean;
          created_at?: string;
        };
      };
      provider_skills: {
        Row: {
          id: string;
          provider_id: string;
          skill_name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          provider_id: string;
          skill_name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          provider_id?: string;
          skill_name?: string;
          created_at?: string;
        };
      };
      provider_portfolio: {
        Row: {
          id: string;
          provider_id: string;
          title: string;
          description?: string;
          image_urls: Json;
          project_date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          provider_id: string;
          title: string;
          description?: string;
          image_urls: Json;
          project_date: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          provider_id?: string;
          title?: string;
          description?: string;
          image_urls?: Json;
          project_date?: string;
          created_at?: string;
        };
      };
      provider_availability: {
        Row: {
          id: string;
          provider_id: string;
          day_of_week: number;
          start_time: string;
          end_time: string;
          is_available: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          provider_id: string;
          day_of_week: number;
          start_time: string;
          end_time: string;
          is_available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          provider_id?: string;
          day_of_week?: number;
          start_time?: string;
          end_time?: string;
          is_available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: "booking" | "message" | "payment" | "review" | "general";
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          message: string;
          type: "booking" | "message" | "payment" | "review" | "general";
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          message?: string;
          type?: "booking" | "message" | "payment" | "review" | "general";
          is_read?: boolean;
          created_at?: string;
        };
      };
    };
    Views: {
      provider_stats: {
        Row: {
          provider_id: string;
          total_bookings: number;
          completed_bookings: number;
          average_rating: number;
          total_earnings: number;
          response_rate: number;
        };
      };
    };
    Functions: {
      search_providers: {
        Args: {
          search_term?: string;
          category_id?: string;
          province?: string;
          district?: string;
          min_rating?: number;
          max_rate?: number;
        };
        Returns: {
          id: string;
          full_name: string;
          business_name: string;
          bio: string;
          province: string;
          district: string;
          rating_average: number;
          hourly_rate: number;
          is_available: boolean;
        }[];
      };
    };
    Enums: {
      user_role: "seeker" | "provider";
      booking_status:
        | "pending"
        | "confirmed"
        | "in_progress"
        | "completed"
        | "cancelled";
      payment_method: "cash" | "esewa" | "khalti" | "online";
      payment_status: "pending" | "paid" | "refunded";
      notification_type:
        | "booking"
        | "message"
        | "payment"
        | "review"
        | "general";
    };
  };
}
