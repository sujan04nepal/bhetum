"use client";

import { useState } from "react";
import {
  Search,
  MapPin,
  Filter,
  DollarSign,
  Clock,
  User,
  Star,
  Calendar,
  AlertCircle,
  TrendingUp,
  Eye,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SERVICE_CATEGORIES, MAJOR_CITIES } from "@/lib/constants";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function BrowseRequestsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [urgency, setUrgency] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const { t, language } = useLanguage();

  // Mock requests data
  const requests = [
    {
      id: "REQ001",
      title:
        language === "ne"
          ? "घर सरसफाइ सेवा चाहिन्छ"
          : "Need house cleaning service",
      description:
        language === "ne"
          ? "मलाई मेरो घरको लागि सफाइ सेवा चाहिएको छ। ३ बेडरूम, २ बाथरूम र बैठक कोठा।"
          : "I need cleaning service for my house. 3 bedrooms, 2 bathrooms, and living room.",
      category: "trade-skilled",
      categoryName:
        language === "ne" ? "व्यापारिक र सीपयुक्त" : "Trade & Skilled",
      location: language === "ne" ? "काठमाडौं" : "Kathmandu",
      budget: "रू 2,500",
      budgetType: "fixed",
      urgency: "within_week",
      postedDate: "2024-12-21",
      bidsCount: 3,
      postedBy: {
        name: language === "ne" ? "रीता श्रेष्ठ" : "Rita Shrestha",
        rating: 4.8,
        verified: true,
      },
      requirements: [
        language === "ne" ? "पर्यावरण मैत्री उत्पादन" : "Eco-friendly products",
        language === "ne" ? "२ जनाको टिम" : "Team of 2 people",
      ],
    },
    {
      id: "REQ002",
      title: language === "ne" ? "गणित ट्यूटर चाहिन्छ" : "Need math tutor",
      description:
        language === "ne"
          ? "मेरो छोराको लागि कक्षा १० को गणित ट्यूटर चाहिएको छ। हप्तामा ३ दिन।"
          : "Need math tutor for my son in grade 10. 3 days per week.",
      category: "teaching-coaching",
      categoryName:
        language === "ne" ? "शिक्षण र प्रशिक्षण" : "Teaching & Coaching",
      location: language === "ne" ? "पोखरा" : "Pokhara",
      budget: "रू 500/घण्टा",
      budgetType: "hourly",
      urgency: "flexible",
      postedDate: "2024-12-20",
      bidsCount: 7,
      postedBy: {
        name: language === "ne" ? "सुनिल पौडेल" : "Sunil Poudel",
        rating: 4.6,
        verified: true,
      },
      requirements: [
        language === "ne" ? "SEE को अनुभव" : "SEE exam experience",
        language === "ne" ? "घरमा आउनुपर्छ" : "Home tutoring required",
      ],
    },
    {
      id: "REQ003",
      title:
        language === "ne" ? "वेबसाइट डिजाइन सेवा" : "Website design service",
      description:
        language === "ne"
          ? "मेरो व्यापारको लागि आधुनिक वेबसाइट चाहिएको छ। ई-कमर्स सुविधासहित।"
          : "Need modern website for my business. With e-commerce features.",
      category: "digital-online",
      categoryName: language === "ne" ? "डिजिटल र अनलाइन" : "Digital & Online",
      location: language === "ne" ? "ललितपुर" : "Lalitpur",
      budget: "रू 25,000",
      budgetType: "fixed",
      urgency: "urgent",
      postedDate: "2024-12-21",
      bidsCount: 12,
      postedBy: {
        name: language === "ne" ? "प्रेम राई" : "Prem Rai",
        rating: 4.9,
        verified: true,
      },
      requirements: [
        language === "ne" ? "Mobile responsive" : "Mobile responsive",
        language === "ne" ? "SEO optimized" : "SEO optimized",
        language === "ne" ? "Payment gateway" : "Payment gateway",
      ],
    },
    {
      id: "REQ004",
      title: language === "ne" ? "विवाह फोटोग्राफी" : "Wedding photography",
      description:
        language === "ne"
          ? "मेरो विवाहको लागि फोटोग्राफर चाहिएको छ। पूरै दिनको कभरेज।"
          : "Need photographer for my wedding. Full day coverage required.",
      category: "events-hospitality",
      categoryName:
        language === "ne" ? "कार्यक्रम र आतिथ्य" : "Events & Hospitality",
      location: language === "ne" ? "भक्तपुर" : "Bhaktapur",
      budget: "रू 35,000",
      budgetType: "fixed",
      urgency: "within_week",
      postedDate: "2024-12-19",
      bidsCount: 8,
      postedBy: {
        name: language === "ne" ? "आशा लामा" : "Asha Lama",
        rating: 4.7,
        verified: true,
      },
      requirements: [
        language === "ne" ? "परम्परागत र आधुनिक" : "Traditional and modern",
        language === "ne" ? "Video पनि चाहिन्छ" : "Video also needed",
        language === "ne" ? "२ जना फोटोग्राफर" : "2 photographers",
      ],
    },
    {
      id: "REQ005",
      title: language === "ne" ? "योग प्रशिक्षक" : "Yoga instructor",
      description:
        language === "ne"
          ? "घरमा आएर योग सिकाउन सक्ने प्रशिक्षक चाहिएको छ। बिहान ६ बजे।"
          : "Need yoga instructor who can come home and teach. Morning 6 AM.",
      category: "personal-care",
      categoryName: language === "ne" ? "व्यक्तिगत हेरचाह" : "Personal Care",
      location: language === "ne" ? "काठमाडौं" : "Kathmandu",
      budget: "रू 800/सेसन",
      budgetType: "per_session",
      urgency: "flexible",
      postedDate: "2024-12-18",
      bidsCount: 5,
      postedBy: {
        name: language === "ne" ? "मीरा जोशी" : "Mira Joshi",
        rating: 4.5,
        verified: false,
      },
      requirements: [
        language === "ne" ? "महिला प्रशिक्षक" : "Female instructor",
        language === "ne" ? "प्रमाणित" : "Certified",
        language === "ne" ? "अंग्रेजी र नेपाली" : "English and Nepali",
      ],
    },
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "urgent":
        return "text-red-600 bg-red-50 border-red-200";
      case "within_week":
        return "text-orange-600 bg-orange-50 border-orange-200";
      default:
        return "text-green-600 bg-green-50 border-green-200";
    }
  };

  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case "urgent":
        return language === "ne" ? "जरुरी" : "Urgent";
      case "within_week":
        return language === "ne" ? "यो हप्ता भित्र" : "This week";
      default:
        return language === "ne" ? "लचिलो" : "Flexible";
    }
  };

  // Filter requests based on search criteria
  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      !searchQuery ||
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation = !location || request.location.includes(location);
    const matchesCategory = !category || request.category === category;
    const matchesUrgency = !urgency || request.urgency === urgency;

    return (
      matchesSearch && matchesLocation && matchesCategory && matchesUrgency
    );
  });

  // Sort requests
  const sortedRequests = [...filteredRequests].sort((a, b) => {
    switch (sortBy) {
      case "budget_high":
        return (
          parseInt(b.budget.replace(/[^\d]/g, "")) -
          parseInt(a.budget.replace(/[^\d]/g, ""))
        );
      case "budget_low":
        return (
          parseInt(a.budget.replace(/[^\d]/g, "")) -
          parseInt(b.budget.replace(/[^\d]/g, ""))
        );
      case "bids":
        return b.bidsCount - a.bidsCount;
      case "oldest":
        return (
          new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime()
        );
      default: // newest
        return (
          new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
        );
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Header Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="mb-8">
            <span className="text-6xl">🔍</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {language === "ne"
              ? "सेवा अनुरोधहरू ���्राउज गर्नुहोस्"
              : "Browse Service Requests"}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
            {language === "ne"
              ? "ग्राहकहरूका अनुरोधहरू फेला पार्नुहोस् र आफ्ना सेवाहरूका लागि बिड दिनुहोस्"
              : "Find customer requests and bid for your services"}
          </p>
          <div className="flex justify-center space-x-8 text-lg">
            <div className="flex items-center">
              <TrendingUp className="h-6 w-6 mr-2 text-purple-300" />
              {language === "ne"
                ? `${requests.length}+ सक्रिय अनुरोधहरू`
                : `${requests.length}+ Active Requests`}
            </div>
            <div className="flex items-center">
              <DollarSign className="h-6 w-6 mr-2 text-purple-300" />
              {language === "ne" ? "उच्च भुक्तानी दरहरू" : "High Paying Rates"}
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={
                  language === "ne"
                    ? "अनुरोध खोज्नुहोस्..."
                    : "Search requests..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Location */}
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">
                  {language === "ne" ? "सबै स्थान" : "All Locations"}
                </option>
                {MAJOR_CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">
                {language === "ne" ? "सबै श्रेणी" : "All Categories"}
              </option>
              {SERVICE_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Urgency */}
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">
                {language === "ne" ? "सबै जरुरी स्तर" : "All Urgency"}
              </option>
              <option value="urgent">
                {language === "ne" ? "जरुरी" : "Urgent"}
              </option>
              <option value="within_week">
                {language === "ne" ? "यो हप्ता भित्र" : "This Week"}
              </option>
              <option value="flexible">
                {language === "ne" ? "लचिलो" : "Flexible"}
              </option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="newest">
                {language === "ne" ? "नयाँ पहिले" : "Newest First"}
              </option>
              <option value="oldest">
                {language === "ne" ? "पुरानो पहिले" : "Oldest First"}
              </option>
              <option value="budget_high">
                {language === "ne" ? "उच्च बजेट" : "High Budget"}
              </option>
              <option value="budget_low">
                {language === "ne" ? "कम बजेट" : "Low Budget"}
              </option>
              <option value="bids">
                {language === "ne" ? "धेरै बिड" : "Most Bids"}
              </option>
            </select>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {language === "ne" ? "उपलब्ध अनुरोधहरू" : "Available Requests"} (
              {sortedRequests.length})
            </h2>
          </div>

          {/* Requests Grid */}
          {sortedRequests.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sortedRequests.map((request) => (
                <Card
                  key={request.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {request.title}
                        </h3>
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(request.urgency)}`}
                        >
                          {getUrgencyLabel(request.urgency)}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {request.categoryName} • {request.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">
                        {request.budget}
                      </div>
                      <div className="text-sm text-gray-600">
                        {request.budgetType === "fixed"
                          ? language === "ne"
                            ? "निश्चित"
                            : "Fixed"
                          : request.budgetType === "hourly"
                            ? language === "ne"
                              ? "प्रति घण्टा"
                              : "Per Hour"
                            : language === "ne"
                              ? "प्रति सेसन"
                              : "Per Session"}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-2">
                    {request.description}
                  </p>

                  {/* Requirements */}
                  {request.requirements.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {request.requirements.slice(0, 2).map((req, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                          >
                            {req}
                          </span>
                        ))}
                        {request.requirements.length > 2 && (
                          <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                            +{request.requirements.length - 2}{" "}
                            {language === "ne" ? "थप" : "more"}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Posted By Info */}
                  <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm font-medium">
                        {request.postedBy.name}
                      </span>
                      {request.postedBy.verified && (
                        <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                          {language === "ne" ? "प्रमाणित" : "Verified"}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm">{request.postedBy.rating}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(request.postedDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {request.bidsCount} {language === "ne" ? "बिड" : "bids"}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Link href={`/request/${request.id}`}>
                        <Button variant="outline" size="sm">
                          {language === "ne"
                            ? "विवरण हेर्नुहोस्"
                            : "View Details"}
                        </Button>
                      </Link>
                      <Link href={`/request/${request.id}#bid`}>
                        <Button
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          {language === "ne" ? "बिड दिनुहोस्" : "Place Bid"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {language === "ne"
                  ? "कुनै अनुरोध फेला परेन"
                  : "No requests found"}
              </h3>
              <p className="text-gray-600 mb-6">
                {language === "ne"
                  ? "फरक फिल्टर प्रयोग गरेर खोजी गर्नुहोस्"
                  : "Try using different filters"}
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setLocation("");
                  setCategory("");
                  setUrgency("");
                }}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {language === "ne"
                  ? "सबै फिल्टर हटाउनुहोस्"
                  : "Clear All Filters"}
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
