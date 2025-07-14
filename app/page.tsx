"use client";

import { useState } from "react";
import {
  Search,
  Star,
  MapPin,
  Clock,
  Shield,
  Users,
  ArrowRight,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  const categories = [
    { name: "Home Services", icon: "🏠", count: "2.3k" },
    { name: "Tutoring", icon: "📚", count: "1.8k" },
    { name: "Consulting", icon: "💼", count: "950" },
    { name: "Health & Wellness", icon: "💪", count: "1.2k" },
    { name: "Technology", icon: "💻", count: "780" },
    { name: "Creative Services", icon: "🎨", count: "640" },
  ];

  const featuredProviders = [
    {
      name: "Sarah Johnson",
      service: "House Cleaning",
      rating: 4.9,
      reviews: 127,
      price: "$25/hr",
      location: "Downtown",
      image: "👩‍💼",
    },
    {
      name: "Mike Chen",
      service: "Math Tutoring",
      rating: 4.8,
      reviews: 89,
      price: "$35/hr",
      location: "University Area",
      image: "👨‍🏫",
    },
    {
      name: "Emma Davis",
      service: "Graphic Design",
      rating: 5.0,
      reviews: 45,
      price: "$50/hr",
      location: "Creative District",
      image: "👩‍🎨",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Find Trusted Service
              <span className="text-primary-600"> Providers</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect with verified professionals in your area. From home
              services to tutoring, find the perfect match for your needs.
            </p>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="What service do you need?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
                <button className="btn-primary flex items-center justify-center">
                  <Search className="h-5 w-5 mr-2" />
                  Search Services
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">10k+</div>
                <div className="text-gray-600">Service Providers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">50k+</div>
                <div className="text-gray-600">Services Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">4.9★</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Service Categories
            </h2>
            <p className="text-gray-600">
              Explore thousands of services across different categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="card text-center hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {category.count} providers
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Top-Rated Providers
              </h2>
              <p className="text-gray-600">
                Meet some of our highest-rated service providers
              </p>
            </div>
            <button className="btn-secondary flex items-center">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProviders.map((provider, index) => (
              <div
                key={index}
                className="card hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">{provider.image}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {provider.name}
                    </h3>
                    <p className="text-gray-600">{provider.service}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 font-medium">{provider.rating}</span>
                    <span className="ml-1 text-gray-500">
                      ({provider.reviews})
                    </span>
                  </div>
                  <div className="font-semibold text-primary-600">
                    {provider.price}
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  {provider.location}
                </div>

                <button className="btn-primary w-full">Book Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose ServiceConnect?
            </h2>
            <p className="text-gray-600">
              Built for trust, convenience, and quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Providers</h3>
              <p className="text-gray-600">
                All service providers are background-checked and verified for
                your safety.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Booking</h3>
              <p className="text-gray-600">
                Book services instantly or schedule for later. Easy and
                convenient.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">
                100% satisfaction guarantee with our quality assurance program.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of satisfied customers and providers.
          </p>
          <div className="space-x-4">
            <button className="bg-white text-primary-600 font-medium py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
              Find Services
            </button>
            <button className="bg-primary-700 text-white font-medium py-3 px-6 rounded-lg hover:bg-primary-800 transition-colors">
              Become a Provider
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ServiceConnect</h3>
              <p className="text-gray-400">
                Connecting people with trusted service providers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">For Customers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Find Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    How it Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Safety
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">For Providers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Sign Up
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Provider Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Earnings
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ServiceConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
