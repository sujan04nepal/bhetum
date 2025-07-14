# सेवा खोज (ServiceConnect) - Nepal Service Marketplace

🇳🇵 **Nepal's #1 Bilingual Service Marketplace Platform**

## Overview

ServiceConnect (सेवा खोज) is a comprehensive two-sided marketplace platform built specifically for Nepal, connecting service seekers with trusted service providers across all 77 districts. The platform supports both Nepali and English languages and includes Nepal-specific features like local payment methods (eSewa, Khalti), geographical divisions, and cultural considerations.

## 🌟 Key Features

### **Bilingual Support**

- **Complete Nepali + English** interface
- **400+ translations** covering all components
- **Cultural localization** with Nepal-specific content
- **Language persistence** across sessions

### **Nepal-Focused Design**

- **All 77 districts** and major cities coverage
- **Nepal provinces** and administrative divisions
- **Local payment methods**: eSewa, Khalti, Cash, Online
- **NPR currency** throughout the platform
- **Nepal flag** and cultural elements

### **Comprehensive Service Categories**

1. **Digital & Online Services** 💻 (15 subcategories)
2. **Trade & Skilled Labor** 🔧 (12 subcategories)
3. **Automotive Services** 🚗 (6 subcategories)
4. **Creative & Artisanal** 🎨 (10 subcategories)
5. **Online Business & Passive Income** 💰 (8 subcategories)
6. **Teaching & Coaching** 🎓 (9 subcategories)
7. **Personal Care & Lifestyle** 💅 (8 subcategories)
8. **Events & Hospitality** 🎉 (7 subcategories)
9. **Safety & Tech Setup** 🔒 (5 subcategories)
10. **Niche & Fun Services** 🎲 (7 subcategories)

### **User-Centric Features**

- **Dual user types**: Service Seekers & Service Providers
- **Professional dashboards** for both user types
- **Advanced booking system** with Nepal locations
- **Real-time messaging** between users
- **Review and rating system**
- **Multi-step registration** with document verification

### **Technical Excellence**

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **TailwindCSS** with custom animations
- **Supabase** backend with comprehensive database
- **Row Level Security** (RLS) policies
- **Responsive design** for all devices

## 🛠 Tech Stack

### **Frontend**

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **State Management**: React Context

### **Backend**

- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **Real-time**: Supabase Realtime

### **Deployment**

- **Frontend**: Netlify
- **Database**: Supabase Cloud
- **Domain**: Custom domain ready

## 🏗 Project Structure

```
./
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboards
│   ├── provider/          # Provider-specific pages
│   ├── about/             # Information pages
│   ├── contact/
│   ├── help/
│   ├── terms/
│   ├── privacy/
│   ├── safety/
│   ├── careers/
│   ├── blog/
│   ├── press/
│   ├── support/
│   └── services/
├── components/            # Reusable React components
│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   └── ui/               # UI components
├── contexts/             # React contexts
├── lib/                  # Utility functions and configs
├── types/                # TypeScript type definitions
├── supabase/             # Database schema and migrations
└── public/               # Static assets
```

## 🎨 Design System

### **Color Palette**

- **Primary**: Blue tones for trust and reliability
- **Secondary**: Orange for energy and action
- **Success**: Green for completed actions
- **Warning**: Yellow for attention
- **Error**: Red for alerts

### **Typography**

- **Headings**: Bold, clear hierarchy
- **Body**: Readable, accessible font sizes
- **Nepali text**: Proper Unicode support

### **Components**

- **Cards**: Glass-morphism design
- **Buttons**: Multiple variants (primary, secondary, outline, ghost)
- **Inputs**: Enhanced with icons and validation
- **Navigation**: Sticky header with mobile support

## 📊 Database Schema

### **Core Tables**

- **users**: User profiles and authentication
- **service_providers**: Provider-specific information
- **service_categories**: Bilingual service categories
- **provider_services**: Services offered by providers
- **bookings**: Service booking management
- **reviews**: Rating and review system
- **messages**: Real-time messaging
- **notifications**: User notifications

### **Features**

- **Row Level Security** for data protection
- **Triggers** for automatic calculations
- **Views** for complex queries
- **Functions** for advanced search

## 🚀 Getting Started

### **Prerequisites**

- Node.js 18+ and npm
- Supabase account
- Git

### **Installation**

1. **Clone the repository**

```bash
git clone <repository-url>
cd nepal-marketplace
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Setup**

```bash
cp .env.local.example .env.local
# Add your Supabase credentials
```

4. **Database Setup**

```bash
# Run the schema in your Supabase SQL editor
# File: ./supabase/schema.sql
```

5. **Start development server**

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

### **Environment Variables**

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 📱 Pages & Features

### **Public Pages**

- **Homepage**: Service search, categories, featured providers
- **Services**: Advanced filtering and search
- **About**: Company information
- **Contact**: Contact form and information
- **Help**: FAQ and support resources
- **How It Works**: Platform explanation
- **Safety**: Safety guidelines
- **Terms**: Terms of service
- **Privacy**: Privacy policy

### **Authentication**

- **Sign In**: Email/password with social login options
- **Sign Up**: Role-based registration (Seeker/Provider)
- **Provider Registration**: 4-step verification process

### **User Dashboards**

- **Seeker Dashboard**: Booking management, provider search
- **Provider Dashboard**: Analytics, job management, earnings

### **Provider Features**

- **Profile Management**: Complete profile setup
- **Service Management**: Add/edit services
- **Booking Management**: Accept/decline bookings
- **Earnings Tracking**: Payment and earnings overview
- **Support Resources**: Guides and help documents

## 🌐 Deployment

### **Frontend (Netlify)**

1. Connect GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables
5. Deploy

### **Database (Supabase)**

1. Create new Supabase project
2. Run the schema from `./supabase/schema.sql`
3. Configure RLS policies
4. Add environment variables to frontend

## 🔒 Security Features

- **Row Level Security** on all tables
- **Authentication** with Supabase Auth
- **Input validation** on all forms
- **HTTPS** enforced
- **Environment variables** for sensitive data

## 📈 Performance Optimizations

- **Next.js 14** with App Router for optimal performance
- **Image optimization** with Next.js Image component
- **Code splitting** for reduced bundle size
- **Lazy loading** for better UX
- **Caching strategies** implemented

## 🌍 Internationalization

- **Two languages**: Nepali (ne) and English (en)
- **400+ translation keys** covering all components
- **Cultural adaptation** for Nepal market
- **Language persistence** in localStorage
- **Right-to-left** text support where needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Nepal Government** for geographical data
- **Lucide React** for beautiful icons
- **TailwindCSS** for excellent styling framework
- **Supabase** for powerful backend infrastructure
- **Next.js** team for the amazing framework

---

**सेवा खोज** - Connecting Nepal, One Service at a Time 🇳🇵
