"use client";

import { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Phone,
  Mail,
  HelpCircle,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HelpPage() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const content = {
    ne: {
      title: "सहायता केन्द्र",
      subtitle: "तपाईंको प्रश्नको जवाफ खोज्नुहोस्",
      searchPlaceholder: "प्रश्न खोज्नुहोस्...",
      popularTopics: "लोकप्रिय विषयहरू",
      faqs: "बारम्बार सोधिने प्रश्नहरू",
      stillNeedHelp: "अझै सहायता चाहिन्छ?",
      contactSupport: "सपोर्ट टिमलाई सम्पर्क गर्नुहोस्",
      topics: [
        {
          title: "सेवा बुक गर्ने तरिका",
          description: "कसरी सेवा खोज्ने र बुक गर्ने",
          icon: "📅",
        },
        {
          title: "भुक्तानी र बिलिङ",
          description: "भुक्तानी विधि र समस्याहरू",
          icon: "💳",
        },
        {
          title: "प्रोफाइल व्यवस्थापन",
          description: "आफ्नो खाता र प्रोफाइल",
          icon: "👤",
        },
        {
          title: "सुरक्षा र गोपनीयता",
          description: "सुरक्षा र गोपनीयता नीति",
          icon: "🔒",
        },
        {
          title: "सेवाप्रदायक बन्ने",
          description: "कसरी सेवाप्रदायक बन्ने",
          icon: "💼",
        },
        {
          title: "समस्या समाधान",
          description: "सामान���य समस्याहरू",
          icon: "🔧",
        },
      ],
      faqList: [
        {
          question: "सेवा बुक गर्न कस्तो शुल्क लाग्छ?",
          answer:
            "सेवा खोज्न र बुक गर्न कुनै शुल्क लाग्दैन। तपाईंले सेवाको मूल्य मात्र भुक्तानी गर्नुहुन्छ। हाम्रो प्लेटफर्म निःशुल्क छ।",
        },
        {
          question: "सेवाप्रदायकहरू कत्तिको भरपर्दो छन्?",
          answer:
            "सबै सेवाप्रदायकहरू पूर्ण रूपमा जाँच गरिएका छन्। हामी तिनीहरूको नागरिकता, अनुभव र पृष्ठभूमि जाँच गर्छौं। ग्राहकको समीक्षा प्रणाली पनि छ।",
        },
        {
          question: "भुक्तानी कसरी गर्ने?",
          answer:
            "तपाईं नगद, eSewa, Khalti, बैंक ट्रान्सफर वा अन्य डिजिटल माध्यमबाट ���ुक्तानी गर्न सक्नुहुन्छ। सुरक्षित भुक्तानी ग्यारेन्टी छ।",
        },
        {
          question: "सेवामा समस्या भएमा के गर्ने?",
          answer:
            "यदि कुनै समस्या छ भने तुरुन्त हाम्रो सपोर्ट टिमलाई सम्पर्क गर्नुहोस्। हामी २४/७ उपलब्ध छौं र समस्या समाधान गर्छौं।",
        },
        {
          question: "सेवाप्रदायक कसरी बन्ने?",
          answer:
            "हाम्रो वेबसाइटमा सेवाप्रदायकका लागि दर्ता गर्नुहोस्। आवश्यक कागजात अपलोड गर्नुहोस् र प्रमाणीकरण पछि सेवा दिन सुरु गर्नुहोस्।",
        },
        {
          question: "रद्द गर्ने नीति के हो?",
          answer:
            "सेवा सुरु हुनुभन्दा २४ घण्टा अगाडि रद्द गर्न सकिन्छ। रद्द गरेपछि पूर्ण रकम फिर्ता हुन्छ।",
        },
      ],
    },
    en: {
      title: "Help Center",
      subtitle: "Find answers to your questions",
      searchPlaceholder: "Search questions...",
      popularTopics: "Popular Topics",
      faqs: "Frequently Asked Questions",
      stillNeedHelp: "Still need help?",
      contactSupport: "Contact our support team",
      topics: [
        {
          title: "How to Book Services",
          description: "Learn to search and book services",
          icon: "📅",
        },
        {
          title: "Payment & Billing",
          description: "Payment methods and issues",
          icon: "💳",
        },
        {
          title: "Account Management",
          description: "Your account and profile",
          icon: "👤",
        },
        {
          title: "Safety & Privacy",
          description: "Security and privacy policy",
          icon: "🔒",
        },
        {
          title: "Become a Provider",
          description: "How to become a service provider",
          icon: "💼",
        },
        {
          title: "Troubleshooting",
          description: "Common problems and solutions",
          icon: "🔧",
        },
      ],
      faqList: [
        {
          question: "What fees do I pay to book services?",
          answer:
            "There are no fees to search and book services. You only pay the service provider's price. Our platform is free to use.",
        },
        {
          question: "How reliable are the service providers?",
          answer:
            "All service providers are thoroughly vetted. We check their citizenship, experience, and background. There's also a customer review system.",
        },
        {
          question: "How do I make payments?",
          answer:
            "You can pay by cash, eSewa, Khalti, bank transfer, or other digital methods. Secure payment is guaranteed.",
        },
        {
          question: "What if there's an issue with the service?",
          answer:
            "If there's any problem, contact our support team immediately. We're available 24/7 and will resolve issues.",
        },
        {
          question: "How do I become a service provider?",
          answer:
            "Register as a provider on our website. Upload required documents and start providing services after verification.",
        },
        {
          question: "What is the cancellation policy?",
          answer:
            "You can cancel up to 24 hours before the service starts. Full refund is provided for cancellations.",
        },
      ],
    },
  };

  const currentContent = content[language];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <HelpCircle className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {currentContent.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-4 h-6 w-6 text-white/70" />
              <input
                type="text"
                placeholder={currentContent.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 text-lg backdrop-blur-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">
              {currentContent.popularTopics}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentContent.topics.map((topic, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="text-4xl mb-4">{topic.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {topic.title}
                </h3>
                <p className="text-gray-600">{topic.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">
              {currentContent.faqs}
            </h2>
          </div>

          <div className="space-y-4">
            {currentContent.faqList.map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>

                {expandedFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 gradient-text">
              {currentContent.stillNeedHelp}
            </h2>
            <p className="text-xl text-gray-600">
              {currentContent.contactSupport}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <MessageCircle className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">
                {language === "ne" ? "तुरुन्त सहायता" : "Instant help"}
              </p>
              <Button className="w-full">
                {language === "ne" ? "च्याट सुरु गर्नुहोस्" : "Start Chat"}
              </Button>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <Phone className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-gray-600 mb-4">+977-1-4567890</p>
              <Button variant="outline" className="w-full">
                {language === "ne" ? "फोन गर्नुह��स्" : "Call Now"}
              </Button>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-600 mb-4">support@sevakhoj.com</p>
              <Button variant="outline" className="w-full">
                {language === "ne" ? "इमेल गर्नुहोस्" : "Send Email"}
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
