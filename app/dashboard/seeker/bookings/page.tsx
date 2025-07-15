"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Calendar,
  Clock,
  User,
  MapPin,
  DollarSign,
  Star,
  MessageCircle,
  Phone,
  Eye,
  Search,
  Filter,
  Download,
  Plus,
} from "lucide-react";

export default function SeekerBookingsPage() {
  const { language } = useLanguage();
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const content = {
    ne: {
      title: "मेरा बुकिङहरू",
      subtitle: "तपाई��का सबै सेवा बुकिङहरू हेर्नुहोस् र व्यवस्थापन गर्नुहोस्",
      newBooking: "नयाँ बुकिङ",
      searchPlaceholder: "सेवा वा प्रदायक खोज्नुहोस्...",
      filters: {
        all: "सबै",
        pending: "बाँकी",
        confirmed: "पुष्टि भएको",
        inProgress: "प्रगतिमा",
        completed: "सम्पन्न",
        cancelled: "रद्द भएको",
      },
      stats: {
        total: "कुल बुकिङहरू",
        upcoming: "आगामी",
        completed: "सम्पन्न",
        cancelled: "रद्द भएको",
      },
      bookingDetails: {
        service: "सेवा",
        provider: "सेवा प्रदायक",
        date: "मिति",
        time: "समय",
        location: "स्थान",
        amount: "रकम",
        status: "स्थिति",
      },
      actions: {
        viewDetails: "विवरण हेर्नुहोस्",
        contact: "सम्पर्क गर्नुहोस्",
        message: "सन्देश",
        reschedule: "समय परिवर्तन",
        cancel: "रद्द गर्नुहोस्",
        review: "समीक्षा दिनुहोस्",
        bookAgain: "फेरि बुक गर्नुहोस्",
      },
      noBookings: "कुनै बुकिङ फेला परेन",
      noBookingsDesc: "तपाईंले अहिलेसम्म कुनै सेवा बुक गर्नुभएको छैन।",
      exportData: "डाटा निर्यात गर्नुहोस्",
    },
    en: {
      title: "My Bookings",
      subtitle: "View and manage all your service bookings",
      newBooking: "New Booking",
      searchPlaceholder: "Search services or providers...",
      filters: {
        all: "All",
        pending: "Pending",
        confirmed: "Confirmed",
        inProgress: "In Progress",
        completed: "Completed",
        cancelled: "Cancelled",
      },
      stats: {
        total: "Total Bookings",
        upcoming: "Upcoming",
        completed: "Completed",
        cancelled: "Cancelled",
      },
      bookingDetails: {
        service: "Service",
        provider: "Provider",
        date: "Date",
        time: "Time",
        location: "Location",
        amount: "Amount",
        status: "Status",
      },
      actions: {
        viewDetails: "View Details",
        contact: "Contact",
        message: "Message",
        reschedule: "Reschedule",
        cancel: "Cancel",
        review: "Write Review",
        bookAgain: "Book Again",
      },
      noBookings: "No bookings found",
      noBookingsDesc: "You haven't booked any services yet.",
      exportData: "Export Data",
    },
  };

  const currentContent = content[language];

  // Mock booking data
  const bookings = [
    {
      id: "BK-001",
      service: "House Cleaning",
      provider: {
        name: "Sita Sharma",
        avatar: "👩‍💼",
        rating: 4.8,
        phone: "+977-9800000001",
      },
      date: "2024-02-15",
      time: "10:00 AM",
      location: "Kathmandu, Thamel",
      amount: 1500,
      status: "confirmed",
      description: "Deep cleaning for 3-bedroom apartment",
    },
    {
      id: "BK-002",
      service: "Math Tutoring",
      provider: {
        name: "Ram Prasad",
        avatar: "👨‍🏫",
        rating: 4.9,
        phone: "+977-9800000002",
      },
      date: "2024-02-12",
      time: "4:00 PM",
      location: "Online",
      amount: 800,
      status: "completed",
      description: "Grade 10 Mathematics tutoring session",
    },
    {
      id: "BK-003",
      service: "Plumbing Repair",
      provider: {
        name: "Krishna Bahadur",
        avatar: "🔧",
        rating: 4.7,
        phone: "+977-9800000003",
      },
      date: "2024-02-20",
      time: "2:00 PM",
      location: "Lalitpur, Patan",
      amount: 2000,
      status: "pending",
      description: "Kitchen sink repair and pipe maintenance",
    },
    {
      id: "BK-004",
      service: "Web Design",
      provider: {
        name: "Maya Tamang",
        avatar: "💻",
        rating: 5.0,
        phone: "+977-9800000004",
      },
      date: "2024-01-28",
      time: "9:00 AM",
      location: "Remote",
      amount: 15000,
      status: "completed",
      description: "Business website design and development",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "inProgress":
        return "bg-purple-100 text-purple-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredBookings = bookings.filter(
    (booking) =>
      (filterStatus === "all" || booking.status === filterStatus) &&
      (booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.provider.name.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const stats = [
    {
      label: currentContent.stats.total,
      value: bookings.length,
      color: "text-blue-600",
    },
    {
      label: currentContent.stats.upcoming,
      value: bookings.filter((b) => ["pending", "confirmed"].includes(b.status))
        .length,
      color: "text-green-600",
    },
    {
      label: currentContent.stats.completed,
      value: bookings.filter((b) => b.status === "completed").length,
      color: "text-purple-600",
    },
    {
      label: currentContent.stats.cancelled,
      value: bookings.filter((b) => b.status === "cancelled").length,
      color: "text-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {currentContent.title}
              </h1>
              <p className="text-gray-600 mt-2">{currentContent.subtitle}</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                {currentContent.exportData}
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {currentContent.newBooking}
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder={currentContent.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(currentContent.filters).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setFilterStatus(key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filterStatus === key
                        ? "bg-primary-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bookings List */}
        {filteredBookings.length > 0 ? (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <Card
                key={booking.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Section - Service Details */}
                    <div className="lg:col-span-6">
                      <div className="flex items-start space-x-4">
                        <div className="text-4xl">
                          {booking.provider.avatar}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {booking.service}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">
                            {booking.description}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              {booking.provider.name}
                            </span>
                            <span className="flex items-center">
                              <Star className="h-4 w-4 mr-1 text-yellow-400" />
                              {booking.provider.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Middle Section - Booking Details */}
                    <div className="lg:col-span-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          {booking.date}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          {booking.time}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          {booking.location}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <DollarSign className="h-4 w-4 mr-2" />
                          रू {booking.amount.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Right Section - Status and Actions */}
                    <div className="lg:col-span-2">
                      <div className="text-right space-y-3">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            booking.status,
                          )}`}
                        >
                          {
                            currentContent.filters[
                              booking.status as keyof typeof currentContent.filters
                            ]
                          }
                        </span>
                        <div className="flex flex-col space-y-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            {currentContent.actions.viewDetails}
                          </Button>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                            >
                              <MessageCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                            >
                              <Phone className="h-4 w-4" />
                            </Button>
                          </div>
                          {booking.status === "completed" && (
                            <Button size="sm" className="w-full">
                              {currentContent.actions.review}
                            </Button>
                          )}
                          {booking.status === "pending" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full text-red-600"
                            >
                              {currentContent.actions.cancel}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {currentContent.noBookings}
              </h3>
              <p className="text-gray-600 mb-6">
                {currentContent.noBookingsDesc}
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {currentContent.newBooking}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
