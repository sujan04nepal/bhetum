import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ServiceConnect - Marketplace Platform",
  description:
    "Connect with trusted service providers in your area. Find professionals for home services, tutoring, consulting, and more.",
  keywords:
    "marketplace, services, professionals, home services, tutoring, consulting",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">{children}</div>
      </body>
    </html>
  );
}
