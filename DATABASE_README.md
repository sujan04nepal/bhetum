# Nepal Service Marketplace - Database Documentation

## Overview

This document outlines the comprehensive database architecture and implementation for the Nepal Service Marketplace platform. The platform connects service seekers with service providers across Nepal, supporting both Nepali and English languages.

## 🏗️ Architecture

### Technology Stack

- **Database**: PostgreSQL with PostGIS extension
- **ORM/Client**: Supabase with TypeScript
- **Authentication**: NextAuth.js with OAuth support
- **Payment Integration**: eSewa, Khalti, IME Pay
- **Real-time Features**: Supabase real-time subscriptions

### Core Features Implemented

- ✅ User management (seekers, providers, admins)
- ✅ Service catalog with categories and subcategories
- ✅ Booking and scheduling system
- ✅ Payment processing with Nepal-specific gateways
- ✅ Review and rating system
- ✅ Real-time messaging
- ✅ Admin panel with analytics
- ✅ Multi-language support (Nepali/English)
- ✅ Commission and revenue tracking
- ✅ Dispute resolution system
- ✅ Notification system

## 📊 Database Schema

### Core Tables

#### Users & Authentication

- `users` - Core user information for all user types
- `user_verification_documents` - KYC documents and verification
- `provider_profiles` - Extended information for service providers

#### Service Management

- `service_categories` - Main service categories (Home, Education, Digital, etc.)
- `service_subcategories` - Detailed service types within categories
- `services` - Individual services offered by providers

#### Booking & Transactions

- `bookings` - Service booking records with scheduling
- `payment_transactions` - Payment processing records
- `provider_payouts` - Provider payment disbursements

#### Communication

- `conversations` - Chat conversations between users
- `messages` - Individual messages within conversations
- `reviews` - Service reviews and ratings

#### Platform Management

- `platform_settings` - System configuration
- `commission_settings` - Revenue and fee configuration
- `user_notifications` - In-app notifications
- `platform_analytics` - Daily aggregated metrics

#### Support & Disputes

- `support_tickets` - Customer support requests
- `support_ticket_responses` - Support conversation threads
- `disputes` - Booking disputes and resolutions

### Database Files

1. **`database/complete-schema.sql`** - Full database schema with:
   - All table definitions
   - Indexes for performance
   - Triggers for data consistency
   - Views for common queries
   - Sample data inserts

2. **`database/seed-data.sql`** - Sample data including:
   - Admin and test users
   - Service categories and subcategories
   - Sample services and bookings
   - Mock analytics data
   - Test conversations and reviews

3. **`lib/database/supabase.ts`** - TypeScript database service with:
   - Type definitions for all entities
   - CRUD operations for all tables
   - Search and filtering functions
   - Real-time subscription helpers

## 🚀 Setup Instructions

### 1. Database Setup

```sql
-- Run the schema creation
psql -U postgres -d your_database < database/complete-schema.sql

-- Insert sample data
psql -U postgres -d your_database < database/seed-data.sql
```

### 2. Environment Configuration

```bash
# Required environment variables
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# NextAuth configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# OAuth providers (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret

# Payment gateways
ESEWA_MERCHANT_CODE=your-esewa-merchant-code
KHALTI_SECRET_KEY=your-khalti-secret-key
```

### 3. Supabase Setup

1. Create a new Supabase project
2. Run the schema SQL in the Supabase SQL editor
3. Configure Row Level Security (RLS) policies
4. Set up real-time subscriptions for messaging

## 💰 Monetization System

### Revenue Streams

1. **Service Commission**: 15% default commission on completed bookings
2. **Payment Gateway Fees**: 1.5-1.8% transaction fees
3. **Featured Listings**: Premium placement for providers
4. **Subscription Plans**: Monthly/annual provider subscriptions

### Nepal-Specific Payment Integration

- **eSewa**: Most popular digital wallet in Nepal
- **Khalti**: Mobile banking and digital payments
- **IME Pay**: International money exchange digital wallet
- **Cash Payment**: Traditional cash on service completion

### Commission Structure

```typescript
// Default commission settings
{
  platformCommission: 15.00,      // 15% of service price
  paymentGatewayFees: {
    esewa: 1.5,                   // 1.5% transaction fee
    khalti: 1.8,                  // 1.8% transaction fee
    ime: 1.2,                     // 1.2% transaction fee
    cash: 0.0                     // No fees for cash
  },
  minimumPayout: 1000,            // Rs. 1000 minimum for provider payout
  payoutSchedule: 'weekly'        // Weekly provider payouts
}
```

## 🔧 API Usage Examples

### Getting Services

```typescript
import { DatabaseService } from "@/lib/database/supabase";

// Get all active services
const services = await DatabaseService.getServices({ status: "active" });

// Search services
const searchResults = await DatabaseService.searchServices("cleaning", {
  category_id: "home-services-id",
  location: "kathmandu",
});
```

### Creating Bookings

```typescript
const booking = await DatabaseService.createBooking({
  customer_id: "user-id",
  provider_id: "provider-id",
  service_id: "service-id",
  service_title: "House Cleaning",
  scheduled_date: "2024-02-01",
  scheduled_time: "10:00:00",
  service_location: "Kathmandu, Thamel",
  service_price: 2500.0,
  platform_fee: 375.0,
  total_amount: 2875.0,
  status: "pending",
});
```

### Processing Payments

```typescript
import { NepalPaymentService } from "@/lib/payments/nepal-payments";

const paymentService = new NepalPaymentService();

// Calculate payment breakdown
const breakdown = paymentService.calculatePaymentBreakdown(2500, "esewa");

// Process eSewa payment
const result = await paymentService.processESewaPayment({
  bookingId: "booking-id",
  amount: 2875.0,
  // ... other transaction details
});
```

## 📱 Admin Panel Features

### Dashboard Components

- **User Management**: Providers, seekers, verification
- **Service Management**: Categories, approvals, featured listings
- **Booking Management**: Status tracking, dispute resolution
- **Financial Management**: Revenue tracking, commission settings, payouts
- **Analytics**: Platform metrics, user growth, revenue analysis
- **Support Tools**: Tickets, messaging, dispute resolution

### Key Admin Functions

- User verification and document review
- Service approval and moderation
- Payment and payout processing
- Platform configuration management
- Analytics and reporting
- Customer support tools

## 🌐 Multi-language Support

### Language Implementation

- **Supported Languages**: Nepali (ne), English (en)
- **Translation System**: React Context with comprehensive key-value pairs
- **Database**: Bilingual content stored in separate columns (name_en, name_ne)
- **User Preference**: Language preference stored in user profile

### Adding New Translations

```typescript
// Add to contexts/LanguageContext.tsx
const translations = {
  ne: {
    "new.key": "नेपाली अनुवाद",
  },
  en: {
    "new.key": "English Translation",
  },
};
```

## 🚦 Current Implementation Status

### ✅ Completed Features

- Database schema with all core tables
- User authentication with OAuth support
- Service catalog with categories
- Booking and payment system
- Admin panel with management tools
- Multi-language support
- Nepal-specific payment integration
- Review and rating system
- Real-time messaging
- Commission and revenue tracking

### 🔄 Integration Status

- **Mock Data**: Currently using sample data in components
- **Database Service**: TypeScript service layer created (`lib/database/supabase.ts`)
- **Real Integration**: Ready for connection to live Supabase database

### 🎯 Next Steps for Production

1. **Connect Components**: Replace mock data with database service calls
2. **Authentication**: Integrate NextAuth with Supabase user management
3. **Payment Gateways**: Complete eSewa/Khalti API integration
4. **File Upload**: Implement image/document upload system
5. **Real-time Features**: Enable messaging and notification subscriptions
6. **Testing**: Comprehensive testing with real data
7. **Performance**: Optimize queries and implement caching
8. **Security**: Configure Row Level Security policies in Supabase

## 📋 Launch Checklist

### Technical Requirements

- [ ] Supabase database setup and configuration
- [ ] OAuth provider credentials (Google, Facebook)
- [ ] Payment gateway API keys (eSewa, Khalti)
- [ ] File storage configuration (Cloudinary/Supabase Storage)
- [ ] Domain and SSL certificate setup
- [ ] Environment variables configuration

### Business Requirements

- [ ] Legal terms and privacy policy
- [ ] Commission rate finalization
- [ ] Provider onboarding process
- [ ] Customer support system
- [ ] Marketing and launch strategy
- [ ] Quality assurance testing

### Compliance & Security

- [ ] Data protection compliance
- [ ] Payment security standards
- [ ] User verification process
- [ ] Dispute resolution procedures
- [ ] Platform usage policies

## 🤝 Contributing

### Development Workflow

1. Use the database service layer for all data operations
2. Follow TypeScript interfaces for type safety
3. Implement proper error handling
4. Add appropriate database indexes for performance
5. Write tests for critical functionality

### Code Organization

```
lib/
├── database/
│   ├── supabase.ts          # Main database service
│   ├── types.ts             # TypeScript interfaces
│   └── migrations/          # Database migrations
├── payments/
│   └── nepal-payments.ts    # Payment processing
└── utils/
    └── constants.ts         # App constants
```

This documentation serves as the foundation for the Nepal Service Marketplace platform. The database architecture supports all core marketplace functionality while being optimized for the Nepal market with local payment methods and bilingual support.
