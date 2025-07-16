"use client";

import { useState } from "react";
import {
  Search,
  Send,
  Edit,
  Eye,
  Trash2,
  Bell,
  Mail,
  MessageSquare,
  Users,
  User,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Plus,
  X,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";

type NotificationType = "email" | "push" | "sms" | "in_app";
type NotificationStatus = "draft" | "scheduled" | "sent" | "failed";
type RecipientType = "all_users" | "providers" | "customers" | "specific";

interface Notification {
  id: string;
  title: string;
  content: string;
  type: NotificationType;
  status: NotificationStatus;
  recipientType: RecipientType;
  recipientCount: number;
  specificRecipients?: string[];
  scheduledAt?: string;
  sentAt?: string;
  createdAt: string;
  createdBy: string;
  openRate?: number;
  clickRate?: number;
  deliveryRate?: number;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: "welcome" | "booking" | "payment" | "reminder" | "marketing" | "system";
  variables: string[];
  isActive: boolean;
  lastUsed?: string;
  usageCount: number;
}

const mockNotifications: Notification[] = [
  {
    id: "NOT001",
    title: "New Year Special Offers Available",
    content:
      "Celebrate New Year with special discounts on all services! Get up to 30% off on home services, tutoring, and more. Limited time offer.",
    type: "push",
    status: "sent",
    recipientType: "all_users",
    recipientCount: 15420,
    sentAt: "2024-12-30T09:00:00Z",
    createdAt: "2024-12-29T16:30:00Z",
    createdBy: "admin@platform.com",
    openRate: 78.5,
    clickRate: 12.3,
    deliveryRate: 98.2,
  },
  {
    id: "NOT002",
    title: "Platform Maintenance Notice",
    content:
      "Our platform will undergo scheduled maintenance on January 2nd from 2:00 AM to 4:00 AM. Services may be temporarily unavailable during this time.",
    type: "email",
    status: "scheduled",
    recipientType: "all_users",
    recipientCount: 15420,
    scheduledAt: "2025-01-01T18:00:00Z",
    createdAt: "2024-12-30T10:15:00Z",
    createdBy: "admin@platform.com",
  },
  {
    id: "NOT003",
    title: "New Provider Guidelines",
    content:
      "Important updates to our provider guidelines. Please review the new quality standards and service requirements to maintain your active status.",
    type: "email",
    status: "sent",
    recipientType: "providers",
    recipientCount: 3420,
    sentAt: "2024-12-28T14:30:00Z",
    createdAt: "2024-12-28T11:45:00Z",
    createdBy: "admin@platform.com",
    openRate: 85.2,
    clickRate: 34.6,
    deliveryRate: 97.8,
  },
  {
    id: "NOT004",
    title: "Customer Satisfaction Survey",
    content:
      "Help us improve! Share your feedback about our platform and services. Your opinion matters to us.",
    type: "in_app",
    status: "draft",
    recipientType: "customers",
    recipientCount: 12000,
    createdAt: "2024-12-30T15:20:00Z",
    createdBy: "admin@platform.com",
  },
];

const mockEmailTemplates: EmailTemplate[] = [
  {
    id: "TPL001",
    name: "Welcome Email",
    subject: "Welcome to Nepal Service Marketplace!",
    content:
      "Dear {{name}}, welcome to our platform! We're excited to have you join our community of service providers and seekers in Nepal.",
    type: "welcome",
    variables: ["name", "email", "userType"],
    isActive: true,
    lastUsed: "2024-12-30T08:30:00Z",
    usageCount: 1250,
  },
  {
    id: "TPL002",
    name: "Booking Confirmation",
    subject: "Booking Confirmed - {{serviceName}}",
    content:
      "Your booking for {{serviceName}} has been confirmed. Service date: {{date}} at {{time}}. Provider: {{providerName}}",
    type: "booking",
    variables: ["serviceName", "date", "time", "providerName", "amount"],
    isActive: true,
    lastUsed: "2024-12-30T11:45:00Z",
    usageCount: 8950,
  },
  {
    id: "TPL003",
    name: "Payment Received",
    subject: "Payment Confirmation - Rs {{amount}}",
    content:
      "Thank you! We've received your payment of Rs {{amount}} for {{serviceName}}. Transaction ID: {{transactionId}}",
    type: "payment",
    variables: ["amount", "serviceName", "transactionId", "date"],
    isActive: true,
    lastUsed: "2024-12-30T10:20:00Z",
    usageCount: 7650,
  },
  {
    id: "TPL004",
    name: "Service Reminder",
    subject: "Reminder: Your service is tomorrow",
    content:
      "This is a reminder that you have a {{serviceName}} appointment tomorrow at {{time}} with {{providerName}}.",
    type: "reminder",
    variables: ["serviceName", "time", "providerName", "customerName"],
    isActive: true,
    lastUsed: "2024-12-29T18:00:00Z",
    usageCount: 5430,
  },
];

const typeConfig = {
  email: { label: "Email", color: "bg-blue-100 text-blue-800", icon: Mail },
  push: { label: "Push", color: "bg-green-100 text-green-800", icon: Bell },
  sms: {
    label: "SMS",
    color: "bg-purple-100 text-purple-800",
    icon: MessageSquare,
  },
  in_app: {
    label: "In-App",
    color: "bg-orange-100 text-orange-800",
    icon: Bell,
  },
};

const statusConfig = {
  draft: { label: "Draft", color: "bg-gray-100 text-gray-800" },
  scheduled: { label: "Scheduled", color: "bg-yellow-100 text-yellow-800" },
  sent: { label: "Sent", color: "bg-green-100 text-green-800" },
  failed: { label: "Failed", color: "bg-red-100 text-red-800" },
};

const recipientConfig = {
  all_users: { label: "All Users", icon: Users },
  providers: { label: "Providers", icon: User },
  customers: { label: "Customers", icon: User },
  specific: { label: "Specific Users", icon: User },
};

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<"notifications" | "templates">(
    "notifications",
  );
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [emailTemplates, setEmailTemplates] =
    useState<EmailTemplate[]>(mockEmailTemplates);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<NotificationStatus | "all">(
    "all",
  );
  const [typeFilter, setTypeFilter] = useState<NotificationType | "all">("all");

  const [showNewNotification, setShowNewNotification] = useState(false);
  const [showNewTemplate, setShowNewTemplate] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [selectedTemplate, setSelectedTemplate] =
    useState<EmailTemplate | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // New notification form state
  const [newNotification, setNewNotification] = useState({
    title: "",
    content: "",
    type: "email" as NotificationType,
    recipientType: "all_users" as RecipientType,
    scheduledAt: "",
  });

  // New template form state
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    subject: "",
    content: "",
    type: "system" as EmailTemplate["type"],
    variables: [] as string[],
  });

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || notification.status === statusFilter;
    const matchesType =
      typeFilter === "all" || notification.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const filteredTemplates = emailTemplates.filter((template) => {
    return (
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const stats = {
    totalNotifications: notifications.length,
    sent: notifications.filter((n) => n.status === "sent").length,
    scheduled: notifications.filter((n) => n.status === "scheduled").length,
    drafts: notifications.filter((n) => n.status === "draft").length,
    totalRecipients: notifications.reduce(
      (sum, n) => sum + n.recipientCount,
      0,
    ),
    avgOpenRate:
      notifications
        .filter((n) => n.openRate)
        .reduce((sum, n) => sum + (n.openRate || 0), 0) /
        notifications.filter((n) => n.openRate).length || 0,
    avgClickRate:
      notifications
        .filter((n) => n.clickRate)
        .reduce((sum, n) => sum + (n.clickRate || 0), 0) /
        notifications.filter((n) => n.clickRate).length || 0,
    templatesActive: emailTemplates.filter((t) => t.isActive).length,
  };

  const handleSendNotification = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              status: "sent" as NotificationStatus,
              sentAt: new Date().toISOString(),
              openRate: Math.random() * 90 + 10,
              clickRate: Math.random() * 40 + 5,
              deliveryRate: Math.random() * 10 + 90,
            }
          : notification,
      ),
    );
  };

  const handleCreateNotification = () => {
    const notification: Notification = {
      id: `NOT${String(notifications.length + 1).padStart(3, "0")}`,
      title: newNotification.title,
      content: newNotification.content,
      type: newNotification.type,
      status: newNotification.scheduledAt ? "scheduled" : "draft",
      recipientType: newNotification.recipientType,
      recipientCount:
        newNotification.recipientType === "all_users"
          ? 15420
          : newNotification.recipientType === "providers"
            ? 3420
            : 12000,
      scheduledAt: newNotification.scheduledAt || undefined,
      createdAt: new Date().toISOString(),
      createdBy: "admin@platform.com",
    };

    setNotifications([notification, ...notifications]);
    setNewNotification({
      title: "",
      content: "",
      type: "email",
      recipientType: "all_users",
      scheduledAt: "",
    });
    setShowNewNotification(false);
  };

  const handleCreateTemplate = () => {
    const template: EmailTemplate = {
      id: `TPL${String(emailTemplates.length + 1).padStart(3, "0")}`,
      name: newTemplate.name,
      subject: newTemplate.subject,
      content: newTemplate.content,
      type: newTemplate.type,
      variables: newTemplate.variables,
      isActive: true,
      usageCount: 0,
    };

    setEmailTemplates([template, ...emailTemplates]);
    setNewTemplate({
      name: "",
      subject: "",
      content: "",
      type: "system",
      variables: [],
    });
    setShowNewTemplate(false);
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Platform Notifications
            </h1>
            <p className="text-gray-600">
              Manage platform-wide notifications and email templates
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() =>
                activeTab === "notifications"
                  ? setShowNewNotification(true)
                  : setShowNewTemplate(true)
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              {activeTab === "notifications"
                ? "New Notification"
                : "New Template"}
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("notifications")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "notifications"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Bell className="h-4 w-4 inline mr-2" />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab("templates")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "templates"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Mail className="h-4 w-4 inline mr-2" />
              Email Templates
            </button>
          </nav>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4">
          <Card className="p-4">
            <div className="text-2xl font-bold text-gray-900">
              {stats.totalNotifications}
            </div>
            <div className="text-sm text-gray-600">Total Notifications</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {stats.sent}
            </div>
            <div className="text-sm text-gray-600">Sent</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {stats.scheduled}
            </div>
            <div className="text-sm text-gray-600">Scheduled</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-gray-600">
              {stats.drafts}
            </div>
            <div className="text-sm text-gray-600">Drafts</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {stats.totalRecipients.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Recipients</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {stats.avgOpenRate.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Avg Open Rate</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {stats.avgClickRate.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Avg Click Rate</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {stats.templatesActive}
            </div>
            <div className="text-sm text-gray-600">Active Templates</div>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          {activeTab === "notifications" && (
            <>
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as NotificationStatus | "all")
                }
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
                <option value="sent">Sent</option>
                <option value="failed">Failed</option>
              </select>
              <select
                value={typeFilter}
                onChange={(e) =>
                  setTypeFilter(e.target.value as NotificationType | "all")
                }
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="email">Email</option>
                <option value="push">Push</option>
                <option value="sms">SMS</option>
                <option value="in_app">In-App</option>
              </select>
            </>
          )}
        </div>

        {/* Content Tables */}
        {activeTab === "notifications" ? (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-4 font-medium text-gray-900">
                      Notification
                    </th>
                    <th className="text-left p-4 font-medium text-gray-900">
                      Type
                    </th>
                    <th className="text-left p-4 font-medium text-gray-900">
                      Recipients
                    </th>
                    <th className="text-left p-4 font-medium text-gray-900">
                      Status
                    </th>
                    <th className="text-left p-4 font-medium text-gray-900">
                      Performance
                    </th>
                    <th className="text-left p-4 font-medium text-gray-900">
                      Date
                    </th>
                    <th className="text-left p-4 font-medium text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredNotifications.map((notification) => {
                    const typeInfo = typeConfig[notification.type];
                    const statusInfo = statusConfig[notification.status];
                    const recipientInfo =
                      recipientConfig[notification.recipientType];

                    return (
                      <tr
                        key={notification.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="p-4">
                          <div className="font-medium text-gray-900">
                            {notification.title}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-1">
                            {notification.content.substring(0, 80)}...
                          </div>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded-full text-sm font-medium ${typeInfo.color}`}
                          >
                            {typeInfo.label}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center">
                            <recipientInfo.icon className="h-4 w-4 mr-2 text-gray-400" />
                            <div>
                              <div className="font-medium text-gray-900">
                                {recipientInfo.label}
                              </div>
                              <div className="text-sm text-gray-500">
                                {notification.recipientCount.toLocaleString()}{" "}
                                users
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}
                          >
                            {statusInfo.label}
                          </span>
                        </td>
                        <td className="p-4">
                          {notification.openRate ? (
                            <div className="text-sm">
                              <div>
                                Open: {notification.openRate.toFixed(1)}%
                              </div>
                              <div>
                                Click: {notification.clickRate?.toFixed(1)}%
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="text-sm text-gray-900">
                            {notification.sentAt
                              ? `Sent: ${new Date(notification.sentAt).toLocaleDateString()}`
                              : notification.scheduledAt
                                ? `Scheduled: ${new Date(notification.scheduledAt).toLocaleDateString()}`
                                : `Created: ${new Date(notification.createdAt).toLocaleDateString()}`}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {notification.status === "draft" && (
                              <>
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                  onClick={() =>
                                    handleSendNotification(notification.id)
                                  }
                                >
                                  <Send className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        ) : (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-4 font-medium text-gray-900">
                      Template Name
                    </th>
                    <th className="text-left p-4 font-medium text-gray-900">
                      Type
                    </th>
                    <th className="text-left p-4 font-medium text-gray-900">
                      Subject
                    </th>
                    <th className="text-left p-4 font-medium text-gray-900">
                      Usage
                    </th>
                    <th className="text-left p-4 font-medium text-gray-900">
                      Status
                    </th>
                    <th className="text-left p-4 font-medium text-gray-900">
                      Last Used
                    </th>
                    <th className="text-left p-4 font-medium text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTemplates.map((template) => (
                    <tr
                      key={template.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="p-4">
                        <div className="font-medium text-gray-900">
                          {template.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          Variables:{" "}
                          {template.variables.length > 0
                            ? template.variables.join(", ")
                            : "None"}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 capitalize">
                          {template.type}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-gray-900">
                          {template.subject}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-gray-900">
                          {template.usageCount.toLocaleString()} times
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-sm font-medium ${
                            template.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {template.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-gray-500">
                          {template.lastUsed
                            ? new Date(template.lastUsed).toLocaleDateString()
                            : "Never"}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* New Notification Modal */}
        {showNewNotification && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Create New Notification
                  </h2>
                  <Button
                    variant="outline"
                    onClick={() => setShowNewNotification(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <Input
                      value={newNotification.title}
                      onChange={(e) =>
                        setNewNotification({
                          ...newNotification,
                          title: e.target.value,
                        })
                      }
                      placeholder="Enter notification title..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Content
                    </label>
                    <textarea
                      value={newNotification.content}
                      onChange={(e) =>
                        setNewNotification({
                          ...newNotification,
                          content: e.target.value,
                        })
                      }
                      placeholder="Enter notification content..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type
                      </label>
                      <select
                        value={newNotification.type}
                        onChange={(e) =>
                          setNewNotification({
                            ...newNotification,
                            type: e.target.value as NotificationType,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="email">Email</option>
                        <option value="push">Push Notification</option>
                        <option value="sms">SMS</option>
                        <option value="in_app">In-App</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Recipients
                      </label>
                      <select
                        value={newNotification.recipientType}
                        onChange={(e) =>
                          setNewNotification({
                            ...newNotification,
                            recipientType: e.target.value as RecipientType,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="all_users">All Users</option>
                        <option value="providers">Providers Only</option>
                        <option value="customers">Customers Only</option>
                        <option value="specific">Specific Users</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Schedule (Optional)
                    </label>
                    <input
                      type="datetime-local"
                      value={newNotification.scheduledAt}
                      onChange={(e) =>
                        setNewNotification({
                          ...newNotification,
                          scheduledAt: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <Button
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={handleCreateNotification}
                      disabled={
                        !newNotification.title || !newNotification.content
                      }
                    >
                      Create Notification
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowNewNotification(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* New Template Modal */}
        {showNewTemplate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Create New Email Template
                  </h2>
                  <Button
                    variant="outline"
                    onClick={() => setShowNewTemplate(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Template Name
                    </label>
                    <Input
                      value={newTemplate.name}
                      onChange={(e) =>
                        setNewTemplate({ ...newTemplate, name: e.target.value })
                      }
                      placeholder="Enter template name..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <Input
                      value={newTemplate.subject}
                      onChange={(e) =>
                        setNewTemplate({
                          ...newTemplate,
                          subject: e.target.value,
                        })
                      }
                      placeholder="Enter email subject..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Template Type
                    </label>
                    <select
                      value={newTemplate.type}
                      onChange={(e) =>
                        setNewTemplate({
                          ...newTemplate,
                          type: e.target.value as EmailTemplate["type"],
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="welcome">Welcome</option>
                      <option value="booking">Booking</option>
                      <option value="payment">Payment</option>
                      <option value="reminder">Reminder</option>
                      <option value="marketing">Marketing</option>
                      <option value="system">System</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Content
                    </label>
                    <textarea
                      value={newTemplate.content}
                      onChange={(e) =>
                        setNewTemplate({
                          ...newTemplate,
                          content: e.target.value,
                        })
                      }
                      placeholder="Enter template content... Use {{variableName}} for dynamic content"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={6}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Variables (comma-separated)
                    </label>
                    <Input
                      value={newTemplate.variables.join(", ")}
                      onChange={(e) =>
                        setNewTemplate({
                          ...newTemplate,
                          variables: e.target.value
                            .split(",")
                            .map((v) => v.trim())
                            .filter((v) => v),
                        })
                      }
                      placeholder="name, email, serviceName, amount..."
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <Button
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={handleCreateTemplate}
                      disabled={
                        !newTemplate.name ||
                        !newTemplate.subject ||
                        !newTemplate.content
                      }
                    >
                      Create Template
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowNewTemplate(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
