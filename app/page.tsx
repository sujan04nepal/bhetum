"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
import { useLanguage } from "@/contexts/LanguageContext";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const { t, language } = useLanguage();
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (location) params.set("location", location);
    router.push(`/find-services?${params.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const featuredProviders = [
    {
      name: language === "ne" ? "सरिता शर्मा" : "Sarita Sharma",
      service:
        language === "ne" ? "घर सरसफाइ सेवा" : "Professional House Cleaning",
      category: "trade-skilled",
      rating: 4.9,
      reviews: 127,
      price: language === "ne" ? "रू ३५०/घण्टा" : "Rs 350/hr",
      location: language === "ne" ? "काठमाडौं" : "Kathmandu",
      image: "👩‍💼",
      badge: language === "ne" ? "Top Rated" : "Top Rated",
      specialties:
        language === "ne"
          ? ["Deep Cleaning", "Eco-Friendly", "Same Day"]
          : ["Deep Cleaning", "Eco-Friendly", "Same Day"],
    },
    {
      name: language === "ne" ? "राज गुरुंग" : "Raj Gurung",
      service: language === "ne" ? "गणित ट्यूशन" : "Math Tutoring",
      category: "teaching-coaching",
      rating: 4.8,
      reviews: 89,
      price: language === "ne" ? "रू ५००/घण्टा" : "Rs 500/hr",
      location: language === "ne" ? "पोखरा" : "Pokhara",
      image: "👨‍🏫",
      badge: language === "ne" ? "विशेषज्ञ" : "Expert",
      specialties:
        language === "ne"
          ? ["SEE Prep", "Class 10", "+2 Math"]
          : ["SEE Prep", "Class 10", "+2 Math"],
    },
    {
      name: language === "ne" ? "माया तामाङ" : "Maya Tamang",
      service: language === "ne" ? "ग्राफिक डिजाइन" : "Graphic Design",
      category: "creative-artisanal",
      rating: 5.0,
      reviews: 45,
      price: language === "ne" ? "रू ८००/घण्टा" : "Rs 800/hr",
      location: language === "ne" ? "ललितपुर" : "Lalitpur",
      image: "���‍🎨",
      badge: language === "ne" ? "उदीयमान कलाकार" : "Rising Star",
      specialties: ["Logo Design", "Branding", "Social Media"],
    },
    {
      name: language === "ne" ? "अमित पौडेल" : "Amit Poudel",
      service: language === "ne" ? "वेब डेभलपमेन्ट" : "Web Development",
      category: "digital-online",
      rating: 4.9,
      reviews: 203,
      price: language === "ne" ? "रू १२००/घण्���ा" : "Rs 1200/hr",
      location: language === "ne" ? "भक्तपुर" : "Bhaktapur",
      image: "👨‍💻",
      badge: language === "ne" ? "प्रमाणित प्रो" : "Verified Pro",
      specialties: ["React", "Node.js", "Mobile Apps"],
    },
    {
      name: language === "ne" ? "सुनिता कार्की" : "Sunita Karki",
      service: language === "ne" ? "फिटनेस ट्रेनिङ" : "Fitness Training",
      category: "personal-care",
      rating: 4.8,
      reviews: 156,
      price: language === "ne" ? "रू ६००/घण्टा" : "Rs 600/hr",
      location: language === "ne" ? "काठमाडौं" : "Kathmandu",
      image: "👩‍⚕️",
      badge: language === "ne" ? "प्रमाणित" : "Certified",
      specialties:
        language === "ne"
          ? ["Weight Loss", "Yoga", "Diet Plan"]
          : ["Weight Loss", "Yoga", "Diet Plan"],
    },
    {
      name: language === "ne" ? "रमेश श्रेष्ठ" : "Ramesh Shrestha",
      service: language === "ne" ? "विवाह फोटोग्राफी" : "Wedding Photography",
      category: "events-hospitality",
      rating: 5.0,
      reviews: 78,
      price: language === "ne" ? "रू २५,००० /कार्यक्रम" : "Rs 25,000/event",
      location: language === "ne" ? "काठमाडौं" : "Kathmandu",
      image: "📸",
      badge: language === "ne" ? "प्रिमियम" : "Premium",
      specialties:
        language === "ne"
          ? ["Traditional", "Candid", "Video"]
          : ["Traditional", "Candid", "Video"],
    },
  ];

  const stats = [
    {
      label: t("stats.providers"),
      value: "50K+",
      icon: Users,
      color: "text-blue-600",
    },
    {
      label: t("stats.completed"),
      value: "2M+",
      icon: Award,
      color: "text-green-600",
    },
    {
      label: t("stats.customers"),
      value: "500K+",
      icon: Star,
      color: "text-yellow-600",
    },
    {
      label: t("stats.cities"),
      value: "77+",
      icon: MapPin,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="mb-6">
              <span className="text-4xl">🇳🇵</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              <span className="block mb-2">{t("home.title")}</span>
              <span className="block text-blue-600">{t("home.subtitle")}</span>
            </h1>

            <p className="text-lg md:text-xl mb-8 text-gray-600 max-w-3xl mx-auto">
              {t("home.description")}
            </p>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder={t("home.searchPlaceholder")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">{t("home.locationPlaceholder")}</option>
                      {MAJOR_CITIES.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Button
                    onClick={handleSearch}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    <Search className="h-5 w-5 mr-2" />
                    {t("home.searchButton")}
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <stat.icon
                      className={`h-6 w-6 mx-auto mb-2 ${stat.color}`}
                    />
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
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
              <span className="gradient-text">{t("home.categories")}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("home.categoriesDesc")} 🎯
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {SERVICE_CATEGORIES.map((category, index) => {
              const colors =
                CATEGORY_COLORS[category.id as keyof typeof CATEGORY_COLORS];
              return (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
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
                      {category.subcategories.length}+ {t("common.services")}
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
                          +{category.subcategories.length - 3}{" "}
                          {t("common.more")}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
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
                <span className="gradient-text">{t("home.topProviders")}</span>
              </h2>
              <p className="text-xl text-gray-600">
                {t("home.topProvidersDesc")} ⭐
              </p>
            </div>
            <Link href="/find-services">
              <Button className="btn-vibrant hidden md:flex items-center">
                {t("home.viewAll")} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
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
                      <Link href={`/provider/${index + 1}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          {t("home.viewProfile")}
                        </Button>
                      </Link>
                      <Link
                        href={`/booking/new?provider=${index + 1}`}
                        className="flex-1"
                      >
                        <Button className="w-full btn-vibrant">
                          {t("home.bookNow")} ⚡
                        </Button>
                      </Link>
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
              {t("home.features")} <span className="text-yellow-300">🌟</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {t("home.featuresDesc")} 🌟
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl mb-6 mx-auto w-24 h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-12 w-12 text-green-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                🛡️ {t("home.verifiedProviders")}
              </h3>
              <p className="text-blue-100 text-lg">{t("home.verifiedDesc")}</p>
            </div>

            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl mb-6 mx-auto w-24 h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-12 w-12 text-yellow-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                ⚡ {t("home.instantBooking")}
              </h3>
              <p className="text-blue-100 text-lg">{t("home.instantDesc")}</p>
            </div>

            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl mb-6 mx-auto w-24 h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-12 w-12 text-pink-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                💯 {t("home.qualityGuarantee")}
              </h3>
              <p className="text-blue-100 text-lg">{t("home.qualityDesc")}</p>
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
            {t("home.readyTitle")} 🚀
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-pink-100 max-w-3xl mx-auto">
            {t("home.readyDesc")}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/find-services">
              <Button className="bg-white text-purple-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-lg">
                🔍 {t("home.findServices")}
              </Button>
            </Link>
            <Link href="/become-provider">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 font-bold py-4 px-8 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 text-lg">
                💼 {t("home.becomeProvider")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
