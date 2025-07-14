"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowLeft,
  Users,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function SignUpPage() {
  const [step, setStep] = useState(1); // 1: Role Selection, 2: Account Details
  const [selectedRole, setSelectedRole] = useState<
    "seeker" | "provider" | null
  >(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleRoleSelect = (role: "seeker" | "provider") => {
    setSelectedRole(role);
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Handle sign up logic here
    console.log("Sign up:", { ...formData, role: selectedRole, agreeToTerms });
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        </div>

        <div className="relative w-full max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to ServiceConnect
          </Link>

          <Card className="p-8 backdrop-blur-sm border-white/50">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold gradient-text mb-4">
                Join ServiceConnect! 🚀
              </h1>
              <p className="text-xl text-gray-600">
                Choose how you'd like to get started
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Service Seeker */}
              <div
                className="relative p-8 rounded-2xl border-2 border-transparent bg-gradient-to-br from-blue-50 to-indigo-50 hover:border-blue-300 cursor-pointer transition-all duration-300 hover:scale-105 group"
                onClick={() => handleRoleSelect("seeker")}
              >
                <div className="text-center">
                  <div className="bg-blue-500 p-4 rounded-full w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-700 mb-4">
                    I'm looking for services
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Find trusted professionals for home services, tutoring,
                    creative work, and more!
                  </p>
                  <ul className="text-left space-y-2 text-gray-600">
                    <li>✅ Browse thousands of verified providers</li>
                    <li>✅ Read reviews and compare prices</li>
                    <li>✅ Book services instantly</li>
                    <li>✅ Secure payment protection</li>
                    <li>✅ 24/7 customer support</li>
                  </ul>
                  <Button className="w-full mt-6 bg-blue-500 hover:bg-blue-600">
                    Join as Service Seeker 🔍
                  </Button>
                </div>
              </div>

              {/* Service Provider */}
              <div
                className="relative p-8 rounded-2xl border-2 border-transparent bg-gradient-to-br from-purple-50 to-pink-50 hover:border-purple-300 cursor-pointer transition-all duration-300 hover:scale-105 group"
                onClick={() => handleRoleSelect("provider")}
              >
                <div className="text-center">
                  <div className="bg-purple-500 p-4 rounded-full w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Briefcase className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-purple-700 mb-4">
                    I want to offer services
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Start earning by offering your skills and expertise to
                    customers in your area!
                  </p>
                  <ul className="text-left space-y-2 text-gray-600">
                    <li>✅ Set your own rates and schedule</li>
                    <li>✅ Connect with local customers</li>
                    <li>✅ Build your professional reputation</li>
                    <li>✅ Fast and secure payments</li>
                    <li>✅ Marketing tools and support</li>
                  </ul>
                  <Button className="w-full mt-6 bg-purple-500 hover:bg-purple-600">
                    Join as Service Provider 💼
                  </Button>
                </div>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Sign in here
              </Link>
            </p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
      </div>

      <div className="relative w-full max-w-md">
        <button
          onClick={() => setStep(1)}
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to role selection
        </button>

        <Card className="p-8 backdrop-blur-sm border-white/50">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">
              Joining as a{" "}
              {selectedRole === "seeker"
                ? "Service Seeker"
                : "Service Provider"}
              {selectedRole === "seeker" ? " 🔍" : " 💼"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    updateFormData("confirmPassword", e.target.value)
                  }
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                required
              />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-primary-600 hover:text-primary-700"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-primary-600 hover:text-primary-700"
                >
                  Privacy Policy
                </Link>
              </span>
            </div>

            <Button type="submit" className="w-full btn-vibrant">
              Create Account ✨
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Sign in here
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
