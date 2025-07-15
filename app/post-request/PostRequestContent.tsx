"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Image,
  Plus,
  X,
  CheckCircle,
  AlertCircle,
  Users,
  Star,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { SERVICE_CATEGORIES, MAJOR_CITIES } from "@/lib/constants";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function PostRequestContent() {
  const [step, setStep] = useState(1);
  const [requestData, setRequestData] = useState({
    title: "",
    description: "",
    category: "",
    subcategory: "",
    location: "",
    detailedAddress: "",
    budget: "",
    budgetType: "fixed", // fixed, hourly, negotiable
    urgency: "flexible", // urgent, within_week, flexible
    preferredDate: "",
    preferredTime: "",
    requirements: [] as string[],
    images: [] as string[],
  });

  const { t, language } = useLanguage();
  const router = useRouter();

  const steps = [
    {
      number: 1,
      title: language === "ne" ? "सेवा विवरण" : "Service Details",
      description:
        language === "ne"
          ? "कस्तो सेवा चाहिन्छ बताउनुहोस्"
          : "What service do you need?",
    },
    {
      number: 2,
      title: language === "ne" ? "स्थान र समय" : "Location & Time",
      description:
        language === "ne"
          ? "कहाँ र कहिले चाहिन्छ?"
          : "Where and when do you need it?",
    },
    {
      number: 3,
      title: language === "ne" ? "बजेट र आवश्यकताहरू" : "Budget & Requirements",
      description:
        language === "ne"
          ? "बजेट र विशेष आवश्यकताहरू"
          : "Budget and special requirements",
    },
    {
      number: 4,
      title: language === "ne" ? "समीक्षा र पोस्ट" : "Review & Post",
      description:
        language === "ne"
          ? "विवरण जाँच गरेर पोस्ट गर्नुहोस्"
          : "Review details and post",
    },
  ];

  const urgencyOptions = [
    {
      id: "urgent",
      label:
        language === "ne"
          ? "जरुरी (२४ घण्टा भित्र)"
          : "Urgent (Within 24 hours)",
      color: "text-red-600 bg-red-50 border-red-200",
    },
    {
      id: "within_week",
      label: language === "ne" ? "यो हप्ता भित्र" : "Within this week",
      color: "text-orange-600 bg-orange-50 border-orange-200",
    },
    {
      id: "flexible",
      label: language === "ne" ? "लचिलो समय" : "Flexible timing",
      color: "text-green-600 bg-green-50 border-green-200",
    },
  ];

  const budgetTypes = [
    { id: "fixed", label: language === "ne" ? "निश्चित मूल्य" : "Fixed Price" },
    { id: "hourly", label: language === "ne" ? "घण्टाको दर" : "Hourly Rate" },
    {
      id: "negotiable",
      label: language === "ne" ? "छलफल गर्न सकिन्छ" : "Negotiable",
    },
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleInputChange = (field: string, value: string) => {
    setRequestData((prev) => ({ ...prev, [field]: value }));
  };

  const addRequirement = () => {
    setRequestData((prev) => ({
      ...prev,
      requirements: [...prev.requirements, ""],
    }));
  };

  const updateRequirement = (index: number, value: string) => {
    setRequestData((prev) => ({
      ...prev,
      requirements: prev.requirements.map((req, i) =>
        i === index ? value : req,
      ),
    }));
  };

  const removeRequirement = (index: number) => {
    setRequestData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    // Generate request ID
    const requestId = `REQ${Date.now().toString().slice(-6)}`;
    router.push(`/request/${requestId}?status=posted`);
  };

  const selectedCategory = SERVICE_CATEGORIES.find(
    (cat) => cat.id === requestData.category,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="mb-8">
            <span className="text-6xl">📝</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {language === "ne"
              ? "सेवा अनुरोध पोस्ट गर्नुहोस्"
              : "Post Service Request"}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
            {language === "ne"
              ? "आफ्ना आवश्यकताहरू बताउनुहोस् र नजिकैका सेवा प्रदायकहरूबाट बिड प्राप्त गर्नुहोस्"
              : "Describe your needs and receive bids from nearby service providers"}
          </p>
          <div className="flex justify-center space-x-8 text-lg">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 mr-2 text-green-300" />
              {language === "ne" ? "नि:शुल्क पोस्ट" : "Free to Post"}
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 mr-2 text-green-300" />
              {language === "ne"
                ? "धेरै बिडहरू प्राप्त गर्नुहोस्"
                : "Get Multiple Bids"}
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 mr-2 text-green-300" />
              {language === "ne"
                ? "उत्तम मूल्य छान्नुहोस्"
                : "Choose Best Price"}
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {language === "ne" ? "कसरी काम गर्छ?" : "How It Works?"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                1.{" "}
                {language === "ne" ? "आवश्यकता लेख्नुहोस्" : "Post Your Need"}
              </h3>
              <p className="text-gray-600">
                {language === "ne"
                  ? "आफ्ना सेवा आवश्यकताहरू विस्तारमा लेख्नुहोस्"
                  : "Describe your service requirements in detail"}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                2.{" "}
                {language === "ne"
                  ? "बिडहरू प्राप्त गर्नुहोस्"
                  : "Receive Bids"}
              </h3>
              <p className="text-gray-600">
                {language === "ne"
                  ? "नजिकैका सेवा प्रदायकहरूबाट बिडहरू प्राप्त गर्नुहोस्"
                  : "Get bids from nearby qualified service providers"}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                3. {language === "ne" ? "उत्तम छान्नुहोस्" : "Choose the Best"}
              </h3>
              <p className="text-gray-600">
                {language === "ne"
                  ? "मूल्य र गुणस्तरको आधारमा उत्तम छान्नुहोस्"
                  : "Compare bids and choose the best option"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Request Form */}
      <section className="py-16 bg-gray-50">
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
                          ? "bg-green-600 border-green-600 text-white"
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
                            ? "text-green-600"
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
                          step > stepItem.number
                            ? "bg-green-600"
                            : "bg-gray-300"
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
                    {language === "ne" ? "सेवा विवरण" : "Service Details"}
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === "ne" ? "शीर्षक" : "Title"} *
                      </label>
                      <Input
                        value={requestData.title}
                        onChange={(e) =>
                          handleInputChange("title", e.target.value)
                        }
                        placeholder={
                          language === "ne"
                            ? "उदाहरण: घर सरसफाइ सेवा चाहिन्छ"
                            : "e.g., Need house cleaning service"
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === "ne" ? "श्रेणी" : "Category"} *
                      </label>
                      <select
                        value={requestData.category}
                        onChange={(e) =>
                          handleInputChange("category", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">
                          {language === "ne"
                            ? "श्रेणी छान्नुहोस्"
                            : "Select Category"}
                        </option>
                        {SERVICE_CATEGORIES.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {selectedCategory && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === "ne" ? "उप-श्रेणी" : "Subcategory"} *
                        </label>
                        <select
                          value={requestData.subcategory}
                          onChange={(e) =>
                            handleInputChange("subcategory", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="">
                            {language === "ne"
                              ? "उप-श्रेणी छान्नुहोस्"
                              : "Select Subcategory"}
                          </option>
                          {selectedCategory.subcategories.map((sub) => (
                            <option key={sub.id} value={sub.id}>
                              {sub.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === "ne"
                          ? "विस्तृत विवरण"
                          : "Detailed Description"}{" "}
                        *
                      </label>
                      <textarea
                        value={requestData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder={
                          language === "ne"
                            ? "आफ्ना आवश्यकताहरू विस्तारमा लेख्नुहोस्..."
                            : "Describe your requirements in detail..."
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {language === "ne" ? "स्थान र समय" : "Location & Time"}
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === "ne" ? "शहर" : "City"} *
                      </label>
                      <select
                        value={requestData.location}
                        onChange={(e) =>
                          handleInputChange("location", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">
                          {language === "ne" ? "शहर छान्नुहोस्" : "Select City"}
                        </option>
                        {MAJOR_CITIES.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === "ne"
                          ? "विस्तृत ठेगाना"
                          : "Detailed Address"}{" "}
                        *
                      </label>
                      <Input
                        value={requestData.detailedAddress}
                        onChange={(e) =>
                          handleInputChange("detailedAddress", e.target.value)
                        }
                        placeholder={
                          language === "ne"
                            ? "वडा, टोल, घर नम्बर"
                            : "Ward, Area, House Number"
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        {language === "ne" ? "जरुरी स्तर" : "Urgency Level"} *
                      </label>
                      <div className="space-y-3">
                        {urgencyOptions.map((option) => (
                          <label
                            key={option.id}
                            className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                              requestData.urgency === option.id
                                ? option.color
                                : "border-gray-300"
                            }`}
                          >
                            <input
                              type="radio"
                              name="urgency"
                              value={option.id}
                              checked={requestData.urgency === option.id}
                              onChange={(e) =>
                                handleInputChange("urgency", e.target.value)
                              }
                              className="mr-3"
                            />
                            <span className="font-medium">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === "ne"
                            ? "प्राथमिकता मिति"
                            : "Preferred Date"}
                        </label>
                        <Input
                          type="date"
                          value={requestData.preferredDate}
                          onChange={(e) =>
                            handleInputChange("preferredDate", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === "ne"
                            ? "प्राथमिकता समय"
                            : "Preferred Time"}
                        </label>
                        <Input
                          type="time"
                          value={requestData.preferredTime}
                          onChange={(e) =>
                            handleInputChange("preferredTime", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {language === "ne"
                      ? "बजेट र आवश्यकताहरू"
                      : "Budget & Requirements"}
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        {language === "ne" ? "बजेट प्रकार" : "Budget Type"} *
                      </label>
                      <div className="space-y-3">
                        {budgetTypes.map((type) => (
                          <label
                            key={type.id}
                            className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                          >
                            <input
                              type="radio"
                              name="budgetType"
                              value={type.id}
                              checked={requestData.budgetType === type.id}
                              onChange={(e) =>
                                handleInputChange("budgetType", e.target.value)
                              }
                              className="mr-3"
                            />
                            <span className="font-medium">{type.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {requestData.budgetType !== "negotiable" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === "ne" ? "बजेट रकम" : "Budget Amount"} *
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-gray-500">
                            रू
                          </span>
                          <Input
                            type="number"
                            value={requestData.budget}
                            onChange={(e) =>
                              handleInputChange("budget", e.target.value)
                            }
                            className="pl-8"
                            placeholder={
                              requestData.budgetType === "hourly"
                                ? language === "ne"
                                  ? "प्रति घण्टा"
                                  : "per hour"
                                : language === "ne"
                                  ? "कुल रकम"
                                  : "total amount"
                            }
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === "ne"
                          ? "विशेष आवश्यकताहरू"
                          : "Special Requirements"}
                      </label>
                      <div className="space-y-3">
                        {requestData.requirements.map((req, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <Input
                              value={req}
                              onChange={(e) =>
                                updateRequirement(index, e.target.value)
                              }
                              placeholder={
                                language === "ne"
                                  ? "आवश्यकता लेख्नुहोस्"
                                  : "Enter requirement"
                              }
                              className="flex-1"
                            />
                            <Button
                              variant="outline"
                              onClick={() => removeRequirement(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          onClick={addRequirement}
                          className="w-full border-dashed"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          {language === "ne"
                            ? "आवश्यकता थप्नुहोस्"
                            : "Add Requirement"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {language === "ne" ? "समीक्षा र पोस्ट" : "Review & Post"}
                  </h3>

                  <Card className="bg-gray-50 mb-6">
                    <h4 className="font-bold text-lg mb-4">
                      {language === "ne" ? "अनुरोध सारांश" : "Request Summary"}
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium">
                          {language === "ne" ? "शीर्षक:" : "Title:"}
                        </span>
                        <span>{requestData.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">
                          {language === "ne" ? "श्रेणी:" : "Category:"}
                        </span>
                        <span>{selectedCategory?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">
                          {language === "ne" ? "स्थान:" : "Location:"}
                        </span>
                        <span>{requestData.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">
                          {language === "ne" ? "बजेट:" : "Budget:"}
                        </span>
                        <span>
                          {requestData.budgetType === "negotiable"
                            ? language === "ne"
                              ? "छलफल गर्न सकिन्छ"
                              : "Negotiable"
                            : `रू ${requestData.budget}${requestData.budgetType === "hourly" ? "/hr" : ""}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">
                          {language === "ne" ? "जरुरी स्तर:" : "Urgency:"}
                        </span>
                        <span>
                          {
                            urgencyOptions.find(
                              (opt) => opt.id === requestData.urgency,
                            )?.label
                          }
                        </span>
                      </div>
                    </div>
                    {requestData.description && (
                      <div className="mt-4">
                        <span className="font-medium">
                          {language === "ne" ? "विवरण:" : "Description:"}
                        </span>
                        <p className="mt-1 text-gray-600">
                          {requestData.description}
                        </p>
                      </div>
                    )}
                  </Card>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-bold text-blue-900 mb-2">
                      {language === "ne" ? "अगला चरणहरू" : "Next Steps"}
                    </h4>
                    <ul className="text-blue-800 space-y-1">
                      <li>
                        •{" "}
                        {language === "ne"
                          ? "तपाईंको अनुरोध नजिकैका सेवा प्रदायकहरूला��� पठाइनेछ"
                          : "Your request will be sent to nearby service providers"}
                      </li>
                      <li>
                        •{" "}
                        {language === "ne"
                          ? "२४ घण्टा भित्र बिडहरू प्राप्त गर्नुहोस्"
                          : "Receive bids within 24 hours"}
                      </li>
                      <li>
                        •{" "}
                        {language === "ne"
                          ? "प्रदायकहरूसँग च्याट गर्नुहोस् र उत्तम छान्नुहोस्"
                          : "Chat with providers and choose the best"}
                      </li>
                    </ul>
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
                  {language === "ne" ? "पछाडि" : "Back"}
                </Button>

                {step < 4 ? (
                  <Button
                    onClick={handleNext}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={
                      (step === 1 &&
                        (!requestData.title ||
                          !requestData.category ||
                          !requestData.description)) ||
                      (step === 2 &&
                        (!requestData.location ||
                          !requestData.detailedAddress ||
                          !requestData.urgency)) ||
                      (step === 3 &&
                        requestData.budgetType !== "negotiable" &&
                        !requestData.budget)
                    }
                  >
                    {language === "ne" ? "अर्को चरण" : "Next"}
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {language === "ne"
                      ? "अनुरोध पोस्ट गर्नुहोस्"
                      : "Post Request"}
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
