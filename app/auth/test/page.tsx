"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function AuthTestPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Auth Test</h1>

        {session ? (
          <div className="text-center space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <p className="text-green-800 font-medium">
                ✓ Signed in successfully!
              </p>
            </div>

            <div className="text-left bg-gray-50 rounded-md p-4">
              <h3 className="font-medium text-gray-900 mb-2">Session Data:</h3>
              <div className="text-sm space-y-1">
                <p>
                  <strong>Name:</strong> {session.user?.name || "N/A"}
                </p>
                <p>
                  <strong>Email:</strong> {session.user?.email || "N/A"}
                </p>
                <p>
                  <strong>Image:</strong> {session.user?.image ? "Yes" : "No"}
                </p>
              </div>
            </div>

            <Button
              onClick={() => signOut()}
              className="w-full"
              variant="outline"
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <p className="text-yellow-800 text-sm">
                ⚠️ OAuth providers need valid credentials to work. For testing,
                you can simulate sign in.
              </p>
            </div>

            <div className="space-y-2">
              <Button
                onClick={() => signIn("google")}
                className="w-full"
                disabled
              >
                Sign in with Google (Needs Config)
              </Button>

              <Button
                onClick={() => signIn("facebook")}
                className="w-full"
                disabled
              >
                Sign in with Facebook (Needs Config)
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                To enable OAuth, add your credentials to .env.local
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t">
          <p className="text-xs text-gray-500 text-center">
            NextAuth Status: {status}
          </p>
        </div>
      </Card>
    </div>
  );
}
