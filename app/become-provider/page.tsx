"use client";

import { useState } from "react";
import {
  User,
  Phone,
  MapPin,
  Briefcase,
  Star,
  Shield,
  Clock,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Upload,
  Camera,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { SERVICE_CATEGORIES, MAJOR_CITIES } from "@/lib/constants";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function BecomeProviderPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    category: "",
    subcategory: "",
    experience: "",
    description: "",
    hourlyRate: "",
    availability: "",
    skills: [] as string[],
    certifications: [] as string[],
  });
  const { t, language } = useLanguage();

  const benefits = [
    {
      icon: TrendingUp,
      title:
        language === "ne" ? "आम्दानी बढाउनुहोस्" : "Increase Your Earnings",
      description:
        language === "ne"
          ? "मासिक रू ५०,००० सम्म कमाउनुहोस्"
          : "Earn up to Rs 50,000 per month",
    },
    {
      icon: Clock,
      title: language === "ne" ? "लचिलो समय" : "Flexible Schedule",
      description:
        language === "ne"
          ? "आफ्नो समय र गतिमा काम गर्नुहोस्"
          : "Work on your own time and pace",
    },
    {
      icon: Shield,
      title: language === "ne" ? "सुरक्षित भुक्तानी" : "Secure Payments",
      description:
        language === "ne"
          ? "सुरक्षित र समयमै भुक्तानी"
          : "Safe and timely payment guaranteed",
    },
    {
      icon: Star,
      title: language === "ne" ? "प्रोफेसनल नेटवर्क" : "Professional Network",
      description:
        language === "ne"
          ? "नेपालभरका ग्राहकहरूसँग जडान"
          : "Connect with clients across Nepal",
    },
  ];

  const steps = [
    {
      number: 1,
      title: language === "ne" ? "व्यक्तिगत जानकारी" : "Personal Info",
      description:
        language === "ne" ? "आधारभूत विवरण भर्नुहोस्" : "Fill basic details",
    },
    {
      number: 2,
      title: language === "ne" ? "सेवा विवरण" : "Service Details",
      description:
        language === "ne"
          ? "सेवा र दक्षता छान्नुहोस्"
          : "Choose services and skills",
    },
    {
      number: 3,
      title: language === "ne" ? "प्रमाणीकरण" : "Verification",
      description:
        language === "ne" ? "कागजात अपलोड गर्नुहोस्" : "Upload documents",
    },
    {
      number: 4,
      title: language === "ne" ? "समीक्षा" : "Review",
      description:
        language === "ne"
          ? "जानकारी ���मीक्षा गर्नुहोस्"
          : "Review information",
    },
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const selectedCategory = SERVICE_CATEGORIES.find(
    (cat) => cat.id === formData.category,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="mb-8">
            <span className="text-6xl">💼</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t("becomeProvider.title")}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
            {t("becomeProvider.subtitle")}
          </p>
          <div className="flex justify-center space-x-8 text-lg">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 mr-2 text-green-300" />
              {language === "ne" ? "मुफ्त दर्ता" : "Free Registration"}
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 mr-2 text-green-300" />
              {language === "ne" ? "तुरुन्त सुरुवात" : "Start Immediately"}
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 mr-2 text-green-300" />
              {language === "ne" ? "२४/७ समर्थन" : "24/7 Support"}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("becomeProvider.whyJoin")}
            </h2>
            <p className="text-xl text-gray-600">
              {t("becomeProvider.whyJoinDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <div className="bg-purple-100 p-4 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                  <benefit.icon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
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
                          ? "bg-purple-600 border-purple-600 text-white"
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
                            ? "text-purple-600"
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
                            ? "bg-purple-600"
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
                    {t("becomeProvider.personalInfo")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("becomeProvider.firstName")} *
                      </label>
                      <Input
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        placeholder={t("becomeProvider.firstNamePlaceholder")}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("becomeProvider.lastName")} *
                      </label>
                      <Input
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        placeholder={t("becomeProvider.lastNamePlaceholder")}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("becomeProvider.email")} *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder={t("becomeProvider.emailPlaceholder")}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("becomeProvider.phone")} *
                      </label>
                      <Input
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        placeholder={t("becomeProvider.phonePlaceholder")}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("becomeProvider.location")} *
                      </label>
                      <select
                        value={formData.location}
                        onChange={(e) =>
                          handleInputChange("location", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">
                          {t("becomeProvider.selectLocation")}
                        </option>
                        {MAJOR_CITIES.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {t("becomeProvider.serviceDetails")}
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("becomeProvider.category")} *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          handleInputChange("category", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">
                          {t("becomeProvider.selectCategory")}
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
                          {t("becomeProvider.subcategory")} *
                        </label>
                        <select
                          value={formData.subcategory}
                          onChange={(e) =>
                            handleInputChange("subcategory", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="">
                            {t("becomeProvider.selectSubcategory")}
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
                        {t("becomeProvider.experience")} *
                      </label>
                      <select
                        value={formData.experience}
                        onChange={(e) =>
                          handleInputChange("experience", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">
                          {t("becomeProvider.selectExperience")}
                        </option>
                        <option value="beginner">
                          {language === "ne"
                            ? "नयाँ (१ वर्ष भन्दा कम)"
                            : "Beginner (Less than 1 year)"}
                        </option>
                        <option value="intermediate">
                          {language === "ne"
                            ? "मध्यम (१-३ वर्ष)"
                            : "Intermediate (1-3 years)"}
                        </option>
                        <option value="experienced">
                          {language === "ne"
                            ? "अनुभवी (३-५ वर्ष)"
                            : "Experienced (3-5 years)"}
                        </option>
                        <option value="expert">
                          {language === "ne"
                            ? "विशेषज्ञ (५+ वर्ष)"
                            : "Expert (5+ years)"}
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("becomeProvider.hourlyRate")} *
                      </label>
                      <Input
                        type="number"
                        value={formData.hourlyRate}
                        onChange={(e) =>
                          handleInputChange("hourlyRate", e.target.value)
                        }
                        placeholder={
                          language === "ne" ? "रू प्रति घण्टा" : "Rs per hour"
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("becomeProvider.description")} *
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder={t("becomeProvider.descriptionPlaceholder")}
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {t("becomeProvider.verification")}
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("becomeProvider.profilePhoto")}
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">
                          {t("becomeProvider.uploadPhoto")}
                        </p>
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          {t("becomeProvider.chooseFile")}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("becomeProvider.idDocument")} *
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">
                          {t("becomeProvider.uploadId")}
                        </p>
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          {t("becomeProvider.chooseFile")}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("becomeProvider.certifications")}
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">
                          {t("becomeProvider.uploadCertifications")}
                        </p>
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          {t("becomeProvider.chooseFiles")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {t("becomeProvider.reviewSubmit")}
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <strong>{t("becomeProvider.name")}:</strong>{" "}
                        {formData.firstName} {formData.lastName}
                      </div>
                      <div>
                        <strong>{t("becomeProvider.email")}:</strong>{" "}
                        {formData.email}
                      </div>
                      <div>
                        <strong>{t("becomeProvider.phone")}:</strong>{" "}
                        {formData.phone}
                      </div>
                      <div>
                        <strong>{t("becomeProvider.location")}:</strong>{" "}
                        {formData.location}
                      </div>
                      <div>
                        <strong>{t("becomeProvider.category")}:</strong>{" "}
                        {selectedCategory?.name}
                      </div>
                      <div>
                        <strong>{t("becomeProvider.experience")}:</strong>{" "}
                        {formData.experience}
                      </div>
                      <div>
                        <strong>{t("becomeProvider.hourlyRate")}:</strong> रू{" "}
                        {formData.hourlyRate}/hr
                      </div>
                    </div>
                    {formData.description && (
                      <div>
                        <strong>{t("becomeProvider.description")}:</strong>
                        <p className="mt-1 text-gray-600">
                          {formData.description}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-bold text-blue-900 mb-2">
                      {t("becomeProvider.nextSteps")}
                    </h4>
                    <ul className="text-blue-800 space-y-1">
                      <li>• {t("becomeProvider.reviewProcess")}</li>
                      <li>• {t("becomeProvider.verification")}</li>
                      <li>• {t("becomeProvider.profileSetup")}</li>
                      <li>• {t("becomeProvider.startEarning")}</li>
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
                  {t("common.back")}
                </Button>

                {step < 4 ? (
                  <Button
                    onClick={handleNext}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {t("common.next")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Link href="/dashboard/provider">
                    <Button className="bg-green-600 hover:bg-green-700">
                      {t("becomeProvider.submit")}{" "}
                      <CheckCircle className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
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
