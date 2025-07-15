// Nepal Payment Integration Service
// Supports eSewa, Khalti, IME Pay, and Cash payments

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  type: "digital" | "cash";
  fees: number; // Percentage
  processingTime: string;
  description: string;
  enabled: boolean;
}

export interface PaymentTransaction {
  id: string;
  bookingId: string;
  providerId: string;
  seekerId: string;
  amount: number;
  platformFee: number;
  providerEarnings: number;
  paymentMethod: string;
  status: "pending" | "processing" | "completed" | "failed" | "refunded";
  transactionRef?: string;
  createdAt: string;
  completedAt?: string;
}

export interface CommissionSettings {
  serviceCommission: number; // Platform commission percentage
  paymentGatewayFees: {
    esewa: number;
    khalti: number;
    ime: number;
  };
  minimumPayout: number;
  payoutSchedule: "daily" | "weekly" | "monthly";
}

// Nepal Payment Methods Configuration
export const NEPAL_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "esewa",
    name: "eSewa",
    icon: "💳",
    type: "digital",
    fees: 1.5, // 1.5% transaction fee
    processingTime: "Instant",
    description: "Pay securely with eSewa digital wallet",
    enabled: true,
  },
  {
    id: "khalti",
    name: "Khalti",
    icon: "🔗",
    type: "digital",
    fees: 1.8, // 1.8% transaction fee
    processingTime: "Instant",
    description: "Pay with Khalti mobile wallet",
    enabled: true,
  },
  {
    id: "ime",
    name: "IME Pay",
    icon: "📱",
    type: "digital",
    fees: 1.2, // 1.2% transaction fee
    processingTime: "Instant",
    description: "IME Pay digital payment",
    enabled: true,
  },
  {
    id: "cash",
    name: "Cash Payment",
    icon: "💸",
    type: "cash",
    fees: 0, // No fees for cash
    processingTime: "On Service Completion",
    description: "Pay in cash when service is completed",
    enabled: true,
  },
];

// Default commission settings for Nepal market
export const DEFAULT_COMMISSION_SETTINGS: CommissionSettings = {
  serviceCommission: 15, // 15% platform commission
  paymentGatewayFees: {
    esewa: 1.5,
    khalti: 1.8,
    ime: 1.2,
  },
  minimumPayout: 1000, // Minimum Rs. 1000 for payout
  payoutSchedule: "weekly",
};

export class NepalPaymentService {
  private commissionSettings: CommissionSettings;

  constructor(settings: CommissionSettings = DEFAULT_COMMISSION_SETTINGS) {
    this.commissionSettings = settings;
  }

  // Calculate payment breakdown
  calculatePaymentBreakdown(amount: number, paymentMethod: string) {
    const method = NEPAL_PAYMENT_METHODS.find((m) => m.id === paymentMethod);
    if (!method) throw new Error("Invalid payment method");

    const platformCommission =
      (amount * this.commissionSettings.serviceCommission) / 100;
    const paymentGatewayFee = (amount * method.fees) / 100;
    const providerEarnings = amount - platformCommission - paymentGatewayFee;

    return {
      total: amount,
      platformCommission,
      paymentGatewayFee,
      providerEarnings,
      method: method.name,
    };
  }

  // Process eSewa payment
  async processESewaPayment(
    transaction: Omit<PaymentTransaction, "id" | "createdAt">,
  ) {
    try {
      // eSewa integration would go here
      // For now, we'll simulate the process

      const paymentData = {
        amount: transaction.amount,
        product_delivery_charge: 0,
        product_service_charge: 0,
        product_code: "SERVICEKHOJ",
        signature: this.generateESewaSignature(transaction),
        signed_field_names: "total_amount,transaction_uuid,product_code",
        transaction_uuid: `TXN_${Date.now()}`,
        total_amount: transaction.amount,
      };

      // This would redirect to eSewa or process via API
      console.log("Processing eSewa payment:", paymentData);

      return {
        success: true,
        transactionRef: paymentData.transaction_uuid,
        redirectUrl: `https://uat.esewa.com.np/epay/main?${new URLSearchParams(paymentData).toString()}`,
      };
    } catch (error) {
      console.error("eSewa payment error:", error);
      return { success: false, error: "Payment processing failed" };
    }
  }

  // Process Khalti payment
  async processKhaltiPayment(
    transaction: Omit<PaymentTransaction, "id" | "createdAt">,
  ) {
    try {
      // Khalti integration would go here
      const paymentData = {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/khalti/callback`,
        website_url: process.env.NEXT_PUBLIC_BASE_URL,
        amount: transaction.amount * 100, // Khalti expects amount in paisa
        purchase_order_id: `ORDER_${Date.now()}`,
        purchase_order_name: "Service Payment",
        customer_info: {
          name: "Customer Name",
          email: "customer@email.com",
        },
      };

      console.log("Processing Khalti payment:", paymentData);

      return {
        success: true,
        transactionRef: paymentData.purchase_order_id,
        paymentData,
      };
    } catch (error) {
      console.error("Khalti payment error:", error);
      return { success: false, error: "Payment processing failed" };
    }
  }

  // Process IME Pay payment
  async processIMEPayment(
    transaction: Omit<PaymentTransaction, "id" | "createdAt">,
  ) {
    try {
      // IME Pay integration would go here
      const paymentData = {
        amount: transaction.amount,
        reference_id: `IME_${Date.now()}`,
        service_name: "Service Payment",
      };

      console.log("Processing IME Pay payment:", paymentData);

      return {
        success: true,
        transactionRef: paymentData.reference_id,
        paymentData,
      };
    } catch (error) {
      console.error("IME Pay payment error:", error);
      return { success: false, error: "Payment processing failed" };
    }
  }

  // Handle cash payment (no processing needed, just record)
  processCashPayment(
    transaction: Omit<PaymentTransaction, "id" | "createdAt">,
  ) {
    return {
      success: true,
      transactionRef: `CASH_${Date.now()}`,
      message: "Cash payment will be collected upon service completion",
    };
  }

  // Generate eSewa signature
  private generateESewaSignature(transaction: any): string {
    // This would implement the actual eSewa signature generation
    // For demo purposes, we'll return a mock signature
    return `esewa_signature_${Date.now()}`;
  }

  // Verify payment callback
  async verifyPayment(paymentMethod: string, callbackData: any) {
    switch (paymentMethod) {
      case "esewa":
        return this.verifyESewaPayment(callbackData);
      case "khalti":
        return this.verifyKhaltiPayment(callbackData);
      case "ime":
        return this.verifyIMEPayment(callbackData);
      default:
        return { success: false, error: "Invalid payment method" };
    }
  }

  private async verifyESewaPayment(data: any) {
    // eSewa verification logic
    return { success: true, verified: true };
  }

  private async verifyKhaltiPayment(data: any) {
    // Khalti verification logic
    return { success: true, verified: true };
  }

  private async verifyIMEPayment(data: any) {
    // IME Pay verification logic
    return { success: true, verified: true };
  }

  // Calculate provider payout
  calculateProviderPayout(transactions: PaymentTransaction[]) {
    const completedTransactions = transactions.filter(
      (t) => t.status === "completed",
    );
    const totalEarnings = completedTransactions.reduce(
      (sum, t) => sum + t.providerEarnings,
      0,
    );

    return {
      totalEarnings,
      transactionCount: completedTransactions.length,
      eligibleForPayout: totalEarnings >= this.commissionSettings.minimumPayout,
      nextPayoutDate: this.getNextPayoutDate(),
    };
  }

  private getNextPayoutDate(): string {
    const now = new Date();
    const schedule = this.commissionSettings.payoutSchedule;

    switch (schedule) {
      case "daily":
        now.setDate(now.getDate() + 1);
        break;
      case "weekly":
        now.setDate(now.getDate() + (7 - now.getDay()));
        break;
      case "monthly":
        now.setMonth(now.getMonth() + 1, 1);
        break;
    }

    return now.toISOString().split("T")[0];
  }
}

// Revenue tracking for platform
export class RevenueTracker {
  static calculatePlatformRevenue(transactions: PaymentTransaction[]) {
    const completedTransactions = transactions.filter(
      (t) => t.status === "completed",
    );

    const totalRevenue = completedTransactions.reduce(
      (sum, t) => sum + t.platformFee,
      0,
    );
    const totalVolume = completedTransactions.reduce(
      (sum, t) => sum + t.amount,
      0,
    );
    const transactionCount = completedTransactions.length;

    return {
      totalRevenue,
      totalVolume,
      transactionCount,
      averageTransactionValue:
        transactionCount > 0 ? totalVolume / transactionCount : 0,
      platformMargin: totalVolume > 0 ? (totalRevenue / totalVolume) * 100 : 0,
    };
  }

  static getRevenueByPaymentMethod(transactions: PaymentTransaction[]) {
    const completedTransactions = transactions.filter(
      (t) => t.status === "completed",
    );
    const methods: {
      [key: string]: { revenue: number; count: number; volume: number };
    } = {};

    completedTransactions.forEach((t) => {
      if (!methods[t.paymentMethod]) {
        methods[t.paymentMethod] = { revenue: 0, count: 0, volume: 0 };
      }
      methods[t.paymentMethod].revenue += t.platformFee;
      methods[t.paymentMethod].count += 1;
      methods[t.paymentMethod].volume += t.amount;
    });

    return methods;
  }
}
