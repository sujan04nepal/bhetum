"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
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
  Shield
} from "lucide-react";

interface BookingDetailPageProps {
  params: {
    id: string;
  };
}

export default function BookingDetailPage({ params }: BookingDetailPageProps) {
  const { t, language } = useLanguage();
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Mock data - in real app, this would come from API/database
  const booking = {
    id: params.id,
    title: "घर सरसफाई सेवा",
    status: "confirmed", // pending, confirmed, in_progress, completed, cancelled
    scheduledDate: "2024-02-15",
    scheduledTime: "14:00",
    duration: "3 घण्टा",
    location: {
      province: "बागमती प्रदेश",
      district: "काठमाडौं",
      municipality: "काठमाडौं महानगरपालिका",
      ward: 15,
      streetAddress: "दरबारमार्ग, ���याँ सडक"
    },
    service: {
      id: "service-1",
      title: "घर सरसफाई सेवा",
      category: "सफाई सेवा",
      description: "सम्पूर्ण घरको गहिरो सफाई सेवा"
    },
    provider: {
      id: "provider-1",
      name: "राज गुरुंग",
      businessName: "राजको सफाई सेवा",
      avatar: "/avatar-raj.jpg",
      phone: "+977-9841234567",
      email: "raj.gurung@email.com",
      rating: 4.8,
      isVerified: true
    },
    customer: {
      id: "customer-1",
      name: "सरिता शर्मा",
      phone: "+977-9876543210",
      email: "sarita.sharma@email.com"
    },
    pricing: {
      baseAmount: 2400,
      platformFee: 240,
      totalAmount: 2640
    },
    paymentMethod: "esewa",
    paymentStatus: "paid", // pending, paid, refunded
    specialInstructions: "भान्साको ग्रीस राम्रोसँग सफाई गर्नुहोस्। बाथरुम डिसइन्फेक्ट गर्नुहोस्।",
    createdAt: "2024-02-10T10:30:00Z",
    updatedAt: "2024-02-12T15:45:00Z",
    timeline: [
      {
        status: "booking_created",
        timestamp: "2024-02-10T10:30:00Z",
        title: "बुकिङ सिर्जना भयो",
        description: "सेवा बुकिङ सफलतापूर्वक सिर्जना भयो"
      },
      {
        status: "payment_completed",
        timestamp: "2024-02-10T10:35:00Z",
        title: "भुक्तानी सम्पन्न",
        description: "eSewa मार्फत भुक्तानी सफल भयो"
      },
      {
        status: "provider_confirmed",
        timestamp: "2024-02-12T15:45:00Z",
        title: "प्रदायकले पुष्टि गर्यो",
        description: "राज गुरुंगले बुकिङ स्वीकार गर्नुभयो"
      }
    ]
  };

  const content = {
    ne: {
      backToBookings: "बुकिङहरूमा फर्किनुहोस्",
      bookingDetails: "बुकिङ विवरण",
      serviceDetails: "सेवाको विवरण",
      customerDetails: "ग्राहक विवरण",
      providerDetails: "सेवा प्रदायक विवरण",
      locationDetails: "स्थानको विवरण",
      paymentDetails: "भुक्तानी विवरण",
      timeline: "समयरेखा",
      specialInstructions: "विशेष निर्देशनहरू",
      actions: "कार्यहरू",
      contactProvider: "प्रदायकलाई सम्पर्क गर्नुहोस्",
      contactCustomer: "ग्राहकलाई सम्पर्क गर्नुहोस्",
      sendMessage: "सन्देश पठाउनुहोस्",
      cancelBooking: "बुकिङ रद्द गर्नुहोस्",
      editBooking: "बुकिङ सम्पादन गर्नुहोस्",
      downloadInvoice: "बिल डाउनलोड गर्नुहोस्",
      shareBooking: "बुकिङ साझा गर्नुहोस्",
      markComplete: "सम्पन्न चिन्ह लगाउनुहोस्",
      leaveReview: "समीक्षा दिनुहोस्",
      bookingId: "बुकिङ आईडी",
      scheduledFor: "तोकिएको समय",
      duration: "अवधि",
      baseAmount: "आधारभूत रकम",
      platformFee: "प्लेटफर्म शुल्क",
      totalAmount: "कुल रकम",
      paymentMethod: "भुक्तानी विधि",
      paymentStatus: "भुक्तानी स्थिति",
      status: {
        pending: "बाँकी",
        confirmed: "पुष्टि भएको",
        in_progress: "प्रगतिमा",
        completed: "सम्पन्न",
        cancelled: "रद्द भएको"
      },
      payment: {
        pending: "बाँकी",
        paid: "भुक्तानी भयो",
        refunded: "फिर्ता भयो"
      }
    },
    en: {
      backToBookings: "Back to Bookings",
      bookingDetails: "Booking Details",
      serviceDetails: "Service Details",
      customerDetails: "Customer Details",
      providerDetails: "Provider Details",
      locationDetails: "Location Details",
      paymentDetails: "Payment Details",
      timeline: "Timeline",
      specialInstructions: "Special Instructions",
      actions: "Actions",
      contactProvider: "Contact Provider",
      contactCustomer: "Contact Customer",
      sendMessage: "Send Message",
      cancelBooking: "Cancel Booking",
      editBooking: "Edit Booking",
      downloadInvoice: "Download Invoice",
      shareBooking: "Share Booking",
      markComplete: "Mark Complete",
      leaveReview: "Leave Review",
      bookingId: "Booking ID",
      scheduledFor: "Scheduled For",
      duration: "Duration",
      baseAmount: "Base Amount",
      platformFee: "Platform Fee",
      totalAmount: "Total Amount",
      paymentMethod: "Payment Method",
      paymentStatus: "Payment Status",
      status: {
        pending: "Pending",
        confirmed: "Confirmed",
        in_progress: "In Progress",
        completed: "Completed",
        cancelled: "Cancelled"
      },
      payment: {
        pending: "Pending",
        paid: "Paid",
        refunded: "Refunded"
      }
    }
  };

  const currentContent = content[language];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "confirmed": return "bg-blue-100 text-blue-800";
      case "in_progress": return "bg-orange-100 text-orange-800";
      case "completed": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <AlertCircle className="w-4 h-4" />;
      case "confirmed": return <CheckCircle className="w-4 h-4" />;
      case "in_progress": return <Clock className="w-4 h-4" />;
      case "completed": return <CheckCircle className="w-4 h-4" />;
      case "cancelled": return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard/seeker/bookings"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {currentContent.backToBookings}
            </Link>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                {currentContent.shareBooking}
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                {currentContent.downloadInvoice}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Booking Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{currentContent.bookingDetails}</h1>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-gray-500">{currentContent.bookingId}: #{booking.id}</span>
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                  {getStatusIcon(booking.status)}
                  <span className="ml-1">{currentContent.status[booking.status as keyof typeof currentContent.status]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Details */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{currentContent.serviceDetails}</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900">{booking.service.title}</h3>
                    <p className="text-sm text-gray-600">{booking.service.category}</p>
                    <p className="text-gray-600 mt-2">{booking.service.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">{currentContent.scheduledFor}</div>
                        <div className="font-medium">{new Date(booking.scheduledDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">Time</div>
                        <div className="font-medium">{booking.scheduledTime}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">{currentContent.duration}</div>
                        <div className="font-medium">{booking.duration}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Location Details */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{currentContent.locationDetails}</h2>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">{booking.location.streetAddress}</div>
                    <div className="text-gray-600">
                      {booking.location.municipality}-{booking.location.ward}
                    </div>
                    <div className="text-gray-600">
                      {booking.location.district}, {booking.location.province}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Special Instructions */}
            {booking.specialInstructions && (
              <Card>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">{currentContent.specialInstructions}</h2>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex">
                      <FileText className="w-5 h-5 text-blue-400 mr-3 mt-0.5" />
                      <p className="text-blue-800">{booking.specialInstructions}</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Timeline */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{currentContent.timeline}</h2>
                <div className="space-y-4">
                  {booking.timeline.map((event, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900">{event.title}</h3>
                          <span className="text-sm text-gray-500">
                            {new Date(event.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Provider Details */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{currentContent.providerDetails}</h3>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                      {booking.provider.name.charAt(0)}
                    </div>
                    {booking.provider.isVerified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{booking.provider.name}</h4>
                    <p className="text-sm text-gray-600">{booking.provider.businessName}</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{booking.provider.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-600">{booking.provider.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-600">{booking.provider.email}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Provider
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {currentContent.sendMessage}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Payment Details */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{currentContent.paymentDetails}</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{currentContent.baseAmount}</span>
                    <span className="font-medium">रू {booking.pricing.baseAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{currentContent.platformFee}</span>
                    <span className="font-medium">रू {booking.pricing.platformFee.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
                    <span className="font-medium text-gray-900">{currentContent.totalAmount}</span>
                    <span className="font-bold text-lg">रू {booking.pricing.totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{currentContent.paymentMethod}</span>
                    <span className="text-sm font-medium capitalize">{booking.paymentMethod}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{currentContent.paymentStatus}</span>
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                      booking.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 
                      booking.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {currentContent.payment[booking.paymentStatus as keyof typeof currentContent.payment]}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{currentContent.actions}</h3>
                <div className="space-y-3">
                  {booking.status === "confirmed" && (
                    <>
                      <Button variant="outline" className="w-full" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        {currentContent.editBooking}
                      </Button>
                      <Button variant="outline" className="w-full text-red-600 border-red-600 hover:bg-red-50" size="sm">
                        <XCircle className="w-4 h-4 mr-2" />
                        {currentContent.cancelBooking}
                      </Button>
                    </>
                  )}
                  
                  {booking.status === "in_progress" && (
                    <Button className="w-full" size="sm">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {currentContent.markComplete}
                    </Button>
                  )}
                  
                  {booking.status === "completed" && (
                    <Button className="w-full" size="sm">
                      <Star className="w-4 h-4 mr-2" />
                      {currentContent.leaveReview}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}