"use client";

import { useState } from "react";
import {
  Users,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Ban,
  CheckCircle,
  XCircle,
  Star,
  Calendar,
  MapPin,
  Phone,
  Mail,
  MoreHorizontal,
  Shield,
  AlertTriangle,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ServiceProvidersPage() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);

  // Mock data for service providers
  const providers = [
    {
      id: "SP001",
      name: language === "ne" ? "राम शर्मा" : "Ram Sharma",
      email: "ram.sharma@email.com",
      phone: "+977-9800000001",
      location: language === "ne" ? "काठमाडौं" : "Kathmandu",
      category: language === "ne" ? "घर सरसफाई" : "House Cleaning",
      status: "active",
      verified: true,
      rating: 4.8,
      totalJobs: 45,
      earnings: 125000,
      joinDate: "2023-06-15",
      lastActive: "2024-01-15",
      documents: {
        citizenship: "verified",
        certificate: "pending",
        photo: "verified",
      },
    },
    {
      id: "SP002",
      name: language === "ne" ? "सीता पौडेल" : "Sita Poudel",
      email: "sita.poudel@email.com",
      phone: "+977-9800000002",
      location: language === "ne" ? "पोखरा" : "Pokhara",
      category: language === "ne" ? "ट्यूशन" : "Tutoring",
      status: "pending",
      verified: false,
      rating: 4.9,
      totalJobs: 23,
      earnings: 89000,
      joinDate: "2023-08-20",
      lastActive: "2024-01-14",
      documents: {
        citizenship: "verified",
        certificate: "verified",
        photo: "pending",
      },
    },
    {
      id: "SP003",
      name: language === "ne" ? "गोपाल तामाङ" : "Gopal Tamang",
      email: "gopal.tamang@email.com",
      phone: "+977-9800000003",
      location: language === "ne" ? "ललितपुर" : "Lalitpur",
      category: language === "ne" ? "प्लम्बिङ" : "Plumbing",
      status: "suspended",
      verified: true,
      rating: 3.8,
      totalJobs: 67,
      earnings: 156000,
      joinDate: "2023-03-10",
      lastActive: "2024-01-12",
      documents: {
        citizenship: "verified",
        certificate: "rejected",
        photo: "verified",
      },
    },
  ];

  const stats = [
    {
      title: language === "ne" ? "कुल प्रदायकहरू" : "Total Providers",
      value: "2,347",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: language === "ne" ? "सक्रिय प्रदायकहरू" : "Active Providers",
      value: "1,892",
      change: "+8%",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: language === "ne" ? "पेन्डिङ अनुमोदन" : "Pending Approval",
      value: "127",
      change: "+3%",
      icon: AlertTriangle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: language === "ne" ? "निलम्बित" : "Suspended",
      value: "23",
      change: "-5%",
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDocumentStatus = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <XCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const filteredProviders = providers.filter((provider) => {
    const matchesSearch =
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || provider.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {language === "ne" ? "सेवा प्रदायकहरू" : "Service Providers"}
            </h1>
            <p className="text-gray-600 mt-1">
              {language === "ne"
                ? "सबै सेवा प्रदायकहरूको व्यवस्थापन र निगरानी गर्नुहोस्"
                : "Manage and monitor all service providers"}
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              {language === "ne" ? "निर्यात" : "Export"}
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {language === "ne" ? "नयाँ प्रदायक थप्नुहोस्" : "Add Provider"}
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
                    <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters and Search */}
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
                        ? "प्रदायक खोज्नुहोस्..."
                        : "Search providers..."
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
                  <option value="active">
                    {language === "ne" ? "सक्रिय" : "Active"}
                  </option>
                  <option value="pending">
                    {language === "ne" ? "पेन्डिङ" : "Pending"}
                  </option>
                  <option value="suspended">
                    {language === "ne" ? "निलम्बित" : "Suspended"}
                  </option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="recent">
                    {language === "ne" ? "हालै जोडिएका" : "Most Recent"}
                  </option>
                  <option value="rating">
                    {language === "ne" ? "उच्च रेटिङ" : "Highest Rating"}
                  </option>
                  <option value="earnings">
                    {language === "ne" ? "उच्च आम्दानी" : "Highest Earnings"}
                  </option>
                  <option value="jobs">
                    {language === "ne" ? "धेरै काम" : "Most Jobs"}
                  </option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Providers Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>
                {language === "ne" ? "प्रदायक सूची" : "Provider List"}
              </span>
              <span className="text-sm font-normal text-gray-500">
                {filteredProviders.length}{" "}
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
                            setSelectedProviders(
                              filteredProviders.map((p) => p.id),
                            );
                          } else {
                            setSelectedProviders([]);
                          }
                        }}
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === "ne" ? "प्रदायक" : "Provider"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === "ne" ? "सम्पर्क" : "Contact"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === "ne" ? "श्रेणी" : "Category"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === "ne" ? "स्थिति" : "Status"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === "ne" ? "कागजातहरू" : "Documents"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === "ne" ? "प्रदर्शन" : "Performance"}
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === "ne" ? "कार्यहरू" : "Actions"}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProviders.map((provider) => (
                    <tr key={provider.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          checked={selectedProviders.includes(provider.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedProviders([
                                ...selectedProviders,
                                provider.id,
                              ]);
                            } else {
                              setSelectedProviders(
                                selectedProviders.filter(
                                  (id) => id !== provider.id,
                                ),
                              );
                            }
                          }}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium">
                              {provider.name.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="flex items-center">
                              <p className="text-sm font-medium text-gray-900">
                                {provider.name}
                              </p>
                              {provider.verified && (
                                <Shield className="h-4 w-4 text-green-500 ml-2" />
                              )}
                            </div>
                            <p className="text-sm text-gray-500">
                              ID: {provider.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="h-3 w-3 mr-2" />
                            {provider.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="h-3 w-3 mr-2" />
                            {provider.phone}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-3 w-3 mr-2" />
                            {provider.location}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {provider.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(provider.status)}`}
                        >
                          {language === "ne"
                            ? provider.status === "active"
                              ? "सक्रिय"
                              : provider.status === "pending"
                                ? "पेन्डिङ"
                                : provider.status === "suspended"
                                  ? "निलम्बित"
                                  : provider.status
                            : provider.status.charAt(0).toUpperCase() +
                              provider.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-gray-500">ID:</span>
                            {getDocumentStatus(provider.documents.citizenship)}
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-gray-500">Cert:</span>
                            {getDocumentStatus(provider.documents.certificate)}
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-gray-500">
                              Photo:
                            </span>
                            {getDocumentStatus(provider.documents.photo)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-400 mr-1" />
                            <span className="text-sm text-gray-900">
                              {provider.rating}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">
                            {provider.totalJobs}{" "}
                            {language === "ne" ? "काम" : "jobs"}
                          </p>
                          <p className="text-xs text-gray-500">
                            रू {provider.earnings.toLocaleString()}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            {language === "ne" ? "हेर्नुहोस्" : "View"}
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3 mr-1" />
                            {language === "ne" ? "सम्पादन" : "Edit"}
                          </Button>
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
                    ? `१ देखि ${filteredProviders.length} सम्म देखाइँदै`
                    : `Showing 1 to ${filteredProviders.length} of ${filteredProviders.length} results`}
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
