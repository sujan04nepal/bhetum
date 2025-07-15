"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  DEFAULT_COMMISSION_SETTINGS,
  NEPAL_PAYMENT_METHODS,
  RevenueTracker,
  type CommissionSettings as CommissionSettingsType,
} from "@/lib/payments/nepal-payments";
import {
  Save,
  RefreshCw,
  TrendingUp,
  DollarSign,
  Percent,
  Clock,
  Calculator,
  Info,
  AlertTriangle,
} from "lucide-react";

// Mock revenue data for demonstration
const mockTransactions = [
  {
    id: "1",
    bookingId: "B001",
    providerId: "P001",
    seekerId: "S001",
    amount: 5000,
    platformFee: 750,
    providerEarnings: 4175,
    paymentMethod: "esewa",
    status: "completed" as const,
    transactionRef: "ESW123",
    createdAt: "2024-01-15T10:00:00Z",
    completedAt: "2024-01-15T10:05:00Z",
  },
  {
    id: "2",
    bookingId: "B002",
    providerId: "P002",
    seekerId: "S002",
    amount: 3000,
    platformFee: 450,
    providerEarnings: 2496,
    paymentMethod: "khalti",
    status: "completed" as const,
    transactionRef: "KHL456",
    createdAt: "2024-01-16T14:30:00Z",
    completedAt: "2024-01-16T14:32:00Z",
  },
  {
    id: "3",
    bookingId: "B003",
    providerId: "P003",
    seekerId: "S003",
    amount: 8000,
    platformFee: 1200,
    providerEarnings: 6704,
    paymentMethod: "cash",
    status: "completed" as const,
    transactionRef: "CASH789",
    createdAt: "2024-01-17T09:15:00Z",
    completedAt: "2024-01-17T16:00:00Z",
  },
];

export default function CommissionSettings() {
  const { t } = useLanguage();
  const [settings, setSettings] = useState<CommissionSettingsType>(
    DEFAULT_COMMISSION_SETTINGS,
  );
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const revenueData = RevenueTracker.calculatePlatformRevenue(mockTransactions);
  const revenueByMethod =
    RevenueTracker.getRevenueByPaymentMethod(mockTransactions);

  const handleSettingChange = (
    key: keyof CommissionSettingsType,
    value: any,
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handlePaymentFeeChange = (method: string, fee: number) => {
    setSettings((prev) => ({
      ...prev,
      paymentGatewayFees: {
        ...prev.paymentGatewayFees,
        [method]: fee,
      },
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Here you would save to your backend/database
      console.log("Saving commission settings:", settings);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setHasChanges(false);
      alert("Commission settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setSettings(DEFAULT_COMMISSION_SETTINGS);
    setHasChanges(true);
  };

  const calculateImpact = () => {
    // Calculate impact of current settings on revenue
    const totalVolume = revenueData.totalVolume;
    const currentRevenue = (totalVolume * settings.serviceCommission) / 100;
    const defaultRevenue =
      (totalVolume * DEFAULT_COMMISSION_SETTINGS.serviceCommission) / 100;
    const impact = currentRevenue - defaultRevenue;

    return {
      currentRevenue,
      defaultRevenue,
      impact,
      impactPercentage:
        defaultRevenue > 0 ? (impact / defaultRevenue) * 100 : 0,
    };
  };

  const impact = calculateImpact();

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {t("admin.commissionSettings")}
            </h1>
            <p className="text-gray-600 mt-1">
              Manage platform commission rates and payment gateway fees
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handleReset} disabled={isSaving}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset to Default
            </Button>
            <Button onClick={handleSave} disabled={!hasChanges || isSaving}>
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        {/* Revenue Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Platform Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  Rs {revenueData.totalRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Volume
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  Rs {revenueData.totalVolume.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Percent className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Platform Margin
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {revenueData.platformMargin.toFixed(1)}%
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Calculator className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Transactions
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {revenueData.transactionCount}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Commission Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Platform Commission Settings
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* Service Commission */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Commission Rate (%)
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    min="0"
                    max="50"
                    step="0.5"
                    value={settings.serviceCommission}
                    onChange={(e) =>
                      handleSettingChange(
                        "serviceCommission",
                        parseFloat(e.target.value) || 0,
                      )
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-500">%</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Commission charged on each completed service
                </p>
              </div>

              {/* Minimum Payout */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Payout Amount (Rs)
                </label>
                <input
                  type="number"
                  min="100"
                  step="100"
                  value={settings.minimumPayout}
                  onChange={(e) =>
                    handleSettingChange(
                      "minimumPayout",
                      parseFloat(e.target.value) || 0,
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-600 mt-1">
                  Minimum amount before providers can request payout
                </p>
              </div>

              {/* Payout Schedule */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payout Schedule
                </label>
                <select
                  value={settings.payoutSchedule}
                  onChange={(e) =>
                    handleSettingChange("payoutSchedule", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
                <p className="text-xs text-gray-600 mt-1">
                  How often payouts are processed
                </p>
              </div>
            </div>

            {/* Impact Calculator */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
                <Calculator className="h-5 w-5 mr-2" />
                Revenue Impact
              </h4>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Current Settings Revenue:
                  </span>
                  <span className="font-medium">
                    Rs {impact.currentRevenue.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Default Settings Revenue:
                  </span>
                  <span className="text-gray-900">
                    Rs {impact.defaultRevenue.toLocaleString()}
                  </span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    Impact:
                  </span>
                  <span
                    className={`font-bold ${impact.impact >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {impact.impact >= 0 ? "+" : ""}Rs{" "}
                    {impact.impact.toLocaleString()}
                    {Math.abs(impact.impactPercentage) > 0.01 && (
                      <span className="text-xs ml-1">
                        ({impact.impactPercentage >= 0 ? "+" : ""}
                        {impact.impactPercentage.toFixed(1)}%)
                      </span>
                    )}
                  </span>
                </div>
              </div>

              {Math.abs(impact.impactPercentage) > 20 && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <div className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 mr-2" />
                    <div className="text-xs text-yellow-700">
                      <strong>High Impact:</strong> This change will
                      significantly affect platform revenue.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Payment Gateway Fees */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Payment Gateway Fees
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NEPAL_PAYMENT_METHODS.filter(
              (method) => method.type === "digital",
            ).map((method) => (
              <div
                key={method.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">{method.icon}</span>
                  <div>
                    <h4 className="font-medium text-gray-900">{method.name}</h4>
                    <p className="text-xs text-gray-600">
                      {method.description}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transaction Fee (%)
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      value={
                        settings.paymentGatewayFees[
                          method.id as keyof typeof settings.paymentGatewayFees
                        ] || 0
                      }
                      onChange={(e) =>
                        handlePaymentFeeChange(
                          method.id,
                          parseFloat(e.target.value) || 0,
                        )
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-500">%</span>
                  </div>
                </div>

                {/* Revenue from this method */}
                {revenueByMethod[method.id] && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="text-xs text-gray-600">
                      <div className="flex justify-between">
                        <span>Transactions:</span>
                        <span>{revenueByMethod[method.id].count}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Volume:</span>
                        <span>
                          Rs{" "}
                          {revenueByMethod[method.id].volume.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Revenue:</span>
                        <span>
                          Rs{" "}
                          {revenueByMethod[method.id].revenue.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Save Changes Banner */}
        {hasChanges && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <Card className="px-6 py-4 bg-blue-50 border-blue-200">
              <div className="flex items-center space-x-4">
                <Info className="h-5 w-5 text-blue-600" />
                <span className="text-blue-900 font-medium">
                  You have unsaved changes
                </span>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={handleReset}>
                    Discard
                  </Button>
                  <Button size="sm" onClick={handleSave} disabled={isSaving}>
                    Save Changes
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
