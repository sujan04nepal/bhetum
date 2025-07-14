"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  MessageSquare,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

interface BookingFormProps {
  provider: {
    name: string;
    service: string;
    price: string;
    image: string;
    rating: number;
    location: string;
  };
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
}

export default function BookingForm({
  provider,
  onSubmit,
  onCancel,
}: BookingFormProps) {
  const [formData, setFormData] = useState({
    // Service Details
    serviceDate: "",
    serviceTime: "",
    duration: "1",

    // Contact Information
    fullName: "",
    phone: "",
    email: "",

    // Service Location
    address: "",
    landmark: "",
    city: "",

    // Additional Information
    serviceDetails: "",
    specialRequests: "",

    // Payment
    paymentMethod: "cash",
    totalAmount: 0,
  });

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
  ];

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateTotal = () => {
    const hourlyRate = parseInt(provider.price.replace(/[^\d]/g, ""));
    const duration = parseFloat(formData.duration);
    return hourlyRate * duration;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = calculateTotal();
    const bookingData = {
      ...formData,
      totalAmount: total,
      provider: provider,
    };
    onSubmit?.(bookingData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Provider Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-4">
            <span className="text-4xl">{provider.image}</span>
            <div>
              <h2 className="text-2xl font-bold">{provider.name}</h2>
              <p className="text-gray-600">{provider.service}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-yellow-400">★</span>
                <span>{provider.rating}</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-500">{provider.location}</span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Service Scheduling */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              सेवाको मिति र समय
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  मिति चयन गर्नुहोस् *
                </label>
                <Input
                  type="date"
                  value={formData.serviceDate}
                  onChange={(e) =>
                    updateFormData("serviceDate", e.target.value)
                  }
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  समय चयन गर्नुहोस् *
                </label>
                <select
                  value={formData.serviceTime}
                  onChange={(e) =>
                    updateFormData("serviceTime", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  required
                >
                  <option value="">समय छान्नुहोस्</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                अवधि (घण्टामा) *
              </label>
              <select
                value={formData.duration}
                onChange={(e) => updateFormData("duration", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="0.5">३० मिनेट</option>
                <option value="1">१ घण्टा</option>
                <option value="1.5">१.५ घण्टा</option>
                <option value="2">२ घण्टा</option>
                <option value="3">३ घण्टा</option>
                <option value="4">४ घण्टा</option>
                <option value="8">पूरा दिन (८ घण्टा)</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              सम्पर्क विवरण
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  पूरा नाम *
                </label>
                <Input
                  type="text"
                  placeholder="तपाईंको नाम"
                  value={formData.fullName}
                  onChange={(e) => updateFormData("fullName", e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  फोन नम्बर *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="tel"
                    placeholder="98********"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                इमेल ठेगाना
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              सेवाको स्थान
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                पूरा ठेगाना *
              </label>
              <Input
                type="text"
                placeholder="जस्तै: घर नं. १२३, तीनकुने चोक"
                value={formData.address}
                onChange={(e) => updateFormData("address", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  नजिकको चिन्ह
                </label>
                <Input
                  type="text"
                  placeholder="जस्तै: बानेश्वर टेम्पल नजिक"
                  value={formData.landmark}
                  onChange={(e) => updateFormData("landmark", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  शहर *
                </label>
                <Input
                  type="text"
                  placeholder="काठमाडौं"
                  value={formData.city}
                  onChange={(e) => updateFormData("city", e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              सेवा विवरण
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                के काम गर्नुपर्छ? *
              </label>
              <textarea
                rows={3}
                placeholder="कृपया विस्तारमा भन्नुहोस् के काम गर्नुपर्छ..."
                value={formData.serviceDetails}
                onChange={(e) =>
                  updateFormData("serviceDetails", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                विशेष आवश्यकताहरू (वैकल्पिक)
              </label>
              <textarea
                rows={2}
                placeholder="कुनै विशेष आवश्यकता वा निर्देशन..."
                value={formData.specialRequests}
                onChange={(e) =>
                  updateFormData("specialRequests", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              भुक्तानी विवरण
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                भुक्तानी विधि
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={formData.paymentMethod === "cash"}
                    onChange={(e) =>
                      updateFormData("paymentMethod", e.target.value)
                    }
                    className="mr-2"
                  />
                  नगद भुक्तानी
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={formData.paymentMethod === "online"}
                    onChange={(e) =>
                      updateFormData("paymentMethod", e.target.value)
                    }
                    className="mr-2"
                  />
                  अनलाइन भुक्तानी
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="esewa"
                    checked={formData.paymentMethod === "esewa"}
                    onChange={(e) =>
                      updateFormData("paymentMethod", e.target.value)
                    }
                    className="mr-2"
                  />
                  eSewa
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="khalti"
                    checked={formData.paymentMethod === "khalti"}
                    onChange={(e) =>
                      updateFormData("paymentMethod", e.target.value)
                    }
                    className="mr-2"
                  />
                  Khalti
                </label>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">लागत विवरण</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>सेवा दर ({formData.duration} घण्टा)</span>
                  <span>रू {calculateTotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span>प्लेटफर्म शुल्क</span>
                  <span>रू {Math.round(calculateTotal() * 0.05)}</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>कुल रकम</span>
                  <span>
                    रू {calculateTotal() + Math.round(calculateTotal() * 0.05)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-6">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onCancel}
          >
            रद्द गर्नुहोस्
          </Button>
          <Button type="submit" className="flex-1 btn-vibrant">
            बुकिङ पुष्टि ���र्नुहोस् 🚀
          </Button>
        </div>
      </form>
    </div>
  );
}
