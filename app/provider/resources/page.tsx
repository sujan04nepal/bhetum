"use client";

import {
  BookOpen,
  Video,
  Download,
  MessageCircle,
  Award,
  TrendingUp,
  Users,
  DollarSign,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProviderResourcesPage() {
  const { language } = useLanguage();

  const content = {
    ne: {
      title: "सेवाप्रदायक स्रोतहरू",
      subtitle: "सफल सेवाप्रदायक बन्नका लागि सबै जानकारी",
      sections: {
        guides: {
          title: "गाइड र ट्यूटोरियल",
          items: [
            { title: "सेव���प्रदायक बन्ने तरिका", type: "PDF", size: "2MB" },
            {
              title: "प्रोफाइल सुधार गर्ने टिप्स",
              type: "Video",
              duration: "15 मिनेट",
            },
            { title: "ग्राहकसँग कुराकानी", type: "PDF", size: "1.5MB" },
            { title: "मूल्य निर्धारण गाइड", type: "PDF", size: "3MB" },
          ],
        },
        tools: {
          title: "उपकरणहरू",
          items: [
            {
              title: "मूल्य क्यालकुलेटर",
              description: "आफ्नो सेवाको उचित मूल्य पत्ता लगाउनुहोस्",
            },
            {
              title: "समय तालिका बनाउने",
              description: "आफ्नो उपलब्धता व्यवस्थापन गर्नुहोस्",
            },
            {
              title: "आम्दानी ट्र्याकर",
              description: "मासिक आम्दानी हेर्नुहोस्",
            },
            { title: "ग्राहक फिडब्याक", description: "समीक्षा र सुझावहरू" },
          ],
        },
        tips: {
          title: "सफलताका सुझाव���रू",
          items: [
            "राम्रो प्रोफाइल फोटो र विवरण राख्नुहोस्",
            "ग्राहकसँग छिटो जवाफ दिनुहोस्",
            "गुणस्तरीय सेवा प्रदान गर्नुहोस्",
            "समयमा पुग्नुहोस् र व्यावसायिक बन्नुहोस्",
            "निरन्तर सीप सुधार गर्नुहोस्",
          ],
        },
      },
      stats: [
        { icon: Users, value: "1000+", label: "सक्रिय प्रदायक" },
        { icon: DollarSign, value: "रू 25K", label: "औसत मासिक आम्दानी" },
        { icon: Award, value: "4.8★", label: "औसत रेटिङ" },
        { icon: TrendingUp, value: "25%", label: "मासिक वृद्धि" },
      ],
    },
    en: {
      title: "Provider Resources",
      subtitle: "Everything you need to become a successful service provider",
      sections: {
        guides: {
          title: "Guides & Tutorials",
          items: [
            { title: "How to Become a Provider", type: "PDF", size: "2MB" },
            {
              title: "Profile Optimization Tips",
              type: "Video",
              duration: "15 minutes",
            },
            { title: "Customer Communication", type: "PDF", size: "1.5MB" },
            { title: "Pricing Guide", type: "PDF", size: "3MB" },
          ],
        },
        tools: {
          title: "Tools",
          items: [
            {
              title: "Price Calculator",
              description: "Find the right price for your services",
            },
            {
              title: "Schedule Builder",
              description: "Manage your availability",
            },
            {
              title: "Earnings Tracker",
              description: "Track your monthly income",
            },
            {
              title: "Customer Feedback",
              description: "Reviews and suggestions",
            },
          ],
        },
        tips: {
          title: "Success Tips",
          items: [
            "Have a good profile photo and description",
            "Respond quickly to customers",
            "Provide quality service",
            "Be on time and professional",
            "Continuously improve your skills",
          ],
        },
      },
      stats: [
        { icon: Users, value: "1000+", label: "Active Providers" },
        { icon: DollarSign, value: "Rs 25K", label: "Average Monthly Income" },
        { icon: Award, value: "4.8★", label: "Average Rating" },
        { icon: TrendingUp, value: "25%", label: "Monthly Growth" },
      ],
    },
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <BookOpen className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {currentContent.title} 📚
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {currentContent.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <stat.icon className="h-8 w-8 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guides & Tutorials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            {currentContent.sections.guides.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentContent.sections.guides.items.map((item, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-4">
                  {item.type === "Video" ? (
                    <Video className="h-12 w-12 text-red-600 mx-auto" />
                  ) : (
                    <Download className="h-12 w-12 text-blue-600 mx-auto" />
                  )}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-4">
                  {item.type} - {item.size || item.duration}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  {item.type === "Video"
                    ? language === "ne"
                      ? "हेर्नुहोस्"
                      : "Watch"
                    : language === "ne"
                      ? "डाउनलोड"
                      : "Download"}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            {currentContent.sections.tools.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentContent.sections.tools.items.map((tool, index) => (
              <Card
                key={index}
                className="p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                    <p className="text-gray-600 mb-4">{tool.description}</p>
                    <Button variant="outline">
                      {language === "ne" ? "प्रयोग गर्नुहोस्" : "Use Tool"}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Tips */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            {currentContent.sections.tips.title}
          </h2>
          <div className="space-y-4">
            {currentContent.sections.tips.items.map((tip, index) => (
              <div
                key={index}
                className="flex items-center bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <Award className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Support */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 gradient-text">
                {language === "ne" ? "समुदायिक सहयोग" : "Community Support"}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {language === "ne"
                  ? "अन्य सेवाप्रदायकहरूसँग जोडिनुहोस् र अनुभव साझा गर्नुहोस्।"
                  : "Connect with other providers and share experiences."}
              </p>
              <div className="space-y-4">
                <Button className="w-full justify-start">
                  <MessageCircle className="h-5 w-5 mr-3" />
                  {language === "ne" ? "फोरममा जोडिनुहोस्" : "Join Forum"}
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-5 w-5 mr-3" />
                  {language === "ne" ? "मेन्टर खोज्नुहोस्" : "Find a Mentor"}
                </Button>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-12 rounded-2xl">
                <Users className="h-24 w-24 text-blue-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {language === "ne" ? "५००+ सदस्य" : "500+ Members"}
                </h3>
                <p className="text-gray-600">
                  {language === "ne"
                    ? "हाम्रो सक्रिय समुदायमा जोडिनुहोस्"
                    : "Join our active community"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
