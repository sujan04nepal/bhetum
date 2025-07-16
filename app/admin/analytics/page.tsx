"use client";

import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Calendar,
  MapPin,
  Star,
  Package,
  Download,
  Filter,
  RefreshCw,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AnalyticsPage() {
  const { language } = useLanguage();
  const [timeRange, setTimeRange] = useState("7d");
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  // Mock analytics data
  const overviewStats = [
    {
      title: language === "ne" ? "कुल राजस्व" : "Total Revenue",
      value: "रू 2,45,890",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: language === "ne" ? "कुल बुकिङहरू" : "Total Bookings",
      value: "3,247",
      change: "+8.2%",
      trend: "up",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: language === "ne" ? "सक्रिय प्रयोगकर्ताहरू" : "Active Users",
      value: "8,923",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: language === "ne" ? "औसत रेटिङ" : "Average Rating",
      value: "4.8",
      change: "+0.2",
      trend: "up",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

  const revenueData = [
    { month: "Jan", revenue: 45000, bookings: 245 },
    { month: "Feb", revenue: 52000, bookings: 289 },
    { month: "Mar", revenue: 48000, bookings: 267 },
    { month: "Apr", revenue: 61000, bookings: 334 },
    { month: "May", revenue: 55000, bookings: 298 },
    { month: "Jun", revenue: 67000, bookings: 356 },
    { month: "Jul", revenue: 72000, bookings: 389 },
  ];

  const categoryData = [
    {
      category: language === "ne" ? "घर सरसफाई" : "House Cleaning",
      bookings: 892,
      revenue: 67890,
      growth: 12.5,
    },
    {
      category: language === "ne" ? "शिक्षण" : "Education",
      bookings: 654,
      revenue: 45670,
      growth: 8.3,
    },
    {
      category: language === "ne" ? "डिजिटल सेवाहरू" : "Digital Services",
      bookings: 445,
      revenue: 89450,
      growth: 25.7,
    },
    {
      category: language === "ne" ? "स्वास्थ्य" : "Health & Wellness",
      bookings: 334,
      revenue: 34560,
      growth: 15.2,
    },
  ];

  const geographicData = [
    {
      location: language === "ne" ? "काठमाडौं" : "Kathmandu",
      percentage: 45.2,
      users: 4032,
    },
    {
      location: language === "ne" ? "पोखरा" : "Pokhara",
      percentage: 18.7,
      users: 1669,
    },
    {
      location: language === "ne" ? "ललितपुर" : "Lalitpur",
      percentage: 12.3,
      users: 1098,
    },
    {
      location: language === "ne" ? "भक्तपुर" : "Bhaktapur",
      percentage: 8.9,
      users: 794,
    },
    {
      location: language === "ne" ? "अन्य" : "Others",
      percentage: 14.9,
      users: 1330,
    },
  ];

  const topProviders = [
    {
      name: language === "ne" ? "राम शर्मा" : "Ram Sharma",
      category: language === "ne" ? "घर सरसफाई" : "House Cleaning",
      earnings: 45600,
      rating: 4.9,
      jobs: 78,
    },
    {
      name: language === "ne" ? "सीता पौडेल" : "Sita Poudel",
      category: language === "ne" ? "शिक्षण" : "Education",
      earnings: 38900,
      rating: 4.8,
      jobs: 65,
    },
    {
      name: language === "ne" ? "माया तामाङ" : "Maya Tamang",
      category: language === "ne" ? "डिजिटल सेवाहरू" : "Digital Services",
      earnings: 67800,
      rating: 4.7,
      jobs: 34,
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {language === "ne" ? "विश्लेषण" : "Analytics"}
            </h1>
            <p className="text-gray-600 mt-1">
              {language === "ne"
                ? "प्लेटफर्मको प्रदर्शन र तथ्याङ्कहरू हेर्नुहोस्"
                : "View platform performance and insights"}
            </p>
          </div>
          <div className="flex space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="24h">
                {language === "ne" ? "पछिल्लो २४ घण्टा" : "Last 24 hours"}
              </option>
              <option value="7d">
                {language === "ne" ? "पछिल्लो ७ दिन" : "Last 7 days"}
              </option>
              <option value="30d">
                {language === "ne" ? "पछिल्लो ३० दिन" : "Last 30 days"}
              </option>
              <option value="90d">
                {language === "ne" ? "पछिल्लो ९० दिन" : "Last 90 days"}
              </option>
            </select>
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
              />
              {language === "ne" ? "रिफ्रेश" : "Refresh"}
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              {language === "ne" ? "निर्यात" : "Export"}
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {overviewStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <div className="flex items-center mt-1">
                      {stat.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span
                        className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === "ne" ? "राजस्व ट्रेन्ड" : "Revenue Trend"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {/* Simplified chart representation */}
              <div className="h-full flex items-end space-x-4 p-4">
                {revenueData.map((data, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div
                      className="w-full bg-blue-500 rounded-t-lg mb-2 relative group cursor-pointer hover:bg-blue-600 transition-colors"
                      style={{
                        height: `${(data.revenue / Math.max(...revenueData.map((d) => d.revenue))) * 250}px`,
                        minHeight: "20px",
                      }}
                    >
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        रू {data.revenue.toLocaleString()}
                      </div>
                    </div>
                    <span className="text-xs text-gray-600">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Performance */}
          <Card>
            <CardHeader>
              <CardTitle>
                {language === "ne" ? "श्रेणी प्रदर्शन" : "Category Performance"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryData.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {category.category}
                      </h4>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-600">
                          {category.bookings}{" "}
                          {language === "ne" ? "बुकिङहरू" : "bookings"}
                        </span>
                        <span className="text-sm text-gray-600">
                          रू {category.revenue.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-600 font-medium">
                          +{category.growth}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Geographic Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>
                {language === "ne"
                  ? "भौगोलिक वितरण"
                  : "Geographic Distribution"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {geographicData.map((location, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {location.location}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${location.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12 text-right">
                        {location.percentage}%
                      </span>
                      <span className="text-sm text-gray-500 w-16 text-right">
                        {location.users}{" "}
                        {language === "ne" ? "प्रयोगकर्ता" : "users"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === "ne" ? "शीर्ष प्रदायकहरू" : "Top Performers"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {language === "ne" ? "प्रदायक" : "Provider"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {language === "ne" ? "श्रेणी" : "Category"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {language === "ne" ? "आम्दानी" : "Earnings"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {language === "ne" ? "रेटिङ" : "Rating"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {language === "ne" ? "कामहरू" : "Jobs"}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topProviders.map((provider, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-blue-600 font-medium text-sm">
                              {provider.name.charAt(0)}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {provider.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {provider.category}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        रू {provider.earnings.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm text-gray-900">
                            {provider.rating}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {provider.jobs}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
