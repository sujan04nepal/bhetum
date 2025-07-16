"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { signIn, user, loading: authLoading } = useAuth();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError(
        language === "ne"
          ? "सबै फिल्डहरू भर्नुहोस्"
          : "Please fill in all fields",
      );
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const { user: authUser, error: authError } = await signIn(email, password);

    if (authError) {
      setError(
        authError.message === "Invalid login credentials"
          ? language === "ne"
            ? "गलत इमेल वा पासवर्ड"
            : "Invalid email or password"
          : authError.message,
      );
    } else if (authUser) {
      setSuccess(
        language === "ne" ? "सफलतापूर्वक लगइन भयो!" : "Login successful!",
      );
      // Navigation will be handled by the useEffect hook
    }

    setLoading(false);
  };

  const handleForgotPassword = () => {
    router.push("/auth/forgot-password");
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
              {language === "ne" ? "लगइन गर्नुहोस्" : "Sign In"}
            </h1>
            <p className="mt-2 text-gray-600">
              {language === "ne"
                ? "आफ्नो खातामा पहुँच गर्नुहोस्"
                : "Access your account"}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={
                      language === "ne"
                        ? "आफ्नो पासवर्ड प्रविष्ट गर्नुहोस्"
                        : "Enter your password"
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

              {/* Forgot Password Link */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-blue-600 hover:text-blue-500"
                  disabled={loading}
                >
                  {language === "ne"
                    ? "पासवर्ड बिर्सनुभयो?"
                    : "Forgot your password?"}
                </button>
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
                    {language === "ne" ? "लगइन गर्दै..." : "Signing in..."}
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    {language === "ne" ? "लगइन गर्नुहोस्" : "Sign In"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </div>
                )}
              </Button>
            </form>

            {/* Social Login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    {language === "ne" ? "वा" : "or"}
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3">
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={loading}
                  onClick={() => {
                    // TODO: Implement Google OAuth
                    setError(
                      language === "ne"
                        ? "Google लगइन जल्दै आउँदैछ"
                        : "Google login coming soon",
                    );
                  }}
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  {language === "ne"
                    ? "Google सँग लगइन गर्नुहोस्"
                    : "Continue with Google"}
                </Button>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {language === "ne" ? "खाता छैन?" : "Don't have an account?"}{" "}
                <Link
                  href="/auth/register"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  {language === "ne" ? "यहाँ दर्ता गर्नुहोस्" : "Sign up here"}
                </Link>
              </p>
            </div>
          </Card>

          {/* Quick Links */}
          <div className="mt-8 text-center">
            <div className="flex justify-center space-x-6 text-sm">
              <Link href="/help" className="text-gray-600 hover:text-gray-900">
                {language === "ne" ? "सहायता" : "Help"}
              </Link>
              <Link
                href="/privacy"
                className="text-gray-600 hover:text-gray-900"
              >
                {language === "ne" ? "गोपनीयता" : "Privacy"}
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-gray-900">
                {language === "ne" ? "नियमहरू" : "Terms"}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
