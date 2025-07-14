"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import ProviderProfileForm from "@/components/forms/ProviderProfileForm";
import {
  User,
  Briefcase,
  Star,
  TrendingUp,
  DollarSign,
  Calendar,
  Shield,
  Award,
  Camera,
  Edit,
  Save,
  Eye,
  ExternalLink,
} from "lucide-react";

export default function ProviderProfileManagementPage() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState("profile");

  const providerStats = {
    totalEarnings: 125600,
    completedJobs: 87,
    averageRating: 4.8,
    totalReviews: 64,
    responseRate: 96,
    repeatCustomers: 45,
    thisMonthBookings: 12,
    thisMonthEarnings: 18500,
  };

  const content = {
    ne: {
      profile: "प्रोफाइल",
      overview: "सिंहावलोकन",
      editProfile: "प्रोफाइल सम्पादन",
      analytics: "एनालिटिक्स",
      portfolio: "पोर्टफोलियो",
      settings: "सेटिङ्स",
      viewPublicProfile: "सार्वजनिक प्रोफाइल हेर्नुहोस्",
      profileCompletion: "प्रोफाइल पूर्णता",
      completeProfile: "प्रोफाइल पूरा गर्नुहोस्",
      profileStats: "प्रोफाइल तथ्याङ्क",
      totalEarnings: "कुल आम्दानी",
      completedJobs: "सम्पन्न कामहरू",
      averageRating: "औसत रेटिङ",
      totalReviews: "कुल समीक्षाहरू",
      responseRate: "प्रतिक्रिया दर",
      repeatCustomers: "दोहोरिने ग्राहकहरू",
      thisMonth: "यो महिना",
      bookings: "बुकिङहरू",
      earnings: "आम्दानी",
      profileTips: "प्रो���ाइल सुधारका सुझावहरू",
      tip1: "आफ्नो प्रोफाइल फोटो थप्नुहोस्",
      tip2: "सेवाको विस्तृत विवरण लेख्नुहोस्",
      tip3: "पोर्टफोलियो उदाहरणहरू अपलोड गर्नुहोस्",
      tip4: "काम गर्ने समय अपडेट गर्नुहोस्",
      recentActivity: "हालका गतिविधिहरू",
      profileViews: "प्रोफाइल हेरिएको",
      newMessages: "नयाँ सन्देशहरू",
      pendingBookings: "बाँकी बुकिङहरू",
    },
    en: {
      profile: "Profile",
      overview: "Overview",
      editProfile: "Edit Profile",
      analytics: "Analytics",
      portfolio: "Portfolio",
      settings: "Settings",
      viewPublicProfile: "View Public Profile",
      profileCompletion: "Profile Completion",
      completeProfile: "Complete Profile",
      profileStats: "Profile Statistics",
      totalEarnings: "Total Earnings",
      completedJobs: "Completed Jobs",
      averageRating: "Average Rating",
      totalReviews: "Total Reviews",
      responseRate: "Response Rate",
      repeatCustomers: "Repeat Customers",
      thisMonth: "This Month",
      bookings: "Bookings",
      earnings: "Earnings",
      profileTips: "Profile Improvement Tips",
      tip1: "Add your profile photo",
      tip2: "Write detailed service descriptions",
      tip3: "Upload portfolio examples",
      tip4: "Update your working hours",
      recentActivity: "Recent Activity",
      profileViews: "Profile Views",
      newMessages: "New Messages",
      pendingBookings: "Pending Bookings",
    },
  };

  const currentContent = content[language];

  const tabs = [
    { id: "overview", label: currentContent.overview, icon: TrendingUp },
    { id: "profile", label: currentContent.editProfile, icon: User },
    { id: "analytics", label: currentContent.analytics, icon: TrendingUp },
    { id: "portfolio", label: currentContent.portfolio, icon: Camera },
    { id: "settings", label: currentContent.settings, icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {currentContent.profile}
            </h1>
            <p className="mt-1 text-gray-500">
              Manage your provider profile and settings
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              {currentContent.viewPublicProfile}
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
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
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        {currentContent.totalEarnings}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        रू {providerStats.totalEarnings.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        {currentContent.completedJobs}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {providerStats.completedJobs}
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
                        {currentContent.averageRating}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {providerStats.averageRating}/5
                      </p>
                      <p className="text-xs text-gray-500">
                        {providerStats.totalReviews} reviews
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        {currentContent.responseRate}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {providerStats.responseRate}%
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* This Month Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {currentContent.thisMonth} {currentContent.earnings}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">New Bookings</span>
                      <span className="font-medium">
                        {providerStats.thisMonthBookings}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Earnings</span>
                      <span className="font-medium">
                        रू {providerStats.thisMonthEarnings.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Repeat Customers</span>
                      <span className="font-medium">
                        {providerStats.repeatCustomers}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {currentContent.profileTips}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                      <span className="text-sm text-gray-600">
                        {currentContent.tip1}
                      </span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                      <span className="text-sm text-gray-600">
                        {currentContent.tip2}
                      </span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                      <span className="text-sm text-gray-600">
                        {currentContent.tip3}
                      </span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                      <span className="text-sm text-gray-600">
                        {currentContent.tip4}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Profile Completion */}
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {currentContent.profileCompletion}
                  </h3>
                  <span className="text-sm text-gray-500">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Complete your profile to get more bookings and better
                  visibility.
                </p>
                <Button variant="outline" size="sm">
                  {currentContent.completeProfile}
                </Button>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "profile" && (
          <div>
            <ProviderProfileForm isEditing={true} />
          </div>
        )}

        {activeTab === "analytics" && (
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {currentContent.analytics}
              </h2>
              <div className="text-center py-12">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Detailed analytics will be displayed here
                </p>
              </div>
            </div>
          </Card>
        )}

        {activeTab === "portfolio" && (
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {currentContent.portfolio}
              </h2>
              <div className="text-center py-12">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Portfolio management will be displayed here
                </p>
              </div>
            </div>
          </Card>
        )}

        {activeTab === "settings" && (
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {currentContent.settings}
              </h2>
              <div className="text-center py-12">
                <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Account settings will be displayed here
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
