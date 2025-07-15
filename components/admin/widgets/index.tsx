"use client";

import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Calendar,
  Star,
  Clock,
  CheckCircle,
  AlertTriangle,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  MapPin,
  MessageSquare,
  Shield,
  Package,
  CreditCard,
  Bell,
  RefreshCw,
  Download,
  Filter,
  Eye,
  MoreHorizontal,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

// Stat Card Widget
export function StatCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color,
  onClick,
  subtitle,
}: {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "up" | "down";
  icon: any;
  color: string;
  onClick?: () => void;
  subtitle?: string;
}) {
  return (
    <Card
      className={`p-6 cursor-pointer transition-all hover:shadow-lg ${onClick ? "hover:scale-105" : ""}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          {change && (
            <div className="flex items-center mt-2">
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
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
}

// Recent Activity Widget
export function RecentActivityWidget({ activities }: { activities: any[] }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className={`p-2 rounded-full ${activity.color} bg-opacity-20`}>
              <activity.icon className={`h-4 w-4 ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">{activity.message}</p>
              {activity.user && (
                <p className="text-xs text-gray-500 mt-1">by {activity.user}</p>
              )}
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-gray-400">{activity.time}</p>
                {activity.action && (
                  <Button variant="outline" size="sm">
                    {activity.action}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// Top Performers Widget
export function TopPerformersWidget({
  performers,
  type,
}: {
  performers: any[];
  type: "providers" | "services";
}) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Top {type === "providers" ? "Providers" : "Services"}
        </h3>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-2" />
          View All
        </Button>
      </div>
      <div className="space-y-3">
        {performers.map((performer, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-medium text-sm">
                {index + 1}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {performer.name}
              </p>
              <p className="text-xs text-gray-500">{performer.category}</p>
              <div className="flex items-center mt-1">
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                <span className="text-xs text-gray-600 ml-1">
                  {performer.rating}
                </span>
                <span className="text-xs text-gray-400 ml-2">
                  {performer.metric}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                Rs {(performer.value || 0).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">{performer.period}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// Platform Health Widget
export function PlatformHealthWidget() {
  const healthMetrics = [
    {
      label: "System Uptime",
      value: "99.9%",
      status: "good",
      color: "text-green-600",
    },
    {
      label: "Response Time",
      value: "245ms",
      status: "good",
      color: "text-green-600",
    },
    {
      label: "Error Rate",
      value: "0.1%",
      status: "good",
      color: "text-green-600",
    },
    {
      label: "Server Load",
      value: "67%",
      status: "warning",
      color: "text-yellow-600",
    },
    {
      label: "Database Load",
      value: "34%",
      status: "good",
      color: "text-green-600",
    },
    {
      label: "Cache Hit Rate",
      value: "94%",
      status: "good",
      color: "text-green-600",
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Platform Health</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">All Systems Operational</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {healthMetrics.map((metric, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{metric.label}</span>
            <div className="flex items-center">
              <span className={`text-sm font-medium ${metric.color}`}>
                {metric.value}
              </span>
              <div
                className={`w-2 h-2 rounded-full ml-2 ${
                  metric.status === "good"
                    ? "bg-green-500"
                    : metric.status === "warning"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// Revenue Chart Widget
export function RevenueChartWidget() {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Revenue Analytics
        </h3>
        <div className="flex space-x-2">
          <Button
            variant={timeRange === "7d" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("7d")}
          >
            7D
          </Button>
          <Button
            variant={timeRange === "30d" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("30d")}
          >
            30D
          </Button>
          <Button
            variant={timeRange === "90d" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("90d")}
          >
            90D
          </Button>
        </div>
      </div>
      <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex flex-col items-center justify-center">
        <LineChart className="h-16 w-16 text-blue-500 mb-4" />
        <p className="text-gray-600 font-medium">Revenue Trend Chart</p>
        <p className="text-gray-500 text-sm">
          Interactive chart would be rendered here
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">Rs 2.4M</p>
          <p className="text-sm text-gray-600">Total Revenue</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">Rs 240K</p>
          <p className="text-sm text-gray-600">Commission</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">+15.3%</p>
          <p className="text-sm text-gray-600">Growth Rate</p>
        </div>
      </div>
    </Card>
  );
}

// User Growth Widget
export function UserGrowthWidget() {
  const growthData = [
    { period: "This Week", users: 234, growth: "+12.5%" },
    { period: "This Month", users: 1156, growth: "+8.3%" },
    { period: "Last 30 Days", users: 3421, growth: "+15.7%" },
    { period: "All Time", users: 12567, growth: "+234.6%" },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">User Growth</h3>
        <Button variant="outline" size="sm">
          <BarChart3 className="h-4 w-4 mr-2" />
          Details
        </Button>
      </div>
      <div className="space-y-4">
        {growthData.map((data, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">{data.period}</p>
              <p className="text-xs text-gray-500">New registrations</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">
                {data.users.toLocaleString()}
              </p>
              <p className="text-sm text-green-600">{data.growth}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// Geographic Distribution Widget
export function GeographicWidget() {
  const locations = [
    { city: "Kathmandu", users: 4567, percentage: 36.3 },
    { city: "Pokhara", users: 2134, percentage: 17.0 },
    { city: "Lalitpur", users: 1876, percentage: 14.9 },
    { city: "Bhaktapur", users: 1234, percentage: 9.8 },
    { city: "Chitwan", users: 987, percentage: 7.9 },
    { city: "Others", users: 1769, percentage: 14.1 },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Geographic Distribution
        </h3>
        <Button variant="outline" size="sm">
          <MapPin className="h-4 w-4 mr-2" />
          Map View
        </Button>
      </div>
      <div className="space-y-3">
        {locations.map((location, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className="w-3 h-3 bg-blue-500 rounded-full mr-3"
                style={{
                  backgroundColor: `hsl(${220 + index * 30}, 70%, 50%)`,
                }}
              ></div>
              <span className="text-sm font-medium text-gray-900">
                {location.city}
              </span>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {location.users.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">{location.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// Notification Center Widget
export function NotificationCenterWidget() {
  const notifications = [
    {
      id: 1,
      type: "alert",
      title: "System Alert",
      message: "High server load detected in payment processing",
      time: "5 min ago",
      priority: "high",
      icon: AlertTriangle,
      color: "text-red-600",
    },
    {
      id: 2,
      type: "info",
      title: "Maintenance Scheduled",
      message: "Scheduled maintenance on Jan 20, 2024 at 2:00 AM",
      time: "2 hours ago",
      priority: "medium",
      icon: Clock,
      color: "text-blue-600",
    },
    {
      id: 3,
      type: "success",
      title: "Backup Completed",
      message: "Daily database backup completed successfully",
      time: "1 day ago",
      priority: "low",
      icon: CheckCircle,
      color: "text-green-600",
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          System Notifications
        </h3>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            Mark All Read
          </Button>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
          >
            <div className={`p-1 rounded-full ${notification.color}`}>
              <notification.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">
                  {notification.title}
                </p>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    notification.priority === "high"
                      ? "bg-red-100 text-red-800"
                      : notification.priority === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {notification.priority}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {notification.message}
              </p>
              <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// Service Categories Widget
export function ServiceCategoriesWidget() {
  const categories = [
    {
      name: "Home Services",
      count: 1234,
      growth: "+12%",
      color: "bg-blue-500",
    },
    { name: "Education", count: 987, growth: "+8%", color: "bg-green-500" },
    {
      name: "Digital Services",
      count: 756,
      growth: "+23%",
      color: "bg-purple-500",
    },
    { name: "Healthcare", count: 543, growth: "+5%", color: "bg-red-500" },
    { name: "Creative", count: 432, growth: "+18%", color: "bg-yellow-500" },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Service Categories
        </h3>
        <Button variant="outline" size="sm">
          <PieChart className="h-4 w-4 mr-2" />
          Analytics
        </Button>
      </div>
      <div className="space-y-3">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className={`w-4 h-4 rounded-full mr-3 ${category.color}`}
              ></div>
              <span className="text-sm font-medium text-gray-900">
                {category.name}
              </span>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {category.count}
              </p>
              <p className="text-xs text-green-600">{category.growth}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
