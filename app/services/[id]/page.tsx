"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Star,
  MapPin,
  Clock,
  Shield,
  CheckCircle,
  MessageCircle,
  Share2,
  Heart,
  Camera,
  Calendar,
  DollarSign,
  ArrowLeft,
  Phone,
  Mail,
  Award,
  TrendingUp,
  Users,
  Briefcase,
} from "lucide-react";

interface ServiceDetailPageProps {
  params: {
    id: string;
  };
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { t, language } = useLanguage();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Mock data - in real app, this would come from API/database
  const service = {
    id: params.id,
    title: "घर सरसफाई सेवा",
    titleEn: "Home Cleaning Service",
    description:
      "पेशेवर घर सफाई सेवा। सबै कोठा, भान्साघर, बाथरुम र झ्यालहरूको गहिरो सफाई। पर्यावरण मैत्री सफाई उत्पादनहरू प्रयोग गरिन्छ।",
    descriptionEn:
      "Professional home cleaning service. Deep cleaning of all rooms, kitchen, bathroom and windows. Eco-friendly cleaning products used.",
    category: "सफाई सेवा",
    categoryEn: "Cleaning Service",
    baseRate: 800,
    maxRate: 1200,
    unit: "घण्टा",
    unitEn: "hour",
    isNegotiable: true,
    duration: "2-4 घण्टा",
    provider: {
      id: "provider-1",
      name: "राज गुरुंग",
      businessName: "राजको सफाई सेवा",
      avatar: "/avatar-raj.jpg",
      rating: 4.8,
      reviewCount: 127,
      completedJobs: 243,
      responseTime: "< 1 घण्टा",
      isVerified: true,
      isOnline: true,
      location: {
        area: "बागबजार",
        district: "काठमाडौं",
      },
    },
    features: [
      "डीप क्लिनिङ",
      "डस्ट र कुना साफ गर्ने",
      "भान्साको ग्रीस सफाई",
      "बाथरुम डिसइन्फेक्सन",
      "झ्यालको सफाई",
      "फर्निचर पोलिसिङ",
    ],
    requirements: [
      "पानीको पहुँच चाहिन्छ",
      "बिजुली उपलब्ध हुनुपर्छ",
      "सफाई उपकरण प्रदान गरिन्छ",
      "घरमा कोही उपस्थित हुनुपर्छ",
    ],
    gallery: [
      "/service-gallery-1.jpg",
      "/service-gallery-2.jpg",
      "/service-gallery-3.jpg",
      "/service-gallery-4.jpg",
    ],
    availability: {
      monday: ["09:00", "10:00", "14:00", "15:00"],
      tuesday: ["09:00", "10:00", "14:00", "15:00"],
      wednesday: ["09:00", "10:00", "14:00", "15:00"],
      thursday: ["09:00", "10:00", "14:00", "15:00"],
      friday: ["09:00", "10:00", "14:00", "15:00"],
      saturday: ["10:00", "11:00", "15:00"],
      sunday: ["10:00", "11:00", "15:00"],
    },
    reviews: [
      {
        id: "1",
        reviewer: "सरिता शर्मा",
        rating: 5,
        comment:
          "राज जीको काम एकदम राम्रो छ। समयमा आएर राम्रोसँग सफाई गर्नुभयो। घर एकदम चम्किलो भयो।",
        date: "2024-01-20",
        verified: true,
      },
      {
        id: "2",
        reviewer: "अमित तामाङ",
        rating: 5,
        comment:
          "व्यावसायिक र भरपर्दो सेवा। सिफारिस गर्छु। आफ्ना सफाई उपकरण ल्याउनुभयो।",
        date: "2024-01-18",
        verified: true,
      },
      {
        id: "3",
        reviewer: "मीरा गुरुंग",
        rating: 4,
        comment:
          "राम्रो काम गर्नुहुन्छ तर अलि ढिलो आउनुभयो। तर काम भने राम्रो गर्नुभयो।",
        date: "2024-01-15",
        verified: false,
      },
    ],
    faqs: [
      {
        question: "सफाई उपकरण कसले ल्याउने?",
        answer:
          "हामी आफ्नै सफाई उपकरण र उत्पादनहरू ल्याउँछौं। तपाईंले केही प्रदान गर्नु पर्दैन।",
      },
      {
        question: "कति समय लाग्छ?",
        answer:
          "घरको साइज अनुसार 2-4 घण्टा लाग्छ। सामान्यतया 3 कोठाको घरमा 3 घण्टा लाग्छ।",
      },
      {
        question: "रद्द गर्न सकिन्छ?",
        answer: "हो, तोकिएको समयभन्दा 2 घण्टा अगाडि रद्द गर्न सकिन्छ।",
      },
    ],
  };

  const content = {
    ne: {
      backToServices: "सेवाहरूमा फर्किनुहोस्",
      bookNow: "अहिले बुक गर्नुहोस्",
      sendMessage: "सन्देश पठाउनुहोस्",
      share: "साझा गर्नुहोस्",
      bookmark: "बुकमार्क",
      aboutService: "सेवाको बारेमा",
      features: "विशेषताहरू",
      requirements: "आवश्यकताहरू",
      aboutProvider: "सेवा प्रदायकको बारेमा",
      viewProfile: "प्रोफाइल हेर्नुहोस्",
      gallery: "ग्यालेरी",
      availability: "उपलब्धता",
      selectDateTime: "मिति र समय चयन गर्नुहोस्",
      customerReviews: "ग्राहक समीक्षाहरू",
      viewAllReviews: "सबै समीक्षाहरू हेर्नुहोस्",
      faq: "बारम्बार सोधिने प्रश्नहरू",
      verified: "प्रमाणित",
      online: "अनलाइन",
      responseTime: "प्रतिक्रिया समय",
      completedJobs: "सम्पन्न कामहरू",
      startingFrom: "सुरुवात",
      negotiable: "मोलमोलाई योग्य",
      duration: "अवधि",
      rating: "रेटिङ",
      reviews: "समीक्षाहरू",
    },
    en: {
      backToServices: "Back to Services",
      bookNow: "Book Now",
      sendMessage: "Send Message",
      share: "Share",
      bookmark: "Bookmark",
      aboutService: "About Service",
      features: "Features",
      requirements: "Requirements",
      aboutProvider: "About Provider",
      viewProfile: "View Profile",
      gallery: "Gallery",
      availability: "Availability",
      selectDateTime: "Select Date & Time",
      customerReviews: "Customer Reviews",
      viewAllReviews: "View All Reviews",
      faq: "Frequently Asked Questions",
      verified: "Verified",
      online: "Online",
      responseTime: "Response Time",
      completedJobs: "Completed Jobs",
      startingFrom: "Starting from",
      negotiable: "Negotiable",
      duration: "Duration",
      rating: "Rating",
      reviews: "Reviews",
    },
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/services"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {currentContent.backToServices}
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Service Header */}
            <Card>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {service.category}
                      </span>
                      {service.isNegotiable && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          {currentContent.negotiable}
                        </span>
                      )}
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {service.title}
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={
                        isBookmarked ? "text-red-600 border-red-600" : ""
                      }
                    >
                      <Heart
                        className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
                      />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between py-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        रू {service.baseRate}
                        {service.maxRate &&
                          service.maxRate > service.baseRate && (
                            <span className="text-lg text-gray-500">
                              {" "}
                              - रू {service.maxRate}
                            </span>
                          )}
                      </div>
                      <div className="text-sm text-gray-500">
                        प्रति {service.unit}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      <div>
                        {currentContent.duration}: {service.duration}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
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
            </Card>

            {/* Features & Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    {currentContent.features}
                  </h2>
                  <div className="space-y-3">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    {currentContent.requirements}
                  </h2>
                  <div className="space-y-3">
                    {service.requirements.map((requirement, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                        <span className="text-gray-700">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Gallery */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {currentContent.gallery}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {service.gallery.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center"
                    >
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Customer Reviews */}
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {currentContent.customerReviews}
                  </h2>
                  <Button variant="outline" size="sm">
                    {currentContent.viewAllReviews}
                  </Button>
                </div>

                <div className="space-y-6">
                  {service.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-200 pb-6 last:border-b-0"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                            {review.reviewer.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <div className="flex items-center">
                              <span className="font-medium text-gray-900">
                                {review.reviewer}
                              </span>
                              {review.verified && (
                                <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
                              )}
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
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
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* FAQ */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  {currentContent.faq}
                </h2>
                <div className="space-y-4">
                  {service.faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <h3 className="font-medium text-gray-900 mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Provider Card */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {currentContent.aboutProvider}
                </h3>

                <div className="flex items-center space-x-3 mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {service.provider.name.charAt(0)}
                    </div>
                    {service.provider.isVerified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                    {service.provider.isOnline && (
                      <div className="absolute top-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900">
                        {service.provider.name}
                      </h4>
                      {service.provider.isVerified && (
                        <Shield className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {service.provider.businessName}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${service.provider.isOnline ? "bg-green-400" : "bg-gray-400"}`}
                      ></div>
                      <span>
                        {service.provider.isOnline
                          ? currentContent.online
                          : "Offline"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      {currentContent.rating}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="font-medium">
                        {service.provider.rating}
                      </span>
                      <span className="text-gray-500 ml-1">
                        ({service.provider.reviewCount})
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      {currentContent.completedJobs}
                    </span>
                    <span className="font-medium">
                      {service.provider.completedJobs}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      {currentContent.responseTime}
                    </span>
                    <span className="font-medium">
                      {service.provider.responseTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Location</span>
                    <span className="font-medium">
                      {service.provider.location.area}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {currentContent.sendMessage}
                  </Button>
                  <Link href={`/provider/${service.provider.id}`}>
                    <Button variant="outline" className="w-full">
                      {currentContent.viewProfile}
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>

            {/* Booking Card */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {currentContent.selectDateTime}
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  {selectedDate && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Available Times
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {["09:00", "10:00", "14:00", "15:00"].map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`p-2 text-sm border rounded-lg transition-colors ${
                              selectedTime === time
                                ? "bg-blue-500 text-white border-blue-500"
                                : "border-gray-300 hover:border-blue-500"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    className="w-full"
                    disabled={!selectedDate || !selectedTime}
                  >
                    {currentContent.bookNow}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Info
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-600">
                      Response within 1 hour
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-600">
                      Verified provider
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-600">
                      Top rated in category
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
