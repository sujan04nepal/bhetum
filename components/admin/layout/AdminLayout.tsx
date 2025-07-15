"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Home,
  Users,
  UserCheck,
  Settings,
  BarChart3,
  Package,
  Calendar,
  CreditCard,
  MessageSquare,
  Shield,
  Bell,
  HelpCircle,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Search,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const getSidebarItems = (t: (key: string) => string) => [
  {
    title: t("admin.dashboard"),
    href: "/admin",
    icon: Home,
    exact: true,
  },
  {
    title: t("admin.userManagement"),
    icon: Users,
    submenu: [
      { title: t("admin.serviceProviders"), href: "/admin/users/providers" },
      { title: t("admin.serviceSeekers"), href: "/admin/users/seekers" },
      { title: t("admin.userVerification"), href: "/admin/users/verification" },
    ],
  },
  {
    title: t("admin.serviceManagement"),
    icon: Package,
    submenu: [
      { title: t("admin.allServices"), href: "/admin/services" },
      { title: t("admin.categories"), href: "/admin/services/categories" },
      { title: t("admin.serviceApproval"), href: "/admin/services/approval" },
    ],
  },
  {
    title: t("admin.bookingTransactions"),
    icon: Calendar,
    submenu: [
      { title: t("admin.allBookings"), href: "/admin/bookings" },
      { title: t("admin.transactions"), href: "/admin/transactions" },
      { title: t("admin.refunds"), href: "/admin/transactions/refunds" },
    ],
  },
  {
    title: t("admin.paymentsCommission"),
    icon: CreditCard,
    submenu: [
      { title: t("admin.revenueTracking"), href: "/admin/payments/revenue" },
      {
        title: t("admin.commissionSettings"),
        href: "/admin/payments/commission",
      },
      { title: t("admin.payouts"), href: "/admin/payments/payouts" },
    ],
  },
  {
    title: t("admin.disputesReviews"),
    icon: MessageSquare,
    submenu: [
      { title: t("admin.disputeManagement"), href: "/admin/disputes" },
      { title: t("admin.reviewModeration"), href: "/admin/reviews" },
      { title: t("admin.reports"), href: "/admin/reports" },
    ],
  },
  {
    title: t("admin.platformNotifications"),
    icon: Bell,
    submenu: [
      {
        title: t("admin.sendNotifications"),
        href: "/admin/notifications/send",
      },
      {
        title: t("admin.emailTemplates"),
        href: "/admin/notifications/templates",
      },
      { title: t("admin.pushSettings"), href: "/admin/notifications/settings" },
    ],
  },
  {
    title: t("admin.analytics"),
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: t("admin.databaseManagement"),
    href: "/admin/database",
    icon: Database,
  },
  {
    title: t("admin.settingsConfig"),
    icon: Settings,
    submenu: [
      { title: t("admin.platformSettings"), href: "/admin/settings/platform" },
      { title: t("admin.commissionRates"), href: "/admin/settings/commission" },
      {
        title: t("admin.serviceCategories"),
        href: "/admin/settings/categories",
      },
      {
        title: t("admin.systemMaintenance"),
        href: "/admin/settings/maintenance",
      },
    ],
  },
  {
    title: t("admin.logsAudit"),
    icon: Shield,
    submenu: [
      { title: t("admin.activityLogs"), href: "/admin/logs/activity" },
      { title: t("admin.adminActions"), href: "/admin/logs/admin" },
      { title: t("admin.securityLogs"), href: "/admin/logs/security" },
    ],
  },
  {
    title: t("admin.supportTools"),
    icon: HelpCircle,
    submenu: [
      { title: t("admin.supportTickets"), href: "/admin/support/tickets" },
      { title: t("admin.quickReplies"), href: "/admin/support/replies" },
      { title: t("admin.contactManagement"), href: "/admin/support/contacts" },
    ],
  },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();
  const { t } = useLanguage();

  const sidebarItems = getSidebarItems(t);

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title],
    );
  };

  const isActive = (href: string, exact = false) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">
            {t("admin.adminPanel")}
          </h1>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <div key={item.title}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive(item.href, item.exact)
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.title}
                  </Link>
                ) : (
                  <div>
                    <button
                      onClick={() => toggleExpanded(item.title)}
                      className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    >
                      <div className="flex items-center">
                        <item.icon className="h-5 w-5 mr-3" />
                        {item.title}
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          expandedItems.includes(item.title)
                            ? "transform rotate-180"
                            : ""
                        }`}
                      />
                    </button>
                    {expandedItems.includes(item.title) && item.submenu && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                              isActive(subItem.href)
                                ? "bg-blue-100 text-blue-700"
                                : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            }`}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Admin user info at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">A</span>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {t("admin.adminUser")}
              </p>
              <p className="text-xs text-gray-500">admin@servicekhoj.com</p>
            </div>
            <Button variant="outline" size="sm">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="ml-4 lg:ml-0">
                <h2 className="text-lg font-semibold text-gray-900">
                  {t("admin.serviceMarketplaceAdmin")}
                </h2>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={t("admin.search")}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Notifications */}
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4" />
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
