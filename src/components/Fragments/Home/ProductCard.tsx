import { FiHeart } from "react-icons/fi";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  categoryName?: string;
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image || "/placeholder-product.jpg"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) =>
            (e.currentTarget.src = "https://dummyimage.com/600x600/e5e7eb/6b7280&text=No+Image")
          }
        />
        
        {/* Love button */}
        <button 
          className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full backdrop-blur-sm hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
        >
          <FiHeart 
            size={18} 
            className="text-gray-500 dark:text-gray-400" 
          />
        </button>
      </div>
      
      <div className="p-4 space-y-3">
        {/* Category and Name */}
        <div className="flex flex-col gap-1">
          {product.categoryName && (
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
              {product.categoryName}
            </span>
          )}
          <h3 className="font-medium text-gray-800 dark:text-gray-100 line-clamp-2">
            {product.name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {product.description}
        </p>

        {/* Stock */}
        <div className="flex justify-end">
          <span className={`text-xs px-2 py-1 rounded ${product.stock > 0 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
            {product.stock > 0 ? `${product.stock} tersedia` : 'Stok habis'}
          </span>
        </div>

        {/* Price */}
        <div className="pt-2">
          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(product.price)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;