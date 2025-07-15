import dynamic from "next/dynamic";

const MessagesContent = dynamic(() => import("./MessagesContent"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">💬</div>
        <div className="text-xl font-semibold text-gray-600">
          Loading messages...
        </div>
      </div>
    </div>
  ),
});

export default function MessagesPage() {
  return <MessagesContent />;
}
