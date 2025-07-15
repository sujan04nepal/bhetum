"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  Shield,
  ShieldCheck,
  ShieldOff,
  Eye,
  Ban,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Star,
  TrendingUp,
  Calendar,
  DollarSign,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

// Mock data for service providers
const providers = [
  {
    id: "1",
    name: "Sarita Sharma",
    email: "sarita.sharma@email.com",
    phone: "+977-9841234567",
    location: "Kathmandu",
    services: ["House Cleaning", "Deep Cleaning"],
    rating: 4.9,
    reviewCount: 127,
    completedJobs: 245,
    earnings: 185000,
    joinDate: "2023-06-15",
    status: "verified",
    lastActive: "2 hours ago",
    profilePicture: "👩‍💼",
    documents: {
      citizenship: "verified",
      certificate: "verified",
      profilePhoto: "verified",
    },
  },
  {
    id: "2",
    name: "Raj Gurung",
    email: "raj.gurung@email.com",
    phone: "+977-9851234567",
    location: "Pokhara",
    services: ["Math Tutoring", "Physics Tutoring"],
    rating: 4.8,
    reviewCount: 89,
    completedJobs: 156,
    earnings: 124000,
    joinDate: "2023-08-22",
    status: "verified",
    lastActive: "1 day ago",
    profilePicture: "👨‍🏫",
    documents: {
      citizenship: "verified",
      certificate: "verified",
      profilePhoto: "verified",
    },
  },
  {
    id: "3",
    name: "Maya Tamang",
    email: "maya.tamang@email.com",
    phone: "+977-9861234567",
    location: "Lalitpur",
    services: ["Graphic Design", "Logo Design"],
    rating: 5.0,
    reviewCount: 45,
    completedJobs: 78,
    earnings: 95000,
    joinDate: "2023-09-10",
    status: "pending",
    lastActive: "30 minutes ago",
    profilePicture: "👩‍🎨",
    documents: {
      citizenship: "pending",
      certificate: "verified",
      profilePhoto: "verified",
    },
  },
  {
    id: "4",
    name: "Amit Poudel",
    email: "amit.poudel@email.com",
    phone: "+977-9871234567",
    location: "Bhaktapur",
    services: ["Web Development", "Mobile App Development"],
    rating: 4.9,
    reviewCount: 203,
    completedJobs: 189,
    earnings: 245000,
    joinDate: "2023-05-08",
    status: "verified",
    lastActive: "5 minutes ago",
    profilePicture: "👨‍💻",
    documents: {
      citizenship: "verified",
      certificate: "verified",
      profilePhoto: "verified",
    },
  },
  {
    id: "5",
    name: "Sunita Karki",
    email: "sunita.karki@email.com",
    phone: "+977-9881234567",
    location: "Kathmandu",
    services: ["Fitness Training", "Yoga"],
    rating: 4.8,
    reviewCount: 156,
    completedJobs: 234,
    earnings: 165000,
    joinDate: "2023-07-12",
    status: "suspended",
    lastActive: "2 weeks ago",
    profilePicture: "👩‍⚕️",
    documents: {
      citizenship: "verified",
      certificate: "verified",
      profilePhoto: "verified",
    },
  },
];

export default function ProvidersManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const filteredProviders = providers.filter((provider) => {
    const matchesSearch =
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.services.some((service) =>
        service.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesStatus =
      statusFilter === "all" || provider.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <ShieldCheck className="h-4 w-4" />;
      case "pending":
        return <Shield className="h-4 w-4" />;
      case "suspended":
        return <ShieldOff className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  const handleProviderAction = (providerId: string, action: string) => {
    console.log(`Action: ${action} for provider: ${providerId}`);
    // Implement actual actions here
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Service Providers
            </h1>
            <p className="text-gray-600">
              Manage and monitor all service providers on the platform
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Add Provider
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Providers
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {providers.length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <ShieldCheck className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Verified</p>
                <p className="text-2xl font-bold text-gray-900">
                  {providers.filter((p) => p.status === "verified").length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Shield className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {providers.filter((p) => p.status === "pending").length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-full">
                <ShieldOff className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Suspended</p>
                <p className="text-2xl font-bold text-gray-900">
                  {providers.filter((p) => p.status === "suspended").length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search providers by name, email, or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </Card>

        {/* Providers Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Provider
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Services
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProviders.map((provider) => (
                  <tr key={provider.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">
                          {provider.profilePicture}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {provider.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {provider.email}
                          </div>
                          <div className="flex items-center text-xs text-gray-400 mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {provider.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {provider.services.map((service, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm font-medium">
                            {provider.rating}
                          </span>
                          <span className="text-xs text-gray-500 ml-1">
                            ({provider.reviewCount})
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {provider.completedJobs} jobs
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <DollarSign className="h-3 w-3 mr-1" />
                          Rs {provider.earnings.toLocaleString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            provider.status,
                          )}`}
                        >
                          {getStatusIcon(provider.status)}
                          <span className="ml-1 capitalize">
                            {provider.status}
                          </span>
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {provider.lastActive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedProvider(provider);
                            setShowDetailsModal(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <div className="relative">
                          <select
                            onChange={(e) => {
                              if (e.target.value) {
                                handleProviderAction(
                                  provider.id,
                                  e.target.value,
                                );
                                e.target.value = "";
                              }
                            }}
                            className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Actions</option>
                            <option value="contact">Contact</option>
                            {provider.status === "pending" && (
                              <option value="verify">Verify</option>
                            )}
                            {provider.status !== "suspended" && (
                              <option value="suspend">Suspend</option>
                            )}
                            {provider.status === "suspended" && (
                              <option value="activate">Activate</option>
                            )}
                            <option value="delete">Delete</option>
                          </select>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Provider Details Modal */}
        {showDetailsModal && selectedProvider && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                onClick={() => setShowDetailsModal(false)}
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-gray-900">
                      Provider Details
                    </h3>
                    <Button
                      variant="outline"
                      onClick={() => setShowDetailsModal(false)}
                    >
                      Close
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <Card className="p-4">
                      <h4 className="font-medium text-gray-900 mb-3">
                        Basic Information
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">
                            {selectedProvider.profilePicture}
                          </span>
                          <div>
                            <p className="font-medium">
                              {selectedProvider.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {selectedProvider.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          {selectedProvider.phone}
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          {selectedProvider.location}
                        </div>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          Joined {selectedProvider.joinDate}
                        </div>
                      </div>
                    </Card>

                    {/* Performance Metrics */}
                    <Card className="p-4">
                      <h4 className="font-medium text-gray-900 mb-3">
                        Performance Metrics
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Rating</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                            <span className="font-medium">
                              {selectedProvider.rating}
                            </span>
                            <span className="text-sm text-gray-500 ml-1">
                              ({selectedProvider.reviewCount} reviews)
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            Completed Jobs
                          </span>
                          <span className="font-medium">
                            {selectedProvider.completedJobs}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            Total Earnings
                          </span>
                          <span className="font-medium">
                            Rs {selectedProvider.earnings.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Status</span>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              selectedProvider.status,
                            )}`}
                          >
                            {getStatusIcon(selectedProvider.status)}
                            <span className="ml-1 capitalize">
                              {selectedProvider.status}
                            </span>
                          </span>
                        </div>
                      </div>
                    </Card>

                    {/* Services */}
                    <Card className="p-4">
                      <h4 className="font-medium text-gray-900 mb-3">
                        Services
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProvider.services.map(
                          (service: string, index: number) => (
                            <span
                              key={index}
                              className="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                            >
                              {service}
                            </span>
                          ),
                        )}
                      </div>
                    </Card>

                    {/* Document Status */}
                    <Card className="p-4">
                      <h4 className="font-medium text-gray-900 mb-3">
                        Document Verification
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(selectedProvider.documents).map(
                          ([doc, status]) => (
                            <div
                              key={doc}
                              className="flex justify-between items-center"
                            >
                              <span className="text-sm text-gray-600 capitalize">
                                {doc.replace(/([A-Z])/g, " $1").trim()}
                              </span>
                              <span
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                  status as string,
                                )}`}
                              >
                                {getStatusIcon(status as string)}
                                <span className="ml-1 capitalize">
                                  {" "}
                                  {String(status)}
                                </span>
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </Card>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex justify-end space-x-3">
                    <Button
                      variant="outline"
                      onClick={() =>
                        handleProviderAction(selectedProvider.id, "contact")
                      }
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                    {selectedProvider.status === "pending" && (
                      <Button
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() =>
                          handleProviderAction(selectedProvider.id, "verify")
                        }
                      >
                        <ShieldCheck className="h-4 w-4 mr-2" />
                        Verify
                      </Button>
                    )}
                    {selectedProvider.status !== "suspended" && (
                      <Button
                        variant="outline"
                        className="text-red-600 border-red-300 hover:bg-red-50"
                        onClick={() =>
                          handleProviderAction(selectedProvider.id, "suspend")
                        }
                      >
                        <Ban className="h-4 w-4 mr-2" />
                        Suspend
                      </Button>
                    )}
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
