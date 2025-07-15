import dynamic from "next/dynamic";

const ProvidersManagement = dynamic(() => import("./ProvidersManagement"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">👥</div>
        <div className="text-xl font-semibold text-gray-600">
          Loading providers management...
        </div>
      </div>
    </div>
  ),
});

export default function ProvidersPage() {
  return <ProvidersManagement />;
}
