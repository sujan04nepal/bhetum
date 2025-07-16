"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Check,
  X,
  Clock,
  User,
  Calendar,
  MapPin,
  Star,
  DollarSign,
  Phone,
  Mail,
  Download,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";

type BookingStatus =
  | "pending"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "disputed";

interface Booking {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
  provider: {
    name: string;
    email: string;
    phone: string;
    rating: number;
    avatar: string;
  };
  service: {
    title: string;
    category: string;
    subcategory: string;
  };
  booking: {
    date: string;
    time: string;
    duration: number;
    location: string;
    notes?: string;
  };
  payment: {
    amount: number;
    commission: number;
    method: string;
    status: "pending" | "paid" | "refunded";
    transactionId: string;
  };
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
}

const mockBookings: Booking[] = [
  {
    id: "BK001",
    customer: {
      name: "सुनिता शर्मा",
      email: "sunita@email.com",
      phone: "+977-9801234567",
      avatar: "👩‍💼",
    },
    provider: {
      name: "राज गुरुंग",
      email: "raj@provider.com",
      phone: "+977-9807654321",
      rating: 4.8,
      avatar: "👨‍🔧",
    },
    service: {
      title: "AC Repair Service",
      category: "Home Repair",
      subcategory: "Electrical",
    },
    booking: {
      date: "2024-12-28",
      time: "10:00 AM",
      duration: 2,
      location: "Kathmandu, Thamel",
      notes: "AC not cooling properly, making noise",
    },
    payment: {
      amount: 2500,
      commission: 375,
      method: "eSewa",
      status: "paid",
      transactionId: "TXN123456",
    },
    status: "confirmed",
    createdAt: "2024-12-25T10:30:00Z",
    updatedAt: "2024-12-25T11:00:00Z",
  },
  {
    id: "BK002",
    customer: {
      name: "अमित पौडेल",
      email: "amit@email.com",
      phone: "+977-9812345678",
      avatar: "👨‍💻",
    },
    provider: {
      name: "माया तामाङ",
      email: "maya@provider.com",
      phone: "+977-9876543210",
      rating: 4.9,
      avatar: "👩‍🏫",
    },
    service: {
      title: "Math Tutoring",
      category: "Education",
      subcategory: "Academic Support",
    },
    booking: {
      date: "2024-12-29",
      time: "4:00 PM",
      duration: 1,
      location: "Lalitpur, Patan",
    },
    payment: {
      amount: 800,
      commission: 120,
      method: "Khalti",
      status: "paid",
      transactionId: "TXN789012",
    },
    status: "in_progress",
    createdAt: "2024-12-24T14:20:00Z",
    updatedAt: "2024-12-28T16:00:00Z",
  },
  {
    id: "BK003",
    customer: {
      name: "प्रिया श्रेष्ठ",
      email: "priya@email.com",
      phone: "+977-9823456789",
      avatar: "👩‍🎨",
    },
    provider: {
      name: "रमेश कार्की",
      email: "ramesh@provider.com",
      phone: "+977-9834567890",
      rating: 4.7,
      avatar: "👨‍💼",
    },
    service: {
      title: "Wedding Photography",
      category: "Events",
      subcategory: "Photography",
    },
    booking: {
      date: "2025-01-15",
      time: "8:00 AM",
      duration: 8,
      location: "Bhaktapur, Durbar Square",
      notes: "Traditional Nepali wedding ceremony",
    },
    payment: {
      amount: 25000,
      commission: 3750,
      method: "Bank Transfer",
      status: "pending",
      transactionId: "TXN345678",
    },
    status: "pending",
    createdAt: "2024-12-20T09:15:00Z",
    updatedAt: "2024-12-20T09:15:00Z",
  },
  {
    id: "BK004",
    customer: {
      name: "विकास लामा",
      email: "vikas@email.com",
      phone: "+977-9845678901",
      avatar: "👨‍⚕️",
    },
    provider: {
      name: "सरिता शाह",
      email: "sarita@provider.com",
      phone: "+977-9856789012",
      rating: 5.0,
      avatar: "👩‍💼",
    },
    service: {
      title: "House Cleaning",
      category: "Home Services",
      subcategory: "Cleaning",
    },
    booking: {
      date: "2024-12-27",
      time: "9:00 AM",
      duration: 3,
      location: "Kathmandu, Baluwatar",
      notes: "Deep cleaning required",
    },
    payment: {
      amount: 1200,
      commission: 180,
      method: "Cash",
      status: "paid",
      transactionId: "CASH001",
    },
    status: "completed",
    createdAt: "2024-12-22T11:45:00Z",
    updatedAt: "2024-12-27T12:00:00Z",
  },
];

const statusConfig = {
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
  },
  confirmed: {
    label: "Confirmed",
    color: "bg-blue-100 text-blue-800",
    icon: Check,
  },
  in_progress: {
    label: "In Progress",
    color: "bg-purple-100 text-purple-800",
    icon: RefreshCw,
  },
  completed: {
    label: "Completed",
    color: "bg-green-100 text-green-800",
    icon: Check,
  },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800", icon: X },
  disputed: {
    label: "Disputed",
    color: "bg-orange-100 text-orange-800",
    icon: Eye,
  },
};

const paymentStatusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  paid: { label: "Paid", color: "bg-green-100 text-green-800" },
  refunded: { label: "Refunded", color: "bg-red-100 text-red-800" },
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">(
    "all",
  );
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    inProgress: bookings.filter((b) => b.status === "in_progress").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
    disputed: bookings.filter((b) => b.status === "disputed").length,
    totalRevenue: bookings.reduce((sum, b) => sum + b.payment.amount, 0),
    totalCommission: bookings.reduce((sum, b) => sum + b.payment.commission, 0),
  };

  const updateBookingStatus = (bookingId: string, newStatus: BookingStatus) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === bookingId
          ? {
              ...booking,
              status: newStatus,
              updatedAt: new Date().toISOString(),
            }
          : booking,
      ),
    );
  };

  const viewBookingDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowDetails(true);
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Booking Management
            </h1>
            <p className="text-gray-600">
              Manage all service bookings and transactions
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4">
          <Card className="p-4">
            <div className="text-2xl font-bold text-gray-900">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600">Total Bookings</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {stats.pending}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {stats.confirmed}
            </div>
            <div className="text-sm text-gray-600">Confirmed</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {stats.inProgress}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {stats.completed}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {stats.cancelled}
            </div>
            <div className="text-sm text-gray-600">Cancelled</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-gray-900">
              Rs {stats.totalRevenue.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-gray-900">
              Rs {stats.totalCommission.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Commission</div>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search bookings, customers, providers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as BookingStatus | "all")
            }
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="disputed">Disputed</option>
          </select>
        </div>

        {/* Bookings Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 font-medium text-gray-900">
                    Booking ID
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Customer
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Provider
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Service
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Date & Time
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Amount
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Status
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => {
                  const statusInfo = statusConfig[booking.status];
                  const paymentInfo =
                    paymentStatusConfig[booking.payment.status];

                  return (
                    <tr
                      key={booking.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="p-4">
                        <div className="font-medium text-gray-900">
                          {booking.id}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">
                            {booking.customer.avatar}
                          </span>
                          <div>
                            <div className="font-medium text-gray-900">
                              {booking.customer.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.customer.phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">
                            {booking.provider.avatar}
                          </span>
                          <div>
                            <div className="font-medium text-gray-900">
                              {booking.provider.name}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Star className="h-3 w-3 text-yellow-400 mr-1" />
                              {booking.provider.rating}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-gray-900">
                          {booking.service.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.service.category}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-gray-900">
                          {new Date(booking.booking.date).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.booking.time}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-gray-900">
                          Rs {booking.payment.amount.toLocaleString()}
                        </div>
                        <div
                          className={`text-sm px-2 py-1 rounded ${paymentInfo.color}`}
                        >
                          {paymentInfo.label}
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}
                        >
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => viewBookingDetails(booking)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {booking.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() =>
                                  updateBookingStatus(booking.id, "confirmed")
                                }
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                className="bg-red-600 hover:bg-red-700 text-white"
                                onClick={() =>
                                  updateBookingStatus(booking.id, "cancelled")
                                }
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Booking Details Modal */}
        {showDetails && selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Booking Details - {selectedBooking.id}
                  </h2>
                  <Button
                    variant="outline"
                    onClick={() => setShowDetails(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Customer Details */}
                  <Card className="p-4">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Customer Details
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">
                          {selectedBooking.customer.avatar}
                        </span>
                        <div>
                          <div className="font-medium">
                            {selectedBooking.customer.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {selectedBooking.customer.email}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm">
                          {selectedBooking.customer.phone}
                        </span>
                      </div>
                    </div>
                  </Card>

                  {/* Provider Details */}
                  <Card className="p-4">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Provider Details
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">
                          {selectedBooking.provider.avatar}
                        </span>
                        <div>
                          <div className="font-medium">
                            {selectedBooking.provider.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {selectedBooking.provider.email}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm">
                          {selectedBooking.provider.phone}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-2 text-yellow-400" />
                        <span className="text-sm">
                          {selectedBooking.provider.rating} rating
                        </span>
                      </div>
                    </div>
                  </Card>

                  {/* Service Details */}
                  <Card className="p-4">
                    <h3 className="font-semibold mb-3">Service Details</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium">
                          {selectedBooking.service.title}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {selectedBooking.service.category} -{" "}
                        {selectedBooking.service.subcategory}
                      </div>
                    </div>
                  </Card>

                  {/* Booking Details */}
                  <Card className="p-4">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Booking Details
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm">
                          {selectedBooking.booking.date} at{" "}
                          {selectedBooking.booking.time}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm">
                          {selectedBooking.booking.duration} hour(s)
                        </span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm">
                          {selectedBooking.booking.location}
                        </span>
                      </div>
                      {selectedBooking.booking.notes && (
                        <div className="text-sm text-gray-600 mt-2">
                          <strong>Notes:</strong>{" "}
                          {selectedBooking.booking.notes}
                        </div>
                      )}
                    </div>
                  </Card>

                  {/* Payment Details */}
                  <Card className="p-4 md:col-span-2">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Payment Details
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">
                          Total Amount
                        </div>
                        <div className="font-medium">
                          Rs {selectedBooking.payment.amount.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Commission</div>
                        <div className="font-medium">
                          Rs{" "}
                          {selectedBooking.payment.commission.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">
                          Payment Method
                        </div>
                        <div className="font-medium">
                          {selectedBooking.payment.method}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">
                          Transaction ID
                        </div>
                        <div className="font-medium">
                          {selectedBooking.payment.transactionId}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
