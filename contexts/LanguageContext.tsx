"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type Language = "ne" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// Comprehensive translations
const translations = {
  ne: {
    // Header & Navigation
    "nav.home": "मुख्य पृष्ठ",
    "nav.services": "सेवा खोज्नुहोस्",
    "nav.becomeProvider": "सेवाप्रदायक बन्नुहोस्",
    "nav.howItWorks": "कसरी काम गर्छ",
    "nav.signin": "लग इन",
    "nav.signup": "सुरु गर्नुहोस्",
    "nav.dashboard": "ड्यासबोर्ड",
    "nav.messages": "सन्देशहरू",
    "nav.bookings": "बुकिङहरू",
    "nav.profile": "प्रोफाइल",

    // Homepage
    "home.title": "नेपालको नम्बर १",
    "home.subtitle": "सेवा खोज्ने प्लेटफर्म",
    "home.description":
      "घर सरसफाइदेखि ट्यूशन, डिजिटल सेवादेखि रचनात्मक कामसम्म - विश्वसनीय सेवा प्रदायकहरू फेला पार्नुहोस्!",
    "home.searchPlaceholder": "कुन सेवा चाहिन्छ?",
    "home.locationPlaceholder": "तपाईंको स्थान चयन गर्नुहोस्",
    "home.searchButton": "खोज्नुहोस्",
    "home.categories": "सेवाको श्रेणीहरू",
    "home.categoriesDesc":
      "डिजिटल सेवादेखि घरेलु काम, शिक्षादेखि व्यापारिक ���ेवासम्म!",
    "home.topProviders": "शीर्ष सेवा प्रदायकहरू",
    "home.topProvidersDesc":
      "नेपालका उत्कृष्ट सेवा प्रदायकहरूसँग भेट गर्नुहोस्!",
    "home.viewAll": "सबै हेर्नुहोस्",
    "home.viewProfile": "प्रोफाइल हेर्नुहोस्",
    "home.bookNow": "बुक गर्नुहोस्",
    "home.features": "हाम्रा विशेषताहरू",
    "home.featuresDesc": "विश्वास, सुविधा र उत्कृष्ट अनुभवका लागि निर्मित!",
    "home.verifiedProviders": "प्रमाणित सेवाप्रदायक",
    "home.verifiedDesc":
      "सबै सेवा प्रदायकहरू पूर्ण रूपमा जाँच गरिएका र प्रमाणित छन्।",
    "home.instantBooking": "तुरुन्त बुकिङ",
    "home.instantDesc":
      "चाहेको बेलामा तुरुन्त सेवा बुक गर्नुहोस्। सजिलो र छिटो!",
    "home.qualityGuarantee": "गुणस्तर ग्यारेन्टी",
    "home.qualityDesc": "१००% सन्तुष्टि ग्यारेन्टी र उत्कृष्ट ग्राहक सेवा।",
    "home.readyTitle": "सुरु गर्न तयार हुनुहुन्छ?",
    "home.readyDesc": "हजारौं खुसी ग्राहक र सेवा प्रदायकहरूसँग जोडिनुहोस्!",
    "home.findServices": "सेवा खोज्नुहोस्",
    "home.becomeProvider": "सेवाप्रदायक बन्नुहोस्",

    // Stats
    "stats.providers": "सक्रिय सेवाप्रदायक",
    "stats.completed": "सम्पन्न सेवा",
    "stats.customers": "खुसी ग्राहक",
    "stats.cities": "शहरहरू",

    // Common
    "common.services": "सेवाहरू",
    "common.more": "थप",
    "common.loading": "लोड हुँदैछ...",
    "common.error": "त्रुटि",
    "common.success": "सफल",
    "common.cancel": "रद्द गर्नुहोस्",
    "common.save": "सेव गर्नुहोस्",
    "common.edit": "सम्पादन गर्नुहोस्",
    "common.delete": "मेटाउनुहोस्",
    "common.confirm": "पुष्टि गर्नुहोस्",
    "common.back": "पछाडि जानुहोस्",
    "common.next": "अर्को चरण",
    "common.submit": "पेश गर्नुहोस्",
    "common.phone": "फोन नम्बर",
    "common.email": "इमेल ठेगाना",
    "common.name": "नाम",
    "common.address": "ठेगाना",
    "common.city": "शहर",
    "common.area": "क्षेत्र",
    "common.date": "मिति",
    "common.time": "समय",
    "common.price": "मूल्य",
    "common.rating": "रेटिङ",
    "common.reviews": "समीक्षाहरू",

    // Footer
    "footer.customers": "ग्राहकहरूका लागि",
    "footer.providers": "सेवाप्रदायकहरूका लागि",
    "footer.company": "कम्पनी",
    "footer.support": "सहयोग",
    "footer.findServices": "सेवा खोज्नुहोस्",
    "footer.howItWorks": "कसरी काम गर्छ",
    "footer.safety": "सुरक्षा",
    "footer.customerSupport": "ग्राहक सेवा",
    "footer.becomeProvider": "सेवाप्रदायक बन्नुहोस्",
    "footer.providerResources": "सेवाप्रदायक स्रोतहरू",
    "footer.earnings": "��म्दानी",
    "footer.providerSupport": "सेवाप्रदायक सहयोग",
    "footer.about": "हाम्रो बारेमा",
    "footer.careers": "करियर",
    "footer.press": "प्रेस",
    "footer.blog": "ब्लग",
    "footer.helpCenter": "सहायता केन्द्र",
    "footer.contact": "सम्पर्क गर्नुहोस्",
    "footer.terms": "सेवाका सर्तहरू",
    "footer.privacy": "गोपनीयता नीति",
    "footer.description": "मानिसहरूलाई विश्वसनीय सेवा प्रदायकहरूसँग जोड्दै।",
    "footer.copyright": "© 2024 सेवा खोज। सबै अधिकार सुरक्षित।",

    // Auth Pages
    "auth.signin.title": "सेवा खोजमा लगइन गर��नुहोस्",
    "auth.signin.subtitle": "आफ्नो खातामा पहुँच गर्नुहोस्",
    "auth.signin.email": "इमेल ठेगाना",
    "auth.signin.password": "पासवर्ड",
    "auth.signin.rememberMe": "मलाई सम्झनुहोस्",
    "auth.signin.forgotPassword": "पासवर्ड बिर्सनुभयो?",
    "auth.signin.signInButton": "लगइन गर्नुहोस्",
    "auth.signin.noAccount": "खाता छैन?",
    "auth.signin.signUp": "यहाँ दर्ता गर्नुहोस्",
    "auth.signin.orContinueWith": "वा यसबाट जारी राख्नुहोस्",
    "auth.signin.google": "Google बाट लगइन",
    "auth.signin.facebook": "Facebook बाट लगइन",
    "auth.signin.backToHome": "मुख्य पृष्ठमा फर्किनुहोस्",

    "auth.signup.title": "सेवा खोजमा स्वागत छ!",
    "auth.signup.subtitle": "आफ्नो खाता सिर्जन��� गर्नुहोस्",
    "auth.signup.chooseRole": "तपाईं के गर्न चाहनुहुन्छ?",
    "auth.signup.findServices": "सेवा खोज्न चाहन्छु",
    "auth.signup.provideServices": "सेवा प्रदान गर्न चाहन्छु",
    "auth.signup.roleSeeker": "सेवा खोज्ने",
    "auth.signup.roleProvider": "सेवा प्रदायक",
    "auth.signup.seekerDesc":
      "घर सरसफाइ, ट्यूशन, डिजिटल सेवा र अन्य आवश्यकताहरूका लागि विश्वसनीय सेवा प्रदायकहरू फेला पार्नुहोस्।",
    "auth.signup.providerDesc":
      "आफ्ना सीप र सेवाहरू साझा गरेर आम्दानी गर्नुहोस्। हजारौं ग्राहकहरूसँग जोडिनुहोस्।",
    "auth.signup.continue": "जारी राख्नुहोस्",
    "auth.signup.fullName": "पूरा नाम",
    "auth.signup.confirmPassword": "पासवर्ड पुष्टि गर्नुहोस्",
    "auth.signup.agreeTerms":
      "मैले सेवाका सर्तहरू र गोपनीयता नीति पढेको छु र सहमत छु।",
    "auth.signup.createAccount": "खाता सिर्जना गर्नुहोस्",
    "auth.signup.alreadyHaveAccount": "पहिले नै खाता छ?",
    "auth.signup.signIn": "लगइन गर्नुहोस्",

    // Dashboard
    "dashboard.provider.title": "सेवा प्रदायक ड्यासबोर्ड",
    "dashboard.provider.analytics": "विश्लेषण",
    "dashboard.provider.jobs": "काम",
    "dashboard.provider.services": "सेवाहरू",
    "dashboard.provider.applications": "आवेदनहरू",
    "dashboard.provider.overview": "सिंहावलोकन",
    "dashboard.provider.totalEarnings": "कुल आम्दानी",
    "dashboard.provider.completedJobs": "सम्पन्न कामहरू",
    "dashboard.provider.averageRating": "औसत रेटिङ",
    "dashboard.provider.responseRate": "प्रतिक्रिया दर",
    "dashboard.provider.viewDetails": "विवरण हेर्नुहोस्",
    "dashboard.provider.recentActivity": "हालका गतिविधिहरू",
    "dashboard.provider.pendingApplications": "बाँकी आवेदनहरू",
    "dashboard.provider.activeJobs": "सक्रिय कामहरू",
    "dashboard.provider.earnings": "आम्दानी",
    "dashboard.provider.monthlyEarnings": "मासिक आम्दानी",
    "dashboard.provider.weeklyEarnings": "साप्ताहिक आम्दानी",
    "dashboard.provider.findJobs": "काम खोज्नुहोस्",
    "dashboard.provider.manageServices": "सेवा व्यवस्थापन",
    "dashboard.provider.viewProfile": "प्रोफाइल हेर्नुहोस्",
    "dashboard.provider.applyNow": "अहिले आवेदन दिनुहोस्",

    "dashboard.seeker.title": "सेवा खोज्ने ड्यासबोर्ड",
    "dashboard.seeker.home": "गृह",
    "dashboard.seeker.bookings": "बुकिङहरू",
    "dashboard.seeker.messages": "सन्देशहरू",
    "dashboard.seeker.settings": "सेटिङहरू",
    "dashboard.seeker.welcome": "स्वागत छ",
    "dashboard.seeker.searchServices": "सेवा खोज्नुहोस्",
    "dashboard.seeker.recentBookings": "हालका बुकिङहरू",
    "dashboard.seeker.topProviders": "शीर्��� प्रदायकहरू",
    "dashboard.seeker.quickStats": "द्रुत तथ्याङ्क",
    "dashboard.seeker.totalBookings": "कुल बुकिङहरू",
    "dashboard.seeker.completedServices": "सम्पन्न सेवाहरू",
    "dashboard.seeker.savedProviders": "सुरक्षित प्रदायकहरू",
    "dashboard.seeker.unreadMessages": "नपढिएका सन्देशहरू",
    "dashboard.seeker.bookService": "सेवा बुक गर्नुहोस्",
    "dashboard.seeker.browseCategories": "श्रेणीहरू ब्राउज गर्नुहोस्",
    "dashboard.seeker.viewAllBookings": "सबै बुकिङहरू हेर्नुहोस्",
    "dashboard.seeker.contactProvider": "प्रदायकलाई सम्पर्क गर्नुहोस्",

    // Forms
    "form.booking.title": "सेवा बुक गर्नुहोस्",
    "form.booking.serviceDetails": "सेवाको विवरण",
    "form.booking.provider": "सेवा प्रदायक",
    "form.booking.serviceType": "सेवाको प्रकार",
    "form.booking.dateTime": "मिति र सम��",
    "form.booking.selectDate": "मिति चयन गर्नुहोस्",
    "form.booking.selectTime": "समय चयन गर्नुहोस्",
    "form.booking.duration": "अवधि",
    "form.booking.contactInfo": "सम्पर्क जानकारी",
    "form.booking.location": "स्थान",
    "form.booking.province": "प्रान्त",
    "form.booking.district": "जिल्ला",
    "form.booking.municipality": "नगरपालिका",
    "form.booking.ward": "वडा",
    "form.booking.streetAddress": "सडक ठेगाना",
    "form.booking.specialInstructions": "विशेष निर्देशनहरू",
    "form.booking.paymentMethod": "भुक्तानीको तरिका",
    "form.booking.cash": "नगद",
    "form.booking.esewa": "eSewa",
    "form.booking.khalti": "Khalti",
    "form.booking.online": "अनलाइन",
    "form.booking.serviceCost": "सेवाको लागत",
    "form.booking.baseRate": "आधारभूत दर",
    "form.booking.platformFee": "प्लेटफर्म शुल्क",
    "form.booking.total": "जम्मा",
    "form.booking.confirmBooking": "बुकिङ पुष्टि गर्नुहोस्",
    "form.booking.termsAgree": "मैले सेवाका सर्तहरूमा सहमति जनाएको छु���",

    "form.profile.title": "प्रोफाइल अपडेट गर्नुहोस्",
    "form.profile.basicInfo": "आधारभूत जानकारी",
    "form.profile.businessName": "व्यापारिक नाम",
    "form.profile.bio": "बायो",
    "form.profile.services": "सेवाहरू",
    "form.profile.selectCategories": "श्रेणीहरू चयन गर्नुहोस्",
    "form.profile.skills": "सीपहरू",
    "form.profile.addSkill": "सीप थप्नुहोस्",
    "form.profile.experience": "अनुभव",
    "form.profile.yearsExperience": "वर्षको अनुभव",
    "form.profile.portfolio": "पोर्टफोलियो",
    "form.profile.addPortfolio": "पोर्टफोलियो थप्नुहोस्",
    "form.profile.availability": "उपलब्धता",
    "form.profile.workingDays": "काम गर्ने दिनहरू",
    "form.profile.workingHours": "काम गर्ने समय",
    "form.profile.updateProfile": "प्रोफाइल अपडेट गर्नुहोस्",

    // Find Services Page
    "findServices.title": "सेवा ख��ज्नुहोस्",
    "findServices.searchPlaceholder": "कुन सेवा चाहिन्छ?",
    "findServices.allLocations": "सबै स्थानहरू",
    "findServices.allCategories": "सबै श्रेणीहरू",
    "findServices.search": "खोज्नुहोस्",
    "findServices.results": "नतिजाहरू",
    "findServices.searchingFor": "खोजिएको",
    "findServices.in": "मा",
    "findServices.sortByRating": "रेटिङअनुसार मिलाउनुहोस्",
    "findServices.sortByPrice": "मूल्यअनुसार मिलाउनुहोस्",
    "findServices.sortByReviews": "समीक्षाअनुसार मिलाउनुहोस्",
    "findServices.noResults": "कुनै नतिजा फेला परेन",
    "findServices.noResultsDesc": "फरक शब्दहरू प्रयोग गरेर खोजी गर्नुहोस्",
    "findServices.clearFilters": "फिल्टर सफा गर्नुहोस्",

    // Services Page
    "services.title": "सेवाहरू खोज्नुहोस्",
    "services.subtitle":
      "तपाईंको आवश��यकता अनुसार उत्कृष्ट सेवा प्रदायकहरू फेला पार्नुहोस्",
    "services.filterBy": "फिल्टर गर्नुहोस्",
    "services.category": "श्रेणी",
    "services.location": "स्थान",
    "services.priceRange": "मूल्य दायरा",
    "services.rating": "रेटिङ",
    "services.availability": "उपलब्धता",
    "services.sortBy": "क्रमबद्ध गर्नुहोस्",
    "services.relevance": "प्रासंगिकता",
    "services.priceHighToLow": "मूल्य (उच्च देखि कम)",
    "services.priceLowToHigh": "मूल्य (कम देखि उच्च)",
    "services.ratingHighToLow": "रेटिङ (उच्च देखि कम)",
    "services.newest": "नयाँ",
    "services.resultsFound": "परिणामहरू फेला परे",
    "services.noResults": "कुनै परिणाम फेला परेन",
    "services.tryDifferentFilters": "फरक फिल्टरहरू प्रयोग गर्नुहोस्",
    "services.clearFilters": "फिल्टरहरू ��टाउनुहोस्",
    "services.showMore": "थप देखाउनुहोस्",

    // Status
    "status.pending": "बाँकी",
    "status.confirmed": "पुष्टि भएको",
    "status.inProgress": "प्रगतिमा",
    "status.completed": "सम्पन्न",
    "status.cancelled": "रद्द भएको",
    "status.active": "सक्रिय",
    "status.inactive": "निष्क्रिय",
    "status.available": "उपलब्ध",
    "status.unavailable": "अनुपलब्ध",

    // Time and Date
    "time.morning": "बिहान",
    "time.afternoon": "दिउँसो",
    "time.evening": "साँझ",
    "time.night": "रात",
    "time.today": "आज",
    "time.tomorrow": "भोलि",
    "time.yesterday": "हिजो",
    "time.thisWeek": "यो हप्ता",
    "time.lastWeek": "गत हप्ता",
    "time.thisMonth": "यो महिना",
    "time.lastMonth": "गत महिना",

    // Days of Week
    "day.sunday": "आइतबार",
    "day.monday": "सोमबार",
    "day.tuesday": "मंगलबार",
    "day.wednesday": "बुधबा���",
    "day.thursday": "बिहिबार",
    "day.friday": "शुक्रबार",
    "day.saturday": "शनिबार",
  },
  en: {
    // Header & Navigation
    "nav.home": "Home",
    "nav.services": "Find Services",
    "nav.becomeProvider": "Become a Provider",
    "nav.howItWorks": "How it Works",
    "nav.signin": "Sign In",
    "nav.signup": "Get Started",
    "nav.dashboard": "Dashboard",
    "nav.messages": "Messages",
    "nav.bookings": "Bookings",
    "nav.profile": "Profile",

    // Homepage
    "home.title": "Nepal's #1",
    "home.subtitle": "Service Marketplace",
    "home.description":
      "From home cleaning to tutoring, digital services to creative work - find trusted professionals for every need!",
    "home.searchPlaceholder": "What service do you need?",
    "home.locationPlaceholder": "Select your location",
    "home.searchButton": "Search",
    "home.categories": "Service Categories",
    "home.categoriesDesc":
      "From digital services to home tasks, education to business services!",
    "home.topProviders": "Top-Rated Providers",
    "home.topProvidersDesc": "Meet Nepal's excellent service providers!",
    "home.viewAll": "View All",
    "home.viewProfile": "View Profile",
    "home.bookNow": "Book Now",
    "home.features": "Our Features",
    "home.featuresDesc":
      "Built for trust, convenience and excellent experience!",
    "home.verifiedProviders": "Verified Providers",
    "home.verifiedDesc":
      "All service providers are thoroughly checked and verified.",
    "home.instantBooking": "Instant Booking",
    "home.instantDesc":
      "Book services instantly whenever you need. Easy and fast!",
    "home.qualityGuarantee": "Quality Guarantee",
    "home.qualityDesc":
      "100% satisfaction guarantee and excellent customer service.",
    "home.readyTitle": "Ready to Get Started?",
    "home.readyDesc":
      "Join thousands of happy customers and service providers!",
    "home.findServices": "Find Services",
    "home.becomeProvider": "Become a Provider",

    // Stats
    "stats.providers": "Active Providers",
    "stats.completed": "Services Completed",
    "stats.customers": "Happy Customers",
    "stats.cities": "Cities",

    // Common
    "common.services": "Services",
    "common.more": "More",
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.confirm": "Confirm",
    "common.back": "Back",
    "common.next": "Next",
    "common.submit": "Submit",
    "common.phone": "Phone Number",
    "common.email": "Email Address",
    "common.name": "Name",
    "common.address": "Address",
    "common.city": "City",
    "common.area": "Area",
    "common.date": "Date",
    "common.time": "Time",
    "common.price": "Price",
    "common.rating": "Rating",
    "common.reviews": "Reviews",

    // Footer
    "footer.customers": "For Customers",
    "footer.providers": "For Providers",
    "footer.company": "Company",
    "footer.support": "Support",
    "footer.findServices": "Find Services",
    "footer.howItWorks": "How it Works",
    "footer.safety": "Safety",
    "footer.customerSupport": "Customer Support",
    "footer.becomeProvider": "Become a Provider",
    "footer.providerResources": "Provider Resources",
    "footer.earnings": "Earnings",
    "footer.providerSupport": "Provider Support",
    "footer.about": "About Us",
    "footer.careers": "Careers",
    "footer.press": "Press",
    "footer.blog": "Blog",
    "footer.helpCenter": "Help Center",
    "footer.contact": "Contact Us",
    "footer.terms": "Terms of Service",
    "footer.privacy": "Privacy Policy",
    "footer.description": "Connecting people with trusted service providers.",
    "footer.copyright": "© 2024 ServiceConnect. All rights reserved.",

    // Auth Pages
    "auth.signin.title": "Sign In to ServiceConnect",
    "auth.signin.subtitle": "Access your account",
    "auth.signin.email": "Email Address",
    "auth.signin.password": "Password",
    "auth.signin.rememberMe": "Remember me",
    "auth.signin.forgotPassword": "Forgot password?",
    "auth.signin.signInButton": "Sign In",
    "auth.signin.noAccount": "Don't have an account?",
    "auth.signin.signUp": "Sign up here",
    "auth.signin.orContinueWith": "Or continue with",
    "auth.signin.google": "Sign in with Google",
    "auth.signin.facebook": "Sign in with Facebook",
    "auth.signin.backToHome": "Back to Home",

    "auth.signup.title": "Welcome to ServiceConnect!",
    "auth.signup.subtitle": "Create your account",
    "auth.signup.chooseRole": "What would you like to do?",
    "auth.signup.findServices": "I want to find services",
    "auth.signup.provideServices": "I want to provide services",
    "auth.signup.roleSeeker": "Service Seeker",
    "auth.signup.roleProvider": "Service Provider",
    "auth.signup.seekerDesc":
      "Find trusted professionals for home cleaning, tutoring, digital services and other needs.",
    "auth.signup.providerDesc":
      "Share your skills and services to earn income. Connect with thousands of customers.",
    "auth.signup.continue": "Continue",
    "auth.signup.fullName": "Full Name",
    "auth.signup.confirmPassword": "Confirm Password",
    "auth.signup.agreeTerms":
      "I have read and agree to the Terms of Service and Privacy Policy.",
    "auth.signup.createAccount": "Create Account",
    "auth.signup.alreadyHaveAccount": "Already have an account?",
    "auth.signup.signIn": "Sign In",

    // Dashboard
    "dashboard.provider.title": "Service Provider Dashboard",
    "dashboard.provider.analytics": "Analytics",
    "dashboard.provider.jobs": "Jobs",
    "dashboard.provider.services": "Services",
    "dashboard.provider.applications": "Applications",
    "dashboard.provider.overview": "Overview",
    "dashboard.provider.totalEarnings": "Total Earnings",
    "dashboard.provider.completedJobs": "Completed Jobs",
    "dashboard.provider.averageRating": "Average Rating",
    "dashboard.provider.responseRate": "Response Rate",
    "dashboard.provider.viewDetails": "View Details",
    "dashboard.provider.recentActivity": "Recent Activity",
    "dashboard.provider.pendingApplications": "Pending Applications",
    "dashboard.provider.activeJobs": "Active Jobs",
    "dashboard.provider.earnings": "Earnings",
    "dashboard.provider.monthlyEarnings": "Monthly Earnings",
    "dashboard.provider.weeklyEarnings": "Weekly Earnings",
    "dashboard.provider.findJobs": "Find Jobs",
    "dashboard.provider.manageServices": "Manage Services",
    "dashboard.provider.viewProfile": "View Profile",
    "dashboard.provider.applyNow": "Apply Now",

    "dashboard.seeker.title": "Service Seeker Dashboard",
    "dashboard.seeker.home": "Home",
    "dashboard.seeker.bookings": "Bookings",
    "dashboard.seeker.messages": "Messages",
    "dashboard.seeker.settings": "Settings",
    "dashboard.seeker.welcome": "Welcome",
    "dashboard.seeker.searchServices": "Search Services",
    "dashboard.seeker.recentBookings": "Recent Bookings",
    "dashboard.seeker.topProviders": "Top Providers",
    "dashboard.seeker.quickStats": "Quick Stats",
    "dashboard.seeker.totalBookings": "Total Bookings",
    "dashboard.seeker.completedServices": "Completed Services",
    "dashboard.seeker.savedProviders": "Saved Providers",
    "dashboard.seeker.unreadMessages": "Unread Messages",
    "dashboard.seeker.bookService": "Book a Service",
    "dashboard.seeker.browseCategories": "Browse Categories",
    "dashboard.seeker.viewAllBookings": "View All Bookings",
    "dashboard.seeker.contactProvider": "Contact Provider",

    // Forms
    "form.booking.title": "Book a Service",
    "form.booking.serviceDetails": "Service Details",
    "form.booking.provider": "Service Provider",
    "form.booking.serviceType": "Service Type",
    "form.booking.dateTime": "Date & Time",
    "form.booking.selectDate": "Select Date",
    "form.booking.selectTime": "Select Time",
    "form.booking.duration": "Duration",
    "form.booking.contactInfo": "Contact Information",
    "form.booking.location": "Location",
    "form.booking.province": "Province",
    "form.booking.district": "District",
    "form.booking.municipality": "Municipality",
    "form.booking.ward": "Ward",
    "form.booking.streetAddress": "Street Address",
    "form.booking.specialInstructions": "Special Instructions",
    "form.booking.paymentMethod": "Payment Method",
    "form.booking.cash": "Cash",
    "form.booking.esewa": "eSewa",
    "form.booking.khalti": "Khalti",
    "form.booking.online": "Online",
    "form.booking.serviceCost": "Service Cost",
    "form.booking.baseRate": "Base Rate",
    "form.booking.platformFee": "Platform Fee",
    "form.booking.total": "Total",
    "form.booking.confirmBooking": "Confirm Booking",
    "form.booking.termsAgree": "I agree to the terms of service.",

    "form.profile.title": "Update Profile",
    "form.profile.basicInfo": "Basic Information",
    "form.profile.businessName": "Business Name",
    "form.profile.bio": "Bio",
    "form.profile.services": "Services",
    "form.profile.selectCategories": "Select Categories",
    "form.profile.skills": "Skills",
    "form.profile.addSkill": "Add Skill",
    "form.profile.experience": "Experience",
    "form.profile.yearsExperience": "Years of Experience",
    "form.profile.portfolio": "Portfolio",
    "form.profile.addPortfolio": "Add Portfolio",
    "form.profile.availability": "Availability",
    "form.profile.workingDays": "Working Days",
    "form.profile.workingHours": "Working Hours",
    "form.profile.updateProfile": "Update Profile",

    // Find Services Page
    "findServices.title": "Find Services",
    "findServices.searchPlaceholder": "What service do you need?",
    "findServices.allLocations": "All Locations",
    "findServices.allCategories": "All Categories",
    "findServices.search": "Search",
    "findServices.results": "Results",
    "findServices.searchingFor": "Searching for",
    "findServices.in": "in",
    "findServices.sortByRating": "Sort by Rating",
    "findServices.sortByPrice": "Sort by Price",
    "findServices.sortByReviews": "Sort by Reviews",
    "findServices.noResults": "No results found",
    "findServices.noResultsDesc": "Try using different keywords",
    "findServices.clearFilters": "Clear Filters",

    // Services Page
    "services.title": "Find Services",
    "services.subtitle":
      "Discover excellent service providers according to your needs",
    "services.filterBy": "Filter By",
    "services.category": "Category",
    "services.location": "Location",
    "services.priceRange": "Price Range",
    "services.rating": "Rating",
    "services.availability": "Availability",
    "services.sortBy": "Sort By",
    "services.relevance": "Relevance",
    "services.priceHighToLow": "Price (High to Low)",
    "services.priceLowToHigh": "Price (Low to High)",
    "services.ratingHighToLow": "Rating (High to Low)",
    "services.newest": "Newest",
    "services.resultsFound": "results found",
    "services.noResults": "No results found",
    "services.tryDifferentFilters": "Try different filters",
    "services.clearFilters": "Clear Filters",
    "services.showMore": "Show More",

    // Status
    "status.pending": "Pending",
    "status.confirmed": "Confirmed",
    "status.inProgress": "In Progress",
    "status.completed": "Completed",
    "status.cancelled": "Cancelled",
    "status.active": "Active",
    "status.inactive": "Inactive",
    "status.available": "Available",
    "status.unavailable": "Unavailable",

    // Time and Date
    "time.morning": "Morning",
    "time.afternoon": "Afternoon",
    "time.evening": "Evening",
    "time.night": "Night",
    "time.today": "Today",
    "time.tomorrow": "Tomorrow",
    "time.yesterday": "Yesterday",
    "time.thisWeek": "This Week",
    "time.lastWeek": "Last Week",
    "time.thisMonth": "This Month",
    "time.lastMonth": "Last Month",

    // Days of Week
    "day.sunday": "Sunday",
    "day.monday": "Monday",
    "day.tuesday": "Tuesday",
    "day.wednesday": "Wednesday",
    "day.thursday": "Thursday",
    "day.friday": "Friday",
    "day.saturday": "Saturday",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ne");

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "ne" || savedLanguage === "en")) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when changed
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
