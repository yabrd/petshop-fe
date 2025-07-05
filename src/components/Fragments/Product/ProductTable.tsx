// src/components/ProductTable.tsx
import type { Product } from '../../../types/productTypes';

interface ProductTableProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export const ProductTable = ({ products, isLoading, onEdit, onDelete }: ProductTableProps) => {
  if (isLoading && products.length === 0) {
    return <div className="flex justify-center items-center h-64">Loading products...</div>;
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
        <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
          Belum Ada Produk
        </h3>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-900/20">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Product</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Description</th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">Stock</th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">Price</th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-700">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.currentTarget.src = "https://dummyimage.com/400x400/4f4f4f/c9c9c9&text=No+Image")}
                    />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{product.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{product.categoryName}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-600 dark:text-gray-300 max-w-xs">
                <div className="line-clamp-2">{product.description || "-"}</div>
              </td>
              <td className="px-6 py-4 text-center">
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                    product.stock > 0
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                  }`}
                >
                  {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
                </span>
              </td>
              <td className="px-6 py-4 text-center font-medium text-gray-900 dark:text-white">
                Rp. {product.price.toLocaleString("id-ID")}
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap space-x-2">
                <button
                  onClick={() => onEdit(product)}
                  className="px-3 py-1.5 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(product)}
                  className="px-3 py-1.5 rounded-md bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};