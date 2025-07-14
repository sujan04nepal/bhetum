"use client";

import { Briefcase, MapPin, Clock, Users, Heart, Zap } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CareersPage() {
  const { language } = useLanguage();

  const content = {
    ne: {
      title: "करियर",
      subtitle: "नेपालको #१ सेवा प्लेटफर्ममा काम गर्नुहोस्",
      whyJoinUs: "हामीसँग किन जोडिने?",
      benefits: [
        {
          icon: Heart,
          title: "राम्रो वातावरण",
          description: "सकारात्मक र सहयोगी कार्य वातावरण",
        },
        {
          icon: Zap,
          title: "सिक्ने अवसर",
          description: "निरन्तर सिक्ने र बढ्ने अवसर",
        },
        {
          icon: Users,
          title: "टिम वर्क",
          description: "उत्कृष्ट टिमसँग काम गर्ने मौका",
        },
      ],
      openPositions: "खुला पदहरू",
      jobs: [
        {
          title: "सफ्टवेयर इन्जिनियर",
          location: "काठमाडौं",
          type: "पूर्णकालिक",
          experience: "२-४ वर्ष",
          description: "React, Node.js र डाटाबेसमा अनुभव चाहिन्छ।",
        },
        {
          title: "मार्केटिङ म्यानेजर",
          location: "काठमाडौं",
          type: "पूर्णकालिक",
          experience: "३-५ वर्ष",
          description: "डिजिटल मार्केटिङ र ब्राण्डिङमा अनुभव।",
        },
        {
          title: "ग्राहक सेवा",
          location: "काठमाडौं",
          type: "प���र्णकालिक",
          experience: "१-२ वर्ष",
          description: "राम्रो कम्युनिकेसन र समस्या समाधान क्षमता।",
        },
      ],
      apply: "आवेदन दिनुहोस्",
      noOpenings: "हाल कुनै खुला पद छैन",
    },
    en: {
      title: "Careers",
      subtitle: "Work at Nepal's #1 service platform",
      whyJoinUs: "Why Join Us?",
      benefits: [
        {
          icon: Heart,
          title: "Great Environment",
          description: "Positive and supportive work culture",
        },
        {
          icon: Zap,
          title: "Learning Opportunities",
          description: "Continuous learning and growth opportunities",
        },
        {
          icon: Users,
          title: "Team Work",
          description: "Work with an excellent team",
        },
      ],
      openPositions: "Open Positions",
      jobs: [
        {
          title: "Software Engineer",
          location: "Kathmandu",
          type: "Full-time",
          experience: "2-4 years",
          description: "Experience in React, Node.js and databases required.",
        },
        {
          title: "Marketing Manager",
          location: "Kathmandu",
          type: "Full-time",
          experience: "3-5 years",
          description: "Experience in digital marketing and branding.",
        },
        {
          title: "Customer Service",
          location: "Kathmandu",
          type: "Full-time",
          experience: "1-2 years",
          description: "Good communication and problem-solving skills.",
        },
      ],
      apply: "Apply Now",
      noOpenings: "No current openings",
    },
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-green-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <Briefcase className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {currentContent.title} 💼
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            {currentContent.whyJoinUs}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentContent.benefits.map((benefit, index) => (
              <Card
                key={index}
                className="text-center p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <benefit.icon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            {currentContent.openPositions}
          </h2>

          {currentContent.jobs.length > 0 ? (
            <div className="space-y-6">
              {currentContent.jobs.map((job, index) => (
                <Card key={index} className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="flex-1 mb-4 lg:mb-0">
                      <h3 className="text-2xl font-bold mb-2 text-gray-900">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 mb-3 text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {job.type}
                        </div>
                        <div className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-1" />
                          {job.experience}
                        </div>
                      </div>
                      <p className="text-gray-700">{job.description}</p>
                    </div>
                    <div className="lg:ml-8">
                      <Button className="btn-vibrant w-full lg:w-auto">
                        {currentContent.apply}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {currentContent.noOpenings}
              </h3>
              <p className="text-gray-500">
                {language === "ne"
                  ? "नयाँ अवसरहरूको लागि फेरि हेर्नुहोस्।"
                  : "Check back for new opportunities."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact for Applications */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6 gradient-text">
            {language === "ne" ? "आवेदन पठाउनुहोस्" : "Send Your Application"}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {language === "ne"
              ? "यदि तपाईं हामीसँग काम गर्न चाहनुहुन्छ भने आफ्नो CV पठाउनुहोस्।"
              : "If you want to work with us, send your CV."}
          </p>
          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">
              {language === "ne" ? "सम्पर्क जानकारी" : "Contact Information"}
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Email:</strong> careers@sevakhoj.com
              </p>
              <p>
                <strong>Phone:</strong> +977-1-4567890
              </p>
              <p>
                <strong>Address:</strong> Kathmandu, Nepal
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
