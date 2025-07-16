"use client";

import { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  CreditCard,
  PieChart,
  BarChart3,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function RevenueTrackingPage() {
  const { language } = useLanguage();
  const [timeRange, setTimeRange] = useState("30d");
  const [viewType, setViewType] = useState("overview");

  // Mock revenue data
  const revenueStats = [
    {
      title: language === "ne" ? "कुल राजस्व" : "Total Revenue",
      value: "रू 8,45,670",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: language === "ne" ? "प्लेटफर्म कमिसन" : "Platform Commission",
      value: "रू 1,26,851",
      change: "+8.3%",
      trend: "up",
      icon: PieChart,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: language === "ne" ? "पेमेन्ट गेटवे शुल्क" : "Payment Gateway Fees",
      value: "रू 12,685",
      change: "+5.7%",
      trend: "up",
      icon: CreditCard,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: language === "ne" ? "शुद्ध आम्दानी" : "Net Earnings",
      value: "रू 1,14,166",
      change: "+9.2%",
      trend: "up",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const monthlyData = [
    {
      month: "जनवरी",
      totalRevenue: 245000,
      commission: 36750,
      gatewayFees: 3675,
      netEarnings: 33075,
      transactions: 156,
    },
    {
      month: "फेब्रुअरी",
      totalRevenue: 289000,
      commission: 43350,
      gatewayFees: 4335,
      netEarnings: 39015,
      transactions: 187,
    },
    {
      month: "मार्च",
      totalRevenue: 334000,
      commission: 50100,
      gatewayFees: 5010,
      netEarnings: 45090,
      transactions: 203,
    },
    {
      month: "अप्रिल",
      totalRevenue: 398000,
      commission: 59700,
      gatewayFees: 5970,
      netEarnings: 53730,
      transactions: 245,
    },
    {
      month: "मे",
      totalRevenue: 456000,
      commission: 68400,
      gatewayFees: 6840,
      netEarnings: 61560,
      transactions: 278,
    },
    {
      month: "जुन",
      totalRevenue: 523000,
      commission: 78450,
      gatewayFees: 7845,
      netEarnings: 70605,
      transactions: 312,
    },
  ];

  const paymentMethods = [
    {
      method: "eSewa",
      transactions: 1245,
      revenue: 345600,
      percentage: 45.2,
      fees: 1.5,
      color: "bg-green-500",
    },
    {
      method: "Khalti",
      transactions: 892,
      revenue: 234500,
      percentage: 30.7,
      fees: 1.8,
      color: "bg-purple-500",
    },
    {
      method: "IME Pay",
      transactions: 456,
      revenue: 123400,
      percentage: 16.1,
      fees: 1.2,
      color: "bg-blue-500",
    },
    {
      method: language === "ne" ? "नगद" : "Cash",
      transactions: 234,
      revenue: 61200,
      percentage: 8.0,
      fees: 0,
      color: "bg-gray-500",
    },
  ];

  const recentTransactions = [
    {
      id: "TXN001",
      date: "2024-01-15",
      provider: language === "ne" ? "राम शर्मा" : "Ram Sharma",
      service: language === "ne" ? "घर सरसफाई" : "House Cleaning",
      amount: 2500,
      commission: 375,
      gatewayFee: 37.5,
      netEarning: 337.5,
      status: "completed",
      paymentMethod: "eSewa",
    },
    {
      id: "TXN002",
      date: "2024-01-15",
      provider: language === "ne" ? "सीता पौडेल" : "Sita Poudel",
      service: language === "ne" ? "गणित ट्यूशन" : "Math Tutoring",
      amount: 1500,
      commission: 180,
      gatewayFee: 27,
      netEarning: 153,
      status: "completed",
      paymentMethod: "Khalti",
    },
    {
      id: "TXN003",
      date: "2024-01-14",
      provider: language === "ne" ? "माया तामाङ" : "Maya Tamang",
      service: language === "ne" ? "वेब डिजाइन" : "Web Design",
      amount: 15000,
      commission: 2700,
      gatewayFee: 270,
      netEarning: 2430,
      status: "completed",
      paymentMethod: "IME Pay",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {language === "ne" ? "राजस्व ट्र्याकिङ" : "Revenue Tracking"}
            </h1>
            <p className="text-gray-600 mt-1">
              {language === "ne"
                ? "प्लेटफर्मको आम्दानी र राजस्व विश्लेषण"
                : "Platform earnings and revenue analytics"}
            </p>
          </div>
          <div className="flex space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">
                {language === "ne" ? "पछिल्लो ७ दिन" : "Last 7 days"}
              </option>
              <option value="30d">
                {language === "ne" ? "पछिल्लो ३० दिन" : "Last 30 days"}
              </option>
              <option value="90d">
                {language === "ne" ? "पछिल्लो ९० दिन" : "Last 90 days"}
              </option>
              <option value="1y">
                {language === "ne" ? "पछिल्लो वर्ष" : "Last year"}
              </option>
            </select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              {language === "ne" ? "रिपोर्ट निर्यात" : "Export Report"}
            </Button>
          </div>
        </div>

        {/* Revenue Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {revenueStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <div className="flex items-center mt-1">
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span
                        className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Monthly Revenue Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {language === "ne"
                  ? "मासिक राजस्व ट्रेन्ड"
                  : "Monthly Revenue Trend"}
              </CardTitle>
              <div className="flex space-x-2">
                <button
                  onClick={() => setViewType("overview")}
                  className={`px-3 py-1 text-sm rounded-lg ${
                    viewType === "overview"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {language === "ne" ? "सिंहावलोकन" : "Overview"}
                </button>
                <button
                  onClick={() => setViewType("detailed")}
                  className={`px-3 py-1 text-sm rounded-lg ${
                    viewType === "detailed"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {language === "ne" ? "विस्तृत" : "Detailed"}
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-end space-x-2 p-4">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col space-y-1">
                    {/* Net Earnings */}
                    <div
                      className="w-full bg-green-500 rounded-t-sm relative group cursor-pointer"
                      style={{
                        height: `${(data.netEarnings / Math.max(...monthlyData.map((d) => d.netEarnings))) * 200}px`,
                        minHeight: "4px",
                      }}
                    >
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {language === "ne" ? "शुद्ध: " : "Net: "}रू{" "}
                        {data.netEarnings.toLocaleString()}
                      </div>
                    </div>
                    {/* Gateway Fees */}
                    <div
                      className="w-full bg-red-400"
                      style={{
                        height: `${(data.gatewayFees / Math.max(...monthlyData.map((d) => d.gatewayFees))) * 40}px`,
                        minHeight: "2px",
                      }}
                    ></div>
                    {/* Commission */}
                    <div
                      className="w-full bg-blue-500"
                      style={{
                        height: `${(data.commission / Math.max(...monthlyData.map((d) => d.commission))) * 120}px`,
                        minHeight: "4px",
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 mt-2 transform -rotate-45 origin-left">
                    {data.month}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-6 mt-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                <span>
                  {language === "ne" ? "शुद्ध आम्दानी" : "Net Earnings"}
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                <span>{language === "ne" ? "कमिसन" : "Commission"}</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-400 rounded mr-2"></div>
                <span>
                  {language === "ne" ? "गेटवे शुल्क" : "Gateway Fees"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle>
                {language === "ne" ? "भुक्तानी विधिहरू" : "Payment Methods"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 ${method.color} rounded`}></div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {method.method}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {method.transactions}{" "}
                          {language === "ne" ? "लेनदेन" : "transactions"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        रू {method.revenue.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {method.percentage}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Revenue Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>
                {language === "ne" ? "राजस्व विभाजन" : "Revenue Breakdown"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-green-900">
                      {language === "ne"
                        ? "कुल सेवा मूल्य"
                        : "Total Service Value"}
                    </h4>
                    <p className="text-sm text-green-700">
                      {language === "ne"
                        ? "प्रदायकहरूले प्राप्त गर्ने"
                        : "Received by providers"}
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    रू 7,18,819
                  </p>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-blue-900">
                      {language === "ne"
                        ? "प्लेटफर्म कमिसन"
                        : "Platform Commission"}
                    </h4>
                    <p className="text-sm text-blue-700">
                      15%{" "}
                      {language === "ne" ? "औसत कमिसन" : "average commission"}
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">
                    रू 1,26,851
                  </p>
                </div>

                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-red-900">
                      {language === "ne" ? "गेटवे शुल्क" : "Gateway Fees"}
                    </h4>
                    <p className="text-sm text-red-700">
                      1.5% {language === "ne" ? "औसत शुल्क" : "average fee"}
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-red-600">रू 12,685</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>
                {language === "ne" ? "हालका लेनदेनहरू" : "Recent Transactions"}
              </span>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                {language === "ne" ? "सबै हेर्नुहोस्" : "View All"}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {language === "ne" ? "लेनदेन ID" : "Transaction ID"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {language === "ne" ? "प्रदायक" : "Provider"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {language === "ne" ? "सेवा" : "Service"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {language === "ne" ? "रकम" : "Amount"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {language === "ne" ? "कमिसन" : "Commission"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {language === "ne" ? "भुक्तानी विधि" : "Payment Method"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {language === "ne" ? "स्थिति" : "Status"}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {transaction.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {transaction.provider}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {transaction.service}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        रू {transaction.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-green-600 font-medium">
                        रू {transaction.commission.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {transaction.paymentMethod}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}
                        >
                          {language === "ne"
                            ? transaction.status === "completed"
                              ? "सम्पन्न"
                              : transaction.status
                            : transaction.status.charAt(0).toUpperCase() +
                              transaction.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
