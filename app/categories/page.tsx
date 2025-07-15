"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import {
  Search,
  Filter,
  ChevronRight,
  Users,
  Star,
  TrendingUp,
} from "lucide-react";

export default function CategoriesPage() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  const content = {
    ne: {
      title: "सेवा श्रेणीहरू",
      subtitle: "आफ्नो आवश्यकता अनुसार सेवाको श्रेणी चयन गर्नुहोस्",
      searchPlaceholder: "श्रेणी खोज्नुहोस्...",
      sortBy: "क्रमबद्ध गर्नुहोस्",
      popular: "लोकप्रिय",
      alphabetical: "वर्णमाला अनुसार",
      newest: "नयाँ",
      subcategories: "उप-श्रेणीहरू",
      providers: "सेवा प्रदायकहरू",
      viewSubcategories: "उप-श्रेणीहरू हेर्नुहोस्",
      browse: "ब्राउज गर्नुहोस्",
    },
    en: {
      title: "Service Categories",
      subtitle: "Choose a service category based on your needs",
      searchPlaceholder: "Search categories...",
      sortBy: "Sort By",
      popular: "Popular",
      alphabetical: "Alphabetical",
      newest: "Newest",
      subcategories: "Subcategories",
      providers: "Providers",
      viewSubcategories: "View Subcategories",
      browse: "Browse",
    },
  };

  const currentContent = content[language];

  // Mock provider counts for each category
  const categoryStats = {
    "digital-online": { providers: 342, subcategories: 15 },
    "trade-skilled": { providers: 567, subcategories: 12 },
    automotive: { providers: 123, subcategories: 6 },
    "creative-artisanal": { providers: 234, subcategories: 10 },
    "online-business": { providers: 189, subcategories: 8 },
    "teaching-coaching": { providers: 445, subcategories: 9 },
    "personal-care": { providers: 278, subcategories: 8 },
    "events-hospitality": { providers: 156, subcategories: 7 },
    "safety-tech": { providers: 89, subcategories: 5 },
    "niche-fun": { providers: 167, subcategories: 7 },
  };

  const filteredCategories = SERVICE_CATEGORIES.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sortedCategories = [...filteredCategories].sort((a, b) => {
    switch (sortBy) {
      case "alphabetical":
        return a.name.localeCompare(b.name);
      case "providers":
        return (
          (categoryStats[b.id as keyof typeof categoryStats]?.providers || 0) -
          (categoryStats[a.id as keyof typeof categoryStats]?.providers || 0)
        );
      default:
        return 0; // Keep original order for "popular"
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[{ label: language === "ne" ? "श्रेणीहरू" : "Categories" }]}
          className="mb-6"
        />
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {currentContent.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Search and Filters */}
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
              <option value="popular">{currentContent.popular}</option>
              <option value="alphabetical">
                {currentContent.alphabetical}
              </option>
              <option value="providers">Most Providers</option>
            </select>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCategories.map((category) => {
            const stats = categoryStats[
              category.id as keyof typeof categoryStats
            ] || { providers: 0, subcategories: 0 };

            return (
              <Link key={category.id} href={`/categories/${category.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                  <div className="p-6">
                    {/* Category Icon & Name */}
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-3xl mr-4 group-hover:scale-110 transition-transform duration-300">
                        {category.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {stats.subcategories} {currentContent.subcategories}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center mb-1">
                          <Users className="w-4 h-4 text-blue-600 mr-1" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          {stats.providers}
                        </div>
                        <div className="text-xs text-gray-500">
                          {currentContent.providers}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center mb-1">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          4.8
                        </div>
                        <div className="text-xs text-gray-500">Avg Rating</div>
                      </div>
                    </div>

                    {/* Popular Subcategories Preview */}
                    <div className="mb-4">
                      <div className="text-sm text-gray-600 mb-2">Popular:</div>
                      <div className="flex flex-wrap gap-1">
                        {category.subcategories.slice(0, 3).map((sub) => (
                          <span
                            key={sub.id}
                            className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                          >
                            {sub.name}
                          </span>
                        ))}
                        {category.subcategories.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">
                            +{category.subcategories.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action */}
                    <Button className="w-full" variant="outline">
                      {currentContent.viewSubcategories}
                    </Button>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Featured Categories */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Most Popular Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {sortedCategories
              .sort(
                (a, b) =>
                  (categoryStats[b.id as keyof typeof categoryStats]
                    ?.providers || 0) -
                  (categoryStats[a.id as keyof typeof categoryStats]
                    ?.providers || 0),
              )
              .slice(0, 4)
              .map((category) => {
                const stats = categoryStats[
                  category.id as keyof typeof categoryStats
                ] || { providers: 0, subcategories: 0 };

                return (
                  <Link key={category.id} href={`/categories/${category.id}`}>
                    <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                      <div className="text-3xl mb-2">{category.icon}</div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {stats.providers} providers
                      </p>
                    </Card>
                  </Link>
                );
              })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Can't find what you're looking for?
              </h2>
              <p className="text-gray-600 mb-6">
                Browse all services or contact us to add a new category
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">{currentContent.browse} All Services</Button>
                <Button variant="outline" size="lg">
                  Request New Category
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
