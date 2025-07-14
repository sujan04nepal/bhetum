"use client";

import { useState } from "react";
import { Search, MapPin, Filter, Star } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { SERVICE_CATEGORIES } from "@/lib/constants";

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const mockProviders = [
    {
      id: "1",
      name: "Sarah Johnson",
      service: "House Cleaning",
      category: "home-services",
      rating: 4.9,
      reviews: 127,
      price: 25,
      location: "Downtown",
      distance: "2.1 km",
      image: "👩‍💼",
      isVerified: true,
    },
    {
      id: "2",
      name: "Mike Chen",
      service: "Math Tutoring",
      category: "tutoring",
      rating: 4.8,
      reviews: 89,
      price: 35,
      location: "University Area",
      distance: "3.5 km",
      image: "👨‍🏫",
      isVerified: true,
    },
    {
      id: "3",
      name: "Emma Davis",
      service: "Graphic Design",
      category: "creative",
      rating: 5.0,
      reviews: 45,
      price: 50,
      location: "Creative District",
      distance: "1.8 km",
      image: "👩‍🎨",
      isVerified: true,
    },
    {
      id: "4",
      name: "John Smith",
      service: "Plumbing Repair",
      category: "home-services",
      rating: 4.7,
      reviews: 156,
      price: 40,
      location: "Midtown",
      distance: "4.2 km",
      image: "👨‍🔧",
      isVerified: true,
    },
    {
      id: "5",
      name: "Lisa Wang",
      service: "Personal Training",
      category: "health-wellness",
      rating: 4.9,
      reviews: 73,
      price: 45,
      location: "Fitness District",
      distance: "2.7 km",
      image: "👩‍⚕️",
      isVerified: true,
    },
    {
      id: "6",
      name: "David Brown",
      service: "Web Development",
      category: "technology",
      rating: 4.8,
      reviews: 92,
      price: 75,
      location: "Tech Hub",
      distance: "5.1 km",
      image: "👨‍💻",
      isVerified: true,
    },
  ];

  const filteredProviders = mockProviders.filter((provider) => {
    if (selectedCategory !== "all" && provider.category !== selectedCategory)
      return false;
    if (
      searchQuery &&
      !provider.service.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="min-h-screen">
      <Header />

      {/* Search Section */}
      <section className="bg-primary-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Find Local Services
            </h1>
            <p className="text-xl text-gray-600">
              Discover trusted professionals in your area
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="What service do you need?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Your location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="flex items-center justify-center">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Results */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-1/4">
              <Card className="sticky top-4">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="all">All Categories</option>
                      {SERVICE_CATEGORIES.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>$0/hr</span>
                        <span>$100+/hr</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Distance
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option>Within 5 km</option>
                      <option>Within 10 km</option>
                      <option>Within 25 km</option>
                      <option>Any distance</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded" />
                      <span className="ml-2 text-sm">
                        Verified providers only
                      </span>
                    </label>
                  </div>
                </div>
              </Card>
            </div>

            {/* Results */}
            <div className="lg:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">
                  {filteredProviders.length} providers found
                </h2>
                <select className="px-3 py-2 border border-gray-300 rounded-md">
                  <option>Sort by: Relevance</option>
                  <option>Sort by: Price (Low to High)</option>
                  <option>Sort by: Price (High to Low)</option>
                  <option>Sort by: Rating</option>
                  <option>Sort by: Distance</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProviders.map((provider) => (
                  <Card
                    key={provider.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{provider.image}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {provider.name}
                          </h3>
                          {provider.isVerified && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              ✓ Verified
                            </span>
                          )}
                        </div>

                        <p className="text-gray-600 mb-2">{provider.service}</p>

                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="ml-1 font-medium">
                              {provider.rating}
                            </span>
                            <span className="ml-1 text-gray-500">
                              ({provider.reviews})
                            </span>
                          </div>
                          <div className="flex items-center text-gray-500">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">{provider.distance}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-lg font-semibold text-primary-600">
                            ${provider.price}/hr
                          </div>
                          <div className="space-x-2">
                            <Button variant="outline" size="sm">
                              View Profile
                            </Button>
                            <Button size="sm">Book Now</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                  <Button variant="outline">Previous</Button>
                  <Button variant="outline">1</Button>
                  <Button>2</Button>
                  <Button variant="outline">3</Button>
                  <Button variant="outline">Next</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
