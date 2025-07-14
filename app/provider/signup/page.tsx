"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Upload,
  Star,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import {
  SERVICE_CATEGORIES,
  MAJOR_CITIES,
  NEPAL_PROVINCES,
} from "@/lib/constants";

export default function ProviderSignupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

    // Location & Business
    city: "",
    area: "",
    province: "",
    businessName: "",

    // Services
    selectedServices: [] as string[],
    experience: "",
    description: "",
    hourlyRate: "",

    // Documents
    citizenshipFront: null as File | null,
    citizenshipBack: null as File | null,
    businessLicense: null as File | null,

    // Terms
    agreeToTerms: false,
    agreeToBackground: false,
  });

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (serviceId: string) => {
    const services = formData.selectedServices;
    if (services.includes(serviceId)) {
      updateFormData(
        "selectedServices",
        services.filter((s) => s !== serviceId),
      );
    } else {
      updateFormData("selectedServices", [...services, serviceId]);
    }
  };

  const handleFileUpload = (field: string, file: File | null) => {
    updateFormData(field, file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Submit form
      console.log("Provider Registration:", formData);
      alert("नमस्ते! तपाईंको दर्ता सफल भयो। हामी छिट्टै सम्पर्कमा आउनेछौं।");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            मुख्य पृष्ठमा फर्कनुहोस्
          </Link>

          <Card className="p-8 text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              सेवा प्रदायक बन्नुहोस् 🇳🇵
            </h1>
            <p className="text-xl text-purple-100">
              नेपालमा आफ्नो सेवा बेच्न सुरु गर्नुहोस्!
            </p>
          </Card>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNum
                      ? "bg-primary-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {stepNum}
                </div>
                {stepNum < 4 && (
                  <div
                    className={`w-16 h-2 mx-2 rounded ${
                      step > stepNum ? "bg-primary-600" : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-gray-600">
            Step {step} of 4:{" "}
            {step === 1
              ? "व्यक्तिगत जानकारी"
              : step === 2
                ? "स्थान र व्यवसाय"
                : step === 3
                  ? "सेवा विवरण"
                  : "कागजात र पूर्णता"}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6 gradient-text">
                व्यक्तिगत जानकारी
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    पूरा नाम *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="तपाईंको पूरा नाम"
                      value={formData.fullName}
                      onChange={(e) =>
                        updateFormData("fullName", e.target.value)
                      }
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    इमेल ठेगाना *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    फोन नम्बर *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="tel"
                      placeholder="98********"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    प्रान्त *
                  </label>
                  <select
                    value={formData.province}
                    onChange={(e) => updateFormData("province", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">प्रान्त चयन गर्नुहोस्</option>
                    {NEPAL_PROVINCES.map((province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    पासवर्ड सिर्जना गर्नुहोस् *
                  </label>
                  <Input
                    type="password"
                    placeholder="कम्तिमा ८ अक्षर"
                    value={formData.password}
                    onChange={(e) => updateFormData("password", e.target.value)}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    पासवर्ड पुष्टि गर्नुहोस् *
                  </label>
                  <Input
                    type="password"
                    placeholder="पासवर्ड फेरि लेख्नुहोस्"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      updateFormData("confirmPassword", e.target.value)
                    }
                    required
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Step 2: Location & Business */}
          {step === 2 && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6 gradient-text">
                स्थान र व्यवसाय
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    शहर *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <select
                      value={formData.city}
                      onChange={(e) => updateFormData("city", e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    >
                      <option value="">शहर चयन गर्नु��ोस्</option>
                      {MAJOR_CITIES.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    क्षेत्र/ठेगाना *
                  </label>
                  <Input
                    type="text"
                    placeholder="जस्तै: तीनकुने, बानेश्वर"
                    value={formData.area}
                    onChange={(e) => updateFormData("area", e.target.value)}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    व्यापारिक नाम (वैकल्पिक)
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="तपाईंको व्य��पार/कम्पनीको नाम"
                      value={formData.businessName}
                      onChange={(e) =>
                        updateFormData("businessName", e.target.value)
                      }
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    अनुभव *
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) =>
                      updateFormData("experience", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">अनुभव चयन गर्नुहोस्</option>
                    <option value="नयाँ">नयाँ (१ वर्ष मुनि)</option>
                    <option value="१-२ वर्ष">१-२ वर्ष</option>
                    <option value="३-५ वर्ष">३-५ वर्ष</option>
                    <option value="५+ वर्ष">५+ वर्ष</option>
                  </select>
                </div>
              </div>
            </Card>
          )}

          {/* Step 3: Services */}
          {step === 3 && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6 gradient-text">
                सेवा विवरण
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    तपाईं कुन सेवाहरू प्रदान गर्न चाहनुहुन्छ? (कम्तिमा १
                    छान्नुहोस्) *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {SERVICE_CATEGORIES.map((category) => (
                      <div
                        key={category.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                          formData.selectedServices.includes(category.id)
                            ? "border-primary-500 bg-primary-50"
                            : "border-gray-300 hover:border-primary-300"
                        }`}
                        onClick={() => handleServiceToggle(category.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{category.icon}</span>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {category.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {category.subcategories.length} सेवाहरू
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    घण्टाको दर (रुपैयाँमा) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">
                      रू
                    </span>
                    <Input
                      type="number"
                      placeholder="500"
                      value={formData.hourlyRate}
                      onChange={(e) =>
                        updateFormData("hourlyRate", e.target.value)
                      }
                      className="pl-12"
                      required
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    सुझाव: काठमाडौंमा औसत दर रू ३००-१५०० प्रति घण्टा
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    आफ्नो सेवाको विवरण लेख्नुहोस् *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="तपाईंले के सेवा दिनुहुन्छ, तपाईंको अनुभव, विशेषता आदि..."
                    value={formData.description}
                    onChange={(e) =>
                      updateFormData("description", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Step 4: Documents & Completion */}
          {step === 4 && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6 gradient-text">
                कागजात र पूर्णता
              </h2>

              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    आवश्यक कागजातहरू
                  </h3>
                  <p className="text-blue-700 text-sm">
                    प्रमाणीकरणका लागि कृपया आफ्नो नागरिकता प्रमाणपत्रको फोटो
                    अपलोड गर्नुहोस्।
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      नागरिकता (अगाडिको भाग) *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 mb-2">
                        क्लिक गरेर फाइल छान्नुहोस्
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleFileUpload(
                            "citizenshipFront",
                            e.target.files?.[0] || null,
                          )
                        }
                        className="hidden"
                        id="citizenship-front"
                      />
                      <label
                        htmlFor="citizenship-front"
                        className="cursor-pointer"
                      >
                        <Button type="button" variant="outline" size="sm">
                          फोटो छान्नुहोस्
                        </Button>
                      </label>
                      {formData.citizenshipFront && (
                        <p className="text-sm text-green-600 mt-2">
                          ✓ {formData.citizenshipFront.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      नागरिकता (पछाडिको भाग) *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 mb-2">
                        क्लिक गरेर फाइल छान्नुहोस्
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleFileUpload(
                            "citizenshipBack",
                            e.target.files?.[0] || null,
                          )
                        }
                        className="hidden"
                        id="citizenship-back"
                      />
                      <label
                        htmlFor="citizenship-back"
                        className="cursor-pointer"
                      >
                        <Button type="button" variant="outline" size="sm">
                          फोटो छान्नुहोस्
                        </Button>
                      </label>
                      {formData.citizenshipBack && (
                        <p className="text-sm text-green-600 mt-2">
                          ✓ {formData.citizenshipBack.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    व्यापारिक इजाजतपत्र (वैकल्पिक)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      यदि तपाईंसँग व्यापारिक इजाजत छ भने अपलोड गर्नुहोस्
                    </p>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) =>
                        handleFileUpload(
                          "businessLicense",
                          e.target.files?.[0] || null,
                        )
                      }
                      className="hidden"
                      id="business-license"
                    />
                    <label
                      htmlFor="business-license"
                      className="cursor-pointer"
                    >
                      <Button type="button" variant="outline" size="sm">
                        फाइल छान्नुहोस्
                      </Button>
                    </label>
                    {formData.businessLicense && (
                      <p className="text-sm text-green-600 mt-2">
                        ✓ {formData.businessLicense.name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={(e) =>
                        updateFormData("agreeToTerms", e.target.checked)
                      }
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      required
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      म{" "}
                      <Link
                        href="/terms"
                        className="text-primary-600 hover:text-primary-700"
                      >
                        सेवाका सर्तहरू
                      </Link>{" "}
                      र{" "}
                      <Link
                        href="/privacy"
                        className="text-primary-600 hover:text-primary-700"
                      >
                        गोपनीयता नीति
                      </Link>{" "}
                      मा सहमत छु।
                    </span>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.agreeToBackground}
                      onChange={(e) =>
                        updateFormData("agreeToBackground", e.target.checked)
                      }
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      required
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      म पृष्ठभूमि जाँच र प्रमाणीकरण प्रक्रियामा सहमत छु।
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
              >
                पछाडि जानुहोस्
              </Button>
            )}

            <Button
              type="submit"
              className="btn-vibrant ml-auto"
              disabled={
                (step === 1 &&
                  (!formData.fullName ||
                    !formData.email ||
                    !formData.phone ||
                    !formData.password ||
                    formData.password !== formData.confirmPassword)) ||
                (step === 2 &&
                  (!formData.city || !formData.area || !formData.experience)) ||
                (step === 3 &&
                  (formData.selectedServices.length === 0 ||
                    !formData.hourlyRate ||
                    !formData.description)) ||
                (step === 4 &&
                  (!formData.citizenshipFront ||
                    !formData.citizenshipBack ||
                    !formData.agreeToTerms ||
                    !formData.agreeToBackground))
              }
            >
              {step < 4 ? "अर्को चरण" : "दर्ता पूरा गर्नुहोस्"} ✨
            </Button>
          </div>
        </form>

        {/* Success Benefits */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <h3 className="text-lg font-semibold text-green-900 mb-4">
            <CheckCircle className="inline h-5 w-5 mr-2" />
            सेवा प्रदायक बनेपछि के फाइदा पाइन्छ?
          </h3>
          <ul className="space-y-2 text-green-800">
            <li>• आफ्नै समय र दरमा काम गर्न सकिन्छ</li>
            <li>• नेपालभरका ग्राहकहरूसँग जोडिन सकिन्छ</li>
            <li>• तुरुन्त र सुरक्षित भुक्तानी</li>
            <li>• व्यावसायिक प्रोफाइल र समीक्षा निर्माण</li>
            <li>• मार्केटिङ र समर्थन उपकरणहरू</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
