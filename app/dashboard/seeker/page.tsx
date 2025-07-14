"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  MapPin,
  Star,
  Calendar,
  Clock,
  MessageCircle,
  Settings,
  User,
  Bell,
  ChevronDown,
  Grid,
  List,
  Plus,
  Eye,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { SERVICE_CATEGORIES, CATEGORY_COLORS } from "@/lib/constants";

export default function SeekerDashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Mock data based on research of successful platforms
  const recentBookings = [
    {
      id: "1",
      service: "House Deep Cleaning",
      provider: {
        name: "Sarah Johnson",
        image: "👩‍💼",
        rating: 4.9,
      },
      date: "2024-01-15",
      time: "10:00 AM",
      status: "confirmed",
      price: "$85",
    },
    {
      id: "2",
      service: "Math Tutoring Session",
      provider: {
        name: "Mike Chen",
        image: "👨‍🏫",
        rating: 4.8,
      },
      date: "2024-01-18",
      time: "2:00 PM",
      status: "pending",
      price: "$35",
    },
    {
      id: "3",
      service: "Logo Design",
      provider: {
        name: "Emma Davis",
        image: "👩‍🎨",
        rating: 5.0,
      },
      date: "2024-01-12",
      time: "Completed",
      status: "completed",
      price: "$150",
    },
  ];

  const featuredProviders = [
    {
      id: "1",
      name: "Alex Rivera",
      service: "Web Development",
      category: "digital-online",
      rating: 4.9,
      reviews: 203,
      price: 75,
      image: "👨‍💻",
      badges: ["Top Rated", "Fast Response"],
      location: "Tech Hub",
      responseTime: "< 1 hour",
      completedJobs: 150,
    },
    {
      id: "2",
      name: "Lisa Wang",
      service: "Personal Training",
      category: "personal-care",
      rating: 4.8,
      reviews: 156,
      price: 45,
      image: "👩‍⚕️",
      badges: ["Certified", "Available Today"],
      location: "Fitness District",
      responseTime: "< 30 min",
      completedJobs: 89,
    },
    {
      id: "3",
      name: "David Kumar",
      service: "Photography",
      category: "events-hospitality",
      rating: 5.0,
      reviews: 78,
      price: 200,
      image: "📸",
      badges: ["Premium", "Wedding Expert"],
      location: "Studio District",
      responseTime: "< 2 hours",
      completedJobs: 45,
    },
    {
      id: "4",
      name: "Maria Garcia",
      service: "Home Cleaning",
      category: "trade-skilled",
      rating: 4.9,
      reviews: 234,
      price: 30,
      image: "🧹",
      badges: ["Eco-Friendly", "Insured"],
      location: "Downtown",
      responseTime: "< 15 min",
      completedJobs: 180,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-green-600 bg-green-50";
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      case "completed":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <AlertCircle className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <XCircle className="h-4 w-4" />;
    }
  };

  const navigationTabs = [
    { id: "home", label: "Home", icon: Grid3X3 },
    { id: "bookings", label: "My Bookings", icon: Calendar },
    { id: "messages", label: "Messages", icon: MessageCircle },
    { id: "more", label: "More", icon: ChevronDown },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Navigation */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold gradient-text">
                ServiceConnect
              </h1>
              <span className="ml-2 text-sm text-gray-500">
                Seeker Dashboard
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigationTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? "bg-primary-100 text-primary-700"
                      : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="relative">
                <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-primary-600 transition-colors">
                  <User className="h-5 w-5" />
                  <span className="hidden sm:block">John Doe</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <Grid3X3 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {showMobileMenu && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-2">
                {navigationTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setShowMobileMenu(false);
                    }}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? "bg-primary-100 text-primary-700"
                        : "text-gray-600 hover:text-primary-600"
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "home" && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-2">
                  Welcome back, John! 👋
                </h2>
                <p className="text-blue-100 text-lg mb-6">
                  Ready to find amazing services today?
                </p>
                <Button className="bg-white text-purple-600 hover:bg-gray-100 font-semibold">
                  <Plus className="h-5 w-5 mr-2" />
                  Post a New Request
                </Button>
              </div>
              <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-white/10"></div>
              <div className="absolute bottom-0 left-0 -mb-8 -ml-8 h-24 w-24 rounded-full bg-white/5"></div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="text-center p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
                <div className="text-gray-600">Total Bookings</div>
              </Card>
              <Card className="text-center p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">8</div>
                <div className="text-gray-600">Completed</div>
              </Card>
              <Card className="text-center p-6">
                <div className="text-3xl font-bold text-yellow-600 mb-2">2</div>
                <div className="text-gray-600">Pending</div>
              </Card>
              <Card className="text-center p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  4.8
                </div>
                <div className="text-gray-600">Avg Rating Given</div>
              </Card>
            </div>

            {/* Search & Filters */}
            <Card className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search for services or providers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  {SERVICE_CATEGORIES.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
                <Button variant="outline" className="flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </Button>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${viewMode === "grid" ? "bg-white shadow" : ""}`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${viewMode === "list" ? "bg-white shadow" : ""}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Featured Providers */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">
                  Featured Providers Near You
                </h3>
                <div
                  className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"}`}
                >
                  {featuredProviders.map((provider) => {
                    const categoryColors =
                      CATEGORY_COLORS[
                        provider.category as keyof typeof CATEGORY_COLORS
                      ];
                    return (
                      <Card
                        key={provider.id}
                        className="group hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              <div className="text-3xl mr-3">
                                {provider.image}
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">
                                  {provider.name}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {provider.service}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center text-yellow-400">
                              <Star className="h-4 w-4 fill-current" />
                              <span className="ml-1 text-sm font-medium text-gray-900">
                                {provider.rating}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-4">
                            {provider.badges.map((badge, index) => (
                              <span
                                key={index}
                                className={`text-xs px-2 py-1 rounded-full ${categoryColors?.bg} ${categoryColors?.text}`}
                              >
                                {badge}
                              </span>
                            ))}
                          </div>

                          <div className="space-y-2 mb-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2" />
                              {provider.location}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2" />
                              Responds {provider.responseTime}
                            </div>
                            <div className="flex items-center">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              {provider.completedJobs} jobs completed
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-xl font-bold text-primary-600">
                              ${provider.price}/hr
                            </div>
                            <div className="space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button size="sm" className="btn-vibrant">
                                Book Now
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Recent Bookings</span>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{booking.provider.image}</div>
                        <div>
                          <h4 className="font-semibold">{booking.service}</h4>
                          <p className="text-sm text-gray-600">
                            with {booking.provider.name}
                          </p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            {booking.date} at {booking.time}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}
                        >
                          {getStatusIcon(booking.status)}
                          <span className="ml-1 capitalize">
                            {booking.status}
                          </span>
                        </div>
                        <div className="text-lg font-bold text-gray-900 mt-1">
                          {booking.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold gradient-text">My Bookings</h2>
              <Button className="btn-vibrant">
                <Plus className="h-5 w-5 mr-2" />
                New Booking
              </Button>
            </div>

            {/* Booking Filters */}
            <Card className="p-6">
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200"
                >
                  All
                </Button>
                <Button variant="outline">Pending</Button>
                <Button variant="outline">Confirmed</Button>
                <Button variant="outline">Completed</Button>
                <Button variant="outline">Cancelled</Button>
              </div>
            </Card>

            {/* Detailed Bookings List */}
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <Card
                  key={booking.id}
                  className="p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                      <div className="text-4xl">{booking.provider.image}</div>
                      <div>
                        <h3 className="text-xl font-semibold">
                          {booking.service}
                        </h3>
                        <p className="text-gray-600">
                          Provider: {booking.provider.name}
                        </p>
                        <div className="flex items-center mt-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm">
                            {booking.provider.rating}
                          </span>
                          <span className="mx-2">•</span>
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="ml-1 text-sm">
                            {booking.date} at {booking.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-2 ${getStatusColor(booking.status)}`}
                      >
                        {getStatusIcon(booking.status)}
                        <span className="ml-1 capitalize">
                          {booking.status}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-2">
                        {booking.price}
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "messages" && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold gradient-text">Messages</h2>
            <Card className="p-8 text-center">
              <MessageCircle className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No messages yet</h3>
              <p className="text-gray-600 mb-4">
                Start a conversation with a service provider to see messages
                here.
              </p>
              <Button className="btn-vibrant">Browse Providers</Button>
            </Card>
          </div>
        )}

        {activeTab === "more" && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold gradient-text">
              Settings & More
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <User className="h-5 w-5 mr-2" />
                    Profile Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="h-5 w-5 mr-2" />
                    Notifications
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-5 w-5 mr-2" />
                    Preferences
                  </Button>
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Support</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Help Center
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Contact Support
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Terms of Service
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
