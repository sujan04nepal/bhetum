"use client";

import { useState } from "react";
import {
  Search,
  Eye,
  MessageSquare,
  AlertTriangle,
  Check,
  X,
  Clock,
  User,
  Calendar,
  DollarSign,
  Star,
  Phone,
  Mail,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";

type DisputeStatus = "open" | "in_review" | "resolved" | "escalated" | "closed";
type DisputePriority = "low" | "medium" | "high" | "urgent";

interface Dispute {
  id: string;
  booking: {
    id: string;
    service: string;
    date: string;
    amount: number;
  };
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
  dispute: {
    reason: string;
    category: string;
    description: string;
    evidence: string[];
    priority: DisputePriority;
  };
  status: DisputeStatus;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  resolution?: string;
  messages: Array<{
    id: string;
    sender: string;
    message: string;
    timestamp: string;
    attachments?: string[];
  }>;
}

const mockDisputes: Dispute[] = [
  {
    id: "DSP001",
    booking: {
      id: "BK001",
      service: "AC Repair Service",
      date: "2024-12-28",
      amount: 2500,
    },
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
    dispute: {
      reason: "Service Quality",
      category: "Poor Service",
      description:
        "The technician arrived late and couldn't fix the AC properly. After the service, the AC is still not cooling and making even more noise.",
      evidence: [
        "Photo of AC unit",
        "Audio recording of noise",
        "Chat messages",
      ],
      priority: "high",
    },
    status: "open",
    createdAt: "2024-12-29T10:30:00Z",
    updatedAt: "2024-12-29T10:30:00Z",
    messages: [
      {
        id: "MSG001",
        sender: "customer",
        message:
          "The AC repair was not done properly. It's still not working and making noise.",
        timestamp: "2024-12-29T10:30:00Z",
      },
    ],
  },
  {
    id: "DSP002",
    booking: {
      id: "BK003",
      service: "Wedding Photography",
      date: "2025-01-15",
      amount: 25000,
    },
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
    dispute: {
      reason: "Payment Issue",
      category: "Overcharging",
      description:
        "The photographer charged extra fees that were not mentioned in the original quote. Additional Rs 5,000 was demanded for editing.",
      evidence: ["Original quote", "Additional bill", "WhatsApp conversation"],
      priority: "medium",
    },
    status: "in_review",
    createdAt: "2024-12-27T14:20:00Z",
    updatedAt: "2024-12-28T09:15:00Z",
    assignedTo: "admin@platform.com",
    messages: [
      {
        id: "MSG002",
        sender: "customer",
        message:
          "The photographer is asking for extra money that wasn't in the original agreement.",
        timestamp: "2024-12-27T14:20:00Z",
      },
      {
        id: "MSG003",
        sender: "provider",
        message:
          "The extra charges are for premium editing which was requested by the client.",
        timestamp: "2024-12-27T16:45:00Z",
      },
      {
        id: "MSG004",
        sender: "admin",
        message:
          "I'm reviewing both the original agreement and the additional requests. Will provide resolution within 24 hours.",
        timestamp: "2024-12-28T09:15:00Z",
      },
    ],
  },
  {
    id: "DSP003",
    booking: {
      id: "BK004",
      service: "House Cleaning",
      date: "2024-12-27",
      amount: 1200,
    },
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
    dispute: {
      reason: "Cancellation",
      category: "Provider No-Show",
      description:
        "The cleaning service provider didn't show up at the scheduled time and didn't inform in advance. Had to arrange alternative service.",
      evidence: ["Booking confirmation", "Messages showing no response"],
      priority: "medium",
    },
    status: "resolved",
    createdAt: "2024-12-27T11:00:00Z",
    updatedAt: "2024-12-28T15:30:00Z",
    assignedTo: "admin@platform.com",
    resolution:
      "Full refund provided to customer. Provider account suspended for 7 days for no-show without notice.",
    messages: [
      {
        id: "MSG005",
        sender: "customer",
        message: "The cleaner didn't show up and isn't responding to messages.",
        timestamp: "2024-12-27T11:00:00Z",
      },
      {
        id: "MSG006",
        sender: "admin",
        message:
          "We've contacted the provider and will process a full refund. Apologies for the inconvenience.",
        timestamp: "2024-12-27T13:45:00Z",
      },
    ],
  },
];

const statusConfig = {
  open: {
    label: "Open",
    color: "bg-red-100 text-red-800",
    icon: AlertTriangle,
  },
  in_review: {
    label: "In Review",
    color: "bg-yellow-100 text-yellow-800",
    icon: Eye,
  },
  resolved: {
    label: "Resolved",
    color: "bg-green-100 text-green-800",
    icon: Check,
  },
  escalated: {
    label: "Escalated",
    color: "bg-purple-100 text-purple-800",
    icon: AlertTriangle,
  },
  closed: { label: "Closed", color: "bg-gray-100 text-gray-800", icon: X },
};

const priorityConfig = {
  low: { label: "Low", color: "bg-blue-100 text-blue-800" },
  medium: { label: "Medium", color: "bg-yellow-100 text-yellow-800" },
  high: { label: "High", color: "bg-orange-100 text-orange-800" },
  urgent: { label: "Urgent", color: "bg-red-100 text-red-800" },
};

export default function DisputesPage() {
  const [disputes, setDisputes] = useState<Dispute[]>(mockDisputes);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<DisputeStatus | "all">(
    "all",
  );
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [resolution, setResolution] = useState("");

  const filteredDisputes = disputes.filter((dispute) => {
    const matchesSearch =
      dispute.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.booking.service
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      dispute.dispute.reason.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || dispute.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: disputes.length,
    open: disputes.filter((d) => d.status === "open").length,
    in_review: disputes.filter((d) => d.status === "in_review").length,
    resolved: disputes.filter((d) => d.status === "resolved").length,
    escalated: disputes.filter((d) => d.status === "escalated").length,
    closed: disputes.filter((d) => d.status === "closed").length,
  };

  const updateDisputeStatus = (
    disputeId: string,
    newStatus: DisputeStatus,
    resolutionText?: string,
  ) => {
    setDisputes(
      disputes.map((dispute) =>
        dispute.id === disputeId
          ? {
              ...dispute,
              status: newStatus,
              updatedAt: new Date().toISOString(),
              resolution: resolutionText,
              assignedTo:
                newStatus === "in_review"
                  ? "admin@platform.com"
                  : dispute.assignedTo,
            }
          : dispute,
      ),
    );
    setResolution("");
  };

  const addMessage = (disputeId: string, message: string) => {
    if (!message.trim()) return;

    setDisputes(
      disputes.map((dispute) =>
        dispute.id === disputeId
          ? {
              ...dispute,
              messages: [
                ...dispute.messages,
                {
                  id: `MSG${Date.now()}`,
                  sender: "admin",
                  message: message.trim(),
                  timestamp: new Date().toISOString(),
                },
              ],
              updatedAt: new Date().toISOString(),
            }
          : dispute,
      ),
    );
    setNewMessage("");
  };

  const viewDisputeDetails = (dispute: Dispute) => {
    setSelectedDispute(dispute);
    setShowDetails(true);
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Dispute Management
            </h1>
            <p className="text-gray-600">
              Handle customer disputes and resolve issues
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
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <Card className="p-4">
            <div className="text-2xl font-bold text-gray-900">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600">Total Disputes</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-red-600">{stats.open}</div>
            <div className="text-sm text-gray-600">Open</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {stats.in_review}
            </div>
            <div className="text-sm text-gray-600">In Review</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {stats.resolved}
            </div>
            <div className="text-sm text-gray-600">Resolved</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {stats.escalated}
            </div>
            <div className="text-sm text-gray-600">Escalated</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-gray-600">
              {stats.closed}
            </div>
            <div className="text-sm text-gray-600">Closed</div>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search disputes, customers, providers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as DisputeStatus | "all")
            }
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in_review">In Review</option>
            <option value="resolved">Resolved</option>
            <option value="escalated">Escalated</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {/* Disputes Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 font-medium text-gray-900">
                    Dispute ID
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Booking
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Customer
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Provider
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Issue
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Priority
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
                {filteredDisputes.map((dispute) => {
                  const statusInfo = statusConfig[dispute.status];
                  const priorityInfo = priorityConfig[dispute.dispute.priority];

                  return (
                    <tr
                      key={dispute.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="p-4">
                        <div className="font-medium text-gray-900">
                          {dispute.id}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(dispute.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-gray-900">
                          {dispute.booking.id}
                        </div>
                        <div className="text-sm text-gray-500">
                          {dispute.booking.service}
                        </div>
                        <div className="text-sm text-gray-600">
                          Rs {dispute.booking.amount.toLocaleString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">
                            {dispute.customer.avatar}
                          </span>
                          <div>
                            <div className="font-medium text-gray-900">
                              {dispute.customer.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {dispute.customer.phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">
                            {dispute.provider.avatar}
                          </span>
                          <div>
                            <div className="font-medium text-gray-900">
                              {dispute.provider.name}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Star className="h-3 w-3 text-yellow-400 mr-1" />
                              {dispute.provider.rating}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-gray-900">
                          {dispute.dispute.reason}
                        </div>
                        <div className="text-sm text-gray-500">
                          {dispute.dispute.category}
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-sm font-medium ${priorityInfo.color}`}
                        >
                          {priorityInfo.label}
                        </span>
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
                            onClick={() => viewDisputeDetails(dispute)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => viewDisputeDetails(dispute)}
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          {dispute.status === "open" && (
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                              onClick={() =>
                                updateDisputeStatus(dispute.id, "in_review")
                              }
                            >
                              Review
                            </Button>
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

        {/* Dispute Details Modal */}
        {showDetails && selectedDispute && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-6xl w-full mx-4 max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Dispute Details - {selectedDispute.id}
                  </h2>
                  <Button
                    variant="outline"
                    onClick={() => setShowDetails(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column - Details */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Dispute Information */}
                    <Card className="p-4">
                      <h3 className="font-semibold mb-3 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Dispute Information
                      </h3>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm font-medium text-gray-700">
                              Reason
                            </div>
                            <div className="text-sm text-gray-900">
                              {selectedDispute.dispute.reason}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-700">
                              Category
                            </div>
                            <div className="text-sm text-gray-900">
                              {selectedDispute.dispute.category}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-700">
                              Priority
                            </div>
                            <span
                              className={`px-2 py-1 rounded text-sm ${priorityConfig[selectedDispute.dispute.priority].color}`}
                            >
                              {
                                priorityConfig[selectedDispute.dispute.priority]
                                  .label
                              }
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-700">
                              Status
                            </div>
                            <span
                              className={`px-2 py-1 rounded text-sm ${statusConfig[selectedDispute.status].color}`}
                            >
                              {statusConfig[selectedDispute.status].label}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-700">
                            Description
                          </div>
                          <div className="text-sm text-gray-900 mt-1">
                            {selectedDispute.dispute.description}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-700">
                            Evidence
                          </div>
                          <ul className="text-sm text-gray-600 list-disc list-inside mt-1">
                            {selectedDispute.dispute.evidence.map(
                              (evidence, index) => (
                                <li key={index}>{evidence}</li>
                              ),
                            )}
                          </ul>
                        </div>
                      </div>
                    </Card>

                    {/* Booking Information */}
                    <Card className="p-4">
                      <h3 className="font-semibold mb-3">Related Booking</h3>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="font-medium text-gray-700">
                            Booking ID
                          </div>
                          <div className="text-gray-900">
                            {selectedDispute.booking.id}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-700">
                            Service
                          </div>
                          <div className="text-gray-900">
                            {selectedDispute.booking.service}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-700">
                            Amount
                          </div>
                          <div className="text-gray-900">
                            Rs {selectedDispute.booking.amount.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Customer & Provider Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="p-4">
                        <h3 className="font-semibold mb-3 flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          Customer
                        </h3>
                        <div className="flex items-center mb-3">
                          <span className="text-2xl mr-3">
                            {selectedDispute.customer.avatar}
                          </span>
                          <div>
                            <div className="font-medium">
                              {selectedDispute.customer.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {selectedDispute.customer.email}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-4 w-4 mr-2" />
                          {selectedDispute.customer.phone}
                        </div>
                      </Card>

                      <Card className="p-4">
                        <h3 className="font-semibold mb-3 flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          Provider
                        </h3>
                        <div className="flex items-center mb-3">
                          <span className="text-2xl mr-3">
                            {selectedDispute.provider.avatar}
                          </span>
                          <div>
                            <div className="font-medium">
                              {selectedDispute.provider.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {selectedDispute.provider.email}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2" />
                            {selectedDispute.provider.phone}
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1 text-yellow-400" />
                            {selectedDispute.provider.rating}
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>

                  {/* Right Column - Messages & Actions */}
                  <div className="space-y-6">
                    {/* Messages */}
                    <Card className="p-4">
                      <h3 className="font-semibold mb-3 flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Communication
                      </h3>
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {selectedDispute.messages.map((message) => (
                          <div
                            key={message.id}
                            className="border-l-2 border-gray-200 pl-3"
                          >
                            <div className="flex justify-between items-start">
                              <div className="text-sm font-medium text-gray-900 capitalize">
                                {message.sender}
                              </div>
                              <div className="text-xs text-gray-500">
                                {new Date(message.timestamp).toLocaleString()}
                              </div>
                            </div>
                            <div className="text-sm text-gray-700 mt-1">
                              {message.message}
                            </div>
                          </div>
                        ))}
                      </div>

                      {selectedDispute.status !== "closed" &&
                        selectedDispute.status !== "resolved" && (
                          <div className="mt-4">
                            <textarea
                              value={newMessage}
                              onChange={(e) => setNewMessage(e.target.value)}
                              placeholder="Add a message..."
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              rows={3}
                            />
                            <Button
                              className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white"
                              onClick={() =>
                                addMessage(selectedDispute.id, newMessage)
                              }
                              disabled={!newMessage.trim()}
                            >
                              Send Message
                            </Button>
                          </div>
                        )}
                    </Card>

                    {/* Resolution */}
                    {selectedDispute.status === "resolved" &&
                      selectedDispute.resolution && (
                        <Card className="p-4">
                          <h3 className="font-semibold mb-3 text-green-600">
                            Resolution
                          </h3>
                          <div className="text-sm text-gray-700">
                            {selectedDispute.resolution}
                          </div>
                        </Card>
                      )}

                    {/* Actions */}
                    {selectedDispute.status === "in_review" && (
                      <Card className="p-4">
                        <h3 className="font-semibold mb-3">Actions</h3>
                        <div className="space-y-3">
                          <textarea
                            value={resolution}
                            onChange={(e) => setResolution(e.target.value)}
                            placeholder="Enter resolution details..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                          />
                          <div className="flex space-x-2">
                            <Button
                              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                              onClick={() =>
                                updateDisputeStatus(
                                  selectedDispute.id,
                                  "resolved",
                                  resolution,
                                )
                              }
                              disabled={!resolution.trim()}
                            >
                              <Check className="h-4 w-4 mr-2" />
                              Resolve
                            </Button>
                            <Button
                              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                              onClick={() =>
                                updateDisputeStatus(
                                  selectedDispute.id,
                                  "escalated",
                                )
                              }
                            >
                              <AlertTriangle className="h-4 w-4 mr-2" />
                              Escalate
                            </Button>
                          </div>
                        </div>
                      </Card>
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
