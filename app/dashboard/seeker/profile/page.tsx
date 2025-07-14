"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Save,
  Camera,
  Shield,
  Calendar,
  Bell,
  Lock,
  CreditCard,
  Star,
  Bookmark,
  MessageCircle,
} from "lucide-react";

export default function SeekerProfilePage() {
  const { t, language } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");

  const [profileData, setProfileData] = useState({
    fullName: "सरित��� शर्मा",
    email: "sarita.sharma@email.com",
    phone: "+977-9876543210",
    avatar: "/avatar-sarita.jpg",
    location: {
      province: "बागमती प्रदेश",
      district: "काठमाडौं",
      municipality: "काठमाडौं महानगरपालिका",
      ward: 15,
      area: "दरबारमार्ग",
    },
    bio: "मलाई गुणस्तरीय सेवा चाहिन्छ। समयको कदर गर्छु र पेशेवर व्यवहार अपेक्षा गर्छु।",
    preferences: {
      language: "ne",
      notifications: {
        email: true,
        sms: true,
        push: true,
      },
      autoBooking: false,
      priceRange: {
        min: 500,
        max: 2000,
      },
    },
    stats: {
      totalBookings: 34,
      completedBookings: 31,
      savedProviders: 12,
      totalSpent: 45600,
    },
  });

  const content = {
    ne: {
      profile: "प्रोफाइल",
      personalInfo: "व्यक्तिगत जानकारी",
      preferences: "प्राथमिकताहरू",
      security: "सुरक्षा",
      bookingHistory: "बुकिङ इतिहास",
      savedProviders: "बचत गरिएका प्रदायकहरू",
      editProfile: "प्रोफाइल सम्पादन",
      saveChanges: "परिवर्तन सेभ गर्नुहोस्",
      cancel: "रद्द गर्नुहोस्",
      uploadPhoto: "फोटो अपलोड गर्नुहोस्",
      fullName: "पूरा नाम",
      emailAddress: "इमेल ठेगाना",
      phoneNumber: "फोन नम्बर",
      location: "स्थान",
      bio: "बायो",
      languagePreference: "भाषा प्राथमिकता",
      notifications: "सूचनाहरू",
      emailNotifications: "इमेल सूचना",
      smsNotifications: "SMS सूचना",
      pushNotifications: "पुश सूचना",
      priceRange: "मूल्य दायरा",
      autoBooking: "स्वचालित बुकिङ",
      changePassword: "पासवर्ड परिवर्तन गर्नुहोस्",
      currentPassword: "हालको पासवर्ड",
      newPassword: "नयाँ पासवर्ड",
      confirmPassword: "पासवर्ड पुष्टि गर्नु���ोस्",
      paymentMethods: "भुक्तानी विधिहरू",
      addPaymentMethod: "भुक्तानी विधि थप्नुहोस्",
      accountStats: "खाता तथ्याङ्क",
      totalBookings: "कुल बुकिङहरू",
      completedBookings: "सम्पन्न बुकिङहरू",
      totalSpent: "कुल खर्च",
      memberSince: "सदस्य भएको मिति",
    },
    en: {
      profile: "Profile",
      personalInfo: "Personal Information",
      preferences: "Preferences",
      security: "Security",
      bookingHistory: "Booking History",
      savedProviders: "Saved Providers",
      editProfile: "Edit Profile",
      saveChanges: "Save Changes",
      cancel: "Cancel",
      uploadPhoto: "Upload Photo",
      fullName: "Full Name",
      emailAddress: "Email Address",
      phoneNumber: "Phone Number",
      location: "Location",
      bio: "Bio",
      languagePreference: "Language Preference",
      notifications: "Notifications",
      emailNotifications: "Email Notifications",
      smsNotifications: "SMS Notifications",
      pushNotifications: "Push Notifications",
      priceRange: "Price Range",
      autoBooking: "Auto Booking",
      changePassword: "Change Password",
      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmPassword: "Confirm Password",
      paymentMethods: "Payment Methods",
      addPaymentMethod: "Add Payment Method",
      accountStats: "Account Statistics",
      totalBookings: "Total Bookings",
      completedBookings: "Completed Bookings",
      totalSpent: "Total Spent",
      memberSince: "Member Since",
    },
  };

  const currentContent = content[language];

  const updateProfile = (field: string, value: any) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Save profile data
    setIsEditing(false);
  };

  const sidebarItems = [
    { id: "personal", icon: User, label: currentContent.personalInfo },
    { id: "preferences", icon: Bell, label: currentContent.preferences },
    { id: "security", icon: Lock, label: currentContent.security },
    { id: "bookings", icon: Calendar, label: currentContent.bookingHistory },
    { id: "saved", icon: Bookmark, label: currentContent.savedProviders },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {currentContent.profile}
          </h1>
          {activeSection === "personal" && (
            <div className="flex items-center space-x-3">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    {currentContent.cancel}
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    {currentContent.saveChanges}
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  {currentContent.editProfile}
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <div className="p-6">
                {/* Profile Summary */}
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                      {profileData.fullName.charAt(0)}
                    </div>
                    {isEditing && (
                      <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600">
                        <Camera className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    {profileData.fullName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {profileData.location.area}, {profileData.location.district}
                  </p>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                  {sidebarItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeSection === item.id
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <item.icon className="w-4 h-4 mr-3" />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            </Card>

            {/* Account Stats */}
            <Card className="mt-6">
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  {currentContent.accountStats}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {currentContent.totalBookings}
                    </span>
                    <span className="font-medium">
                      {profileData.stats.totalBookings}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {currentContent.completedBookings}
                    </span>
                    <span className="font-medium">
                      {profileData.stats.completedBookings}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {currentContent.savedProviders}
                    </span>
                    <span className="font-medium">
                      {profileData.stats.savedProviders}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {currentContent.totalSpent}
                    </span>
                    <span className="font-medium">
                      रू {profileData.stats.totalSpent.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Personal Information */}
            {activeSection === "personal" && (
              <Card>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    {currentContent.personalInfo}
                  </h2>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label={currentContent.fullName}
                        value={profileData.fullName}
                        onChange={(e) =>
                          updateProfile("fullName", e.target.value)
                        }
                        disabled={!isEditing}
                        icon={<User className="w-4 h-4" />}
                      />
                      <Input
                        label={currentContent.emailAddress}
                        type="email"
                        value={profileData.email}
                        onChange={(e) => updateProfile("email", e.target.value)}
                        disabled={!isEditing}
                        icon={<Mail className="w-4 h-4" />}
                      />
                      <Input
                        label={currentContent.phoneNumber}
                        value={profileData.phone}
                        onChange={(e) => updateProfile("phone", e.target.value)}
                        disabled={!isEditing}
                        icon={<Phone className="w-4 h-4" />}
                      />
                      <Input
                        label={currentContent.location}
                        value={`${profileData.location.area}, ${profileData.location.district}`}
                        disabled={!isEditing}
                        icon={<MapPin className="w-4 h-4" />}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {currentContent.bio}
                      </label>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                        rows={3}
                        value={profileData.bio}
                        onChange={(e) => updateProfile("bio", e.target.value)}
                        disabled={!isEditing}
                        placeholder="आफ्नो बारेमा केही बताउनुहोस्..."
                      />
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Preferences */}
            {activeSection === "preferences" && (
              <div className="space-y-6">
                <Card>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                      {currentContent.notifications}
                    </h2>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {currentContent.emailNotifications}
                          </h3>
                          <p className="text-sm text-gray-500">
                            नयाँ बुकिङ र अपडेटहरूको बारेमा इमेल पाउनुहोस्
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={profileData.preferences.notifications.email}
                          onChange={(e) =>
                            updateProfile("preferences", {
                              ...profileData.preferences,
                              notifications: {
                                ...profileData.preferences.notifications,
                                email: e.target.checked,
                              },
                            })
                          }
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {currentContent.smsNotifications}
                          </h3>
                          <p className="text-sm text-gray-500">
                            महत्वपूर्ण अपडेटहरूको लागि SMS पाउनुहोस्
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={profileData.preferences.notifications.sms}
                          onChange={(e) =>
                            updateProfile("preferences", {
                              ...profileData.preferences,
                              notifications: {
                                ...profileData.preferences.notifications,
                                sms: e.target.checked,
                              },
                            })
                          }
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {currentContent.pushNotifications}
                          </h3>
                          <p className="text-sm text-gray-500">
                            ब्राउजर नोटिफिकेसन पाउनुहोस्
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={profileData.preferences.notifications.push}
                          onChange={(e) =>
                            updateProfile("preferences", {
                              ...profileData.preferences,
                              notifications: {
                                ...profileData.preferences.notifications,
                                push: e.target.checked,
                              },
                            })
                          }
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                      {currentContent.priceRange}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="न्यूनतम मूल्य (रू)"
                        type="number"
                        value={profileData.preferences.priceRange.min}
                        onChange={(e) =>
                          updateProfile("preferences", {
                            ...profileData.preferences,
                            priceRange: {
                              ...profileData.preferences.priceRange,
                              min: parseInt(e.target.value),
                            },
                          })
                        }
                      />
                      <Input
                        label="अधिकतम मूल्य (रू)"
                        type="number"
                        value={profileData.preferences.priceRange.max}
                        onChange={(e) =>
                          updateProfile("preferences", {
                            ...profileData.preferences,
                            priceRange: {
                              ...profileData.preferences.priceRange,
                              max: parseInt(e.target.value),
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Security */}
            {activeSection === "security" && (
              <div className="space-y-6">
                <Card>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                      {currentContent.changePassword}
                    </h2>

                    <div className="space-y-4 max-w-md">
                      <Input
                        label={currentContent.currentPassword}
                        type="password"
                        icon={<Lock className="w-4 h-4" />}
                      />
                      <Input
                        label={currentContent.newPassword}
                        type="password"
                        icon={<Lock className="w-4 h-4" />}
                      />
                      <Input
                        label={currentContent.confirmPassword}
                        type="password"
                        icon={<Lock className="w-4 h-4" />}
                      />
                      <Button>Update Password</Button>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                      {currentContent.paymentMethods}
                    </h2>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <CreditCard className="w-6 h-6 text-gray-400 mr-3" />
                          <div>
                            <div className="font-medium">
                              **** **** **** 1234
                            </div>
                            <div className="text-sm text-gray-500">
                              Expires 12/25
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Remove
                        </Button>
                      </div>

                      <Button variant="outline" className="w-full">
                        <CreditCard className="w-4 h-4 mr-2" />
                        {currentContent.addPaymentMethod}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Booking History Placeholder */}
            {activeSection === "bookings" && (
              <Card>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    {currentContent.bookingHistory}
                  </h2>
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Booking history will be displayed here
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Saved Providers Placeholder */}
            {activeSection === "saved" && (
              <Card>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    {currentContent.savedProviders}
                  </h2>
                  <div className="text-center py-12">
                    <Bookmark className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Saved providers will be displayed here
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
