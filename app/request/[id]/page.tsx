"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  MapPin,
  Clock,
  DollarSign,
  User,
  Star,
  MessageCircle,
  Phone,
  Award,
  CheckCircle,
  AlertCircle,
  Calendar,
  FileText,
  TrendingUp,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

// Generate static paths for sample request IDs
export function generateStaticParams() {
  // Generate sample request IDs for static generation
  const sampleRequestIds = Array.from({ length: 50 }, (_, i) =>
    (i + 1).toString(),
  );

  return sampleRequestIds.map((id) => ({
    id,
  }));
}

export default function RequestDetailPage() {
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [bidMessage, setBidMessage] = useState("");
  const [selectedBid, setSelectedBid] = useState<string | null>(null);

  const { t, language } = useLanguage();
  const params = useParams();
  const searchParams = useSearchParams();
  const requestId = params.id as string;
  const status = searchParams.get("status");

  // Mock request data
  const request = {
    id: requestId,
    title:
      language === "ne"
        ? "घर सरसफाइ सेवा चाहिन्छ"
        : "Need house cleaning service",
    description:
      language === "ne"
        ? "मलाई मेरो घरको लागि सफाइ सेवा चाहिएको छ। ३ बेडरूम, २ बाथरूम र बैठक कोठा। गहिरो सफाइ गर्नुपर्छ।"
        : "I need cleaning service for my house. 3 bedrooms, 2 bathrooms, and living room. Deep cleaning required.",
    category: language === "ne" ? "व्यापारिक र सीपयुक्त" : "Trade & Skilled",
    subcategory: language === "ne" ? "सफाइ सेवा" : "Cleaning Services",
    location: language === "ne" ? "काठमाडौं" : "Kathmandu",
    detailedAddress:
      language === "ne" ? "वडा नम्बर ५, बानेश्वर" : "Ward No. 5, Baneshwor",
    budget: "रू 2,500",
    budgetType: "fixed",
    urgency: "within_week",
    preferredDate: "2024-12-25",
    preferredTime: "10:00",
    requirements: [
      language === "ne"
        ? "पर्यावरण मैत्री सफाइ उत्पादन प्रयोग"
        : "Use eco-friendly cleaning products",
      language === "ne" ? "कम्तिमा २ जनाको टिम" : "Team of at least 2 people",
      language === "ne"
        ? "सफाइका उपकरणहरू आफैं ल्याउनुपर्छ"
        : "Must bring own cleaning equipment",
    ],
    postedDate: "2024-12-20",
    status: status || "active",
    postedBy: {
      name: language === "ne" ? "रीता श्रेष्ठ" : "Rita Shrestha",
      rating: 4.8,
      reviewsCount: 45,
      memberSince: "2023",
      verified: true,
    },
  };

  // Mock bids data
  const bids = [
    {
      id: "1",
      provider: {
        name: language === "ne" ? "सरिता शर्मा" : "Sarita Sharma",
        rating: 4.9,
        reviews: 127,
        completedJobs: 245,
        image: "👩‍💼",
        verified: true,
        responseTime: language === "ne" ? "२ मिनेट" : "2 minutes",
        location: language === "ne" ? "काठमाडौं" : "Kathmandu",
      },
      amount: "रू 2,200",
      message:
        language === "ne"
          ? "नमस्कार! मसँग ५ वर्षको घर सफाइको अनुभव छ। मैले पर्यावरण मैत्री उत्पादनहरू प्रयोग गर्छु र पूर्ण गुणस्तरको ग्यारेन्टी दिन्छु।"
          : "Hello! I have 5 years of house cleaning experience. I use eco-friendly products and guarantee quality work.",
      timeline: language === "ne" ? "२ दिन भित्र" : "Within 2 days",
      bidDate: "2024-12-21",
      status: "pending",
    },
    {
      id: "2",
      provider: {
        name: language === "ne" ? "माया तामाङ" : "Maya Tamang",
        rating: 4.7,
        reviews: 89,
        completedJobs: 156,
        image: "👩‍🎨",
        verified: true,
        responseTime: language === "ne" ? "५ मिनेट" : "5 minutes",
        location: language === "ne" ? "ललितपुर" : "Lalitpur",
      },
      amount: "रू 2,400",
      message:
        language === "ne"
          ? "मेरो टिमसँग आधुनिक सफाइ उपकरणहरू छन्। हामी १०० प्रतिशत ग्राहक सन्तुष्टिको ग्यारेन्टी दिन्छौं।"
          : "My team has modern cleaning equipment. We guarantee 100% customer satisfaction.",
      timeline: language === "ne" ? "१ दिन भित्र" : "Within 1 day",
      bidDate: "2024-12-21",
      status: "pending",
    },
    {
      id: "3",
      provider: {
        name: language === "ne" ? "राम गुरुंग" : "Ram Gurung",
        rating: 4.6,
        reviews: 67,
        completedJobs: 123,
        image: "👨‍💼",
        verified: false,
        responseTime: language === "ne" ? "१० मिनेट" : "10 minutes",
        location: language === "ne" ? "भक्तपुर" : "Bhaktapur",
      },
      amount: "रू 1,800",
      message:
        language === "ne"
          ? "सस्तो दरमा राम्रो काम। ३ वर्षको अनुभव।"
          : "Good work at affordable rates. 3 years experience.",
      timeline: language === "ne" ? "३ दिन भित्र" : "Within 3 days",
      bidDate: "2024-12-21",
      status: "pending",
    },
  ];

  const handleSubmitBid = () => {
    // Handle bid submission
    setShowBidForm(false);
    setBidAmount("");
    setBidMessage("");
  };

  const handleAcceptBid = (bidId: string) => {
    setSelectedBid(bidId);
  };

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
        return language === "ne" ? "यो हप्ता भित्र" : "Within this week";
      default:
        return language === "ne" ? "लचिलो समय" : "Flexible";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Status Banner */}
      {status === "posted" && (
        <div className="bg-green-600 text-white py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span className="font-medium">
              {language === "ne"
                ? "आपका अनुरोध सफलतापूर्वक पोस्ट भयो! सेवा प्रदायकहरूबाट बिडहरू आउने छन्।"
                : "Your request has been posted successfully! You'll receive bids from service providers."}
            </span>
          </div>
        </div>
      )}

      {/* Request Details */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Request Info */}
              <Card>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      {request.title}
                    </h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>
                        {request.category} → {request.subcategory}
                      </span>
                      <span>•</span>
                      <span>
                        {language === "ne" ? "पोस्ट गरिएको:" : "Posted:"}{" "}
                        {request.postedDate}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getUrgencyColor(request.urgency)}`}
                  >
                    {getUrgencyLabel(request.urgency)}
                  </div>
                </div>

                <p className="text-gray-700 mb-6">{request.description}</p>

                {/* Requirements */}
                {request.requirements.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-bold text-gray-900 mb-3">
                      {language === "ne"
                        ? "विशेष आवश्यकताहरू:"
                        : "Special Requirements:"}
                    </h3>
                    <ul className="space-y-2">
                      {request.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Key Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                    <div>
                      <div className="font-medium text-gray-900">
                        {request.budget}
                      </div>
                      <div className="text-sm text-gray-600">
                        {request.budgetType === "fixed"
                          ? language === "ne"
                            ? "निश्चित मूल्य"
                            : "Fixed Price"
                          : language === "ne"
                            ? "घण्टाको दर"
                            : "Hourly Rate"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                    <div>
                      <div className="font-medium text-gray-900">
                        {new Date(request.preferredDate).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        {request.preferredTime} {language === "ne" ? "बजे" : ""}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-purple-600 mr-2" />
                    <div>
                      <div className="font-medium text-gray-900">
                        {request.location}
                      </div>
                      <div className="text-sm text-gray-600">
                        {request.detailedAddress}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Bids Section */}
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {language === "ne" ? "प्राप्त बिडहरू" : "Received Bids"} (
                    {bids.length})
                  </h2>
                  <Button
                    onClick={() => setShowBidForm(true)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {language === "ne" ? "बिड दिनुहोस्" : "Place Bid"}
                  </Button>
                </div>

                {/* Bid Form Modal */}
                {showBidForm && (
                  <div className="mb-6 p-6 border-2 border-green-200 rounded-lg bg-green-50">
                    <h3 className="font-bold text-lg mb-4">
                      {language === "ne"
                        ? "आफ्नो बिड दिनुहोस्"
                        : "Place Your Bid"}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === "ne" ? "बिड रकम" : "Bid Amount"}
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-gray-500">
                            रू
                          </span>
                          <Input
                            type="number"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                            className="pl-8"
                            placeholder="2,000"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === "ne" ? "सन्देश" : "Message"}
                        </label>
                        <textarea
                          value={bidMessage}
                          onChange={(e) => setBidMessage(e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder={
                            language === "ne"
                              ? "आफ्नो अनुभव र सेवाको बारेमा बताउनुहोस्..."
                              : "Tell about your experience and services..."
                          }
                        />
                      </div>
                      <div className="flex space-x-3">
                        <Button
                          onClick={handleSubmitBid}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {language === "ne"
                            ? "बिड पेश गर्नुहोस्"
                            : "Submit Bid"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setShowBidForm(false)}
                        >
                          {language === "ne" ? "रद्द गर्नुहोस्" : "Cancel"}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bids List */}
                <div className="space-y-4">
                  {bids.map((bid) => (
                    <div
                      key={bid.id}
                      className={`border rounded-lg p-6 ${
                        selectedBid === bid.id
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start">
                          <div className="text-4xl mr-4">
                            {bid.provider.image}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-gray-900 flex items-center">
                              {bid.provider.name}
                              {bid.provider.verified && (
                                <CheckCircle className="h-5 w-5 text-green-600 ml-2" />
                              )}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                                {bid.provider.rating} ({bid.provider.reviews}{" "}
                                {language === "ne" ? "समीक्षा" : "reviews"})
                              </div>
                              <div className="flex items-center">
                                <Award className="h-4 w-4 text-purple-600 mr-1" />
                                {bid.provider.completedJobs}{" "}
                                {language === "ne"
                                  ? "काम सम्पन्न"
                                  : "jobs completed"}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 text-blue-600 mr-1" />
                                {bid.provider.responseTime}{" "}
                                {language === "ne" ? "जवाफ समय" : "response"}
                              </div>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="h-4 w-4 mr-1" />
                              {bid.provider.location}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600 mb-1">
                            {bid.amount}
                          </div>
                          <div className="text-sm text-gray-600">
                            {bid.timeline}
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{bid.message}</p>

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          {language === "ne" ? "बिड दिएको:" : "Bid placed:"}{" "}
                          {bid.bidDate}
                        </div>
                        <div className="flex space-x-3">
                          <Link href={`/provider/${bid.id}`}>
                            <Button variant="outline" size="sm">
                              {language === "ne"
                                ? "प्रोफाइल हेर्नुहोस्"
                                : "View Profile"}
                            </Button>
                          </Link>
                          <Button size="sm">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {language === "ne" ? "सन्देश" : "Message"}
                          </Button>
                          {selectedBid !== bid.id && (
                            <Button
                              onClick={() => handleAcceptBid(bid.id)}
                              className="bg-green-600 hover:bg-green-700"
                              size="sm"
                            >
                              {language === "ne"
                                ? "स्वीकार गर्नुहोस्"
                                : "Accept Bid"}
                            </Button>
                          )}
                          {selectedBid === bid.id && (
                            <span className="px-3 py-1 bg-green-600 text-white rounded text-sm font-medium">
                              {language === "ne"
                                ? "स्वीकार गरिएको"
                                : "Accepted"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {bids.length === 0 && (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {language === "ne"
                        ? "अहिलेसम्म कुनै बिड आएको छैन"
                        : "No bids received yet"}
                    </h3>
                    <p className="text-gray-600">
                      {language === "ne"
                        ? "सेवा प्रदायकहरूबाट बिडहरू आउन केही समय लाग्न सक्छ।"
                        : "Bids from service providers may take some time to arrive."}
                    </p>
                  </div>
                )}
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Posted By */}
              <Card>
                <h3 className="font-bold text-lg mb-4">
                  {language === "ne" ? "पोस्ट गर्नेको विवरण" : "Posted By"}
                </h3>
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-3">👤</div>
                  <div>
                    <h4 className="font-bold text-gray-900 flex items-center">
                      {request.postedBy.name}
                      {request.postedBy.verified && (
                        <CheckCircle className="h-4 w-4 text-green-600 ml-2" />
                      )}
                    </h4>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      {request.postedBy.rating} ({request.postedBy.reviewsCount}{" "}
                      {language === "ne" ? "समीक्षा" : "reviews"})
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === "ne" ? "सदस्य:" : "Member since"}{" "}
                      {request.postedBy.memberSince}
                    </div>
                  </div>
                </div>
                <Button className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {language === "ne" ? "सन्देश पठाउनुहोस्" : "Send Message"}
                </Button>
              </Card>

              {/* Quick Stats */}
              <Card>
                <h3 className="font-bold text-lg mb-4">
                  {language === "ne" ? "द्रुत तथ्याङ्क" : "Quick Stats"}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">
                      {language === "ne" ? "कुल बिडहरू:" : "Total Bids:"}
                    </span>
                    <span className="font-bold">{bids.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">
                      {language === "ne" ? "औसत बिड:" : "Average Bid:"}
                    </span>
                    <span className="font-bold">रू 2,133</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">
                      {language === "ne" ? "न्यूनतम बिड:" : "Lowest Bid:"}
                    </span>
                    <span className="font-bold text-green-600">रू 1,800</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">
                      {language === "ne" ? "अधिकतम बिड:" : "Highest Bid:"}
                    </span>
                    <span className="font-bold">रू 2,400</span>
                  </div>
                </div>
              </Card>

              {/* Tips */}
              <Card>
                <h3 className="font-bold text-lg mb-4">
                  {language === "ne" ? "सुझावहरू" : "Tips"}
                </h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    {language === "ne"
                      ? "प्रदायकको रेटिङ र समीक्षाहरू जाँच गर्नुहोस्"
                      : "Check provider's rating and reviews"}
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    {language === "ne"
                      ? "बिड स्वीकार गर्नु अघि सन्देश गरेर छलफल गर्नुहोस्"
                      : "Message providers before accepting bids"}
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    {language === "ne"
                      ? "काम सम्पन्न भएपछि मात्र भुक्तानी गर्नुहोस्"
                      : "Make payment only after work completion"}
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
