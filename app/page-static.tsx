"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function StaticHomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="mb-6">
              <span className="text-4xl">🇳🇵</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              <span className="block mb-2">Nepal Service Marketplace</span>
              <span className="block text-blue-600">
                Connect. Book. Get Done.
              </span>
            </h1>

            <p className="text-lg md:text-xl mb-8 text-gray-600 max-w-3xl mx-auto">
              Find trusted service providers in Nepal for all your needs
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth/login">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                  Get Started
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="px-8 py-3">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Why Choose Us?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-2">Verified Providers</h3>
              <p className="text-gray-600">
                All service providers are background checked and verified
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Quick Booking</h3>
              <p className="text-gray-600">
                Book services instantly with just a few clicks
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="text-4xl mb-4">💯</div>
              <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">
                100% satisfaction guarantee or your money back
              </p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
