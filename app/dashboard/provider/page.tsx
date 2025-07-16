"use client";

import { useState, useEffect } from "react";
import {
  DollarSign,
  Calendar,
  Star,
  TrendingUp,
  Users,
  Clock,
  Plus,
  Eye,
  MessageSquare,
  MapPin,
  Edit,
  Settings,
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
  totalEarnings: number;
  monthlyEarnings: number;
  totalBookings: number;
  activeBookings: number;
  averageRating: number;
  totalReviews: number;
  responseRate: number;
  completionRate: number;
}

interface RecentBooking {
  id: string;
  booking_reference: string;
  service_title: string;
  customer_name: string;
  scheduled_date: string;
  scheduled_time: string;
  quoted_price: number;
  status: string;
  service_location: string;
}

interface RecentReview {
  id: string;
  rating: number;
  title?: string;
  comment?: string;
  reviewer_name: string;
  service_title: string;
  created_at: string;
}

function ProviderDashboardPage() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalEarnings: 0,
    monthlyEarnings: 0,
    totalBookings: 0,
    activeBookings: 0,
    averageRating: 0,
    totalReviews: 0,
    responseRate: 0,
    completionRate: 0,
  });
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([]);
  const [recentReviews, setRecentReviews] = useState<RecentReview[]>([]);
  const [providerProfile, setProviderProfile] = useState<any>(null);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Fetch provider profile
      const { data: profile } = await supabase
        .from("provider_profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (profile) {
        setProviderProfile(profile);
        setStats({
          totalEarnings: profile.total_earnings || 0,
          monthlyEarnings: 0, // Calculate from recent bookings
          totalBookings: profile.total_jobs_completed || 0,
          activeBookings: 0, // Calculate from active bookings
          averageRating: profile.average_rating || 0,
          totalReviews: profile.total_reviews || 0,
          responseRate: profile.response_rate || 0,
          completionRate: profile.completion_rate || 0,
        });

        // Fetch recent bookings
        const { data: bookings } = await supabase
          .from("bookings")
          .select(
            `
            *,
            users!customer_id(full_name)
          `,
          )
          .eq("provider_id", profile.id)
          .order("created_at", { ascending: false })
          .limit(5);

        if (bookings) {
          setRecentBookings(
            bookings.map((booking) => ({
              id: booking.id,
              booking_reference: booking.booking_reference,
              service_title: booking.service_title,
              customer_name: booking.users?.full_name || "Unknown",
              scheduled_date: booking.scheduled_date,
              scheduled_time: booking.scheduled_time,
              quoted_price: booking.quoted_price,
              status: booking.status,
              service_location: booking.service_location,
            })),
          );

          // Calculate active bookings
          const activeCount = bookings.filter((b) =>
            ["pending", "confirmed", "in_progress"].includes(b.status),
          ).length;
          setStats((prev) => ({ ...prev, activeBookings: activeCount }));

          // Calculate monthly earnings (current month)
          const currentMonth = new Date().getMonth();
          const currentYear = new Date().getFullYear();
          const monthlyEarnings = bookings
            .filter((b) => {
              const bookingDate = new Date(b.created_at);
              return (
                bookingDate.getMonth() === currentMonth &&
                bookingDate.getFullYear() === currentYear &&
                b.status === "completed"
              );
            })
            .reduce((sum, b) => sum + (b.final_price || b.quoted_price), 0);
          setStats((prev) => ({ ...prev, monthlyEarnings }));
        }

        // Fetch recent reviews
        const { data: reviews } = await supabase
          .from("reviews")
          .select(
            `
            *,
            users!reviewer_id(full_name),
            bookings!booking_id(service_title)
          `,
          )
          .eq("reviewee_id", user.id)
          .eq("moderation_status", "approved")
          .order("created_at", { ascending: false })
          .limit(5);

        if (reviews) {
          setRecentReviews(
            reviews.map((review) => ({
              id: review.id,
              rating: review.rating,
              title: review.title,
              comment: review.comment,
              reviewer_name: review.users?.full_name || "Anonymous",
              service_title:
                review.bookings?.service_title || "Unknown Service",
              created_at: review.created_at,
            })),
          );
        }
      }
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
              {language === "ne"
                ? "सेवा प्���दायक ड्यासबोर्ड"
                : "Provider Dashboard"}
            </h1>
            <p className="text-gray-600">
              {language === "ne"
                ? `स्वागत छ, ${user?.full_name}`
                : `Welcome back, ${user?.full_name}`}
            </p>
          </div>
          <div className="flex space-x-3">
            <Link href="/dashboard/provider/services">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                {language === "ne" ? "नयाँ सेवा" : "Add Service"}
              </Button>
            </Link>
            <Link href="/dashboard/provider/profile">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                {language === "ne" ? "प्रोफाइल" : "Profile"}
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === "ne" ? "कुल आम्दानी" : "Total Earnings"}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  Rs {stats.totalEarnings.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === "ne" ? "मासिक आम्दानी" : "Monthly Earnings"}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  Rs {stats.monthlyEarnings.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
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
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === "ne" ? "औसत मूल्याङ्कन" : "Average Rating"}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.averageRating.toFixed(1)} / 5
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {language === "ne" ? "प्रदर्शन मेट्रिक्स" : "Performance Metrics"}
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">
                  {language === "ne" ? "जवाफ दर" : "Response Rate"}
                </span>
                <span className="font-semibold">{stats.responseRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">
                  {language === "ne" ? "पूर्णता दर" : "Completion Rate"}
                </span>
                <span className="font-semibold">{stats.completionRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">
                  {language === "ne" ? "सक्रिय बुकिङहरू" : "Active Bookings"}
                </span>
                <span className="font-semibold">{stats.activeBookings}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">
                  {language === "ne" ? "कुल समीक्षाहरू" : "Total Reviews"}
                </span>
                <span className="font-semibold">{stats.totalReviews}</span>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {language === "ne" ? "द्रुत कार्यहरू" : "Quick Actions"}
            </h3>
            <div className="space-y-3">
              <Link href="/dashboard/provider/services" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  {language === "ne"
                    ? "नयाँ सेवा थप्नुहोस्"
                    : "Add New Service"}
                </Button>
              </Link>
              <Link href="/dashboard/provider/bookings" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  {language === "ne" ? "बुकिङहरू हेर्नुहोस्" : "View Bookings"}
                </Button>
              </Link>
              <Link href="/messages" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {language === "ne" ? "सन्देशहरू" : "Messages"}
                </Button>
              </Link>
              <Link href="/dashboard/provider/profile" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Edit className="h-4 w-4 mr-2" />
                  {language === "ne" ? "प्रोफाइल सम्पादन" : "Edit Profile"}
                </Button>
              </Link>
            </div>
          </Card>

          {/* Verification Status */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {language === "ne" ? "प्रमाणीकरण स्थिति" : "Verification Status"}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full mr-3 ${
                    providerProfile?.verification_status === "verified"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                ></div>
                <span className="text-sm">
                  {providerProfile?.verification_status === "verified"
                    ? language === "ne"
                      ? "प्रमाणित"
                      : "Verified"
                    : language === "ne"
                      ? "प्रमाणीकरण बाँ���ी"
                      : "Pending Verification"}
                </span>
              </div>
              {providerProfile?.verification_status !== "verified" && (
                <Link href="/dashboard/provider/verification">
                  <Button size="sm" className="w-full">
                    {language === "ne"
                      ? "प्रमाणीकरण पूरा गर्नुहोस्"
                      : "Complete Verification"}
                  </Button>
                </Link>
              )}
            </div>
          </Card>
        </div>

        {/* Recent Bookings and Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {language === "ne" ? "हालका बुकिङहरू" : "Recent Bookings"}
              </h3>
              <Link
                href="/dashboard/provider/bookings"
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
                          {booking.customer_name}
                        </p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          {booking.scheduled_date} at {booking.scheduled_time}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          {booking.service_location}
                        </div>
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
                <p className="text-gray-500 text-center py-4">
                  {language === "ne"
                    ? "कुनै बुकिङ फेला परेन"
                    : "No bookings found"}
                </p>
              )}
            </div>
          </Card>

          {/* Recent Reviews */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {language === "ne" ? "हालका समीक्षाहरू" : "Recent Reviews"}
              </h3>
              <Link
                href="/dashboard/provider/reviews"
                className="text-blue-600 hover:text-blue-500 text-sm"
              >
                {language === "ne" ? "सबै हेर्नुहोस्" : "View All"}
              </Link>
            </div>
            <div className="space-y-4">
              {recentReviews.length > 0 ? (
                recentReviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-l-4 border-yellow-500 pl-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-sm font-medium">
                            {review.rating}/5
                          </span>
                        </div>
                        {review.title && (
                          <h4 className="font-medium text-gray-900 text-sm">
                            {review.title}
                          </h4>
                        )}
                        {review.comment && (
                          <p className="text-sm text-gray-600 mt-1">
                            {review.comment}
                          </p>
                        )}
                        <div className="text-xs text-gray-500 mt-2">
                          {review.reviewer_name} • {review.service_title}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">
                  {language === "ne"
                    ? "कुनै समीक्षा फेला परेन"
                    : "No reviews found"}
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default withAuth(ProviderDashboardPage, ["provider"]);
