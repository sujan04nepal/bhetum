"use client";

import { useState } from "react";
import {
  Search,
  Eye,
  Check,
  X,
  Clock,
  User,
  Star,
  MapPin,
  Calendar,
  DollarSign,
  AlertTriangle,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";

type ApprovalStatus = "pending" | "approved" | "rejected" | "under_review";

interface ServiceSubmission {
  id: string;
  provider: {
    id: string;
    name: string;
    email: string;
    phone: string;
    rating: number;
    totalServices: number;
    joinedDate: string;
    avatar: string;
    verified: boolean;
  };
  service: {
    title: string;
    description: string;
    category: string;
    subcategory: string;
    pricing: {
      type: "hourly" | "fixed" | "custom";
      amount: number;
      currency: string;
    };
    location: {
      city: string;
      areas: string[];
    };
    availability: {
      days: string[];
      hours: string;
    };
    images: string[];
    requirements: string[];
    experience: string;
  };
  status: ApprovalStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  notes?: string;
}

const mockSubmissions: ServiceSubmission[] = [
  {
    id: "SUB001",
    provider: {
      id: "PRV001",
      name: "राज गुरुंग",
      email: "raj.gurung@email.com",
      phone: "+977-9801234567",
      rating: 4.8,
      totalServices: 3,
      joinedDate: "2024-01-15",
      avatar: "👨‍🔧",
      verified: true,
    },
    service: {
      title: "Professional AC Repair & Maintenance",
      description:
        "Comprehensive AC repair and maintenance services for all brands and models. Quick diagnosis, quality parts, and reliable service.",
      category: "Home Repair",
      subcategory: "Electrical",
      pricing: {
        type: "hourly",
        amount: 800,
        currency: "NPR",
      },
      location: {
        city: "Kathmandu",
        areas: ["Thamel", "New Road", "Lazimpat", "Baluwatar"],
      },
      availability: {
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        hours: "9:00 AM - 6:00 PM",
      },
      images: ["🔧", "❄️", "🏠"],
      requirements: ["Power tools", "Replacement parts", "Safety equipment"],
      experience: "5 years of experience in AC repair and maintenance",
    },
    status: "pending",
    submittedAt: "2024-12-25T10:30:00Z",
  },
  {
    id: "SUB002",
    provider: {
      id: "PRV002",
      name: "माया तामाङ",
      email: "maya.tamang@email.com",
      phone: "+977-9812345678",
      rating: 4.9,
      totalServices: 5,
      joinedDate: "2023-11-20",
      avatar: "👩‍🏫",
      verified: true,
    },
    service: {
      title: "Advanced Mathematics Tutoring",
      description:
        "Expert tutoring for +2, bachelor level mathematics. Specialized in calculus, algebra, and statistics.",
      category: "Education",
      subcategory: "Academic Support",
      pricing: {
        type: "hourly",
        amount: 1200,
        currency: "NPR",
      },
      location: {
        city: "Lalitpur",
        areas: ["Patan", "Jawalakhel", "Satdobato", "Lagankhel"],
      },
      availability: {
        days: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        hours: "4:00 PM - 8:00 PM",
      },
      images: ["📚", "📝", "🧮"],
      requirements: [
        "Whiteboard",
        "Mathematical instruments",
        "Reference books",
      ],
      experience: "8 years teaching experience, MSc in Mathematics",
    },
    status: "under_review",
    submittedAt: "2024-12-24T14:20:00Z",
    reviewedAt: "2024-12-25T09:00:00Z",
    reviewedBy: "admin@platform.com",
  },
  {
    id: "SUB003",
    provider: {
      id: "PRV003",
      name: "अमित पौडेल",
      email: "amit.poudel@email.com",
      phone: "+977-9823456789",
      rating: 4.7,
      totalServices: 2,
      joinedDate: "2024-03-10",
      avatar: "👨‍💻",
      verified: false,
    },
    service: {
      title: "Website Development Services",
      description:
        "Custom website development using modern technologies. Responsive design, SEO optimization, and ongoing support.",
      category: "Digital Services",
      subcategory: "Web Development",
      pricing: {
        type: "fixed",
        amount: 25000,
        currency: "NPR",
      },
      location: {
        city: "Kathmandu",
        areas: ["Remote", "Kathmandu Valley"],
      },
      availability: {
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        hours: "10:00 AM - 6:00 PM",
      },
      images: ["💻", "🌐", "📱"],
      requirements: [
        "Internet connection",
        "Development tools",
        "Client requirements",
      ],
      experience: "3 years in web development, portfolio available",
    },
    status: "approved",
    submittedAt: "2024-12-20T09:15:00Z",
    reviewedAt: "2024-12-22T11:30:00Z",
    reviewedBy: "admin@platform.com",
  },
  {
    id: "SUB004",
    provider: {
      id: "PRV004",
      name: "सुनिता कार्की",
      email: "sunita.karki@email.com",
      phone: "+977-9834567890",
      rating: 4.6,
      totalServices: 1,
      joinedDate: "2024-06-05",
      avatar: "👩‍💄",
      verified: true,
    },
    service: {
      title: "Bridal Makeup & Hair Styling",
      description:
        "Professional bridal makeup and hair styling for weddings and special occasions. Traditional and modern styles available.",
      category: "Beauty & Wellness",
      subcategory: "Makeup & Styling",
      pricing: {
        type: "fixed",
        amount: 8000,
        currency: "NPR",
      },
      location: {
        city: "Pokhara",
        areas: ["Lakeside", "Mahendrapul", "Chipledhunga", "New Road"],
      },
      availability: {
        days: ["Thursday", "Friday", "Saturday", "Sunday"],
        hours: "6:00 AM - 12:00 PM",
      },
      images: ["💄", "💍", "👰"],
      requirements: [
        "Professional makeup kit",
        "Hair styling tools",
        "Client consultation",
      ],
      experience: "4 years professional makeup artist, certified",
    },
    status: "rejected",
    submittedAt: "2024-12-18T16:45:00Z",
    reviewedAt: "2024-12-19T10:00:00Z",
    reviewedBy: "admin@platform.com",
    rejectionReason:
      "Incomplete documentation - missing portfolio images and certification",
  },
];

const statusConfig = {
  pending: {
    label: "Pending Review",
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
  },
  under_review: {
    label: "Under Review",
    color: "bg-blue-100 text-blue-800",
    icon: Eye,
  },
  approved: {
    label: "Approved",
    color: "bg-green-100 text-green-800",
    icon: Check,
  },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-800", icon: X },
};

export default function ServiceApprovalPage() {
  const [submissions, setSubmissions] =
    useState<ServiceSubmission[]>(mockSubmissions);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApprovalStatus | "all">(
    "all",
  );
  const [selectedSubmission, setSelectedSubmission] =
    useState<ServiceSubmission | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [approvalNotes, setApprovalNotes] = useState("");

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      submission.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.provider.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      submission.service.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      submission.service.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || submission.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: submissions.length,
    pending: submissions.filter((s) => s.status === "pending").length,
    under_review: submissions.filter((s) => s.status === "under_review").length,
    approved: submissions.filter((s) => s.status === "approved").length,
    rejected: submissions.filter((s) => s.status === "rejected").length,
  };

  const updateSubmissionStatus = (
    submissionId: string,
    newStatus: ApprovalStatus,
    reason?: string,
  ) => {
    setSubmissions(
      submissions.map((submission) =>
        submission.id === submissionId
          ? {
              ...submission,
              status: newStatus,
              reviewedAt: new Date().toISOString(),
              reviewedBy: "admin@platform.com",
              rejectionReason: reason,
              notes: approvalNotes,
            }
          : submission,
      ),
    );
    setRejectionReason("");
    setApprovalNotes("");
    setShowDetails(false);
  };

  const viewSubmissionDetails = (submission: ServiceSubmission) => {
    setSelectedSubmission(submission);
    setShowDetails(true);
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Service Approval
            </h1>
            <p className="text-gray-600">
              Review and approve service submissions
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="p-4">
            <div className="text-2xl font-bold text-gray-900">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600">Total Submissions</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {stats.pending}
            </div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {stats.under_review}
            </div>
            <div className="text-sm text-gray-600">Under Review</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {stats.approved}
            </div>
            <div className="text-sm text-gray-600">Approved</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {stats.rejected}
            </div>
            <div className="text-sm text-gray-600">Rejected</div>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search submissions, providers, services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as ApprovalStatus | "all")
            }
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending Review</option>
            <option value="under_review">Under Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Submissions Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 font-medium text-gray-900">
                    Submission ID
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Provider
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Service
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Category
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Pricing
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Submitted
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
                {filteredSubmissions.map((submission) => {
                  const statusInfo = statusConfig[submission.status];

                  return (
                    <tr
                      key={submission.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="p-4">
                        <div className="font-medium text-gray-900">
                          {submission.id}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(
                            submission.submittedAt,
                          ).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">
                            {submission.provider.avatar}
                          </span>
                          <div>
                            <div className="font-medium text-gray-900 flex items-center">
                              {submission.provider.name}
                              {submission.provider.verified && (
                                <Check className="h-4 w-4 text-green-500 ml-1" />
                              )}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Star className="h-3 w-3 text-yellow-400 mr-1" />
                              {submission.provider.rating} •{" "}
                              {submission.provider.totalServices} services
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-gray-900">
                          {submission.service.title}
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-2">
                          {submission.service.description.substring(0, 80)}...
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-gray-900">
                          {submission.service.category}
                        </div>
                        <div className="text-sm text-gray-500">
                          {submission.service.subcategory}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-gray-900">
                          Rs{" "}
                          {submission.service.pricing.amount.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {submission.service.pricing.type}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-gray-900">
                          {new Date(
                            submission.submittedAt,
                          ).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(
                            submission.submittedAt,
                          ).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}
                        >
                          {statusInfo.label}
                        </span>
                        {submission.status === "rejected" && (
                          <AlertTriangle className="h-4 w-4 text-red-500 mt-1" />
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => viewSubmissionDetails(submission)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {submission.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                onClick={() =>
                                  updateSubmissionStatus(
                                    submission.id,
                                    "under_review",
                                  )
                                }
                              >
                                Review
                              </Button>
                            </>
                          )}
                          {submission.status === "under_review" && (
                            <>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() =>
                                  updateSubmissionStatus(
                                    submission.id,
                                    "approved",
                                  )
                                }
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                className="bg-red-600 hover:bg-red-700 text-white"
                                onClick={() =>
                                  viewSubmissionDetails(submission)
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

        {/* Submission Details Modal */}
        {showDetails && selectedSubmission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-6xl w-full mx-4 max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Service Submission Details - {selectedSubmission.id}
                  </h2>
                  <Button
                    variant="outline"
                    onClick={() => setShowDetails(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Provider Information */}
                  <Card className="p-4">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Provider Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <span className="text-3xl mr-3">
                          {selectedSubmission.provider.avatar}
                        </span>
                        <div>
                          <div className="font-medium flex items-center">
                            {selectedSubmission.provider.name}
                            {selectedSubmission.provider.verified && (
                              <Check className="h-4 w-4 text-green-500 ml-1" />
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {selectedSubmission.provider.email}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Rating:</span>{" "}
                          {selectedSubmission.provider.rating}
                        </div>
                        <div>
                          <span className="font-medium">Services:</span>{" "}
                          {selectedSubmission.provider.totalServices}
                        </div>
                        <div>
                          <span className="font-medium">Joined:</span>{" "}
                          {new Date(
                            selectedSubmission.provider.joinedDate,
                          ).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Phone:</span>{" "}
                          {selectedSubmission.provider.phone}
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Service Details */}
                  <Card className="p-4">
                    <h3 className="font-semibold mb-3">Service Details</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="font-medium">
                          {selectedSubmission.service.title}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {selectedSubmission.service.description}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Category:</span>{" "}
                          {selectedSubmission.service.category}
                        </div>
                        <div>
                          <span className="font-medium">Subcategory:</span>{" "}
                          {selectedSubmission.service.subcategory}
                        </div>
                        <div>
                          <span className="font-medium">Pricing:</span> Rs{" "}
                          {selectedSubmission.service.pricing.amount.toLocaleString()}{" "}
                          ({selectedSubmission.service.pricing.type})
                        </div>
                        <div>
                          <span className="font-medium">Location:</span>{" "}
                          {selectedSubmission.service.location.city}
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Availability & Requirements */}
                  <Card className="p-4">
                    <h3 className="font-semibold mb-3">
                      Availability & Requirements
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <div className="font-medium text-sm">
                          Available Days:
                        </div>
                        <div className="text-sm text-gray-600">
                          {selectedSubmission.service.availability.days.join(
                            ", ",
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-sm">
                          Working Hours:
                        </div>
                        <div className="text-sm text-gray-600">
                          {selectedSubmission.service.availability.hours}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-sm">
                          Service Areas:
                        </div>
                        <div className="text-sm text-gray-600">
                          {selectedSubmission.service.location.areas.join(", ")}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-sm">Requirements:</div>
                        <ul className="text-sm text-gray-600 list-disc list-inside">
                          {selectedSubmission.service.requirements.map(
                            (req, index) => (
                              <li key={index}>{req}</li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  </Card>

                  {/* Experience & Status */}
                  <Card className="p-4">
                    <h3 className="font-semibold mb-3">Experience & Status</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="font-medium text-sm">Experience:</div>
                        <div className="text-sm text-gray-600">
                          {selectedSubmission.service.experience}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-sm">
                          Service Images/Icons:
                        </div>
                        <div className="flex space-x-2 text-2xl">
                          {selectedSubmission.service.images.join(" ")}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-sm">
                          Current Status:
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-sm ${statusConfig[selectedSubmission.status].color}`}
                        >
                          {statusConfig[selectedSubmission.status].label}
                        </span>
                      </div>
                      {selectedSubmission.rejectionReason && (
                        <div>
                          <div className="font-medium text-sm text-red-600">
                            Rejection Reason:
                          </div>
                          <div className="text-sm text-red-600">
                            {selectedSubmission.rejectionReason}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>

                {/* Action Buttons */}
                {selectedSubmission.status === "under_review" && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Review Notes (Optional)
                      </label>
                      <textarea
                        value={approvalNotes}
                        onChange={(e) => setApprovalNotes(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Add any notes for this review..."
                      />
                    </div>
                    <div className="flex space-x-4">
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() =>
                          updateSubmissionStatus(
                            selectedSubmission.id,
                            "approved",
                          )
                        }
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Approve Service
                      </Button>
                      <div className="flex-1">
                        <Input
                          placeholder="Reason for rejection..."
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          className="mb-2"
                        />
                        <Button
                          className="bg-red-600 hover:bg-red-700 text-white w-full"
                          onClick={() =>
                            updateSubmissionStatus(
                              selectedSubmission.id,
                              "rejected",
                              rejectionReason,
                            )
                          }
                          disabled={!rejectionReason.trim()}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Reject Service
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
