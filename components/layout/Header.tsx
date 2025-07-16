"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Bell,
  User,
  ChevronDown,
  Search,
  Plus,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This will come from auth context later
  const { t, language } = useLanguage();

  const mainNavigation = [
    {
      name: t("nav.services"),
      href: "/find-services",
      hasDropdown: true,
      dropdownItems: [
        {
          name: language === "ne" ? "सेवा खोज्नुहोस्" : "Find Services",
          href: "/find-services",
        },
        {
          name: language === "ne" ? "श्रेणीहरू" : "Categories",
          href: "/categories",
        },
        {
          name:
            language === "ne" ? "अनुरोध ब्राउज गर्नुहोस���" : "Browse Requests",
          href: "/browse-requests",
        },
      ],
    },
    {
      name: t("nav.becomeProvider"),
      href: "/become-provider",
    },
    {
      name: t("nav.howItWorks"),
      href: "/how-it-works",
    },
  ];

  const userMenuItems = [
    {
      name: language === "ne" ? "ड्यासबोर्ड" : "Dashboard",
      href: "/dashboard/seeker",
    },
    {
      name: language === "ne" ? "मेरा बुकिङहरू" : "My Bookings",
      href: "/dashboard/seeker/bookings",
    },
    { name: language === "ne" ? "सन्देशहरू" : "Messages", href: "/messages" },
    {
      name: language === "ne" ? "प्रोफाइल" : "Profile",
      href: "/dashboard/seeker/profile",
    },
    { name: language === "ne" ? "सेटिङहरू" : "Settings", href: "/settings" },
  ];

  const brandName = language === "ne" ? "सेवा खोज" : "ServiceConnect";

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-primary-600 flex items-center hover:text-primary-700 transition-colors"
            >
              <span className="mr-2">🇳🇵</span>
              {brandName}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {mainNavigation.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsServicesMenuOpen(true)}
                    onMouseLeave={() => setIsServicesMenuOpen(false)}
                  >
                    <button className="flex items-center text-gray-600 hover:text-primary-600 transition-colors">
                      {item.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>

                    {/* Dropdown Menu */}
                    {isServicesMenuOpen && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                        <div className="py-1">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-600"
                              onClick={() => setIsServicesMenuOpen(false)}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Post Request Button for logged in users */}
            {isLoggedIn && (
              <Link href="/post-request">
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  {language === "ne" ? "अनुरोध पोस्ट" : "Post Request"}
                </Button>
              </Link>
            )}

            {/* Language Toggle */}
            <LanguageToggle />

            {isLoggedIn ? (
              <>
                {/* Messages */}
                <Link href="/messages">
                  <button className="relative p-2 text-gray-600 hover:text-primary-600">
                    <MessageCircle className="h-5 w-5" />
                    <span className="absolute top-1 right-1 h-2 w-2 bg-blue-500 rounded-full"></span>
                  </button>
                </Link>

                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-primary-600">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                {/* User Menu */}
                <div
                  className="relative"
                  onMouseEnter={() => setIsUserMenuOpen(true)}
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-primary-600">
                    <User className="h-5 w-5" />
                    <span className="hidden sm:block">{t("nav.profile")}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      <div className="py-1">
                        {userMenuItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-600"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                        <hr className="my-1" />
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            setIsLoggedIn(false);
                            setIsUserMenuOpen(false);
                          }}
                        >
                          {language === "ne" ? "लग आउट" : "Logout"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    {t("nav.signin")}
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm">{t("nav.signup")}</Button>
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-primary-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t">
            {/* Search link for mobile */}
            <Link
              href="/find-services"
              className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Search className="h-4 w-4 mr-2" />
              {language === "ne" ? "सेवा खोज्नुहोस्" : "Find Services"}
            </Link>

            {/* Categories */}
            <Link
              href="/categories"
              className="block text-gray-600 hover:text-primary-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {language === "ne" ? "श्रेणीहरू" : "Categories"}
            </Link>

            {/* Browse Requests */}
            <Link
              href="/browse-requests"
              className="block text-gray-600 hover:text-primary-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {language === "ne"
                ? "अनुरोध ब्राउज गर्नुहोस्"
                : "Browse Requests"}
            </Link>

            {/* Become Provider */}
            <Link
              href="/become-provider"
              className="block text-gray-600 hover:text-primary-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("nav.becomeProvider")}
            </Link>

            {/* How it Works */}
            <Link
              href="/how-it-works"
              className="block text-gray-600 hover:text-primary-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("nav.howItWorks")}
            </Link>

            {/* Post Request for logged in users */}
            {isLoggedIn && (
              <Link
                href="/post-request"
                className="flex items-center text-green-600 hover:text-green-700 transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Plus className="h-4 w-4 mr-2" />
                {language === "ne" ? "अनुरोध पोस्ट गर्नुहोस्" : "Post Request"}
              </Link>
            )}

            {isLoggedIn ? (
              <div className="pt-4 space-y-2 border-t">
                <div className="text-sm font-medium text-gray-500 px-2">
                  {language === "ne" ? "मेरो खाता" : "My Account"}
                </div>
                {userMenuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-gray-600 hover:text-primary-600 transition-colors px-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  className="block w-full text-left text-gray-600 hover:text-primary-600 transition-colors px-2"
                  onClick={() => {
                    setIsLoggedIn(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {language === "ne" ? "लग आउट" : "Logout"}
                </button>
              </div>
            ) : (
              <div className="pt-4 space-y-2 border-t">
                <Link
                  href="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="outline" size="sm" className="w-full">
                    {t("nav.signin")}
                  </Button>
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button size="sm" className="w-full">
                    {t("nav.signup")}
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Language Toggle */}
            <div className="pt-2 border-t">
              <LanguageToggle />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
