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
      price: language === "ne" ? "���ू १२००/घण्टा" : "Rs 1200/hr",
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

      {/* Service Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {t("home.categories")}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t("home.categoriesDesc")}
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
                  className="block group"
                >
                  <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="text-3xl mb-4 text-center">
                      {category.icon}
                    </div>
                    <h3 className="font-semibold text-center mb-2 text-gray-900 text-base">
                      {category.name}
                    </h3>
                    <p className="text-center text-gray-500 text-sm mb-3">
                      {category.subcategories.length}+ {t("common.services")}
                    </p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {category.subcategories
                        .slice(0, 3)
                        .map((sub, subIndex) => (
                          <span
                            key={sub.id}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                          >
                            {sub.name.length > 15
                              ? sub.name.substring(0, 15) + "..."
                              : sub.name}
                          </span>
                        ))}
                      {category.subcategories.length > 3 && (
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
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

      {/* Featured Providers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                {t("home.topProviders")}
              </h2>
              <p className="text-lg text-gray-600">
                {t("home.topProvidersDesc")}
              </p>
            </div>
            <Link href="/find-services">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white hidden md:flex items-center px-4 py-2 rounded-lg">
                {t("home.viewAll")} <ArrowRight className="ml-2 h-4 w-4" />
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
                  className="group hover:shadow-lg transition-shadow border border-gray-200"
                >
                  <div className="relative">
                    <div className="absolute top-0 right-0 px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-bl-lg">
                      {provider.badge}
                    </div>

                    <div className="flex items-center mb-6">
                      <div className="text-4xl mr-4">{provider.image}</div>
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
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
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
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                          {t("home.bookNow")}
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

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {t("home.features")}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t("home.featuresDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg mb-6 mx-auto w-20 h-20 flex items-center justify-center border border-gray-200">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                {t("home.verifiedProviders")}
              </h3>
              <p className="text-gray-600">{t("home.verifiedDesc")}</p>
            </div>

            <div className="text-center">
              <div className="bg-white p-6 rounded-lg mb-6 mx-auto w-20 h-20 flex items-center justify-center border border-gray-200">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                {t("home.instantBooking")}
              </h3>
              <p className="text-gray-600">{t("home.instantDesc")}</p>
            </div>

            <div className="text-center">
              <div className="bg-white p-6 rounded-lg mb-6 mx-auto w-20 h-20 flex items-center justify-center border border-gray-200">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                {t("home.qualityGuarantee")}
              </h3>
              <p className="text-gray-600">{t("home.qualityDesc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="mb-6">
            <span className="text-4xl">🇳🇵</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("home.readyTitle")}
          </h2>
          <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto">
            {t("home.readyDesc")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/find-services">
              <Button className="bg-white text-blue-600 font-medium py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
                {t("home.findServices")}
              </Button>
            </Link>
            <Link href="/become-provider">
              <Button className="bg-blue-700 hover:bg-blue-800 font-medium py-3 px-6 rounded-lg transition-colors">
                {t("home.becomeProvider")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
