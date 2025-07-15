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
  Check,
  X,
  Clock,
  FileText,
  Shield,
  AlertTriangle,
  Download,
} from "lucide-react";

// Mock data for verification requests
const mockVerificationRequests = [
  {
    id: 1,
    userId: "USR001",
    name: "Raj Kumar Shrestha",
    email: "raj@email.com",
    userType: "provider",
    submittedDate: "2024-01-15",
    status: "pending",
    documents: {
      profilePhoto: "photo1.jpg",
      idDocument: "citizenship1.pdf",
      certifications: ["cert1.pdf", "cert2.pdf"],
    },
    notes: "Professional web developer with 5 years experience",
    priority: "high",
  },
  {
    id: 2,
    userId: "USR002",
    name: "Sita Devi Gurung",
    email: "sita@email.com",
    userType: "provider",
    submittedDate: "2024-01-16",
    status: "pending",
    documents: {
      profilePhoto: "photo2.jpg",
      idDocument: "citizenship2.pdf",
      certifications: ["cleaning_cert.pdf"],
    },
    notes: "House cleaning service provider",
    priority: "medium",
  },
  {
    id: 3,
    userId: "USR003",
    name: "Bikash Thapa",
    email: "bikash@email.com",
    userType: "provider",
    submittedDate: "2024-01-14",
    status: "approved",
    documents: {
      profilePhoto: "photo3.jpg",
      idDocument: "citizenship3.pdf",
      certifications: ["tutor_cert.pdf"],
    },
    notes: "Math and science tutor",
    priority: "low",
    approvedBy: "Admin",
    approvedDate: "2024-01-15",
  },
  {
    id: 4,
    userId: "USR004",
    name: "Maya Tamang",
    email: "maya@email.com",
    userType: "provider",
    submittedDate: "2024-01-13",
    status: "rejected",
    documents: {
      profilePhoto: "photo4.jpg",
      idDocument: "citizenship4.pdf",
      certifications: [],
    },
    notes: "Incomplete documentation",
    priority: "low",
    rejectedBy: "Admin",
    rejectedDate: "2024-01-14",
    rejectionReason: "Missing required certifications",
  },
];

export default function UserVerification() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredRequests = mockVerificationRequests.filter((request) => {
    const matchesSearch = request.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || request.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const pendingCount = mockVerificationRequests.filter(
    (r) => r.status === "pending",
  ).length;
  const approvedCount = mockVerificationRequests.filter(
    (r) => r.status === "approved",
  ).length;
  const rejectedCount = mockVerificationRequests.filter(
    (r) => r.status === "rejected",
  ).length;

  const handleViewDetails = (request: any) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleApprove = (requestId: number) => {
    console.log("Approving request:", requestId);
    // Implementation for approval
  };

  const handleReject = (requestId: number) => {
    console.log("Rejecting request:", requestId);
    // Implementation for rejection
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {t("admin.userVerification")}
            </h1>
            <p className="text-gray-600 mt-1">
              Review and verify user documentation and credentials
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button>
              <Shield className="h-4 w-4 mr-2" />
              Verification Guidelines
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {pendingCount}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {approvedCount}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <X className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">
                  {rejectedCount}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockVerificationRequests.length}
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
                  placeholder="Search verification requests..."
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
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Verification Requests Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Documents
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
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
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 font-medium">
                            {request.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {request.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {request.email} • {request.userId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {request.submittedDate}
                      </div>
                      <div className="text-sm text-gray-500 capitalize">
                        {request.userType}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {Object.keys(request.documents).length} docs
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Certs: {request.documents.certifications.length}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          request.priority === "high"
                            ? "bg-red-100 text-red-800"
                            : request.priority === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {request.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          request.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : request.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(request)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {request.status === "pending" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleApprove(request.id)}
                            className="text-green-600 border-green-600 hover:bg-green-50"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReject(request.id)}
                            className="text-red-600 border-red-600 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Modal */}
        {showModal && selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Verification Details: {selectedRequest.name}
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
                    User Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Name:</span>{" "}
                      {selectedRequest.name}
                    </div>
                    <div>
                      <span className="text-gray-600">Email:</span>{" "}
                      {selectedRequest.email}
                    </div>
                    <div>
                      <span className="text-gray-600">User ID:</span>{" "}
                      {selectedRequest.userId}
                    </div>
                    <div>
                      <span className="text-gray-600">Type:</span>{" "}
                      {selectedRequest.userType}
                    </div>
                    <div>
                      <span className="text-gray-600">Submitted:</span>{" "}
                      {selectedRequest.submittedDate}
                    </div>
                    <div>
                      <span className="text-gray-600">Priority:</span>{" "}
                      {selectedRequest.priority}
                    </div>
                  </div>

                  <h4 className="font-medium text-gray-900 mt-6 mb-3">
                    Documents
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">
                        Profile Photo: {selectedRequest.documents.profilePhoto}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">
                        ID Document: {selectedRequest.documents.idDocument}
                      </span>
                    </div>
                    {selectedRequest.documents.certifications.map(
                      (cert: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <FileText className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">Certificate: {cert}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Notes & Status
                  </h4>
                  <div className="bg-gray-50 p-3 rounded-md mb-4">
                    <p className="text-sm text-gray-700">
                      {selectedRequest.notes}
                    </p>
                  </div>

                  {selectedRequest.status === "approved" && (
                    <div className="bg-green-50 p-3 rounded-md mb-4">
                      <div className="flex items-center mb-2">
                        <Check className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm font-medium text-green-800">
                          Approved
                        </span>
                      </div>
                      <div className="text-sm text-green-700">
                        <div>By: {selectedRequest.approvedBy}</div>
                        <div>Date: {selectedRequest.approvedDate}</div>
                      </div>
                    </div>
                  )}

                  {selectedRequest.status === "rejected" && (
                    <div className="bg-red-50 p-3 rounded-md mb-4">
                      <div className="flex items-center mb-2">
                        <X className="h-4 w-4 text-red-600 mr-2" />
                        <span className="text-sm font-medium text-red-800">
                          Rejected
                        </span>
                      </div>
                      <div className="text-sm text-red-700">
                        <div>By: {selectedRequest.rejectedBy}</div>
                        <div>Date: {selectedRequest.rejectedDate}</div>
                        <div>Reason: {selectedRequest.rejectionReason}</div>
                      </div>
                    </div>
                  )}

                  <h4 className="font-medium text-gray-900 mb-3">
                    Admin Actions
                  </h4>
                  <div className="space-y-2">
                    <Button className="w-full">View Document Files</Button>
                    <Button variant="outline" className="w-full">
                      Contact User
                    </Button>
                    {selectedRequest.status === "pending" && (
                      <div className="flex space-x-2">
                        <Button
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          onClick={() => handleApprove(selectedRequest.id)}
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
                          onClick={() => handleReject(selectedRequest.id)}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </div>
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
