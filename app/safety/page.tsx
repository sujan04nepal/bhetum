"use client";

import {
  Shield,
  CheckCircle,
  AlertTriangle,
  Phone,
  UserCheck,
  Lock,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SafetyPage() {
  const { language } = useLanguage();

  const content = {
    ne: {
      title: "सुरक्षा र विश्वसनीयता",
      subtitle: "तपाईंको सुरक्षा हाम्रो प्राथमिकता हो",
      safetyMeasures: [
        {
          icon: UserCheck,
          title: "प्रमाणित सेवाप्रदाय���",
          description:
            "सबै सेवाप्रदायकहरूको नागरिकता, अनुभव र पृष्ठभूमि जाँच गरिन्छ।",
        },
        {
          icon: Lock,
          title: "सुरक्षित भुक्तानी",
          description:
            "एन्क्रिप्टेड भुक्तानी प्रणाली र पैसा सुरक्षाको ग्यारेन्टी।",
        },
        {
          icon: Shield,
          title: "२४/७ सपोर्ट",
          description:
            "कुनै समस्या भएमा तुरुन्त सहायताको लागि सम्पर्क गर्नुहोस्।",
        },
      ],
      tips: [
        "सेवाप्रदायकको प्रोफाइल र समीक्षा राम्ररी हेर्नुहोस्",
        "सेवा सुरु हुनुअघि स्पष्ट कुराकानी गर्नुहोस्",
        "कुनै समस्या भएमा तुरुन्त रिपोर्ट गर्नुहोस्",
        "भुक्तानी प्लेटफर्ममार्फत नै गर्नु��ोस्",
        "व्यक्तिगत जानकारी साझा नगर्नुहोस्",
      ],
      emergency: "आपतकालीन सम्पर्क: +977-1-4567890",
      reportIssue: "समस्या रिपोर्ट गर्नुहोस्",
    },
    en: {
      title: "Safety & Trust",
      subtitle: "Your safety is our priority",
      safetyMeasures: [
        {
          icon: UserCheck,
          title: "Verified Providers",
          description:
            "All service providers undergo citizenship, experience, and background checks.",
        },
        {
          icon: Lock,
          title: "Secure Payments",
          description: "Encrypted payment system with money-back guarantee.",
        },
        {
          icon: Shield,
          title: "24/7 Support",
          description: "Contact us immediately for assistance with any issues.",
        },
      ],
      tips: [
        "Carefully review provider profiles and reviews",
        "Have clear communication before service starts",
        "Report any issues immediately",
        "Make payments only through the platform",
        "Do not share personal information unnecessarily",
      ],
      emergency: "Emergency Contact: +977-1-4567890",
      reportIssue: "Report an Issue",
    },
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <Shield className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {currentContent.title} 🛡️
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>
      </section>

      {/* Safety Measures */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentContent.safetyMeasures.map((measure, index) => (
              <Card
                key={index}
                className="text-center p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <measure.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">{measure.title}</h3>
                <p className="text-gray-600">{measure.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
            {language === "ne" ? "सुरक्षा सुझावहरू" : "Safety Tips"}
          </h2>
          <div className="space-y-4">
            {currentContent.tips.map((tip, index) => (
              <div
                key={index}
                className="flex items-center bg-white p-4 rounded-lg shadow-sm"
              >
                <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0" />
                <span className="text-gray-700">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-20 bg-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertTriangle className="h-16 w-16 text-red-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4 text-red-900">
            {language === "ne" ? "आपतकालीन स��थिति" : "Emergency Situation"}
          </h2>
          <p className="text-xl mb-6 text-red-800">
            {currentContent.emergency}
          </p>
          <div className="space-x-4">
            <Button className="bg-red-600 hover:bg-red-700">
              <Phone className="h-5 w-5 mr-2" />
              {language === "ne" ? "तुरुन्त कल गर्नुहोस्" : "Call Now"}
            </Button>
            <Button
              variant="outline"
              className="border-red-600 text-red-600 hover:bg-red-50"
            >
              {currentContent.reportIssue}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
