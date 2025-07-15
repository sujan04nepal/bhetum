"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, MessageCircle, X, ArrowUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { language } = useLanguage();

  // Show scroll to top button when scrolled down
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setShowScrollTop(window.scrollY > 500);
    });
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const actionItems = [
    {
      icon: Search,
      label: language === "ne" ? "सेवा खोज्नुहोस्" : "Find Services",
      href: "/find-services",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      icon: Plus,
      label: language === "ne" ? "अनुरोध पोस्ट" : "Post Request",
      href: "/post-request",
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      icon: MessageCircle,
      label: language === "ne" ? "सन्देश" : "Messages",
      href: "/messages",
      color: "bg-purple-600 hover:bg-purple-700",
    },
  ];

  return (
    <>
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-all duration-200 transform hover:scale-110"
          aria-label={language === "ne" ? "माथि जानुहोस्" : "Scroll to top"}
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* Floating Action Menu */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Action Items */}
        {isOpen && (
          <div className="mb-4 space-y-3">
            {actionItems.map((item, index) => (
              <div
                key={item.href}
                className="flex items-center justify-end group"
                style={{
                  animation: `slideUp 0.2s ease-out ${index * 0.1}s both`,
                }}
              >
                {/* Label */}
                <div className="mr-4 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  {item.label}
                </div>

                {/* Button */}
                <Link href={item.href}>
                  <button
                    className={`p-3 ${item.color} text-white rounded-full shadow-lg transition-all duration-200 transform hover:scale-110`}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Main FAB Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 ${
            isOpen ? "rotate-45" : ""
          }`}
          aria-label={language === "ne" ? "मेनु खोल्नुहोस्" : "Open menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        </button>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
