import Link from "next/link";

interface BookingDetailPageProps {
  params: {
    id: string;
  };
}

// Generate static paths for sample booking IDs
export function generateStaticParams() {
  // Generate sample booking IDs for static generation
  const sampleBookingIds = Array.from({ length: 50 }, (_, i) =>
    (i + 1).toString(),
  );

  return sampleBookingIds.map((id) => ({
    id,
  }));
}

export default function BookingDetailPage({ params }: BookingDetailPageProps) {
  const bookingId = params.id;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Booking Details
          </h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Booking ID
              </label>
              <p className="text-lg text-gray-900">{bookingId}</p>
            </div>

            <div className="border-t pt-6">
              <p className="text-gray-600 mb-6">
                Booking management system is being developed. You'll be able to
                view booking details, track status, communicate with providers,
                and manage your bookings here.
              </p>

              <div className="flex space-x-4">
                <Link href="/dashboard/seeker">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    View All Bookings
                  </button>
                </Link>
                <Link href="/find-services">
                  <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                    Find Services
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
