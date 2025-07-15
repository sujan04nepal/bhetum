"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Plus,
  Star,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";

// Mock data for services
const mockServices = [
  {
    id: 1,
    title: "Professional House Cleaning",
    provider: "Sita Cleaning Services",
    providerId: "P001",
    category: "Home Services",
    subcategory: "Cleaning",
    price: 1500,
    priceType: "per hour",
    rating: 4.8,
    totalBookings: 45,
    status: "active",
    featured: true,
    createdDate: "2024-01-15",
    lastUpdated: "2024-01-20",
    description:
      "Professional house cleaning service with eco-friendly products",
    location: "Kathmandu",
  },
  {
    id: 2,
    title: "Math & Science Tutoring",
    provider: "Raj Tutorial Center",
    providerId: "P002",
    category: "Education",
    subcategory: "Academic Tutoring",
    price: 800,
    priceType: "per hour",
    rating: 4.9,
    totalBookings: 67,
    status: "active",
    featured: false,
    createdDate: "2024-01-10",
    lastUpdated: "2024-01-18",
    description: "Expert math and science tutoring for grades 6-12",
    location: "Pokhara",
  },
  {
    id: 3,
    title: "WordPress Website Development",
    provider: "TechMind Solutions",
    providerId: "P003",
    category: "Digital Services",
    subcategory: "Web Development",
    price: 25000,
    priceType: "per project",
    rating: 4.7,
    totalBookings: 23,
    status: "pending_approval",
    featured: false,
    createdDate: "2024-01-22",
    lastUpdated: "2024-01-22",
    description: "Custom WordPress website development and design",
    location: "Lalitpur",
  },
  {
    id: 4,
    title: "Personal Fitness Training",
    provider: "FitLife Gym",
    providerId: "P004",
    category: "Health & Fitness",
    subcategory: "Personal Training",
    price: 2000,
    priceType: "per session",
    rating: 4.6,
    totalBookings: 34,
    status: "suspended",
    featured: false,
    createdDate: "2024-01-08",
    lastUpdated: "2024-01-25",
    description: "Personalized fitness training and nutrition guidance",
    location: "Bhaktapur",
  },
];

export default function ServicesManagement() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredServices = mockServices.filter((service) => {
    const matchesSearch = service.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || service.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || service.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalServices = mockServices.length;
  const activeServices = mockServices.filter(
    (s) => s.status === "active",
  ).length;
  const pendingServices = mockServices.filter(
    (s) => s.status === "pending_approval",
  ).length;
  const suspendedServices = mockServices.filter(
    (s) => s.status === "suspended",
  ).length;

  const categories = [...new Set(mockServices.map((s) => s.category))];

  const handleViewDetails = (service: any) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending_approval":
        return "bg-yellow-100 text-yellow-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />;
      case "pending_approval":
        return <Clock className="h-4 w-4" />;
      case "suspended":
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {t("admin.allServices")}
            </h1>
            <p className="text-gray-600 mt-1">
              Manage all services offered on the platform
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Services
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalServices}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">
                  {activeServices}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {pendingServices}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Suspended</p>
                <p className="text-2xl font-bold text-gray-900">
                  {suspendedServices}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending_approval">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Services Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Provider
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredServices.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Package className="h-5 w-5 text-gray-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 flex items-center">
                            {service.title}
                            {service.featured && (
                              <Star className="h-4 w-4 text-yellow-500 ml-2 fill-current" />
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {service.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {service.provider}
                      </div>
                      <div className="text-sm text-gray-500">
                        {service.providerId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {service.category}
                      </div>
                      <div className="text-sm text-gray-500">
                        {service.subcategory}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        Rs {service.price.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {service.priceType}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-900 ml-1">
                          {service.rating}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {service.totalBookings} bookings
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(service.status)}`}
                      >
                        {getStatusIcon(service.status)}
                        <span className="ml-1 capitalize">
                          {service.status.replace("_", " ")}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(service)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Modal */}
        {showModal && selectedService && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Service Details: {selectedService.title}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowModal(false)}
                >
                  ×
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Service Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Title:</span>{" "}
                      {selectedService.title}
                    </div>
                    <div>
                      <span className="text-gray-600">Description:</span>{" "}
                      {selectedService.description}
                    </div>
                    <div>
                      <span className="text-gray-600">Category:</span>{" "}
                      {selectedService.category} → {selectedService.subcategory}
                    </div>
                    <div>
                      <span className="text-gray-600">Price:</span> Rs{" "}
                      {selectedService.price.toLocaleString()}{" "}
                      {selectedService.priceType}
                    </div>
                    <div>
                      <span className="text-gray-600">Location:</span>{" "}
                      {selectedService.location}
                    </div>
                    <div>
                      <span className="text-gray-600">Created:</span>{" "}
                      {selectedService.createdDate}
                    </div>
                    <div>
                      <span className="text-gray-600">Last Updated:</span>{" "}
                      {selectedService.lastUpdated}
                    </div>
                  </div>

                  <h4 className="font-medium text-gray-900 mt-6 mb-3">
                    Provider Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Provider:</span>{" "}
                      {selectedService.provider}
                    </div>
                    <div>
                      <span className="text-gray-600">Provider ID:</span>{" "}
                      {selectedService.providerId}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Performance Metrics
                  </h4>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Rating</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium ml-1">
                            {selectedService.rating}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Total Bookings
                        </span>
                        <span className="text-sm font-medium">
                          {selectedService.totalBookings}
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Status</span>
                        <span
                          className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedService.status)}`}
                        >
                          {getStatusIcon(selectedService.status)}
                          <span className="ml-1 capitalize">
                            {selectedService.status.replace("_", " ")}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Featured</span>
                        <span className="text-sm font-medium">
                          {selectedService.featured ? "Yes" : "No"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <h4 className="font-medium text-gray-900 mt-6 mb-3">
                    Admin Actions
                  </h4>
                  <div className="space-y-2">
                    <Button className="w-full">Edit Service Details</Button>
                    <Button variant="outline" className="w-full">
                      Contact Provider
                    </Button>
                    <Button variant="outline" className="w-full">
                      View Bookings History
                    </Button>
                    <div className="flex space-x-2">
                      {selectedService.status === "pending_approval" && (
                        <Button className="flex-1 bg-green-600 hover:bg-green-700">
                          Approve Service
                        </Button>
                      )}
                      {selectedService.status === "active" && (
                        <Button
                          variant="outline"
                          className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
                        >
                          Suspend Service
                        </Button>
                      )}
                      {selectedService.status === "suspended" && (
                        <Button className="flex-1 bg-green-600 hover:bg-green-700">
                          Reactivate Service
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
