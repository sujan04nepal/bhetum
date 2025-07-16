"use client";

import { useState } from "react";
import {
  Search,
  Eye,
  Check,
  X,
  Star,
  Flag,
  AlertTriangle,
  MessageSquare,
  User,
  Calendar,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";

type ReviewStatus = "pending" | "approved" | "rejected" | "flagged";

interface Review {
  id: string;
  booking: {
    id: string;
    service: string;
    date: string;
    amount: number;
  };
  reviewer: {
    name: string;
    email: string;
    avatar: string;
    totalReviews: number;
  };
  provider: {
    name: string;
    email: string;
    avatar: string;
    rating: number;
    totalReviews: number;
  };
  review: {
    rating: number;
    title: string;
    content: string;
    pros?: string[];
    cons?: string[];
    wouldRecommend: boolean;
  };
  status: ReviewStatus;
  createdAt: string;
  updatedAt: string;
  moderatedBy?: string;
  flagReason?: string;
  reports: Array<{
    id: string;
    reportedBy: string;
    reason: string;
    description: string;
    timestamp: string;
  }>;
}

const mockReviews: Review[] = [
  {
    id: "REV001",
    booking: {
      id: "BK001",
      service: "AC Repair Service",
      date: "2024-12-28",
      amount: 2500,
    },
    reviewer: {
      name: "सुनिता शर्मा",
      email: "sunita@email.com",
      avatar: "👩‍💼",
      totalReviews: 12,
    },
    provider: {
      name: "राज गुरुंग",
      email: "raj@provider.com",
      avatar: "👨‍🔧",
      rating: 4.8,
      totalReviews: 145,
    },
    review: {
      rating: 2,
      title: "Poor service quality",
      content:
        "The technician arrived 2 hours late and couldn't fix the AC properly. Very unprofessional behavior and the AC is still not working. Would not recommend this service to anyone.",
      pros: [],
      cons: ["Late arrival", "Couldn't fix the issue", "Unprofessional"],
      wouldRecommend: false,
    },
    status: "pending",
    createdAt: "2024-12-29T14:30:00Z",
    updatedAt: "2024-12-29T14:30:00Z",
    reports: [],
  },
  {
    id: "REV002",
    booking: {
      id: "BK002",
      service: "Math Tutoring",
      date: "2024-12-29",
      amount: 800,
    },
    reviewer: {
      name: "अमित पौडेल",
      email: "amit@email.com",
      avatar: "👨‍💻",
      totalReviews: 8,
    },
    provider: {
      name: "माया तामाङ",
      email: "maya@provider.com",
      avatar: "👩‍🏫",
      rating: 4.9,
      totalReviews: 203,
    },
    review: {
      rating: 5,
      title: "Excellent teaching skills!",
      content:
        "Maya is an outstanding math tutor. She explains complex concepts in simple terms and is very patient with students. My son's grades have improved significantly after her tutoring sessions.",
      pros: [
        "Patient teacher",
        "Clear explanations",
        "Improved grades",
        "Punctual",
      ],
      cons: [],
      wouldRecommend: true,
    },
    status: "approved",
    createdAt: "2024-12-30T10:15:00Z",
    updatedAt: "2024-12-30T11:00:00Z",
    moderatedBy: "admin@platform.com",
    reports: [],
  },
  {
    id: "REV003",
    booking: {
      id: "BK003",
      service: "Wedding Photography",
      date: "2025-01-15",
      amount: 25000,
    },
    reviewer: {
      name: "प्रिया श्रेष्ठ",
      email: "priya@email.com",
      avatar: "👩‍🎨",
      totalReviews: 3,
    },
    provider: {
      name: "रमेश कार्की",
      email: "ramesh@provider.com",
      avatar: "👨‍💼",
      rating: 4.7,
      totalReviews: 89,
    },
    review: {
      rating: 4,
      title: "Good photography but expensive",
      content:
        "The photographs were good quality and Ramesh was professional throughout the event. However, the additional charges for editing were not mentioned upfront. Overall satisfied with the service.",
      pros: ["Good photo quality", "Professional behavior", "Timely delivery"],
      cons: ["Hidden charges", "Expensive editing fees"],
      wouldRecommend: true,
    },
    status: "flagged",
    createdAt: "2024-12-28T16:45:00Z",
    updatedAt: "2024-12-29T09:30:00Z",
    moderatedBy: "admin@platform.com",
    flagReason: "Mentioned pricing dispute in content",
    reports: [
      {
        id: "RPT001",
        reportedBy: "ramesh@provider.com",
        reason: "Misleading Information",
        description:
          "The review mentions hidden charges which is not accurate. All pricing was discussed beforehand.",
        timestamp: "2024-12-29T08:15:00Z",
      },
    ],
  },
  {
    id: "REV004",
    booking: {
      id: "BK004",
      service: "House Cleaning",
      date: "2024-12-27",
      amount: 1200,
    },
    reviewer: {
      name: "विकास लामा",
      email: "vikas@email.com",
      avatar: "👨‍⚕️",
      totalReviews: 15,
    },
    provider: {
      name: "सरिता शाह",
      email: "sarita@provider.com",
      avatar: "👩‍💼",
      rating: 5.0,
      totalReviews: 167,
    },
    review: {
      rating: 5,
      title: "Exceptional cleaning service!",
      content:
        "Sarita and her team did an amazing job cleaning our house. Every corner was spotless and they paid attention to the smallest details. Highly professional and courteous. Will definitely book again!",
      pros: [
        "Thorough cleaning",
        "Attention to detail",
        "Professional team",
        "Punctual",
      ],
      cons: [],
      wouldRecommend: true,
    },
    status: "approved",
    createdAt: "2024-12-28T12:20:00Z",
    updatedAt: "2024-12-28T13:45:00Z",
    moderatedBy: "admin@platform.com",
    reports: [],
  },
  {
    id: "REV005",
    booking: {
      id: "BK005",
      service: "Web Development",
      date: "2024-12-20",
      amount: 15000,
    },
    reviewer: {
      name: "राधा गुप्ता",
      email: "radha@email.com",
      avatar: "👩‍💼",
      totalReviews: 6,
    },
    provider: {
      name: "अमित पौडेल",
      email: "amit.dev@provider.com",
      avatar: "👨‍💻",
      rating: 4.6,
      totalReviews: 45,
    },
    review: {
      rating: 1,
      title: "This guy is a fraud! Stay away!",
      content:
        "Complete waste of money! This developer is incompetent and unprofessional. He delivered a broken website that doesn't work at all. He's a scammer and fraud. Don't trust him with your money!",
      pros: [],
      cons: ["Broken website", "Unprofessional", "Poor quality"],
      wouldRecommend: false,
    },
    status: "flagged",
    createdAt: "2024-12-25T09:30:00Z",
    updatedAt: "2024-12-25T10:15:00Z",
    moderatedBy: "admin@platform.com",
    flagReason: "Contains inappropriate language and personal attacks",
    reports: [
      {
        id: "RPT002",
        reportedBy: "amit.dev@provider.com",
        reason: "Defamatory Content",
        description:
          "This review contains false accusations and personal attacks. The website was delivered as per requirements.",
        timestamp: "2024-12-25T10:00:00Z",
      },
    ],
  },
];

const statusConfig = {
  pending: {
    label: "Pending Review",
    color: "bg-yellow-100 text-yellow-800",
    icon: Eye,
  },
  approved: {
    label: "Approved",
    color: "bg-green-100 text-green-800",
    icon: Check,
  },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-800", icon: X },
  flagged: {
    label: "Flagged",
    color: "bg-orange-100 text-orange-800",
    icon: Flag,
  },
};

export default function ReviewModerationPage() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ReviewStatus | "all">("all");
  const [ratingFilter, setRatingFilter] = useState<number | "all">("all");
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.reviewer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.review.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || review.status === statusFilter;
    const matchesRating =
      ratingFilter === "all" || review.review.rating === ratingFilter;

    return matchesSearch && matchesStatus && matchesRating;
  });

  const stats = {
    total: reviews.length,
    pending: reviews.filter((r) => r.status === "pending").length,
    approved: reviews.filter((r) => r.status === "approved").length,
    rejected: reviews.filter((r) => r.status === "rejected").length,
    flagged: reviews.filter((r) => r.status === "flagged").length,
    averageRating:
      reviews.reduce((sum, r) => sum + r.review.rating, 0) / reviews.length,
    lowRatings: reviews.filter((r) => r.review.rating <= 2).length,
  };

  const updateReviewStatus = (
    reviewId: string,
    newStatus: ReviewStatus,
    reason?: string,
  ) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              status: newStatus,
              updatedAt: new Date().toISOString(),
              moderatedBy: "admin@platform.com",
              flagReason: reason,
            }
          : review,
      ),
    );
    setRejectionReason("");
    setShowDetails(false);
  };

  const viewReviewDetails = (review: Review) => {
    setSelectedReview(review);
    setShowDetails(true);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Review Moderation
            </h1>
            <p className="text-gray-600">
              Moderate customer reviews and handle reports
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
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          <Card className="p-4">
            <div className="text-2xl font-bold text-gray-900">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600">Total Reviews</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {stats.pending}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
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
          <Card className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {stats.flagged}
            </div>
            <div className="text-sm text-gray-600">Flagged</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-gray-900">
              {stats.averageRating.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {stats.lowRatings}
            </div>
            <div className="text-sm text-gray-600">Low Ratings</div>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search reviews, customers, providers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as ReviewStatus | "all")
            }
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="flagged">Flagged</option>
          </select>
          <select
            value={ratingFilter}
            onChange={(e) =>
              setRatingFilter(
                e.target.value === "all" ? "all" : parseInt(e.target.value),
              )
            }
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Ratings</option>
            <option value={5}>5 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={2}>2 Stars</option>
            <option value={1}>1 Star</option>
          </select>
        </div>

        {/* Reviews Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 font-medium text-gray-900">
                    Review ID
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Service
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Customer
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Provider
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Rating
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Review
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Date
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
                {filteredReviews.map((review) => {
                  const statusInfo = statusConfig[review.status];

                  return (
                    <tr
                      key={review.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="p-4">
                        <div className="font-medium text-gray-900">
                          {review.id}
                        </div>
                        <div className="text-sm text-gray-500">
                          {review.booking.id}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-gray-900">
                          {review.booking.service}
                        </div>
                        <div className="text-sm text-gray-500">
                          Rs {review.booking.amount.toLocaleString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">
                            {review.reviewer.avatar}
                          </span>
                          <div>
                            <div className="font-medium text-gray-900">
                              {review.reviewer.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {review.reviewer.totalReviews} reviews
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">
                            {review.provider.avatar}
                          </span>
                          <div>
                            <div className="font-medium text-gray-900">
                              {review.provider.name}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Star className="h-3 w-3 text-yellow-400 mr-1" />
                              {review.provider.rating} (
                              {review.provider.totalReviews})
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          {renderStars(review.review.rating)}
                          <span className="ml-2 font-medium text-gray-900">
                            {review.review.rating}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 max-w-xs">
                        <div className="font-medium text-gray-900 mb-1">
                          {review.review.title}
                        </div>
                        <div className="text-sm text-gray-600 line-clamp-2">
                          {review.review.content.substring(0, 100)}...
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-gray-900">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <span
                            className={`px-2 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}
                          >
                            {statusInfo.label}
                          </span>
                          {review.reports.length > 0 && (
                            <Flag className="h-4 w-4 text-red-500 ml-2" />
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => viewReviewDetails(review)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {review.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() =>
                                  updateReviewStatus(review.id, "approved")
                                }
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                className="bg-red-600 hover:bg-red-700 text-white"
                                onClick={() => viewReviewDetails(review)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          {review.status === "flagged" && (
                            <Button
                              size="sm"
                              className="bg-orange-600 hover:bg-orange-700 text-white"
                              onClick={() => viewReviewDetails(review)}
                            >
                              <Flag className="h-4 w-4" />
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

        {/* Review Details Modal */}
        {showDetails && selectedReview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Review Details - {selectedReview.id}
                  </h2>
                  <Button
                    variant="outline"
                    onClick={() => setShowDetails(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Review Content */}
                  <Card className="p-4">
                    <h3 className="font-semibold mb-3">Review Content</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        {renderStars(selectedReview.review.rating)}
                        <span className="ml-2 font-bold text-lg">
                          {selectedReview.review.rating}/5
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-lg">
                          {selectedReview.review.title}
                        </div>
                      </div>
                      <div className="text-gray-700">
                        {selectedReview.review.content}
                      </div>

                      {selectedReview.review.pros &&
                        selectedReview.review.pros.length > 0 && (
                          <div>
                            <div className="font-medium text-green-600 mb-1">
                              Pros:
                            </div>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                              {selectedReview.review.pros.map((pro, index) => (
                                <li key={index}>{pro}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                      {selectedReview.review.cons &&
                        selectedReview.review.cons.length > 0 && (
                          <div>
                            <div className="font-medium text-red-600 mb-1">
                              Cons:
                            </div>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                              {selectedReview.review.cons.map((con, index) => (
                                <li key={index}>{con}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                      <div className="flex items-center">
                        <span className="font-medium">Would Recommend:</span>
                        <span
                          className={`ml-2 px-2 py-1 rounded text-sm ${selectedReview.review.wouldRecommend ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                        >
                          {selectedReview.review.wouldRecommend ? "Yes" : "No"}
                        </span>
                      </div>
                    </div>
                  </Card>

                  {/* Booking & Participants */}
                  <div className="space-y-4">
                    <Card className="p-4">
                      <h3 className="font-semibold mb-3">
                        Booking Information
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">Booking ID:</span>{" "}
                          {selectedReview.booking.id}
                        </div>
                        <div>
                          <span className="font-medium">Service:</span>{" "}
                          {selectedReview.booking.service}
                        </div>
                        <div>
                          <span className="font-medium">Date:</span>{" "}
                          {new Date(
                            selectedReview.booking.date,
                          ).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Amount:</span> Rs{" "}
                          {selectedReview.booking.amount.toLocaleString()}
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <h3 className="font-semibold mb-3">Customer</h3>
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">
                          {selectedReview.reviewer.avatar}
                        </span>
                        <div>
                          <div className="font-medium">
                            {selectedReview.reviewer.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {selectedReview.reviewer.email}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {selectedReview.reviewer.totalReviews} total reviews
                      </div>
                    </Card>

                    <Card className="p-4">
                      <h3 className="font-semibold mb-3">Provider</h3>
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">
                          {selectedReview.provider.avatar}
                        </span>
                        <div>
                          <div className="font-medium">
                            {selectedReview.provider.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {selectedReview.provider.email}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        {selectedReview.provider.rating} rating •{" "}
                        {selectedReview.provider.totalReviews} reviews
                      </div>
                    </Card>
                  </div>

                  {/* Reports */}
                  {selectedReview.reports.length > 0 && (
                    <Card className="p-4 lg:col-span-2">
                      <h3 className="font-semibold mb-3 text-red-600 flex items-center">
                        <Flag className="h-4 w-4 mr-2" />
                        Reports ({selectedReview.reports.length})
                      </h3>
                      <div className="space-y-3">
                        {selectedReview.reports.map((report) => (
                          <div
                            key={report.id}
                            className="border-l-4 border-red-200 pl-4"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium text-gray-900">
                                  {report.reason}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {report.description}
                                </div>
                                <div className="text-sm text-gray-500 mt-1">
                                  Reported by: {report.reportedBy} •{" "}
                                  {new Date(report.timestamp).toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {/* Current Status */}
                  <Card className="p-4 lg:col-span-2">
                    <h3 className="font-semibold mb-3">Current Status</h3>
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-3 py-2 rounded ${statusConfig[selectedReview.status].color}`}
                      >
                        {statusConfig[selectedReview.status].label}
                      </span>
                      <div className="text-sm text-gray-500">
                        Last updated:{" "}
                        {new Date(selectedReview.updatedAt).toLocaleString()}
                        {selectedReview.moderatedBy &&
                          ` by ${selectedReview.moderatedBy}`}
                      </div>
                    </div>
                    {selectedReview.flagReason && (
                      <div className="mt-3 text-sm">
                        <span className="font-medium text-red-600">
                          Flag Reason:
                        </span>{" "}
                        {selectedReview.flagReason}
                      </div>
                    )}
                  </Card>
                </div>

                {/* Action Buttons */}
                {(selectedReview.status === "pending" ||
                  selectedReview.status === "flagged") && (
                  <div className="mt-6 space-y-4">
                    {selectedReview.status === "flagged" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Review Notes (Optional)
                        </label>
                        <textarea
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={2}
                          placeholder="Add any notes about this review moderation..."
                        />
                      </div>
                    )}
                    <div className="flex space-x-4">
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() =>
                          updateReviewStatus(selectedReview.id, "approved")
                        }
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Approve Review
                      </Button>
                      <div className="flex-1">
                        <Input
                          placeholder="Reason for rejection/flagging..."
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          className="mb-2"
                        />
                        <div className="flex space-x-2">
                          <Button
                            className="bg-red-600 hover:bg-red-700 text-white flex-1"
                            onClick={() =>
                              updateReviewStatus(
                                selectedReview.id,
                                "rejected",
                                rejectionReason,
                              )
                            }
                            disabled={!rejectionReason.trim()}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                          <Button
                            className="bg-orange-600 hover:bg-orange-700 text-white flex-1"
                            onClick={() =>
                              updateReviewStatus(
                                selectedReview.id,
                                "flagged",
                                rejectionReason,
                              )
                            }
                            disabled={!rejectionReason.trim()}
                          >
                            <Flag className="h-4 w-4 mr-2" />
                            Flag
                          </Button>
                        </div>
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
