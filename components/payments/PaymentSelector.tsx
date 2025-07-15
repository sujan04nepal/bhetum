"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  NEPAL_PAYMENT_METHODS,
  NepalPaymentService,
  type PaymentMethod,
} from "@/lib/payments/nepal-payments";
import {
  CreditCard,
  Smartphone,
  Banknote,
  Info,
  Shield,
  Clock,
} from "lucide-react";

interface PaymentSelectorProps {
  amount: number;
  onPaymentMethodSelect: (method: PaymentMethod, breakdown: any) => void;
  selectedMethod?: string;
}

export function PaymentSelector({
  amount,
  onPaymentMethodSelect,
  selectedMethod,
}: PaymentSelectorProps) {
  const { t } = useLanguage();
  const [paymentService] = useState(new NepalPaymentService());

  const getMethodIcon = (methodId: string) => {
    switch (methodId) {
      case "esewa":
      case "khalti":
      case "ime":
        return <CreditCard className="h-6 w-6" />;
      case "cash":
        return <Banknote className="h-6 w-6" />;
      default:
        return <Smartphone className="h-6 w-6" />;
    }
  };

  const getMethodColor = (methodId: string) => {
    switch (methodId) {
      case "esewa":
        return "border-green-200 bg-green-50 text-green-700";
      case "khalti":
        return "border-purple-200 bg-purple-50 text-purple-700";
      case "ime":
        return "border-blue-200 bg-blue-50 text-blue-700";
      case "cash":
        return "border-gray-200 bg-gray-50 text-gray-700";
      default:
        return "border-gray-200 bg-gray-50 text-gray-700";
    }
  };

  const handleMethodSelect = (method: PaymentMethod) => {
    const breakdown = paymentService.calculatePaymentBreakdown(
      amount,
      method.id,
    );
    onPaymentMethodSelect(method, breakdown);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {t("payment.selectMethod")}
        </h3>
        <p className="text-gray-600">
          Choose your preferred payment method for Rs {amount.toLocaleString()}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {NEPAL_PAYMENT_METHODS.filter((method) => method.enabled).map(
          (method) => {
            const breakdown = paymentService.calculatePaymentBreakdown(
              amount,
              method.id,
            );
            const isSelected = selectedMethod === method.id;

            return (
              <Card
                key={method.id}
                className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  isSelected
                    ? "ring-2 ring-blue-500 border-blue-500"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handleMethodSelect(method)}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`p-2 rounded-md ${getMethodColor(method.id)}`}
                  >
                    {getMethodIcon(method.id)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium text-gray-900">
                        {method.name}
                      </h4>
                      {method.type === "digital" && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Digital
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-gray-600 mb-2">
                      {method.description}
                    </p>

                    <div className="space-y-1 text-xs">
                      <div className="flex items-center text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {method.processingTime}
                      </div>

                      {method.fees > 0 && (
                        <div className="flex items-center text-gray-500">
                          <Info className="h-3 w-3 mr-1" />
                          Fee: {method.fees}% (Rs{" "}
                          {breakdown.paymentGatewayFee.toFixed(2)})
                        </div>
                      )}
                    </div>

                    <div className="mt-3 pt-2 border-t border-gray-100">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">You pay:</span>
                        <span className="font-medium text-gray-900">
                          Rs {breakdown.total.toLocaleString()}
                        </span>
                      </div>
                      {method.id !== "cash" && (
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">
                            Service provider gets:
                          </span>
                          <span className="text-gray-700">
                            Rs {breakdown.providerEarnings.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          },
        )}
      </div>

      {selectedMethod && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-blue-900 mb-1">
                Secure Payment Guarantee
              </h4>
              <p className="text-xs text-blue-700">
                Your payment is protected by our secure payment system.
                {selectedMethod === "cash"
                  ? " Pay only after the service is completed to your satisfaction."
                  : " Your money is held securely until the service is completed."}
              </p>
            </div>
          </div>
        </Card>
      )}

      <div className="text-center">
        <p className="text-xs text-gray-500">
          By proceeding, you agree to our{" "}
          <a href="/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
