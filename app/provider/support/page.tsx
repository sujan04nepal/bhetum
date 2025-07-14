"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  HelpCircle,
  Book,
  MessageCircle,
  Phone,
  Mail,
  Download,
  PlayCircle,
  CheckCircle,
  AlertCircle,
  Users,
  Briefcase,
  DollarSign,
  Star,
} from "lucide-react";

export default function ProviderSupportPage() {
  const { t, language } = useLanguage();

  const content = {
    ne: {
      title: "सेवा प्रदायक सहयोग",
      subtitle: "सेवा प्रदायकहरूका लागि विशेष सहयोग, मार्गदर्शन र संसाधनहरू।",
      quickHelp: "द्रुत सहायता",
      gettingStarted: "सुरुवात गाइड",
      providerGuide: "प्रदायक गाइड",
      videoTutorials: "भिडियो ट्यूटोरियलहरू",
      faq: "बारम्बार सोधिने प्रश्नहरू",
      contactSupport: "सहयोग टिम सम्पर्क",
      downloadResources: "संसाधन डाउनलोड",
      communityForum: "कम्युनिटी फोरम",
      bestPractices: "राम्रो अभ्यासहरू",
      supportTopics: "सहयोग विषयहरू",
      dedicatedSupport: "समर्पित सहयोग",
      supportDesc: "सेवा प्रदायकहरूका लागि 24/7 समर्पित सहयोग टिम।",
      phoneSupport: "फोन सहयोग",
      emailSupport: "इमेल सहयोग",
      liveChat: "लाइभ च्याट",
      guides: [
        {
          title: "नयाँ प्रदायकको लागि गाइड",
          desc: "सेवा खोजमा कसरी सुरु गर्ने भन्ने सम्पूर्ण जानकारी।",
        },
        {
          title: "प्रोफाइल अप्टिमाइजेसन",
          desc: "आफ्नो प्रोफ��इललाई आकर्षक बनाउने तरिकाहरू।",
        },
        {
          title: "मूल्य निर्धारण रणनीति",
          desc: "सही मूल्य कसरी राख्ने भन्ने सुझावहरू।",
        },
        {
          title: "ग्राहक सम्पर्क",
          desc: "ग्राहकहरूसँग राम्रो सम्बन्ध कायम राख्ने तरिकाहरू।",
        },
      ],
      videos: [
        { title: "प्रोफाइल सेटअप", duration: "5 मिनेट" },
        { title: "सेवा थप्ने तरिका", duration: "3 मिनेट" },
        { title: "बुकिङ व्यवस्थापन", duration: "7 मिनेट" },
        { title: "पेमेन्ट प्रक्रिया", duration: "4 मिनेट" },
      ],
      faqItems: [
        {
          question: "कसरी मेरो प्रोफाइल प्रमाणित गर्ने?",
          answer:
            "दस्तावेज अपलोड गरेर र फोन नम्बर पुष्टि गरेर प्रमाणित गर्न सकिन्छ।",
        },
        {
          question: "���ैसा कहिले मिल्छ?",
          answer: "सेवा सम्पन्न भएको 2-3 दिन पछी पेमेन्ट मिल्छ।",
        },
        {
          question: "ग्राहकसँग समस्या भएमा के गर्ने?",
          answer: "तुरुन्त हाम्रो सहयोग टिमलाई सम्पर्क गर्नुहोस्।",
        },
      ],
    },
    en: {
      title: "Provider Support",
      subtitle:
        "Specialized support, guidance and resources for service providers.",
      quickHelp: "Quick Help",
      gettingStarted: "Getting Started Guide",
      providerGuide: "Provider Guide",
      videoTutorials: "Video Tutorials",
      faq: "Frequently Asked Questions",
      contactSupport: "Contact Support Team",
      downloadResources: "Download Resources",
      communityForum: "Community Forum",
      bestPractices: "Best Practices",
      supportTopics: "Support Topics",
      dedicatedSupport: "Dedicated Support",
      supportDesc: "24/7 dedicated support team for service providers.",
      phoneSupport: "Phone Support",
      emailSupport: "Email Support",
      liveChat: "Live Chat",
      guides: [
        {
          title: "New Provider Guide",
          desc: "Complete information on how to get started on ServiceConnect.",
        },
        {
          title: "Profile Optimization",
          desc: "Ways to make your profile attractive and engaging.",
        },
        {
          title: "Pricing Strategy",
          desc: "Tips on how to set the right prices for your services.",
        },
        {
          title: "Customer Communication",
          desc: "Ways to maintain good relationships with customers.",
        },
      ],
      videos: [
        { title: "Profile Setup", duration: "5 minutes" },
        { title: "Adding Services", duration: "3 minutes" },
        { title: "Booking Management", duration: "7 minutes" },
        { title: "Payment Process", duration: "4 minutes" },
      ],
      faqItems: [
        {
          question: "How to verify my profile?",
          answer:
            "You can verify by uploading documents and confirming phone number.",
        },
        {
          question: "When do I get paid?",
          answer: "Payment is received 2-3 days after service completion.",
        },
        {
          question: "What to do if there's an issue with customer?",
          answer: "Contact our support team immediately for assistance.",
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

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Book className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {currentContent.gettingStarted}
              </h3>
              <Button variant="outline" size="sm" className="w-full">
                Read Guide
              </Button>
            </div>
          </Card>

          <Card>
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <PlayCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {currentContent.videoTutorials}
              </h3>
              <Button variant="outline" size="sm" className="w-full">
                Watch Videos
              </Button>
            </div>
          </Card>

          <Card>
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {currentContent.liveChat}
              </h3>
              <Button variant="outline" size="sm" className="w-full">
                Start Chat
              </Button>
            </div>
          </Card>

          <Card>
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {currentContent.communityForum}
              </h3>
              <Button variant="outline" size="sm" className="w-full">
                Join Forum
              </Button>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Provider Guides */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {currentContent.providerGuide}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentContent.guides.map((guide, index) => (
                  <Card key={index}>
                    <div className="p-6">
                      <div className="flex items-start mb-4">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                          <Book className="h-5 w-5 text-primary-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {guide.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4">
                            {guide.desc}
                          </p>
                          <Button variant="outline" size="sm">
                            Read More
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Video Tutorials */}
            <Card className="mb-12">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {currentContent.videoTutorials}
                </h2>

                <div className="space-y-4">
                  {currentContent.videos.map((video, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                          <PlayCircle className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {video.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {video.duration}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Watch
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* FAQ */}
            <Card>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {currentContent.faq}
                </h2>

                <div className="space-y-6">
                  {currentContent.faqItems.map((item, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 pb-6 last:border-b-0"
                    >
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <HelpCircle className="h-4 w-4 mr-2 text-primary-600" />
                        {item.question}
                      </h3>
                      <p className="text-gray-600 ml-6">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            {/* Contact Support */}
            <Card className="mb-8">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {currentContent.contactSupport}
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Phone className="h-5 w-5 text-green-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {currentContent.phoneSupport}
                      </p>
                      <p className="text-sm text-gray-600">+977-1-4444444</p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Mail className="h-5 w-5 text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {currentContent.emailSupport}
                      </p>
                      <p className="text-sm text-gray-600">
                        provider@serviceconnect.np
                      </p>
                    </div>
                  </div>

                  <Button className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {currentContent.liveChat}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Support Topics */}
            <Card className="mb-8">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {currentContent.supportTopics}
                </h3>

                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Account Management
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Payments & Earnings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Star className="h-4 w-4 mr-2" />
                    Reviews & Ratings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Report Issues
                  </Button>
                </div>
              </div>
            </Card>

            {/* Download Resources */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {currentContent.downloadResources}
                </h3>

                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Provider Handbook
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Pricing Guide
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Marketing Tips
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Safety Guidelines
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
