-- Nepal Service Marketplace Database Schema
-- Complete Production-Ready Schema for Supabase
-- This will update your existing database or create new tables

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Create custom types (will skip if they already exist)
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('seeker', 'provider', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended', 'pending_verification', 'banned');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE verification_status AS ENUM ('pending', 'under_review', 'verified', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'disputed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('pending', 'processing', 'completed', 'failed', 'refunded');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_method AS ENUM ('esewa', 'khalti', 'ime_pay', 'connect_ips', 'bank_transfer', 'cash');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE notification_type AS ENUM ('email', 'push', 'sms', 'in_app');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE dispute_status AS ENUM ('open', 'in_review', 'resolved', 'escalated', 'closed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    role user_role NOT NULL DEFAULT 'seeker',
    status user_status NOT NULL DEFAULT 'pending_verification',
    bio TEXT,
    date_of_birth DATE,
    gender TEXT CHECK (gender IN ('male', 'female', 'other')),
    -- Address information
    province TEXT,
    district TEXT,
    municipality TEXT,
    ward INTEGER,
    street_address TEXT,
    postal_code TEXT,
    -- Preferences
    language_preference TEXT DEFAULT 'ne' CHECK (language_preference IN ('ne', 'en')),
    email_notifications BOOLEAN DEFAULT true,
    push_notifications BOOLEAN DEFAULT true,
    sms_notifications BOOLEAN DEFAULT false,
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE,
    email_verified_at TIMESTAMP WITH TIME ZONE,
    phone_verified_at TIMESTAMP WITH TIME ZONE
);

-- Service Categories
CREATE TABLE IF NOT EXISTS public.service_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name_en TEXT NOT NULL,
    name_ne TEXT NOT NULL,
    description_en TEXT,
    description_ne TEXT,
    icon TEXT,
    color_code TEXT,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service Subcategories
CREATE TABLE IF NOT EXISTS public.service_subcategories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category_id UUID REFERENCES service_categories(id) ON DELETE CASCADE,
    name_en TEXT NOT NULL,
    name_ne TEXT NOT NULL,
    description_en TEXT,
    description_ne TEXT,
    icon TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Provider Profiles
CREATE TABLE IF NOT EXISTS public.provider_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    business_name TEXT,
    business_type TEXT CHECK (business_type IN ('individual', 'company', 'freelancer')),
    years_experience INTEGER DEFAULT 0,
    base_hourly_rate DECIMAL(10,2),
    -- Verification
    verification_status verification_status DEFAULT 'pending',
    verified_at TIMESTAMP WITH TIME ZONE,
    verified_by UUID REFERENCES users(id),
    verification_notes TEXT,
    -- Documents
    citizenship_number TEXT,
    citizenship_front_url TEXT,
    citizenship_back_url TEXT,
    business_license_url TEXT,
    certificate_urls TEXT[], -- Array of certificate URLs
    profile_image_urls TEXT[], -- Array of profile/work images
    -- Statistics
    total_jobs_completed INTEGER DEFAULT 0,
    total_earnings DECIMAL(12,2) DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    response_rate DECIMAL(5,2) DEFAULT 0,
    completion_rate DECIMAL(5,2) DEFAULT 0,
    -- Availability
    is_available BOOLEAN DEFAULT true,
    availability_schedule JSONB, -- JSON object for weekly schedule
    -- Banking
    bank_name TEXT,
    bank_account_number TEXT,
    bank_account_holder TEXT,
    esewa_id TEXT,
    khalti_id TEXT,
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Provider Services
CREATE TABLE IF NOT EXISTS public.provider_services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    provider_id UUID REFERENCES provider_profiles(id) ON DELETE CASCADE,
    category_id UUID REFERENCES service_categories(id),
    subcategory_id UUID REFERENCES service_subcategories(id),
    title_en TEXT NOT NULL,
    title_ne TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_ne TEXT NOT NULL,
    -- Pricing
    pricing_type TEXT CHECK (pricing_type IN ('hourly', 'fixed', 'custom')),
    base_price DECIMAL(10,2),
    min_price DECIMAL(10,2),
    max_price DECIMAL(10,2),
    -- Service details
    service_duration INTEGER, -- in minutes
    service_location TEXT CHECK (service_location IN ('customer_location', 'provider_location', 'remote', 'flexible')),
    service_areas TEXT[], -- Array of areas where service is provided
    requirements TEXT[], -- Array of requirements/materials needed
    included_items TEXT[], -- What's included in the service
    excluded_items TEXT[], -- What's not included
    -- Media
    image_urls TEXT[],
    video_url TEXT,
    -- Status
    is_active BOOLEAN DEFAULT true,
    approval_status verification_status DEFAULT 'pending',
    approved_at TIMESTAMP WITH TIME ZONE,
    approved_by UUID REFERENCES users(id),
    rejection_reason TEXT,
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service Requests (by customers)
CREATE TABLE IF NOT EXISTS public.service_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    requester_id UUID REFERENCES users(id) ON DELETE CASCADE,
    category_id UUID REFERENCES service_categories(id),
    subcategory_id UUID REFERENCES service_subcategories(id),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    -- Location
    service_location TEXT NOT NULL,
    province TEXT,
    district TEXT,
    municipality TEXT,
    ward INTEGER,
    street_address TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    -- Timing
    preferred_date DATE,
    preferred_time TIME,
    flexible_timing BOOLEAN DEFAULT false,
    urgency TEXT CHECK (urgency IN ('low', 'medium', 'high', 'urgent')),
    -- Budget
    budget_min DECIMAL(10,2),
    budget_max DECIMAL(10,2),
    budget_type TEXT CHECK (budget_type IN ('hourly', 'fixed')),
    -- Requirements
    requirements TEXT[],
    preferred_provider_type TEXT CHECK (preferred_provider_type IN ('any', 'individual', 'company')),
    -- Media
    image_urls TEXT[],
    -- Status
    is_active BOOLEAN DEFAULT true,
    expires_at TIMESTAMP WITH TIME ZONE,
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service Request Proposals (provider responses to requests)
CREATE TABLE IF NOT EXISTS public.service_proposals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    request_id UUID REFERENCES service_requests(id) ON DELETE CASCADE,
    provider_id UUID REFERENCES provider_profiles(id) ON DELETE CASCADE,
    proposed_price DECIMAL(10,2) NOT NULL,
    proposed_timeline TEXT,
    cover_letter TEXT,
    estimated_duration INTEGER, -- in minutes
    -- Status
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'withdrawn')),
    responded_at TIMESTAMP WITH TIME ZONE,
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(request_id, provider_id)
);

-- Create sequences for reference numbers (if they don't exist)
DO $$ BEGIN
    CREATE SEQUENCE IF NOT EXISTS booking_ref_seq START 1;
EXCEPTION
    WHEN duplicate_table THEN null;
END $$;

DO $$ BEGIN
    CREATE SEQUENCE IF NOT EXISTS txn_ref_seq START 1;
EXCEPTION
    WHEN duplicate_table THEN null;
END $$;

DO $$ BEGIN
    CREATE SEQUENCE IF NOT EXISTS dispute_ref_seq START 1;
EXCEPTION
    WHEN duplicate_table THEN null;
END $$;

-- Functions for generating reference numbers
CREATE OR REPLACE FUNCTION generate_booking_reference()
RETURNS TEXT AS $$
DECLARE
    ref TEXT;
BEGIN
    ref := 'BK' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(NEXTVAL('booking_ref_seq')::TEXT, 4, '0');
    RETURN ref;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION generate_transaction_reference()
RETURNS TEXT AS $$
DECLARE
    ref TEXT;
BEGIN
    ref := 'TXN' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(NEXTVAL('txn_ref_seq')::TEXT, 6, '0');
    RETURN ref;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION generate_dispute_reference()
RETURNS TEXT AS $$
DECLARE
    ref TEXT;
BEGIN
    ref := 'DSP' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(NEXTVAL('dispute_ref_seq')::TEXT, 4, '0');
    RETURN ref;
END;
$$ LANGUAGE plpgsql;

-- Bookings
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    provider_id UUID REFERENCES provider_profiles(id) ON DELETE CASCADE,
    service_id UUID REFERENCES provider_services(id),
    request_id UUID REFERENCES service_requests(id), -- NULL if direct booking
    proposal_id UUID REFERENCES service_proposals(id), -- NULL if direct booking
    
    -- Booking details
    booking_reference TEXT UNIQUE NOT NULL DEFAULT generate_booking_reference(),
    service_title TEXT NOT NULL,
    service_description TEXT,
    
    -- Scheduling
    scheduled_date DATE NOT NULL,
    scheduled_time TIME NOT NULL,
    estimated_duration INTEGER, -- in minutes
    actual_start_time TIMESTAMP WITH TIME ZONE,
    actual_end_time TIMESTAMP WITH TIME ZONE,
    
    -- Location
    service_location TEXT NOT NULL,
    service_address TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    
    -- Pricing
    quoted_price DECIMAL(10,2) NOT NULL,
    final_price DECIMAL(10,2),
    platform_fee DECIMAL(10,2),
    payment_method payment_method,
    
    -- Status
    status booking_status DEFAULT 'pending',
    cancellation_reason TEXT,
    cancelled_by UUID REFERENCES users(id),
    cancelled_at TIMESTAMP WITH TIME ZONE,
    
    -- Notes
    customer_notes TEXT,
    provider_notes TEXT,
    admin_notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    confirmed_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Payment Transactions
CREATE TABLE IF NOT EXISTS public.payment_transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    payer_id UUID REFERENCES users(id),
    payee_id UUID REFERENCES users(id),
    
    -- Transaction details
    transaction_reference TEXT UNIQUE NOT NULL DEFAULT generate_transaction_reference(),
    external_transaction_id TEXT, -- From payment gateway
    
    -- Amounts
    total_amount DECIMAL(10,2) NOT NULL,
    service_amount DECIMAL(10,2) NOT NULL,
    platform_fee DECIMAL(10,2) NOT NULL,
    payment_gateway_fee DECIMAL(10,2) DEFAULT 0,
    provider_earnings DECIMAL(10,2) NOT NULL,
    
    -- Payment details
    payment_method payment_method NOT NULL,
    payment_status payment_status DEFAULT 'pending',
    gateway_response JSONB,
    
    -- Refund details
    refund_amount DECIMAL(10,2) DEFAULT 0,
    refund_reason TEXT,
    refunded_at TIMESTAMP WITH TIME ZONE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed_at TIMESTAMP WITH TIME ZONE,
    failed_at TIMESTAMP WITH TIME ZONE
);

-- Reviews and Ratings
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE UNIQUE,
    reviewer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    reviewee_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Review content
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    comment TEXT,
    pros TEXT[],
    cons TEXT[],
    would_recommend BOOLEAN,
    
    -- Review metadata
    is_verified BOOLEAN DEFAULT false,
    is_public BOOLEAN DEFAULT true,
    moderation_status TEXT DEFAULT 'pending' CHECK (moderation_status IN ('pending', 'approved', 'rejected', 'flagged')),
    moderation_notes TEXT,
    moderated_by UUID REFERENCES users(id),
    moderated_at TIMESTAMP WITH TIME ZONE,
    
    -- Media
    image_urls TEXT[],
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Review Reports (for moderation)
CREATE TABLE IF NOT EXISTS public.review_reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    review_id UUID REFERENCES reviews(id) ON DELETE CASCADE,
    reporter_id UUID REFERENCES users(id) ON DELETE CASCADE,
    reason TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(review_id, reporter_id)
);

-- Disputes
CREATE TABLE IF NOT EXISTS public.disputes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    initiated_by UUID REFERENCES users(id) ON DELETE CASCADE,
    against_user UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Dispute details
    dispute_reference TEXT UNIQUE NOT NULL DEFAULT generate_dispute_reference(),
    category TEXT NOT NULL,
    reason TEXT NOT NULL,
    description TEXT NOT NULL,
    evidence_urls TEXT[],
    
    -- Resolution
    status dispute_status DEFAULT 'open',
    assigned_to UUID REFERENCES users(id),
    resolution TEXT,
    refund_amount DECIMAL(10,2),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- Messages (for communication between users)
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_id UUID REFERENCES bookings(id), -- NULL for general conversations
    participant_1 UUID REFERENCES users(id) ON DELETE CASCADE,
    participant_2 UUID REFERENCES users(id) ON DELETE CASCADE,
    last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(participant_1, participant_2, booking_id)
);

CREATE TABLE IF NOT EXISTS public.messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file', 'system')),
    attachment_urls TEXT[],
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    type notification_type NOT NULL,
    category TEXT, -- booking, payment, review, etc.
    related_id UUID, -- ID of related entity (booking, payment, etc.)
    action_url TEXT,
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Platform Analytics (for admin dashboard)
CREATE TABLE IF NOT EXISTS public.platform_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    date DATE NOT NULL,
    metric_name TEXT NOT NULL,
    metric_value DECIMAL(15,2) NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(date, metric_name)
);

-- System Settings
CREATE TABLE IF NOT EXISTS public.system_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    setting_key TEXT UNIQUE NOT NULL,
    setting_value JSONB NOT NULL,
    description TEXT,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit Logs
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    action TEXT NOT NULL,
    table_name TEXT,
    record_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance (only if they don't exist)
DO $$ BEGIN
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_role ON users(role);
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_status ON users(status);
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_provider_profiles_user_id ON provider_profiles(user_id);
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_provider_profiles_verification_status ON provider_profiles(verification_status);
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_provider_services_provider_id ON provider_services(provider_id);
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_provider_services_category_id ON provider_services(category_id);
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_provider_services_approval_status ON provider_services(approval_status);
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_service_requests_requester_id ON service_requests(requester_id);
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_service_requests_category_id ON service_requests(category_id);
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_service_requests_is_active ON service_requests(is_active);
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_bookings_customer_id ON bookings(customer_id);
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_bookings_provider_id ON bookings(provider_id);
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_bookings_status ON bookings(status);
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_bookings_scheduled_date ON bookings(scheduled_date);
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_payment_transactions_booking_id ON payment_transactions(booking_id);
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_reviews_booking_id ON reviews(booking_id);
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_reviews_reviewee_id ON reviews(reviewee_id);
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_conversations_participants ON conversations(participant_1, participant_2);
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
EXCEPTION
    WHEN others THEN NULL;
END $$;

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updating timestamps (will replace if they exist)
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_provider_profiles_updated_at ON provider_profiles;
CREATE TRIGGER update_provider_profiles_updated_at BEFORE UPDATE ON provider_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_provider_services_updated_at ON provider_services;
CREATE TRIGGER update_provider_services_updated_at BEFORE UPDATE ON provider_services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_service_requests_updated_at ON service_requests;
CREATE TRIGGER update_service_requests_updated_at BEFORE UPDATE ON service_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_payment_transactions_updated_at ON payment_transactions;
CREATE TRIGGER update_payment_transactions_updated_at BEFORE UPDATE ON payment_transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view their own profile" ON users;
DROP POLICY IF EXISTS "Users can update their own profile" ON users;
DROP POLICY IF EXISTS "Public can view basic provider info" ON users;
DROP POLICY IF EXISTS "Providers can view their own profile" ON provider_profiles;
DROP POLICY IF EXISTS "Providers can update their own profile" ON provider_profiles;
DROP POLICY IF EXISTS "Public can view verified provider profiles" ON provider_profiles;
DROP POLICY IF EXISTS "Providers can manage their own services" ON provider_services;
DROP POLICY IF EXISTS "Public can view approved services" ON provider_services;
DROP POLICY IF EXISTS "Users can manage their own requests" ON service_requests;
DROP POLICY IF EXISTS "Providers can view active requests" ON service_requests;
DROP POLICY IF EXISTS "Users can view their own bookings" ON bookings;
DROP POLICY IF EXISTS "Users can update their own bookings" ON bookings;
DROP POLICY IF EXISTS "Users can view public reviews" ON reviews;
DROP POLICY IF EXISTS "Users can manage their own reviews" ON reviews;
DROP POLICY IF EXISTS "Users can access their own conversations" ON conversations;
DROP POLICY IF EXISTS "Users can access messages in their conversations" ON messages;
DROP POLICY IF EXISTS "Users can view their own notifications" ON notifications;
DROP POLICY IF EXISTS "Users can update their own notifications" ON notifications;

-- Create new policies
-- Users table policies
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON users
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Public can view basic provider info" ON users
    FOR SELECT USING (role = 'provider' AND status = 'active');

-- Provider profiles policies
CREATE POLICY "Providers can view their own profile" ON provider_profiles
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Providers can update their own profile" ON provider_profiles
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Providers can insert their own profile" ON provider_profiles
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Public can view verified provider profiles" ON provider_profiles
    FOR SELECT USING (verification_status = 'verified');

-- Provider services policies
CREATE POLICY "Providers can manage their own services" ON provider_services
    FOR ALL USING (provider_id IN (SELECT id FROM provider_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Public can view approved services" ON provider_services
    FOR SELECT USING (approval_status = 'verified' AND is_active = true);

-- Service requests policies
CREATE POLICY "Users can manage their own requests" ON service_requests
    FOR ALL USING (requester_id = auth.uid());

CREATE POLICY "Providers can view active requests" ON service_requests
    FOR SELECT USING (is_active = true);

-- Service proposals policies
CREATE POLICY "Providers can manage their own proposals" ON service_proposals
    FOR ALL USING (provider_id IN (SELECT id FROM provider_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Request owners can view proposals for their requests" ON service_proposals
    FOR SELECT USING (request_id IN (SELECT id FROM service_requests WHERE requester_id = auth.uid()));

-- Bookings policies
CREATE POLICY "Users can view their own bookings" ON bookings
    FOR SELECT USING (
        customer_id = auth.uid() OR 
        provider_id IN (SELECT id FROM provider_profiles WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can update their own bookings" ON bookings
    FOR UPDATE USING (
        customer_id = auth.uid() OR 
        provider_id IN (SELECT id FROM provider_profiles WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can create bookings" ON bookings
    FOR INSERT WITH CHECK (customer_id = auth.uid());

-- Payment transactions policies
CREATE POLICY "Users can view their own transactions" ON payment_transactions
    FOR SELECT USING (payer_id = auth.uid() OR payee_id = auth.uid());

-- Reviews policies
CREATE POLICY "Users can view public reviews" ON reviews
    FOR SELECT USING (is_public = true AND moderation_status = 'approved');

CREATE POLICY "Users can manage their own reviews" ON reviews
    FOR ALL USING (reviewer_id = auth.uid());

-- Messages policies
CREATE POLICY "Users can access their own conversations" ON conversations
    FOR ALL USING (participant_1 = auth.uid() OR participant_2 = auth.uid());

CREATE POLICY "Users can access messages in their conversations" ON messages
    FOR ALL USING (
        conversation_id IN (
            SELECT id FROM conversations 
            WHERE participant_1 = auth.uid() OR participant_2 = auth.uid()
        )
    );

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON notifications
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications" ON notifications
    FOR UPDATE USING (user_id = auth.uid());

-- Insert or update default system settings
INSERT INTO system_settings (setting_key, setting_value, description, is_public) VALUES
('platform_commission_rate', '0.15', 'Default platform commission rate (15%)', true),
('platform_name_en', '"Nepal Service Marketplace"', 'Platform name in English', true),
('platform_name_ne', '"नेपाल सेवा बजार"', 'Platform name in Nepali', true),
('min_booking_amount', '100', 'Minimum booking amount in NPR', true),
('max_booking_amount', '100000', 'Maximum booking amount in NPR', true),
('payment_methods', '["esewa", "khalti", "ime_pay", "connect_ips", "bank_transfer", "cash"]', 'Supported payment methods', true),
('support_email', '"support@nepalservices.com"', 'Support email address', true),
('support_phone', '"+977-1-4444444"', 'Support phone number', true),
('business_hours', '{"start": "09:00", "end": "18:00", "timezone": "Asia/Kathmandu"}', 'Business hours', true)
ON CONFLICT (setting_key) DO UPDATE SET 
    setting_value = EXCLUDED.setting_value,
    description = EXCLUDED.description,
    is_public = EXCLUDED.is_public,
    updated_at = NOW();

-- Insert or update default service categories
INSERT INTO service_categories (name_en, name_ne, description_en, description_ne, icon, color_code) VALUES
('Home Services', 'घरेलु सेवाहरू', 'Home cleaning, repairs, and maintenance', 'घर सरसफाइ, मर्मत, र मर्मतसम्भार', '🏠', '#3B82F6'),
('Technology', 'प्रविधि', 'Computer repair, web development, IT support', 'कम्प्युटर मर्मत, वेब विकास, आईटी सहयोग', '💻', '#8B5CF6'),
('Education', 'शिक्षा', 'Tutoring, training, and educational services', 'ट्यूशन, तालिम, र शैक्षिक सेवाहरू', '📚', '#10B981'),
('Health & Wellness', 'स्वास्थ्य र कल्याण', 'Fitness, healthcare, and wellness services', 'फिटनेस, स्वास्थ्य सेवा, र कल्याण सेवाहरू', '💪', '#F59E0B'),
('Events & Entertainment', 'कार्यक्रम र मनोरञ्जन', 'Event planning, photography, entertainment', 'कार्यक्रम योजना, फोटोग्राफी, मनोरञ्जन', '🎉', '#EF4444'),
('Beauty & Personal Care', 'सौन्दर्य र व्यक्तिगत हेरचाह', 'Beauty services, grooming, and personal care', 'सौन्दर्य सेवाहरू, सिंगार, र व्यक्तिगत हेरचाह', '💄', '#EC4899'),
('Transportation', 'यातायात', 'Moving services, delivery, and transportation', 'सामान ढुवानी, डेलिभरी, र यातायात', '🚛', '#6B7280'),
('Professional Services', 'व्यावसायिक सेवाहरू', 'Legal, financial, and business services', 'कानुनी, वित्तीय, र व्यापारिक सेवाहरू', '💼', '#1F2937')
ON CONFLICT (name_en) DO UPDATE SET 
    name_ne = EXCLUDED.name_ne,
    description_en = EXCLUDED.description_en,
    description_ne = EXCLUDED.description_ne,
    icon = EXCLUDED.icon,
    color_code = EXCLUDED.color_code,
    updated_at = NOW();

-- Create admin user function (for initial setup)
CREATE OR REPLACE FUNCTION create_admin_user(admin_email TEXT, admin_password TEXT, admin_name TEXT)
RETURNS TEXT AS $$
DECLARE
    admin_id UUID;
BEGIN
    -- This would be called after creating the auth user manually
    -- Insert into users table with admin role
    INSERT INTO users (id, email, full_name, role, status, email_verified_at)
    VALUES (
        gen_random_uuid(), 
        admin_email, 
        admin_name, 
        'admin', 
        'active', 
        NOW()
    )
    RETURNING id INTO admin_id;
    
    RETURN 'Admin user created with ID: ' || admin_id;
END;
$$ LANGUAGE plpgsql;

-- Enable realtime for live updates (optional)
-- ALTER publication supabase_realtime ADD TABLE public.messages;
-- ALTER publication supabase_realtime ADD TABLE public.notifications;
-- ALTER publication supabase_realtime ADD TABLE public.bookings;

COMMIT;
