"use client";

import { useState } from "react";
import {
  Package,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Grid,
  List,
  Tag,
  TrendingUp,
  Users,
  Star,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ServiceCategoriesPage() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  // Mock data for service categories
  const categories = [
    {
      id: "CAT001",
      name: language === "ne" ? "घर सरसफाई" : "House Cleaning",
      nameEn: "House Cleaning",
      nameNe: "घर सरसफाई",
      description:
        language === "ne"
          ? "घरको सफाइ, झ्याल धुने, कार्पेट सफाई"
          : "Home cleaning, window washing, carpet cleaning",
      icon: "🏠",
      color: "#3B82F6",
      status: "active",
      serviceCount: 45,
      providerCount: 23,
      averageRating: 4.7,
      totalBookings: 892,
      subcategories: [
        {
          id: "SC001",
          name: language === "ne" ? "गहिरो सफाई" : "Deep Cleaning",
        },
        {
          id: "SC002",
          name: language === "ne" ? "नियमित सफाई" : "Regular Cleaning",
        },
        {
          id: "SC003",
          name: language === "ne" ? "कार्पेट सफाई" : "Carpet Cleaning",
        },
      ],
      commission: 15,
      createdDate: "2023-06-15",
      updatedDate: "2024-01-10",
    },
    {
      id: "CAT002",
      name: language === "ne" ? "शिक्षण र ट्यूशन" : "Education & Tutoring",
      nameEn: "Education & Tutoring",
      nameNe: "शिक्षण र ट्यूशन",
      description:
        language === "ne"
          ? "विभिन्न विषयमा ट्यूशन, भाषा सिकाउने"
          : "Subject tutoring, language teaching",
      icon: "📚",
      color: "#10B981",
      status: "active",
      serviceCount: 67,
      providerCount: 34,
      averageRating: 4.8,
      totalBookings: 1234,
      subcategories: [
        { id: "SC004", name: language === "ne" ? "गणित" : "Mathematics" },
        { id: "SC005", name: language === "ne" ? "अंग्रेजी" : "English" },
        { id: "SC006", name: language === "ne" ? "विज्ञान" : "Science" },
      ],
      commission: 12,
      createdDate: "2023-06-20",
      updatedDate: "2024-01-08",
    },
    {
      id: "CAT003",
      name: language === "ne" ? "डिजिटल सेवाहरू" : "Digital Services",
      nameEn: "Digital Services",
      nameNe: "डिजिटल सेवाहरू",
      description:
        language === "ne"
          ? "वेब डिजाइन, ग्राफिक्स, डिजिटल मार्केटिङ"
          : "Web design, graphics, digital marketing",
      icon: "💻",
      color: "#8B5CF6",
      status: "active",
      serviceCount: 89,
      providerCount: 45,
      averageRating: 4.6,
      totalBookings: 567,
      subcategories: [
        { id: "SC007", name: language === "ne" ? "वेब डिजाइन" : "Web Design" },
        {
          id: "SC008",
          name: language === "ne" ? "ग्राफिक्स डिजाइन" : "Graphic Design",
        },
        { id: "SC009", name: language === "ne" ? "SEO" : "SEO" },
      ],
      commission: 18,
      createdDate: "2023-07-01",
      updatedDate: "2024-01-12",
    },
  ];

  const stats = [
    {
      title: language === "ne" ? "कुल श्रेणीहरू" : "Total Categories",
      value: categories.length.toString(),
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: language === "ne" ? "सक्रिय सेवाहरू" : "Active Services",
      value: categories
        .reduce((sum, cat) => sum + cat.serviceCount, 0)
        .toString(),
      icon: Tag,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: language === "ne" ? "कुल प्रदायकहरू" : "Total Providers",
      value: categories
        .reduce((sum, cat) => sum + cat.providerCount, 0)
        .toString(),
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: language === "ne" ? "कुल बुकिङहरू" : "Total Bookings",
      value: categories
        .reduce((sum, cat) => sum + cat.totalBookings, 0)
        .toLocaleString(),
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const CategoryCard = ({ category }: { category: any }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
              style={{ backgroundColor: category.color + "20" }}
            >
              {category.icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{category.name}</h3>
              <p className="text-sm text-gray-500">ID: {category.id}</p>
            </div>
          </div>
          <button className="p-1 hover:bg-gray-100 rounded">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-4">{category.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-lg font-semibold text-gray-900">
              {category.serviceCount}
            </p>
            <p className="text-xs text-gray-500">
              {language === "ne" ? "सेवाहरू" : "Services"}
            </p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-lg font-semibold text-gray-900">
              {category.providerCount}
            </p>
            <p className="text-xs text-gray-500">
              {language === "ne" ? "प्रदायकहरू" : "Providers"}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">
              {category.averageRating}
            </span>
            <span className="text-xs text-gray-500">
              ({category.totalBookings} bookings)
            </span>
          </div>
          <span className="text-sm font-medium text-green-600">
            {category.commission}% {language === "ne" ? "कमिसन" : "commission"}
          </span>
        </div>

        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">
            {language === "ne" ? "उप-श्रेणीहरू:" : "Subcategories:"}
          </p>
          <div className="flex flex-wrap gap-1">
            {category.subcategories.slice(0, 3).map((sub: any) => (
              <span
                key={sub.id}
                className="px-2 py-1 bg-gray-100 text-xs rounded-full"
              >
                {sub.name}
              </span>
            ))}
            {category.subcategories.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                +{category.subcategories.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="flex space-x-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Eye className="h-3 w-3 mr-1" />
            {language === "ne" ? "हेर्नुहोस्" : "View"}
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <Edit className="h-3 w-3 mr-1" />
            {language === "ne" ? "सम्पादन" : "Edit"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {language === "ne" ? "सेवा श्रेणीहरू" : "Service Categories"}
            </h1>
            <p className="text-gray-600 mt-1">
              {language === "ne"
                ? "सेवा श्रेणीहरू र उप-श्रेणीहरू व्यवस्थापन गर्नुहोस्"
                : "Manage service categories and subcategories"}
            </p>
          </div>
          <div className="flex space-x-3">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md ${viewMode === "grid" ? "bg-white shadow" : ""}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md ${viewMode === "list" ? "bg-white shadow" : ""}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              {language === "ne" ? "नयाँ श्रेणी थप्नुहोस्" : "Add Category"}
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
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={
                    language === "ne"
                      ? "श्रेणी खोज्नुहोस्..."
                      : "Search categories..."
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {filteredCategories.length}{" "}
                  {language === "ne"
                    ? "श्रेणीहरू फेला परे"
                    : "categories found"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        {language === "ne" ? "श्रेणी" : "Category"}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        {language === "ne" ? "सेवाहरू" : "Services"}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        {language === "ne" ? "प्रदायकहरू" : "Providers"}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        {language === "ne" ? "रेटिङ" : "Rating"}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        {language === "ne" ? "कमिसन" : "Commission"}
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        {language === "ne" ? "कार्यहरू" : "Actions"}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCategories.map((category) => (
                      <tr key={category.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center text-lg mr-3"
                              style={{ backgroundColor: category.color + "20" }}
                            >
                              {category.icon}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {category.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {category.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {category.serviceCount}
                          </div>
                          <div className="text-sm text-gray-500">
                            {category.subcategories.length}{" "}
                            {language === "ne" ? "उप-श्रेणी" : "subcategories"}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {category.providerCount}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                            <span className="text-sm text-gray-900">
                              {category.averageRating}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {category.commission}%
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
            </CardContent>
          </Card>
        )}

        {/* Add Category Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <h2 className="text-xl font-bold mb-4">
                {language === "ne"
                  ? "नयाँ श्रेणी थप्नुहोस्"
                  : "Add New Category"}
              </h2>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === "ne" ? "नाम (अंग्रेजी)" : "Name (English)"}
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., House Cleaning"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === "ne" ? "नाम (नेपाली)" : "Name (Nepali)"}
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="जस्तै, घर सरसफाई"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === "ne" ? "विवरण" : "Description"}
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder={
                      language === "ne"
                        ? "श्रेणीको विवरण..."
                        : "Category description..."
                    }
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === "ne" ? "आइकन" : "Icon"}
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="🏠"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === "ne" ? "रंग" : "Color"}
                    </label>
                    <input
                      type="color"
                      className="w-full h-10 border border-gray-300 rounded-lg"
                      defaultValue="#3B82F6"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === "ne" ? "कमिसन (%)" : "Commission (%)"}
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="15"
                      min="0"
                      max="50"
                    />
                  </div>
                </div>
                <div className="flex space-x-3 pt-4">
                  <Button type="submit" className="flex-1">
                    {language === "ne" ? "श्रेणी थप्नुहोस्" : "Add Category"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowAddModal(false)}
                  >
                    {language === "ne" ? "रद्द गर्नुहोस्" : "Cancel"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
