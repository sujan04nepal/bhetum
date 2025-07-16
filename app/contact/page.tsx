"use client";

// Prevent static generation
export const dynamic = "force-dynamic";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactPage() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const content = {
    ne: {
      title: "सम्पर्क गर्नुहोस्",
      subtitle: "हामी तपाईंको सहयोगका लागि सधैं तत्पर छौं",
      formTitle: "हामीलाई सन्देश पठाउनुहोस्",
      name: "पूरा नाम",
      email: "इमेल ठेगाना",
      phone: "फोन नम्बर",
      subject: "विषय",
      message: "तपाईंको सन्देश",
      send: "पठाउनुहोस्",
      contactInfo: "सम्पर्क जानकारी",
      address: "काठमाडौं, नेपाल",
      workingHours: "कार्य समय",
      hours: "आ��तवार - शुक्रवार: ९:०० - १८:००",
      saturday: "शनिवार: ९:०० - १४:००",
      quickContact: "तुरुन्त सम्पर्क",
      whatsapp: "WhatsApp मा सन्देश गर्नुहोस्",
      facebook: "Facebook मा सन्देश गर्नुहोस्",
    },
    en: {
      title: "Contact Us",
      subtitle: "We are always ready to help you",
      formTitle: "Send us a message",
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      subject: "Subject",
      message: "Your Message",
      send: "Send Message",
      contactInfo: "Contact Information",
      address: "Kathmandu, Nepal",
      workingHours: "Working Hours",
      hours: "Sunday - Friday: 9:00 AM - 6:00 PM",
      saturday: "Saturday: 9:00 AM - 2:00 PM",
      quickContact: "Quick Contact",
      whatsapp: "Message on WhatsApp",
      facebook: "Message on Facebook",
    },
  };

  const currentContent = content[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    alert(
      language === "ne"
        ? "धन्यवाद! हामी छिट्टै जवाफ दिनेछौं।"
        : "Thank you! We will respond soon.",
    );
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {currentContent.title} 📞
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl gradient-text">
                  {currentContent.formTitle}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {currentContent.name} *
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateFormData("name", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {currentContent.email} *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {currentContent.phone}
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {currentContent.subject} *
                    </label>
                    <Input
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        updateFormData("subject", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {currentContent.message} *
                    </label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        updateFormData("message", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full btn-vibrant">
                    <Send className="h-5 w-5 mr-2" />
                    {currentContent.send}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl gradient-text">
                    {currentContent.contactInfo}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-primary-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Phone</h3>
                      <p className="text-gray-600">+977-1-4567890</p>
                      <p className="text-gray-600">+977-9812345678</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-primary-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">info@sevakhoj.com</p>
                      <p className="text-gray-600">support@sevakhoj.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-primary-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Address</h3>
                      <p className="text-gray-600">{currentContent.address}</p>
                      <p className="text-gray-600">Tinkune, Kathmandu 44600</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-primary-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {currentContent.workingHours}
                      </h3>
                      <p className="text-gray-600">{currentContent.hours}</p>
                      <p className="text-gray-600">{currentContent.saturday}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Contact */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl gradient-text">
                    {currentContent.quickContact}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                  >
                    <MessageCircle className="h-5 w-5 mr-3" />
                    {currentContent.whatsapp}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
                  >
                    <MessageCircle className="h-5 w-5 mr-3" />
                    {currentContent.facebook}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold gradient-text">
              {language === "ne" ? "हाम्रो स्थान" : "Our Location"}
            </h2>
          </div>
          <div className="bg-gray-300 h-96 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-600">
              <MapPin className="h-16 w-16 mx-auto mb-4" />
              <p className="text-lg">
                {language === "ne"
                  ? "नक्सा चाँडै आउँदैछ..."
                  : "Interactive map coming soon..."}
              </p>
              <p className="text-sm mt-2">Tinkune, Kathmandu, Nepal</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
