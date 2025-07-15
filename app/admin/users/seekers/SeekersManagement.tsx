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
  Mail,
  Ban,
  Users,
  Calendar,
  Star,
  MapPin,
  Download,
} from "lucide-react";

// Mock data for service seekers
const mockSeekers = [
  {
    id: 1,
    name: "Ramesh Sharma",
    email: "ramesh@email.com",
    phone: "+977-9841234567",
    location: "Kathmandu",
    joinDate: "2024-01-15",
    totalBookings: 12,
    activeBookings: 2,
    totalSpent: 15600,
    status: "active",
    lastActive: "2 hours ago",
  },
  {
    id: 2,
    name: "Sita Gurung",
    email: "sita@email.com",
    phone: "+977-9851234567",
    location: "Pokhara",
    joinDate: "2024-02-10",
    totalBookings: 8,
    activeBookings: 1,
    totalSpent: 9800,
    status: "active",
    lastActive: "1 day ago",
  },
  {
    id: 3,
    name: "Bikash Thapa",
    email: "bikash@email.com",
    phone: "+977-9861234567",
    location: "Lalitpur",
    joinDate: "2024-01-20",
    totalBookings: 25,
    activeBookings: 0,
    totalSpent: 32400,
    status: "inactive",
    lastActive: "1 week ago",
  },
  {
    id: 4,
    name: "Maya Rai",
    email: "maya@email.com",
    phone: "+977-9871234567",
    location: "Bhaktapur",
    joinDate: "2024-03-05",
    totalBookings: 6,
    activeBookings: 3,
    totalSpent: 8200,
    status: "active",
    lastActive: "30 min ago",
  },
];

export default function SeekersManagement() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedSeeker, setSelectedSeeker] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredSeekers = mockSeekers.filter((seeker) => {
    const matchesSearch = seeker.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || seeker.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalSeekers = mockSeekers.length;
  const activeSeekers = mockSeekers.filter((s) => s.status === "active").length;
  const inactiveSeekers = mockSeekers.filter(
    (s) => s.status === "inactive",
  ).length;

  const handleViewDetails = (seeker: any) => {
    setSelectedSeeker(seeker);
    setShowModal(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {t("admin.serviceSeekers")}
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and monitor service seekers on the platform
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button>
              <Users className="h-4 w-4 mr-2" />
              Send Notification
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Seekers
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalSeekers}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Seekers
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {activeSeekers}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Inactive Seekers
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {inactiveSeekers}
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
                  placeholder="Search seekers..."
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
                <option value="inactive">Inactive</option>
              </select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </Card>

        {/* Seekers Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Seeker
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bookings
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Spent
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
                {filteredSeekers.map((seeker) => (
                  <tr key={seeker.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 font-medium">
                            {seeker.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {seeker.name}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {seeker.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {seeker.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {seeker.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        Total: {seeker.totalBookings}
                      </div>
                      <div className="text-sm text-gray-500">
                        Active: {seeker.activeBookings}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        Rs {seeker.totalSpent.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        Joined: {seeker.joinDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          seeker.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {seeker.status === "active" ? "Active" : "Inactive"}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        Last: {seeker.lastActive}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(seeker)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Ban className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Modal */}
        {showModal && selectedSeeker && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Seeker Details: {selectedSeeker.name}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowModal(false)}
                >
                  ×
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Basic Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Email:</span>{" "}
                      {selectedSeeker.email}
                    </div>
                    <div>
                      <span className="text-gray-600">Phone:</span>{" "}
                      {selectedSeeker.phone}
                    </div>
                    <div>
                      <span className="text-gray-600">Location:</span>{" "}
                      {selectedSeeker.location}
                    </div>
                    <div>
                      <span className="text-gray-600">Join Date:</span>{" "}
                      {selectedSeeker.joinDate}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Activity Statistics
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Total Bookings:</span>{" "}
                      {selectedSeeker.totalBookings}
                    </div>
                    <div>
                      <span className="text-gray-600">Active Bookings:</span>{" "}
                      {selectedSeeker.activeBookings}
                    </div>
                    <div>
                      <span className="text-gray-600">Total Spent:</span> Rs{" "}
                      {selectedSeeker.totalSpent.toLocaleString()}
                    </div>
                    <div>
                      <span className="text-gray-600">Last Active:</span>{" "}
                      {selectedSeeker.lastActive}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline">Contact Seeker</Button>
                <Button variant="outline">View Bookings</Button>
                <Button>Suspend Account</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
