import Link from "next/link";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import { CategoryClient } from "./CategoryClient";

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
}

// Generate static paths for all categories
export function generateStaticParams() {
  return SERVICE_CATEGORIES.map((category) => ({
    categoryId: category.id,
  }));
}

export default function CategorySubcategoriesPage({
  params,
}: CategoryPageProps) {
  // Find the category
  const category = SERVICE_CATEGORIES.find(
    (cat) => cat.id === params.categoryId,
  );

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Category Not Found
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

  return <CategoryClient category={category} />;
}
