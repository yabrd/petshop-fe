// src/components/Fragments/CategoryCard.tsx
import type { Category } from "../../../types/categoryTypes";
import { EmptyState } from "../../ui/EmptyState";

type CategoryCardProps = {
  category?: Category;
  onEdit?: () => void;
  onDelete?: () => void;
  isEmptyState?: boolean;
};

export const CategoryCard = ({
  category,
  onEdit = () => {},
  onDelete = () => {},
  isEmptyState = false,
}: CategoryCardProps) => {
  if (isEmptyState) {
    return <EmptyState dataName="Kategori Produk" />;
  }

  if (!category) return null;

  return (
    <div className="flex h-40 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md dark:shadow-lg dark:hover:shadow-xl border border-gray-200 dark:border-gray-600 overflow-hidden transition-all duration-200">
      <div className="w-1/3 h-full bg-gray-100 dark:bg-gray-600">
        <img
          src={
            category.image ||
            "https://dummyimage.com/400x400/4f4f4f/c9c9c9&text=No+Image"
          }
          alt={category.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src =
              "https://dummyimage.com/400x400/4f4f4f/c9c9c9&text=No+Image";
          }}
        />
      </div>

      <div className="w-2/3 p-3 flex flex-col">
        <h3 className="font-semibold text-gray-800 dark:text-white line-clamp-1">
          {category.name}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2 flex-grow">
          {category.description || "Tidak ada deskripsi"}
        </p>

        <div className="flex space-x-2 mt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="flex-1 px-2 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="flex-1 px-2 py-1.5 border border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:text-red-400 text-xs rounded transition-colors"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};