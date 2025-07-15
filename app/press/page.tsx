"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Calendar, Download, Mail, ExternalLink } from "lucide-react";

export default function PressPage() {
  const { t, language } = useLanguage();

  const content = {
    ne: {
      title: "प्रेस र मिडिया",
      subtitle: "सेवा खोजको बारेमा नवीनतम समाचार, घोषणाहरू र मिडिया संसाधनहरू।",
      pressReleases: "प्रेस विज्ञप्तिहरू",
      mediaKit: "मिडिया किट",
      contactPress: "प्रेस सम्पर्क",
      downloadLogo: "लोगो डाउनलोड गर्नुहोस्",
      companyInfo: "कम्पनी जानकारी",
      aboutCompany:
        "सेवा खोज नेपालको अग्रणी सेवा मार्केटप्लेस हो जसले ग्राहकहरूलाई विश्वसनीय सेवा प्रदायकहरूसँग जोड्छ।",
      pressContact: "प्रेस सम्पर्क जानकारी",
      mediaInquiries: "मिडिया सोध���ुछ",
      pressReleasesList: [
        {
          title: "सेवा खोजले 50,000+ ग्राहकहरूको मापदण्डता पार गर्यो",
          date: "2024-01-15",
          summary:
            "नेपालको अग्रणी सेवा मार्केटप्लेसले महत्वपूर्ण उपलब्धि हासिल गर्यो।",
        },
        {
          title: "नयाँ AI-पावर्ड खोज सुविधा सुरु",
          date: "2024-01-10",
          summary:
            "उन्नत खोज प्रविधिद्वारा ग्राहकहरूलाई राम्रो अनुभव प्रदान गर्ने।",
        },
        {
          title: "प्रदेश 1 मा सेवा विस्तार",
          date: "2024-01-05",
          summary:
            "पूर्वी नेपालमा सेवा विस्तार गरी थप ग्राहकहरूलाई सेवा प्रदान।",
        },
      ],
    },
    en: {
      title: "Press & Media",
      subtitle:
        "Latest news, announcements and media resources about ServiceConnect.",
      pressReleases: "Press Releases",
      mediaKit: "Media Kit",
      contactPress: "Press Contact",
      downloadLogo: "Download Logo",
      companyInfo: "Company Information",
      aboutCompany:
        "ServiceConnect is Nepal's leading service marketplace connecting customers with trusted service providers.",
      pressContact: "Press Contact Information",
      mediaInquiries: "Media Inquiries",
      pressReleasesList: [
        {
          title: "ServiceConnect Surpasses 50,000+ Customer Milestone",
          date: "2024-01-15",
          summary:
            "Nepal's leading service marketplace achieves significant milestone in customer growth.",
        },
        {
          title: "New AI-Powered Search Feature Launched",
          date: "2024-01-10",
          summary:
            "Advanced search technology to provide better customer experience.",
        },
        {
          title: "Service Expansion to Province 1",
          date: "2024-01-05",
          summary:
            "Expanding services to eastern Nepal to serve more customers.",
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Press Releases */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {currentContent.pressReleases}
              </h2>

              <div className="space-y-6">
                {currentContent.pressReleasesList.map((release, index) => (
                  <Card key={index}>
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {release.title}
                          </h3>
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(release.date).toLocaleDateString(
                              language === "ne" ? "ne-NP" : "en-US",
                            )}
                          </div>
                          <p className="text-gray-600 mb-4">
                            {release.summary}
                          </p>
                          <Button variant="outline" size="sm">
                            Read More
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Company Information */}
            <Card>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {currentContent.companyInfo}
                </h2>

                <div className="prose max-w-none text-gray-600">
                  <p className="text-lg mb-6">{currentContent.aboutCompany}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Founded
                      </h4>
                      <p>2023</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Headquarters
                      </h4>
                      <p>Kathmandu, Nepal</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Service Areas
                      </h4>
                      <p>All 77 districts of Nepal</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Services
                      </h4>
                      <p>10+ major categories, 80+ subcategories</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            {/* Media Kit */}
            <Card className="mb-8">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {currentContent.mediaKit}
                </h3>

                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    {currentContent.downloadLogo}
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Brand Guidelines
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Company Photos
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Fact Sheet
                  </Button>
                </div>
              </div>
            </Card>

            {/* Press Contact */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {currentContent.pressContact}
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {currentContent.mediaInquiries}
                    </h4>
                    <p className="text-gray-600">press@serviceconnect.np</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">Phone</h4>
                    <p className="text-gray-600">+977-1-4444444</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">Address</h4>
                    <p className="text-gray-600">
                      Kathmandu, Nepal
                      <br />
                      Bagbazar-29
                    </p>
                  </div>

                  <Button className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Press Team
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
