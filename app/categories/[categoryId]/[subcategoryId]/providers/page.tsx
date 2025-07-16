import Link from "next/link";
import { SERVICE_CATEGORIES } from "@/lib/constants";

interface ProvidersListPageProps {
  params: {
    categoryId: string;
    subcategoryId: string;
  };
}

// Generate static paths for all category/subcategory combinations
export function generateStaticParams() {
  const params: { categoryId: string; subcategoryId: string }[] = [];

  SERVICE_CATEGORIES.forEach((category) => {
    category.subcategories.forEach((subcategory) => {
      params.push({
        categoryId: category.id,
        subcategoryId: subcategory.id,
      });
    });
  });

  return params;
}

export default function ProvidersListPage({ params }: ProvidersListPageProps) {
  // Find the category and subcategory
  const category = SERVICE_CATEGORIES.find(
    (cat) => cat.id === params.categoryId,
  );
  const subcategory = category?.subcategories.find(
    (sub) => sub.id === params.subcategoryId,
  );

  if (!category || !subcategory) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Subcategory Not Found
          </h1>
          <Link href="/categories">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Back to Categories
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-8">
          <Link
            href="/categories"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Categories
          </Link>
          <span className="w-4 h-4 text-gray-400">/</span>
          <Link
            href={`/categories/${category.id}`}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            {category.name}
          </Link>
          <span className="w-4 h-4 text-gray-400">/</span>
          <Link
            href={`/categories/${category.id}/${subcategory.id}`}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            {subcategory.name}
          </Link>
          <span className="w-4 h-4 text-gray-400">/</span>
          <span className="text-gray-900">Providers</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {subcategory.name} Providers
          </h1>
          <p className="text-xl text-gray-600">
            Find professional {subcategory.name.toLowerCase()} service providers
            in Nepal
          </p>
        </div>

        {/* Coming Soon Card */}
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Provider Directory Coming Soon
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We're working on building a comprehensive directory of{" "}
            {subcategory.name.toLowerCase()} providers. You'll be able to browse
            profiles, compare ratings, and book services directly.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href={`/categories/${category.id}/${subcategory.id}`}>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                View Category Details
              </button>
            </Link>
            <Link href="/categories">
              <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                Browse All Categories
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
