"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Star,
  Upload,
  Calendar,
  Edit,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { SERVICE_CATEGORIES, MAJOR_CITIES } from "@/lib/constants";

interface ProviderProfileFormProps {
  initialData?: any;
  onSave?: (data: any) => void;
  isEditing?: boolean;
}

export default function ProviderProfileForm({
  initialData = {},
  onSave,
  isEditing = false,
}: ProviderProfileFormProps) {
  const [editMode, setEditMode] = useState(isEditing);
  const [formData, setFormData] = useState({
    // Basic Information
    fullName: initialData.fullName || "राज गुरुंग",
    email: initialData.email || "raj.gurung@email.com",
    phone: initialData.phone || "9841234567",

    // Business Information
    businessName: initialData.businessName || "गुरुंग ट्यूशन सेन्टर",
    description:
      initialData.description ||
      "म गणित र विज्ञानको विषयमा ट्यूशन दिन्छु। मसँग १० वर्षको अनुभव छ।",

    // Location
    city: initialData.city || "पोखरा",
    area: initialData.area || "माहेन्द्रपुल",

    // Services
    services: initialData.services || ["teaching-coaching"],
    hourlyRate: initialData.hourlyRate || "500",

    // Availability
    availability: initialData.availability || {
      monday: { available: true, start: "09:00", end: "17:00" },
      tuesday: { available: true, start: "09:00", end: "17:00" },
      wednesday: { available: true, start: "09:00", end: "17:00" },
      thursday: { available: true, start: "09:00", end: "17:00" },
      friday: { available: true, start: "09:00", end: "17:00" },
      saturday: { available: true, start: "09:00", end: "15:00" },
      sunday: { available: false, start: "", end: "" },
    },

    // Skills & Experience
    skills: initialData.skills || ["गणित", "विज्ञान", "SEE तयारी", "+2 तयारी"],
    experience: initialData.experience || "५+ वर्ष",
    education: initialData.education || "M.Ed Mathematics, TU",

    // Portfolio
    portfolio: initialData.portfolio || [],

    // Reviews & Stats
    rating: initialData.rating || 4.8,
    totalReviews: initialData.totalReviews || 89,
    completedJobs: initialData.completedJobs || 156,

    // Profile Image
    profileImage: initialData.profileImage || null,
  });

  const days = [
    { key: "monday", label: "सोमवार" },
    { key: "tuesday", label: "मंगलवार" },
    { key: "wednesday", label: "बुधवार" },
    { key: "thursday", label: "बिहिवार" },
    { key: "friday", label: "शुक्रवार" },
    { key: "saturday", label: "शनिवार" },
    { key: "sunday", label: "आइतवार" },
  ];

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateAvailability = (day: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day],
          [field]: value,
        },
      },
    }));
  };

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      updateFormData("skills", [...formData.skills, skill]);
    }
  };

  const removeSkill = (skill: string) => {
    updateFormData(
      "skills",
      formData.skills.filter((s) => s !== skill),
    );
  };

  const handleSave = () => {
    onSave?.(formData);
    setEditMode(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold gradient-text">
          प्रोफाइल व्यवस्थापन
        </h1>
        {!editMode ? (
          <Button onClick={() => setEditMode(true)} className="btn-vibrant">
            <Edit className="h-4 w-4 mr-2" />
            सम्पादन गर्नुहोस्
          </Button>
        ) : (
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setEditMode(false)}>
              रद्द गर्नुहोस्
            </Button>
            <Button onClick={handleSave} className="btn-vibrant">
              <Save className="h-4 w-4 mr-2" />
              सेव गर्नुहोस्
            </Button>
          </div>
        )}
      </div>

      {/* Profile Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                {formData.fullName.charAt(0)}
              </div>
              {editMode && (
                <button className="absolute -bottom-2 -right-2 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700">
                  <Upload className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold">{formData.fullName}</h2>
              <p className="text-gray-600">{formData.businessName}</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">{formData.rating}</span>
                  <span className="ml-1 text-gray-500">
                    ({formData.totalReviews} समीक्षा)
                  </span>
                </div>
                <span className="text-gray-300">•</span>
                <span className="text-gray-600">
                  {formData.completedJobs} काम सम्पन्न
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-600">{formData.city}</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600">
                रू {formData.hourlyRate}/घण्टा
              </div>
              <div className="text-sm text-gray-500">आधार दर</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            आधारभूत जानकारी
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                पूरा नाम
              </label>
              <Input
                value={formData.fullName}
                onChange={(e) => updateFormData("fullName", e.target.value)}
                disabled={!editMode}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                व्यापारिक नाम
              </label>
              <Input
                value={formData.businessName}
                onChange={(e) => updateFormData("businessName", e.target.value)}
                disabled={!editMode}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                इमेल
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  disabled={!editMode}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                फोन नम्बर
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  disabled={!editMode}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              सेवाको विवरण
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => updateFormData("description", e.target.value)}
              disabled={!editMode}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50"
            />
          </div>
        </CardContent>
      </Card>

      {/* Location & Services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            स्थान र सेवाहरू
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                शहर
              </label>
              <select
                value={formData.city}
                onChange={(e) => updateFormData("city", e.target.value)}
                disabled={!editMode}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50"
              >
                {MAJOR_CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                क्षेत्र
              </label>
              <Input
                value={formData.area}
                onChange={(e) => updateFormData("area", e.target.value)}
                disabled={!editMode}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              घण्टाको दर (रुपैयाँमा)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">रू</span>
              <Input
                type="number"
                value={formData.hourlyRate}
                onChange={(e) => updateFormData("hourlyRate", e.target.value)}
                disabled={!editMode}
                className="pl-12"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              सेवा श्रेणीहरू
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {SERVICE_CATEGORIES.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    checked={formData.services.includes(category.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        updateFormData("services", [
                          ...formData.services,
                          category.id,
                        ]);
                      } else {
                        updateFormData(
                          "services",
                          formData.services.filter((s) => s !== category.id),
                        );
                      }
                    }}
                    disabled={!editMode}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm">{category.name}</span>
                </label>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills & Experience */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Briefcase className="h-5 w-5 mr-2" />
            सीप र अनुभव
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                अनुभव
              </label>
              <select
                value={formData.experience}
                onChange={(e) => updateFormData("experience", e.target.value)}
                disabled={!editMode}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50"
              >
                <option value="नयाँ">नयाँ (१ वर्ष मुनि)</option>
                <option value="१-२ वर्ष">१-२ वर्ष</option>
                <option value="३-५ वर्ष">३-५ वर्ष</option>
                <option value="५+ वर्ष">५+ वर्ष</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                शिक्षा
              </label>
              <Input
                value={formData.education}
                onChange={(e) => updateFormData("education", e.target.value)}
                disabled={!editMode}
                placeholder="जस्तै: Bachelor in Education"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              विशेषज्ञताहरू
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {skill}
                  {editMode && (
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-2 text-primary-600 hover:text-primary-800"
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>

            {editMode && (
              <div className="flex gap-2">
                <Input
                  placeholder="नयाँ सीप थप्नुहोस्"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = "";
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={(e) => {
                    const input =
                      e.currentTarget.parentElement?.querySelector("input");
                    if (input?.value) {
                      addSkill(input.value);
                      input.value = "";
                    }
                  }}
                >
                  थप्नुहोस्
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Availability */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            उपलब्धता
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {days.map(({ key, label }) => (
              <div key={key} className="flex items-center space-x-4">
                <div className="w-20">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.availability[key]?.available || false}
                      onChange={(e) =>
                        updateAvailability(key, "available", e.target.checked)
                      }
                      disabled={!editMode}
                      className="mr-2 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    {label}
                  </label>
                </div>

                {formData.availability[key]?.available && (
                  <>
                    <div>
                      <select
                        value={formData.availability[key]?.start || ""}
                        onChange={(e) =>
                          updateAvailability(key, "start", e.target.value)
                        }
                        disabled={!editMode}
                        className="px-2 py-1 border border-gray-300 rounded text-sm disabled:bg-gray-50"
                      >
                        <option value="">सुरु</option>
                        {Array.from({ length: 24 }, (_, i) => (
                          <option
                            key={i}
                            value={String(i).padStart(2, "0") + ":00"}
                          >
                            {String(i).padStart(2, "0")}:00
                          </option>
                        ))}
                      </select>
                    </div>

                    <span>देखि</span>

                    <div>
                      <select
                        value={formData.availability[key]?.end || ""}
                        onChange={(e) =>
                          updateAvailability(key, "end", e.target.value)
                        }
                        disabled={!editMode}
                        className="px-2 py-1 border border-gray-300 rounded text-sm disabled:bg-gray-50"
                      >
                        <option value="">अन्त्य</option>
                        {Array.from({ length: 24 }, (_, i) => (
                          <option
                            key={i}
                            value={String(i).padStart(2, "0") + ":00"}
                          >
                            {String(i).padStart(2, "0")}:00
                          </option>
                        ))}
                      </select>
                    </div>

                    <span>सम्म</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
