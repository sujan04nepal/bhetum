"use client";

import {
  Search,
  UserCheck,
  Calendar,
  Star,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function HowItWorksPage() {
  const seekerSteps = [
    {
      icon: Search,
      title: "सेवा खोज्नुहोस्",
      description:
        "तपाईंलाई चाहिने सेवा खोज्नुहोस् र नजिकका सेवा प्रदायकहरू फेला पार्नुहोस्।",
      details: [
        "सेवाको नाम वा श्रेणी लेख्नुहोस्",
        "आफ्नो स्थान छान्नुहोस्",
        "फिल्टर र मूल्य दायरा सेट गर्नुहोस्",
      ],
    },
    {
      icon: UserCheck,
      title: "सेवाप्रदायक छान्नुहोस्",
      description:
        "समीक्षा, मूल्य र अनुभवका आधारमा उत्तम सेवा प्रदायक छान्नुहोस्।",
      details: [
        "प्रोफाइल र समीक्षा हेर्नुहोस्",
        "पोर्टफोलियो र काम नमूना देख्नुहोस्",
        "मूल्य र उपलब्धता जाँच गर्नुहोस्",
      ],
    },
    {
      icon: Calendar,
      title: "बुक गर्नुहोस्",
      description:
        "आफ्नो सुविधाजनक समयमा सेवा बुक गर्नुहोस् र विवरण पठाउनुहोस्।",
      details: [
        "मिति र समय छान्नुहोस्",
        "काम विवरण लेख्नुहोस्",
        "सम्पर्क जानकारी दिनुहोस्",
      ],
    },
    {
      icon: Star,
      title: "समीक्षा गर्नुहोस्",
      description: "का�� सकिएपछि सेवा प्रदायकलाई रेटिङ र समीक्षा दिनुहोस्।",
      details: [
        "सेवाको गुणस्तर मूल्याङ्कन गर्नुहोस्",
        "अनुभव साझा गर्नुहोस्",
        "अरूलाई मद्दत गर्नुहोस्",
      ],
    },
  ];

  const providerSteps = [
    {
      icon: UserCheck,
      title: "दर्ता गर्नुहोस्",
      description: "आफ्नो प्रोफाइल बनाउनुहोस् र सेवाहरू थप्नुहोस्।",
      details: [
        "व्यक्तिगत जानकारी भर्नुहोस्",
        "सेवा र मूल्य सेट गर्नुहोस्",
        "कागजात अपलोड गर्नुहोस्",
      ],
    },
    {
      icon: Search,
      title: "अवसर खोज्नुहोस्",
      description:
        "काम र अवसरहरू ब्राउज गर्नुहोस् वा ग्राहकको बुकिङ पाउनुहोस्।",
      details: [
        "उपलब्ध कामहरू हेर्नुहोस्",
        "आफ्नो सीप अनुसार फिल्टर ���र्नुहोस्",
        "बुकिङ अनुरोध स्वीकार गर्नुहोस्",
      ],
    },
    {
      icon: Calendar,
      title: "काम गर्नुहोस्",
      description: "निर्धारित समयमा गुणस्तरीय सेवा प्रदान गर्नुहोस्।",
      details: [
        "समयमा पुग्नुहोस्",
        "राम्रो सेवा दिनुहोस्",
        "ग्राहकसँग राम्रो व्यवहार गर्नुहोस्",
      ],
    },
    {
      icon: Star,
      title: "कमाउनुहोस्",
      description: "काम सकिएपछि भुक्तानी पाउनुहोस् र समीक्षा जम्मा गर्नुहोस्।",
      details: [
        "तुरुन्त भुक्तानी पाउनुहोस्",
        "राम्रो समीक्षा जम्मा गर्नुहोस्",
        "आफ्नो प्रतिष्ठा बढाउनुहोस्",
      ],
    },
  ];

  const benefits = [
    {
      icon: "🛡️",
      title: "सुरक्षित",
      description: "सबै सेवाप्रदायकहरू प्रमाणित र जाँच ��रिएका छन्।",
    },
    {
      icon: "⚡",
      title: "छिटो",
      description: "मिनेटमा सेवा फेला पार्नुहोस् र बुक गर्नुहोस्।",
    },
    {
      icon: "💰",
      title: "उचित मूल्य",
      description: "पारदर्शी मूल्य र कुनै लुकेको शुल्क छैन।",
    },
    {
      icon: "⭐",
      title: "गुणस्तरीय",
      description: "उच्च गुणस्तरको सेवा र १००% सन्तुष्टि ग्यारेन्टी।",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            कसरी काम गर्छ? 🤔
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            तीन सजिलो चरणमा सेवा फेला पार्नुहोस् वा आफ्नो सेवा ब���च्नुहोस्!
          </p>
        </div>
      </section>

      {/* For Service Seekers */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">
              सेवा खोज्ने ग्राहकहरूका लागि 🔍
            </h2>
            <p className="text-xl text-gray-600">
              चार सजिलो चरणमा आफ्नो आवश्यकको सेवा फेला पार्नुहोस्
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {seekerSteps.map((step, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <step.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="btn-vibrant" size="lg">
              सेवा खोज्न सुरु गर्नुहोस् 🚀
            </Button>
          </div>
        </div>
      </section>

      {/* For Service Providers */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">
              सेवा प्रदायकहरूका लागि 💼
            </h2>
            <p className="text-xl text-gray-600">
              आफ्नो सेवा बेचेर आम्दानी गर्न सुरु गर्नुहोस्
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {providerSteps.map((step, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <step.icon className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-purple-600 hover:bg-purple-700" size="lg">
              सेवाप्रदायक बन्नुहोस् 💪
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">
              हाम्रा विशेषताहरू ✨
            </h2>
            <p className="text-xl text-gray-600">
              किन हामी नेपालको नम्बर १ सेवा प्लेटफर्म?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-6xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">
              बारम्बार सोधिने प्रश्नहरू ❓
            </h2>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-3">
                के सेवा बुक गर्न पैसा लाग्छ?
              </h3>
              <p className="text-gray-600">
                होइन! सेवा खोज्न र बुक गर्न कुनै शुल्क लाग्दैन। तपाईंले सेवाको
                लागि मात्र भुक्तानी गर्नुहुन्छ।
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-3">
                सेवाप्रदायकहरू कत्तिको भरपर्दो छन्?
              </h3>
              <p className="text-gray-600">
                सबै सेवाप्रदायकहरू प्रमाणित छन् र हामीले तिनीहरूको पृष्ठभूमि
                जाँच गर्छौं। साथै, ग्राहकको समीक्षा प्रणाली छ।
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-3">
                भुक्तानी कसरी गर्ने?
              </h3>
              <p className="text-gray-600">
                तपाईं नगद, eSewa, Khalti, वा अन्य डिजिटल माध्यमबाट भुक्तानी गर्न
                सक्नुहुन्छ।
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-3">
                यदि सेवामा समस्या छ भने के गर्ने?
              </h3>
              <p className="text-gray-600">
                हाम्रो २४/७ ग्राहक सेवा टिम छ। तपाईं कुनै पनि समस्यामा हामीलाई
                सम्पर्क गर्न सक्नुहुन्छ।
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            तयार हुनुहुन्छ? 🚀
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            आज नै सुरु गर्नुहोस् र नेपालको सबैभन्दा ठूलो सेवा नेटवर्कमा
            जोडिनुहोस्!
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              className="bg-white text-purple-600 hover:bg-gray-100"
              size="lg"
            >
              सेवा खोज्नुहोस् 🔍
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700" size="lg">
              सेवाप्रदायक बन्नुहोस् 💼
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
