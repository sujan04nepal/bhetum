"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import {
  ArrowLeft,
  Search,
  Filter,
  ChevronRight,
  Users,
  Star,
  Clock,
  MapPin,
  TrendingUp,
  Grid,
  List,
} from "lucide-react";

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
}

// Generate static paths for all categories
export function generateStaticParams() {
  return SERVICE_CATEGORIES.map((category) => ({
    categoryId: category.id,
  }));
}

export default function CategorySubcategoriesPage({
  params,
}: CategoryPageProps) {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const content = {
    ne: {
      backToCategories: "श्रेणीहरूमा फर्किनुहोस्",
      subcategories: "उप-श्रेणीहरू",
      searchPlaceholder: "���प-श्रेणी खोज्नुहोस्...",
      sortBy: "क्रमबद्ध गर्नुहोस्",
      popular: "लोकप्रिय",
      alphabetical: "वर्णमाला अनुसार",
      newest: "नयाँ",
      providers: "सेवा प्रदायकहरू",
      avgRating: "औसत रेटिङ",
      availableNow: "अहिले उपलब्ध",
      viewProviders: "प्रदायकहरू हेर्नुहोस्",
      exploreSubcategory: "यो श्रेणी अन्वेषण गर्नुहोस्",
      responseTime: "प्रतिक्रिया समय",
      featured: "विशेष",
    },
    en: {
      backToCategories: "Back to Categories",
      subcategories: "Subcategories",
      searchPlaceholder: "Search subcategories...",
      sortBy: "Sort By",
      popular: "Popular",
      alphabetical: "Alphabetical",
      newest: "Newest",
      providers: "Providers",
      avgRating: "Avg Rating",
      availableNow: "Available Now",
      viewProviders: "View Providers",
      exploreSubcategory: "Explore Subcategory",
      responseTime: "Response Time",
      featured: "Featured",
    },
  };

  const currentContent = content[language];

  // Find the category
  const category = SERVICE_CATEGORIES.find(
    (cat) => cat.id === params.categoryId,
  );

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Category Not Found
          </h1>
          <Link href="/categories">
            <Button>Back to Categories</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Mock provider data for each subcategory
  const subcategoryStats: Record<
    string,
    {
      providers: number;
      avgRating: number;
      availableNow: number;
      avgResponseTime: string;
      featured: boolean;
    }
  > = {
    "freelance-writing": {
      providers: 45,
      avgRating: 4.7,
      availableNow: 12,
      avgResponseTime: "2h",
      featured: true,
    },
    "social-media": {
      providers: 38,
      avgRating: 4.8,
      availableNow: 8,
      avgResponseTime: "1h",
      featured: true,
    },
    "seo-consulting": {
      providers: 23,
      avgRating: 4.6,
      availableNow: 5,
      avgResponseTime: "3h",
      featured: false,
    },
    "email-marketing": {
      providers: 19,
      avgRating: 4.5,
      availableNow: 3,
      avgResponseTime: "4h",
      featured: false,
    },
    "graphic-design": {
      providers: 67,
      avgRating: 4.9,
      availableNow: 15,
      avgResponseTime: "1h",
      featured: true,
    },
    "ui-ux-design": {
      providers: 34,
      avgRating: 4.8,
      availableNow: 9,
      avgResponseTime: "2h",
      featured: true,
    },
    "video-editing": {
      providers: 29,
      avgRating: 4.7,
      availableNow: 6,
      avgResponseTime: "3h",
      featured: false,
    },
    "web-development": {
      providers: 56,
      avgRating: 4.9,
      availableNow: 12,
      avgResponseTime: "1h",
      featured: true,
    },
    "mobile-app": {
      providers: 23,
      avgRating: 4.6,
      availableNow: 4,
      avgResponseTime: "4h",
      featured: false,
    },
    "data-entry": {
      providers: 41,
      avgRating: 4.4,
      availableNow: 18,
      avgResponseTime: "30m",
      featured: false,
    },
    "virtual-assistant": {
      providers: 33,
      avgRating: 4.6,
      availableNow: 11,
      avgResponseTime: "1h",
      featured: false,
    },
    "ecommerce-setup": {
      providers: 18,
      avgRating: 4.8,
      availableNow: 3,
      avgResponseTime: "2h",
      featured: false,
    },
    "online-tutoring": {
      providers: 25,
      avgRating: 4.7,
      availableNow: 7,
      avgResponseTime: "1h",
      featured: false,
    },
    "digital-marketing": {
      providers: 31,
      avgRating: 4.5,
      availableNow: 8,
      avgResponseTime: "2h",
      featured: false,
    },
    translation: {
      providers: 22,
      avgRating: 4.6,
      availableNow: 5,
      avgResponseTime: "3h",
      featured: false,
    },
  };

  const filteredSubcategories = category.subcategories.filter((sub) =>
    sub.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sortedSubcategories = [...filteredSubcategories].sort((a, b) => {
    const aStats = subcategoryStats[a.id] || {
      providers: 0,
      avgRating: 0,
      availableNow: 0,
    };
    const bStats = subcategoryStats[b.id] || {
      providers: 0,
      avgRating: 0,
      availableNow: 0,
    };

    switch (sortBy) {
      case "alphabetical":
        return a.name.localeCompare(b.name);
      case "providers":
        return bStats.providers - aStats.providers;
      case "rating":
        return bStats.avgRating - aStats.avgRating;
      default:
        return 0; // Keep original order for "popular"
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-8">
          <Link
            href="/categories"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {currentContent.backToCategories}
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900">{category.name}</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6">
            {category.icon}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {category.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore {category.subcategories.length} subcategories with{" "}
            {Object.values(subcategoryStats).reduce(
              (sum, stats) => sum + stats.providers,
              0,
            )}{" "}
            professional service providers
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
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
              <option value="popular">{currentContent.popular}</option>
              <option value="alphabetical">
                {currentContent.alphabetical}
              </option>
              <option value="providers">Most Providers</option>
              <option value="rating">Highest Rated</option>
            </select>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <Button
                variant={viewMode === "grid" ? "primary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "primary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Subcategories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {currentContent.featured} {currentContent.subcategories}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sortedSubcategories
              .filter((sub) => subcategoryStats[sub.id]?.featured)
              .slice(0, 3)
              .map((subcategory) => {
                const stats = subcategoryStats[subcategory.id] || {
                  providers: 0,
                  avgRating: 0,
                  availableNow: 0,
                  avgResponseTime: "N/A",
                  featured: false,
                };

                return (
                  <Link
                    key={subcategory.id}
                    href={`/categories/${category.id}/${subcategory.id}`}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group relative overflow-hidden">
                      <div className="absolute top-4 right-4 z-10">
                        <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          {currentContent.featured}
                        </span>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                          {subcategory.name}
                        </h3>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                            <div className="text-lg font-bold text-gray-900">
                              {stats.providers}
                            </div>
                            <div className="text-xs text-gray-500">
                              {currentContent.providers}
                            </div>
                          </div>
                          <div className="text-center p-3 bg-yellow-50 rounded-lg">
                            <Star className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
                            <div className="text-lg font-bold text-gray-900">
                              {stats.avgRating}
                            </div>
                            <div className="text-xs text-gray-500">
                              {currentContent.avgRating}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <span>
                              {stats.availableNow} {currentContent.availableNow}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{stats.avgResponseTime} avg</span>
                          </div>
                        </div>

                        <Button className="w-full" variant="outline">
                          {currentContent.viewProviders}
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </Card>
                  </Link>
                );
              })}
          </div>
        </div>

        {/* All Subcategories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            All {currentContent.subcategories}
          </h2>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedSubcategories.map((subcategory) => {
                const stats = subcategoryStats[subcategory.id] || {
                  providers: 0,
                  avgRating: 0,
                  availableNow: 0,
                  avgResponseTime: "N/A",
                  featured: false,
                };

                return (
                  <Link
                    key={subcategory.id}
                    href={`/categories/${category.id}/${subcategory.id}`}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors flex-1 mr-4">
                            {subcategory.name}
                          </h3>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-300" />
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              {currentContent.providers}
                            </span>
                            <span className="font-medium">
                              {stats.providers}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              {currentContent.avgRating}
                            </span>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 mr-1" />
                              <span className="font-medium">
                                {stats.avgRating}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              {currentContent.availableNow}
                            </span>
                            <span className="font-medium text-green-600">
                              {stats.availableNow}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedSubcategories.map((subcategory) => {
                const stats = subcategoryStats[subcategory.id] || {
                  providers: 0,
                  avgRating: 0,
                  availableNow: 0,
                  avgResponseTime: "N/A",
                  featured: false,
                };

                return (
                  <Link
                    key={subcategory.id}
                    href={`/categories/${category.id}/${subcategory.id}`}
                  >
                    <Card className="hover:shadow-md transition-shadow duration-300 cursor-pointer group">
                      <div className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-2">
                              {subcategory.name}
                            </h3>
                            <div className="grid grid-cols-4 gap-6 text-sm">
                              <div>
                                <span className="text-gray-500">
                                  {currentContent.providers}:{" "}
                                </span>
                                <span className="font-medium">
                                  {stats.providers}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-500">
                                  {currentContent.avgRating}:{" "}
                                </span>
                                <span className="font-medium">
                                  {stats.avgRating}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-500">
                                  {currentContent.availableNow}:{" "}
                                </span>
                                <span className="font-medium text-green-600">
                                  {stats.availableNow}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-500">
                                  {currentContent.responseTime}:{" "}
                                </span>
                                <span className="font-medium">
                                  {stats.avgResponseTime}
                                </span>
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
