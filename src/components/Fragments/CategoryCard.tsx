// src/components/Fragments/CategoryCard.tsx
import type { Category } from "../../types/categoryTypes";

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
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
        {/* Tambahkan UI empty state di sini */}
        <div className="w-24 h-24 mb-5 text-gray-300 dark:text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-full h-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
          Belum Ada Kategori
        </h3>
        <p className="text-gray-400 dark:text-gray-500 text-sm max-w-xs mx-auto">
          Kategori produk akan muncul di sini setelah Anda membuatnya
        </p>
      </div>
    );
  }

  // Pastikan category ada
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

      {/* Content Section (2/3 width) */}
      <div className="w-2/3 p-3 flex flex-col">
        {/* Category Name */}
        <h3 className="font-semibold text-gray-800 dark:text-white line-clamp-1">
          {category.name}
        </h3>

        {/* Category Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2 flex-grow">
          {category.description || "Tidak ada deskripsi"}
        </p>

        {/* Action Buttons */}
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
