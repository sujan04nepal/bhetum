"use client";

import { useState } from "react";
import {
  Search,
  Star,
  MapPin,
  Clock,
  Shield,
  Users,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Award,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import {
  SERVICE_CATEGORIES,
  CATEGORY_COLORS,
  MAJOR_CITIES,
} from "@/lib/constants";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  const featuredProviders = [
    {
      name: "सरिता शर्मा",
      service: "घर सरसफाइ सेवा",
      category: "trade-skilled",
      rating: 4.9,
      reviews: 127,
      price: "रू ३५०/घण्टा",
      location: "काठमाडौं",
      image: "👩‍💼",
      badge: "Top Rated",
      specialties: ["Deep Cleaning", "Eco-Friendly", "Same Day"],
    },
    {
      name: "राज गुरुंग",
      service: "गणित ट्यूशन",
      category: "teaching-coaching",
      rating: 4.8,
      reviews: 89,
      price: "रू ५००/घण्टा",
      location: "पोखरा",
      image: "👨‍🏫",
      badge: "विशेषज्ञ",
      specialties: ["SEE Prep", "Class 10", "+2 Math"],
    },
    {
      name: "माया तामाङ",
      service: "ग्राफिक डिजाइन",
      category: "creative-artisanal",
      rating: 5.0,
      reviews: 45,
      price: "रू ८००/घण्टा",
      location: "ललितपुर",
      image: "👩‍🎨",
      badge: "उदीयमान कलाकार",
      specialties: ["Logo Design", "Branding", "Social Media"],
    },
    {
      name: "अमित पौडेल",
      service: "वेब डेभलपमेन्ट",
      category: "digital-online",
      rating: 4.9,
      reviews: 203,
      price: "रू १२००/घण्टा",
      location: "��क्तपुर",
      image: "👨‍💻",
      badge: "प्रमाणित प्रो",
      specialties: ["React", "Node.js", "Mobile Apps"],
    },
    {
      name: "सुनिता कार्की",
      service: "फिटनेस ट्रेनिङ",
      category: "personal-care",
      rating: 4.8,
      reviews: 156,
      price: "रू ६००/घण्टा",
      location: "काठमाडौं",
      image: "👩‍⚕️",
      badge: "प्रमाणित",
      specialties: ["Weight Loss", "Yoga", "Diet Plan"],
    },
    {
      name: "रमेश श्रेष्ठ",
      service: "विवाह फोटोग्राफी",
      category: "events-hospitality",
      rating: 5.0,
      reviews: 78,
      price: "रू २५,००० /कार्यक्रम",
      location: "काठमाडौं",
      image: "📸",
      badge: "प्रिमियम",
      specialties: ["Traditional", "Candid", "Video"],
    },
  ];

  const stats = [
    {
      label: "सक्रिय सेवाप्रदायक",
      value: "५०K+",
      icon: Users,
      color: "text-blue-600",
    },
    {
      label: "सम्पन्न सेवा",
      value: "२M+",
      icon: Award,
      color: "text-green-600",
    },
    {
      label: "खुसी ग्रा���क",
      value: "५००K+",
      icon: Star,
      color: "text-yellow-600",
    },
    { label: "शहरहरू", value: "७७+", icon: MapPin, color: "text-purple-600" },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center text-white">
            <div className="floating-animation inline-block mb-6">
              <span className="text-6xl">🇳🇵</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              <span className="block text-white mb-2">नेपालको नम्बर १</span>
              <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                सेवा खोज्ने प्लेटफर्म
              </span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto animate-slide-up">
              घर सरसफाइ���ेखि ट्यूशन, डिजिटल सेवादेखि रचनात्मक कामसम्म -
              विश्वसनीय सेवा प्रदायकहरू फेला पार्नुहोस्! 🚀
            </p>

            {/* Enhanced Search Bar */}
            <div className="max-w-4xl mx-auto mb-12 animate-bounce-in">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-4 h-5 w-5 text-white/70" />
                    <input
                      type="text"
                      placeholder="कुन सेवा चाहिन्छ?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all backdrop-blur-sm"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 h-5 w-5 text-white/70" />
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all backdrop-blur-sm"
                    >
                      <option value="" className="text-gray-900">
                        तपाईंको स्थान चयन गर्नुहोस्
                      </option>
                      {MAJOR_CITIES.map((city) => (
                        <option
                          key={city}
                          value={city}
                          className="text-gray-900"
                        >
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl">
                    <Search className="h-5 w-5 mr-2" />
                    खोज्नुहोस् ✨
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <stat.icon
                      className={`h-8 w-8 mx-auto mb-2 ${stat.color}`}
                    />
                    <div className="text-2xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-white/80 text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories - Vibrant Grid */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">सेवाको श्रेणीहरू</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              डिजिटल सेवादेखि घरेलु काम, शिक्षादेखि व्यापारिक सेवासम्म! 🎯
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {SERVICE_CATEGORIES.map((category, index) => {
              const colors =
                CATEGORY_COLORS[category.id as keyof typeof CATEGORY_COLORS];
              return (
                <div
                  key={category.id}
                  className="category-card group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`card-vibrant ${colors?.bg} border-2 border-transparent hover:border-white group-hover:shadow-xl`}
                  >
                    <div
                      className={`text-5xl mb-4 text-center floating-animation`}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      {category.icon}
                    </div>
                    <h3
                      className={`font-bold text-center mb-2 ${colors?.text} text-lg`}
                    >
                      {category.name}
                    </h3>
                    <p className="text-center text-gray-600 text-sm mb-3">
                      {category.subcategories.length}+ सेवाहरू
                    </p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {category.subcategories
                        .slice(0, 3)
                        .map((sub, subIndex) => (
                          <span
                            key={sub.id}
                            className={`service-badge ${colors?.bg} ${colors?.text} text-xs`}
                          >
                            {sub.name.length > 15
                              ? sub.name.substring(0, 15) + "..."
                              : sub.name}
                          </span>
                        ))}
                      {category.subcategories.length > 3 && (
                        <span
                          className={`service-badge ${colors?.bg} ${colors?.text} text-xs font-bold`}
                        >
                          +{category.subcategories.length - 3} थप
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Providers - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">शीर्ष ���ेवा प्रदायकहरू</span>
              </h2>
              <p className="text-xl text-gray-600">
                नेपालका उत्कृष्ट सेवा प्रदायकहरूसँग भेट गर्नुहोस्! ⭐
              </p>
            </div>
            <Button className="btn-vibrant hidden md:flex items-center">
              सबै हेर्नुहोस् <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProviders.map((provider, index) => {
              const categoryColors =
                CATEGORY_COLORS[
                  provider.category as keyof typeof CATEGORY_COLORS
                ];
              return (
                <Card
                  key={index}
                  className="group hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105 overflow-hidden"
                >
                  <div className="relative">
                    <div
                      className={`absolute top-0 right-0 px-3 py-1 rounded-bl-lg text-white text-xs font-bold ${categoryColors?.accent}`}
                    >
                      {provider.badge}
                    </div>

                    <div className="flex items-center mb-6">
                      <div className="text-6xl mr-4 floating-animation">
                        {provider.image}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {provider.name}
                        </h3>
                        <p className="text-gray-600 font-medium">
                          {provider.service}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(provider.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 font-bold text-gray-900">
                          {provider.rating}
                        </span>
                        <span className="ml-1 text-gray-500">
                          ({provider.reviews})
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-primary-600">
                        {provider.price}
                      </div>
                    </div>

                    <div className="flex items-center text-gray-500 mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{provider.location}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {provider.specialties.map((specialty, i) => (
                        <span
                          key={i}
                          className={`service-badge ${categoryColors?.bg} ${categoryColors?.text}`}
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>

                    <div className="flex space-x-3">
                      <Button variant="outline" className="flex-1">
                        प्रोफाइल हेर्नुहोस्
                      </Button>
                      <Button className="flex-1 btn-vibrant">
                        बुक गर्नुहोस् ⚡
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              हाम्रो <span className="text-yellow-300">विशेषताहरू</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              विश्वास, सुविधा र उत्कृष्ट अनुभवका लागि निर्मित! 🌟
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl mb-6 mx-auto w-24 h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-12 w-12 text-green-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                🛡️ प्रमाणित सेवाप्रदायक
              </h3>
              <p className="text-blue-100 text-lg">
                सबै सेवा प्रदायकहरू पूर्ण रूपमा जाँच गरिएका र प्रमाणित छन्।
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl mb-6 mx-auto w-24 h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-12 w-12 text-yellow-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4">⚡ तुरुन्त बुकिङ</h3>
              <p className="text-blue-100 text-lg">
                चाहेको बेलामा तुरुन्त सेवा बुक गर्नुहोस्। सजिलो र छिटो!
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl mb-6 mx-auto w-24 h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-12 w-12 text-pink-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4">💯 गुणस्तर ग्यारेन्टी</h3>
              <p className="text-blue-100 text-lg">
                १००% सन्तुष्टि ग्यारेन्टी र उत्कृष्ट ग्राहक सेवा।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Vibrant */}
      <section className="py-20 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="floating-animation inline-block mb-6">
            <span className="text-6xl">🇳🇵</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            सुरु गर्न तयार हुनुहुन्छ? 🚀
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-pink-100 max-w-3xl mx-auto">
            हजारौं खुसी ग्राहक र सेवा प्रदायकहरूसँग जोडिनुहोस्!
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button className="bg-white text-purple-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-lg">
              🔍 सेवा खोज्नुहोस्
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 font-bold py-4 px-8 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 text-lg">
              💼 सेवाप्रदायक बन्नुहोस्
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
