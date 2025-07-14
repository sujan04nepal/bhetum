"use client";

import { Shield, Eye, Lock, FileText } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PrivacyPage() {
  const { language } = useLanguage();

  const content = {
    ne: {
      title: "गोपनीयता नीति",
      lastUpdated: "अन्तिम अपडेट: जनवरी १५, २०२४",
      intro:
        "तपाईंको गोपनीयता हाम्रो लागि महत्वपूर्ण छ। यो नीतिले हामीले कसरी तपाईंको जानकारी सङ्कलन, प्रयोग र सुरक्षा गर्छौं भन्ने कुरा बताउँछ।",
      sections: [
        {
          title: "हामीले के जानकारी सङ्कलन गर्छौं",
          icon: FileText,
          content:
            "हामी तपाईंको नाम, इमेल, फोन नम्बर, ठेगाना र सेवा प्राथमिकताहरू सङ्कलन गर्छौं। यो जानकारी राम्रो सेवा प्रदान गर्न आवश्यक छ।",
        },
        {
          title: "जानकारीको प्रयोग",
          icon: Eye,
          content:
            "तपाईंको जानकारी सेवा प्रदान गर्न, सुरक्षा सुनिश्चित गर्न, र प्लेटफर्म सुधार गर्न प्रयोग गरिन्छ। हामी तेस्रो पक्षलाई बिक्री गर्दैनौं।",
        },
        {
          title: "डाटा सुरक्षा",
          icon: Shield,
          content:
            "हामी उच्च स्तरको सुरक्षा प्रयोग गर्छौं। SSL एन्क्रिप्शन, सुरक्षित सर्भर र नियमित सुरक्षा ���पडेट गर्छौं।",
        },
        {
          title: "तपाईंका अधिकारहरू",
          icon: Lock,
          content:
            "तपाईं आफ्नो जानकारी हेर्न, सम्पादन गर्न वा मेटाउन सक्नुहुन्छ। डाटा पोर्टेबिलिटी र एक्सेसको अधिकार छ।",
        },
      ],
      dataTypes: [
        "व्यक्तिगत जानकारी (नाम, इमेल, फोन)",
        "स्थान जानकारी (शहर, क्षेत्र)",
        "सेवा इतिहास र प्राथमिकताहरू",
        "भुक्तानी जानकारी (सुरक्षित रूपमा)",
        "डिभाइस र प्रयोग डाटा",
        "ग्राहक सपोर्ट कम्युनिकेसन",
      ],
      cookies:
        "हामी कुकीजको प्रयोग गर्छौं वेबसाइट सुधार गर्न र तपाईंको अनुभव व्यक्तिगत बनाउन। तपाईं कुकीज सेटिङ्स नियन्त्रण गर्�� सक्नुहुन्छ।",
      thirdParty:
        "हामी केवल भरपर्दो तेस्रो पक्षसँग (जस्तै भुक्तानी प्रोसेसर) आवश्यक जानकारी साझा गर्छौं। तपाईंको अनुमति बिना कहिल्यै बिक्री गर्दैनौं।",
      contact: "गोपनीयताको बारेमा प्रश्न छ भने सम्पर्क गर्नुहोस्:",
    },
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: January 15, 2024",
      intro:
        "Your privacy is important to us. This policy explains how we collect, use, and protect your information.",
      sections: [
        {
          title: "Information We Collect",
          icon: FileText,
          content:
            "We collect your name, email, phone number, address, and service preferences. This information is necessary to provide good service.",
        },
        {
          title: "How We Use Information",
          icon: Eye,
          content:
            "Your information is used to provide services, ensure security, and improve the platform. We do not sell to third parties.",
        },
        {
          title: "Data Security",
          icon: Shield,
          content:
            "We use high-level security measures including SSL encryption, secure servers, and regular security updates.",
        },
        {
          title: "Your Rights",
          icon: Lock,
          content:
            "You can view, edit, or delete your information. You have rights to data portability and access.",
        },
      ],
      dataTypes: [
        "Personal information (name, email, phone)",
        "Location information (city, area)",
        "Service history and preferences",
        "Payment information (securely stored)",
        "Device and usage data",
        "Customer support communications",
      ],
      cookies:
        "We use cookies to improve the website and personalize your experience. You can control cookie settings in your browser.",
      thirdParty:
        "We only share necessary information with trusted third parties (like payment processors). We never sell your data without permission.",
      contact: "If you have questions about privacy, contact us:",
    },
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <Shield className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {currentContent.title}
          </h1>
          <p className="text-lg text-blue-100 mb-8">
            {currentContent.lastUpdated}
          </p>
          <p className="text-xl max-w-4xl mx-auto">{currentContent.intro}</p>
        </div>
      </section>

      {/* Main Sections */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentContent.sections.map((section, index) => (
              <Card
                key={index}
                className="p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-primary-100 p-3 rounded-full mr-4">
                    <section.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {section.title}
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {section.content}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Data Types */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
            {language === "ne"
              ? "के प्रकारको डाटा सङ्कलन गर्छौं"
              : "Types of Data We Collect"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentContent.dataTypes.map((type, index) => (
              <div
                key={index}
                className="flex items-center bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="w-2 h-2 bg-primary-600 rounded-full mr-4"></div>
                <span className="text-gray-700">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cookies & Third Party */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {language === "ne" ? "कुकीजको प्रयोग" : "Use of Cookies"}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {currentContent.cookies}
            </p>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {language === "ne"
                ? "तेस्रो पक्षसँग साझेदारी"
                : "Third Party Sharing"}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {currentContent.thirdParty}
            </p>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4 text-primary-900">
              {currentContent.contact}
            </h2>
            <div className="space-y-3">
              <p>
                <strong>Email:</strong> privacy@sevakhoj.com
              </p>
              <p>
                <strong>Phone:</strong> +977-1-4567890
              </p>
              <p>
                <strong>Address:</strong> Data Protection Officer, Kathmandu,
                Nepal
              </p>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>
                  {language === "ne"
                    ? "नोट: यो नीति समयसमयमा अपडेट हुन सक्छ। महत्वपूर्ण परिवर्तनहरू इमेलमार्फत सूचना दिइनेछ।"
                    : "Note: This policy may be updated from time to time. Important changes will be notified via email."}
                </strong>
              </p>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
