"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  UserCheck,
  Briefcase,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { UserRole } from "@/types/database";

interface FormData {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  agreeToTerms: boolean;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "seeker",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { signUp, user, loading: authLoading } = useAuth();
  const { t, language } = useLanguage();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      const redirectPath =
        user.role === "admin"
          ? "/admin"
          : user.role === "provider"
            ? "/dashboard/provider"
            : "/dashboard/seeker";
      router.push(redirectPath);
    }
  }, [user, authLoading, router]);

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = (): string | null => {
    if (!formData.full_name.trim()) {
      return language === "ne"
        ? "पूरा ना��� आवश्यक छ"
        : "Full name is required";
    }

    if (!formData.email.trim()) {
      return language === "ne" ? "इमेल आवश्यक छ" : "Email is required";
    }

    if (!formData.email.includes("@")) {
      return language === "ne"
        ? "वैध इमेल प्रविष्ट गर्नुहोस्"
        : "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      return language === "ne"
        ? "फोन नम्बर आवश्यक छ"
        : "Phone number is required";
    }

    if (formData.password.length < 6) {
      return language === "ne"
        ? "पासवर्ड कम्तिमा ६ अक्षरको हुनुपर्छ"
        : "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      return language === "ne"
        ? "पासवर्डहरू मेल खाँदैनन्"
        : "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      return language === "ne"
        ? "नियम र सर्तहरू स्वीकार गर्नुहोस्"
        : "Please agree to the terms and conditions";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const { user: authUser, error: authError } = await signUp(
      formData.email,
      formData.password,
      {
        full_name: formData.full_name,
        phone: formData.phone,
        role: formData.role,
      },
    );

    if (authError) {
      if (authError.message.includes("already registered")) {
        setError(
          language === "ne"
            ? "यो इमेल पहिले देखि दर्ता छ"
            : "This email is already registered",
        );
      } else {
        setError(authError.message);
      }
    } else if (authUser) {
      setSuccess(
        language === "ne"
          ? "सफलतापूर्वक दर्ता भयो! कृपया आफ्नो इमेल जाँच गर्नुहोस्।"
          : "Registration successful! Please check your email for verification.",
      );

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    }

    setLoading(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {language === "ne" ? "नयाँ खाता बनाउनुहोस्" : "Create Account"}
            </h1>
            <p className="mt-2 text-gray-600">
              {language === "ne"
                ? "सेवा बजारमा सामेल हुनुहोस्"
                : "Join the service marketplace"}
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-green-700 text-sm">{success}</span>
                </div>
              )}

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {language === "ne" ? "तपाईं के हुनुहुन्छ?" : "What are you?"}
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleInputChange("role", "seeker")}
                    className={`p-4 border-2 rounded-lg text-center transition-all ${
                      formData.role === "seeker"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    disabled={loading}
                  >
                    <UserCheck className="h-8 w-8 mx-auto mb-2" />
                    <div className="font-medium">
                      {language === "ne" ? "ग्राहक" : "Customer"}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {language === "ne"
                        ? "सेवा खोज्दै"
                        : "Looking for services"}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleInputChange("role", "provider")}
                    className={`p-4 border-2 rounded-lg text-center transition-all ${
                      formData.role === "provider"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    disabled={loading}
                  >
                    <Briefcase className="h-8 w-8 mx-auto mb-2" />
                    <div className="font-medium">
                      {language === "ne" ? "सेवा प्रदायक" : "Service Provider"}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {language === "ne"
                        ? "सेवा प्रदान गर्दै"
                        : "Providing services"}
                    </div>
                  </button>
                </div>
              </div>

              {/* Full Name Field */}
              <div>
                <label
                  htmlFor="full_name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {language === "ne" ? "पूरा नाम" : "Full Name"}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="full_name"
                    type="text"
                    value={formData.full_name}
                    onChange={(e) =>
                      handleInputChange("full_name", e.target.value)
                    }
                    placeholder={
                      language === "ne"
                        ? "आफ्नो पूरा नाम प्रविष्ट गर्नुहोस्"
                        : "Enter your full name"
                    }
                    className="pl-10"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {language === "ne" ? "इमेल ठेगाना" : "Email Address"}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder={
                      language === "ne"
                        ? "आफ्नो इमेल प्रविष्ट गर्नुहोस्"
                        : "Enter your email"
                    }
                    className="pl-10"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {language === "ne" ? "फोन नम्बर" : "Phone Number"}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder={
                      language === "ne" ? "+977-98xxxxxxxx" : "+977-98xxxxxxxx"
                    }
                    className="pl-10"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {language === "ne" ? "पासवर्ड" : "Password"}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    placeholder={
                      language === "ne"
                        ? "कम्तिमा ६ अक्षर"
                        : "At least 6 characters"
                    }
                    className="pl-10 pr-10"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 h-5 w-5 text-gray-400 hover:text-gray-600"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {language === "ne"
                    ? "पासवर्ड पुष्टि गर्नुहोस्"
                    : "Confirm Password"}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    placeholder={
                      language === "ne"
                        ? "पासवर्ड दोहोर्याउनुहोस्"
                        : "Repeat your password"
                    }
                    className="pl-10 pr-10"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 h-5 w-5 text-gray-400 hover:text-gray-600"
                    disabled={loading}
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <input
                  id="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) =>
                    handleInputChange("agreeToTerms", e.target.checked)
                  }
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  disabled={loading}
                />
                <label
                  htmlFor="agreeToTerms"
                  className="ml-3 text-sm text-gray-700"
                >
                  {language === "ne" ? (
                    <>
                      म{" "}
                      <Link
                        href="/terms"
                        className="text-blue-600 hover:text-blue-500"
                      >
                        नियम र सर्तहरू
                      </Link>{" "}
                      र{" "}
                      <Link
                        href="/privacy"
                        className="text-blue-600 hover:text-blue-500"
                      >
                        गोपनीयता नीति
                      </Link>{" "}
                      मा सहमत छु।
                    </>
                  ) : (
                    <>
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-blue-600 hover:text-blue-500"
                      >
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-blue-600 hover:text-blue-500"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </>
                  )}
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {language === "ne"
                      ? "दर्ता गर्दै..."
                      : "Creating account..."}
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    {language === "ne" ? "खाता बनाउनुहोस्" : "Create Account"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </div>
                )}
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {language === "ne"
                  ? "पहिले देखि खाता छ?"
                  : "Already have an account?"}{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  {language === "ne" ? "यहाँ लगइन गर्नुहोस्" : "Sign in here"}
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
