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
  Calendar,
  MapPin,
  Phone,
  Mail,
  MoreHorizontal,
  CreditCard,
  TrendingUp,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ServiceSeekersPage() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [selectedSeekers, setSelectedSeekers] = useState<string[]>([]);

  // Mock data for service seekers
  const seekers = [
    {
      id: "SS001",
      name: language === "ne" ? "अनिता गुरुङ" : "Anita Gurung",
      email: "anita.gurung@email.com",
      phone: "+977-9800000011",
      location: language === "ne" ? "काठमाडौं" : "Kathmandu",
      status: "active",
      verified: true,
      totalBookings: 12,
      totalSpent: 45000,
      joinDate: "2023-07-20",
      lastActive: "2024-01-15",
      favoriteCategories: [
        language === "ne" ? "घर सरसफाई" : "House Cleaning",
        language === "ne" ? "ट्यूशन" : "Tutoring",
      ],
      averageRating: 4.7,
    },
    {
      id: "SS002",
      name: language === "ne" ? "प्रदीप श्रेष्ठ" : "Pradeep Shrestha",
      email: "pradeep.shrestha@email.com",
      phone: "+977-9800000012",
      location: language === "ne" ? "पोखरा" : "Pokhara",
      status: "active",
      verified: false,
      totalBookings: 7,
      totalSpent: 28000,
      joinDate: "2023-09-15",
      lastActive: "2024-01-14",
      favoriteCategories: [language === "ne" ? "वेब डिजाइन" : "Web Design"],
      averageRating: 4.2,
    },
    {
      id: "SS003",
      name: language === "ne" ? "कमला लामा" : "Kamala Lama",
      email: "kamala.lama@email.com",
      phone: "+977-9800000013",
      location: language === "ne" ? "भक्तपुर" : "Bhaktapur",
      status: "inactive",
      verified: true,
      totalBookings: 25,
      totalSpent: 89000,
      joinDate: "2023-04-10",
      lastActive: "2023-12-20",
      favoriteCategories: [
        language === "ne" ? "योग" : "Yoga",
        language === "ne" ? "फोटोग्राफी" : "Photography",
      ],
      averageRating: 4.9,
    },
  ];

  const stats = [
    {
      title: language === "ne" ? "कुल सेवा खोज्नेहरू" : "Total Seekers",
      value: "5,892",
      change: "+18%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: language === "ne" ? "सक्रिय खोज्नेहरू" : "Active Seekers",
      value: "4,567",
      change: "+12%",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: language === "ne" ? "यो महिना नयाँ" : "New This Month",
      value: "234",
      change: "+25%",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: language === "ne" ? "कुल खर्च" : "Total Spent",
      value: "रू 2.4M",
      change: "+15%",
      icon: CreditCard,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredSeekers = seekers.filter((seeker) => {
    const matchesSearch =
      seeker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seeker.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || seeker.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {language === "ne" ? "सेवा ��ोज्नेहरू" : "Service Seekers"}
            </h1>
            <p className="text-gray-600 mt-1">
              {language === "ne"
                ? "सबै सेवा खोज्नेहरूको व्यवस्थापन र निगरानी गर्नुहोस्"
                : "Manage and monitor all service seekers"}
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              {language === "ne" ? "निर्यात" : "Export"}
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {language === "ne" ? "नयाँ खोज्ने थप्नुहोस्" : "Add Seeker"}
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

        {/* Activity Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === "ne" ? "बुकिङ गतिविधि" : "Booking Activity"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-blue-900">
                      {language === "ne" ? "आज" : "Today"}
                    </p>
                    <p className="text-xs text-blue-700">
                      {language === "ne" ? "नयाँ बुकिङहरू" : "New Bookings"}
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">23</p>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-green-900">
                      {language === "ne" ? "यो हप्ता" : "This Week"}
                    </p>
                    <p className="text-xs text-green-700">
                      {language === "ne" ? "कुल बुकिङहरू" : "Total Bookings"}
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-green-600">156</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {language === "ne"
                  ? "लोकप्रिय श्रेणीहरू"
                  : "Popular Categories"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    name: language === "ne" ? "घर सरसफाई" : "House Cleaning",
                    bookings: 45,
                    percentage: 35,
                  },
                  {
                    name: language === "ne" ? "ट्यूशन" : "Tutoring",
                    bookings: 38,
                    percentage: 30,
                  },
                  {
                    name: language === "ne" ? "वेब डिजाइन" : "Web Design",
                    bookings: 25,
                    percentage: 20,
                  },
                  {
                    name: language === "ne" ? "योग" : "Yoga",
                    bookings: 19,
                    percentage: 15,
                  },
                ].map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          {category.name}
                        </span>
                        <span className="text-sm text-gray-600">
                          {category.bookings}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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
                        ? "खोज्ने खोज्नुहोस्..."
                        : "Search seekers..."
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
                  <option value="inactive">
                    {language === "ne" ? "निष्क्रिय" : "Inactive"}
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
                  <option value="bookings">
                    {language === "ne" ? "धेरै बुकिङ" : "Most Bookings"}
                  </option>
                  <option value="spent">
                    {language === "ne" ? "धेरै खर्च" : "Highest Spent"}
                  </option>
                  <option value="rating">
                    {language === "ne" ? "उच्च रेटिङ" : "Highest Rating"}
                  </option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seekers Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{language === "ne" ? "खोज्ने सूची" : "Seeker List"}</span>
              <span className="text-sm font-normal text-gray-500">
                {filteredSeekers.length}{" "}
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
                            setSelectedSeekers(
                              filteredSeekers.map((s) => s.id),
                            );
                          } else {
                            setSelectedSeekers([]);
                          }
                        }}
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === "ne" ? "खोज्ने" : "Seeker"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === "ne" ? "सम्पर्क" : "Contact"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === "ne" ? "गतिविधि" : "Activity"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === "ne" ? "स्थिति" : "Status"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === "ne"
                        ? "मनपर्ने श्रेणी"
                        : "Favorite Categories"}
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === "ne" ? "कार्यहरू" : "Actions"}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSeekers.map((seeker) => (
                    <tr key={seeker.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          checked={selectedSeekers.includes(seeker.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedSeekers([
                                ...selectedSeekers,
                                seeker.id,
                              ]);
                            } else {
                              setSelectedSeekers(
                                selectedSeekers.filter(
                                  (id) => id !== seeker.id,
                                ),
                              );
                            }
                          }}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 font-medium">
                              {seeker.name.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="flex items-center">
                              <p className="text-sm font-medium text-gray-900">
                                {seeker.name}
                              </p>
                              {seeker.verified && (
                                <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                              )}
                            </div>
                            <p className="text-sm text-gray-500">
                              ID: {seeker.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="h-3 w-3 mr-2" />
                            {seeker.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="h-3 w-3 mr-2" />
                            {seeker.phone}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-3 w-3 mr-2" />
                            {seeker.location}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-900">
                            {seeker.totalBookings}{" "}
                            {language === "ne" ? "बुकिङहरू" : "bookings"}
                          </p>
                          <p className="text-sm text-gray-500">
                            रू {seeker.totalSpent.toLocaleString()}{" "}
                            {language === "ne" ? "खर्च" : "spent"}
                          </p>
                          <p className="text-xs text-gray-500">
                            Avg: {seeker.averageRating}★
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(seeker.status)}`}
                        >
                          {language === "ne"
                            ? seeker.status === "active"
                              ? "सक्रिय"
                              : seeker.status === "inactive"
                                ? "निष्क्रिय"
                                : seeker.status
                            : seeker.status.charAt(0).toUpperCase() +
                              seeker.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {seeker.favoriteCategories.map((category, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {category}
                            </span>
                          ))}
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
                    ? `१ देखि ${filteredSeekers.length} सम्म देखाइँदै`
                    : `Showing 1 to ${filteredSeekers.length} of ${filteredSeekers.length} results`}
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
