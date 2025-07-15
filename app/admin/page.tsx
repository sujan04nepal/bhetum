"use client";

import { useState, useEffect } from "react";
import {
  Users,
  UserCheck,
  Package,
  Calendar,
  CreditCard,
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  MessageSquare,
  Star,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

// Mock data - in a real app, this would come from an API
const dashboardStats = {
  totalUsers: 12567,
  totalProviders: 3421,
  totalSeekers: 9146,
  activeBookings: 234,
  completedBookings: 8945,
  totalRevenue: 2456789,
  monthlyRevenue: 245678,
  avgRating: 4.7,
  disputeCount: 12,
  pendingVerifications: 45,
};

const recentBookings = [
  {
    id: "BK123456",
    service: "House Cleaning",
    provider: "Sarita Sharma",
    seeker: "Ram Bahadur",
    amount: 1500,
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "BK123457",
    service: "Math Tutoring",
    provider: "Raj Gurung",
    seeker: "Sita Rai",
    amount: 800,
    status: "in_progress",
    date: "2024-01-15",
  },
  {
    id: "BK123458",
    service: "Graphic Design",
    provider: "Maya Tamang",
    seeker: "Hari Thapa",
    amount: 2500,
    status: "pending",
    date: "2024-01-14",
  },
];

const recentActivity = [
  {
    type: "user_registration",
    message: "New provider registration: Amit Poudel",
    time: "2 minutes ago",
    icon: UserCheck,
    color: "text-green-600",
  },
  {
    type: "dispute",
    message: "New dispute raised for booking #BK123450",
    time: "15 minutes ago",
    icon: AlertTriangle,
    color: "text-red-600",
  },
  {
    type: "booking",
    message: "Booking completed: House Cleaning Service",
    time: "32 minutes ago",
    icon: CheckCircle,
    color: "text-blue-600",
  },
  {
    type: "payment",
    message: "Payment processed: Rs 1,200 commission earned",
    time: "1 hour ago",
    icon: DollarSign,
    color: "text-green-600",
  },
];

const topProviders = [
  {
    name: "Sarita Sharma",
    service: "House Cleaning",
    rating: 4.9,
    jobs: 156,
    revenue: 45600,
  },
  {
    name: "Raj Gurung",
    service: "Math Tutoring",
    rating: 4.8,
    jobs: 89,
    revenue: 34200,
  },
  {
    name: "Maya Tamang",
    service: "Graphic Design",
    rating: 5.0,
    jobs: 67,
    revenue: 67800,
  },
];

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">
              Welcome back! Here's what's happening on your platform.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Generate Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardStats.totalUsers.toLocaleString()}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600 ml-1">+12.5%</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Providers
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardStats.totalProviders.toLocaleString()}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600 ml-1">+8.2%</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Monthly Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  Rs {dashboardStats.monthlyRevenue.toLocaleString()}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600 ml-1">+15.3%</span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Bookings
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardStats.activeBookings}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingDown className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-600 ml-1">-2.1%</span>
                </div>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Charts and Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Revenue Trends
              </h3>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Week
                </Button>
                <Button variant="outline" size="sm">
                  Month
                </Button>
                <Button size="sm" className="bg-blue-600">
                  Year
                </Button>
              </div>
            </div>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Revenue Chart Placeholder</p>
            </div>
          </Card>

          {/* Top Performers */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Top Providers
            </h3>
            <div className="space-y-4">
              {topProviders.map((provider, index) => (
                <div key={provider.name} className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-medium text-sm">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {provider.name}
                    </p>
                    <p className="text-xs text-gray-500">{provider.service}</p>
                    <div className="flex items-center mt-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600 ml-1">
                        {provider.rating}
                      </span>
                      <span className="text-xs text-gray-400 ml-2">
                        {provider.jobs} jobs
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      Rs {provider.revenue.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Activity and Bookings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Bookings
              </h3>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {booking.service}
                    </p>
                    <p className="text-xs text-gray-500">
                      {booking.provider} → {booking.seeker}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {booking.id} • {booking.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      Rs {booking.amount}
                    </p>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        booking.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "in_progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {booking.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Activity
              </h3>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start">
                  <div className={`p-2 rounded-full mr-3 ${activity.color}`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <UserCheck className="h-6 w-6 mb-2" />
              Verify Providers
              <span className="text-xs text-gray-500">
                {dashboardStats.pendingVerifications} pending
              </span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <MessageSquare className="h-6 w-6 mb-2" />
              Resolve Disputes
              <span className="text-xs text-gray-500">
                {dashboardStats.disputeCount} active
              </span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Package className="h-6 w-6 mb-2" />
              Approve Services
              <span className="text-xs text-gray-500">23 pending</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <CreditCard className="h-6 w-6 mb-2" />
              Process Payouts
              <span className="text-xs text-gray-500">15 ready</span>
            </Button>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
