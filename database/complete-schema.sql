-- Complete Database Schema for Nepal Service Marketplace
-- This schema includes all features developed in the application

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- =============================================
-- CORE USER MANAGEMENT TABLES
-- =============================================

-- Users table (both service seekers and providers)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    avatar_url TEXT,
    role VARCHAR(20) NOT NULL CHECK (role IN ('seeker', 'provider', 'admin')),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended', 'pending_verification')),
    
    -- Authentication
    password_hash VARCHAR(255), -- For email/password login
    provider VARCHAR(50), -- OAuth provider (google, facebook, etc.)
    provider_id VARCHAR(255), -- OAuth provider user ID
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    
    -- Profile information
    bio TEXT,
    date_of_birth DATE,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
    
    -- Location
    country VARCHAR(100) DEFAULT 'Nepal',
    province VARCHAR(100),
    district VARCHAR(100),
    municipality VARCHAR(100),
    ward_number INTEGER,
    street_address TEXT,
    postal_code VARCHAR(10),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    
    -- Preferences
    language VARCHAR(10) DEFAULT 'ne' CHECK (language IN ('ne', 'en')),
    timezone VARCHAR(50) DEFAULT 'Asia/Kathmandu',
    currency VARCHAR(10) DEFAULT 'NPR',
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- User verification documents
CREATE TABLE user_verification_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL CHECK (document_type IN ('citizenship', 'license', 'passport', 'certificate', 'profile_photo')),
    document_url TEXT NOT NULL,
    document_number VARCHAR(100),
    verification_status VARCHAR(20) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
    verified_by UUID REFERENCES users(id),
    verified_at TIMESTAMP WITH TIME ZONE,
    rejection_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- SERVICE CATEGORIES & MANAGEMENT
-- =============================================

-- Service categories
CREATE TABLE service_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_en VARCHAR(255) NOT NULL,
    name_ne VARCHAR(255) NOT NULL,
    description_en TEXT,
    description_ne TEXT,
    icon VARCHAR(100),
    color VARCHAR(7), -- Hex color code
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Service subcategories
CREATE TABLE service_subcategories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID NOT NULL REFERENCES service_categories(id) ON DELETE CASCADE,
    name_en VARCHAR(255) NOT NULL,
    name_ne VARCHAR(255) NOT NULL,
    description_en TEXT,
    description_ne TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Provider profiles (extended information for service providers)
CREATE TABLE provider_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    business_name VARCHAR(255),
    business_registration_number VARCHAR(100),
    tax_number VARCHAR(100),
    
    -- Professional details
    years_experience INTEGER DEFAULT 0,
    qualification TEXT,
    specializations TEXT[], -- Array of specializations
    languages_spoken VARCHAR(255)[] DEFAULT ARRAY['ne', 'en'],
    
    -- Service area
    service_radius INTEGER DEFAULT 10, -- in kilometers
    travel_cost_per_km DECIMAL(10, 2) DEFAULT 0,
    
    -- Availability
    working_days INTEGER[] DEFAULT ARRAY[1,2,3,4,5,6,7], -- 1=Sunday, 7=Saturday
    working_hours_start TIME DEFAULT '09:00',
    working_hours_end TIME DEFAULT '18:00',
    
    -- Pricing
    base_hourly_rate DECIMAL(10, 2),
    minimum_service_duration INTEGER DEFAULT 60, -- in minutes
    
    -- Performance metrics
    total_jobs_completed INTEGER DEFAULT 0,
    total_earnings DECIMAL(12, 2) DEFAULT 0,
    average_rating DECIMAL(3, 2) DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    response_rate DECIMAL(5, 2) DEFAULT 0,
    completion_rate DECIMAL(5, 2) DEFAULT 0,
    
    -- Status
    verification_status VARCHAR(20) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
    profile_completion_percentage INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    featured_until TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Services offered by providers
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES service_categories(id),
    subcategory_id UUID REFERENCES service_subcategories(id),
    
    -- Service details
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    short_description VARCHAR(500),
    
    -- Pricing
    pricing_type VARCHAR(20) NOT NULL CHECK (pricing_type IN ('fixed', 'hourly', 'per_project', 'negotiable')),
    price DECIMAL(10, 2),
    price_max DECIMAL(10, 2), -- For price ranges
    currency VARCHAR(10) DEFAULT 'NPR',
    
    -- Service specifications
    duration_estimate INTEGER, -- in minutes
    requirements TEXT[], -- Array of requirements
    what_included TEXT[], -- What's included in the service
    what_excluded TEXT[], -- What's not included
    
    -- Media
    images TEXT[], -- Array of image URLs
    video_url TEXT,
    
    -- Availability
    available_days INTEGER[] DEFAULT ARRAY[1,2,3,4,5,6,7],
    available_hours_start TIME DEFAULT '09:00',
    available_hours_end TIME DEFAULT '18:00',
    advance_booking_required INTEGER DEFAULT 24, -- hours
    
    -- Status and metrics
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive', 'suspended')),
    total_bookings INTEGER DEFAULT 0,
    average_rating DECIMAL(3, 2) DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    featured_until TIMESTAMP WITH TIME ZONE,
    
    -- SEO and discoverability
    tags TEXT[], -- Array of tags
    keywords TEXT[], -- Array of keywords for search
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- BOOKING AND TRANSACTION MANAGEMENT
-- =============================================

-- Service bookings
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_number VARCHAR(20) UNIQUE NOT NULL, -- Human-readable booking number
    
    -- Parties involved
    customer_id UUID NOT NULL REFERENCES users(id),
    provider_id UUID NOT NULL REFERENCES users(id),
    service_id UUID NOT NULL REFERENCES services(id),
    
    -- Booking details
    service_title VARCHAR(255) NOT NULL, -- Snapshot of service title
    service_description TEXT,
    special_instructions TEXT,
    
    -- Scheduling
    scheduled_date DATE NOT NULL,
    scheduled_time TIME NOT NULL,
    estimated_duration INTEGER, -- in minutes
    actual_start_time TIMESTAMP WITH TIME ZONE,
    actual_end_time TIMESTAMP WITH TIME ZONE,
    
    -- Location
    service_location TEXT NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    
    -- Pricing
    service_price DECIMAL(10, 2) NOT NULL,
    platform_fee DECIMAL(10, 2) NOT NULL,
    payment_gateway_fee DECIMAL(10, 2) DEFAULT 0,
    total_amount DECIMAL(10, 2) NOT NULL,
    
    -- Status tracking
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN (
        'pending', 'confirmed', 'in_progress', 'completed', 
        'cancelled', 'disputed', 'refunded'
    )),
    cancellation_reason TEXT,
    cancelled_by UUID REFERENCES users(id),
    cancelled_at TIMESTAMP WITH TIME ZONE,
    
    -- Completion and feedback
    completion_notes TEXT,
    customer_rating INTEGER CHECK (customer_rating >= 1 AND customer_rating <= 5),
    customer_review TEXT,
    provider_rating INTEGER CHECK (provider_rating >= 1 AND provider_rating <= 5),
    provider_review TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Payment transactions
CREATE TABLE payment_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(id),
    transaction_reference VARCHAR(255) UNIQUE NOT NULL,
    
    -- Payment details
    payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('cash', 'esewa', 'khalti', 'ime_pay', 'bank_transfer')),
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'NPR',
    
    -- Gateway information
    gateway_transaction_id VARCHAR(255),
    gateway_response TEXT, -- JSON response from payment gateway
    
    -- Status
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN (
        'pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded'
    )),
    failure_reason TEXT,
    
    -- Timestamps
    initiated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    failed_at TIMESTAMP WITH TIME ZONE
);

-- Provider payouts
CREATE TABLE provider_payouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_id UUID NOT NULL REFERENCES users(id),
    
    -- Payout details
    amount DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'NPR',
    
    -- Period covered
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    
    -- Payment method
    payout_method VARCHAR(50) NOT NULL CHECK (payout_method IN ('bank_transfer', 'esewa', 'khalti', 'cash')),
    bank_account_number VARCHAR(50),
    bank_name VARCHAR(100),
    account_holder_name VARCHAR(255),
    
    -- Status
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    reference_number VARCHAR(255),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- =============================================
-- MESSAGING AND COMMUNICATION
-- =============================================

-- Conversations between users
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id), -- Optional: conversation might be related to a booking
    
    -- Participants
    participant_1_id UUID NOT NULL REFERENCES users(id),
    participant_2_id UUID NOT NULL REFERENCES users(id),
    
    -- Status
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'archived', 'blocked')),
    
    -- Metadata
    last_message_at TIMESTAMP WITH TIME ZONE,
    last_message_preview TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(participant_1_id, participant_2_id, booking_id)
);

-- Messages within conversations
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES users(id),
    
    -- Message content
    content TEXT NOT NULL,
    message_type VARCHAR(20) DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file', 'system')),
    attachment_url TEXT,
    attachment_type VARCHAR(50),
    
    -- Status
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP WITH TIME ZONE,
    is_edited BOOLEAN DEFAULT FALSE,
    edited_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- REVIEWS AND RATINGS
-- =============================================

-- Reviews for services and providers
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(id),
    reviewer_id UUID NOT NULL REFERENCES users(id),
    reviewee_id UUID NOT NULL REFERENCES users(id), -- Provider being reviewed
    service_id UUID NOT NULL REFERENCES services(id),
    
    -- Rating and review
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    content TEXT,
    
    -- Detailed ratings
    quality_rating INTEGER CHECK (quality_rating >= 1 AND quality_rating <= 5),
    punctuality_rating INTEGER CHECK (punctuality_rating >= 1 AND punctuality_rating <= 5),
    communication_rating INTEGER CHECK (communication_rating >= 1 AND communication_rating <= 5),
    value_rating INTEGER CHECK (value_rating >= 1 AND value_rating <= 5),
    
    -- Media
    images TEXT[], -- Array of image URLs
    
    -- Status
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'hidden', 'flagged')),
    is_verified BOOLEAN DEFAULT TRUE, -- From actual booking
    
    -- Helpfulness voting
    helpful_votes INTEGER DEFAULT 0,
    total_votes INTEGER DEFAULT 0,
    
    -- Response from provider
    provider_response TEXT,
    provider_responded_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- PLATFORM MANAGEMENT
-- =============================================

-- Platform settings and configuration
CREATE TABLE platform_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(255) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    data_type VARCHAR(20) DEFAULT 'string' CHECK (data_type IN ('string', 'number', 'boolean', 'json')),
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE, -- Whether setting can be accessed by frontend
    category VARCHAR(100) DEFAULT 'general',
    updated_by UUID REFERENCES users(id),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Commission and fee settings
CREATE TABLE commission_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_category_id UUID REFERENCES service_categories(id),
    
    -- Commission rates (in percentage)
    platform_commission DECIMAL(5, 2) NOT NULL DEFAULT 15.00,
    payment_gateway_fee DECIMAL(5, 2) NOT NULL DEFAULT 1.50,
    
    -- Minimum amounts
    minimum_booking_amount DECIMAL(10, 2) DEFAULT 100.00,
    minimum_payout_amount DECIMAL(10, 2) DEFAULT 1000.00,
    
    -- Effective dates
    effective_from DATE NOT NULL DEFAULT CURRENT_DATE,
    effective_until DATE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- NOTIFICATIONS AND ALERTS
-- =============================================

-- Notification templates
CREATE TABLE notification_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) UNIQUE NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('email', 'sms', 'push', 'in_app')),
    
    -- Content
    subject_en VARCHAR(255),
    subject_ne VARCHAR(255),
    content_en TEXT NOT NULL,
    content_ne TEXT NOT NULL,
    
    -- Variables that can be used in template
    variables TEXT[], -- Array of variable names like ['user_name', 'booking_id']
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User notifications
CREATE TABLE user_notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Notification details
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    
    -- Related data
    related_entity_type VARCHAR(50), -- 'booking', 'message', 'payment', etc.
    related_entity_id UUID,
    action_url TEXT,
    
    -- Status
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP WITH TIME ZONE,
    
    -- Delivery
    delivery_method VARCHAR(20) DEFAULT 'in_app' CHECK (delivery_method IN ('in_app', 'email', 'sms', 'push')),
    is_sent BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- ANALYTICS AND REPORTING
-- =============================================

-- User activity logs
CREATE TABLE user_activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    session_id VARCHAR(255),
    
    -- Activity details
    action VARCHAR(255) NOT NULL,
    entity_type VARCHAR(100),
    entity_id UUID,
    
    -- Request details
    ip_address INET,
    user_agent TEXT,
    referer TEXT,
    
    -- Additional data
    metadata JSONB,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Platform analytics (daily aggregates)
CREATE TABLE platform_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    
    -- User metrics
    total_users INTEGER DEFAULT 0,
    new_users INTEGER DEFAULT 0,
    active_users INTEGER DEFAULT 0,
    
    -- Provider metrics
    total_providers INTEGER DEFAULT 0,
    active_providers INTEGER DEFAULT 0,
    verified_providers INTEGER DEFAULT 0,
    
    -- Service metrics
    total_services INTEGER DEFAULT 0,
    active_services INTEGER DEFAULT 0,
    
    -- Booking metrics
    total_bookings INTEGER DEFAULT 0,
    completed_bookings INTEGER DEFAULT 0,
    cancelled_bookings INTEGER DEFAULT 0,
    total_booking_value DECIMAL(12, 2) DEFAULT 0,
    
    -- Revenue metrics
    platform_revenue DECIMAL(12, 2) DEFAULT 0,
    payment_gateway_fees DECIMAL(12, 2) DEFAULT 0,
    provider_earnings DECIMAL(12, 2) DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(date)
);

-- =============================================
-- SUPPORT AND DISPUTE MANAGEMENT
-- =============================================

-- Support tickets
CREATE TABLE support_tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticket_number VARCHAR(20) UNIQUE NOT NULL,
    
    -- Ticket details
    user_id UUID NOT NULL REFERENCES users(id),
    subject VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    
    -- Related booking
    booking_id UUID REFERENCES bookings(id),
    
    -- Status
    status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
    
    -- Assignment
    assigned_to UUID REFERENCES users(id),
    assigned_at TIMESTAMP WITH TIME ZONE,
    
    -- Resolution
    resolution TEXT,
    resolved_at TIMESTAMP WITH TIME ZONE,
    resolved_by UUID REFERENCES users(id),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Support ticket responses
CREATE TABLE support_ticket_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticket_id UUID NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
    responder_id UUID NOT NULL REFERENCES users(id),
    
    -- Response content
    content TEXT NOT NULL,
    is_internal_note BOOLEAN DEFAULT FALSE,
    
    -- Attachments
    attachments TEXT[], -- Array of file URLs
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Disputes
CREATE TABLE disputes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dispute_number VARCHAR(20) UNIQUE NOT NULL,
    
    -- Dispute details
    booking_id UUID NOT NULL REFERENCES bookings(id),
    complainant_id UUID NOT NULL REFERENCES users(id),
    respondent_id UUID NOT NULL REFERENCES users(id),
    
    -- Issue details
    issue_type VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    requested_resolution TEXT,
    
    -- Evidence
    evidence_files TEXT[], -- Array of file URLs
    
    -- Status
    status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'under_review', 'resolved', 'escalated')),
    
    -- Assignment
    assigned_to UUID REFERENCES users(id),
    assigned_at TIMESTAMP WITH TIME ZONE,
    
    -- Resolution
    resolution TEXT,
    resolution_type VARCHAR(50), -- 'refund', 'partial_refund', 'no_action', 'provider_compensation'
    resolution_amount DECIMAL(10, 2),
    resolved_at TIMESTAMP WITH TIME ZONE,
    resolved_by UUID REFERENCES users(id),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- User indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Booking indexes
CREATE INDEX idx_bookings_customer_id ON bookings(customer_id);
CREATE INDEX idx_bookings_provider_id ON bookings(provider_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_scheduled_date ON bookings(scheduled_date);
CREATE INDEX idx_bookings_created_at ON bookings(created_at);

-- Service indexes
CREATE INDEX idx_services_provider_id ON services(provider_id);
CREATE INDEX idx_services_category_id ON services(category_id);
CREATE INDEX idx_services_status ON services(status);
CREATE INDEX idx_services_created_at ON services(created_at);

-- Review indexes
CREATE INDEX idx_reviews_reviewee_id ON reviews(reviewee_id);
CREATE INDEX idx_reviews_service_id ON reviews(service_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_created_at ON reviews(created_at);

-- Message indexes
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);

-- Notification indexes
CREATE INDEX idx_user_notifications_user_id ON user_notifications(user_id);
CREATE INDEX idx_user_notifications_is_read ON user_notifications(is_read);
CREATE INDEX idx_user_notifications_created_at ON user_notifications(created_at);

-- =============================================
-- FUNCTIONS AND TRIGGERS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_provider_profiles_updated_at BEFORE UPDATE ON provider_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- INITIAL DATA
-- =============================================

-- Insert default service categories
INSERT INTO service_categories (name_en, name_ne, description_en, description_ne, icon, color) VALUES
('Home Services', 'घरेलु सेवाहरू', 'Home cleaning, maintenance, and repair services', 'घर सरसफाइ, मर्मत र रखरखावका सेवाहरू', '🏠', '#3B82F6'),
('Education & Tutoring', 'शिक्षा र ट्यूशन', 'Academic tutoring and educational services', 'शैक्षिक ट्यूशन र शिक्षा सम्बन्धी सेवाहरू', '📚', '#10B981'),
('Digital Services', 'डिजिटल सेवाहरू', 'Web development, design, and digital marketing', 'वेब डेभलपमेन्ट, डिजाइन र डिजिटल मार्केटिङ', '💻', '#8B5CF6'),
('Health & Fitness', 'स्वास्थ्य र फिटनेस', 'Personal training, yoga, and wellness services', 'व्यक्तिगत प्रशिक्षण, योग र स्वास्थ्य सेवाहरू', '💪', '#F59E0B'),
('Beauty & Wellness', 'सौन्दर्य र कल्याण', 'Beauty treatments, spa, and wellness services', 'सौन्दर्य उपचार, स्पा र कल्याण सेवाहरू', '💄', '#EC4899'),
('Business Services', 'व्यापारिक सेवाहरू', 'Consulting, accounting, and business support', 'परामर्श, लेखांकन र व्यापारिक सहयोग', '💼', '#6B7280'),
('Transportation', 'यातायात', 'Vehicle rental, delivery, and transportation services', 'गाडी भाडा, डेलिभरी र यातायात सेवाहरू', '🚗', '#EF4444'),
('Events & Entertainment', 'कार्यक्रम र मनोरञ्जन', 'Event planning, photography, and entertainment', 'कार्यक्रम व्यवस्थापन, फोटोग्राफी र मनोरञ्जन', '🎉', '#14B8A6');

-- Insert default platform settings
INSERT INTO platform_settings (key, value, data_type, description, category, is_public) VALUES
('platform_name', 'सेवा खोज - ServiceConnect', 'string', 'Platform name', 'general', true),
('platform_commission', '15.00', 'number', 'Default platform commission percentage', 'finance', false),
('minimum_booking_amount', '100.00', 'number', 'Minimum booking amount in NPR', 'finance', true),
('minimum_payout_amount', '1000.00', 'number', 'Minimum payout amount for providers', 'finance', false),
('supported_currencies', '["NPR"]', 'json', 'Supported currencies', 'finance', true),
('supported_languages', '["ne", "en"]', 'json', 'Supported languages', 'general', true),
('esewa_merchant_code', '', 'string', 'eSewa merchant code', 'payment', false),
('khalti_secret_key', '', 'string', 'Khalti secret key', 'payment', false);

-- Insert default commission settings
INSERT INTO commission_settings (platform_commission, payment_gateway_fee, minimum_booking_amount, minimum_payout_amount) VALUES
(15.00, 1.50, 100.00, 1000.00);

-- =============================================
-- VIEWS FOR COMMON QUERIES
-- =============================================

-- View for provider statistics
CREATE VIEW provider_stats AS
SELECT 
    p.user_id,
    u.full_name,
    u.email,
    pp.business_name,
    pp.total_jobs_completed,
    pp.total_earnings,
    pp.average_rating,
    pp.total_reviews,
    COUNT(s.id) AS total_services,
    COUNT(CASE WHEN s.status = 'active' THEN 1 END) AS active_services
FROM provider_profiles pp
JOIN users u ON pp.user_id = u.id
LEFT JOIN services s ON s.provider_id = u.id
WHERE u.role = 'provider'
GROUP BY p.user_id, u.full_name, u.email, pp.business_name, pp.total_jobs_completed, 
         pp.total_earnings, pp.average_rating, pp.total_reviews;

-- View for service statistics
CREATE VIEW service_stats AS
SELECT 
    s.id,
    s.title,
    s.provider_id,
    u.full_name AS provider_name,
    sc.name_en AS category_name,
    s.price,
    s.total_bookings,
    s.average_rating,
    s.total_reviews,
    s.status,
    s.created_at
FROM services s
JOIN users u ON s.provider_id = u.id
JOIN service_categories sc ON s.category_id = sc.id;

-- View for booking summary
CREATE VIEW booking_summary AS
SELECT 
    b.id,
    b.booking_number,
    b.customer_id,
    customer.full_name AS customer_name,
    b.provider_id,
    provider.full_name AS provider_name,
    b.service_title,
    b.scheduled_date,
    b.total_amount,
    b.status,
    pt.payment_method,
    pt.status AS payment_status,
    b.created_at
FROM bookings b
JOIN users customer ON b.customer_id = customer.id
JOIN users provider ON b.provider_id = provider.id
LEFT JOIN payment_transactions pt ON pt.booking_id = b.id;

-- View for monthly revenue
CREATE VIEW monthly_revenue AS
SELECT 
    DATE_TRUNC('month', b.created_at) AS month,
    COUNT(*) AS total_bookings,
    SUM(b.total_amount) AS total_volume,
    SUM(b.platform_fee) AS platform_revenue,
    AVG(b.total_amount) AS average_booking_value
FROM bookings b
WHERE b.status IN ('completed', 'in_progress')
GROUP BY DATE_TRUNC('month', b.created_at)
ORDER BY month DESC;

-- End of schema
