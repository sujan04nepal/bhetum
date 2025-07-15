"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  const { language } = useLanguage();

  return (
    <nav
      className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`}
      aria-label="Breadcrumb"
    >
      {/* Home Link */}
      <Link
        href="/"
        className="flex items-center hover:text-primary-600 transition-colors"
        aria-label={language === "ne" ? "मुख्य पृष��ठ" : "Home"}
      >
        <Home className="h-4 w-4" />
      </Link>

      {items.length > 0 && <ChevronRight className="h-4 w-4 text-gray-400" />}

      {/* Breadcrumb Items */}
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-primary-600 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}

          {index < items.length - 1 && (
            <ChevronRight className="h-4 w-4 text-gray-400" />
          )}
        </div>
      ))}
    </nav>
  );
}
