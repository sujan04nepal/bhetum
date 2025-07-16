"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  UserCheck,
  Package,
  Calendar,
  CreditCard,
  BarChart3,
  Settings,
  FileText,
  Bell,
  Shield,
  Activity,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Home,
  Database,
  Flag,
  MessageCircle,
  Star,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  href?: string;
  children?: MenuItem[];
}

export function AdminSidebar() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([
    "users",
    "services",
    "payments",
  ]);

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      label: language === "ne" ? "ड्यासबोर्ड" : "Dashboard",
      icon: Home,
      href: "/admin",
    },
    {
      id: "users",
      label: language === "ne" ? "प्रयोगकर्ता व्यवस्थापन" : "User Management",
      icon: Users,
      children: [
        {
          id: "service-providers",
          label: language === "ne" ? "सेवा प्रदायकहरू" : "Service Providers",
          icon: UserCheck,
          href: "/admin/users/providers",
        },
        {
          id: "service-seekers",
          label: language === "ne" ? "सेवा खोज्नेहरू" : "Service Seekers",
          icon: Users,
          href: "/admin/users/seekers",
        },
        {
          id: "user-verification",
          label:
            language === "ne"
              ? "प्रयोगकर्ता प्रमा���ीकरण"
              : "User Verification",
          icon: Shield,
          href: "/admin/users/verification",
        },
      ],
    },
    {
      id: "services",
      label: language === "ne" ? "सेवा व्यवस्थापन" : "Service Management",
      icon: Package,
      children: [
        {
          id: "all-services",
          label: language === "ne" ? "सबै सेवाहरू" : "All Services",
          icon: Package,
          href: "/admin/services",
        },
        {
          id: "categories",
          label: language === "ne" ? "श्रेणीहरू" : "Categories",
          icon: FileText,
          href: "/admin/services/categories",
        },
        {
          id: "service-approval",
          label: language === "ne" ? "सेवा अनुमोदन" : "Service Approval",
          icon: UserCheck,
          href: "/admin/services/approval",
        },
      ],
    },
    {
      id: "bookings",
      label: language === "ne" ? "बुकिङ र लेनदेन" : "Booking & Transactions",
      icon: Calendar,
      href: "/admin/bookings",
    },
    {
      id: "payments",
      label: language === "ne" ? "भुक्तानी र कमिसन" : "Payments & Commission",
      icon: CreditCard,
      children: [
        {
          id: "revenue-tracking",
          label: language === "ne" ? "आम्दानी ट्र्याकिङ" : "Revenue Tracking",
          icon: BarChart3,
          href: "/admin/payments/revenue",
        },
        {
          id: "commission-settings",
          label: language === "ne" ? "कमिसन सेटिङ्स" : "Commission Settings",
          icon: Settings,
          href: "/admin/payments/commission",
        },
        {
          id: "payouts",
          label: language === "ne" ? "भुक्तानी" : "Payouts",
          icon: CreditCard,
          href: "/admin/payments/payouts",
        },
      ],
    },
    {
      id: "disputes",
      label: language === "ne" ? "विवाद र समीक्षा" : "Disputes & Reviews",
      icon: Flag,
      children: [
        {
          id: "dispute-management",
          label: language === "ne" ? "विवाद व्यवस्थापन" : "Dispute Management",
          icon: Flag,
          href: "/admin/disputes",
        },
        {
          id: "review-moderation",
          label: language === "ne" ? "समीक्षा मोडरे��न" : "Review Moderation",
          icon: Star,
          href: "/admin/reviews",
        },
        {
          id: "reports",
          label: language === "ne" ? "रिपोर्टहरू" : "Reports",
          icon: FileText,
          href: "/admin/reports",
        },
      ],
    },
    {
      id: "notifications",
      label:
        language === "ne" ? "प्लेटफर्म सूचनाहरू" : "Platform Notifications",
      icon: Bell,
      children: [
        {
          id: "send-notifications",
          label: language === "ne" ? "सूचना पठाउनुहोस्" : "Send Notifications",
          icon: Bell,
          href: "/admin/notifications/send",
        },
        {
          id: "email-templates",
          label: language === "ne" ? "इमेल टेम्प्लेटहरू" : "Email Templates",
          icon: FileText,
          href: "/admin/notifications/templates",
        },
        {
          id: "push-settings",
          label: language === "ne" ? "पुश सेटिङ्स" : "Push Settings",
          icon: Settings,
          href: "/admin/notifications/push",
        },
      ],
    },
    {
      id: "analytics",
      label: language === "ne" ? "विश्लेषण" : "Analytics",
      icon: BarChart3,
      href: "/admin/analytics",
    },
    {
      id: "database",
      label: language === "ne" ? "डाटाबेस व्यवस्थापन" : "Database Management",
      icon: Database,
      href: "/admin/database",
    },
    {
      id: "settings",
      label: language === "ne" ? "सेटिङ र कन्फिगरेसन" : "Settings & Config",
      icon: Settings,
      children: [
        {
          id: "platform-settings",
          label: language === "ne" ? "प्लेटफर्म सेटिङ्स" : "Platform Settings",
          icon: Settings,
          href: "/admin/settings/platform",
        },
        {
          id: "commission-rates",
          label: language === "ne" ? "कमिसन दरहरू" : "Commission Rates",
          icon: CreditCard,
          href: "/admin/settings/commission",
        },
        {
          id: "service-categories-mgmt",
          label: language === "ne" ? "सेवा श्रेणीहरू" : "Service Categories",
          icon: Package,
          href: "/admin/settings/categories",
        },
        {
          id: "system-maintenance",
          label: language === "ne" ? "सिस्टम मर्मत" : "System Maintenance",
          icon: Settings,
          href: "/admin/settings/maintenance",
        },
      ],
    },
    {
      id: "logs",
      label: language === "ne" ? "लगहरू र अडिट" : "Logs & Audit",
      icon: Activity,
      children: [
        {
          id: "activity-logs",
          label: language === "ne" ? "गतिविधि लगहरू" : "Activity Logs",
          icon: Activity,
          href: "/admin/logs/activity",
        },
        {
          id: "admin-actions",
          label: language === "ne" ? "प्रशासक कार्यहरू" : "Admin Actions",
          icon: Shield,
          href: "/admin/logs/admin",
        },
        {
          id: "security-logs",
          label: language === "ne" ? "सुरक्षा लगहरू" : "Security Logs",
          icon: Shield,
          href: "/admin/logs/security",
        },
      ],
    },
    {
      id: "support",
      label: language === "ne" ? "सहयोग उपकरणहरू" : "Support Tools",
      icon: HelpCircle,
      href: "/admin/support",
    },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const isItemActive = item.href ? isActive(item.href) : false;

    return (
      <div key={item.id}>
        {item.href ? (
          <Link
            href={item.href}
            className={`flex items-center px-4 py-3 text-sm transition-colors ${
              level > 0 ? "pl-12" : ""
            } ${
              isItemActive
                ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.label}
          </Link>
        ) : (
          <button
            onClick={() => hasChildren && toggleExpanded(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors ${
              level > 0 ? "pl-12" : ""
            } text-gray-700 hover:bg-gray-50`}
          >
            <div className="flex items-center">
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </div>
            {hasChildren && (
              <div className="ml-auto">
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            )}
          </button>
        )}

        {hasChildren && isExpanded && (
          <div className="bg-gray-25">
            {item.children!.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="text-2xl mr-2">🇳🇵</div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              {language === "ne" ? "सेवा खोज" : "ServiceConnect"}
            </h1>
            <p className="text-xs text-gray-500">
              {language === "ne" ? "प्रशासक प्यानल" : "Admin Panel"}
            </p>
          </div>
        </div>
      </div>

      <nav className="py-4">
        {menuItems.map((item) => renderMenuItem(item))}
      </nav>
    </div>
  );
}
