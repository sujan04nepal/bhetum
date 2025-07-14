"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>सेवा खोज - Nepal's #1 Service Marketplace</title>
        <meta
          name="description"
          content="Connect with trusted service providers in Nepal. Find professionals for home services, tutoring, consulting, and more."
        />
        <meta
          name="keywords"
          content="nepal, marketplace, services, professionals, home services, tutoring, consulting"
        />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <div className="min-h-screen bg-gray-50">{children}</div>
        </LanguageProvider>
      </body>
    </html>
  );
}
