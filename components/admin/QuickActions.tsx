"use client";

import { useState } from "react";
import {
  UserCheck,
  MessageSquare,
  Package,
  CreditCard,
  Bell,
  Settings,
  Shield,
  AlertTriangle,
  Users,
  Star,
  TrendingUp,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  RefreshCw,
  Filter,
  Search,
  Plus,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Ban,
  Unlock,
  Lock,
  Send,
  Archive,
  Flag,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: any;
  badge?: number;
  color: string;
  category: string;
  priority: "high" | "medium" | "low";
  onClick: () => void;
}

interface QuickActionsProps {
  onActionClick: (actionId: string) => void;
}

export function QuickActions({ onActionClick }: QuickActionsProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const quickActions: QuickAction[] = [
    // User Management Actions
    {
      id: "verify_providers",
      title: "Verify Providers",
      description: "Review and approve pending provider applications",
      icon: UserCheck,
      badge: 45,
      color: "border-green-500 text-green-600 hover:bg-green-50",
      category: "users",
      priority: "high",
      onClick: () => onActionClick("verify_providers"),
    },
    {
      id: "review_users",
      title: "Review Users",
      description: "Moderate user accounts and profiles",
      icon: Users,
      badge: 12,
      color: "border-blue-500 text-blue-600 hover:bg-blue-50",
      category: "users",
      priority: "medium",
      onClick: () => onActionClick("review_users"),
    },
    {
      id: "suspend_users",
      title: "Suspended Users",
      description: "Manage suspended user accounts",
      icon: Ban,
      badge: 8,
      color: "border-red-500 text-red-600 hover:bg-red-50",
      category: "users",
      priority: "high",
      onClick: () => onActionClick("suspend_users"),
    },

    // Service Management Actions
    {
      id: "approve_services",
      title: "Approve Services",
      description: "Review and approve new service listings",
      icon: Package,
      badge: 23,
      color: "border-purple-500 text-purple-600 hover:bg-purple-50",
      category: "services",
      priority: "high",
      onClick: () => onActionClick("approve_services"),
    },
    {
      id: "featured_services",
      title: "Featured Services",
      description: "Manage featured service listings",
      icon: Star,
      color: "border-yellow-500 text-yellow-600 hover:bg-yellow-50",
      category: "services",
      priority: "low",
      onClick: () => onActionClick("featured_services"),
    },
    {
      id: "service_categories",
      title: "Service Categories",
      description: "Manage service categories and subcategories",
      icon: FileText,
      color: "border-indigo-500 text-indigo-600 hover:bg-indigo-50",
      category: "services",
      priority: "low",
      onClick: () => onActionClick("service_categories"),
    },

    // Financial Actions
    {
      id: "process_payouts",
      title: "Process Payouts",
      description: "Review and process provider payouts",
      icon: CreditCard,
      badge: 15,
      color: "border-green-500 text-green-600 hover:bg-green-50",
      category: "finance",
      priority: "high",
      onClick: () => onActionClick("process_payouts"),
    },
    {
      id: "transaction_disputes",
      title: "Transaction Disputes",
      description: "Handle payment and booking disputes",
      icon: AlertTriangle,
      badge: 7,
      color: "border-red-500 text-red-600 hover:bg-red-50",
      category: "finance",
      priority: "high",
      onClick: () => onActionClick("transaction_disputes"),
    },
    {
      id: "commission_settings",
      title: "Commission Settings",
      description: "Configure commission rates and structures",
      icon: TrendingUp,
      color: "border-blue-500 text-blue-600 hover:bg-blue-50",
      category: "finance",
      priority: "medium",
      onClick: () => onActionClick("commission_settings"),
    },
    {
      id: "refund_requests",
      title: "Refund Requests",
      description: "Process customer refund requests",
      icon: RefreshCw,
      badge: 5,
      color: "border-orange-500 text-orange-600 hover:bg-orange-50",
      category: "finance",
      priority: "medium",
      onClick: () => onActionClick("refund_requests"),
    },

    // Support Actions
    {
      id: "support_tickets",
      title: "Support Tickets",
      description: "Handle customer support requests",
      icon: Bell,
      badge: 23,
      color: "border-yellow-500 text-yellow-600 hover:bg-yellow-50",
      category: "support",
      priority: "high",
      onClick: () => onActionClick("support_tickets"),
    },
    {
      id: "resolve_disputes",
      title: "Resolve Disputes",
      description: "Mediate customer and provider disputes",
      icon: MessageSquare,
      badge: 12,
      color: "border-red-500 text-red-600 hover:bg-red-50",
      category: "support",
      priority: "high",
      onClick: () => onActionClick("resolve_disputes"),
    },
    {
      id: "user_reports",
      title: "User Reports",
      description: "Review user-submitted reports",
      icon: Flag,
      badge: 18,
      color: "border-purple-500 text-purple-600 hover:bg-purple-50",
      category: "support",
      priority: "medium",
      onClick: () => onActionClick("user_reports"),
    },

    // System Actions
    {
      id: "system_settings",
      title: "System Settings",
      description: "Configure platform settings",
      icon: Settings,
      color: "border-gray-500 text-gray-600 hover:bg-gray-50",
      category: "system",
      priority: "low",
      onClick: () => onActionClick("system_settings"),
    },
    {
      id: "security_logs",
      title: "Security Logs",
      description: "Review system security events",
      icon: Shield,
      badge: 3,
      color: "border-red-500 text-red-600 hover:bg-red-50",
      category: "system",
      priority: "high",
      onClick: () => onActionClick("security_logs"),
    },
    {
      id: "backup_system",
      title: "Backup System",
      description: "Manage system backups and recovery",
      icon: Archive,
      color: "border-blue-500 text-blue-600 hover:bg-blue-50",
      category: "system",
      priority: "medium",
      onClick: () => onActionClick("backup_system"),
    },

    // Communication Actions
    {
      id: "send_notifications",
      title: "Send Notifications",
      description: "Send announcements to users",
      icon: Send,
      color: "border-blue-500 text-blue-600 hover:bg-blue-50",
      category: "communication",
      priority: "medium",
      onClick: () => onActionClick("send_notifications"),
    },
    {
      id: "email_templates",
      title: "Email Templates",
      description: "Manage email template library",
      icon: Mail,
      color: "border-purple-500 text-purple-600 hover:bg-purple-50",
      category: "communication",
      priority: "low",
      onClick: () => onActionClick("email_templates"),
    },

    // Analytics Actions
    {
      id: "generate_reports",
      title: "Generate Reports",
      description: "Create platform analytics reports",
      icon: Download,
      color: "border-green-500 text-green-600 hover:bg-green-50",
      category: "analytics",
      priority: "medium",
      onClick: () => onActionClick("generate_reports"),
    },
    {
      id: "user_analytics",
      title: "User Analytics",
      description: "View detailed user behavior analytics",
      icon: TrendingUp,
      color: "border-blue-500 text-blue-600 hover:bg-blue-50",
      category: "analytics",
      priority: "low",
      onClick: () => onActionClick("user_analytics"),
    },
  ];

  const categories = [
    { id: "all", name: "All Actions", count: quickActions.length },
    {
      id: "users",
      name: "User Management",
      count: quickActions.filter((a) => a.category === "users").length,
    },
    {
      id: "services",
      name: "Service Management",
      count: quickActions.filter((a) => a.category === "services").length,
    },
    {
      id: "finance",
      name: "Financial",
      count: quickActions.filter((a) => a.category === "finance").length,
    },
    {
      id: "support",
      name: "Support",
      count: quickActions.filter((a) => a.category === "support").length,
    },
    {
      id: "system",
      name: "System",
      count: quickActions.filter((a) => a.category === "system").length,
    },
    {
      id: "communication",
      name: "Communication",
      count: quickActions.filter((a) => a.category === "communication").length,
    },
    {
      id: "analytics",
      name: "Analytics",
      count: quickActions.filter((a) => a.category === "analytics").length,
    },
  ];

  const filteredActions = quickActions.filter((action) => {
    const matchesCategory =
      selectedCategory === "all" || action.category === selectedCategory;
    const matchesSearch =
      action.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      action.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const priorityActions = filteredActions.filter(
    (action) => action.priority === "high",
  );
  const totalBadgeCount = quickActions.reduce(
    (sum, action) => sum + (action.badge || 0),
    0,
  );

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Quick Actions
            </h3>
            <p className="text-gray-600 mt-1">
              Manage your platform efficiently with these quick actions
            </p>
            {totalBadgeCount > 0 && (
              <div className="mt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                  {totalBadgeCount} items need attention
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Customize
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search actions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name}
                {category.count > 0 && (
                  <span className="ml-2 text-xs opacity-75">
                    ({category.count})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Priority Actions Alert */}
        {priorityActions.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
              <div>
                <h4 className="text-sm font-medium text-red-800">
                  High Priority Actions Required
                </h4>
                <p className="text-sm text-red-700 mt-1">
                  {priorityActions.length} high priority action(s) need your
                  immediate attention
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredActions.map((action) => (
            <QuickActionCard
              key={action.id}
              action={action}
              onClick={action.onClick}
            />
          ))}
        </div>

        {filteredActions.length === 0 && (
          <div className="text-center py-8">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No actions found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

// Quick Action Card Component
function QuickActionCard({
  action,
  onClick,
}: {
  action: QuickAction;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      variant="outline"
      className={`h-auto p-4 flex-col relative transition-all duration-200 ${action.color} ${
        isHovered ? "scale-105 shadow-lg" : ""
      }`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Priority Indicator */}
      {action.priority === "high" && (
        <div className="absolute top-2 right-2">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        </div>
      )}

      {/* Badge */}
      {action.badge && action.badge > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-medium">
          {action.badge > 99 ? "99+" : action.badge}
        </span>
      )}

      {/* Icon */}
      <action.icon className="h-8 w-8 mb-3" />

      {/* Content */}
      <div className="text-center">
        <div className="font-medium text-sm mb-1">{action.title}</div>
        <div className="text-xs text-gray-500 leading-tight">
          {action.description}
        </div>
      </div>

      {/* Action Indicators */}
      <div className="flex items-center justify-center mt-3 space-x-2">
        {action.priority === "high" && (
          <span className="text-xs text-red-600 font-medium">URGENT</span>
        )}
        {action.badge && action.badge > 0 && (
          <span className="text-xs text-blue-600">{action.badge} pending</span>
        )}
      </div>
    </Button>
  );
}

// Quick Actions Modal Component for detailed actions
export function QuickActionsModal({
  isOpen,
  onClose,
  actionId,
}: {
  isOpen: boolean;
  onClose: () => void;
  actionId: string | null;
}) {
  if (!isOpen || !actionId) return null;

  const getModalContent = () => {
    switch (actionId) {
      case "verify_providers":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Provider Verification</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    👨‍💻
                  </div>
                  <div>
                    <p className="font-medium">Amit Poudel</p>
                    <p className="text-sm text-gray-500">Web Developer</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" className="bg-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button variant="outline" size="sm">
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    👩‍🎨
                  </div>
                  <div>
                    <p className="font-medium">Maya Tamang</p>
                    <p className="text-sm text-gray-500">Graphic Designer</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" className="bg-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button variant="outline" size="sm">
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    👨‍🏫
                  </div>
                  <div>
                    <p className="font-medium">Raj Gurung</p>
                    <p className="text-sm text-gray-500">Math Tutor</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" className="bg-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button variant="outline" size="sm">
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      case "support_tickets":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Recent Support Tickets</h3>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">Payment Issue</h4>
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                    High Priority
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Customer unable to complete payment for booking
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">2 hours ago</span>
                  <Button size="sm">Respond</Button>
                </div>
              </div>
              {/* Add more tickets */}
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-600">Action details for {actionId}</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {getModalContent()}
            <div className="mt-6 flex justify-end">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
