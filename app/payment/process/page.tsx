"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PaymentSelector } from "@/components/payments/PaymentSelector";
import {
  NepalPaymentService,
  type PaymentMethod,
} from "@/lib/payments/nepal-payments";
import {
  CheckCircle,
  XCircle,
  Clock,
  ArrowLeft,
  CreditCard,
  Receipt,
  Shield,
} from "lucide-react";

function PaymentProcessPageContent() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [paymentService] = useState(new NepalPaymentService());
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null,
  );
  const [paymentBreakdown, setPaymentBreakdown] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "selecting" | "processing" | "success" | "failed"
  >("selecting");
  const [transactionRef, setTransactionRef] = useState<string>("");

  // Get booking details from URL params
  const bookingId = searchParams.get("bookingId");
  const amount = parseFloat(searchParams.get("amount") || "0");
  const serviceTitle = searchParams.get("service") || "Service";
  const providerName = searchParams.get("provider") || "Provider";

  useEffect(() => {
    if (!bookingId || !amount) {
      router.push("/dashboard");
    }
  }, [bookingId, amount, router]);

  const handlePaymentMethodSelect = (method: PaymentMethod, breakdown: any) => {
    setSelectedMethod(method);
    setPaymentBreakdown(breakdown);
  };

  const handlePaymentProcess = async () => {
    if (!selectedMethod || !paymentBreakdown) return;

    setIsProcessing(true);
    setPaymentStatus("processing");

    try {
      const transaction = {
        bookingId: bookingId!,
        providerId: "provider_id", // This would come from booking data
        seekerId: "current_user_id", // This would come from session
        amount,
        platformFee: paymentBreakdown.platformCommission,
        providerEarnings: paymentBreakdown.providerEarnings,
        paymentMethod: selectedMethod.id,
        status: "pending" as const,
      };

      let result;

      switch (selectedMethod.id) {
        case "esewa":
          result = await paymentService.processESewaPayment(transaction);
          break;
        case "khalti":
          result = await paymentService.processKhaltiPayment(transaction);
          break;
        case "ime":
          result = await paymentService.processIMEPayment(transaction);
          break;
        case "cash":
          result = paymentService.processCashPayment(transaction);
          break;
        default:
          throw new Error("Invalid payment method");
      }

      if (result.success) {
        setTransactionRef(result.transactionRef || "");

        if (selectedMethod.id === "cash") {
          setPaymentStatus("success");
        } else if (result.redirectUrl) {
          // For eSewa, redirect to payment gateway
          window.location.href = result.redirectUrl;
        } else {
          // For other methods, show success
          setPaymentStatus("success");
        }
      } else {
        setPaymentStatus("failed");
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      setPaymentStatus("failed");
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentStatus === "processing") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Processing Payment
          </h2>
          <p className="text-gray-600">
            Please wait while we process your {selectedMethod?.name} payment...
          </p>
        </Card>
      </div>
    );
  }

  if (paymentStatus === "success") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-4">
            {selectedMethod?.id === "cash"
              ? "Your booking is confirmed. Pay in cash when the service is completed."
              : "Your payment has been processed successfully."}
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="font-mono text-gray-900">{transactionRef}</span>
            </div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium text-gray-900">
                Rs {amount.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Method:</span>
              <span className="text-gray-900">{selectedMethod?.name}</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => router.push("/dashboard/bookings")}
              className="w-full"
            >
              <Receipt className="h-4 w-4 mr-2" />
              View Booking Details
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard")}
              className="w-full"
            >
              Go to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (paymentStatus === "failed") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Payment Failed
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't process your payment. Please try again with a different
            payment method.
          </p>

          <div className="space-y-3">
            <Button
              onClick={() => setPaymentStatus("selecting")}
              className="w-full"
            >
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard")}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Complete Payment
          </h1>
          <p className="text-gray-600">
            Secure payment for your service booking
          </p>
        </div>

        {/* Booking Summary */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Booking Summary
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Service:</span>
              <span className="font-medium text-gray-900">{serviceTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Provider:</span>
              <span className="text-gray-900">{providerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Booking ID:</span>
              <span className="font-mono text-gray-900">{bookingId}</span>
            </div>
            <div className="border-t pt-3 flex justify-between">
              <span className="text-lg font-semibold text-gray-900">
                Total Amount:
              </span>
              <span className="text-lg font-bold text-gray-900">
                Rs {amount.toLocaleString()}
              </span>
            </div>
          </div>
        </Card>

        {/* Payment Methods */}
        <Card className="p-6 mb-6">
          <PaymentSelector
            amount={amount}
            onPaymentMethodSelect={handlePaymentMethodSelect}
            selectedMethod={selectedMethod?.id}
          />
        </Card>

        {/* Payment Breakdown */}
        {selectedMethod && paymentBreakdown && (
          <Card className="p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Payment Breakdown
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Service Amount:</span>
                <span className="text-gray-900">
                  Rs {paymentBreakdown.total.toLocaleString()}
                </span>
              </div>

              {selectedMethod.id !== "cash" && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Platform Fee (
                      {NepalPaymentService.prototype.constructor.name}):
                    </span>
                    <span className="text-gray-900">
                      Rs {paymentBreakdown.platformCommission.toFixed(2)}
                    </span>
                  </div>

                  {paymentBreakdown.paymentGatewayFee > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Payment Gateway Fee:
                      </span>
                      <span className="text-gray-900">
                        Rs {paymentBreakdown.paymentGatewayFee.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-600">Provider Earnings:</span>
                    <span className="text-gray-900">
                      Rs {paymentBreakdown.providerEarnings.toFixed(2)}
                    </span>
                  </div>
                </>
              )}

              <div className="border-t pt-3 flex justify-between font-semibold">
                <span className="text-gray-900">Total Payment:</span>
                <span className="text-gray-900">
                  Rs {paymentBreakdown.total.toLocaleString()}
                </span>
              </div>
            </div>
          </Card>
        )}

        {/* Action Button */}
        {selectedMethod && (
          <div className="text-center">
            <Button
              onClick={handlePaymentProcess}
              disabled={isProcessing}
              size="lg"
              className="w-full max-w-md"
            >
              <CreditCard className="h-5 w-5 mr-2" />
              {selectedMethod.id === "cash"
                ? "Confirm Booking (Pay Later)"
                : `Pay with ${selectedMethod.name}`}
            </Button>

            <div className="flex items-center justify-center mt-4 text-sm text-gray-600">
              <Shield className="h-4 w-4 mr-2" />
              Secure payment protected by encryption
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
