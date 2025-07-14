"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This will come from auth context later
  const { t, language } = useLanguage();

  const navigation = [
    { name: t("nav.services"), href: "/services" },
    { name: t("nav.becomeProvider"), href: "/provider/signup" },
    { name: t("nav.howItWorks"), href: "/how-it-works" },
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
              className="text-2xl font-bold text-primary-600 flex items-center"
            >
              <span className="mr-2">🇳🇵</span>
              {brandName}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <LanguageToggle />

            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-primary-600">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-primary-600">
                    <User className="h-5 w-5" />
                    <span className="hidden sm:block">{t("nav.profile")}</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm">
                  <Link href="/auth/signin">{t("nav.signin")}</Link>
                </Button>
                <Button size="sm">
                  <Link href="/auth/signup">{t("nav.signup")}</Link>
                </Button>
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
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-gray-600 hover:text-primary-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {!isLoggedIn && (
              <div className="pt-4 space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  <Link href="/auth/signin">{t("nav.signin")}</Link>
                </Button>
                <Button size="sm" className="w-full">
                  <Link href="/auth/signup">{t("nav.signup")}</Link>
                </Button>
              </div>
            )}
            {/* Mobile Language Toggle */}
            <div className="pt-2">
              <LanguageToggle />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
