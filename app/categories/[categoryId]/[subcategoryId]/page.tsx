import Link from "next/link";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import { SubcategoryClient } from "./SubcategoryClient";

interface SubcategoryPageProps {
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

export default function SubcategoryDetailPage({
  params,
}: SubcategoryPageProps) {
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

  return <SubcategoryClient category={category} subcategory={subcategory} />;
}
