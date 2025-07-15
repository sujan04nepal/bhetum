"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AlertTriangle, ArrowLeft } from "lucide-react";

const errorMessages: { [key: string]: string } = {
  Configuration: "There is a problem with the server configuration.",
  AccessDenied: "You do not have permission to sign in.",
  Verification: "The verification token has expired or has already been used.",
  Default: "An error occurred during authentication.",
};

function AuthErrorPageContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessage = error
    ? errorMessages[error] || errorMessages.Default
    : errorMessages.Default;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Authentication Error
          </h1>
          <p className="text-gray-600">There was a problem signing you in</p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
              <p className="text-sm text-red-700">
                <strong>Error:</strong> {errorMessage}
              </p>
              {error && (
                <p className="text-xs text-red-600 mt-2">Error code: {error}</p>
              )}
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                You can try the following:
              </p>

              <div className="text-left bg-gray-50 rounded-md p-4">
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Try signing in again</li>
                  <li>• Use a different sign-in method</li>
                  <li>• Clear your browser cache and cookies</li>
                  <li>• Contact support if the problem persists</li>
                </ul>
              </div>

              <div className="space-y-3 pt-4">
                <Link href="/auth/signin">
                  <Button className="w-full">Try Again</Button>
                </Link>

                <Link href="/">
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Loading...</p>
          </div>
        </div>
      }
    >
      <AuthErrorPageContent />
    </Suspense>
  );
}
