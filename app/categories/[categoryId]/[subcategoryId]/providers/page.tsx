"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import {
  ArrowLeft,
  ChevronRight,
  Users,
  Star,
  Clock,
  MapPin,
  Search,
  Filter,
  Grid,
  List,
  Shield,
  Award,
  DollarSign,
  CheckCircle,
  MessageCircle,
  Phone,
  Eye,
  Heart,
  Calendar,
} from "lucide-react";

interface ProvidersListPageProps {
  params: {
    categoryId: string;
    subcategoryId: string;
  };
}

export default function ProvidersListPage({ params }: ProvidersListPageProps) {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState({
    location: "",
    priceRange: "",
    rating: "",
    availability: "",
  });

  const content = {
    ne: {
      backToSubcategory: "उप-श्रेणीमा फर्किनुहोस्",
      providers: "सेवा प्रदायकहरू",
      searchPlaceholder: "प्रदायकहरू खोज्नुहोस्...",
      sortBy: "क्रमबद्ध गर्नुहोस्",
      filterBy: "फिल्टर गर्नुहोस्",
      rating: "रेटिङ",
      price: "मूल्य",
      location: "स्थान",
      availability: "उपलब्धता",
      experience: "अनुभव",
      verified: "प्रमाणित",
      online: "अनलाइन",
      offline: "अफलाइन",
      viewProfile: "प्रोफाइल हेर्नुहोस्",
      bookNow: "बुक गर्नुहोस्",
      sendMessage: "सन्देश पठाउनुहोस्",
      callNow: "फोन गर्नुहोस्",
      startingFrom: "सुरुवात",
      completedJobs: "सम्पन्न कामहरू",
      responseTime: "प्रतिक्रिया समय",
      showingResults: "परिणामहरू देखाइँदै",
      clearFilters: "फिल्टर हटाउनुहोस्",
      noResults: "कुनै परिणाम फेला परेन",
      tryDifferent: "फरक खोजशब्द वा फिल्टर प्रयोग गर्नुहोस्",
    },
    en: {
      backToSubcategory: "Back to Subcategory",
      providers: "Providers",
      searchPlaceholder: "Search providers...",
      sortBy: "Sort By",
      filterBy: "Filter By",
      rating: "Rating",
      price: "Price",
      location: "Location",
      availability: "Availability",
      experience: "Experience",
      verified: "Verified",
      online: "Online",
      offline: "Offline",
      viewProfile: "View Profile",
      bookNow: "Book Now",
      sendMessage: "Send Message",
      callNow: "Call Now",
      startingFrom: "Starting from",
      completedJobs: "Completed Jobs",
      responseTime: "Response Time",
      showingResults: "Showing results",
      clearFilters: "Clear Filters",
      noResults: "No results found",
      tryDifferent: "Try different search terms or filters",
    },
  };

  const currentContent = content[language];

  // Find the category and subcategory
  const category = SERVICE_CATEGORIES.find(
    (cat) => cat.id === params.categoryId,
  );
  const subcategory = category?.subcategories.find(
    (sub) => sub.id === params.subcategoryId,
  );

  if (!category || !subcategory) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Subcategory Not Found
          </h1>
          <Link href="/categories">
            <Button>Back to Categories</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Mock providers data
  const providers = [
    {
      id: "1",
      name: "राम श्रेष्ठ",
      businessName: "राम टेक सर्भिसेस",
      rating: 4.9,
      reviews: 127,
      completedJobs: 256,
      responseTime: "1h",
      startingPrice: 1200,
      location: "काठमाडौं",
      isVerified: true,
      isOnline: true,
      phone: "+977-9841234567",
      specialties: ["वेब डिजाइन", "ग्राफिक्स", "UI/UX"],
      experience: "5+ years",
      languages: ["नेपाली", "English"],
      bio: "व्यावसायिक वेब डिजाइनर र ग्राफिक्स एक्सपर्ट। ५ वर्षको अनुभव।",
    },
    {
      id: "2",
      name: "सीता गुरुंग",
      businessName: "क्रिएटिभ डिजाइन स्टुडियो",
      rating: 4.8,
      reviews: 89,
      completedJobs: 178,
      responseTime: "30m",
      startingPrice: 1100,
      location: "ललितपुर",
      isVerified: true,
      isOnline: false,
      phone: "+977-9876543210",
      specialties: ["लोगो डिजाइन", "ब्रान्डिङ", "प्रिन्ट डिजाइन"],
      experience: "3+ years",
      languages: ["नेपाली", "English", "हिन्दी"],
      bio: "रचनात्मक डिजाइनर जसले ब्रान्डिङ र लोगो डिजाइनमा विशेषज्ञता छ।",
    },
    {
      id: "3",
      name: "हरि तामाङ",
      businessName: "डिजिटल सोल्युसन्स",
      rating: 4.7,
      reviews: 156,
      completedJobs: 298,
      responseTime: "2h",
      startingPrice: 1350,
      location: "भक्तपुर",
      isVerified: true,
      isOnline: true,
      phone: "+977-9812345678",
      specialties: ["मोबाइल एप", "वेब डेभलपमेन्ट", "डाटाबेस"],
      experience: "7+ years",
      languages: ["नेपाली", "English"],
      bio: "सिनियर सफ्टवेयर डेभलपर। मोबाइल एप र वेब डेभलपमेन्टमा एक्सपर्ट।",
    },
    {
      id: "4",
      name: "प्रिया शर्मा",
      businessName: "विजुअल आर्ट्स",
      rating: 4.6,
      reviews: 73,
      completedJobs: 142,
      responseTime: "3h",
      startingPrice: 950,
      location: "काठमाडौं",
      isVerified: false,
      isOnline: true,
      phone: "+977-9834567890",
      specialties: ["इलस्ट्रेसन", "एनिमेसन", "भिडियो एडिटिङ"],
      experience: "2+ years",
      languages: ["नेपाली", "English"],
      bio: "युवा डिजाइनर जसले इलस्ट्रेसन र एनिमेसनम�� काम गर्छे।",
    },
    {
      id: "5",
      name: "अनिल राई",
      businessName: "टेक इनोभेसन",
      rating: 4.5,
      reviews: 94,
      completedJobs: 203,
      responseTime: "1.5h",
      startingPrice: 1400,
      location: "पोखरा",
      isVerified: true,
      isOnline: false,
      phone: "+977-9823456789",
      specialties: ["ई-कमर्स", "डिजिटल मार्केटिङ", "SEO"],
      experience: "4+ years",
      languages: ["नेपाली", "English"],
      bio: "डिजिटल मार्केटिङ र ई-कमर्स विशेषज्ञ। व्यापार बढाउने एक्सपर्ट।",
    },
    {
      id: "6",
      name: "सुनिता लामा",
      businessName: "क्रिएटिभ माइन्ड",
      rating: 4.4,
      reviews: 61,
      completedJobs: 118,
      responseTime: "4h",
      startingPrice: 800,
      location: "चितवन",
      isVerified: false,
      isOnline: true,
      phone: "+977-9845678901",
      specialties: ["सोसल मिडिया", "कन्टेन्ट राइटिङ", "ब्लगिङ"],
      experience: "2+ years",
      languages: ["नेपाली", "English"],
      bio: "सोसल मिडिया र कन्टेन्ट मार्केटिङमा विशेषज्ञ युवा प्रतिभा।",
    },
  ];

  // Filter and sort providers
  const filteredProviders = providers.filter((provider) => {
    const matchesSearch =
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.specialties.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesLocation =
      !filters.location || provider.location === filters.location;
    const matchesRating =
      !filters.rating || provider.rating >= parseFloat(filters.rating);
    const matchesAvailability =
      !filters.availability ||
      (filters.availability === "online" && provider.isOnline) ||
      (filters.availability === "verified" && provider.isVerified);

    return (
      matchesSearch && matchesLocation && matchesRating && matchesAvailability
    );
  });

  const sortedProviders = [...filteredProviders].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "price":
        return a.startingPrice - b.startingPrice;
      case "experience":
        return b.completedJobs - a.completedJobs;
      case "response":
        return parseInt(a.responseTime) - parseInt(b.responseTime);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-8">
          <Link
            href="/categories"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Categories
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link
            href={`/categories/${category.id}`}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            {category.name}
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link
            href={`/categories/${category.id}/${subcategory.id}`}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            {subcategory.name}
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900">{currentContent.providers}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {subcategory.name} {currentContent.providers}
          </h1>
          <p className="text-xl text-gray-600">
            {currentContent.showingResults} {sortedProviders.length} of{" "}
            {providers.length} providers
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {currentContent.filterBy}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setFilters({
                        location: "",
                        priceRange: "",
                        rating: "",
                        availability: "",
                      })
                    }
                  >
                    {currentContent.clearFilters}
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Location Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {currentContent.location}
                    </label>
                    <select
                      value={filters.location}
                      onChange={(e) =>
                        setFilters({ ...filters, location: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">All Locations</option>
                      <option value="काठमाडौं">काठमाडौं</option>
                      <option value="ललितपुर">ललितपुर</option>
                      <option value="भक्तपुर">भक्तपुर</option>
                      <option value="पोखरा">पोखरा</option>
                      <option value="चितवन">चितवन</option>
                    </select>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum {currentContent.rating}
                    </label>
                    <select
                      value={filters.rating}
                      onChange={(e) =>
                        setFilters({ ...filters, rating: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Any Rating</option>
                      <option value="4.5">4.5+ Stars</option>
                      <option value="4.0">4.0+ Stars</option>
                      <option value="3.5">3.5+ Stars</option>
                    </select>
                  </div>

                  {/* Availability Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {currentContent.availability}
                    </label>
                    <select
                      value={filters.availability}
                      onChange={(e) =>
                        setFilters({ ...filters, availability: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">All Providers</option>
                      <option value="online">
                        {currentContent.online} Now
                      </option>
                      <option value="verified">
                        {currentContent.verified} Only
                      </option>
                    </select>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {currentContent.price} Range
                    </label>
                    <select
                      value={filters.priceRange}
                      onChange={(e) =>
                        setFilters({ ...filters, priceRange: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Any Price</option>
                      <option value="0-1000">रू 0 - 1,000</option>
                      <option value="1000-1500">रू 1,000 - 1,500</option>
                      <option value="1500+">रू 1,500+</option>
                    </select>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder={currentContent.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="rating">
                    Highest {currentContent.rating}
                  </option>
                  <option value="price">Lowest {currentContent.price}</option>
                  <option value="experience">
                    Most {currentContent.experience}
                  </option>
                  <option value="response">Fastest Response</option>
                </select>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results */}
            {sortedProviders.length === 0 ? (
              <Card>
                <div className="p-12 text-center">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {currentContent.noResults}
                  </h3>
                  <p className="text-gray-500">{currentContent.tryDifferent}</p>
                </div>
              </Card>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                    : "space-y-6"
                }
              >
                {sortedProviders.map((provider) => (
                  <Card
                    key={provider.id}
                    className="hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="p-6">
                      {/* Provider Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-medium">
                            {provider.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="flex items-center">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {provider.name}
                              </h3>
                              {provider.isVerified && (
                                <Shield className="w-4 h-4 text-green-500 ml-2" />
                              )}
                              <div
                                className={`w-2 h-2 rounded-full ml-2 ${provider.isOnline ? "bg-green-400" : "bg-gray-400"}`}
                              ></div>
                            </div>
                            <p className="text-gray-600">
                              {provider.businessName}
                            </p>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <MapPin className="w-3 h-3 mr-1" />
                              {provider.location}
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Bio */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {provider.bio}
                      </p>

                      {/* Specialties */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {provider.specialties
                          .slice(0, 3)
                          .map((specialty, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                            >
                              {specialty}
                            </span>
                          ))}
                        {provider.specialties.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">
                            +{provider.specialties.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">
                            {currentContent.rating}
                          </span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="font-medium">
                              {provider.rating}
                            </span>
                            <span className="text-gray-500 ml-1">
                              ({provider.reviews})
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">
                            {currentContent.completedJobs}
                          </span>
                          <span className="font-medium">
                            {provider.completedJobs}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">
                            {currentContent.responseTime}
                          </span>
                          <span className="font-medium">
                            {provider.responseTime}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">
                            {currentContent.startingFrom}
                          </span>
                          <span className="font-medium">
                            रू {provider.startingPrice}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col space-y-2">
                        <div className="flex space-x-2">
                          <Link
                            href={`/provider/${provider.id}`}
                            className="flex-1"
                          >
                            <Button
                              variant="outline"
                              className="w-full"
                              size="sm"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              {currentContent.viewProfile}
                            </Button>
                          </Link>
                          <Button className="flex-1" size="sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            {currentContent.bookNow}
                          </Button>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="flex-1">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            {currentContent.sendMessage}
                          </Button>
                          <Button variant="ghost" size="sm" className="flex-1">
                            <Phone className="w-4 h-4 mr-2" />
                            {currentContent.callNow}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Load More */}
            {sortedProviders.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline" size="lg">
                  Load More Providers
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
