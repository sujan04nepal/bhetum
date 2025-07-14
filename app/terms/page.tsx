"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TermsPage() {
  const { language } = useLanguage();

  const content = {
    ne: {
      title: "सेवाका सर्तहरू",
      lastUpdated: "अन्तिम अपडेट: जनवरी १५, २०२४",
      sections: [
        {
          title: "१. सेवाको स्वीकृति",
          content:
            "यो प्लेटफर्म प्रयोग गरेर तपाईं यी सर्तहरू स्वीकार गर्नुहुन्छ। यदि तपाईं ��ी सर्तहरूसँग सहमत हुनुहुन्न भने कृपया यो सेवा प्रयोग नगर्नुहोस्।",
        },
        {
          title: "२. सेवा प्रदायकहरू",
          content:
            "सबै सेवा प्रदायकहरू स्वतन्त्र ठेकेदार हुन्। हामी तिनीहरूको कामको गुणस्तरको ग्यारेन्टी गर्दैनौं तर गुणस्तर सुनिश्चित गर्न प्रयास गर्छौं।",
        },
        {
          title: "३. भुक्तानी र शुल्क",
          content:
            "सेवाको मूल्य सेवा प्रदायकले निर्धारण गर्छ। हामी कुनै अतिरिक्त शुल्क लिँदैनौं। भुक्तानी सुरक्षित छ र कानूनी संरक्षण छ।",
        },
        {
          title: "४. रद्दीकरण नीति",
          content:
            "सेवा सुरु हुनुभन्दा २४ घण्टा अगाडि रद्द गर्न सकिन्छ। रद्द गरेपछि पूर्ण रकम फिर्ता हुन्छ। आकस्मिक अवस्थामा विशेष व्यवस्था हुन्छ।",
        },
        {
          title: "५. उत्तरदायित्व",
          content:
            "हामी प्लेटफर्म प्रदान गर्छौं तर सेवाको गुणस्तरको पूर्ण जिम्मेवारी सेवा प्रदायकको हो। हामी मध्यस्थताकर्ताको भूमिका खेल्छौं।",
        },
        {
          title: "६. गोपनीयता",
          content:
            "तपाईंको व्यक्तिगत जानकारी सुरक्षित छ। हामी तेस्रो पक्षलाई बिक्री गर्दैनौं। विस्तृत जानकारी गोपनीयता नीतिमा छ।",
        },
        {
          title: "७. निषेधित गतिविधि",
          content:
            "अवैध गतिविधि, ठगी, झूटो जानकारी, र दुरुपयोग निषेधित छ। उल्लङ्घन गरेमा ख���ता बन्द गरिनेछ।",
        },
        {
          title: "८. सर्त परिवर्तन",
          content:
            "हामी यी सर्तहरू समयसमयमा परिवर्तन गर्न सक्छौं। महत्वपूर्ण परिवर्तन भएमा सूचना दिइनेछ।",
        },
      ],
    },
    en: {
      title: "Terms of Service",
      lastUpdated: "Last updated: January 15, 2024",
      sections: [
        {
          title: "1. Acceptance of Terms",
          content:
            "By using this platform, you accept these terms. If you do not agree with these terms, please do not use this service.",
        },
        {
          title: "2. Service Providers",
          content:
            "All service providers are independent contractors. We do not guarantee the quality of their work but strive to ensure quality.",
        },
        {
          title: "3. Payment and Fees",
          content:
            "Service prices are determined by service providers. We do not charge additional fees. Payment is secure with legal protection.",
        },
        {
          title: "4. Cancellation Policy",
          content:
            "Services can be cancelled 24 hours before start time. Full refund is provided for cancellations. Special arrangements for emergencies.",
        },
        {
          title: "5. Liability",
          content:
            "We provide the platform but service quality responsibility lies with providers. We act as intermediaries and facilitators.",
        },
        {
          title: "6. Privacy",
          content:
            "Your personal information is secure. We do not sell to third parties. Detailed information is in our privacy policy.",
        },
        {
          title: "7. Prohibited Activities",
          content:
            "Illegal activities, fraud, false information, and misuse are prohibited. Violations will result in account closure.",
        },
        {
          title: "8. Terms Changes",
          content:
            "We may modify these terms from time to time. Important changes will be notified to users.",
        },
      ],
    },
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {currentContent.title} 📋
          </h1>
          <p className="text-lg text-blue-100">{currentContent.lastUpdated}</p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {currentContent.sections.map((section, index) => (
              <Card key={index} className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-primary-900">
                  {section.title}
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {section.content}
                </p>
              </Card>
            ))}
          </div>

          {/* Contact Section */}
          <Card className="mt-12 p-8 bg-primary-50 border-primary-200">
            <h2 className="text-2xl font-bold mb-4 text-primary-900">
              {language === "ne" ? "सम्पर्क" : "Contact Us"}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {language === "ne"
                ? "यदि यी सर्तहरूको बारेमा कुनै प्रश्न छ भने कृपया हामीलाई सम्पर्क गर्नुहोस्:"
                : "If you have any questions about these terms, please contact us:"}
            </p>
            <div className="mt-4 space-y-2">
              <p>
                <strong>Email:</strong> legal@sevakhoj.com
              </p>
              <p>
                <strong>Phone:</strong> +977-1-4567890
              </p>
              <p>
                <strong>Address:</strong> Kathmandu, Nepal
              </p>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
