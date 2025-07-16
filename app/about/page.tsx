"use client";

// Prevent static generation
export const dynamic = "force-dynamic";

import {
  Heart,
  Award,
  Users,
  Globe,
  CheckCircle,
  Target,
  Eye,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutPage() {
  const { language } = useLanguage();

  const content = {
    ne: {
      title: "हाम्रो बारेमा",
      subtitle: "नेपालमा सेवा र ग्राहकलाई जोड्ने प्लेटफर्म",
      description:
        "हामी नेपालको सबैभन्दा भरपर्दो र विश्वसनीय सेवा खोज्ने प्लेट���र्म हौं। हाम्रो उद्देश्य मानिसहरूलाई उनीहरूको आवश्यकता अनुसारका गुणस्तरीय सेवाहरू सजिलैसँग फेला पार्न मद्दत गर्नु हो।",
      mission: "हाम्रो लक्ष्य",
      missionText:
        "नेपालमा प्रत्येक घरमा गुणस्तरीय सेवा पुर्याउनु र स���थानीय सेवा प्रदायकहरूलाई रोजगारीका अवसर प्रदान गर्नु।",
      vision: "हाम्रो दृष्टिकोण",
      visionText:
        "२०३० सम्ममा नेपालको नम्बर १ सेवा प्लेटफर्म बन्ने र दक्षिण एसियामा फैलिने।",
      values: "हाम्रा मूल्यहरू",
      stats: [
        { number: "50,000+", label: "सक्रिय सेवाप्रदायक" },
        { number: "500,000+", label: "खुसी ग्राहक" },
        { number: "2,000,000+", label: "सम्पन्न सेवा" },
        { number: "77", label: "जि���्लामा उपलब्ध" },
      ],
      team: "हाम्रो टिम",
      teamMembers: [
        {
          name: "सुजन नेपाल",
          position: "संस्थापक र CEO",
          description: "टेक्नोलोजी र व्यापारमा १० वर्षको अनुभव",
          image: "👨‍💼",
        },
        {
          name: "प्रिया शर्मा",
          position: "CTO",
          description: "सफ्टवेयर इन्जिनियरिङमा ८ वर्षको अनुभव",
          image: "👩‍💻",
        },
        {
          name: "राम बहादुर",
          position: "COO",
          description: "अपरेसन र मार्केटिङमा विशेषज्ञ",
          image: "👨‍💼",
        },
      ],
      valueslist: [
        {
          icon: Heart,
          title: "विश्वसनीयता",
          description:
            "हामी ग्राहक र सेवाप्रदायक दुवैका साथ इमानदार र पारदर्शी छौं।",
        },
        {
          icon: Award,
          title: "गुणस्तर",
          description: "��ामी सधैं उच्च गुणस्तरको सेवा र अनुभव प्रदान गर्छौं।",
        },
        {
          icon: Users,
          title: "समुदाय",
          description: "हामी स्थानीय समुदायको विकासमा योगदान पुर्याउँछौं।",
        },
        {
          icon: Globe,
          title: "नवाचार",
          description: "हामी निरन्तर नयाँ प्रविधि र समाधान खोज्छौं।",
        },
      ],
    },
    en: {
      title: "About Us",
      subtitle: "Connecting services and customers across Nepal",
      description:
        "We are Nepal's most trusted and reliable service marketplace platform. Our mission is to help people easily find quality services according to their needs.",
      mission: "Our Mission",
      missionText:
        "To deliver quality services to every home in Nepal and provide employment opportunities to local service providers.",
      vision: "Our Vision",
      visionText:
        "To become Nepal's #1 service platform by 2030 and expand across South Asia.",
      values: "Our Values",
      stats: [
        { number: "50,000+", label: "Active Providers" },
        { number: "500,000+", label: "Happy Customers" },
        { number: "2,000,000+", label: "Services Completed" },
        { number: "77", label: "Districts Covered" },
      ],
      team: "Our Team",
      teamMembers: [
        {
          name: "Sujan Nepal",
          position: "Founder & CEO",
          description: "10 years experience in technology and business",
          image: "👨‍💼",
        },
        {
          name: "Priya Sharma",
          position: "CTO",
          description: "8 years experience in software engineering",
          image: "👩‍💻",
        },
        {
          name: "Ram Bahadur",
          position: "COO",
          description: "Expert in operations and marketing",
          image: "👨‍💼",
        },
      ],
      valueslist: [
        {
          icon: Heart,
          title: "Trust",
          description:
            "We are honest and transparent with both customers and service providers.",
        },
        {
          icon: Award,
          title: "Quality",
          description:
            "We always provide high-quality services and experiences.",
        },
        {
          icon: Users,
          title: "Community",
          description: "We contribute to the development of local communities.",
        },
        {
          icon: Globe,
          title: "Innovation",
          description: "We continuously seek new technologies and solutions.",
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
            {currentContent.title} 🇳🇵
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
          <p className="text-lg md:text-xl max-w-4xl mx-auto text-blue-100">
            {currentContent.description}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {currentContent.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="p-8 text-center">
              <Target className="h-16 w-16 text-primary-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4 text-primary-900">
                {currentContent.mission}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {currentContent.missionText}
              </p>
            </Card>

            <Card className="p-8 text-center">
              <Eye className="h-16 w-16 text-purple-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4 text-purple-900">
                {currentContent.vision}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {currentContent.visionText}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">
              {currentContent.values}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentContent.valueslist.map((value, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="bg-primary-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <value.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">
              {currentContent.team}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentContent.teamMembers.map((member, index) => (
              <Card
                key={index}
                className="text-center p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-6xl mb-6">{member.image}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {member.name}
                </h3>
                <div className="text-primary-600 font-semibold mb-3">
                  {member.position}
                </div>
                <p className="text-gray-600">{member.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            {language === "ne" ? "हामीसँग जोडिनुहोस्!" : "Join Our Mission!"}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {language === "ne"
              ? "नेपालको सेवा क्षेत्रमा क्रान्ति ल्याउन हामीसँग सहयोग गर्नुहोस्।"
              : "Help us revolutionize the service industry in Nepal."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {language === "ne"
                ? "सेवाप्रदायक बन्नुहोस्"
                : "Become a Provider"}
            </button>
            <button className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
              {language === "ne" ? "सम्पर्क गर्नुहोस्" : "Contact Us"}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
