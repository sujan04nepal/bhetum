-- ========================================
-- ANALYTICS & REPORTING DATABASE SCHEMA
-- Nepal Service Marketplace Platform
-- ========================================

-- User Analytics Table
CREATE TABLE user_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_id VARCHAR(255),
    event_type VARCHAR(50) NOT NULL, -- 'page_view', 'search', 'booking_attempt', 'profile_view', 'contact_provider'
    event_data JSONB,
    page_url TEXT,
    referrer_url TEXT,
    user_agent TEXT,
    ip_address INET,
    city VARCHAR(100),
    country VARCHAR(100),
    device_type VARCHAR(20), -- 'desktop', 'mobile', 'tablet'
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Service Performance Analytics
CREATE TABLE service_performance_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    provider_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    
    -- View metrics
    profile_views INTEGER DEFAULT 0,
    contact_clicks INTEGER DEFAULT 0,
    booking_attempts INTEGER DEFAULT 0,
    
    -- Booking metrics
    bookings_received INTEGER DEFAULT 0,
    bookings_completed INTEGER DEFAULT 0,
    bookings_cancelled INTEGER DEFAULT 0,
    
    -- Financial metrics
    total_revenue DECIMAL(10,2) DEFAULT 0,
    commission_earned DECIMAL(10,2) DEFAULT 0,
    
    -- Performance metrics
    average_rating DECIMAL(3,2),
    total_reviews INTEGER DEFAULT 0,
    response_time_minutes INTEGER,
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    UNIQUE(service_id, date)
);

-- Provider Performance Analytics
CREATE TABLE provider_performance_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    
    -- Profile metrics
    profile_views INTEGER DEFAULT 0,
    profile_completeness_score INTEGER DEFAULT 0, -- 0-100
    
    -- Service metrics
    active_services INTEGER DEFAULT 0,
    total_services INTEGER DEFAULT 0,
    
    -- Booking metrics
    bookings_received INTEGER DEFAULT 0,
    bookings_completed INTEGER DEFAULT 0,
    bookings_cancelled INTEGER DEFAULT 0,
    booking_acceptance_rate DECIMAL(5,2) DEFAULT 0,
    
    -- Financial metrics
    total_revenue DECIMAL(10,2) DEFAULT 0,
    commission_paid DECIMAL(10,2) DEFAULT 0,
    
    -- Performance metrics
    average_rating DECIMAL(3,2),
    total_reviews INTEGER DEFAULT 0,
    response_time_minutes INTEGER,
    completion_rate DECIMAL(5,2) DEFAULT 0,
    
    -- Customer satisfaction
    repeat_customer_rate DECIMAL(5,2) DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    UNIQUE(provider_id, date)
);

-- Category Performance Analytics
CREATE TABLE category_performance_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES service_categories(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    
    -- Service metrics
    active_services INTEGER DEFAULT 0,
    new_services INTEGER DEFAULT 0,
    active_providers INTEGER DEFAULT 0,
    
    -- Booking metrics
    total_bookings INTEGER DEFAULT 0,
    completed_bookings INTEGER DEFAULT 0,
    cancelled_bookings INTEGER DEFAULT 0,
    
    -- Financial metrics
    total_revenue DECIMAL(10,2) DEFAULT 0,
    commission_earned DECIMAL(10,2) DEFAULT 0,
    average_booking_value DECIMAL(10,2) DEFAULT 0,
    
    -- Performance metrics
    average_rating DECIMAL(3,2),
    search_volume INTEGER DEFAULT 0,
    conversion_rate DECIMAL(5,2) DEFAULT 0, -- Searches to bookings
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    UNIQUE(category_id, date)
);

-- Platform Daily Analytics
CREATE TABLE platform_daily_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL UNIQUE,
    
    -- User metrics
    total_users INTEGER DEFAULT 0,
    new_users INTEGER DEFAULT 0,
    active_users INTEGER DEFAULT 0, -- Users who logged in
    active_providers INTEGER DEFAULT 0,
    active_seekers INTEGER DEFAULT 0,
    
    -- Service metrics
    total_services INTEGER DEFAULT 0,
    new_services INTEGER DEFAULT 0,
    approved_services INTEGER DEFAULT 0,
    
    -- Booking metrics
    total_bookings INTEGER DEFAULT 0,
    new_bookings INTEGER DEFAULT 0,
    completed_bookings INTEGER DEFAULT 0,
    cancelled_bookings INTEGER DEFAULT 0,
    
    -- Financial metrics
    total_revenue DECIMAL(10,2) DEFAULT 0,
    commission_earned DECIMAL(10,2) DEFAULT 0,
    refunds_processed DECIMAL(10,2) DEFAULT 0,
    
    -- Platform health metrics
    average_response_time INTEGER DEFAULT 0, -- in milliseconds
    error_rate DECIMAL(5,2) DEFAULT 0,
    uptime_percentage DECIMAL(5,2) DEFAULT 100,
    
    -- Support metrics
    support_tickets_created INTEGER DEFAULT 0,
    support_tickets_resolved INTEGER DEFAULT 0,
    
    -- Geographic metrics
    top_cities JSONB, -- {"Kathmandu": 45, "Pokhara": 23, ...}
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Search Analytics Table
CREATE TABLE search_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    session_id VARCHAR(255),
    search_query TEXT NOT NULL,
    search_filters JSONB, -- Location, category, price range, etc.
    results_count INTEGER,
    clicked_result_position INTEGER, -- Which result was clicked (1, 2, 3...)
    clicked_service_id UUID REFERENCES services(id),
    resulted_in_booking BOOLEAN DEFAULT false,
    booking_id UUID REFERENCES bookings(id),
    search_duration_seconds INTEGER, -- Time spent on search results
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Revenue Analytics Table
CREATE TABLE revenue_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    revenue_type VARCHAR(50) NOT NULL, -- 'commission', 'subscription', 'advertisement', 'premium_listing'
    category_id UUID REFERENCES service_categories(id),
    
    -- Revenue breakdown
    gross_revenue DECIMAL(10,2) DEFAULT 0,
    net_revenue DECIMAL(10,2) DEFAULT 0,
    processing_fees DECIMAL(10,2) DEFAULT 0,
    refunds DECIMAL(10,2) DEFAULT 0,
    
    -- Transaction counts
    transaction_count INTEGER DEFAULT 0,
    refund_count INTEGER DEFAULT 0,
    
    -- Metadata
    metadata JSONB,
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    UNIQUE(date, revenue_type, category_id)
);

-- Geographic Analytics Table
CREATE TABLE geographic_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    country VARCHAR(100) NOT NULL DEFAULT 'Nepal',
    date DATE NOT NULL,
    
    -- User metrics
    active_users INTEGER DEFAULT 0,
    new_users INTEGER DEFAULT 0,
    active_providers INTEGER DEFAULT 0,
    
    -- Service metrics
    available_services INTEGER DEFAULT 0,
    
    -- Booking metrics
    bookings_made INTEGER DEFAULT 0,
    bookings_completed INTEGER DEFAULT 0,
    
    -- Financial metrics
    revenue_generated DECIMAL(10,2) DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    UNIQUE(city, date)
);

-- User Retention Analytics
CREATE TABLE user_retention_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cohort_month DATE NOT NULL, -- First month user signed up
    user_type VARCHAR(20) NOT NULL, -- 'provider', 'seeker'
    cohort_size INTEGER NOT NULL, -- Number of users in this cohort
    
    -- Retention rates by month
    month_1_retained INTEGER DEFAULT 0,
    month_2_retained INTEGER DEFAULT 0,
    month_3_retained INTEGER DEFAULT 0,
    month_6_retained INTEGER DEFAULT 0,
    month_12_retained INTEGER DEFAULT 0,
    
    -- Engagement metrics
    avg_bookings_per_user DECIMAL(5,2) DEFAULT 0,
    avg_revenue_per_user DECIMAL(10,2) DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    UNIQUE(cohort_month, user_type)
);

-- Conversion Funnel Analytics
CREATE TABLE conversion_funnel_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    funnel_step VARCHAR(50) NOT NULL, -- 'page_visit', 'search', 'provider_view', 'contact', 'booking_attempt', 'booking_completed'
    category_id UUID REFERENCES service_categories(id),
    
    -- Funnel metrics
    unique_users INTEGER DEFAULT 0,
    total_events INTEGER DEFAULT 0,
    conversion_rate DECIMAL(5,2) DEFAULT 0, -- Conversion to next step
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    UNIQUE(date, funnel_step, category_id)
);

-- ========================================
-- ANALYTICS VIEWS FOR COMMON QUERIES
-- ========================================

-- Monthly Revenue Summary View
CREATE VIEW monthly_revenue_summary AS
SELECT 
    DATE_TRUNC('month', date) as month,
    SUM(gross_revenue) as total_gross_revenue,
    SUM(net_revenue) as total_net_revenue,
    SUM(processing_fees) as total_processing_fees,
    SUM(refunds) as total_refunds,
    SUM(transaction_count) as total_transactions
FROM revenue_analytics
GROUP BY DATE_TRUNC('month', date)
ORDER BY month DESC;

-- Provider Performance Summary View
CREATE VIEW provider_performance_summary AS
SELECT 
    p.provider_id,
    u.full_name as provider_name,
    u.email as provider_email,
    DATE_TRUNC('month', p.date) as month,
    SUM(p.bookings_received) as total_bookings_received,
    SUM(p.bookings_completed) as total_bookings_completed,
    SUM(p.total_revenue) as total_revenue,
    AVG(p.average_rating) as avg_rating,
    AVG(p.response_time_minutes) as avg_response_time
FROM provider_performance_analytics p
JOIN users u ON p.provider_id = u.id
GROUP BY p.provider_id, u.full_name, u.email, DATE_TRUNC('month', p.date)
ORDER BY month DESC, total_revenue DESC;

-- Category Performance Summary View
CREATE VIEW category_performance_summary AS
SELECT 
    c.category_id,
    sc.name as category_name,
    DATE_TRUNC('month', c.date) as month,
    SUM(c.total_bookings) as total_bookings,
    SUM(c.completed_bookings) as completed_bookings,
    SUM(c.total_revenue) as total_revenue,
    AVG(c.average_rating) as avg_rating,
    SUM(c.search_volume) as total_search_volume
FROM category_performance_analytics c
JOIN service_categories sc ON c.category_id = sc.id
GROUP BY c.category_id, sc.name, DATE_TRUNC('month', c.date)
ORDER BY month DESC, total_revenue DESC;

-- User Growth Trend View
CREATE VIEW user_growth_trend AS
SELECT 
    date,
    total_users,
    new_users,
    active_users,
    LAG(total_users) OVER (ORDER BY date) as previous_total_users,
    ((total_users - LAG(total_users) OVER (ORDER BY date))::DECIMAL / 
     NULLIF(LAG(total_users) OVER (ORDER BY date), 0) * 100) as growth_rate
FROM platform_daily_analytics
ORDER BY date DESC;

-- ========================================
-- INDEXES FOR ANALYTICS PERFORMANCE
-- ========================================

-- User Analytics Indexes
CREATE INDEX idx_user_analytics_user_id ON user_analytics(user_id);
CREATE INDEX idx_user_analytics_event_type ON user_analytics(event_type);
CREATE INDEX idx_user_analytics_created_at ON user_analytics(created_at);
CREATE INDEX idx_user_analytics_session_id ON user_analytics(session_id);

-- Service Performance Analytics Indexes
CREATE INDEX idx_service_performance_service_id ON service_performance_analytics(service_id);
CREATE INDEX idx_service_performance_provider_id ON service_performance_analytics(provider_id);
CREATE INDEX idx_service_performance_date ON service_performance_analytics(date);

-- Provider Performance Analytics Indexes
CREATE INDEX idx_provider_performance_provider_id ON provider_performance_analytics(provider_id);
CREATE INDEX idx_provider_performance_date ON provider_performance_analytics(date);

-- Category Performance Analytics Indexes
CREATE INDEX idx_category_performance_category_id ON category_performance_analytics(category_id);
CREATE INDEX idx_category_performance_date ON category_performance_analytics(date);

-- Platform Daily Analytics Indexes
CREATE INDEX idx_platform_daily_analytics_date ON platform_daily_analytics(date);

-- Search Analytics Indexes
CREATE INDEX idx_search_analytics_user_id ON search_analytics(user_id);
CREATE INDEX idx_search_analytics_created_at ON search_analytics(created_at);
CREATE INDEX idx_search_analytics_search_query ON search_analytics USING gin(to_tsvector('english', search_query));
CREATE INDEX idx_search_analytics_clicked_service ON search_analytics(clicked_service_id);

-- Revenue Analytics Indexes
CREATE INDEX idx_revenue_analytics_date ON revenue_analytics(date);
CREATE INDEX idx_revenue_analytics_type ON revenue_analytics(revenue_type);
CREATE INDEX idx_revenue_analytics_category ON revenue_analytics(category_id);

-- Geographic Analytics Indexes
CREATE INDEX idx_geographic_analytics_city ON geographic_analytics(city);
CREATE INDEX idx_geographic_analytics_date ON geographic_analytics(date);

-- User Retention Analytics Indexes
CREATE INDEX idx_user_retention_cohort_month ON user_retention_analytics(cohort_month);
CREATE INDEX idx_user_retention_user_type ON user_retention_analytics(user_type);

-- Conversion Funnel Analytics Indexes
CREATE INDEX idx_conversion_funnel_date ON conversion_funnel_analytics(date);
CREATE INDEX idx_conversion_funnel_step ON conversion_funnel_analytics(funnel_step);
CREATE INDEX idx_conversion_funnel_category ON conversion_funnel_analytics(category_id);

-- ========================================
-- ANALYTICS UPDATE TRIGGERS
-- ========================================

-- Apply timestamp triggers to analytics tables
CREATE TRIGGER update_service_performance_analytics_updated_at BEFORE UPDATE ON service_performance_analytics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_provider_performance_analytics_updated_at BEFORE UPDATE ON provider_performance_analytics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_category_performance_analytics_updated_at BEFORE UPDATE ON category_performance_analytics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_platform_daily_analytics_updated_at BEFORE UPDATE ON platform_daily_analytics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_revenue_analytics_updated_at BEFORE UPDATE ON revenue_analytics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_geographic_analytics_updated_at BEFORE UPDATE ON geographic_analytics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_retention_analytics_updated_at BEFORE UPDATE ON user_retention_analytics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_conversion_funnel_analytics_updated_at BEFORE UPDATE ON conversion_funnel_analytics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- SAMPLE ANALYTICS DATA
-- ========================================

-- Insert sample platform daily analytics
INSERT INTO platform_daily_analytics (
    date, total_users, new_users, active_users, active_providers, active_seekers,
    total_services, new_services, total_bookings, new_bookings, completed_bookings,
    total_revenue, commission_earned, support_tickets_created, support_tickets_resolved
) VALUES
(CURRENT_DATE - INTERVAL '1 day', 12567, 45, 2340, 3421, 9146, 8934, 23, 234, 45, 198, 245678.50, 24567.85, 12, 8),
(CURRENT_DATE - INTERVAL '2 days', 12522, 38, 2198, 3415, 9107, 8911, 19, 189, 42, 176, 198765.30, 19876.53, 15, 12),
(CURRENT_DATE - INTERVAL '3 days', 12484, 52, 2456, 3400, 9084, 8892, 31, 223, 48, 201, 267543.20, 26754.32, 18, 15);

-- Insert sample category performance analytics
INSERT INTO category_performance_analytics (
    category_id, date, active_services, total_bookings, completed_bookings,
    total_revenue, commission_earned, average_rating, search_volume, conversion_rate
) VALUES
((SELECT id FROM service_categories WHERE name LIKE '%Cleaning%' LIMIT 1), CURRENT_DATE - INTERVAL '1 day', 245, 45, 39, 45600.00, 4560.00, 4.7, 567, 7.9),
((SELECT id FROM service_categories WHERE name LIKE '%Teaching%' LIMIT 1), CURRENT_DATE - INTERVAL '1 day', 189, 32, 28, 34200.00, 3420.00, 4.8, 423, 7.6),
((SELECT id FROM service_categories WHERE name LIKE '%Digital%' LIMIT 1), CURRENT_DATE - INTERVAL '1 day', 156, 28, 25, 67800.00, 6780.00, 4.9, 334, 8.4);
