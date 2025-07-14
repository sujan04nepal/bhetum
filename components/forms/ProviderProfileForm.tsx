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

interface ProviderFormData {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  bio: string;
  location: string;
  categories: string[];
  skills: string[];
  experience: string;
  hourlyRate: string;
  portfolio: Array<{
    title: string;
    description: string;
    images: string[];
  }>;
  availability: {
    [key: string]: { start: string; end: string; available: boolean };
  };
}

interface ProviderProfileFormProps {
  initialData?: Partial<ProviderFormData>;
  onSave?: (data: ProviderFormData) => void;
  isEditing?: boolean;
}

export default function ProviderProfileForm({
  initialData = {},
  onSave,
  isEditing = false,
}: ProviderProfileFormProps) {
  const [editMode, setEditMode] = useState(isEditing);
  const [newSkill, setNewSkill] = useState("");

  const [formData, setFormData] = useState<ProviderFormData>({
    fullName: initialData.fullName || "राज गुरुंग",
    email: initialData.email || "raj.gurung@email.com",
    phone: initialData.phone || "+977-9841234567",
    businessName: initialData.businessName || "राजको सफाई सेवा",
    bio:
      initialData.bio ||
      "५ वर्षको अनुभव भएको घर सफाई विशेषज्ञ। गुणस्तरीय र भरपर्दो सेवा प्रदान गर्छु।",
    location: initialData.location || "काठमाडौं, बागबजार",
    categories: initialData.categories || ["घर सरसफाई", "कार्यालय सफाई"],
    skills: initialData.skills || [
      "डीप क्लिनिङ",
      "कार्पेट सफाई",
      "झ्यालको सफाई",
    ],
    experience: initialData.experience || "५",
    hourlyRate: initialData.hourlyRate || "८००",
    portfolio: initialData.portfolio || [
      {
        title: "अफिस सफाई परियोजना",
        description: "बागबजारको एक ठूलो अफिसको सम्पूर्ण सफाई काम।",
        images: ["/portfolio1.jpg", "/portfolio2.jpg"],
      },
    ],
    availability: initialData.availability || {
      sunday: { start: "08:00", end: "18:00", available: true },
      monday: { start: "08:00", end: "18:00", available: true },
      tuesday: { start: "08:00", end: "18:00", available: true },
      wednesday: { start: "08:00", end: "18:00", available: true },
      thursday: { start: "08:00", end: "18:00", available: true },
      friday: { start: "08:00", end: "18:00", available: true },
      saturday: { start: "09:00", end: "15:00", available: true },
    },
  });

  const updateFormData = <K extends keyof ProviderFormData>(
    field: K,
    value: ProviderFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      updateFormData("skills", [...formData.skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    updateFormData(
      "skills",
      formData.skills.filter((s: string) => s !== skill),
    );
  };

  const handleSave = () => {
    onSave?.(formData);
    setEditMode(false);
  };

  const daysOfWeek = [
    { key: "sunday", label: "आइतबार" },
    { key: "monday", label: "सोमबार" },
    { key: "tuesday", label: "मंगलबार" },
    { key: "wednesday", label: "बुधबार" },
    { key: "thursday", label: "बिहिबार" },
    { key: "friday", label: "शुक्रबार" },
    { key: "saturday", label: "शनिबार" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          प्रोफाइल अपडेट गर्नुहोस्
        </h1>
        <div className="flex gap-3">
          {editMode ? (
            <>
              <Button variant="outline" onClick={() => setEditMode(false)}>
                रद्द गर्नुहोस्
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                सेव गर्नुहोस्
              </Button>
            </>
          ) : (
            <Button onClick={() => setEditMode(true)}>
              <Edit className="h-4 w-4 mr-2" />
              सम्पादन गर्नुहोस्
            </Button>
          )}
        </div>
      </div>

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
            <Input
              label="पूरा नाम"
              value={formData.fullName}
              onChange={(e) => updateFormData("fullName", e.target.value)}
              disabled={!editMode}
              icon={<User className="h-4 w-4" />}
            />
            <Input
              label="इमेल ठेगाना"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              disabled={!editMode}
              icon={<Mail className="h-4 w-4" />}
            />
            <Input
              label="फोन नम्बर"
              value={formData.phone}
              onChange={(e) => updateFormData("phone", e.target.value)}
              disabled={!editMode}
              icon={<Phone className="h-4 w-4" />}
            />
            <Input
              label="व्यापारिक नाम"
              value={formData.businessName}
              onChange={(e) => updateFormData("businessName", e.target.value)}
              disabled={!editMode}
              icon={<Briefcase className="h-4 w-4" />}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              बायो
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50"
              rows={3}
              value={formData.bio}
              onChange={(e) => updateFormData("bio", e.target.value)}
              disabled={!editMode}
              placeholder="आफ्नो बारेमा छोटकरीमा बताउनुहोस्..."
            />
          </div>
          <Input
            label="स्थान"
            value={formData.location}
            onChange={(e) => updateFormData("location", e.target.value)}
            disabled={!editMode}
            icon={<MapPin className="h-4 w-4" />}
          />
        </CardContent>
      </Card>

      {/* Services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Briefcase className="h-5 w-5 mr-2" />
            सेवाहरू
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              श्रेणीहरू चयन गर्नुहोस्
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {SERVICE_CATEGORIES.slice(0, 6).map((category) => (
                <label key={category.name} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.categories.includes(category.name)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        updateFormData("categories", [
                          ...formData.categories,
                          category.name,
                        ]);
                      } else {
                        updateFormData(
                          "categories",
                          formData.categories.filter(
                            (c) => c !== category.name,
                          ),
                        );
                      }
                    }}
                    disabled={!editMode}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {category.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="अनुभव (वर्षमा)"
              type="number"
              value={formData.experience}
              onChange={(e) => updateFormData("experience", e.target.value)}
              disabled={!editMode}
              icon={<Calendar className="h-4 w-4" />}
            />
            <Input
              label="घण्टावारी दर (रू)"
              type="number"
              value={formData.hourlyRate}
              onChange={(e) => updateFormData("hourlyRate", e.target.value)}
              disabled={!editMode}
              icon={<span className="text-sm">रू</span>}
            />
          </div>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="h-5 w-5 mr-2" />
            सीपहरू
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
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
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addSkill()}
              />
              <Button onClick={addSkill}>थप्नुहोस्</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Portfolio */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="h-5 w-5 mr-2" />
            पोर्टफोलियो
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {formData.portfolio.map((item, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <h4 className="font-medium text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <div className="flex gap-2">
                  {item.images.map((img, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center"
                    >
                      <Upload className="h-6 w-6 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {editMode && (
            <Button variant="outline" className="mt-4">
              <Upload className="h-4 w-4 mr-2" />
              पोर्टफोलियो थप्नुहोस्
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Availability */}
      <Card>
        <CardHeader>
          <CardTitle>उपलब्धता</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {daysOfWeek.map((day) => (
              <div key={day.key} className="flex items-center gap-4">
                <div className="w-20">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.availability[day.key]?.available}
                      onChange={(e) => {
                        updateFormData("availability", {
                          ...formData.availability,
                          [day.key]: {
                            ...formData.availability[day.key],
                            available: e.target.checked,
                          },
                        });
                      }}
                      disabled={!editMode}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm font-medium">
                      {day.label}
                    </span>
                  </label>
                </div>
                {formData.availability[day.key]?.available && (
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      value={formData.availability[day.key]?.start}
                      onChange={(e) => {
                        updateFormData("availability", {
                          ...formData.availability,
                          [day.key]: {
                            ...formData.availability[day.key],
                            start: e.target.value,
                          },
                        });
                      }}
                      disabled={!editMode}
                      className="px-2 py-1 border border-gray-300 rounded text-sm disabled:bg-gray-50"
                    />
                    <span>देखि</span>
                    <input
                      type="time"
                      value={formData.availability[day.key]?.end}
                      onChange={(e) => {
                        updateFormData("availability", {
                          ...formData.availability,
                          [day.key]: {
                            ...formData.availability[day.key],
                            end: e.target.value,
                          },
                        });
                      }}
                      disabled={!editMode}
                      className="px-2 py-1 border border-gray-300 rounded text-sm disabled:bg-gray-50"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
