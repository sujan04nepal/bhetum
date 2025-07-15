"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  MapPin,
  Filter,
  Grid,
  List,
  Star,
  Clock,
  Shield,
  TrendingUp,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  SERVICE_CATEGORIES,
  CATEGORY_COLORS,
  MAJOR_CITIES,
} from "@/lib/constants";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

function FindServicesContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("rating");
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();

  // Get initial search params from URL
  useEffect(() => {
    const query = searchParams.get("q");
    const loc = searchParams.get("location");
    const category = searchParams.get("category");

    if (query) setSearchQuery(query);
    if (loc) setLocation(loc);
    if (category) setSelectedCategory(category);
  }, [searchParams]);

  // Mock providers data
  const allProviders = [
    {
      id: "1",
      name: language === "ne" ? "सरिता शर्मा" : "Sarita Sharma",
      service:
        language === "ne" ? "घर सरसफाइ सेवा" : "Professional House Cleaning",
      category: "trade-skilled",
      categoryName:
        language === "ne" ? "व्यापारिक र सीपयुक्त" : "Trade & Skilled",
      rating: 4.9,
      reviews: 127,
      price: language === "ne" ? "रू ३५०/घण्टा" : "Rs 350/hr",
      location: language === "ne" ? "काठमाडौं" : "Kathmandu",
      image: "👩‍💼",
      badge: language === "ne" ? "टप रेटेड" : "Top Rated",
      responseTime: language === "ne" ? "२ मिनेट" : "2 min",
      completedJobs: 245,
      isVerified: true,
      availability: language === "ne" ? "उपलब्ध" : "Available",
      description:
        language === "ne"
          ? "पेशेवर घर सरसफाइ सेवा १० वर्षको अनुभवसँग"
          : "Professional house cleaning with 10 years experience",
    },
    {
      id: "2",
      name: language === "ne" ? "राज गुरुंग" : "Raj Gurung",
      service: language === "ne" ? "गणित ट्यूशन" : "Math Tutoring",
      category: "teaching-coaching",
      categoryName:
        language === "ne" ? "शिक्षण र प्रशिक्षण" : "Teaching & Coaching",
      rating: 4.8,
      reviews: 89,
      price: language === "ne" ? "रू ५००/घण्टा" : "Rs 500/hr",
      location: language === "ne" ? "पोखरा" : "Pokhara",
      image: "👨‍🏫",
      badge: language === "ne" ? "विशेषज्ञ" : "Expert",
      responseTime: language === "ne" ? "५ मिनेट" : "5 min",
      completedJobs: 156,
      isVerified: true,
      availability: language === "ne" ? "उपलब्ध" : "Available",
      description:
        language === "ne"
          ? "SEE र +२ गणितमा विशेषज्ञता"
          : "Specializing in SEE and +2 mathematics",
    },
    {
      id: "3",
      name: language === "ne" ? "माया तामाङ" : "Maya Tamang",
      service: language === "ne" ? "ग्राफिक डिजाइन" : "Graphic Design",
      category: "creative-artisanal",
      categoryName:
        language === "ne" ? "सिर्जनशील र कलात्मक" : "Creative & Artisanal",
      rating: 5.0,
      reviews: 45,
      price: language === "ne" ? "रू ८००/घण्टा" : "Rs 800/hr",
      location: language === "ne" ? "ललितपुर" : "Lalitpur",
      image: "👩‍🎨",
      badge: language === "ne" ? "उदीयमान कलाकार" : "Rising Star",
      responseTime: language === "ne" ? "१ घण्टा" : "1 hour",
      completedJobs: 78,
      isVerified: true,
      availability: language === "ne" ? "व्यस्त" : "Busy",
      description:
        language === "ne"
          ? "आधुनिक ग्राफिक डिजाइन र ब्रान्डिङ"
          : "Modern graphic design and branding solutions",
    },
    {
      id: "4",
      name: language === "ne" ? "अमित पौडेल" : "Amit Poudel",
      service: language === "ne" ? "वेब डेभलपमेन्ट" : "Web Development",
      category: "digital-online",
      categoryName: language === "ne" ? "डिजिटल र अनलाइन" : "Digital & Online",
      rating: 4.9,
      reviews: 203,
      price: language === "ne" ? "रू १२००/घण्टा" : "Rs 1200/hr",
      location: language === "ne" ? "भक्तपुर" : "Bhaktapur",
      image: "👨‍💻",
      badge: language === "ne" ? "प्रमाणित प्रो" : "Verified Pro",
      responseTime: language === "ne" ? "३० मिनेट" : "30 min",
      completedJobs: 189,
      isVerified: true,
      availability: language === "ne" ? "उपलब्ध" : "Available",
      description:
        language === "ne"
          ? "Full-stack web development र mobile apps"
          : "Full-stack web development and mobile apps",
    },
    {
      id: "5",
      name: language === "ne" ? "सुनिता कार्की" : "Sunita Karki",
      service: language === "ne" ? "फिटनेस ट्रेनिङ" : "Fitness Training",
      category: "personal-care",
      categoryName: language === "ne" ? "व्यक्तिगत हेरचाह" : "Personal Care",
      rating: 4.8,
      reviews: 156,
      price: language === "ne" ? "रू ६००/घण्टा" : "Rs 600/hr",
      location: language === "ne" ? "काठमाडौं" : "Kathmandu",
      image: "👩‍⚕️",
      badge: language === "ne" ? "प्रमाणित" : "Certified",
      responseTime: language === "ne" ? "१५ मिनेट" : "15 min",
      completedJobs: 234,
      isVerified: true,
      availability: language === "ne" ? "उपलब्ध" : "Available",
      description:
        language === "ne"
          ? "योग, वजन घटाउने र फिटनेस ट्रेनिङ"
          : "Yoga, weight loss and fitness training",
    },
    {
      id: "6",
      name: language === "ne" ? "रमेश श्रेष्ठ" : "Ramesh Shrestha",
      service: language === "ne" ? "विवाह फोटोग्राफी" : "Wedding Photography",
      category: "events-hospitality",
      categoryName:
        language === "ne" ? "कार्यक्रम र आतिथ्य" : "Events & Hospitality",
      rating: 5.0,
      reviews: 78,
      price: language === "ne" ? "रू २५,०००/कार्यक्रम" : "Rs 25,000/event",
      location: language === "ne" ? "काठमाडौं" : "Kathmandu",
      image: "📸",
      badge: language === "ne" ? "प्रिमियम" : "Premium",
      responseTime: language === "ne" ? "२ घण्टा" : "2 hours",
      completedJobs: 89,
      isVerified: true,
      availability: language === "ne" ? "उपलब्ध" : "Available",
      description:
        language === "ne"
          ? "परम्परागत र आधुनिक विवाह फोटोग्राफी"
          : "Traditional and modern wedding photography",
    },
  ];

  // Filter providers based on search criteria
  const filteredProviders = allProviders.filter((provider) => {
    const matchesSearch =
      !searchQuery ||
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation = !location || provider.location.includes(location);
    const matchesCategory =
      !selectedCategory || provider.category === selectedCategory;

    return matchesSearch && matchesLocation && matchesCategory;
  });

  // Sort providers
  const sortedProviders = [...filteredProviders].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "price":
        return (
          parseInt(a.price.replace(/[^\d]/g, "")) -
          parseInt(b.price.replace(/[^\d]/g, ""))
        );
      case "reviews":
        return b.reviews - a.reviews;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Search Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            {t("findServices.title")}
          </h1>

          {/* Search Bar */}
          <div className="bg-white rounded-xl p-6 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t("findServices.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{t("findServices.allLocations")}</option>
                  {MAJOR_CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{t("findServices.allCategories")}</option>
                {SERVICE_CATEGORIES.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <Button className="bg-blue-600 hover:bg-blue-700 py-3">
                <Search className="h-5 w-5 mr-2" />
                {t("findServices.search")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t("findServices.results")} ({sortedProviders.length})
              </h2>
              <p className="text-gray-600">
                {searchQuery &&
                  `${t("findServices.searchingFor")} "${searchQuery}"`}
                {location && ` ${t("findServices.in")} ${location}`}
              </p>
            </div>

            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="rating">{t("findServices.sortByRating")}</option>
                <option value="price">{t("findServices.sortByPrice")}</option>
                <option value="reviews">
                  {t("findServices.sortByReviews")}
                </option>
              </select>

              {/* View Mode */}
              <div className="flex border rounded-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-blue-500 text-white" : "text-gray-600"}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-blue-500 text-white" : "text-gray-600"}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Providers Grid */}
          {sortedProviders.length > 0 ? (
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {sortedProviders.map((provider) => {
                const categoryColors =
                  CATEGORY_COLORS[
                    provider.category as keyof typeof CATEGORY_COLORS
                  ];
                return (
                  <Card
                    key={provider.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <div className="relative">
                      {/* Badge */}
                      <div
                        className={`absolute top-0 right-0 px-3 py-1 rounded-bl-lg text-white text-xs font-bold ${categoryColors?.accent}`}
                      >
                        {provider.badge}
                      </div>

                      {/* Verified Badge */}
                      {provider.isVerified && (
                        <div className="absolute top-0 left-0 p-2">
                          <Shield className="h-5 w-5 text-green-500" />
                        </div>
                      )}

                      <div
                        className={`flex ${viewMode === "list" ? "flex-row items-center" : "flex-col"}`}
                      >
                        {/* Provider Info */}
                        <div
                          className={`${viewMode === "list" ? "flex items-center flex-1" : ""}`}
                        >
                          <div
                            className={`text-4xl ${viewMode === "list" ? "mr-4" : "text-center mb-4"}`}
                          >
                            {provider.image}
                          </div>

                          <div
                            className={`${viewMode === "list" ? "flex-1" : ""}`}
                          >
                            <h3
                              className={`text-xl font-bold text-gray-900 mb-1 ${viewMode === "grid" ? "text-center" : ""}`}
                            >
                              {provider.name}
                            </h3>
                            <p
                              className={`text-gray-600 font-medium mb-2 ${viewMode === "grid" ? "text-center" : ""}`}
                            >
                              {provider.service}
                            </p>
                            <p
                              className={`text-sm text-gray-500 mb-4 ${viewMode === "grid" ? "text-center" : ""}`}
                            >
                              {provider.description}
                            </p>
                          </div>
                        </div>

                        {/* Stats */}
                        <div
                          className={`${viewMode === "list" ? "w-1/3" : ""}`}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(provider.rating)
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="ml-2 font-bold text-gray-900">
                                {provider.rating}
                              </span>
                              <span className="ml-1 text-gray-500">
                                ({provider.reviews})
                              </span>
                            </div>
                            <div className="text-xl font-bold text-blue-600">
                              {provider.price}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                            <div className="flex items-center text-gray-500">
                              <MapPin className="h-4 w-4 mr-1" />
                              {provider.location}
                            </div>
                            <div className="flex items-center text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              {provider.responseTime}
                            </div>
                            <div className="flex items-center text-gray-500">
                              <TrendingUp className="h-4 w-4 mr-1" />
                              {provider.completedJobs} {t("common.jobs")}
                            </div>
                            <div
                              className={`flex items-center ${
                                provider.availability === "Available" ||
                                provider.availability === "उपलब्ध"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              <div
                                className={`h-2 w-2 rounded-full mr-2 ${
                                  provider.availability === "Available" ||
                                  provider.availability === "उपलब्ध"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                              ></div>
                              {provider.availability}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex space-x-3">
                            <Link
                              href={`/provider/${provider.id}`}
                              className="flex-1"
                            >
                              <Button variant="outline" className="w-full">
                                {t("common.viewProfile")}
                              </Button>
                            </Link>
                            <Link
                              href={`/booking/new?provider=${provider.id}`}
                              className="flex-1"
                            >
                              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                {t("common.bookNow")}
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t("findServices.noResults")}
              </h3>
              <p className="text-gray-600 mb-6">
                {t("findServices.noResultsDesc")}
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setLocation("");
                  setSelectedCategory("");
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {t("findServices.clearFilters")}
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function FindServicesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🔍</div>
            <div className="text-xl font-semibold text-gray-600">
              Loading services...
            </div>
          </div>
        </div>
      }
    >
      <FindServicesContent />
    </Suspense>
  );
}
