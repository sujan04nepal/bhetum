-- Seed data for Nepal Service Marketplace
-- This script populates the database with sample data used in the application

-- =============================================
-- USERS DATA
-- =============================================

-- Insert admin user
INSERT INTO users (id, email, full_name, role, status, email_verified, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'admin@servicekhoj.com', 'Admin User', 'admin', 'active', true, '2024-01-01 00:00:00+00');

-- Insert service seekers
INSERT INTO users (id, email, full_name, phone, role, status, province, district, municipality, email_verified, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'ramesh@email.com', 'Ramesh Sharma', '+977-9841234567', 'seeker', 'active', 'Bagmati', 'Kathmandu', 'Kathmandu Metropolitan', true, '2024-01-15 00:00:00+00'),
('550e8400-e29b-41d4-a716-446655440002', 'sita@email.com', 'Sita Gurung', '+977-9851234567', 'seeker', 'active', 'Gandaki', 'Kaski', 'Pokhara Metropolitan', true, '2024-02-10 00:00:00+00'),
('550e8400-e29b-41d4-a716-446655440003', 'bikash@email.com', 'Bikash Thapa', '+977-9861234567', 'seeker', 'active', 'Bagmati', 'Lalitpur', 'Lalitpur Metropolitan', true, '2024-01-20 00:00:00+00'),
('550e8400-e29b-41d4-a716-446655440004', 'maya@email.com', 'Maya Rai', '+977-9871234567', 'seeker', 'active', 'Bagmati', 'Bhaktapur', 'Bhaktapur Municipality', true, '2024-03-05 00:00:00+00');

-- Insert service providers
INSERT INTO users (id, email, full_name, phone, role, status, province, district, municipality, email_verified, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440010', 'sita.cleaning@email.com', 'Sita Sharma', '+977-9841234568', 'provider', 'active', 'Bagmati', 'Kathmandu', 'Kathmandu Metropolitan', true, '2024-01-10 00:00:00+00'),
('550e8400-e29b-41d4-a716-446655440011', 'raj.tutor@email.com', 'Raj Gurung', '+977-9851234568', 'provider', 'active', 'Gandaki', 'Kaski', 'Pokhara Metropolitan', true, '2024-01-08 00:00:00+00'),
('550e8400-e29b-41d4-a716-446655440012', 'maya.design@email.com', 'Maya Tamang', '+977-9861234568', 'provider', 'active', 'Bagmati', 'Lalitpur', 'Lalitpur Metropolitan', true, '2024-01-05 00:00:00+00'),
('550e8400-e29b-41d4-a716-446655440013', 'amit.tech@email.com', 'Amit Poudel', '+977-9871234568', 'provider', 'active', 'Bagmati', 'Kathmandu', 'Kathmandu Metropolitan', true, '2024-01-03 00:00:00+00'),
('550e8400-e29b-41d4-a716-446655440014', 'sunita.fitness@email.com', 'Sunita Karki', '+977-9881234568', 'provider', 'active', 'Bagmati', 'Bhaktapur', 'Bhaktapur Municipality', true, '2024-01-01 00:00:00+00');

-- =============================================
-- PROVIDER PROFILES
-- =============================================

INSERT INTO provider_profiles (
    user_id, business_name, years_experience, total_jobs_completed, total_earnings, 
    average_rating, total_reviews, verification_status, base_hourly_rate
) VALUES
('550e8400-e29b-41d4-a716-446655440010', 'Sita Cleaning Services', 8, 156, 45600.00, 4.9, 142, 'verified', 400.00),
('550e8400-e29b-41d4-a716-446655440011', 'Raj Tutorial Center', 12, 89, 34200.00, 4.8, 76, 'verified', 800.00),
('550e8400-e29b-41d4-a716-446655440012', 'Maya Design Studio', 6, 67, 67800.00, 5.0, 63, 'verified', 1200.00),
('550e8400-e29b-41d4-a716-446655440013', 'TechMind Solutions', 10, 123, 89500.00, 4.9, 115, 'verified', 1500.00),
('550e8400-e29b-41d4-a716-446655440014', 'FitLife Training', 5, 234, 56700.00, 4.8, 198, 'verified', 1000.00);

-- =============================================
-- SERVICE SUBCATEGORIES
-- =============================================

-- Get category IDs for subcategories
INSERT INTO service_subcategories (category_id, name_en, name_ne, description_en, description_ne) 
SELECT 
    sc.id,
    sub.name_en,
    sub.name_ne,
    sub.description_en,
    sub.description_ne
FROM service_categories sc
CROSS JOIN (
    VALUES 
        ('Home Services', 'House Cleaning', 'घर सरसफाइ', 'Professional house cleaning services', 'व्यावसायिक घर सरसफाइ सेवा'),
        ('Home Services', 'Plumbing', 'प्लम्बिङ', 'Plumbing repair and installation', 'प्लम्बिङ मर्मत र स्थापना'),
        ('Home Services', 'Electrical Work', 'बिजुली कार्य', 'Electrical repair and installation', 'बिजुली मर्मत र स्थापना'),
        ('Home Services', 'Painting', 'रङ्गाई', 'House painting and decoration', 'घर रङ्गाई र सजावट'),
        
        ('Education & Tutoring', 'Academic Tutoring', 'शैक्षिक ट्यूशन', 'Subject-wise tutoring for students', '���िद्यार्थीहरूका लागि विषयगत ट्यूशन'),
        ('Education & Tutoring', 'Language Learning', 'भाषा सिकाइ', 'Language learning and conversation', 'भाषा सिकाइ र वार्तालाप'),
        ('Education & Tutoring', 'Music Lessons', 'संगीत पाठ', 'Music instrument and vocal lessons', 'संगीत वाद्य र गायन पाठ'),
        
        ('Digital Services', 'Web Development', 'वेब डेभलपमेन्ट', 'Website design and development', 'वेबसाइट डिजाइन र विकास'),
        ('Digital Services', 'Graphic Design', 'ग्राफिक डिजाइन', 'Logo, branding and graphic design', 'लोगो, ब्रान्डिङ र ग्राफिक डिजाइन'),
        ('Digital Services', 'Digital Marketing', 'डिजिटल मार्केटिङ', 'Social media and online marketing', 'सामाजिक सञ्जाल र अनलाइन मार्केटिङ'),
        
        ('Health & Fitness', 'Personal Training', 'व्यक्तिगत प्रशिक्षण', 'One-on-one fitness training', 'एक-एक फिटनेस प्रशिक्षण'),
        ('Health & Fitness', 'Yoga Classes', 'योग कक्षा', 'Yoga and meditation classes', 'योग र ध्यान कक्षाहरू'),
        
        ('Beauty & Wellness', 'Salon Services', 'सैलुन सेवा', 'Hair and beauty salon services', 'कपाल र सौन्दर्य सैलुन सेवा'),
        ('Beauty & Wellness', 'Spa Services', 'स्पा सेवा', 'Massage and spa treatments', 'मसाज र स्पा उपचार')
) AS sub(category_name, name_en, name_ne, description_en, description_ne)
WHERE sc.name_en = sub.category_name;

-- =============================================
-- SERVICES
-- =============================================

-- Insert services for each provider
INSERT INTO services (
    id, provider_id, category_id, subcategory_id, title, description, 
    pricing_type, price, status, total_bookings, average_rating, total_reviews
) 
SELECT 
    uuid_generate_v4(),
    p.provider_id,
    sc.category_id,
    ss.subcategory_id,
    p.title,
    p.description,
    p.pricing_type,
    p.price,
    'active',
    p.total_bookings,
    p.average_rating,
    p.total_reviews
FROM (
    VALUES 
        ('550e8400-e29b-41d4-a716-446655440010', 'House Cleaning', 'Professional House Cleaning', 'Professional house cleaning service with eco-friendly products. We clean every corner of your house including kitchen, bathroom, bedrooms, and living areas.', 'hourly', 1500.00, 45, 4.8, 42),
        ('550e8400-e29b-41d4-a716-446655440011', 'Academic Tutoring', 'Math & Science Tutoring', 'Expert math and science tutoring for grades 6-12. Specialized in algebra, geometry, physics, chemistry, and biology with proven track record.', 'hourly', 800.00, 67, 4.9, 64),
        ('550e8400-e29b-41d4-a716-446655440012', 'Graphic Design', 'Logo & Brand Design', 'Creative logo design and branding services for businesses. Includes logo design, business cards, letterheads, and brand guidelines.', 'per_project', 25000.00, 23, 4.7, 21),
        ('550e8400-e29b-41d4-a716-446655440013', 'Web Development', 'WordPress Website Development', 'Custom WordPress website development and design. Responsive, SEO-friendly websites with admin panel and content management system.', 'per_project', 45000.00, 34, 4.9, 32),
        ('550e8400-e29b-41d4-a716-446655440014', 'Personal Training', 'Personal Fitness Training', 'Personalized fitness training and nutrition guidance. One-on-one sessions tailored to your fitness goals and body type.', 'hourly', 2000.00, 78, 4.6, 71)
) AS p(provider_id, subcategory_name, title, description, pricing_type, price, total_bookings, average_rating, total_reviews)
JOIN (
    SELECT sc.id AS category_id, ssc.id AS subcategory_id, ssc.name_en AS subcategory_name
    FROM service_categories sc
    JOIN service_subcategories ssc ON sc.id = ssc.category_id
) AS ss ON p.subcategory_name = ss.subcategory_name;

-- =============================================
-- BOOKINGS
-- =============================================

-- Insert sample bookings
INSERT INTO bookings (
    id, booking_number, customer_id, provider_id, service_id, service_title,
    scheduled_date, scheduled_time, service_location, service_price, platform_fee,
    total_amount, status, customer_rating, customer_review, created_at
) VALUES
(
    '550e8400-e29b-41d4-a716-446655441001',
    'BK2024001',
    '550e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440010',
    (SELECT id FROM services WHERE title = 'Professional House Cleaning' LIMIT 1),
    'Professional House Cleaning',
    '2024-01-18',
    '10:00:00',
    'Kathmandu, Thamel',
    2500.00,
    375.00,
    2875.00,
    'completed',
    5,
    'Excellent service! Very thorough cleaning and professional approach.',
    '2024-01-15 10:30:00+00'
),
(
    '550e8400-e29b-41d4-a716-446655441002',
    'BK2024002',
    '550e8400-e29b-41d4-a716-446655440002',
    '550e8400-e29b-41d4-a716-446655440011',
    (SELECT id FROM services WHERE title = 'Math & Science Tutoring' LIMIT 1),
    'Math & Science Tutoring',
    '2024-01-20',
    '14:00:00',
    'Pokhara, Lakeside',
    1500.00,
    225.00,
    1725.00,
    'in_progress',
    NULL,
    NULL,
    '2024-01-16 14:15:00+00'
),
(
    '550e8400-e29b-41d4-a716-446655441003',
    'BK2024003',
    '550e8400-e29b-41d4-a716-446655440003',
    '550e8400-e29b-41d4-a716-446655440013',
    (SELECT id FROM services WHERE title = 'WordPress Website Development' LIMIT 1),
    'WordPress Website Development',
    '2024-01-25',
    '09:00:00',
    'Lalitpur, Patan',
    45000.00,
    6750.00,
    51750.00,
    'pending',
    NULL,
    NULL,
    '2024-01-17 09:45:00+00'
);

-- =============================================
-- PAYMENT TRANSACTIONS
-- =============================================

INSERT INTO payment_transactions (
    id, booking_id, transaction_reference, payment_method, amount, status, completed_at
) VALUES
(
    uuid_generate_v4(),
    '550e8400-e29b-41d4-a716-446655441001',
    'ESW_' || extract(epoch from now())::text,
    'esewa',
    2875.00,
    'completed',
    '2024-01-15 10:35:00+00'
),
(
    uuid_generate_v4(),
    '550e8400-e29b-41d4-a716-446655441002',
    'KHL_' || extract(epoch from now())::text,
    'khalti',
    1725.00,
    'completed',
    '2024-01-16 14:17:00+00'
),
(
    uuid_generate_v4(),
    '550e8400-e29b-41d4-a716-446655441003',
    'CASH_' || extract(epoch from now())::text,
    'cash',
    51750.00,
    'pending',
    NULL
);

-- =============================================
-- REVIEWS
-- =============================================

INSERT INTO reviews (
    id, booking_id, reviewer_id, reviewee_id, service_id, rating, title, content,
    quality_rating, punctuality_rating, communication_rating, value_rating, created_at
) VALUES
(
    uuid_generate_v4(),
    '550e8400-e29b-41d4-a716-446655441001',
    '550e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440010',
    (SELECT id FROM services WHERE title = 'Professional House Cleaning' LIMIT 1),
    5,
    'Outstanding Cleaning Service',
    'Sita and her team did an amazing job cleaning our 3BHK apartment. They were punctual, professional, and very thorough. Every corner was spotless and they used eco-friendly products as promised. Highly recommended!',
    5, 5, 5, 5,
    '2024-01-18 16:00:00+00'
);

-- =============================================
-- CONVERSATIONS AND MESSAGES
-- =============================================

-- Insert conversations
INSERT INTO conversations (
    id, booking_id, participant_1_id, participant_2_id, last_message_at, last_message_preview
) VALUES
(
    uuid_generate_v4(),
    '550e8400-e29b-41d4-a716-446655441001',
    '550e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440010',
    now() - interval '2 minutes',
    'Thank you for booking! I''ll be there at 10 AM tomorrow.'
),
(
    uuid_generate_v4(),
    '550e8400-e29b-41d4-a716-446655441002',
    '550e8400-e29b-41d4-a716-446655440002',
    '550e8400-e29b-41d4-a716-446655440011',
    now() - interval '1 hour',
    'What topics would you like to focus on for math tutoring?'
),
(
    uuid_generate_v4(),
    '550e8400-e29b-41d4-a716-446655441003',
    '550e8400-e29b-41d4-a716-446655440003',
    '550e8400-e29b-41d4-a716-446655440013',
    now() - interval '3 hours',
    'I can definitely help with your website project. Let''s discuss the requirements.'
);

-- Insert sample messages
INSERT INTO messages (conversation_id, sender_id, content, created_at) 
SELECT 
    c.id,
    m.sender_id,
    m.content,
    m.created_at
FROM conversations c
CROSS JOIN (
    VALUES 
        ('550e8400-e29b-41d4-a716-446655440010', 'Hello! Thank you for booking our cleaning service.', now() - interval '6 hours'),
        ('550e8400-e29b-41d4-a716-446655440001', 'Hi! I need a thorough cleaning for my 3BHK apartment. When can you come?', now() - interval '5 hours 30 minutes'),
        ('550e8400-e29b-41d4-a716-446655440010', 'I can come tomorrow at 10 AM. It will take approximately 4-5 hours for a thorough cleaning.', now() - interval '5 hours 25 minutes'),
        ('550e8400-e29b-41d4-a716-446655440001', 'Perfect! That works for me. What should I prepare beforehand?', now() - interval '5 hours 20 minutes'),
        ('550e8400-e29b-41d4-a716-446655440010', 'Just make sure all valuable items are kept safely. I''ll bring all the cleaning supplies.', now() - interval '5 hours 15 minutes'),
        ('550e8400-e29b-41d4-a716-446655440010', 'Thank you for booking! I''ll be there at 10 AM tomorrow.', now() - interval '2 minutes')
) AS m(sender_id, content, created_at)
WHERE c.participant_1_id = '550e8400-e29b-41d4-a716-446655440001' 
  AND c.participant_2_id = '550e8400-e29b-41d4-a716-446655440010'
LIMIT 6;

-- =============================================
-- PLATFORM ANALYTICS
-- =============================================

-- Insert daily analytics for the past 30 days
INSERT INTO platform_analytics (
    date, total_users, new_users, active_users, total_providers, active_providers,
    verified_providers, total_services, active_services, total_bookings,
    completed_bookings, cancelled_bookings, total_booking_value, platform_revenue
)
SELECT 
    date_series.date,
    random_between(50, 100) AS total_users,
    random_between(1, 5) AS new_users,
    random_between(20, 40) AS active_users,
    random_between(15, 25) AS total_providers,
    random_between(10, 20) AS active_providers,
    random_between(8, 18) AS verified_providers,
    random_between(30, 50) AS total_services,
    random_between(25, 45) AS active_services,
    random_between(5, 15) AS total_bookings,
    random_between(3, 12) AS completed_bookings,
    random_between(0, 2) AS cancelled_bookings,
    random_between(10000, 50000) AS total_booking_value,
    random_between(1500, 7500) AS platform_revenue
FROM (
    SELECT generate_series(
        CURRENT_DATE - INTERVAL '30 days',
        CURRENT_DATE - INTERVAL '1 day',
        INTERVAL '1 day'
    )::date AS date
) AS date_series;

-- Helper function for random numbers (PostgreSQL specific)
CREATE OR REPLACE FUNCTION random_between(low INT, high INT) 
RETURNS INT AS $$
BEGIN
    RETURN floor(random() * (high - low + 1) + low);
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- USER NOTIFICATIONS
-- =============================================

INSERT INTO user_notifications (
    user_id, type, title, content, related_entity_type, related_entity_id, is_read
) VALUES
(
    '550e8400-e29b-41d4-a716-446655440001',
    'booking_confirmed',
    'Booking Confirmed',
    'Your house cleaning service has been confirmed for January 18, 2024 at 10:00 AM.',
    'booking',
    '550e8400-e29b-41d4-a716-446655441001',
    true
),
(
    '550e8400-e29b-41d4-a716-446655440002',
    'new_message',
    'New Message',
    'You have a new message from Raj Tutorial Center regarding your tutoring session.',
    'message',
    NULL,
    false
),
(
    '550e8400-e29b-41d4-a716-446655440010',
    'payment_received',
    'Payment Received',
    'You have received payment of Rs 2,125 for your cleaning service.',
    'payment',
    NULL,
    false
);

-- Update user statistics based on bookings and reviews
UPDATE provider_profiles 
SET 
    total_jobs_completed = (
        SELECT COUNT(*) 
        FROM bookings 
        WHERE provider_id = provider_profiles.user_id 
          AND status = 'completed'
    ),
    total_earnings = (
        SELECT COALESCE(SUM(service_price - platform_fee), 0)
        FROM bookings 
        WHERE provider_id = provider_profiles.user_id 
          AND status = 'completed'
    ),
    average_rating = (
        SELECT COALESCE(AVG(customer_rating), 0)
        FROM bookings 
        WHERE provider_id = provider_profiles.user_id 
          AND customer_rating IS NOT NULL
    ),
    total_reviews = (
        SELECT COUNT(*)
        FROM reviews 
        WHERE reviewee_id = provider_profiles.user_id
    );

-- Update service statistics
UPDATE services 
SET 
    total_bookings = (
        SELECT COUNT(*) 
        FROM bookings 
        WHERE service_id = services.id
    ),
    average_rating = (
        SELECT COALESCE(AVG(customer_rating), 0)
        FROM bookings 
        WHERE service_id = services.id 
          AND customer_rating IS NOT NULL
    ),
    total_reviews = (
        SELECT COUNT(*)
        FROM reviews 
        WHERE service_id = services.id
    );

-- Generate booking numbers for existing bookings
UPDATE bookings 
SET booking_number = 'BK' || to_char(created_at, 'YYYY') || lpad((row_number() OVER (ORDER BY created_at))::text, 6, '0')
WHERE booking_number IS NULL OR booking_number = '';

COMMIT;
