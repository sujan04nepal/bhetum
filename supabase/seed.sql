-- Seed data for Nepal Service Marketplace
-- This file contains sample data for development and testing

-- Insert sample service subcategories
INSERT INTO service_subcategories (category_id, name_en, name_ne, description_en, description_ne, icon) 
SELECT 
    sc.id,
    subcategory.name_en,
    subcategory.name_ne,
    subcategory.description_en,
    subcategory.description_ne,
    subcategory.icon
FROM service_categories sc
CROSS JOIN (
    VALUES 
    -- Home Services subcategories
    ('Home Services', 'House Cleaning', 'घर सरसफाइ', 'Professional house cleaning services', 'व्यावसायिक घर सरसफाइ सेवाहरू', '🧽'),
    ('Home Services', 'Plumbing', 'नलसाजी', 'Plumbing repairs and installation', 'नलसाजी मर्मत र स्थापना', '🔧'),
    ('Home Services', 'Electrical Work', 'बिजुली कार्य', 'Electrical repairs and installation', 'बिजुली मर्मत र स्थापना', '⚡'),
    ('Home Services', 'Painting', 'रंगाई', 'Interior and exterior painting', 'भित्री र बाहिरी रंगाई', '🎨'),
    ('Home Services', 'Carpentry', 'सिकर्मी काम', 'Furniture making and wood work', 'फर्निचर निर्माण र काठको काम', '🪚'),
    ('Home Services', 'Gardening', 'बगैंचा', 'Garden maintenance and landscaping', 'बगैंचा मर्मत र भूदृश्य', '🌱'),
    
    -- Technology subcategories
    ('Technology', 'Computer Repair', 'कम्प्युटर मर्मत', 'Desktop and laptop repair services', 'डेस्कटप र ल्यापटप मर्मत सेवाहरू', '🖥️'),
    ('Technology', 'Web Development', 'वेब विकास', 'Website and web application development', 'वेबसाइट र वेब अनुप्रयोग विकास', '🌐'),
    ('Technology', 'Mobile App Development', 'मोबाइल एप विकास', 'iOS and Android app development', 'iOS र Android एप विकास', '📱'),
    ('Technology', 'Digital Marketing', 'डिजिटल मार्केटिङ', 'SEO, social media, and online marketing', 'SEO, सामाजिक मिडिया, र अनलाइन मार्केटिङ', '📈'),
    ('Technology', 'Data Entry', 'डाटा एन्ट्री', 'Data entry and processing services', 'डाटा एन्ट्री र प्रशोधन सेवाहरू', '⌨️'),
    
    -- Education subcategories
    ('Education', 'Academic Tutoring', 'शैक्षणिक ट्यूशन', 'School and college subject tutoring', 'विद्यालय र कलेजका विषयहरूको ट्यूशन', '📖'),
    ('Education', 'Language Learning', 'भाषा सिकाइ', 'Language teaching and conversation practice', 'भाषा सिकाउने र वार्तालाप अभ्यास', '🗣️'),
    ('Education', 'Music Lessons', 'संगीत पाठ', 'Musical instrument and vocal training', 'संगीत वाद्ययन्त्र र स्वर तालिम', '🎵'),
    ('Education', 'Art & Craft', 'कला र शिल्प', 'Art, craft, and creative skills training', 'कला, शिल्प, र रचनात्मक सीप तालिम', '🎨'),
    ('Education', 'Skill Development', 'सीप विकास', 'Professional and personal skill development', 'व्यावसायिक र व्यक्तिगत सीप विकास', '💡'),
    
    -- Health & Wellness subcategories
    ('Health & Wellness', 'Personal Training', 'व्यक्तिगत प्रशिक्षण', 'Fitness and personal training services', 'फिटनेस र व्यक्तिगत प्रशिक्षण सेवाहरू', '🏋️'),
    ('Health & Wellness', 'Yoga & Meditation', 'योग र ध्यान', 'Yoga classes and meditation guidance', 'योग कक्षाहरू र ध्यान निर्देशन', '🧘'),
    ('Health & Wellness', 'Nutrition Counseling', 'पोषण परामर्श', 'Diet planning and nutrition advice', 'आहार योजना र पोषण सल्लाह', '🥗'),
    ('Health & Wellness', 'Physiotherapy', 'फिजियोथेरापी', 'Physical therapy and rehabilitation', 'शारीरिक उपचार र पुनर्वास', '🦴'),
    ('Health & Wellness', 'Mental Health', 'मानसिक स्वास्थ्य', 'Counseling and mental health support', 'परामर्श र म���नसिक स्वास्थ्य सहयोग', '🧠'),
    
    -- Events & Entertainment subcategories
    ('Events & Entertainment', 'Photography', 'फोटोग्राफी', 'Event and portrait photography', 'कार्यक्रम र पोर्ट्रेट फोटोग्राफी', '📸'),
    ('Events & Entertainment', 'Videography', 'भिडियोग्राफी', 'Video production and editing', 'भिडियो उत्पादन र सम्पादन', '🎥'),
    ('Events & Entertainment', 'Event Planning', 'कार्यक्रम योजना', 'Wedding and event planning services', 'विवाह र कार्यक्रम योजना सेवाहरू', '💒'),
    ('Events & Entertainment', 'DJ Services', 'DJ सेवाहरू', 'Music and DJ services for events', 'कार्यक्रमहरूका लागि संगीत र DJ सेवाहरू', '🎧'),
    ('Events & Entertainment', 'Catering', 'खानपान', 'Food and catering services', 'खाना र खानपान सेवाहरू', '🍽️'),
    
    -- Beauty & Personal Care subcategories
    ('Beauty & Personal Care', 'Hair Styling', 'कपाल स्टाइलिङ', 'Hair cutting, styling, and treatment', '���पाल काट्ने, स्टाइलिङ, र उपचार', '💇'),
    ('Beauty & Personal Care', 'Makeup Services', 'मेकअप सेवाहरू', 'Bridal and event makeup services', 'दुलही र कार्यक्रम मेकअप सेवाहरू', '💄'),
    ('Beauty & Personal Care', 'Spa & Massage', 'स्पा र मसाज', 'Relaxation and therapeutic massage', 'आराम र चिकित्सकीय मसाज', '💆'),
    ('Beauty & Personal Care', 'Nail Services', 'नेल सेवाहरू', 'Manicure, pedicure, and nail art', 'म्यानिक्योर, पेडिक्योर, र नेल आर्ट', '💅'),
    ('Beauty & Personal Care', 'Skincare', 'छाला हेरचाह', 'Facial treatments and skincare', 'अनुहार उपचार र छाला हेरचाह', '✨'),
    
    -- Transportation subcategories
    ('Transportation', 'Moving Services', 'सामान ढुवानी', 'Home and office relocation services', 'घर र कार्यालय स्थानान्तरण सेवाहरू', '📦'),
    ('Transportation', 'Delivery Services', 'डेलिभरी सेवाहरू', 'Package and document delivery', 'प्याकेज र ���ागजात डेलिभरी', '🚚'),
    ('Transportation', 'Taxi Services', 'ट्याक्सी सेवाहरू', 'Personal transportation services', 'व्यक्तिगत यातायात सेवाहरू', '🚗'),
    ('Transportation', 'Bike Delivery', 'बाइक डेलिभरी', 'Fast delivery by motorcycle', 'मोटरसाइकलद्वारा छिटो डेलिभरी', '🏍️'),
    
    -- Professional Services subcategories
    ('Professional Services', 'Legal Services', 'कानुनी सेवाहरू', 'Legal consultation and documentation', 'कानुनी परामर्श र कागजात', '⚖️'),
    ('Professional Services', 'Accounting', 'लेखांकन', 'Bookkeeping and tax preparation', 'खाता राख्ने र कर तयारी', '📊'),
    ('Professional Services', 'Business Consulting', 'व्यापार परामर्श', 'Business strategy and consulting', 'व्यापार रणनीति र परामर्श', '💼'),
    ('Professional Services', 'Content Writing', 'सामग्री लेखन', 'Article writing and content creation', 'लेख लेखन र सामग्री सिर्जना', '✍️'),
    ('Professional Services', 'Translation', 'अनुवाद', 'Document and verbal translation', 'कागजात र मौखिक अनुवाद', '🌐')
) AS subcategory(category_name, name_en, name_ne, description_en, description_ne, icon)
WHERE sc.name_en = subcategory.category_name;

-- Insert sample users (these will be created through auth, this is just for reference)
-- Note: In production, users are created through Supabase Auth, this is just for testing

-- Sample system settings for development
INSERT INTO system_settings (setting_key, setting_value, description, is_public) VALUES
('max_file_upload_size', '10485760', 'Maximum file upload size in bytes (10MB)', false),
('allowed_file_types', '["image/jpeg", "image/png", "image/gif", "application/pdf", "image/webp"]', 'Allowed file types for uploads', false),
('email_verification_required', 'true', 'Whether email verification is required for new users', false),
('phone_verification_required', 'true', 'Whether phone verification is required for providers', false),
('auto_approve_services', 'false', 'Whether to auto-approve new service submissions', false),
('booking_cancellation_hours', '24', 'Minimum hours before booking start time to allow cancellation', true),
('platform_currency', '"NPR"', 'Platform currency code', true),
('timezone', '"Asia/Kathmandu"', 'Platform timezone', true),
('maintenance_mode', 'false', 'Whether the platform is in maintenance mode', false);

-- Insert sample platform analytics (for demo purposes)
INSERT INTO platform_analytics (date, metric_name, metric_value, metadata) VALUES
(CURRENT_DATE - INTERVAL '30 days', 'total_users', 1250, '{"providers": 420, "seekers": 830}'),
(CURRENT_DATE - INTERVAL '30 days', 'total_bookings', 85, '{"completed": 72, "cancelled": 8, "disputed": 5}'),
(CURRENT_DATE - INTERVAL '30 days', 'total_revenue', 125000, '{"currency": "NPR"}'),
(CURRENT_DATE - INTERVAL '29 days', 'total_users', 1267, '{"providers": 425, "seekers": 842}'),
(CURRENT_DATE - INTERVAL '29 days', 'total_bookings', 91, '{"completed": 78, "cancelled": 9, "disputed": 4}'),
(CURRENT_DATE - INTERVAL '29 days', 'total_revenue', 138500, '{"currency": "NPR"}'),
(CURRENT_DATE - INTERVAL '28 days', 'total_users', 1283, '{"providers": 431, "seekers": 852}'),
(CURRENT_DATE - INTERVAL '28 days', 'total_bookings', 96, '{"completed": 83, "cancelled": 8, "disputed": 5}'),
(CURRENT_DATE - INTERVAL '28 days', 'total_revenue', 147200, '{"currency": "NPR"}'),
(CURRENT_DATE - INTERVAL '7 days', 'total_users', 1456, '{"providers": 485, "seekers": 971}'),
(CURRENT_DATE - INTERVAL '7 days', 'total_bookings', 142, '{"completed": 126, "cancelled": 11, "disputed": 5}'),
(CURRENT_DATE - INTERVAL '7 days', 'total_revenue', 218600, '{"currency": "NPR"}'),
(CURRENT_DATE - INTERVAL '1 day', 'total_users', 1523, '{"providers": 502, "seekers": 1021}'),
(CURRENT_DATE - INTERVAL '1 day', 'total_bookings', 156, '{"completed": 141, "cancelled": 10, "disputed": 5}'),
(CURRENT_DATE - INTERVAL '1 day', 'total_revenue', 245800, '{"currency": "NPR"}'),
(CURRENT_DATE, 'total_users', 1547, '{"providers": 508, "seekers": 1039}'),
(CURRENT_DATE, 'total_bookings', 163, '{"completed": 147, "cancelled": 11, "disputed": 5}'),
(CURRENT_DATE, 'total_revenue', 257300, '{"currency": "NPR"}');

-- Create some sample admin users (you'll need to create these through Supabase Auth first)
-- Then update their role to admin manually in the database

-- Function to calculate provider statistics
CREATE OR REPLACE FUNCTION update_provider_statistics(provider_profile_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE provider_profiles 
    SET 
        total_jobs_completed = (
            SELECT COUNT(*) 
            FROM bookings 
            WHERE provider_id = provider_profile_id AND status = 'completed'
        ),
        total_earnings = (
            SELECT COALESCE(SUM(final_price), 0)
            FROM bookings 
            WHERE provider_id = provider_profile_id AND status = 'completed'
        ),
        average_rating = (
            SELECT COALESCE(AVG(rating), 0)
            FROM reviews r
            JOIN bookings b ON r.booking_id = b.id
            WHERE b.provider_id = provider_profile_id AND r.moderation_status = 'approved'
        ),
        total_reviews = (
            SELECT COUNT(*)
            FROM reviews r
            JOIN bookings b ON r.booking_id = b.id
            WHERE b.provider_id = provider_profile_id AND r.moderation_status = 'approved'
        )
    WHERE id = provider_profile_id;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate platform daily analytics
CREATE OR REPLACE FUNCTION calculate_daily_analytics(target_date DATE)
RETURNS void AS $$
BEGIN
    -- Insert or update total users
    INSERT INTO platform_analytics (date, metric_name, metric_value, metadata)
    VALUES (
        target_date,
        'total_users',
        (SELECT COUNT(*) FROM users WHERE DATE(created_at) <= target_date),
        json_build_object(
            'providers', (SELECT COUNT(*) FROM users WHERE role = 'provider' AND DATE(created_at) <= target_date),
            'seekers', (SELECT COUNT(*) FROM users WHERE role = 'seeker' AND DATE(created_at) <= target_date)
        )::jsonb
    )
    ON CONFLICT (date, metric_name) 
    DO UPDATE SET 
        metric_value = EXCLUDED.metric_value,
        metadata = EXCLUDED.metadata;

    -- Insert or update total bookings
    INSERT INTO platform_analytics (date, metric_name, metric_value, metadata)
    VALUES (
        target_date,
        'total_bookings',
        (SELECT COUNT(*) FROM bookings WHERE DATE(created_at) <= target_date),
        json_build_object(
            'completed', (SELECT COUNT(*) FROM bookings WHERE status = 'completed' AND DATE(created_at) <= target_date),
            'cancelled', (SELECT COUNT(*) FROM bookings WHERE status = 'cancelled' AND DATE(created_at) <= target_date),
            'disputed', (SELECT COUNT(*) FROM disputes WHERE DATE(created_at) <= target_date)
        )::jsonb
    )
    ON CONFLICT (date, metric_name) 
    DO UPDATE SET 
        metric_value = EXCLUDED.metric_value,
        metadata = EXCLUDED.metadata;

    -- Insert or update total revenue
    INSERT INTO platform_analytics (date, metric_name, metric_value, metadata)
    VALUES (
        target_date,
        'total_revenue',
        (SELECT COALESCE(SUM(final_price), 0) FROM bookings WHERE status = 'completed' AND DATE(created_at) <= target_date),
        json_build_object('currency', 'NPR')::jsonb
    )
    ON CONFLICT (date, metric_name) 
    DO UPDATE SET 
        metric_value = EXCLUDED.metric_value,
        metadata = EXCLUDED.metadata;
END;
$$ LANGUAGE plpgsql;

-- Create a function to automatically update analytics daily
CREATE OR REPLACE FUNCTION auto_calculate_analytics()
RETURNS void AS $$
BEGIN
    PERFORM calculate_daily_analytics(CURRENT_DATE);
END;
$$ LANGUAGE plpgsql;

-- You can set up a cron job or use pg_cron extension to run this daily:
-- SELECT cron.schedule('daily-analytics', '0 1 * * *', 'SELECT auto_calculate_analytics();');
