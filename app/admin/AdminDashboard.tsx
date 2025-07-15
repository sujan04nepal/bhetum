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
  Activity,
  FileText,
  Filter,
  Download,
  RefreshCw,
  Settings,
  Shield,
  Bell,
  Eye,
  MoreHorizontal,
  Edit,
  Ban,
  Trash2,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  QuickActions,
  QuickActionsModal,
} from "@/components/admin/QuickActions";
import {
  StatCard,
  RecentActivityWidget,
  TopPerformersWidget,
  PlatformHealthWidget,
  RevenueChartWidget,
  UserGrowthWidget,
  GeographicWidget,
  NotificationCenterWidget,
  ServiceCategoriesWidget,
} from "@/components/admin/widgets";

// Dashboard Stats Cards Component
const StatsCard = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  iconColor,
  onClick,
}: {
  title: string;
  value: string | number;
  change: string;
  changeType: "up" | "down";
  icon: any;
  iconColor: string;
  onClick?: () => void;
}) => (
  <Card
    className={`p-6 cursor-pointer transition-all hover:shadow-lg ${onClick ? "hover:scale-105" : ""}`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
        <div className="flex items-center mt-1">
          {changeType === "up" ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
          <span
            className={`text-sm ml-1 ${changeType === "up" ? "text-green-600" : "text-red-600"}`}
          >
            {change}
          </span>
        </div>
      </div>
      <div className={`p-3 rounded-full ${iconColor}`}>
        <Icon className="h-6 w-6" />
      </div>
    </div>
  </Card>
);

// Quick Action Button Component
const QuickActionButton = ({
  title,
  subtitle,
  icon: Icon,
  color,
  onClick,
  badge,
}: {
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  onClick: () => void;
  badge?: number;
}) => (
  <Button
    variant="outline"
    className={`h-20 flex-col relative ${color} hover:scale-105 transition-all`}
    onClick={onClick}
  >
    <Icon className="h-6 w-6 mb-2" />
    <div className="text-center">
      <div className="font-medium text-sm">{title}</div>
      <div className="text-xs text-gray-500 mt-1">{subtitle}</div>
    </div>
    {badge && badge > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
        {badge}
      </span>
    )}
  </Button>
);

// Activity Feed Item Component
const ActivityItem = ({
  activity,
}: {
  activity: {
    type: string;
    message: string;
    time: string;
    icon: any;
    color: string;
    user?: string;
  };
}) => (
  <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
    <div className={`p-2 rounded-full ${activity.color} bg-opacity-20`}>
      <activity.icon className={`h-4 w-4 ${activity.color}`} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm text-gray-900">{activity.message}</p>
      {activity.user && (
        <p className="text-xs text-gray-500 mt-1">by {activity.user}</p>
      )}
      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
    </div>
  </div>
);

// Recent Booking Item Component
const BookingItem = ({
  booking,
}: {
  booking: {
    id: string;
    service: string;
    provider: string;
    seeker: string;
    amount: number;
    status: string;
    date: string;
  };
}) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
    <div className="flex-1">
      <p className="text-sm font-medium text-gray-900">{booking.service}</p>
      <p className="text-xs text-gray-500">
        {booking.provider} → {booking.seeker}
      </p>
      <p className="text-xs text-gray-400 mt-1">
        {booking.id} • {booking.date}
      </p>
    </div>
    <div className="text-right">
      <p className="text-sm font-medium text-gray-900">
        Rs {booking.amount.toLocaleString()}
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
);

// Top Provider Item Component
const TopProviderItem = ({
  provider,
  index,
}: {
  provider: {
    name: string;
    service: string;
    rating: number;
    jobs: number;
    revenue: number;
  };
  index: number;
}) => (
  <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
      <span className="text-blue-600 font-medium text-sm">{index + 1}</span>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-900">{provider.name}</p>
      <p className="text-xs text-gray-500">{provider.service}</p>
      <div className="flex items-center mt-1">
        <Star className="h-3 w-3 text-yellow-400 fill-current" />
        <span className="text-xs text-gray-600 ml-1">{provider.rating}</span>
        <span className="text-xs text-gray-400 ml-2">{provider.jobs} jobs</span>
      </div>
    </div>
    <div className="text-right">
      <p className="text-sm font-medium text-gray-900">
        Rs {provider.revenue.toLocaleString()}
      </p>
    </div>
  </div>
);

// Chart Placeholder Component
const ChartPlaceholder = ({ title, type }: { title: string; type: string }) => (
  <div className="h-64 bg-gray-50 rounded-lg flex flex-col items-center justify-center">
    <Activity className="h-12 w-12 text-gray-400 mb-2" />
    <p className="text-gray-500 font-medium">{title}</p>
    <p className="text-gray-400 text-sm">{type} Chart</p>
  </div>
);

// Mock data
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
  supportTickets: 23,
  pendingPayouts: 15,
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
  {
    id: "BK123459",
    service: "Web Development",
    provider: "Amit Poudel",
    seeker: "Krishna KC",
    amount: 3200,
    status: "completed",
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
    user: "System",
  },
  {
    type: "dispute",
    message: "New dispute raised for booking #BK123450",
    time: "15 minutes ago",
    icon: AlertTriangle,
    color: "text-red-600",
    user: "Customer Support",
  },
  {
    type: "booking",
    message: "Booking completed: House Cleaning Service",
    time: "32 minutes ago",
    icon: CheckCircle,
    color: "text-blue-600",
    user: "System",
  },
  {
    type: "payment",
    message: "Payment processed: Rs 1,200 commission earned",
    time: "1 hour ago",
    icon: DollarSign,
    color: "text-green-600",
    user: "Payment Gateway",
  },
  {
    type: "verification",
    message: "Provider verification completed: Maya Tamang",
    time: "2 hours ago",
    icon: Shield,
    color: "text-purple-600",
    user: "Admin",
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
  {
    name: "Amit Poudel",
    service: "Web Development",
    rating: 4.9,
    jobs: 123,
    revenue: 89500,
  },
  {
    name: "Sunita Karki",
    service: "Fitness Training",
    rating: 4.8,
    jobs: 234,
    revenue: 56700,
  },
];

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("7d");
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickActionModal, setShowQuickActionModal] = useState(false);
  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);

  const handleQuickAction = (actionId: string) => {
    setSelectedActionId(actionId);
    setShowQuickActionModal(true);
    console.log(`Quick action: ${actionId}`);
  };

  const handleRefreshData = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back! Here's what's happening on your platform.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <Button
              variant="outline"
              onClick={handleRefreshData}
              disabled={isLoading}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value={dashboardStats.totalUsers}
            change="+12.5%"
            changeType="up"
            icon={Users}
            color="bg-blue-100 text-blue-600"
            onClick={() => handleQuickAction("view_users")}
            subtitle="All registered users"
          />
          <StatCard
            title="Active Providers"
            value={dashboardStats.totalProviders}
            change="+8.2%"
            changeType="up"
            icon={UserCheck}
            color="bg-green-100 text-green-600"
            onClick={() => handleQuickAction("view_providers")}
            subtitle="Verified service providers"
          />
          <StatCard
            title="Monthly Revenue"
            value={`Rs ${dashboardStats.monthlyRevenue.toLocaleString()}`}
            change="+15.3%"
            changeType="up"
            icon={DollarSign}
            color="bg-purple-100 text-purple-600"
            onClick={() => handleQuickAction("view_revenue")}
            subtitle="Commission earned"
          />
          <StatCard
            title="Active Bookings"
            value={dashboardStats.activeBookings}
            change="-2.1%"
            changeType="down"
            icon={Calendar}
            color="bg-orange-100 text-orange-600"
            onClick={() => handleQuickAction("view_bookings")}
            subtitle="Currently in progress"
          />
        </div>

        {/* Quick Actions */}
        <QuickActions onActionClick={handleQuickAction} />

        {/* Charts and Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RevenueChartWidget />
          </div>
          <TopPerformersWidget performers={topProviders} type="providers" />
        </div>

        {/* Recent Activity and Bookings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Bookings
              </h3>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Activity
              </h3>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </div>
            <div className="space-y-1">
              {recentActivity.map((activity, index) => (
                <ActivityItem key={index} activity={activity} />
              ))}
            </div>
          </Card>
        </div>

        {/* Additional Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Platform Health */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Platform Health
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Uptime</span>
                <span className="text-sm font-medium text-green-600">
                  99.9%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Response Time</span>
                <span className="text-sm font-medium text-blue-600">245ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Error Rate</span>
                <span className="text-sm font-medium text-yellow-600">
                  0.1%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Server Load</span>
                <span className="text-sm font-medium text-purple-600">67%</span>
              </div>
            </div>
          </Card>

          {/* User Satisfaction */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              User Satisfaction
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Average Rating</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm font-medium">
                    {dashboardStats.avgRating}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Reviews This Month
                </span>
                <span className="text-sm font-medium text-blue-600">1,234</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Repeat Customers</span>
                <span className="text-sm font-medium text-green-600">78%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">NPS Score</span>
                <span className="text-sm font-medium text-purple-600">+45</span>
              </div>
            </div>
          </Card>

          {/* Financial Summary */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Financial Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Revenue</span>
                <span className="text-sm font-medium text-green-600">
                  Rs {dashboardStats.totalRevenue.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Commission Earned</span>
                <span className="text-sm font-medium text-blue-600">
                  Rs 245,678
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pending Payouts</span>
                <span className="text-sm font-medium text-orange-600">
                  Rs 89,234
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Refunds Processed</span>
                <span className="text-sm font-medium text-red-600">
                  Rs 12,456
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* System Alerts */}
        <Card className="p-6 border-l-4 border-yellow-400">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                System Alerts
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  • Scheduled maintenance window: January 20, 2024 at 2:00 AM -
                  4:00 AM
                </p>
                <p>• High server load detected in payment processing service</p>
                <p>
                  • 5 providers pending document verification for more than 48
                  hours
                </p>
              </div>
              <div className="mt-4">
                <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                  View All Alerts
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
