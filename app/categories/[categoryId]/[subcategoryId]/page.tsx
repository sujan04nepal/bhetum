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
  TrendingUp,
  DollarSign,
  Shield,
  Award,
  Search,
  Filter,
  BarChart3,
  Calendar,
  CheckCircle,
  Eye,
} from "lucide-react";

interface SubcategoryPageProps {
  params: {
    categoryId: string;
    subcategoryId: string;
  };
}

// Generate static paths for all category/subcategory combinations
export function generateStaticParams() {
  const params: { categoryId: string; subcategoryId: string }[] = [];

  SERVICE_CATEGORIES.forEach((category) => {
    category.subcategories.forEach((subcategory) => {
      params.push({
        categoryId: category.id,
        subcategoryId: subcategory.id,
      });
    });
  });

  return params;
}

export default function SubcategoryDetailPage({
  params,
}: SubcategoryPageProps) {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");

  const content = {
    ne: {
      backToCategory: "श्रेणीमा फर्किनुहोस्",
      overview: "सिंहावलोकन",
      providers: "सेवा प्रदायकहरू",
      analytics: "विश्लेषण",
      totalProviders: "कुल सेवा प्रदायकहरू",
      activeProviders: "सक्रिय प्रदायकहरू",
      avgRating: "औसत रेटिङ",
      avgPrice: "औसत मूल्य",
      responseTime: "प्रतिक्रिया समय",
      completionRate: "पूर्णता दर",
      viewAllProviders: "सबै प्रदायकहरू हेर्नुहोस्",
      topRated: "उच्च रेटिङ",
      mostActive: "सबैभन्दा सक्रिय",
      quickest: "सबै��न्दा छिटो",
      affordable: "किफायती",
      verified: "प्रमाणित",
      recentBookings: "हालका बुकिङहरू",
      popularTimes: "लोकप्रिय समय",
      priceRange: "मूल्य दायरा",
      serviceAreas: "सेवा क्षेत्रहरू",
    },
    en: {
      backToCategory: "Back to Category",
      overview: "Overview",
      providers: "Providers",
      analytics: "Analytics",
      totalProviders: "Total Providers",
      activeProviders: "Active Providers",
      avgRating: "Average Rating",
      avgPrice: "Average Price",
      responseTime: "Response Time",
      completionRate: "Completion Rate",
      viewAllProviders: "View All Providers",
      topRated: "Top Rated",
      mostActive: "Most Active",
      quickest: "Quickest",
      affordable: "Most Affordable",
      verified: "Verified",
      recentBookings: "Recent Bookings",
      popularTimes: "Popular Times",
      priceRange: "Price Range",
      serviceAreas: "Service Areas",
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

  // Mock detailed data for this subcategory
  const subcategoryData = {
    totalProviders: 45,
    activeProviders: 38,
    avgRating: 4.7,
    avgPrice: 1250,
    avgResponseTime: "2h",
    completionRate: 94,
    totalBookings: 1247,
    topProviders: [
      {
        id: "1",
        name: "राम श्रेष्ठ",
        rating: 4.9,
        reviews: 127,
        completedJobs: 256,
        responseTime: "1h",
        price: 1200,
        location: "काठमाडौं",
        isVerified: true,
        isOnline: true,
      },
      {
        id: "2",
        name: "सीता गुरुंग",
        rating: 4.8,
        reviews: 89,
        completedJobs: 178,
        responseTime: "30m",
        price: 1100,
        location: "ललितपुर",
        isVerified: true,
        isOnline: false,
      },
      {
        id: "3",
        name: "हरि तामाङ",
        rating: 4.7,
        reviews: 156,
        completedJobs: 298,
        responseTime: "2h",
        price: 1350,
        location: "भक्तपुर",
        isVerified: true,
        isOnline: true,
      },
    ],
    popularTimes: [
      { time: "9:00 AM", bookings: 45 },
      { time: "10:00 AM", bookings: 67 },
      { time: "2:00 PM", bookings: 89 },
      { time: "3:00 PM", bookings: 72 },
      { time: "4:00 PM", bookings: 56 },
    ],
    serviceAreas: [
      { area: "काठमाडौं", providers: 18, percentage: 40 },
      { area: "ललितपुर", providers: 12, percentage: 27 },
      { area: "भक्तपुर", providers: 8, percentage: 18 },
      { area: "अन्य", providers: 7, percentage: 15 },
    ],
    priceDistribution: [
      { range: "रू 800-1000", count: 12 },
      { range: "रू 1000-1200", count: 18 },
      { range: "रू 1200-1500", count: 10 },
      { range: "रू 1500+", count: 5 },
    ],
  };

  const tabs = [
    { id: "overview", label: currentContent.overview, icon: BarChart3 },
    { id: "providers", label: currentContent.providers, icon: Users },
    { id: "analytics", label: currentContent.analytics, icon: TrendingUp },
  ];

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
          <span className="text-gray-900">{subcategory.name}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {subcategory.name}
              </h1>
              <p className="text-xl text-gray-600">
                Find the best {subcategory.name.toLowerCase()} professionals in
                Nepal
              </p>
            </div>
            <Link
              href={`/categories/${category.id}/${subcategory.id}/providers`}
            >
              <Button size="lg">
                <Users className="w-5 h-5 mr-2" />
                {currentContent.viewAllProviders}
              </Button>
            </Link>
          </div>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {currentContent.totalProviders}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {subcategoryData.totalProviders}
                  </p>
                  <p className="text-xs text-green-600">
                    {subcategoryData.activeProviders}{" "}
                    {currentContent.activeProviders}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {currentContent.avgRating}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {subcategoryData.avgRating}/5
                  </p>
                  <p className="text-xs text-gray-500">
                    Based on 1,200+ reviews
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {currentContent.avgPrice}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    रू {subcategoryData.avgPrice}
                  </p>
                  <p className="text-xs text-gray-500">Per service</p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {currentContent.responseTime}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {subcategoryData.avgResponseTime}
                  </p>
                  <p className="text-xs text-gray-500">Average response</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Top Providers */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {currentContent.topRated} {currentContent.providers}
                </h2>
                <Link
                  href={`/categories/${category.id}/${subcategory.id}/providers`}
                >
                  <Button variant="outline">
                    {currentContent.viewAllProviders}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {subcategoryData.topProviders.map((provider) => (
                  <Link key={provider.id} href={`/provider/${provider.id}`}>
                    <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                            {provider.name.charAt(0)}
                          </div>
                          <div className="ml-3 flex-1">
                            <div className="flex items-center">
                              <h3 className="font-semibold text-gray-900">
                                {provider.name}
                              </h3>
                              {provider.isVerified && (
                                <Shield className="w-4 h-4 text-green-500 ml-2" />
                              )}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="w-3 h-3 mr-1" />
                              {provider.location}
                              <div
                                className={`w-2 h-2 rounded-full ml-2 ${provider.isOnline ? "bg-green-400" : "bg-gray-400"}`}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Rating</span>
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
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">
                              Completed Jobs
                            </span>
                            <span className="font-medium">
                              {provider.completedJobs}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Response Time</span>
                            <span className="font-medium">
                              {provider.responseTime}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">
                              Starting Price
                            </span>
                            <span className="font-medium">
                              रू {provider.price}
                            </span>
                          </div>
                        </div>

                        <Button className="w-full" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Profile
                        </Button>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Service Areas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {currentContent.serviceAreas}
                  </h3>
                  <div className="space-y-4">
                    {subcategoryData.serviceAreas.map((area, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900">
                              {area.area}
                            </span>
                            <span className="text-sm text-gray-500">
                              {area.providers} providers
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${area.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {currentContent.priceRange}
                  </h3>
                  <div className="space-y-3">
                    {subcategoryData.priceDistribution.map((range, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-gray-600">
                          {range.range}
                        </span>
                        <div className="flex items-center">
                          <div className="w-20 bg-gray-200 rounded-full h-2 mr-3">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${(range.count / 45) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {range.count}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "providers" && (
          <Card>
            <div className="p-6">
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Provider List
                </h3>
                <p className="text-gray-500 mb-4">
                  Detailed provider list will be shown here with advanced
                  filtering options
                </p>
                <Link
                  href={`/categories/${category.id}/${subcategory.id}/providers`}
                >
                  <Button>{currentContent.viewAllProviders}</Button>
                </Link>
              </div>
            </div>
          </Card>
        )}

        {activeTab === "analytics" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {currentContent.popularTimes}
                </h3>
                <div className="space-y-3">
                  {subcategoryData.popularTimes.map((time, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-gray-600">{time.time}</span>
                      <div className="flex items-center">
                        <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(time.bookings / 89) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {time.bookings}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Performance Metrics
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {currentContent.completionRate}
                    </span>
                    <span className="text-2xl font-bold text-green-600">
                      {subcategoryData.completionRate}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Total Bookings
                    </span>
                    <span className="text-2xl font-bold text-gray-900">
                      {subcategoryData.totalBookings.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Customer Satisfaction
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      96%
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
