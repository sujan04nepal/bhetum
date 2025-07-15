"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  CreditCard,
  Shield,
  CheckCircle,
  ArrowLeft,
  Star,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

function NewBookingContent() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingData, setBookingData] = useState({
    serviceDetails: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    address: "",
    specialInstructions: "",
    paymentMethod: "",
  });

  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const providerId = searchParams.get("provider");

  // Mock provider data based on providerId
  const provider = {
    id: providerId || "1",
    name: language === "ne" ? "सरिता शर्मा" : "Sarita Sharma",
    service:
      language === "ne" ? "घर सरसफाइ सेवा" : "Professional House Cleaning",
    rating: 4.9,
    reviews: 127,
    price: language === "ne" ? "रू ३५०/घण्टा" : "Rs 350/hr",
    location: language === "ne" ? "काठमाडौं" : "Kathmandu",
    image: "👩‍💼",
    responseTime: language === "ne" ? "२ मिनेट" : "2 min",
    availability: language === "ne" ? "उपलब्ध" : "Available",
  };

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const steps = [
    {
      number: 1,
      title: language === "ne" ? "सेवा विवरण" : "Service Details",
      description:
        language === "ne"
          ? "आवश्यकताहरू वर्णन गर्नुहोस्"
          : "Describe your requirements",
    },
    {
      number: 2,
      title: language === "ne" ? "मिति र समय" : "Date & Time",
      description:
        language === "ne" ? "उपयुक्त समय छान्नुहोस्" : "Choose convenient time",
    },
    {
      number: 3,
      title: language === "ne" ? "व्यक्तिगत जानकारी" : "Personal Info",
      description:
        language === "ne" ? "सम्पर्क विवरण भर्नुहोस्" : "Fill contact details",
    },
    {
      number: 4,
      title: language === "ne" ? "भुक्तानी" : "Payment",
      description:
        language === "ne"
          ? "भुक्तानी विधि छान्नुहोस्"
          : "Choose payment method",
    },
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleInputChange = (field: string, value: string) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBookingSubmit = () => {
    // Generate booking ID
    const bookingId = `BK${Date.now().toString().slice(-6)}`;
    router.push(`/booking/${bookingId}?status=confirmed`);
  };

  // Generate available dates (next 30 days)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  };

  const availableDates = generateAvailableDates();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link href="/find-services">
              <Button
                variant="outline"
                className="mr-4 text-white border-white hover:bg-white hover:text-blue-600"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("common.back")}
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-white">
              {t("booking.newBooking")}
            </h1>
          </div>

          {/* Provider Info */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <div className="flex items-center">
              <div className="text-4xl mr-4">{provider.image}</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">{provider.name}</h3>
                <p className="text-blue-100 mb-2">{provider.service}</p>
                <div className="flex items-center space-x-4 text-sm text-blue-100">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-300 fill-current" />
                    {provider.rating} ({provider.reviews} {t("common.reviews")})
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {provider.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {provider.responseTime} {t("common.response")}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  {provider.price}
                </div>
                <div className="text-green-300 text-sm">
                  {provider.availability}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Progress Steps */}
            <div className="bg-gray-50 px-8 py-6">
              <div className="flex justify-between items-center">
                {steps.map((stepItem, index) => (
                  <div key={stepItem.number} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        step >= stepItem.number
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "border-gray-300 text-gray-500"
                      }`}
                    >
                      {step > stepItem.number ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        stepItem.number
                      )}
                    </div>
                    <div className="ml-3 hidden md:block">
                      <div
                        className={`text-sm font-medium ${
                          step >= stepItem.number
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                      >
                        {stepItem.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {stepItem.description}
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mx-4 ${
                          step > stepItem.number ? "bg-blue-600" : "bg-gray-300"
                        }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="px-8 py-8">
              {step === 1 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {t("booking.serviceDetails")}
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("booking.whatService")} *
                      </label>
                      <textarea
                        value={bookingData.serviceDetails}
                        onChange={(e) =>
                          handleInputChange("serviceDetails", e.target.value)
                        }
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={t("booking.serviceDetailsPlaceholder")}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("booking.estimatedDuration")}
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select duration</option>
                        <option value="1">
                          {language === "ne" ? "१ घण्टा" : "1 hour"}
                        </option>
                        <option value="2">
                          {language === "ne" ? "२ घण्टा" : "2 hours"}
                        </option>
                        <option value="3">
                          {language === "ne" ? "३ घण्टा" : "3 hours"}
                        </option>
                        <option value="4">
                          {language === "ne" ? "४ घण्टा" : "4 hours"}
                        </option>
                        <option value="full">
                          {language === "ne" ? "पूरा दिन" : "Full day"}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {t("booking.dateTime")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        {t("booking.selectDate")} *
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {availableDates.slice(0, 15).map((date) => {
                          const dateObj = new Date(date);
                          const day = dateObj.getDate();
                          const month = dateObj.toLocaleDateString(
                            language === "ne" ? "ne-NP" : "en-US",
                            { month: "short" },
                          );

                          return (
                            <button
                              key={date}
                              onClick={() => setSelectedDate(date)}
                              className={`p-3 text-center rounded-lg border ${
                                selectedDate === date
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "bg-white hover:bg-gray-50 border-gray-300"
                              }`}
                            >
                              <div className="text-xs text-gray-500">
                                {month}
                              </div>
                              <div className="font-bold">{day}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        {t("booking.selectTime")} *
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`p-3 text-center rounded-lg border ${
                              selectedTime === time
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white hover:bg-gray-50 border-gray-300"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {selectedDate && selectedTime && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">
                        {t("booking.selectedDateTime")}
                      </h4>
                      <p className="text-blue-800">
                        {new Date(selectedDate).toLocaleDateString(
                          language === "ne" ? "ne-NP" : "en-US",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}{" "}
                        {t("common.at")} {selectedTime}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {step === 3 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {t("booking.contactInfo")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("booking.fullName")} *
                      </label>
                      <Input
                        value={bookingData.customerName}
                        onChange={(e) =>
                          handleInputChange("customerName", e.target.value)
                        }
                        placeholder={t("booking.fullNamePlaceholder")}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("booking.email")} *
                      </label>
                      <Input
                        type="email"
                        value={bookingData.customerEmail}
                        onChange={(e) =>
                          handleInputChange("customerEmail", e.target.value)
                        }
                        placeholder={t("booking.emailPlaceholder")}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("booking.phone")} *
                      </label>
                      <Input
                        value={bookingData.customerPhone}
                        onChange={(e) =>
                          handleInputChange("customerPhone", e.target.value)
                        }
                        placeholder={t("booking.phonePlaceholder")}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("booking.address")} *
                      </label>
                      <Input
                        value={bookingData.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        placeholder={t("booking.addressPlaceholder")}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("booking.specialInstructions")}
                      </label>
                      <textarea
                        value={bookingData.specialInstructions}
                        onChange={(e) =>
                          handleInputChange(
                            "specialInstructions",
                            e.target.value,
                          )
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={t(
                          "booking.specialInstructionsPlaceholder",
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {t("booking.payment")}
                  </h3>

                  {/* Booking Summary */}
                  <Card className="mb-6 bg-gray-50">
                    <h4 className="font-bold text-lg mb-4">
                      {t("booking.summary")}
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>{t("booking.service")}:</span>
                        <span className="font-medium">{provider.service}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t("booking.provider")}:</span>
                        <span className="font-medium">{provider.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t("booking.date")}:</span>
                        <span className="font-medium">
                          {selectedDate &&
                            new Date(selectedDate).toLocaleDateString()}{" "}
                          {selectedTime}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t("booking.location")}:</span>
                        <span className="font-medium">
                          {bookingData.address}
                        </span>
                      </div>
                      <hr />
                      <div className="flex justify-between text-lg font-bold">
                        <span>{t("booking.total")}:</span>
                        <span className="text-blue-600">{provider.price}</span>
                      </div>
                    </div>
                  </Card>

                  {/* Payment Methods */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">
                      {t("booking.paymentMethod")}
                    </h4>

                    <div className="space-y-3">
                      {[
                        { id: "esewa", name: "eSewa", icon: "💳" },
                        { id: "khalti", name: "Khalti", icon: "📱" },
                        {
                          id: "bank",
                          name:
                            language === "ne"
                              ? "बैंक ट्रान्सफर"
                              : "Bank Transfer",
                          icon: "🏦",
                        },
                        {
                          id: "cash",
                          name:
                            language === "ne" ? "नगद भुक्तानी" : "Cash Payment",
                          icon: "💰",
                        },
                      ].map((method) => (
                        <label
                          key={method.id}
                          className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            onChange={(e) =>
                              handleInputChange("paymentMethod", e.target.value)
                            }
                            className="mr-3"
                          />
                          <span className="text-2xl mr-3">{method.icon}</span>
                          <span className="font-medium">{method.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-green-800 text-sm">
                        {t("booking.securePayment")}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={step === 1}
                  className={step === 1 ? "invisible" : ""}
                >
                  {t("common.back")}
                </Button>

                {step < 4 ? (
                  <Button
                    onClick={handleNext}
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={
                      (step === 1 && !bookingData.serviceDetails) ||
                      (step === 2 && (!selectedDate || !selectedTime)) ||
                      (step === 3 &&
                        (!bookingData.customerName ||
                          !bookingData.customerEmail ||
                          !bookingData.customerPhone ||
                          !bookingData.address))
                    }
                  >
                    {t("common.next")}
                  </Button>
                ) : (
                  <Button
                    onClick={handleBookingSubmit}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={!bookingData.paymentMethod}
                  >
                    {t("booking.confirmBooking")}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function NewBookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">📅</div>
            <div className="text-xl font-semibold text-gray-600">
              Loading booking form...
            </div>
          </div>
        </div>
      }
    >
      <NewBookingContent />
    </Suspense>
  );
}
