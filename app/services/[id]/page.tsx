import Link from "next/link";

interface ServiceDetailPageProps {
  params: {
    id: string;
  };
}

// Generate static paths for sample service IDs
export function generateStaticParams() {
  // Generate sample service IDs for static generation
  const sampleServiceIds = Array.from({ length: 100 }, (_, i) =>
    (i + 1).toString(),
  );

  return sampleServiceIds.map((id) => ({
    id,
  }));
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const serviceId = params.id;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Service Details
          </h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Service ID
              </label>
              <p className="text-lg text-gray-900">{serviceId}</p>
            </div>

            <div className="border-t pt-6">
              <p className="text-gray-600 mb-6">
                Individual service pages are being developed. You'll be able to
                view detailed service information, pricing, provider details,
                availability, customer reviews, and book services directly.
              </p>

              <div className="flex space-x-4">
                <Link href="/find-services">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Find Services
                  </button>
                </Link>
                <Link href="/categories">
                  <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                    Browse Categories
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
