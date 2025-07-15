"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Settings,
  User,
  Bell,
  Shield,
  Globe,
  CreditCard,
  HelpCircle,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

export default function SettingsPage() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("general");
  const [showPassword, setShowPassword] = useState(false);

  const content = {
    ne: {
      title: "सेटिङहरू",
      subtitle: "आफ्नो खाता र प्राथमिकताहरू व्यवस्थापन गर्नुहोस्",
      tabs: {
        general: "सामान्य",
        notifications: "सूचनाहरू",
        privacy: "गोपनीयता",
        billing: "बिलिङ",
        help: "सहायता",
      },
      profile: {
        title: "प्रोफाइल जानकारी",
        fullName: "पूरा नाम",
        email: "इमेल ठेगाना",
        phone: "फोन नम्बर",
        location: "स्थान",
        language: "भाषा",
        timezone: "समय क्षेत्र",
        saveChanges: "परिवर्तनहरू सेभ गर्नुहोस्",
      },
      security: {
        title: "सुरक्षा सेटिङहरू",
        currentPassword: "हालको पासवर्ड",
        newPassword: "नयाँ पासवर्ड",
        confirmPassword: "पासवर्ड पुष्टि गर्नुहोस्",
        twoFactor: "दुई-चरणीय प्रमाणीकरण",
        enableTwoFactor: "दुई-चरणीय प्रमाणीकरण सक्षम गर्नुहोस्",
        changePassword: "पासवर्ड परिवर्तन गर्नुहोस्",
      },
      notifications: {
        title: "सूचना प्राथमिकताहरू",
        emailNotifications: "इमेल सूचनाहरू",
        pushNotifications: "पुश सूचनाहरू",
        smsNotifications: "SMS सूचनाहरू",
        bookingUpdates: "बुकिङ अपडेटहरू",
        promotions: "प्रमोसनहरू",
        newMessages: "नयाँ सन्देशहरू",
        serviceReminders: "सेवा रिमाइन्डरहरू",
      },
      privacy: {
        title: "गोपनीयता सेटिङहरू",
        profileVisibility: "प्रोफाइल दृश्यता",
        public: "सार्वजनिक",
        private: "निजी",
        showOnlineStatus: "अनलाइन स्थिति देखाउनुहोस्",
        allowMessages: "सन्देशहरूलाई अनुमति दिनुहोस्",
        showLocation: "स्थान देखाउनुहोस्",
      },
    },
    en: {
      title: "Settings",
      subtitle: "Manage your account and preferences",
      tabs: {
        general: "General",
        notifications: "Notifications",
        privacy: "Privacy",
        billing: "Billing",
        help: "Help",
      },
      profile: {
        title: "Profile Information",
        fullName: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        location: "Location",
        language: "Language",
        timezone: "Timezone",
        saveChanges: "Save Changes",
      },
      security: {
        title: "Security Settings",
        currentPassword: "Current Password",
        newPassword: "New Password",
        confirmPassword: "Confirm Password",
        twoFactor: "Two-Factor Authentication",
        enableTwoFactor: "Enable Two-Factor Authentication",
        changePassword: "Change Password",
      },
      notifications: {
        title: "Notification Preferences",
        emailNotifications: "Email Notifications",
        pushNotifications: "Push Notifications",
        smsNotifications: "SMS Notifications",
        bookingUpdates: "Booking Updates",
        promotions: "Promotions",
        newMessages: "New Messages",
        serviceReminders: "Service Reminders",
      },
      privacy: {
        title: "Privacy Settings",
        profileVisibility: "Profile Visibility",
        public: "Public",
        private: "Private",
        showOnlineStatus: "Show Online Status",
        allowMessages: "Allow Messages",
        showLocation: "Show Location",
      },
    },
  };

  const currentContent = content[language];

  const tabs = [
    { id: "general", name: currentContent.tabs.general, icon: User },
    {
      id: "notifications",
      name: currentContent.tabs.notifications,
      icon: Bell,
    },
    { id: "privacy", name: currentContent.tabs.privacy, icon: Shield },
    { id: "billing", name: currentContent.tabs.billing, icon: CreditCard },
    { id: "help", name: currentContent.tabs.help, icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Settings className="h-8 w-8 mr-3" />
            {currentContent.title}
          </h1>
          <p className="text-gray-600 mt-2">{currentContent.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-left transition-colors ${
                        activeTab === tab.id
                          ? "bg-primary-50 text-primary-600 border-r-2 border-primary-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <tab.icon className="h-5 w-5 mr-3" />
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "general" && (
              <Card>
                <CardHeader>
                  <CardTitle>{currentContent.profile.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {currentContent.profile.fullName}
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                        defaultValue="Sujan Nepal"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {currentContent.profile.email}
                      </label>
                      <input
                        type="email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                        defaultValue="sujan@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {currentContent.profile.phone}
                      </label>
                      <input
                        type="tel"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                        defaultValue="+977-9800000000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {currentContent.profile.location}
                      </label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500">
                        <option>Kathmandu, Nepal</option>
                        <option>Pokhara, Nepal</option>
                        <option>Chitwan, Nepal</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {currentContent.profile.language}
                      </label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500">
                        <option>नेपाली (Nepali)</option>
                        <option>English</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {currentContent.profile.timezone}
                      </label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500">
                        <option>Asia/Kathmandu</option>
                      </select>
                    </div>
                  </div>

                  {/* Security Section */}
                  <div className="pt-6 border-t">
                    <h3 className="text-lg font-semibold mb-4">
                      {currentContent.security.title}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {currentContent.security.currentPassword}
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 pr-10"
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <Smartphone className="h-5 w-5 text-blue-600 mr-3" />
                          <div>
                            <p className="font-medium">
                              {currentContent.security.twoFactor}
                            </p>
                            <p className="text-sm text-gray-600">
                              {currentContent.security.enableTwoFactor}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Enable
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full md:w-auto">
                    {currentContent.profile.saveChanges}
                  </Button>
                </CardContent>
              </Card>
            )}

            {activeTab === "notifications" && (
              <Card>
                <CardHeader>
                  <CardTitle>{currentContent.notifications.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {[
                      {
                        key: "email",
                        label: currentContent.notifications.emailNotifications,
                        icon: Mail,
                      },
                      {
                        key: "push",
                        label: currentContent.notifications.pushNotifications,
                        icon: Bell,
                      },
                      {
                        key: "sms",
                        label: currentContent.notifications.smsNotifications,
                        icon: Smartphone,
                      },
                    ].map((type) => (
                      <div key={type.key} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <type.icon className="h-5 w-5 text-blue-600 mr-3" />
                            <h3 className="font-medium">{type.label}</h3>
                          </div>
                        </div>
                        <div className="space-y-3 ml-8">
                          {[
                            currentContent.notifications.bookingUpdates,
                            currentContent.notifications.newMessages,
                            currentContent.notifications.serviceReminders,
                            currentContent.notifications.promotions,
                          ].map((item, index) => (
                            <label
                              key={index}
                              className="flex items-center cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                defaultChecked={index < 3}
                              />
                              <span className="ml-3 text-sm text-gray-700">
                                {item}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button>Save Preferences</Button>
                </CardContent>
              </Card>
            )}

            {activeTab === "privacy" && (
              <Card>
                <CardHeader>
                  <CardTitle>{currentContent.privacy.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">
                          {currentContent.privacy.profileVisibility}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Control who can see your profile
                        </p>
                      </div>
                      <select className="border border-gray-300 rounded-lg px-3 py-2">
                        <option>{currentContent.privacy.public}</option>
                        <option>{currentContent.privacy.private}</option>
                      </select>
                    </div>

                    {[
                      currentContent.privacy.showOnlineStatus,
                      currentContent.privacy.allowMessages,
                      currentContent.privacy.showLocation,
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div>
                          <h3 className="font-medium">{item}</h3>
                        </div>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only"
                            defaultChecked={index === 1}
                          />
                          <div className="relative">
                            <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
                            <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                  <Button>Save Settings</Button>
                </CardContent>
              </Card>
            )}

            {activeTab === "billing" && (
              <Card>
                <CardHeader>
                  <CardTitle>Billing & Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">
                    Manage your payment methods and billing information.
                  </p>
                  <div className="text-center py-12">
                    <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No payment methods added
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Add a payment method to start booking services.
                    </p>
                    <Button>Add Payment Method</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "help" && (
              <Card>
                <CardHeader>
                  <CardTitle>Help & Support</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex-col">
                      <HelpCircle className="h-6 w-6 mb-2" />
                      Help Center
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Mail className="h-6 w-6 mb-2" />
                      Contact Support
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Globe className="h-6 w-6 mb-2" />
                      Community Forum
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Bell className="h-6 w-6 mb-2" />
                      Report Issue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
