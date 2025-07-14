"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  DollarSign,
  TrendingUp,
  Calculator,
  PieChart,
  BarChart3,
  Download,
  Calendar,
  Star,
  Users,
  Clock,
} from "lucide-react";

export default function ProviderEarningsPage() {
  const { t, language } = useLanguage();

  const content = {
    ne: {
      title: "सेवा प्रदायकको आम्दानी",
      subtitle:
        "सेवा खोजमा सेवा प्रदायकको रूपमा कति कमाउन सकिन्छ भनेर जान्नुहोस्।",
      earningPotential: "आम्दानी सम्भावना",
      howMuchEarn: "कति कमाउन सक��न्छ?",
      popularServices: "लोकप्रिय सेवाहरू",
      earningFactors: "आम्दानीलाई प्रभाव पार्ने कारकहरू",
      getStarted: "सुरु गर्नुहोस्",
      becomeProvider: "सेवा प्रदायक बन्नुहोस्",
      averageEarnings: "औसत आम्दानी",
      topEarners: "शीर्ष कमाउनेहरू",
      weeklyEarnings: "साप्ताहिक आम्दानी",
      monthlyEarnings: "मासिक आम्दानी",
      earningTips: "आम्दानी बढाउने सुझावहरू",
      calculator: "आम्दानी गणना",
      platformFee: "प्लेटफर्म शुल्क",
      netEarnings: "शुद्ध आम्दानी",
      serviceCategories: [
        { name: "घर सरसफाई", rate: "रू 500-800/घण्टा", demand: "उच्च" },
        { name: "ट्यूशन", rate: "रू 300-1000/घण्टा", demand: "धेरै उच्च" },
        { name: "वेब डिजाइन", rate: "रू 1000-2500/घण्टा", demand: "उच्च" },
        { name: "प्ल��्बिङ", rate: "रू 600-1200/घण्टा", demand: "मध्यम" },
      ],
      factors: [
        {
          title: "सेवाको गुणस्तर",
          desc: "उच्च गुणस्तरको सेवाले बढी पैसा कमाउन मद्दत गर्छ।",
        },
        {
          title: "ग्राहक रेटिङ",
          desc: "राम्रो रेटिङले बढी ग्राहक र आम्दानी ल्याउँछ।",
        },
        {
          title: "अनुभव",
          desc: "बढी अनुभव भएका प्रदायकहरूले बढी पैसा चार्ज गर्न सक्छन्।",
        },
        { title: "उपलब्धता", desc: "नियमित रूपमा उपलब्ध रहेमा बढी काम मिल्छ।" },
      ],
      tips: [
        "आफ्नो प्रोफाइल पूरा र आकर्षक बनाउनुहोस्",
        "गुणस्तरीय सेवा प्रदान गरेर राम्रो रेटिङ लिनुहोस्",
        "नियमित रूपमा उपलब्ध रहनुहोस्",
        "ग्राहकहरूसँग राम्रो व्यवहार गर्नुहोस्",
        "समयमा काम सम्पन्न गर्नुहोस्",
      ],
    },
    en: {
      title: "Provider Earnings",
      subtitle:
        "Learn how much you can earn as a service provider on ServiceConnect.",
      earningPotential: "Earning Potential",
      howMuchEarn: "How Much Can You Earn?",
      popularServices: "Popular Services",
      earningFactors: "Factors Affecting Earnings",
      getStarted: "Get Started",
      becomeProvider: "Become a Provider",
      averageEarnings: "Average Earnings",
      topEarners: "Top Earners",
      weeklyEarnings: "Weekly Earnings",
      monthlyEarnings: "Monthly Earnings",
      earningTips: "Tips to Increase Earnings",
      calculator: "Earnings Calculator",
      platformFee: "Platform Fee",
      netEarnings: "Net Earnings",
      serviceCategories: [
        { name: "House Cleaning", rate: "Rs 500-800/hour", demand: "High" },
        { name: "Tutoring", rate: "Rs 300-1000/hour", demand: "Very High" },
        { name: "Web Design", rate: "Rs 1000-2500/hour", demand: "High" },
        { name: "Plumbing", rate: "Rs 600-1200/hour", demand: "Medium" },
      ],
      factors: [
        {
          title: "Service Quality",
          desc: "High-quality service helps earn more money.",
        },
        {
          title: "Customer Rating",
          desc: "Good ratings bring more customers and earnings.",
        },
        {
          title: "Experience",
          desc: "More experienced providers can charge higher rates.",
        },
        {
          title: "Availability",
          desc: "Being regularly available gets you more jobs.",
        },
      ],
      tips: [
        "Complete and make your profile attractive",
        "Provide quality service to get good ratings",
        "Stay available regularly",
        "Maintain good behavior with customers",
        "Complete work on time",
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

        {/* Earning Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {currentContent.averageEarnings}
              </h3>
              <p className="text-2xl font-bold text-green-600">रू 15,000</p>
              <p className="text-sm text-gray-500">Per Month</p>
            </div>
          </Card>

          <Card>
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {currentContent.topEarners}
              </h3>
              <p className="text-2xl font-bold text-blue-600">रू 50,000+</p>
              <p className="text-sm text-gray-500">Per Month</p>
            </div>
          </Card>

          <Card>
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Average Rating
              </h3>
              <p className="text-2xl font-bold text-purple-600">4.8/5</p>
              <p className="text-sm text-gray-500">Provider Rating</p>
            </div>
          </Card>

          <Card>
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Active Providers
              </h3>
              <p className="text-2xl font-bold text-orange-600">2,500+</p>
              <p className="text-sm text-gray-500">Currently Active</p>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Popular Services */}
          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {currentContent.popularServices}
              </h2>

              <div className="space-y-4">
                {currentContent.serviceCategories.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-600">{service.rate}</p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          service.demand === "धेरै उच्च" ||
                          service.demand === "Very High"
                            ? "bg-green-100 text-green-800"
                            : service.demand === "उच्च" ||
                                service.demand === "High"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {service.demand}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Earning Factors */}
          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {currentContent.earningFactors}
              </h2>

              <div className="space-y-6">
                {currentContent.factors.map((factor, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                      <span className="text-primary-600 font-semibold text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {factor.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{factor.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Earnings Calculator */}
        <Card className="mb-12">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Calculator className="h-6 w-6 mr-2" />
              {currentContent.calculator}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hours per week
                </label>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rate per hour (NPR)
                </label>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {currentContent.platformFee} (10%)
                </label>
                <div className="w-full p-3 bg-gray-100 rounded-lg text-gray-600">
                  Auto calculated
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">
                  {currentContent.netEarnings}:
                </span>
                <span className="text-2xl font-bold text-green-600">
                  रू 14,400/month
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Tips Section */}
        <Card className="mb-12">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {currentContent.earningTips}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentContent.tips.map((tip, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <p className="text-gray-600">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {currentContent.getStarted}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of providers earning on ServiceConnect
          </p>
          <Button size="lg" className="mr-4">
            {currentContent.becomeProvider}
          </Button>
          <Button variant="outline" size="lg">
            <Download className="h-4 w-4 mr-2" />
            Download Earning Guide
          </Button>
        </div>
      </div>
    </div>
  );
}
