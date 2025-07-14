"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import {
  Mail,
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  Search,
  HelpCircle,
  Book,
  MessageSquare,
  Headphones,
} from "lucide-react";

export default function CustomerSupportPage() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const content = {
    ne: {
      title: "ग्राहक सेवा केन्द्र",
      subtitle:
        "हामी तपाईंको सहयोगका लागि यहाँ छौं। कुनै पनि प्रश्न वा समस्याको लागि सम्पर्क गर्नुहोस्।",
      contactMethods: "सम्पर्क विधिहरू",
      quickHelp: "द्रुत सहायता",
      commonQuestions: "सामान्य प्रश्नहरू",
      searchPlaceholder: "सहायता खोज्नुहोस्...",
      emailSupport: "इमेल सहयोग",
      emailDesc: "हामीलाई इमेल पठाउनुहोस्, हामी 24 घण्टा भित्र जवाफ दिनेछौं।",
      phoneSupport: "फोन सहयोग",
      phoneDesc: "सोमबार देखि शनिबार, बिहान 9 बजे देखि साँझ 6 बजे सम्म।",
      liveChat: "लाइभ च्याट",
      liveChatDesc:
        "तुरुन्त सहायताका लागि हाम्रो लाइभ च्याट सेवा प्रयोग गर्नुहोस्।",
      supportHours: "सहयोग समय",
      supportHoursDesc:
        "सोमबार - शुक्रबार: बिहान 9 बजे - साँझ 6 बजे\nशनिबार: बिहान 10 बजे - दिउँसो 4 बजे\nआइतबार: बन्द",
      faqItems: [
        {
          question: "कसरी सेवा बुक गर्ने?",
          answer:
            "हाम्रो होमपेजमा जानुहोस्, आफ्नो चाहिने सेवा खोज्नुहोस्, सेवा प्रदायक छान्नुहोस् र बुक गर्नुहोस्।",
        },
        {
          question: "भुक्तानी कसरी गर्ने?",
          answer: "हामी नगद, eSewa, Khalti र अनलाइन भुक्तानी स्वीकार गर्छौं।",
        },
        {
          question: "सेवा रद्द गर्न सकिन्छ?",
          answer: "हो, तोकिएको समयभन्दा 2 घण्टा अगाडि रद्द गर्न सकिन्छ।",
        },
        {
          question: "सेवा प्रदायक कसरी बन्ने?",
          answer: "'सेव�� प्रदायक बन्नुहोस्' मा क्लिक गरेर दर्ता गर्न सकिन्छ।",
        },
      ],
    },
    en: {
      title: "Customer Support Center",
      subtitle:
        "We're here to help you. Contact us for any questions or issues.",
      contactMethods: "Contact Methods",
      quickHelp: "Quick Help",
      commonQuestions: "Common Questions",
      searchPlaceholder: "Search for help...",
      emailSupport: "Email Support",
      emailDesc: "Send us an email, we'll respond within 24 hours.",
      phoneSupport: "Phone Support",
      phoneDesc: "Monday to Saturday, 9 AM to 6 PM.",
      liveChat: "Live Chat",
      liveChatDesc: "Use our live chat service for instant assistance.",
      supportHours: "Support Hours",
      supportHoursDesc:
        "Monday - Friday: 9 AM - 6 PM\nSaturday: 10 AM - 4 PM\nSunday: Closed",
      faqItems: [
        {
          question: "How to book a service?",
          answer:
            "Go to our homepage, search for your needed service, select a provider and book.",
        },
        {
          question: "How to make payment?",
          answer: "We accept cash, eSewa, Khalti and online payments.",
        },
        {
          question: "Can I cancel a service?",
          answer:
            "Yes, you can cancel up to 2 hours before the scheduled time.",
        },
        {
          question: "How to become a service provider?",
          answer:
            "Click on 'Become a Provider' to register and start providing services.",
        },
      ],
    },
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {currentContent.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder={currentContent.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Methods */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {currentContent.contactMethods}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Email Support */}
              <Card>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {currentContent.emailSupport}
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {currentContent.emailDesc}
                  </p>
                  <Button variant="outline" className="w-full">
                    support@serviceconnect.np
                  </Button>
                </div>
              </Card>

              {/* Phone Support */}
              <Card>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Phone className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {currentContent.phoneSupport}
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {currentContent.phoneDesc}
                  </p>
                  <Button variant="outline" className="w-full">
                    +977-1-4444444
                  </Button>
                </div>
              </Card>

              {/* Live Chat */}
              <Card>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {currentContent.liveChat}
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {currentContent.liveChatDesc}
                  </p>
                  <Button className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Start Chat
                  </Button>
                </div>
              </Card>

              {/* Support Hours */}
              <Card>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Clock className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {currentContent.supportHours}
                      </h3>
                    </div>
                  </div>
                  <div className="text-gray-600 whitespace-pre-line">
                    {currentContent.supportHoursDesc}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Quick Help */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {currentContent.quickHelp}
            </h2>

            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Book className="h-4 w-4 mr-2" />
                User Guide
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <HelpCircle className="h-4 w-4 mr-2" />
                FAQ
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Headphones className="h-4 w-4 mr-2" />
                Video Tutorials
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="h-4 w-4 mr-2" />
                Service Areas
              </Button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <Card>
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {currentContent.commonQuestions}
            </h2>

            <div className="space-y-6">
              {currentContent.faqItems.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 pb-6 last:border-b-0"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.question}
                  </h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
