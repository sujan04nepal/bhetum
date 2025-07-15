# 🗄️ Database Schema - Nepal Service Marketplace

This directory contains the complete database schema for the Nepal Service Marketplace admin panel and analytics system.

## 📋 Schema Files

### 1. `admin-schema.sql`

Complete admin panel database schema with all tables needed for platform management.

### 2. `analytics-schema.sql`

Comprehensive analytics and reporting database schema for business intelligence.

## 🗃️ Admin Panel Tables

### **User Management**

- `admin_users` - Admin user accounts with role-based permissions
- `admin_sessions` - Admin login sessions and security tracking
- `user_verification_logs` - User document verification tracking
- `user_reports` - User reports and moderation

### **Platform Configuration**

- `platform_settings` - Global platform configuration
- `commission_settings` - Commission rates by category/service
- `email_templates` - Email template management
- `quick_reply_templates` - Support team quick replies

### **Service Management**

- `service_approval_logs` - Service approval/rejection tracking
- `review_moderation` - Review content moderation

### **Financial Management**

- `payment_transactions` - Enhanced payment tracking
- `payout_requests` - Provider payout management
- `revenue_analytics` - Revenue tracking and reporting

### **Dispute & Support**

- `disputes` - Customer dispute management
- `dispute_actions` - Dispute resolution tracking
- `support_tickets` - Customer support ticket system
- `support_ticket_responses` - Ticket conversation history

### **System Management**

- `admin_activity_logs` - All admin actions for auditing
- `system_notifications` - Platform-wide notifications
- `system_maintenance` - Maintenance scheduling

## 📊 Analytics Tables

### **User Analytics**

- `user_analytics` - User behavior tracking
- `user_retention_analytics` - Cohort analysis and retention metrics

### **Performance Analytics**

- `service_performance_analytics` - Individual service metrics
- `provider_performance_analytics` - Provider performance tracking
- `category_performance_analytics` - Category-wise performance

### **Platform Analytics**

- `platform_daily_analytics` - Daily platform metrics summary
- `search_analytics` - Search behavior and conversion tracking
- `conversion_funnel_analytics` - User journey conversion metrics

### **Financial Analytics**

- `revenue_analytics` - Detailed revenue breakdown
- `geographic_analytics` - Location-based performance metrics

## 🔗 Key Features

### **Security & Auditing**

- Complete admin action logging
- Session management with IP tracking
- Role-based access control
- Document verification workflow

### **Financial Management**

- Multi-level commission structure
- Automated payout processing
- Revenue tracking and analytics
- Refund and dispute management

### **Analytics & Reporting**

- Real-time performance metrics
- User behavior tracking
- Retention and cohort analysis
- Geographic performance analysis
- Conversion funnel tracking

### **Support & Moderation**

- Comprehensive ticket system
- Review content moderation
- Dispute resolution workflow
- Quick reply templates

## 🚀 Setup Instructions

### 1. Database Setup

```sql
-- Create the database
CREATE DATABASE nepal_service_marketplace;

-- Connect to the database
\c nepal_service_marketplace;

-- Run the admin schema
\i admin-schema.sql

-- Run the analytics schema
\i analytics-schema.sql
```

### 2. Create Initial Admin User

```sql
-- Insert first admin user (update password hash accordingly)
INSERT INTO admin_users (username, email, password_hash, full_name, role, permissions)
VALUES (
    'admin',
    'admin@servicekhoj.com',
    '$2b$12$hash_here', -- Use proper password hashing
    'System Administrator',
    'super_admin',
    '{"all": true}'
);
```

### 3. Configure Platform Settings

```sql
-- Basic platform configuration is included in the schema
-- Customize as needed for your specific requirements
```

## 📈 Performance Optimization

### **Indexes**

- All tables include optimized indexes for common queries
- Composite indexes for complex filtering operations
- Full-text search indexes for content searching

### **Views**

- Pre-built views for common analytics queries
- Optimized aggregation views for reporting
- Monthly and daily summary views

### **Triggers**

- Automatic timestamp updates
- Data consistency enforcement
- Audit trail maintenance

## 🔧 Data Maintenance

### **Analytics Data Aggregation**

```sql
-- Run daily analytics aggregation
-- (This would typically be automated via cron jobs)

-- Example: Update daily platform analytics
INSERT INTO platform_daily_analytics (date, total_users, new_users, ...)
SELECT CURRENT_DATE, COUNT(*), COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE), ...
FROM users;
```

### **Cleanup Old Data**

```sql
-- Clean up old session data (older than 30 days)
DELETE FROM admin_sessions WHERE expires_at < NOW() - INTERVAL '30 days';

-- Archive old analytics data (older than 2 years)
-- Move to archive tables or export to data warehouse
```

## 🛡️ Security Considerations

### **Admin Access**

- Use strong password policies
- Implement 2FA for admin accounts
- Regular session cleanup
- IP whitelisting for admin access

### **Data Protection**

- Encrypt sensitive data at rest
- Use SSL/TLS for all connections
- Regular database backups
- Access logging and monitoring

### **Audit Trail**

- All admin actions are logged
- User data changes are tracked
- Financial transactions are immutable
- Regular audit reviews

## 📊 Sample Queries

### **Platform Overview**

```sql
-- Get platform metrics for last 30 days
SELECT
    date,
    total_users,
    new_users,
    total_revenue,
    commission_earned
FROM platform_daily_analytics
WHERE date >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY date DESC;
```

### **Top Performing Providers**

```sql
-- Get top providers by revenue this month
SELECT
    u.full_name,
    SUM(p.total_revenue) as monthly_revenue,
    AVG(p.average_rating) as avg_rating,
    SUM(p.bookings_completed) as completed_bookings
FROM provider_performance_analytics p
JOIN users u ON p.provider_id = u.id
WHERE p.date >= DATE_TRUNC('month', CURRENT_DATE)
GROUP BY u.id, u.full_name
ORDER BY monthly_revenue DESC
LIMIT 10;
```

### **Category Performance**

```sql
-- Get category performance comparison
SELECT
    sc.name as category,
    SUM(c.total_revenue) as revenue,
    SUM(c.total_bookings) as bookings,
    AVG(c.conversion_rate) as avg_conversion_rate
FROM category_performance_analytics c
JOIN service_categories sc ON c.category_id = sc.id
WHERE c.date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY sc.id, sc.name
ORDER BY revenue DESC;
```

## 🔄 Migration Strategy

### **Schema Updates**

1. Always backup before migrations
2. Test migrations on staging environment
3. Use transaction-wrapped migrations
4. Plan for rollback scenarios

### **Data Migration**

1. Export existing data
2. Transform to new schema format
3. Validate data integrity
4. Import with proper constraints

## 📝 Notes

- All monetary values use DECIMAL(10,2) for precision
- Timestamps include timezone information
- UUIDs are used for all primary keys
- Foreign key constraints ensure data integrity
- Indexes are optimized for common query patterns

## 🤝 Contributing

When adding new tables or modifying existing ones:

1. Follow the established naming conventions
2. Include proper indexes for performance
3. Add appropriate foreign key constraints
4. Update this documentation
5. Include sample data for development

## 📞 Support

For questions about the database schema:

- Check the inline SQL comments
- Review the table relationships
- Consult the analytics views for reporting patterns
- Follow PostgreSQL best practices
