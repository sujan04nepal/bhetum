export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = "seeker" | "provider" | "admin";
export type UserStatus =
  | "active"
  | "inactive"
  | "suspended"
  | "pending_verification"
  | "banned";
export type VerificationStatus =
  | "pending"
  | "under_review"
  | "verified"
  | "rejected";
export type BookingStatus =
  | "pending"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "disputed";
export type PaymentStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "refunded";
export type PaymentMethod =
  | "esewa"
  | "khalti"
  | "ime_pay"
  | "connect_ips"
  | "bank_transfer"
  | "cash";
export type NotificationType = "email" | "push" | "sms" | "in_app";
export type DisputeStatus =
  | "open"
  | "in_review"
  | "resolved"
  | "escalated"
  | "closed";

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          phone?: string;
          avatar_url?: string;
          role: UserRole;
          status: UserStatus;
          bio?: string;
          date_of_birth?: string;
          gender?: string;
          province?: string;
          district?: string;
          municipality?: string;
          ward?: number;
          street_address?: string;
          postal_code?: string;
          language_preference: string;
          email_notifications: boolean;
          push_notifications: boolean;
          sms_notifications: boolean;
          created_at: string;
          updated_at: string;
          last_login_at?: string;
          email_verified_at?: string;
          phone_verified_at?: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          phone?: string;
          avatar_url?: string;
          role?: UserRole;
          status?: UserStatus;
          bio?: string;
          date_of_birth?: string;
          gender?: string;
          province?: string;
          district?: string;
          municipality?: string;
          ward?: number;
          street_address?: string;
          postal_code?: string;
          language_preference?: string;
          email_notifications?: boolean;
          push_notifications?: boolean;
          sms_notifications?: boolean;
          created_at?: string;
          updated_at?: string;
          last_login_at?: string;
          email_verified_at?: string;
          phone_verified_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          phone?: string;
          avatar_url?: string;
          role?: UserRole;
          status?: UserStatus;
          bio?: string;
          date_of_birth?: string;
          gender?: string;
          province?: string;
          district?: string;
          municipality?: string;
          ward?: number;
          street_address?: string;
          postal_code?: string;
          language_preference?: string;
          email_notifications?: boolean;
          push_notifications?: boolean;
          sms_notifications?: boolean;
          updated_at?: string;
          last_login_at?: string;
          email_verified_at?: string;
          phone_verified_at?: string;
        };
      };
      service_categories: {
        Row: {
          id: string;
          name_en: string;
          name_ne: string;
          description_en?: string;
          description_ne?: string;
          icon?: string;
          color_code?: string;
          image_url?: string;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name_en: string;
          name_ne: string;
          description_en?: string;
          description_ne?: string;
          icon?: string;
          color_code?: string;
          image_url?: string;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name_en?: string;
          name_ne?: string;
          description_en?: string;
          description_ne?: string;
          icon?: string;
          color_code?: string;
          image_url?: string;
          is_active?: boolean;
          sort_order?: number;
          updated_at?: string;
        };
      };
      service_subcategories: {
        Row: {
          id: string;
          category_id: string;
          name_en: string;
          name_ne: string;
          description_en?: string;
          description_ne?: string;
          icon?: string;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_id: string;
          name_en: string;
          name_ne: string;
          description_en?: string;
          description_ne?: string;
          icon?: string;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string;
          name_en?: string;
          name_ne?: string;
          description_en?: string;
          description_ne?: string;
          icon?: string;
          is_active?: boolean;
          sort_order?: number;
          updated_at?: string;
        };
      };
      provider_profiles: {
        Row: {
          id: string;
          user_id: string;
          business_name?: string;
          business_type?: string;
          years_experience: number;
          base_hourly_rate?: number;
          verification_status: VerificationStatus;
          verified_at?: string;
          verified_by?: string;
          verification_notes?: string;
          citizenship_number?: string;
          citizenship_front_url?: string;
          citizenship_back_url?: string;
          business_license_url?: string;
          certificate_urls?: string[];
          profile_image_urls?: string[];
          total_jobs_completed: number;
          total_earnings: number;
          average_rating: number;
          total_reviews: number;
          response_rate: number;
          completion_rate: number;
          is_available: boolean;
          availability_schedule?: Json;
          bank_name?: string;
          bank_account_number?: string;
          bank_account_holder?: string;
          esewa_id?: string;
          khalti_id?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          business_name?: string;
          business_type?: string;
          years_experience?: number;
          base_hourly_rate?: number;
          verification_status?: VerificationStatus;
          verified_at?: string;
          verified_by?: string;
          verification_notes?: string;
          citizenship_number?: string;
          citizenship_front_url?: string;
          citizenship_back_url?: string;
          business_license_url?: string;
          certificate_urls?: string[];
          profile_image_urls?: string[];
          total_jobs_completed?: number;
          total_earnings?: number;
          average_rating?: number;
          total_reviews?: number;
          response_rate?: number;
          completion_rate?: number;
          is_available?: boolean;
          availability_schedule?: Json;
          bank_name?: string;
          bank_account_number?: string;
          bank_account_holder?: string;
          esewa_id?: string;
          khalti_id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          business_name?: string;
          business_type?: string;
          years_experience?: number;
          base_hourly_rate?: number;
          verification_status?: VerificationStatus;
          verified_at?: string;
          verified_by?: string;
          verification_notes?: string;
          citizenship_number?: string;
          citizenship_front_url?: string;
          citizenship_back_url?: string;
          business_license_url?: string;
          certificate_urls?: string[];
          profile_image_urls?: string[];
          total_jobs_completed?: number;
          total_earnings?: number;
          average_rating?: number;
          total_reviews?: number;
          response_rate?: number;
          completion_rate?: number;
          is_available?: boolean;
          availability_schedule?: Json;
          bank_name?: string;
          bank_account_number?: string;
          bank_account_holder?: string;
          esewa_id?: string;
          khalti_id?: string;
          updated_at?: string;
        };
      };
      provider_services: {
        Row: {
          id: string;
          provider_id: string;
          category_id: string;
          subcategory_id: string;
          title_en: string;
          title_ne: string;
          description_en: string;
          description_ne: string;
          pricing_type: string;
          base_price?: number;
          min_price?: number;
          max_price?: number;
          service_duration?: number;
          service_location: string;
          service_areas?: string[];
          requirements?: string[];
          included_items?: string[];
          excluded_items?: string[];
          image_urls?: string[];
          video_url?: string;
          is_active: boolean;
          approval_status: VerificationStatus;
          approved_at?: string;
          approved_by?: string;
          rejection_reason?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          provider_id: string;
          category_id: string;
          subcategory_id: string;
          title_en: string;
          title_ne: string;
          description_en: string;
          description_ne: string;
          pricing_type: string;
          base_price?: number;
          min_price?: number;
          max_price?: number;
          service_duration?: number;
          service_location: string;
          service_areas?: string[];
          requirements?: string[];
          included_items?: string[];
          excluded_items?: string[];
          image_urls?: string[];
          video_url?: string;
          is_active?: boolean;
          approval_status?: VerificationStatus;
          approved_at?: string;
          approved_by?: string;
          rejection_reason?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          provider_id?: string;
          category_id?: string;
          subcategory_id?: string;
          title_en?: string;
          title_ne?: string;
          description_en?: string;
          description_ne?: string;
          pricing_type?: string;
          base_price?: number;
          min_price?: number;
          max_price?: number;
          service_duration?: number;
          service_location?: string;
          service_areas?: string[];
          requirements?: string[];
          included_items?: string[];
          excluded_items?: string[];
          image_urls?: string[];
          video_url?: string;
          is_active?: boolean;
          approval_status?: VerificationStatus;
          approved_at?: string;
          approved_by?: string;
          rejection_reason?: string;
          updated_at?: string;
        };
      };
      service_requests: {
        Row: {
          id: string;
          requester_id: string;
          category_id: string;
          subcategory_id: string;
          title: string;
          description: string;
          service_location: string;
          province?: string;
          district?: string;
          municipality?: string;
          ward?: number;
          street_address?: string;
          latitude?: number;
          longitude?: number;
          preferred_date?: string;
          preferred_time?: string;
          flexible_timing: boolean;
          urgency: string;
          budget_min?: number;
          budget_max?: number;
          budget_type: string;
          requirements?: string[];
          preferred_provider_type: string;
          image_urls?: string[];
          is_active: boolean;
          expires_at?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          requester_id: string;
          category_id: string;
          subcategory_id: string;
          title: string;
          description: string;
          service_location: string;
          province?: string;
          district?: string;
          municipality?: string;
          ward?: number;
          street_address?: string;
          latitude?: number;
          longitude?: number;
          preferred_date?: string;
          preferred_time?: string;
          flexible_timing?: boolean;
          urgency: string;
          budget_min?: number;
          budget_max?: number;
          budget_type: string;
          requirements?: string[];
          preferred_provider_type: string;
          image_urls?: string[];
          is_active?: boolean;
          expires_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          requester_id?: string;
          category_id?: string;
          subcategory_id?: string;
          title?: string;
          description?: string;
          service_location?: string;
          province?: string;
          district?: string;
          municipality?: string;
          ward?: number;
          street_address?: string;
          latitude?: number;
          longitude?: number;
          preferred_date?: string;
          preferred_time?: string;
          flexible_timing?: boolean;
          urgency?: string;
          budget_min?: number;
          budget_max?: number;
          budget_type?: string;
          requirements?: string[];
          preferred_provider_type?: string;
          image_urls?: string[];
          is_active?: boolean;
          expires_at?: string;
          updated_at?: string;
        };
      };
      service_proposals: {
        Row: {
          id: string;
          request_id: string;
          provider_id: string;
          proposed_price: number;
          proposed_timeline?: string;
          cover_letter?: string;
          estimated_duration?: number;
          status: string;
          responded_at?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          request_id: string;
          provider_id: string;
          proposed_price: number;
          proposed_timeline?: string;
          cover_letter?: string;
          estimated_duration?: number;
          status?: string;
          responded_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          request_id?: string;
          provider_id?: string;
          proposed_price?: number;
          proposed_timeline?: string;
          cover_letter?: string;
          estimated_duration?: number;
          status?: string;
          responded_at?: string;
          updated_at?: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          customer_id: string;
          provider_id: string;
          service_id?: string;
          request_id?: string;
          proposal_id?: string;
          booking_reference: string;
          service_title: string;
          service_description?: string;
          scheduled_date: string;
          scheduled_time: string;
          estimated_duration?: number;
          actual_start_time?: string;
          actual_end_time?: string;
          service_location: string;
          service_address?: string;
          latitude?: number;
          longitude?: number;
          quoted_price: number;
          final_price?: number;
          platform_fee?: number;
          payment_method?: PaymentMethod;
          status: BookingStatus;
          cancellation_reason?: string;
          cancelled_by?: string;
          cancelled_at?: string;
          customer_notes?: string;
          provider_notes?: string;
          admin_notes?: string;
          created_at: string;
          updated_at: string;
          confirmed_at?: string;
          completed_at?: string;
        };
        Insert: {
          id?: string;
          customer_id: string;
          provider_id: string;
          service_id?: string;
          request_id?: string;
          proposal_id?: string;
          booking_reference?: string;
          service_title: string;
          service_description?: string;
          scheduled_date: string;
          scheduled_time: string;
          estimated_duration?: number;
          actual_start_time?: string;
          actual_end_time?: string;
          service_location: string;
          service_address?: string;
          latitude?: number;
          longitude?: number;
          quoted_price: number;
          final_price?: number;
          platform_fee?: number;
          payment_method?: PaymentMethod;
          status?: BookingStatus;
          cancellation_reason?: string;
          cancelled_by?: string;
          cancelled_at?: string;
          customer_notes?: string;
          provider_notes?: string;
          admin_notes?: string;
          created_at?: string;
          updated_at?: string;
          confirmed_at?: string;
          completed_at?: string;
        };
        Update: {
          id?: string;
          customer_id?: string;
          provider_id?: string;
          service_id?: string;
          request_id?: string;
          proposal_id?: string;
          booking_reference?: string;
          service_title?: string;
          service_description?: string;
          scheduled_date?: string;
          scheduled_time?: string;
          estimated_duration?: number;
          actual_start_time?: string;
          actual_end_time?: string;
          service_location?: string;
          service_address?: string;
          latitude?: number;
          longitude?: number;
          quoted_price?: number;
          final_price?: number;
          platform_fee?: number;
          payment_method?: PaymentMethod;
          status?: BookingStatus;
          cancellation_reason?: string;
          cancelled_by?: string;
          cancelled_at?: string;
          customer_notes?: string;
          provider_notes?: string;
          admin_notes?: string;
          updated_at?: string;
          confirmed_at?: string;
          completed_at?: string;
        };
      };
      payment_transactions: {
        Row: {
          id: string;
          booking_id: string;
          payer_id: string;
          payee_id: string;
          transaction_reference: string;
          external_transaction_id?: string;
          total_amount: number;
          service_amount: number;
          platform_fee: number;
          payment_gateway_fee: number;
          provider_earnings: number;
          payment_method: PaymentMethod;
          payment_status: PaymentStatus;
          gateway_response?: Json;
          refund_amount: number;
          refund_reason?: string;
          refunded_at?: string;
          created_at: string;
          updated_at: string;
          processed_at?: string;
          failed_at?: string;
        };
        Insert: {
          id?: string;
          booking_id: string;
          payer_id: string;
          payee_id: string;
          transaction_reference?: string;
          external_transaction_id?: string;
          total_amount: number;
          service_amount: number;
          platform_fee: number;
          payment_gateway_fee?: number;
          provider_earnings: number;
          payment_method: PaymentMethod;
          payment_status?: PaymentStatus;
          gateway_response?: Json;
          refund_amount?: number;
          refund_reason?: string;
          refunded_at?: string;
          created_at?: string;
          updated_at?: string;
          processed_at?: string;
          failed_at?: string;
        };
        Update: {
          id?: string;
          booking_id?: string;
          payer_id?: string;
          payee_id?: string;
          transaction_reference?: string;
          external_transaction_id?: string;
          total_amount?: number;
          service_amount?: number;
          platform_fee?: number;
          payment_gateway_fee?: number;
          provider_earnings?: number;
          payment_method?: PaymentMethod;
          payment_status?: PaymentStatus;
          gateway_response?: Json;
          refund_amount?: number;
          refund_reason?: string;
          refunded_at?: string;
          updated_at?: string;
          processed_at?: string;
          failed_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          booking_id: string;
          reviewer_id: string;
          reviewee_id: string;
          rating: number;
          title?: string;
          comment?: string;
          pros?: string[];
          cons?: string[];
          would_recommend?: boolean;
          is_verified: boolean;
          is_public: boolean;
          moderation_status: string;
          moderation_notes?: string;
          moderated_by?: string;
          moderated_at?: string;
          image_urls?: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          booking_id: string;
          reviewer_id: string;
          reviewee_id: string;
          rating: number;
          title?: string;
          comment?: string;
          pros?: string[];
          cons?: string[];
          would_recommend?: boolean;
          is_verified?: boolean;
          is_public?: boolean;
          moderation_status?: string;
          moderation_notes?: string;
          moderated_by?: string;
          moderated_at?: string;
          image_urls?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          booking_id?: string;
          reviewer_id?: string;
          reviewee_id?: string;
          rating?: number;
          title?: string;
          comment?: string;
          pros?: string[];
          cons?: string[];
          would_recommend?: boolean;
          is_verified?: boolean;
          is_public?: boolean;
          moderation_status?: string;
          moderation_notes?: string;
          moderated_by?: string;
          moderated_at?: string;
          image_urls?: string[];
          updated_at?: string;
        };
      };
      disputes: {
        Row: {
          id: string;
          booking_id: string;
          initiated_by: string;
          against_user: string;
          dispute_reference: string;
          category: string;
          reason: string;
          description: string;
          evidence_urls?: string[];
          status: DisputeStatus;
          assigned_to?: string;
          resolution?: string;
          refund_amount?: number;
          created_at: string;
          updated_at: string;
          resolved_at?: string;
        };
        Insert: {
          id?: string;
          booking_id: string;
          initiated_by: string;
          against_user: string;
          dispute_reference?: string;
          category: string;
          reason: string;
          description: string;
          evidence_urls?: string[];
          status?: DisputeStatus;
          assigned_to?: string;
          resolution?: string;
          refund_amount?: number;
          created_at?: string;
          updated_at?: string;
          resolved_at?: string;
        };
        Update: {
          id?: string;
          booking_id?: string;
          initiated_by?: string;
          against_user?: string;
          dispute_reference?: string;
          category?: string;
          reason?: string;
          description?: string;
          evidence_urls?: string[];
          status?: DisputeStatus;
          assigned_to?: string;
          resolution?: string;
          refund_amount?: number;
          updated_at?: string;
          resolved_at?: string;
        };
      };
      conversations: {
        Row: {
          id: string;
          booking_id?: string;
          participant_1: string;
          participant_2: string;
          last_message_at: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          booking_id?: string;
          participant_1: string;
          participant_2: string;
          last_message_at?: string;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          booking_id?: string;
          participant_1?: string;
          participant_2?: string;
          last_message_at?: string;
          is_active?: boolean;
        };
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          sender_id: string;
          content: string;
          message_type: string;
          attachment_urls?: string[];
          is_read: boolean;
          read_at?: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          sender_id: string;
          content: string;
          message_type?: string;
          attachment_urls?: string[];
          is_read?: boolean;
          read_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          sender_id?: string;
          content?: string;
          message_type?: string;
          attachment_urls?: string[];
          is_read?: boolean;
          read_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          content: string;
          type: NotificationType;
          category?: string;
          related_id?: string;
          action_url?: string;
          is_read: boolean;
          read_at?: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          content: string;
          type: NotificationType;
          category?: string;
          related_id?: string;
          action_url?: string;
          is_read?: boolean;
          read_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          content?: string;
          type?: NotificationType;
          category?: string;
          related_id?: string;
          action_url?: string;
          is_read?: boolean;
          read_at?: string;
        };
      };
      platform_analytics: {
        Row: {
          id: string;
          date: string;
          metric_name: string;
          metric_value: number;
          metadata?: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          date: string;
          metric_name: string;
          metric_value: number;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          date?: string;
          metric_name?: string;
          metric_value?: number;
          metadata?: Json;
        };
      };
      system_settings: {
        Row: {
          id: string;
          setting_key: string;
          setting_value: Json;
          description?: string;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          setting_key: string;
          setting_value: Json;
          description?: string;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          setting_key?: string;
          setting_value?: Json;
          description?: string;
          is_public?: boolean;
          updated_at?: string;
        };
      };
      audit_logs: {
        Row: {
          id: string;
          user_id?: string;
          action: string;
          table_name?: string;
          record_id?: string;
          old_values?: Json;
          new_values?: Json;
          ip_address?: string;
          user_agent?: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          action: string;
          table_name?: string;
          record_id?: string;
          old_values?: Json;
          new_values?: Json;
          ip_address?: string;
          user_agent?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          action?: string;
          table_name?: string;
          record_id?: string;
          old_values?: Json;
          new_values?: Json;
          ip_address?: string;
          user_agent?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: UserRole;
      user_status: UserStatus;
      verification_status: VerificationStatus;
      booking_status: BookingStatus;
      payment_status: PaymentStatus;
      payment_method: PaymentMethod;
      notification_type: NotificationType;
      dispute_status: DisputeStatus;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Additional types for application use
export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  role: UserRole;
  status: UserStatus;
  bio?: string;
  province?: string;
  district?: string;
  municipality?: string;
  language_preference: string;
  created_at: string;
  updated_at: string;
}

export interface ProviderProfile {
  id: string;
  user_id: string;
  business_name?: string;
  years_experience: number;
  base_hourly_rate?: number;
  verification_status: VerificationStatus;
  total_jobs_completed: number;
  total_earnings: number;
  average_rating: number;
  total_reviews: number;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceCategory {
  id: string;
  name_en: string;
  name_ne: string;
  description_en?: string;
  description_ne?: string;
  icon?: string;
  color_code?: string;
  is_active: boolean;
  sort_order: number;
}

export interface ServiceSubcategory {
  id: string;
  category_id: string;
  name_en: string;
  name_ne: string;
  description_en?: string;
  description_ne?: string;
  icon?: string;
  is_active: boolean;
  sort_order: number;
}

export interface ProviderService {
  id: string;
  provider_id: string;
  category_id: string;
  subcategory_id: string;
  title_en: string;
  title_ne: string;
  description_en: string;
  description_ne: string;
  pricing_type: string;
  base_price?: number;
  service_location: string;
  service_areas?: string[];
  is_active: boolean;
  approval_status: VerificationStatus;
  created_at: string;
}

export interface ServiceRequest {
  id: string;
  requester_id: string;
  category_id: string;
  subcategory_id: string;
  title: string;
  description: string;
  service_location: string;
  budget_min?: number;
  budget_max?: number;
  urgency: string;
  is_active: boolean;
  created_at: string;
}

export interface Booking {
  id: string;
  customer_id: string;
  provider_id: string;
  booking_reference: string;
  service_title: string;
  scheduled_date: string;
  scheduled_time: string;
  service_location: string;
  quoted_price: number;
  final_price?: number;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
}

export interface PaymentTransaction {
  id: string;
  booking_id: string;
  transaction_reference: string;
  total_amount: number;
  platform_fee: number;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  created_at: string;
}

export interface Review {
  id: string;
  booking_id: string;
  reviewer_id: string;
  reviewee_id: string;
  rating: number;
  title?: string;
  comment?: string;
  would_recommend?: boolean;
  moderation_status: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  content: string;
  type: NotificationType;
  is_read: boolean;
  created_at: string;
}
