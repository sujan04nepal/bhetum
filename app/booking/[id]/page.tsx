"use client";

import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  MessageCircle,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign,
  FileText,
  Camera,
  Download,
  Share2,
  Edit,
  Shield,
} from "lucide-react";

export default function BookingDetailPage() {
  const { t, language } = useLanguage();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const params = useParams();
  const searchParams = useSearchParams();
  const bookingId = params.id as string;
  const status = searchParams.get("status");

  // Mock data - in real app, this would come from API/database
  const booking = {
    id: bookingId,
    title: language === "ne" ? "घर सरसफाई सेवा" : "House Cleaning Service",
    status: status || "confirmed", // pending, confirmed, in_progress, completed, cancelled
    scheduledDate: "2024-02-15",
    scheduledTime: "14:00",
    duration: language === "ne" ? "३ घण्टा" : "3 hours",
    location: {
      province: language === "ne" ? "बागमती प्रदेश" : "Bagmati Province",
      district: language === "ne" ? "काठमाडौं" : "Kathmandu",
      municipality:
        language === "ne"
          ? "काठमाडौं महानगरपालिका"
          : "Kathmandu Metropolitan City",
      ward: 15,
      streetAddress:
        language === "ne" ? "दरबारमार्ग, नयाँ सडक" : "Durbar Marg, New Road",
    },
    service: {
      id: "service-1",
      title: language === "ne" ? "घर सरसफाई सेवा" : "House Cleaning Service",
      category: language === "ne" ? "सफाई सेवा" : "Cleaning Service",
      description:
        language === "ne"
          ? "सम्पूर्ण घरको गहिरो सफाई सेवा"
          : "Complete house deep cleaning service",
    },
    provider: {
      id: "provider-1",
      name: language === "ne" ? "राज गुरुंग" : "Raj Gurung",
      businessName:
        language === "ne" ? "राजको सफाई सेवा" : "Raj's Cleaning Service",
      avatar: "👨‍💼",
      phone: "+977-9841234567",
      email: "raj.gurung@email.com",
      rating: 4.8,
      isVerified: true,
    },
    customer: {
      id: "customer-1",
      name: language === "ne" ? "सरिता शर्मा" : "Sarita Sharma",
      phone: "+977-9876543210",
      email: "sarita.sharma@email.com",
    },
    pricing: {
      baseAmount: 2400,
      platformFee: 240,
      totalAmount: 2640,
      currency: "NPR",
    },
    paymentMethod: "esewa",
    paymentStatus: "completed",
    notes:
      language === "ne"
        ? "कृपया इको-फ्रेन्डली प्रोड���्ट प्रयोग गर्नुहोस्। घरमा कुकुर छ।"
        : "Please use eco-friendly products. There's a dog at home.",
    timeline: [
      {
        timestamp: "2024-02-10T10:30:00",
        event: language === "ne" ? "बुकिङ सिर्जना" : "Booking Created",
        description:
          language === "ne"
            ? "ग्राहकले बुकिङ अनुरोध गर्नुभयो"
            : "Customer made booking request",
      },
      {
        timestamp: "2024-02-10T10:35:00",
        event:
          language === "ne"
            ? "प्रदायकले स्वीकार गर्नुभयो"
            : "Provider Accepted",
        description:
          language === "ne"
            ? "सेवा प्रदायकले बुकिङ स्वीकार गर्नुभयो"
            : "Service provider accepted the booking",
      },
      {
        timestamp: "2024-02-10T10:40:00",
        event: language === "ne" ? "भुक्तानी सम्पन्न" : "Payment Completed",
        description:
          language === "ne"
            ? "eSewa मार्फत भुक्तानी सम्पन्न भयो"
            : "Payment completed via eSewa",
      },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "in_progress":
        return "bg-purple-100 text-purple-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "in_progress":
        return <Clock className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return language === "ne" ? "पेन्डिङ" : "Pending";
      case "confirmed":
        return language === "ne" ? "पुष्टि भएको" : "Confirmed";
      case "in_progress":
        return language === "ne" ? "प्रगतिमा" : "In Progress";
      case "completed":
        return language === "ne" ? "सम्पन्न" : "Completed";
      case "cancelled":
        return language === "ne" ? "रद्द" : "Cancelled";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Status Banner */}
      {status === "confirmed" && (
        <div className="bg-blue-600 text-white py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span className="font-medium">
              {language === "ne"
                ? "तपाईंको बुकिङ पुष्टि भयो! सेवा प्रदायक छिट्टै सम्पर्क गर्नेछ।"
                : "Your booking has been confirmed! The service provider will contact you soon."}
            </span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/dashboard/seeker/bookings"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === "ne"
                ? "बुकिङहरूमा फर्किनुहोस्"
                : "Back to Bookings"}
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              {language === "ne" ? "बुकिङ विवरण" : "Booking Details"}
            </h1>
            <p className="text-gray-600 mt-1">
              {language === "ne" ? "बुकिङ आईडी:" : "Booking ID:"} #{booking.id}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}
            >
              {getStatusIcon(booking.status)}
              <span className="ml-2">{getStatusLabel(booking.status)}</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Details */}
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {language === "ne" ? "सेवा विवरण" : "Service Details"}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {booking.service.title}
                  </h3>
                  <p className="text-gray-600">{booking.service.category}</p>
                  <p className="text-gray-700 mt-2">
                    {booking.service.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                    <div>
                      <div className="font-medium">
                        {new Date(booking.scheduledDate).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        {language === "ne" ? "मिति" : "Date"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-green-600 mr-3" />
                    <div>
                      <div className="font-medium">{booking.scheduledTime}</div>
                      <div className="text-sm text-gray-600">
                        {booking.duration}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-red-600 mr-3 mt-1" />
                  <div>
                    <div className="font-medium">
                      {booking.location.streetAddress}
                    </div>
                    <div className="text-sm text-gray-600">
                      {booking.location.municipality},{" "}
                      {booking.location.district}
                    </div>
                  </div>
                </div>

                {booking.notes && (
                  <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex">
                      <FileText className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800">
                          {language === "ne"
                            ? "विशेष निर्देशन"
                            : "Special Instructions"}
                        </h4>
                        <p className="text-yellow-700 mt-1">{booking.notes}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Provider Info */}
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {language === "ne" ? "सेवा प्रदायक" : "Service Provider"}
              </h2>
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{booking.provider.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {booking.provider.name}
                    </h3>
                    {booking.provider.isVerified && (
                      <Shield className="h-5 w-5 text-green-600 ml-2" />
                    )}
                  </div>
                  <p className="text-gray-600">
                    {booking.provider.businessName}
                  </p>
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">
                      {booking.provider.rating}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 mt-4">
                    <Button size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {language === "ne" ? "सन्देश" : "Message"}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      {language === "ne" ? "कल गर्नुहोस्" : "Call"}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Timeline */}
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {language === "ne" ? "बुकिङ इतिहास" : "Booking Timeline"}
              </h2>
              <div className="space-y-4">
                {booking.timeline.map((item, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {item.event}
                      </div>
                      <div className="text-sm text-gray-600">
                        {item.description}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(item.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing */}
            <Card>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {language === "ne" ? "मूल्य विवरण" : "Pricing Details"}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {language === "ne" ? "सेवा शुल्क:" : "Service Fee:"}
                  </span>
                  <span className="font-medium">
                    रू {booking.pricing.baseAmount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {language === "ne" ? "प्लेटफर्म शुल्क:" : "Platform Fee:"}
                  </span>
                  <span className="font-medium">
                    रू {booking.pricing.platformFee}
                  </span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>{language === "ne" ? "कुल:" : "Total:"}</span>
                  <span className="text-blue-600">
                    रू {booking.pricing.totalAmount}
                  </span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-green-800 font-medium">
                    {language === "ne"
                      ? "भुक्तानी सम्पन्न"
                      : "Payment Completed"}
                  </span>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <Card>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {language === "ne" ? "कार्यहरू" : "Actions"}
              </h3>
              <div className="space-y-3">
                {booking.status === "confirmed" && (
                  <Button variant="outline" className="w-full">
                    <Edit className="h-4 w-4 mr-2" />
                    {language === "ne"
                      ? "परिमार्जन गर्नुहोस्"
                      : "Modify Booking"}
                  </Button>
                )}

                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  {language === "ne" ? "रसिद डाउनलोड" : "Download Receipt"}
                </Button>

                <Button variant="outline" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  {language === "ne" ? "साझा गर्नुहोस्" : "Share Booking"}
                </Button>

                {(booking.status === "confirmed" ||
                  booking.status === "pending") && (
                  <Button
                    variant="outline"
                    className="w-full text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => setShowCancelModal(true)}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    {language === "ne" ? "रद्द गर्नुहोस्" : "Cancel Booking"}
                  </Button>
                )}
              </div>
            </Card>

            {/* Support */}
            <Card>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {language === "ne" ? "सहायता चाहिन्छ?" : "Need Help?"}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {language === "ne"
                  ? "यदि तपाईंलाई कुनै समस्या छ भने हामीलाई सम्पर्क गर्नुहोस्।"
                  : "Contact us if you have any issues with your booking."}
              </p>
              <Button variant="outline" className="w-full">
                <MessageCircle className="h-4 w-4 mr-2" />
                {language === "ne" ? "सहायता सम्पर्क" : "Contact Support"}
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {language === "ne"
                ? "बुकिङ रद्द गर्नुहु��्छ?"
                : "Cancel Booking?"}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === "ne"
                ? "के तपाईं यो बुकिङ रद्द गर्न निश्चित हुनुहुन्छ? यो कार्य फिर्ता गर्न सकिँदैन।"
                : "Are you sure you want to cancel this booking? This action cannot be undone."}
            </p>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowCancelModal(false)}
              >
                {language === "ne" ? "फिर्ता" : "Go Back"}
              </Button>
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700"
                onClick={() => {
                  // Handle cancellation logic here
                  setShowCancelModal(false);
                }}
              >
                {language === "ne" ? "रद्द गर्नुहोस्" : "Cancel Booking"}
              </Button>
            </div>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  );
}
