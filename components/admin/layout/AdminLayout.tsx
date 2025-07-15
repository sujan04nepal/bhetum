"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: Home,
    exact: true,
  },
  {
    title: "User Management",
    icon: Users,
    submenu: [
      { title: "Service Providers", href: "/admin/users/providers" },
      { title: "Service Seekers", href: "/admin/users/seekers" },
      { title: "User Verification", href: "/admin/users/verification" },
    ],
  },
  {
    title: "Service Management",
    icon: Package,
    submenu: [
      { title: "All Services", href: "/admin/services" },
      { title: "Categories", href: "/admin/services/categories" },
      { title: "Service Approval", href: "/admin/services/approval" },
    ],
  },
  {
    title: "Booking & Transactions",
    icon: Calendar,
    submenu: [
      { title: "All Bookings", href: "/admin/bookings" },
      { title: "Transactions", href: "/admin/transactions" },
      { title: "Refunds", href: "/admin/transactions/refunds" },
    ],
  },
  {
    title: "Payments & Commission",
    icon: CreditCard,
    submenu: [
      { title: "Revenue Tracking", href: "/admin/payments/revenue" },
      { title: "Commission Settings", href: "/admin/payments/commission" },
      { title: "Payouts", href: "/admin/payments/payouts" },
    ],
  },
  {
    title: "Disputes & Reviews",
    icon: MessageSquare,
    submenu: [
      { title: "Dispute Management", href: "/admin/disputes" },
      { title: "Review Moderation", href: "/admin/reviews" },
      { title: "Reports", href: "/admin/reports" },
    ],
  },
  {
    title: "Platform Notifications",
    icon: Bell,
    submenu: [
      { title: "Send Notifications", href: "/admin/notifications/send" },
      { title: "Email Templates", href: "/admin/notifications/templates" },
      { title: "Push Settings", href: "/admin/notifications/settings" },
    ],
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Database Management",
    href: "/admin/database",
    icon: Database,
  },
  {
    title: "Settings & Config",
    icon: Settings,
    submenu: [
      { title: "Platform Settings", href: "/admin/settings/platform" },
      { title: "Commission Rates", href: "/admin/settings/commission" },
      { title: "Service Categories", href: "/admin/settings/categories" },
      { title: "System Maintenance", href: "/admin/settings/maintenance" },
    ],
  },
  {
    title: "Logs & Audit",
    icon: Shield,
    submenu: [
      { title: "Activity Logs", href: "/admin/logs/activity" },
      { title: "Admin Actions", href: "/admin/logs/admin" },
      { title: "Security Logs", href: "/admin/logs/security" },
    ],
  },
  {
    title: "Support Tools",
    icon: HelpCircle,
    submenu: [
      { title: "Support Tickets", href: "/admin/support/tickets" },
      { title: "Quick Replies", href: "/admin/support/replies" },
      { title: "Contact Management", href: "/admin/support/contacts" },
    ],
  },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();

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
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
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
              <p className="text-sm font-medium text-gray-900">Admin User</p>
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
                  Service Marketplace Admin
                </h2>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
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
