"use client";

import { useState } from "react";
import {
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  Globe,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/Button";

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
  sidebarOpen?: boolean;
}

export function AdminHeader({
  onToggleSidebar,
  sidebarOpen,
}: AdminHeaderProps) {
  const { language, setLanguage } = useLanguage();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const notifications = [
    {
      id: 1,
      title:
        language === "ne"
          ? "नयाँ सेवा प्रदायक दर्ता"
          : "New Provider Registration",
      message:
        language === "ne"
          ? "राम शर्माले दर्ता गरेका छन्"
          : "Ram Sharma has registered",
      time: "2 min ago",
      unread: true,
    },
    {
      id: 2,
      title: language === "ne" ? "भुक्तानी समस्या" : "Payment Issue",
      message: language === "ne" ? "लेनदेन असफल भयो" : "Transaction failed",
      time: "5 min ago",
      unread: true,
    },
    {
      id: 3,
      title: language === "ne" ? "समीक्षा मोडरेसन" : "Review Moderation",
      message:
        language === "ne"
          ? "नयाँ समीक्षा अनुमोदनको लागि"
          : "New review pending approval",
      time: "10 min ago",
      unread: false,
    },
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          <div className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={
                  language === "ne"
                    ? "खोज्नुहोस्..."
                    : "Search users, services, transactions..."
                }
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === "ne" ? "en" : "ne")}
            className="p-2 rounded-lg hover:bg-gray-100 flex items-center space-x-1"
            title={
              language === "ne" ? "Switch to English" : "नेपालीमा बदल्नुहोस्"
            }
          >
            <Globe className="h-4 w-4" />
            <span className="text-sm font-medium">
              {language === "ne" ? "EN" : "ने"}
            </span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-gray-100"
            title={darkMode ? "Light Mode" : "Dark Mode"}
          >
            {darkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-gray-100 relative"
            >
              <Bell className="h-5 w-5" />
              {notifications.some((n) => n.unread) && (
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-medium text-gray-900">
                    {language === "ne" ? "सूचनाहरू" : "Notifications"}
                  </h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                        notification.unread ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                        </div>
                        {notification.unread && (
                          <div className="h-2 w-2 bg-blue-600 rounded-full ml-2 mt-2"></div>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        {notification.time}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <Button variant="outline" size="sm" className="w-full">
                    {language === "ne" ? "सबै हेर्नुहोस्" : "View All"}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
            >
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">
                  {language === "ne" ? "प्रशासक" : "Administrator"}
                </p>
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 top-12 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-2">
                  <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                    <User className="h-4 w-4 mr-2" />
                    {language === "ne" ? "प्रोफाइल" : "Profile"}
                  </button>
                  <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                    <Settings className="h-4 w-4 mr-2" />
                    {language === "ne" ? "सेटिङ्स" : "Settings"}
                  </button>
                  <hr className="my-2" />
                  <button className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                    <LogOut className="h-4 w-4 mr-2" />
                    {language === "ne" ? "लगआउट" : "Logout"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden mt-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder={language === "ne" ? "खोज्नुहोस्..." : "Search..."}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </header>
  );
}
