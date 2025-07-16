"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  CheckCircle,
  MessageCircle,
  Share2,
  Heart,
  Award,
  Briefcase,
  DollarSign,
  ChevronRight,
  Grid,
  List,
  Camera,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";

interface ProviderProfilePageProps {
  params: {
    id: string;
  };
}

// Generate static paths for sample provider IDs
export function generateStaticParams() {
  // Generate sample provider IDs for static generation
  const sampleProviderIds = Array.from({ length: 100 }, (_, i) =>
    (i + 1).toString(),
  );

  return sampleProviderIds.map((id) => ({
    id,
  }));
}

export default function ProviderProfilePage({
  params,
}: ProviderProfilePageProps) {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Mock data - in real app, this would come from API/database
  const provider = {
    id: params.id,
    name: "राज गुरुंग",
    businessName: "राजको सफाई सेवा",
    avatar: "/avatar-raj.jpg",
    rating: 4.8,
    reviewCount: 127,
    completedJobs: 243,
    responseRate: 98,
    joinedDate: "2023-03-15",
    isVerified: true,
    isOnline: true,
    lastSeen: "5 मिनेट अगाडि",
    location: {
      province: "बागमती प्रदेश",
      district: "काठमाडौं",
      municipality: "��ाठमाडौं महानगरपालिका",
      ward: 29,
      area: "बागबजार",
    },
    contact: {
      phone: "+977-9841234567",
      email: "raj.gurung@email.com",
    },
    bio: "५ वर्षको अनुभव भएको घर सफाई विशेषज्ञ। गुणस्तरीय र भरपर्दो सेवा प्रदान गर्छु। ग्राहकको सन्तुष्टि नै हाम्रो मुख्य लक्ष्य हो।",
    services: [
      {
        id: "1",
        title: "घर सरसफाई",
        titleEn: "House Cleaning",
        description: "सम्पूर्ण घरको गहिरो सफाई",
        rate: 800,
        unit: "घण्टा",
        category: "सफाई सेवा",
      },
      {
        id: "2",
        title: "कार्यालय सफाई",
        titleEn: "Office Cleaning",
        description: "कार्यालयको दैनिक सफाई",
        rate: 1200,
        unit: "दिन",
        category: "सफाई सेवा",
      },
      {
        id: "3",
        title: "कार्पेट सफाई",
        titleEn: "Carpet Cleaning",
        description: "कार्पेटको विशेष सफाई",
        rate: 500,
        unit: "वर्ग फुट",
        category: "विशेष सफाई",
      },
    ],
    skills: [
      "डीप क्लिनिङ",
      "कार्पेट सफाई",
      "झ्यालको सफाई",
      "बाथरुम सफाई",
      "भान्साको सफाई",
    ],
    portfolio: [
      {
        id: "1",
        title: "अफिस सफाई परियोजना",
        description: "बागबजारको एक ठूलो अफिसको ��म्पूर्ण सफाई काम।",
        images: ["/portfolio1.jpg", "/portfolio2.jpg", "/portfolio3.jpg"],
        date: "2024-01-15",
        category: "कार्यालय सफाई",
      },
      {
        id: "2",
        title: "घर सफाई",
        description: "नयाँ घरको पहिलो पटक गहिरो सफाई।",
        images: ["/portfolio4.jpg", "/portfolio5.jpg"],
        date: "2024-01-10",
        category: "घर सफाई",
      },
    ],
    availability: {
      sunday: { available: true, start: "08:00", end: "18:00" },
      monday: { available: true, start: "08:00", end: "18:00" },
      tuesday: { available: true, start: "08:00", end: "18:00" },
      wednesday: { available: true, start: "08:00", end: "18:00" },
      thursday: { available: true, start: "08:00", end: "18:00" },
      friday: { available: true, start: "08:00", end: "18:00" },
      saturday: { available: true, start: "09:00", end: "15:00" },
    },
    recentReviews: [
      {
        id: "1",
        reviewer: "सरिता शर्मा",
        rating: 5,
        comment:
          "राज जीको काम एकदम राम्रो छ। समयमा ���एर राम्रोसँग सफाई गर्नुभयो।",
        date: "2024-01-20",
        service: "घर सरसफाई",
      },
      {
        id: "2",
        reviewer: "अमित तामाङ",
        rating: 5,
        comment: "व्यावसायिक र भरपर्दो सेवा। सिफारिस गर्छु।",
        date: "2024-01-18",
        service: "कार्यालय सफाई",
      },
      {
        id: "3",
        reviewer: "मीरा गुरुंग",
        rating: 4,
        comment: "राम्रो काम गर्नुहुन्छ तर अलि ढिलो आउनुभयो।",
        date: "2024-01-15",
        service: "कार्पेट सफाई",
      },
    ],
  };

  const content = {
    ne: {
      overview: "सिंहावलोकन",
      services: "सेवाहरू",
      portfolio: "पोर्टफोलियो",
      reviews: "समीक्षाहरू",
      availability: "उपलब्धता",
      contact: "सम्पर्क",
      bookNow: "अहिले बुक गर्नुहोस्",
      sendMessage: "सन्देश पठाउनुहोस���",
      share: "साझा गर्नुहोस्",
      bookmark: "बुकमार्क",
      verified: "प्रमाणित",
      online: "अनलाइन",
      offline: "अफलाइन",
      lastSeen: "अन्तिम पटक देखियो",
      joinedOn: "सामेल भएको मिति",
      completedJobs: "सम्पन्न कामहरू",
      responseRate: "प्रतिक्रिया दर",
      aboutProvider: "सेवा प्रदायकको बारेमा",
      skills: "सीपहरू",
      location: "स्थान",
      contactInfo: "सम्पर्क जानकारी",
      workingHours: "काम गर्ने समय",
      recentWork: "हालका कामहरू",
      clientReviews: "ग्राहक समीक्षाहरू",
      viewAll: "सबै हेर्नुहोस्",
      startingFrom: "सुरुवात",
      perHour: "प्रति घण्टा",
      perDay: "प्रति दिन",
      perSqFt: "प्रति वर्ग फुट",
      days: {
        sunday: "आइतबार",
        monday: "सोमबार",
        tuesday: "मंगलबार",
        wednesday: "बुधबार",
        thursday: "बिहिबार",
        friday: "शुक्रबार",
        saturday: "शनिबार",
      },
    },
    en: {
      overview: "Overview",
      services: "Services",
      portfolio: "Portfolio",
      reviews: "Reviews",
      availability: "Availability",
      contact: "Contact",
      bookNow: "Book Now",
      sendMessage: "Send Message",
      share: "Share",
      bookmark: "Bookmark",
      verified: "Verified",
      online: "Online",
      offline: "Offline",
      lastSeen: "Last seen",
      joinedOn: "Joined on",
      completedJobs: "Completed Jobs",
      responseRate: "Response Rate",
      aboutProvider: "About Provider",
      skills: "Skills",
      location: "Location",
      contactInfo: "Contact Information",
      workingHours: "Working Hours",
      recentWork: "Recent Work",
      clientReviews: "Client Reviews",
      viewAll: "View All",
      startingFrom: "Starting from",
      perHour: "per hour",
      perDay: "per day",
      perSqFt: "per sq ft",
      days: {
        sunday: "Sunday",
        monday: "Monday",
        tuesday: "Tuesday",
        wednesday: "Wednesday",
        thursday: "Thursday",
        friday: "Friday",
        saturday: "Saturday",
      },
    },
  };

  const currentContent = content[language];
  const dayKeys = Object.keys(provider.availability) as Array<
    keyof typeof provider.availability
  >;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start space-x-4">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {provider.name.charAt(0)}
                </div>
                {provider.isVerified && (
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                )}
                {provider.isOnline && (
                  <div className="absolute top-0 right-0 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
                )}
              </div>

              {/* Provider Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {provider.name}
                  </h1>
                  {provider.isVerified && (
                    <div className="flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      <Shield className="w-3 h-3 mr-1" />
                      {currentContent.verified}
                    </div>
                  )}
                </div>

                <p className="text-lg text-gray-600 mb-2">
                  {provider.businessName}
                </p>

                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="font-medium text-gray-900">
                      {provider.rating}
                    </span>
                    <span className="ml-1">
                      ({provider.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>
                      {provider.location.area}, {provider.location.district}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`w-2 h-2 rounded-full mr-2 ${provider.isOnline ? "bg-green-400" : "bg-gray-400"}`}
                    ></div>
                    <span>
                      {provider.isOnline
                        ? currentContent.online
                        : currentContent.offline}
                    </span>
                    {!provider.isOnline && (
                      <span className="ml-1">
                        • {currentContent.lastSeen} {provider.lastSeen}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="font-medium">
                      {provider.completedJobs}
                    </span>
                    <span className="ml-1 text-gray-500">
                      {currentContent.completedJobs}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="font-medium">
                      {provider.responseRate}%
                    </span>
                    <span className="ml-1 text-gray-500">
                      {currentContent.responseRate}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-gray-500">
                      {currentContent.joinedOn}{" "}
                      {new Date(provider.joinedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button
                variant="outline"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={isBookmarked ? "text-red-600 border-red-600" : ""}
              >
                <Heart
                  className={`w-4 h-4 mr-2 ${isBookmarked ? "fill-current" : ""}`}
                />
                {currentContent.bookmark}
              </Button>
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                {currentContent.share}
              </Button>
              <Button variant="outline">
                <MessageCircle className="w-4 h-4 mr-2" />
                {currentContent.sendMessage}
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                {currentContent.bookNow}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: "overview", label: currentContent.overview },
              { id: "services", label: currentContent.services },
              { id: "portfolio", label: currentContent.portfolio },
              { id: "reviews", label: currentContent.reviews },
              { id: "availability", label: currentContent.availability },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* About */}
                <Card>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      {currentContent.aboutProvider}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {provider.bio}
                    </p>
                  </div>
                </Card>

                {/* Skills */}
                <Card>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      {currentContent.skills}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {provider.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Recent Work */}
                <Card>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {currentContent.recentWork}
                      </h2>
                      <Button variant="outline" size="sm">
                        {currentContent.viewAll}
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {provider.portfolio.slice(0, 2).map((work) => (
                        <div
                          key={work.id}
                          className="border rounded-lg overflow-hidden"
                        >
                          <div className="aspect-video bg-gray-200 flex items-center justify-center">
                            <Camera className="w-8 h-8 text-gray-400" />
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium text-gray-900 mb-1">
                              {work.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {work.description}
                            </p>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-blue-600">
                                {work.category}
                              </span>
                              <span className="text-gray-500">
                                {new Date(work.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Services Tab */}
            {activeTab === "services" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {currentContent.services}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={viewMode === "grid" ? "primary" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "primary" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                      : "space-y-4"
                  }
                >
                  {provider.services.map((service) => (
                    <Card key={service.id}>
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {service.title}
                            </h3>
                            <p className="text-sm text-blue-600">
                              {service.category}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">
                              रू {service.rate}
                            </div>
                            <div className="text-sm text-gray-500">
                              प्रति {service.unit}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-4">
                          {service.description}
                        </p>
                        <Button className="w-full">
                          {currentContent.bookNow}
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {currentContent.clientReviews}
                  </h2>
                  <div className="text-right">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 mr-1" />
                      <span className="text-xl font-bold">
                        {provider.rating}
                      </span>
                      <span className="text-gray-500 ml-1">
                        ({provider.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {provider.recentReviews.map((review) => (
                    <Card key={review.id}>
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                              {review.reviewer.charAt(0)}
                            </div>
                            <div className="ml-3">
                              <div className="font-medium text-gray-900">
                                {review.reviewer}
                              </div>
                              <div className="text-sm text-gray-500">
                                {review.service}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              {new Date(review.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Availability Tab */}
            {activeTab === "availability" && (
              <Card>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    {currentContent.workingHours}
                  </h2>
                  <div className="space-y-3">
                    {dayKeys.map((day) => (
                      <div
                        key={day}
                        className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                      >
                        <span className="font-medium text-gray-900">
                          {currentContent.days[day]}
                        </span>
                        {provider.availability[day].available ? (
                          <div className="flex items-center text-green-600">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>
                              {provider.availability[day].start} -{" "}
                              {provider.availability[day].end}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400">बन्द</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {currentContent.contactInfo}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="text-gray-600">
                      {provider.contact.phone}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="text-gray-600">
                      {provider.contact.email}
                    </span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 text-gray-400 mr-3 mt-1" />
                    <div className="text-gray-600">
                      <div>{provider.location.area}</div>
                      <div>
                        {provider.location.municipality}-
                        {provider.location.ward}
                      </div>
                      <div>
                        {provider.location.district},{" "}
                        {provider.location.province}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Response Time</span>
                    <span className="font-medium">&lt; 1 hour</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Languages</span>
                    <span className="font-medium">नेपाली, English</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-medium">5+ years</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Starting Rates */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {currentContent.startingFrom}
                </h3>
                <div className="space-y-3">
                  {provider.services.slice(0, 3).map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-600 text-sm">
                        {service.title}
                      </span>
                      <span className="font-medium">
                        रू {service.rate}/{service.unit}
                      </span>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4">
                  {currentContent.bookNow}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
