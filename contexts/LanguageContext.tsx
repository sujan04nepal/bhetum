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
    "nav.messages": "���न्देशहरू",
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
      "डिजिटल सेवादेखि घरेलु काम, शिक्षादेखि व्यापारिक सेवासम्म!",
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
    "footer.earnings": "आम्दानी",
    "footer.providerSupport": "सेवाप्रदायक सहयोग",
    "footer.about": "हाम्रो ��ारेमा",
    "footer.careers": "करियर",
    "footer.press": "प्रेस",
    "footer.blog": "ब्लग",
    "footer.helpCenter": "सहायता केन्द्र",
    "footer.contact": "सम्पर्क गर्नुहोस्",
    "footer.terms": "सेवाका सर्तहरू",
    "footer.privacy": "गोपनीयता नीति",
    "footer.description": "मानिसहरूलाई विश्वसनीय सेवा प्रदायकहरूसँग जोड्दै।",
    "footer.copyright": "© 2024 सेवा खोज। सबै अधिकार सुरक्षित।",
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
