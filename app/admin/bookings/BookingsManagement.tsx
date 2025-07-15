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
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MapPin,
  User,
  DollarSign,
  Download,
} from "lucide-react";

// Mock booking data
const mockBookings = [
  {
    id: "B001",
    serviceTitle: "House Cleaning Service",
    customerName: "Sita Sharma",
    customerPhone: "+977-9841234567",
    providerName: "CleanPro Services",
    providerPhone: "+977-9851234567",
    amount: 2500,
    status: "completed",
    paymentMethod: "esewa",
    bookingDate: "2024-01-15",
    serviceDate: "2024-01-18",
    serviceTime: "10:00 AM",
    location: "Kathmandu, Thamel",
    rating: 4.8,
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "B002",
    serviceTitle: "Math Tutoring",
    customerName: "Ram Gurung",
    customerPhone: "+977-9841234568",
    providerName: "EduMaster Tutorial",
    providerPhone: "+977-9851234568",
    amount: 1500,
    status: "in_progress",
    paymentMethod: "khalti",
    bookingDate: "2024-01-16",
    serviceDate: "2024-01-20",
    serviceTime: "2:00 PM",
    location: "Pokhara, Lakeside",
    rating: null,
    createdAt: "2024-01-16T14:15:00Z",
  },
  {
    id: "B003",
    serviceTitle: "Web Development",
    customerName: "Maya Tamang",
    customerPhone: "+977-9841234569",
    providerName: "TechSoft Solutions",
    providerPhone: "+977-9851234569",
    amount: 45000,
    status: "pending",
    paymentMethod: "cash",
    bookingDate: "2024-01-17",
    serviceDate: "2024-01-25",
    serviceTime: "9:00 AM",
    location: "Lalitpur, Patan",
    rating: null,
    createdAt: "2024-01-17T09:45:00Z",
  },
  {
    id: "B004",
    serviceTitle: "Car Repair",
    customerName: "Bikash Thapa",
    customerPhone: "+977-9841234570",
    providerName: "AutoFix Garage",
    providerPhone: "+977-9851234570",
    amount: 8500,
    status: "cancelled",
    paymentMethod: "ime",
    bookingDate: "2024-01-14",
    serviceDate: "2024-01-16",
    serviceTime: "11:00 AM",
    location: "Bhaktapur, Dudhpati",
    rating: null,
    createdAt: "2024-01-14T16:20:00Z",
  },
];

export default function BookingsManagement() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch =
      booking.serviceTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.providerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    const matchesPayment =
      paymentFilter === "all" || booking.paymentMethod === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const totalBookings = mockBookings.length;
  const completedBookings = mockBookings.filter(
    (b) => b.status === "completed",
  ).length;
  const activeBookings = mockBookings.filter(
    (b) => b.status === "in_progress",
  ).length;
  const pendingBookings = mockBookings.filter(
    (b) => b.status === "pending",
  ).length;
  const cancelledBookings = mockBookings.filter(
    (b) => b.status === "cancelled",
  ).length;

  const totalRevenue = mockBookings
    .filter((b) => b.status === "completed")
    .reduce((sum, b) => sum + b.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "in_progress":
        return <Clock className="h-4 w-4" />;
      case "pending":
        return <AlertTriangle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const handleViewDetails = (booking: any) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {t("admin.allBookings")}
            </h1>
            <p className="text-gray-600 mt-1">
              Monitor and manage all service bookings on the platform
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalBookings}
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
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {completedBookings}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">
                  {activeBookings}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {pendingBookings}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-lg font-bold text-gray-900">
                  Rs {totalRevenue.toLocaleString()}
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
                  placeholder="Search bookings, customers, providers..."
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
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Payment Methods</option>
                <option value="esewa">eSewa</option>
                <option value="khalti">Khalti</option>
                <option value="ime">IME Pay</option>
                <option value="cash">Cash</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Bookings Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Provider
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
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
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {booking.serviceTitle}
                        </div>
                        <div className="text-sm text-gray-500">
                          #{booking.id}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {booking.location}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-gray-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {booking.customerName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.customerPhone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.providerName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.providerPhone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.serviceDate}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.serviceTime}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        Rs {booking.amount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500 capitalize">
                        {booking.paymentMethod}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}
                      >
                        {getStatusIcon(booking.status)}
                        <span className="ml-1 capitalize">
                          {booking.status.replace("_", " ")}
                        </span>
                      </span>
                      {booking.rating && (
                        <div className="text-xs text-gray-500 mt-1">
                          ⭐ {booking.rating}/5
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(booking)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Modal */}
        {showModal && selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Booking Details: {selectedBooking.id}
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
                      <span className="text-gray-600">Service:</span>{" "}
                      {selectedBooking.serviceTitle}
                    </div>
                    <div>
                      <span className="text-gray-600">Booking ID:</span>{" "}
                      {selectedBooking.id}
                    </div>
                    <div>
                      <span className="text-gray-600">Amount:</span> Rs{" "}
                      {selectedBooking.amount.toLocaleString()}
                    </div>
                    <div>
                      <span className="text-gray-600">Payment Method:</span>{" "}
                      {selectedBooking.paymentMethod}
                    </div>
                    <div>
                      <span className="text-gray-600">Service Date:</span>{" "}
                      {selectedBooking.serviceDate}
                    </div>
                    <div>
                      <span className="text-gray-600">Service Time:</span>{" "}
                      {selectedBooking.serviceTime}
                    </div>
                    <div>
                      <span className="text-gray-600">Location:</span>{" "}
                      {selectedBooking.location}
                    </div>
                    <div>
                      <span className="text-gray-600">Booked On:</span>{" "}
                      {new Date(selectedBooking.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <h4 className="font-medium text-gray-900 mt-6 mb-3">
                    Customer Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Name:</span>{" "}
                      {selectedBooking.customerName}
                    </div>
                    <div>
                      <span className="text-gray-600">Phone:</span>{" "}
                      {selectedBooking.customerPhone}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Provider Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Name:</span>{" "}
                      {selectedBooking.providerName}
                    </div>
                    <div>
                      <span className="text-gray-600">Phone:</span>{" "}
                      {selectedBooking.providerPhone}
                    </div>
                  </div>

                  <h4 className="font-medium text-gray-900 mt-6 mb-3">
                    Status & Rating
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Status:</span>
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedBooking.status)}`}
                      >
                        {getStatusIcon(selectedBooking.status)}
                        <span className="ml-1 capitalize">
                          {selectedBooking.status.replace("_", " ")}
                        </span>
                      </span>
                    </div>

                    {selectedBooking.rating && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Rating:</span>
                        <span className="text-sm font-medium">
                          ⭐ {selectedBooking.rating}/5
                        </span>
                      </div>
                    )}
                  </div>

                  <h4 className="font-medium text-gray-900 mt-6 mb-3">
                    Admin Actions
                  </h4>
                  <div className="space-y-2">
                    <Button className="w-full" variant="outline">
                      Contact Customer
                    </Button>
                    <Button className="w-full" variant="outline">
                      Contact Provider
                    </Button>
                    <Button className="w-full" variant="outline">
                      View Transaction
                    </Button>
                    {selectedBooking.status === "pending" && (
                      <Button className="w-full">Cancel Booking</Button>
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
