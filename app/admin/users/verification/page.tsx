"use client";

import { useState } from "react";
import {
  Shield,
  Search,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  FileText,
  Image,
  Calendar,
  Clock,
  User,
  MoreHorizontal,
  Approve,
  X,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function UserVerificationPage() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Mock data for verification requests
  const verificationRequests = [
    {
      id: "VR001",
      userId: "SP001",
      userName: language === "ne" ? "राम शर्मा" : "Ram Sharma",
      userType: "provider",
      email: "ram.sharma@email.com",
      phone: "+977-9800000001",
      submittedDate: "2024-01-10",
      status: "pending",
      documents: {
        citizenship: {
          status: "submitted",
          fileName: "citizenship_ram.jpg",
          uploadDate: "2024-01-10",
          size: "2.3 MB",
        },
        certificate: {
          status: "submitted",
          fileName: "certificate_ram.pdf",
          uploadDate: "2024-01-10",
          size: "1.8 MB",
        },
        photo: {
          status: "approved",
          fileName: "photo_ram.jpg",
          uploadDate: "2024-01-10",
          size: "0.9 MB",
        },
      },
      notes: [],
      category: language === "ne" ? "घर सरसफाई" : "House Cleaning",
    },
    {
      id: "VR002",
      userId: "SP002",
      userName: language === "ne" ? "सीता पौडेल" : "Sita Poudel",
      userType: "provider",
      email: "sita.poudel@email.com",
      phone: "+977-9800000002",
      submittedDate: "2024-01-12",
      status: "under_review",
      documents: {
        citizenship: {
          status: "approved",
          fileName: "citizenship_sita.jpg",
          uploadDate: "2024-01-12",
          size: "2.1 MB",
        },
        certificate: {
          status: "rejected",
          fileName: "certificate_sita.pdf",
          uploadDate: "2024-01-12",
          size: "1.5 MB",
          rejectionReason: "Certificate not clearly visible",
        },
        photo: {
          status: "submitted",
          fileName: "photo_sita.jpg",
          uploadDate: "2024-01-12",
          size: "1.2 MB",
        },
      },
      notes: ["Certificate needs to be re-uploaded with better quality"],
      category: language === "ne" ? "ट्यूशन" : "Tutoring",
    },
    {
      id: "VR003",
      userId: "SS001",
      userName: language === "ne" ? "अनिता गुरुङ" : "Anita Gurung",
      userType: "seeker",
      email: "anita.gurung@email.com",
      phone: "+977-9800000011",
      submittedDate: "2024-01-14",
      status: "approved",
      documents: {
        citizenship: {
          status: "approved",
          fileName: "citizenship_anita.jpg",
          uploadDate: "2024-01-14",
          size: "1.9 MB",
        },
        photo: {
          status: "approved",
          fileName: "photo_anita.jpg",
          uploadDate: "2024-01-14",
          size: "0.8 MB",
        },
      },
      notes: ["All documents verified successfully"],
      category: null,
    },
  ];

  const stats = [
    {
      title: language === "ne" ? "पेन्डिङ अनुरोधहरू" : "Pending Requests",
      value: "47",
      change: "+12",
      icon: AlertTriangle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: language === "ne" ? "समीक्षाधीन" : "Under Review",
      value: "23",
      change: "+5",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: language === "ne" ? "अनुमोदित" : "Approved",
      value: "156",
      change: "+28",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: language === "ne" ? "अस्वीकृत" : "Rejected",
      value: "8",
      change: "-2",
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "under_review":
        return "bg-blue-100 text-blue-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDocumentStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "submitted":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default:
        return <XCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const filteredRequests = verificationRequests.filter((request) => {
    const matchesSearch =
      request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;
    const matchesType = typeFilter === "all" || request.userType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleApprove = (id: string) => {
    console.log("Approving:", id);
    // Implementation for approval
  };

  const handleReject = (id: string) => {
    console.log("Rejecting:", id);
    // Implementation for rejection
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {language === "ne"
                ? "प्रयोगकर्ता प्रमाणीकरण"
                : "User Verification"}
            </h1>
            <p className="text-gray-600 mt-1">
              {language === "ne"
                ? "प्रयोगकर्ताहरूको कागजात र प्रमाणीकरण अनुरोधहरू व्यवस्थापन गर्नुहोस्"
                : "Manage user document and verification requests"}
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              {language === "ne" ? "रिपोर्ट निर्यात" : "Export Report"}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p className={`text-sm ${stat.color}`}>
                      {stat.change} {language === "ne" ? "आज" : "today"}
                    </p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder={
                      language === "ne"
                        ? "अनुरोध खोज्नुहोस्..."
                        : "Search requests..."
                    }
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">
                    {language === "ne" ? "सबै स्थिति" : "All Status"}
                  </option>
                  <option value="pending">
                    {language === "ne" ? "पेन्डिङ" : "Pending"}
                  </option>
                  <option value="under_review">
                    {language === "ne" ? "समीक्षाधीन" : "Under Review"}
                  </option>
                  <option value="approved">
                    {language === "ne" ? "अनुमोदित" : "Approved"}
                  </option>
                  <option value="rejected">
                    {language === "ne" ? "अस्वीकृत" : "Rejected"}
                  </option>
                </select>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">
                    {language === "ne" ? "सबै प्रकार" : "All Types"}
                  </option>
                  <option value="provider">
                    {language === "ne" ? "प्रदायक" : "Provider"}
                  </option>
                  <option value="seeker">
                    {language === "ne" ? "खोज्ने" : "Seeker"}
                  </option>
                </select>
              </div>
              {selectedItems.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {language === "ne" ? "चयनित अनुमोदन" : "Approve Selected"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    {language === "ne" ? "चयनित अस्वीकार" : "Reject Selected"}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Verification Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>
                {language === "ne"
                  ? "प्रमाणीकरण अनुरोधहरू"
                  : "Verification Requests"}
              </span>
              <span className="text-sm font-normal text-gray-500">
                {filteredRequests.length}{" "}
                {language === "ne" ? "फेला परे" : "results"}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedItems(filteredRequests.map((r) => r.id));
                          } else {
                            setSelectedItems([]);
                          }
                        }}
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === "ne" ? "प्रयोगकर्ता" : "User"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === "ne" ? "प्रकार" : "Type"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === "ne" ? "कागजातहरू" : "Documents"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === "ne" ? "स्थिति" : "Status"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === "ne" ? "पेश गरिएको मिति" : "Submitted"}
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === "ne" ? "कार्यहरू" : "Actions"}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          checked={selectedItems.includes(request.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedItems([...selectedItems, request.id]);
                            } else {
                              setSelectedItems(
                                selectedItems.filter((id) => id !== request.id),
                              );
                            }
                          }}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-indigo-600" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">
                              {request.userName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {request.email}
                            </p>
                            <p className="text-xs text-gray-400">
                              ID: {request.userId}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              request.userType === "provider"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {request.userType === "provider"
                              ? language === "ne"
                                ? "प���रदायक"
                                : "Provider"
                              : language === "ne"
                                ? "खोज्ने"
                                : "Seeker"}
                          </span>
                          {request.category && (
                            <p className="text-xs text-gray-500 mt-1">
                              {request.category}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          {Object.entries(request.documents).map(
                            ([docType, docInfo]) => (
                              <div
                                key={docType}
                                className="flex items-center space-x-2"
                              >
                                <div className="flex items-center space-x-1">
                                  {getDocumentStatusIcon(docInfo.status)}
                                  <span className="text-xs text-gray-600 capitalize">
                                    {docType}
                                  </span>
                                </div>
                                {docInfo.status === "rejected" &&
                                  docInfo.rejectionReason && (
                                    <div className="group relative">
                                      <AlertTriangle className="h-3 w-3 text-red-500" />
                                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {docInfo.rejectionReason}
                                      </div>
                                    </div>
                                  )}
                              </div>
                            ),
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}
                        >
                          {language === "ne"
                            ? request.status === "pending"
                              ? "पेन्डिङ"
                              : request.status === "under_review"
                                ? "समीक्षाधीन"
                                : request.status === "approved"
                                  ? "अनुमोदित"
                                  : request.status === "rejected"
                                    ? "अस्वीकृत"
                                    : request.status
                            : request.status
                                .replace("_", " ")
                                .split(" ")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() +
                                    word.slice(1),
                                )
                                .join(" ")}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(request.submittedDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            {language === "ne" ? "हेर्नुहोस्" : "View"}
                          </Button>
                          {request.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleApprove(request.id)}
                              >
                                <CheckCircle className="h-3 w-3 mr-1" />
                                {language === "ne" ? "अनुमोदन" : "Approve"}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 border-red-600 hover:bg-red-50"
                                onClick={() => handleReject(request.id)}
                              >
                                <X className="h-3 w-3 mr-1" />
                                {language === "ne" ? "अस्वीकार" : "Reject"}
                              </Button>
                            </>
                          )}
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">
                  {language === "ne"
                    ? `१ देखि ${filteredRequests.length} सम्म देखाइँदै`
                    : `Showing 1 to ${filteredRequests.length} of ${filteredRequests.length} results`}
                </p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    {language === "ne" ? "अघिल्लो" : "Previous"}
                  </Button>
                  <Button variant="outline" size="sm">
                    {language === "ne" ? "अर्को" : "Next"}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
