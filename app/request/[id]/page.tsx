import Link from "next/link";

interface RequestDetailPageProps {
  params: {
    id: string;
  };
}

// Generate static paths for sample request IDs
export function generateStaticParams() {
  // Generate sample request IDs for static generation
  const sampleRequestIds = Array.from({ length: 50 }, (_, i) =>
    (i + 1).toString(),
  );

  return sampleRequestIds.map((id) => ({
    id,
  }));
}

export default function RequestDetailPage({ params }: RequestDetailPageProps) {
  const requestId = params.id;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Service Request Details
          </h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Request ID
              </label>
              <p className="text-lg text-gray-900">{requestId}</p>
            </div>

            <div className="border-t pt-6">
              <p className="text-gray-600 mb-6">
                Service request management is being developed. You'll be able to
                view request details, receive bids from providers, compare
                offers, and manage your service requests here.
              </p>

              <div className="flex space-x-4">
                <Link href="/post-request">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Post New Request
                  </button>
                </Link>
                <Link href="/browse-requests">
                  <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                    Browse Requests
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
