"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  Star,
  Clock,
  Plus,
  Eye,
  MessageSquare,
  MapPin,
  Edit,
  Settings,
  Heart,
  DollarSign,
  User,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuth, withAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface DashboardStats {
  totalBookings: number;
  activeBookings: number;
  completedBookings: number;
  totalSpent: number;
  activeRequests: number;
  savedProviders: number;
}

interface RecentBooking {
  id: string;
  booking_reference: string;
  service_title: string;
  provider_name: string;
  scheduled_date: string;
  scheduled_time: string;
  quoted_price: number;
  status: string;
  service_location: string;
  provider_rating: number;
}

interface RecentRequest {
  id: string;
  title: string;
  description: string;
  budget_max: number;
  urgency: string;
  created_at: string;
  proposals_count: number;
  is_active: boolean;
}

interface FavoriteProvider {
  id: string;
  business_name: string;
  full_name: string;
  average_rating: number;
  total_reviews: number;
  specialties: string[];
  base_hourly_rate: number;
}

function SeekerDashboardPage() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    activeBookings: 0,
    completedBookings: 0,
    totalSpent: 0,
    activeRequests: 0,
    savedProviders: 0,
  });
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([]);
  const [recentRequests, setRecentRequests] = useState<RecentRequest[]>([]);
  const [favoriteProviders, setFavoriteProviders] = useState<
    FavoriteProvider[]
  >([]);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Fetch user's bookings
      const { data: bookings } = await supabase
        .from("bookings")
        .select(
          `
          *,
          provider_profiles!provider_id(
            business_name,
            average_rating,
            users!user_id(full_name)
          )
        `,
        )
        .eq("customer_id", user.id)
        .order("created_at", { ascending: false });

      if (bookings) {
        const totalBookings = bookings.length;
        const activeBookings = bookings.filter((b) =>
          ["pending", "confirmed", "in_progress"].includes(b.status),
        ).length;
        const completedBookings = bookings.filter(
          (b) => b.status === "completed",
        ).length;
        const totalSpent = bookings
          .filter((b) => b.status === "completed")
          .reduce((sum, b) => sum + (b.final_price || b.quoted_price), 0);

        setStats((prev) => ({
          ...prev,
          totalBookings,
          activeBookings,
          completedBookings,
          totalSpent,
        }));

        // Set recent bookings
        setRecentBookings(
          bookings.slice(0, 5).map((booking) => ({
            id: booking.id,
            booking_reference: booking.booking_reference,
            service_title: booking.service_title,
            provider_name:
              booking.provider_profiles?.business_name ||
              booking.provider_profiles?.users?.full_name ||
              "Unknown Provider",
            scheduled_date: booking.scheduled_date,
            scheduled_time: booking.scheduled_time,
            quoted_price: booking.quoted_price,
            status: booking.status,
            service_location: booking.service_location,
            provider_rating: booking.provider_profiles?.average_rating || 0,
          })),
        );
      }

      // Fetch user's service requests
      const { data: requests } = await supabase
        .from("service_requests")
        .select(
          `
          *,
          service_proposals(count)
        `,
        )
        .eq("requester_id", user.id)
        .order("created_at", { ascending: false });

      if (requests) {
        const activeRequests = requests.filter((r) => r.is_active).length;
        setStats((prev) => ({ ...prev, activeRequests }));

        // Set recent requests
        setRecentRequests(
          requests.slice(0, 5).map((request) => ({
            id: request.id,
            title: request.title,
            description: request.description,
            budget_max: request.budget_max || 0,
            urgency: request.urgency,
            created_at: request.created_at,
            proposals_count: 0, // Would need to count proposals separately
            is_active: request.is_active,
          })),
        );
      }

      // Mock favorite providers (in real app, would have a favorites table)
      setFavoriteProviders([]);
      setStats((prev) => ({ ...prev, savedProviders: 0 }));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "in_progress":
        return "bg-purple-100 text-purple-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, { en: string; ne: string }> = {
      pending: { en: "Pending", ne: "बाँकी" },
      confirmed: { en: "Confirmed", ne: "पुष्टि भएको" },
      in_progress: { en: "In Progress", ne: "प्रगतिमा" },
      completed: { en: "Completed", ne: "सम्पन्न" },
      cancelled: { en: "Cancelled", ne: "रद्द" },
    };
    return labels[status]?.[language] || status;
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "urgent":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {language === "ne" ? "ग्राहक ड्यासबोर्ड" : "Customer Dashboard"}
            </h1>
            <p className="text-gray-600">
              {language === "ne"
                ? `स्वागत छ, ${user?.full_name}`
                : `Welcome back, ${user?.full_name}`}
            </p>
          </div>
          <div className="flex space-x-3">
            <Link href="/find-services">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Search className="h-4 w-4 mr-2" />
                {language === "ne" ? "सेवा खोज्नुहोस्" : "Find Services"}
              </Button>
            </Link>
            <Link href="/post-request">
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                {language === "ne" ? "अनुरोध पोस्ट गर्नुहोस्" : "Post Request"}
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === "ne" ? "कुल बुकिङहरू" : "Total Bookings"}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalBookings}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === "ne" ? "सक्रिय बुकिङहरू" : "Active Bookings"}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.activeBookings}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === "ne" ? "पूरा भएका" : "Completed"}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.completedBookings}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === "ne" ? "कुल खर्च" : "Total Spent"}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  Rs {stats.totalSpent.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Activity Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {language === "ne" ? "गतिविधि सिंहावलोकन" : "Activity Overview"}
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">
                  {language === "ne" ? "सक्रिय अनुरोधहरू" : "Active Requests"}
                </span>
                <span className="font-semibold">{stats.activeRequests}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">
                  {language === "ne" ? "मनपर्ने प्रदायकहरू" : "Saved Providers"}
                </span>
                <span className="font-semibold">{stats.savedProviders}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">
                  {language === "ne" ? "पूरा भएका" : "Completed Services"}
                </span>
                <span className="font-semibold">{stats.completedBookings}</span>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {language === "ne" ? "द्रुत कार्यहरू" : "Quick Actions"}
            </h3>
            <div className="space-y-3">
              <Link href="/find-services" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Search className="h-4 w-4 mr-2" />
                  {language === "ne" ? "सेवा खोज्नुहोस्" : "Find Services"}
                </Button>
              </Link>
              <Link href="/post-request" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  {language === "ne"
                    ? "अनुरोध पोस्ट गर्नुहोस्"
                    : "Post Request"}
                </Button>
              </Link>
              <Link href="/dashboard/seeker/bookings" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  {language === "ne" ? "मेरा बुकिङहरू" : "My Bookings"}
                </Button>
              </Link>
              <Link href="/messages" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {language === "ne" ? "सन्देशहरू" : "Messages"}
                </Button>
              </Link>
            </div>
          </Card>

          {/* Account Status */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {language === "ne" ? "खाता स्थिति" : "Account Status"}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
                <span className="text-sm">
                  {language === "ne" ? "खाता सक्रिय" : "Account Active"}
                </span>
              </div>
              <div className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full mr-3 ${
                    user?.email_verified_at ? "bg-green-500" : "bg-yellow-500"
                  }`}
                ></div>
                <span className="text-sm">
                  {user?.email_verified_at
                    ? language === "ne"
                      ? "इमेल प्रमाणित"
                      : "Email Verified"
                    : language === "ne"
                      ? "इमेल प्रमाणीकरण बाँकी"
                      : "Email Pending"}
                </span>
              </div>
              <Link href="/dashboard/seeker/profile">
                <Button size="sm" variant="outline" className="w-full mt-3">
                  <Edit className="h-4 w-4 mr-2" />
                  {language === "ne" ? "प्रोफाइल सम्पादन" : "Edit Profile"}
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {language === "ne" ? "हालका बुकिङहरू" : "Recent Bookings"}
              </h3>
              <Link
                href="/dashboard/seeker/bookings"
                className="text-blue-600 hover:text-blue-500 text-sm"
              >
                {language === "ne" ? "सबै हेर्नुहोस्" : "View All"}
              </Link>
            </div>
            <div className="space-y-4">
              {recentBookings.length > 0 ? (
                recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="border-l-4 border-blue-500 pl-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {booking.service_title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {booking.provider_name}
                        </p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          {booking.scheduled_date} at {booking.scheduled_time}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          {booking.service_location}
                        </div>
                        {booking.provider_rating > 0 && (
                          <div className="flex items-center text-xs text-gray-500">
                            <Star className="h-3 w-3 mr-1 text-yellow-400" />
                            {booking.provider_rating.toFixed(1)}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          Rs {booking.quoted_price.toLocaleString()}
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${getStatusColor(booking.status)}`}
                        >
                          {getStatusLabel(booking.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {language === "ne"
                      ? "कुनै बुकिङ फेला परेन"
                      : "No bookings found"}
                  </p>
                  <Link href="/find-services" className="mt-2 inline-block">
                    <Button size="sm">
                      {language === "ne" ? "सेवा खोज्नुहोस्" : "Find Services"}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </Card>

          {/* Recent Requests */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {language === "ne" ? "हालका अनुरोधहरू" : "Recent Requests"}
              </h3>
              <Link
                href="/dashboard/seeker/requests"
                className="text-blue-600 hover:text-blue-500 text-sm"
              >
                {language === "ne" ? "सबै हेर्नुहोस्" : "View All"}
              </Link>
            </div>
            <div className="space-y-4">
              {recentRequests.length > 0 ? (
                recentRequests.map((request) => (
                  <div
                    key={request.id}
                    className="border-l-4 border-green-500 pl-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {request.title}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {request.description}
                        </p>
                        <div className="flex items-center text-xs text-gray-500 mt-1 space-x-3">
                          <span>
                            {new Date(request.created_at).toLocaleDateString()}
                          </span>
                          <span
                            className={`px-2 py-1 rounded ${getUrgencyColor(request.urgency)}`}
                          >
                            {request.urgency}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          Rs {request.budget_max?.toLocaleString() || "N/A"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {request.proposals_count} proposals
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {language === "ne"
                      ? "कुनै अनुरोध फेला परेन"
                      : "No requests found"}
                  </p>
                  <Link href="/post-request" className="mt-2 inline-block">
                    <Button size="sm">
                      {language === "ne"
                        ? "अनुरोध पोस्ट गर्नुहोस्"
                        : "Post Request"}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default withAuth(SeekerDashboardPage, ["seeker"]);
