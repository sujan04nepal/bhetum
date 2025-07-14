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
  Grid3x3,
  List,
  Plus,
  Eye,
  CheckCircle,
  AlertCircle,
  XCircle,
  DollarSign,
  TrendingUp,
  Briefcase,
  Edit,
  Send,
  FileText,
  Award,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { SERVICE_CATEGORIES, CATEGORY_COLORS } from "@/lib/constants";

export default function ProviderDashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Mock data based on successful marketplace patterns
  const providerStats = {
    totalEarnings: 2450,
    thisMonth: 680,
    completedJobs: 23,
    avgRating: 4.8,
    responseRate: 95,
    successRate: 92,
  };

  const recentJobs = [
    {
      id: "1",
      title: "Website Redesign for E-commerce Store",
      client: {
        name: "John Smith",
        image: "👨‍💼",
        rating: 4.7,
      },
      budget: "$500-800",
      deadline: "2024-01-20",
      status: "in_progress",
      category: "digital-online",
      description:
        "Looking for a modern, responsive design for my online store...",
      posted: "2 hours ago",
    },
    {
      id: "2",
      title: "Personal Training Sessions",
      client: {
        name: "Sarah Davis",
        image: "👩‍🦰",
        rating: 5.0,
      },
      budget: "$45/session",
      deadline: "2024-01-25",
      status: "applied",
      category: "personal-care",
      description: "Need a certified personal trainer for weight loss goals...",
      posted: "1 day ago",
    },
    {
      id: "3",
      title: "Logo Design for Startup",
      client: {
        name: "Mike Johnson",
        image: "👨‍💻",
        rating: 4.9,
      },
      budget: "$200-400",
      deadline: "Flexible",
      status: "completed",
      category: "creative-artisanal",
      description: "Modern, minimalist logo for tech startup...",
      posted: "3 days ago",
    },
  ];

  const myServices = [
    {
      id: "1",
      title: "Full-Stack Web Development",
      category: "digital-online",
      price: "$75/hr",
      rating: 4.9,
      reviews: 45,
      orders: 12,
      status: "active",
      image: "💻",
    },
    {
      id: "2",
      title: "React Native Mobile Apps",
      category: "digital-online",
      price: "$65/hr",
      rating: 4.8,
      reviews: 28,
      orders: 8,
      status: "active",
      image: "📱",
    },
    {
      id: "3",
      title: "UI/UX Design Consultation",
      category: "digital-online",
      price: "$50/hr",
      rating: 5.0,
      reviews: 15,
      orders: 4,
      status: "paused",
      image: "🎨",
    },
  ];

  const availableJobs = [
    {
      id: "1",
      title: "WordPress Website Migration",
      budget: "$300-500",
      timeline: "1 week",
      location: "Remote",
      client: { name: "Tech Solutions Inc", verified: true },
      posted: "3 hours ago",
      proposals: 8,
      category: "digital-online",
    },
    {
      id: "2",
      title: "Mobile App Bug Fixes",
      budget: "$150-250",
      timeline: "3 days",
      location: "Remote",
      client: { name: "StartupCo", verified: false },
      posted: "6 hours ago",
      proposals: 15,
      category: "digital-online",
    },
    {
      id: "3",
      title: "API Integration Project",
      budget: "$400-600",
      timeline: "2 weeks",
      location: "Remote",
      client: { name: "Digital Agency", verified: true },
      posted: "1 day ago",
      proposals: 22,
      category: "digital-online",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_progress":
        return "text-blue-600 bg-blue-50";
      case "applied":
        return "text-yellow-600 bg-yellow-50";
      case "completed":
        return "text-green-600 bg-green-50";
      case "active":
        return "text-green-600 bg-green-50";
      case "paused":
        return "text-gray-600 bg-gray-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "in_progress":
        return <Clock className="h-4 w-4" />;
      case "applied":
        return <Send className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "active":
        return <CheckCircle className="h-4 w-4" />;
      case "paused":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <XCircle className="h-4 w-4" />;
    }
  };

  const navigationTabs = [
    { id: "home", label: "Dashboard", icon: Grid3X3 },
    { id: "jobs", label: "Find Jobs", icon: Search },
    { id: "applications", label: "Applications", icon: FileText },
    { id: "services", label: "My Services", icon: Briefcase },
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
                Provider Dashboard
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
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
                  <tab.icon className="h-4 w-4" />
                  <span className="text-sm">{tab.label}</span>
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
                  <span className="hidden sm:block">Alex Rivera</span>
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
                    <tab.icon className="h-4 w-4" />
                    <span className="text-sm">{tab.label}</span>
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
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-2">
                  Welcome back, Alex! 🚀
                </h2>
                <p className="text-purple-100 text-lg mb-6">
                  You have 3 new job opportunities waiting!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-white text-purple-600 hover:bg-gray-100 font-semibold">
                    <Search className="h-5 w-5 mr-2" />
                    Browse Jobs
                  </Button>
                  <Button
                    variant="outline"
                    className="text-white border-white hover:bg-white/10"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Create New Service
                  </Button>
                </div>
              </div>
              <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-white/10"></div>
              <div className="absolute bottom-0 left-0 -mb-8 -ml-8 h-24 w-24 rounded-full bg-white/5"></div>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <Card className="text-center p-6">
                <DollarSign className="h-8 w-8 mx-auto text-green-600 mb-2" />
                <div className="text-2xl font-bold text-green-600 mb-1">
                  ${providerStats.totalEarnings}
                </div>
                <div className="text-sm text-gray-600">Total Earnings</div>
              </Card>
              <Card className="text-center p-6">
                <TrendingUp className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  ${providerStats.thisMonth}
                </div>
                <div className="text-sm text-gray-600">This Month</div>
              </Card>
              <Card className="text-center p-6">
                <CheckCircle className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {providerStats.completedJobs}
                </div>
                <div className="text-sm text-gray-600">Jobs Done</div>
              </Card>
              <Card className="text-center p-6">
                <Star className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                <div className="text-2xl font-bold text-yellow-600 mb-1">
                  {providerStats.avgRating}
                </div>
                <div className="text-sm text-gray-600">Avg Rating</div>
              </Card>
              <Card className="text-center p-6">
                <MessageCircle className="h-8 w-8 mx-auto text-green-600 mb-2" />
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {providerStats.responseRate}%
                </div>
                <div className="text-sm text-gray-600">Response Rate</div>
              </Card>
              <Card className="text-center p-6">
                <Award className="h-8 w-8 mx-auto text-orange-600 mb-2" />
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  {providerStats.successRate}%
                </div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Active Jobs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Active Jobs</span>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentJobs
                      .filter((job) => job.status === "in_progress")
                      .map((job) => (
                        <div
                          key={job.id}
                          className="p-4 bg-blue-50 rounded-lg border border-blue-200"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-blue-900">
                              {job.title}
                            </h4>
                            <span className="text-sm text-blue-600 font-medium">
                              {job.budget}
                            </span>
                          </div>
                          <p className="text-sm text-blue-700 mb-2">
                            Client: {job.client.name}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-blue-600">
                              Due: {job.deadline}
                            </span>
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Continue Work
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* New Opportunities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>New Opportunities</span>
                    <Button variant="outline" size="sm">
                      Browse More
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {availableJobs.slice(0, 2).map((job) => (
                      <div
                        key={job.id}
                        className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-purple-900">
                            {job.title}
                          </h4>
                          <span className="text-sm text-purple-600 font-medium">
                            {job.budget}
                          </span>
                        </div>
                        <p className="text-sm text-purple-700 mb-2">
                          Timeline: {job.timeline}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-purple-600">
                            {job.proposals} proposals
                          </span>
                          <Button
                            size="sm"
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col">
                  <Plus className="h-6 w-6 mb-2" />
                  Create Service
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Search className="h-6 w-6 mb-2" />
                  Find Jobs
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <BarChart3 className="h-6 w-6 mb-2" />
                  View Analytics
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Settings className="h-6 w-6 mb-2" />
                  Profile Settings
                </Button>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "jobs" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold gradient-text">Find Jobs</h2>
              <Button className="btn-vibrant">
                <Filter className="h-5 w-5 mr-2" />
                Advanced Filters
              </Button>
            </div>

            {/* Search & Filters */}
            <Card className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search for projects or keywords..."
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
                <select className="px-4 py-2 border border-gray-300 rounded-lg">
                  <option>All Budgets</option>
                  <option>$0 - $100</option>
                  <option>$100 - $500</option>
                  <option>$500 - $1000</option>
                  <option>$1000+</option>
                </select>
              </div>
            </Card>

            {/* Available Jobs */}
            <div className="space-y-4">
              {availableJobs.map((job) => (
                <Card
                  key={job.id}
                  className="p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="flex-1 mb-4 lg:mb-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary-600">
                            {job.budget}
                          </div>
                          <div className="text-sm text-gray-500">
                            {job.timeline}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span>By {job.client.name}</span>
                        {job.client.verified && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                            ✓ Verified Client
                          </span>
                        )}
                        <span>•</span>
                        <span>{job.posted}</span>
                        <span>•</span>
                        <span>{job.proposals} proposals</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {job.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <Button variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      <Button className="btn-vibrant">
                        <Send className="h-4 w-4 mr-1" />
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "services" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold gradient-text">My Services</h2>
              <Button className="btn-vibrant">
                <Plus className="h-5 w-5 mr-2" />
                Create New Service
              </Button>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myServices.map((service) => {
                const categoryColors =
                  CATEGORY_COLORS[
                    service.category as keyof typeof CATEGORY_COLORS
                  ];
                return (
                  <Card
                    key={service.id}
                    className="group hover:shadow-xl transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-3xl">{service.image}</div>
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}
                        >
                          {getStatusIcon(service.status)}
                          <span className="ml-1 capitalize">
                            {service.status}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold mb-2">
                        {service.title}
                      </h3>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 font-medium">
                            {service.rating}
                          </span>
                          <span className="ml-1 text-gray-500 text-sm">
                            ({service.reviews})
                          </span>
                        </div>
                        <div className="text-xl font-bold text-primary-600">
                          {service.price}
                        </div>
                      </div>

                      <div className="text-sm text-gray-600 mb-4">
                        {service.orders} active orders
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" className="flex-1">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <BarChart3 className="h-4 w-4 mr-1" />
                          Analytics
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "applications" && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold gradient-text">
              My Applications
            </h2>

            {/* Application Filters */}
            <Card className="p-6">
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200"
                >
                  All
                </Button>
                <Button variant="outline">Applied</Button>
                <Button variant="outline">In Progress</Button>
                <Button variant="outline">Completed</Button>
                <Button variant="outline">Rejected</Button>
              </div>
            </Card>

            {/* Applications List */}
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <Card
                  key={job.id}
                  className="p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="flex-1 mb-4 lg:mb-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}
                        >
                          {getStatusIcon(job.status)}
                          <span className="ml-1 capitalize">
                            {job.status.replace("_", " ")}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">
                        Client: {job.client.name}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <span>Budget: {job.budget}</span>
                        <span>•</span>
                        <span>Applied {job.posted}</span>
                        <span>•</span>
                        <span>Due: {job.deadline}</span>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <Button variant="outline">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                      <Button variant="outline">View Details</Button>
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
                Start applying to jobs to communicate with clients.
              </p>
              <Button className="btn-vibrant">Find Jobs to Apply</Button>
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
                <h3 className="text-lg font-semibold mb-4">
                  Profile & Business
                </h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <User className="h-5 w-5 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Briefcase className="h-5 w-5 mr-2" />
                    Portfolio
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Analytics
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Earnings & Payouts
                  </Button>
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Support & Settings
                </h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="h-5 w-5 mr-2" />
                    Notifications
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-5 w-5 mr-2" />
                    Account Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Help Center
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Contact Support
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
