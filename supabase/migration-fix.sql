-- Safe Migration Script for Nepal Service Marketplace
-- This script will safely update your existing Supabase database
-- Run this instead of the full schema if you get column errors

-- Start transaction
BEGIN;

-- Enable required extensions if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types only if they don't exist
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

-- Drop existing policies that might conflict
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Public can view basic provider info" ON public.users;

-- Check if users table exists, if not create it
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users') THEN
        CREATE TABLE public.users (
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
            province TEXT,
            district TEXT,
            municipality TEXT,
            ward INTEGER,
            street_address TEXT,
            postal_code TEXT,
            language_preference TEXT DEFAULT 'ne' CHECK (language_preference IN ('ne', 'en')),
            email_notifications BOOLEAN DEFAULT true,
            push_notifications BOOLEAN DEFAULT true,
            sms_notifications BOOLEAN DEFAULT false,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            last_login_at TIMESTAMP WITH TIME ZONE,
            email_verified_at TIMESTAMP WITH TIME ZONE,
            phone_verified_at TIMESTAMP WITH TIME ZONE
        );
    END IF;
END $$;

-- Add missing columns to users table if they don't exist
DO $$
BEGIN
    -- Add role column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'role') THEN
        ALTER TABLE public.users ADD COLUMN role user_role NOT NULL DEFAULT 'seeker';
    END IF;
    
    -- Add status column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'status') THEN
        ALTER TABLE public.users ADD COLUMN status user_status NOT NULL DEFAULT 'pending_verification';
    END IF;
    
    -- Add other missing columns
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'bio') THEN
        ALTER TABLE public.users ADD COLUMN bio TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'phone') THEN
        ALTER TABLE public.users ADD COLUMN phone TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'avatar_url') THEN
        ALTER TABLE public.users ADD COLUMN avatar_url TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'language_preference') THEN
        ALTER TABLE public.users ADD COLUMN language_preference TEXT DEFAULT 'ne' CHECK (language_preference IN ('ne', 'en'));
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'email_notifications') THEN
        ALTER TABLE public.users ADD COLUMN email_notifications BOOLEAN DEFAULT true;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'push_notifications') THEN
        ALTER TABLE public.users ADD COLUMN push_notifications BOOLEAN DEFAULT true;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'sms_notifications') THEN
        ALTER TABLE public.users ADD COLUMN sms_notifications BOOLEAN DEFAULT false;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'province') THEN
        ALTER TABLE public.users ADD COLUMN province TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'district') THEN
        ALTER TABLE public.users ADD COLUMN district TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'municipality') THEN
        ALTER TABLE public.users ADD COLUMN municipality TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'ward') THEN
        ALTER TABLE public.users ADD COLUMN ward INTEGER;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'street_address') THEN
        ALTER TABLE public.users ADD COLUMN street_address TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'postal_code') THEN
        ALTER TABLE public.users ADD COLUMN postal_code TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'date_of_birth') THEN
        ALTER TABLE public.users ADD COLUMN date_of_birth DATE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'gender') THEN
        ALTER TABLE public.users ADD COLUMN gender TEXT CHECK (gender IN ('male', 'female', 'other'));
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'last_login_at') THEN
        ALTER TABLE public.users ADD COLUMN last_login_at TIMESTAMP WITH TIME ZONE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'email_verified_at') THEN
        ALTER TABLE public.users ADD COLUMN email_verified_at TIMESTAMP WITH TIME ZONE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'phone_verified_at') THEN
        ALTER TABLE public.users ADD COLUMN phone_verified_at TIMESTAMP WITH TIME ZONE;
    END IF;
    
    -- Add timestamp columns if they don't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'created_at') THEN
        ALTER TABLE public.users ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'updated_at') THEN
        ALTER TABLE public.users ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- Create other essential tables if they don't exist
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

CREATE TABLE IF NOT EXISTS public.provider_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    business_name TEXT,
    business_type TEXT CHECK (business_type IN ('individual', 'company', 'freelancer')),
    years_experience INTEGER DEFAULT 0,
    base_hourly_rate DECIMAL(10,2),
    verification_status verification_status DEFAULT 'pending',
    verified_at TIMESTAMP WITH TIME ZONE,
    verified_by UUID REFERENCES users(id),
    verification_notes TEXT,
    citizenship_number TEXT,
    citizenship_front_url TEXT,
    citizenship_back_url TEXT,
    business_license_url TEXT,
    certificate_urls TEXT[],
    profile_image_urls TEXT[],
    total_jobs_completed INTEGER DEFAULT 0,
    total_earnings DECIMAL(12,2) DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    response_rate DECIMAL(5,2) DEFAULT 0,
    completion_rate DECIMAL(5,2) DEFAULT 0,
    is_available BOOLEAN DEFAULT true,
    availability_schedule JSONB,
    bank_name TEXT,
    bank_account_number TEXT,
    bank_account_holder TEXT,
    esewa_id TEXT,
    khalti_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.system_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    setting_key TEXT UNIQUE NOT NULL,
    setting_value JSONB NOT NULL,
    description TEXT,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create update timestamp function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updating timestamps (replace if they exist)
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_provider_profiles_updated_at ON public.provider_profiles;
CREATE TRIGGER update_provider_profiles_updated_at BEFORE UPDATE ON public.provider_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS on users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create safe RLS policies for users table
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Only create the public view policy if the status column exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'status') THEN
        CREATE POLICY "Public can view basic provider info" ON public.users
            FOR SELECT USING (role = 'provider' AND status = 'active');
    END IF;
END $$;

-- Insert default system settings (ignore conflicts)
INSERT INTO public.system_settings (setting_key, setting_value, description, is_public) VALUES
('platform_commission_rate', '0.15', 'Default platform commission rate (15%)', true),
('platform_name_en', '"Nepal Service Marketplace"', 'Platform name in English', true),
('platform_name_ne', '"नेपाल सेवा बजार"', 'Platform name in Nepali', true),
('min_booking_amount', '100', 'Minimum booking amount in NPR', true),
('max_booking_amount', '100000', 'Maximum booking amount in NPR', true),
('payment_methods', '["esewa", "khalti", "ime_pay", "connect_ips", "bank_transfer", "cash"]', 'Supported payment methods', true),
('support_email', '"support@nepalservices.com"', 'Support email address', true),
('support_phone', '"+977-1-4444444"', 'Support phone number', true),
('business_hours', '{"start": "09:00", "end": "18:00", "timezone": "Asia/Kathmandu"}', 'Business hours', true)
ON CONFLICT (setting_key) DO NOTHING;

-- Insert default service categories (ignore conflicts)
INSERT INTO public.service_categories (name_en, name_ne, description_en, description_ne, icon, color_code) VALUES
('Home Services', 'घरेलु सेवाहरू', 'Home cleaning, repairs, and maintenance', 'घर सरसफाइ, मर्मत, र मर्मतसम्भार', '🏠', '#3B82F6'),
('Technology', 'प्रविधि', 'Computer repair, web development, IT support', 'कम्प्युटर मर्मत, वेब विकास, आईटी सहयोग', '💻', '#8B5CF6'),
('Education', 'शिक्षा', 'Tutoring, training, and educational services', 'ट्यूशन, तालिम, र शैक्षिक सेवाहरू', '📚', '#10B981'),
('Health & Wellness', 'स्वास्थ्य र कल्याण', 'Fitness, healthcare, and wellness services', 'फिटनेस, स्वास्थ्य सेवा, र कल्याण सेवाहरू', '💪', '#F59E0B'),
('Events & Entertainment', 'कार्यक्रम र मनोरञ्जन', 'Event planning, photography, entertainment', 'कार्यक्रम योजना, फोटोग्राफी, मनोरञ्जन', '🎉', '#EF4444'),
('Beauty & Personal Care', 'सौन्दर्य र व्यक्तिगत हेरचाह', 'Beauty services, grooming, and personal care', 'सौन्दर्य सेवाहरू, सिंगार, र व्यक्तिगत हेरचाह', '💄', '#EC4899'),
('Transportation', 'यातायात', 'Moving services, delivery, and transportation', 'सामान ढुवानी, डेलिभरी, र यातायात', '🚛', '#6B7280'),
('Professional Services', 'व्यावसायिक सेवाहरू', 'Legal, financial, and business services', 'कानुनी, वित्तीय, र व्यापारिक सेवाहरू', '💼', '#1F2937')
ON CONFLICT (name_en) DO NOTHING;

-- Commit the transaction
COMMIT;
