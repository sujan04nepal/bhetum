import dynamic from "next/dynamic";

const BookingsManagement = dynamic(() => import("./BookingsManagement"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">📅</div>
        <div className="text-xl font-semibold text-gray-600">
          Loading bookings management...
        </div>
      </div>
    </div>
  ),
});

export default function BookingsPage() {
  return <BookingsManagement />;
}
