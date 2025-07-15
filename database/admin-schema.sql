-- ========================================
-- ADMIN PANEL DATABASE SCHEMA
-- Nepal Service Marketplace Platform
-- ========================================

-- Admin Users Table
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'admin', -- 'super_admin', 'admin', 'support_staff'
    permissions JSONB NOT NULL DEFAULT '{}', -- Specific permissions for fine-grained access control
    is_active BOOLEAN NOT NULL DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Admin Sessions Table
CREATE TABLE admin_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_user_id UUID NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    ip_address INET,
    user_agent TEXT,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Platform Settings Table
CREATE TABLE platform_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type VARCHAR(20) NOT NULL DEFAULT 'string', -- 'string', 'number', 'boolean', 'json'
    description TEXT,
    is_public BOOLEAN NOT NULL DEFAULT false, -- Whether setting is visible to non-admin users
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Commission Settings Table
CREATE TABLE commission_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES service_categories(id),
    commission_type VARCHAR(20) NOT NULL DEFAULT 'percentage', -- 'percentage', 'fixed'
    commission_value DECIMAL(10,2) NOT NULL,
    min_amount DECIMAL(10,2),
    max_amount DECIMAL(10,2),
    is_active BOOLEAN NOT NULL DEFAULT true,
    effective_from TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    effective_until TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- User Verification Logs Table
CREATE TABLE user_verification_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    admin_user_id UUID REFERENCES admin_users(id),
    verification_type VARCHAR(50) NOT NULL, -- 'citizenship', 'certificate', 'profile_photo', 'phone', 'email'
    previous_status VARCHAR(20),
    new_status VARCHAR(20) NOT NULL, -- 'pending', 'verified', 'rejected'
    rejection_reason TEXT,
    notes TEXT,
    document_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Service Approval Logs Table
CREATE TABLE service_approval_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    admin_user_id UUID REFERENCES admin_users(id),
    previous_status VARCHAR(20),
    new_status VARCHAR(20) NOT NULL, -- 'pending', 'approved', 'rejected'
    rejection_reason TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Dispute Management Table
CREATE TABLE disputes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    reporter_id UUID NOT NULL REFERENCES users(id),
    reported_id UUID NOT NULL REFERENCES users(id),
    dispute_type VARCHAR(50) NOT NULL, -- 'payment', 'service_quality', 'no_show', 'behavior', 'other'
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    evidence_urls JSONB, -- Array of evidence file URLs
    status VARCHAR(20) NOT NULL DEFAULT 'open', -- 'open', 'investigating', 'resolved', 'closed'
    priority VARCHAR(10) NOT NULL DEFAULT 'medium', -- 'low', 'medium', 'high', 'urgent'
    assigned_admin_id UUID REFERENCES admin_users(id),
    resolution TEXT,
    resolution_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Dispute Actions Table
CREATE TABLE dispute_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dispute_id UUID NOT NULL REFERENCES disputes(id) ON DELETE CASCADE,
    admin_user_id UUID REFERENCES admin_users(id),
    action_type VARCHAR(50) NOT NULL, -- 'comment', 'status_change', 'refund', 'warning', 'suspension'
    action_details JSONB,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Payment Transactions Table (Enhanced for Admin)
CREATE TABLE payment_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES bookings(id),
    payer_id UUID NOT NULL REFERENCES users(id),
    payee_id UUID REFERENCES users(id),
    transaction_type VARCHAR(30) NOT NULL, -- 'booking_payment', 'commission', 'refund', 'payout', 'penalty'
    amount DECIMAL(10,2) NOT NULL,
    commission_amount DECIMAL(10,2) DEFAULT 0,
    currency VARCHAR(3) NOT NULL DEFAULT 'NPR',
    payment_method VARCHAR(30), -- 'esewa', 'khalti', 'bank_transfer', 'cash', 'admin_adjustment'
    external_transaction_id VARCHAR(255),
    status VARCHAR(20) NOT NULL DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded', 'cancelled'
    processed_by_admin_id UUID REFERENCES admin_users(id),
    notes TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Payout Requests Table
CREATE TABLE payout_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    bank_account_name VARCHAR(100) NOT NULL,
    bank_account_number VARCHAR(50) NOT NULL,
    bank_name VARCHAR(100) NOT NULL,
    bank_branch VARCHAR(100),
    status VARCHAR(20) NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'processed', 'rejected'
    approved_by_admin_id UUID REFERENCES admin_users(id),
    processed_by_admin_id UUID REFERENCES admin_users(id),
    rejection_reason TEXT,
    processed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Admin Activity Logs Table
CREATE TABLE admin_activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_user_id UUID NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
    action VARCHAR(100) NOT NULL, -- 'user_verified', 'service_approved', 'dispute_resolved', 'payout_processed'
    entity_type VARCHAR(50), -- 'user', 'service', 'booking', 'dispute', 'transaction'
    entity_id UUID,
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- System Notifications Table
CREATE TABLE system_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    notification_type VARCHAR(30) NOT NULL, -- 'announcement', 'maintenance', 'feature', 'warning'
    target_audience VARCHAR(30) NOT NULL DEFAULT 'all', -- 'all', 'providers', 'seekers', 'admins'
    is_active BOOLEAN NOT NULL DEFAULT true,
    scheduled_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_by_admin_id UUID NOT NULL REFERENCES admin_users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Email Templates Table
CREATE TABLE email_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_name VARCHAR(100) UNIQUE NOT NULL,
    subject VARCHAR(200) NOT NULL,
    html_content TEXT NOT NULL,
    text_content TEXT,
    variables JSONB, -- Available template variables
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_by_admin_id UUID NOT NULL REFERENCES admin_users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- User Reports Table
CREATE TABLE user_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_id UUID NOT NULL REFERENCES users(id),
    reported_id UUID NOT NULL REFERENCES users(id),
    report_type VARCHAR(50) NOT NULL, -- 'inappropriate_behavior', 'fake_profile', 'spam', 'harassment', 'other'
    booking_id UUID REFERENCES bookings(id),
    description TEXT NOT NULL,
    evidence_urls JSONB,
    status VARCHAR(20) NOT NULL DEFAULT 'pending', -- 'pending', 'investigating', 'resolved', 'dismissed'
    assigned_admin_id UUID REFERENCES admin_users(id),
    resolution TEXT,
    action_taken VARCHAR(100), -- 'warning_sent', 'account_suspended', 'no_action', 'profile_updated'
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Service Review Moderation Table
CREATE TABLE review_moderation (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
    reported_by_user_id UUID REFERENCES users(id),
    moderation_type VARCHAR(30) NOT NULL, -- 'auto_flagged', 'user_reported', 'admin_review'
    flag_reason VARCHAR(100), -- 'inappropriate_language', 'fake_review', 'off_topic', 'spam'
    status VARCHAR(20) NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'hidden', 'deleted'
    moderated_by_admin_id UUID REFERENCES admin_users(id),
    moderator_notes TEXT,
    moderated_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Platform Analytics Table
CREATE TABLE platform_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(15,2) NOT NULL,
    metric_date DATE NOT NULL,
    metric_type VARCHAR(30) NOT NULL, -- 'daily', 'weekly', 'monthly'
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    UNIQUE(metric_name, metric_date, metric_type)
);

-- Support Tickets Table
CREATE TABLE support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_number VARCHAR(20) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id),
    user_email VARCHAR(255) NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'technical', 'payment', 'account', 'service', 'general'
    priority VARCHAR(10) NOT NULL DEFAULT 'medium', -- 'low', 'medium', 'high', 'urgent'
    status VARCHAR(20) NOT NULL DEFAULT 'open', -- 'open', 'in_progress', 'resolved', 'closed'
    assigned_admin_id UUID REFERENCES admin_users(id),
    resolution TEXT,
    attachments JSONB,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Support Ticket Responses Table
CREATE TABLE support_ticket_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id UUID NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
    responder_id UUID REFERENCES admin_users(id), -- NULL if user response
    responder_type VARCHAR(10) NOT NULL, -- 'admin', 'user'
    message TEXT NOT NULL,
    is_internal BOOLEAN NOT NULL DEFAULT false, -- Internal admin notes
    attachments JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Quick Reply Templates Table
CREATE TABLE quick_reply_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50), -- 'greeting', 'closing', 'technical', 'payment', etc.
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_by_admin_id UUID NOT NULL REFERENCES admin_users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- System Maintenance Table
CREATE TABLE system_maintenance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    maintenance_type VARCHAR(30) NOT NULL, -- 'scheduled', 'emergency', 'feature_update'
    status VARCHAR(20) NOT NULL DEFAULT 'scheduled', -- 'scheduled', 'in_progress', 'completed', 'cancelled'
    affects_services JSONB, -- Array of affected services/features
    scheduled_start TIMESTAMP WITH TIME ZONE NOT NULL,
    scheduled_end TIMESTAMP WITH TIME ZONE NOT NULL,
    actual_start TIMESTAMP WITH TIME ZONE,
    actual_end TIMESTAMP WITH TIME ZONE,
    created_by_admin_id UUID NOT NULL REFERENCES admin_users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- ========================================
-- INDEXES FOR PERFORMANCE
-- ========================================

-- Admin Users Indexes
CREATE INDEX idx_admin_users_email ON admin_users(email);
CREATE INDEX idx_admin_users_username ON admin_users(username);
CREATE INDEX idx_admin_users_role ON admin_users(role);
CREATE INDEX idx_admin_users_is_active ON admin_users(is_active);

-- Admin Sessions Indexes
CREATE INDEX idx_admin_sessions_admin_user_id ON admin_sessions(admin_user_id);
CREATE INDEX idx_admin_sessions_session_token ON admin_sessions(session_token);
CREATE INDEX idx_admin_sessions_expires_at ON admin_sessions(expires_at);

-- Platform Settings Indexes
CREATE INDEX idx_platform_settings_key ON platform_settings(setting_key);
CREATE INDEX idx_platform_settings_is_public ON platform_settings(is_public);

-- Commission Settings Indexes
CREATE INDEX idx_commission_settings_category_id ON commission_settings(category_id);
CREATE INDEX idx_commission_settings_is_active ON commission_settings(is_active);
CREATE INDEX idx_commission_settings_effective ON commission_settings(effective_from, effective_until);

-- User Verification Logs Indexes
CREATE INDEX idx_user_verification_logs_user_id ON user_verification_logs(user_id);
CREATE INDEX idx_user_verification_logs_admin_user_id ON user_verification_logs(admin_user_id);
CREATE INDEX idx_user_verification_logs_type_status ON user_verification_logs(verification_type, new_status);
CREATE INDEX idx_user_verification_logs_created_at ON user_verification_logs(created_at);

-- Service Approval Logs Indexes
CREATE INDEX idx_service_approval_logs_service_id ON service_approval_logs(service_id);
CREATE INDEX idx_service_approval_logs_admin_user_id ON service_approval_logs(admin_user_id);
CREATE INDEX idx_service_approval_logs_status ON service_approval_logs(new_status);

-- Disputes Indexes
CREATE INDEX idx_disputes_booking_id ON disputes(booking_id);
CREATE INDEX idx_disputes_reporter_id ON disputes(reporter_id);
CREATE INDEX idx_disputes_reported_id ON disputes(reported_id);
CREATE INDEX idx_disputes_status ON disputes(status);
CREATE INDEX idx_disputes_assigned_admin_id ON disputes(assigned_admin_id);
CREATE INDEX idx_disputes_priority ON disputes(priority);
CREATE INDEX idx_disputes_created_at ON disputes(created_at);

-- Payment Transactions Indexes
CREATE INDEX idx_payment_transactions_booking_id ON payment_transactions(booking_id);
CREATE INDEX idx_payment_transactions_payer_id ON payment_transactions(payer_id);
CREATE INDEX idx_payment_transactions_payee_id ON payment_transactions(payee_id);
CREATE INDEX idx_payment_transactions_type ON payment_transactions(transaction_type);
CREATE INDEX idx_payment_transactions_status ON payment_transactions(status);
CREATE INDEX idx_payment_transactions_created_at ON payment_transactions(created_at);

-- Payout Requests Indexes
CREATE INDEX idx_payout_requests_provider_id ON payout_requests(provider_id);
CREATE INDEX idx_payout_requests_status ON payout_requests(status);
CREATE INDEX idx_payout_requests_approved_by ON payout_requests(approved_by_admin_id);

-- Admin Activity Logs Indexes
CREATE INDEX idx_admin_activity_logs_admin_user_id ON admin_activity_logs(admin_user_id);
CREATE INDEX idx_admin_activity_logs_action ON admin_activity_logs(action);
CREATE INDEX idx_admin_activity_logs_entity ON admin_activity_logs(entity_type, entity_id);
CREATE INDEX idx_admin_activity_logs_created_at ON admin_activity_logs(created_at);

-- System Notifications Indexes
CREATE INDEX idx_system_notifications_type ON system_notifications(notification_type);
CREATE INDEX idx_system_notifications_audience ON system_notifications(target_audience);
CREATE INDEX idx_system_notifications_active ON system_notifications(is_active);
CREATE INDEX idx_system_notifications_scheduled ON system_notifications(scheduled_at);

-- Support Tickets Indexes
CREATE INDEX idx_support_tickets_ticket_number ON support_tickets(ticket_number);
CREATE INDEX idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX idx_support_tickets_status ON support_tickets(status);
CREATE INDEX idx_support_tickets_assigned_admin ON support_tickets(assigned_admin_id);
CREATE INDEX idx_support_tickets_category ON support_tickets(category);
CREATE INDEX idx_support_tickets_created_at ON support_tickets(created_at);

-- Analytics Indexes
CREATE INDEX idx_platform_analytics_metric_name ON platform_analytics(metric_name);
CREATE INDEX idx_platform_analytics_date ON platform_analytics(metric_date);
CREATE INDEX idx_platform_analytics_type ON platform_analytics(metric_type);

-- ========================================
-- TRIGGERS FOR AUTOMATIC TIMESTAMPS
-- ========================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply timestamp triggers to relevant tables
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_platform_settings_updated_at BEFORE UPDATE ON platform_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_commission_settings_updated_at BEFORE UPDATE ON commission_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_disputes_updated_at BEFORE UPDATE ON disputes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payment_transactions_updated_at BEFORE UPDATE ON payment_transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payout_requests_updated_at BEFORE UPDATE ON payout_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_system_notifications_updated_at BEFORE UPDATE ON system_notifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_email_templates_updated_at BEFORE UPDATE ON email_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_reports_updated_at BEFORE UPDATE ON user_reports FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON support_tickets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quick_reply_templates_updated_at BEFORE UPDATE ON quick_reply_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_system_maintenance_updated_at BEFORE UPDATE ON system_maintenance FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- SAMPLE DATA FOR DEVELOPMENT
-- ========================================

-- Insert default platform settings
INSERT INTO platform_settings (setting_key, setting_value, setting_type, description, is_public) VALUES
('platform_name', 'Service Khoj', 'string', 'Platform display name', true),
('default_commission_rate', '10.0', 'number', 'Default commission rate percentage', false),
('maintenance_mode', 'false', 'boolean', 'Enable/disable maintenance mode', true),
('max_file_upload_size', '5242880', 'number', 'Maximum file upload size in bytes (5MB)', false),
('supported_payment_methods', '["esewa", "khalti", "bank_transfer", "cash"]', 'json', 'Supported payment methods', true),
('platform_currency', 'NPR', 'string', 'Platform default currency', true),
('verification_required', 'true', 'boolean', 'Require provider verification', true),
('auto_approve_services', 'false', 'boolean', 'Automatically approve new services', false);

-- Insert default commission settings
INSERT INTO commission_settings (commission_type, commission_value, min_amount, is_active) VALUES
('percentage', 10.0, 100.0, true),
('percentage', 15.0, 1000.0, true),
('fixed', 50.0, NULL, false);

-- Insert default email templates
INSERT INTO email_templates (template_name, subject, html_content, text_content, variables, created_by_admin_id) VALUES
('user_welcome', 'Welcome to Service Khoj!', '<h1>Welcome {{user_name}}!</h1><p>Thank you for joining our platform.</p>', 'Welcome {{user_name}}! Thank you for joining our platform.', '{"user_name": "User display name"}', (SELECT id FROM admin_users LIMIT 1)),
('provider_approved', 'Your provider account has been approved', '<h1>Congratulations {{provider_name}}!</h1><p>Your provider account has been approved. You can now start offering services.</p>', 'Congratulations {{provider_name}}! Your provider account has been approved.', '{"provider_name": "Provider name"}', (SELECT id FROM admin_users LIMIT 1)),
('booking_confirmation', 'Booking Confirmation #{{booking_id}}', '<h1>Booking Confirmed</h1><p>Your booking #{{booking_id}} has been confirmed.</p>', 'Your booking #{{booking_id}} has been confirmed.', '{"booking_id": "Booking ID"}', (SELECT id FROM admin_users LIMIT 1));

-- Insert quick reply templates
INSERT INTO quick_reply_templates (title, content, category, created_by_admin_id) VALUES
('Welcome Greeting', 'Hello! Thank you for contacting Service Khoj support. How can I help you today?', 'greeting', (SELECT id FROM admin_users LIMIT 1)),
('Account Verification Help', 'To verify your account, please upload a clear photo of your citizenship certificate or national ID card.', 'verification', (SELECT id FROM admin_users LIMIT 1)),
('Payment Issue Response', 'I understand you''re having payment issues. Let me look into this for you. Can you provide your transaction ID?', 'payment', (SELECT id FROM admin_users LIMIT 1)),
('Thank You Closing', 'Thank you for contacting us. If you have any other questions, please don''t hesitate to reach out!', 'closing', (SELECT id FROM admin_users LIMIT 1));
