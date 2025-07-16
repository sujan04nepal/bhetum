"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Users,
  UserCheck,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useLanguage } from "@/contexts/LanguageContext";

type UserRole = "seeker" | "provider" | null;

export default function SignUpPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { t } = useLanguage();

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
  };

  const handleNext = () => {
    if (step === 1 && role) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          role,
        }),
      });

      if (response.ok) {
        // Redirect to signin page or show a success message
        window.location.href = "/auth/signin";
      } else {
        const { error } = await response.json();
        alert(`Sign up failed: ${error}`);
      }
    } catch (error) {
      console.error("Sign up error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t("auth.signin.backToHome")}
        </Link>

        <Card>
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <span className="text-3xl mr-2">🇳🇵</span>
                <h1 className="text-2xl font-bold text-gray-900">
                  {t("auth.signup.title")}
                </h1>
              </div>
              <p className="text-gray-600">{t("auth.signup.subtitle")}</p>
            </div>

            {/* Step 1: Role Selection */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">
                    {t("auth.signup.chooseRole")}
                  </h2>
                </div>

                <div className="space-y-4">
                  {/* Service Seeker Option */}
                  <div
                    onClick={() => handleRoleSelect("seeker")}
                    className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      role === "seeker"
                        ? "border-primary-500 bg-primary-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            role === "seeker"
                              ? "bg-primary-500 text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <Users className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          {t("auth.signup.roleSeeker")}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          {t("auth.signup.seekerDesc")}
                        </p>
                        <p className="mt-2 text-sm font-medium text-primary-600">
                          {t("auth.signup.findServices")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Service Provider Option */}
                  <div
                    onClick={() => handleRoleSelect("provider")}
                    className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      role === "provider"
                        ? "border-primary-500 bg-primary-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            role === "provider"
                              ? "bg-primary-500 text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <UserCheck className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          {t("auth.signup.roleProvider")}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          {t("auth.signup.providerDesc")}
                        </p>
                        <p className="mt-2 text-sm font-medium text-primary-600">
                          {t("auth.signup.provideServices")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleNext}
                  disabled={!role}
                  className="w-full"
                  size="lg"
                >
                  {t("auth.signup.continue")}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}

            {/* Step 2: Account Details */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <button
                    onClick={handleBack}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <div className="text-sm text-gray-500">
                    {role === "seeker"
                      ? t("auth.signup.roleSeeker")
                      : t("auth.signup.roleProvider")}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <Input
                      label={t("auth.signup.fullName")}
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      required
                      icon={<User className="h-5 w-5" />}
                      placeholder={t("auth.signup.fullName")}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <Input
                      label={t("auth.signin.email")}
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      required
                      icon={<Mail className="h-5 w-5" />}
                      placeholder={t("auth.signin.email")}
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <Input
                      label={t("auth.signin.password")}
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      required
                      icon={<Lock className="h-5 w-5" />}
                      placeholder={t("auth.signin.password")}
                      rightIcon={
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      }
                    />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <Input
                      label={t("auth.signup.confirmPassword")}
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      required
                      icon={<Lock className="h-5 w-5" />}
                      placeholder={t("auth.signup.confirmPassword")}
                      rightIcon={
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      }
                    />
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={(e) =>
                        handleInputChange("agreeTerms", e.target.checked)
                      }
                      className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      required
                    />
                    <div className="ml-2 text-sm text-gray-600">
                      {t("auth.signup.agreeTerms")}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={!formData.agreeTerms}
                  >
                    {t("auth.signup.createAccount")}
                  </Button>
                </form>

                {/* Sign in link */}
                <p className="text-center text-sm text-gray-600">
                  {t("auth.signup.alreadyHaveAccount")}{" "}
                  <Link
                    href="/auth/signin"
                    className="font-medium text-primary-600 hover:text-primary-500"
                  >
                    {t("auth.signup.signIn")}
                  </Link>
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
