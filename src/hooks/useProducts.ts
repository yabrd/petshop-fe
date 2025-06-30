// src/hooks/useProducts.ts
import { useState, useEffect, useCallback } from "react";
import { productApi } from "../services/api/productApi";
import type { Product } from "../types/productTypes";
import { toast } from "react-toastify";

// Helper type for API responses
type ApiProduct = Omit<Product, 'categoryName'> & {
  categoryName?: string;
};

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Normalize product data from API
  const normalizeProduct = (product: ApiProduct): Product => ({
    ...product,
    categoryName: product.categoryName || '', // Ensure categoryName is always string
  });

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await productApi.getAll();
      if ("data" in response) {
        setProducts(response.data.map(normalizeProduct));
      } else if ("message" in response) {
        setError(response.message || "Failed to load products");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createProduct = useCallback(
    async (productData: Omit<Product, "id">) => {
      setIsLoading(true);
      try {
        const response = await productApi.create(productData);
        if ("data" in response && response.data) {
          setProducts((prev) => [...prev, normalizeProduct(response.data)]);
          toast.success("Product created successfully");
          return true;
        }
        toast.error(response.message || "Failed to create product");
        return false;
      } catch (err: any) {
        toast.error(err.message || "Failed to create product");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const updateProduct = useCallback(async (productData: Product) => {
    setIsLoading(true);
    try {
      const response = await productApi.update(productData.id, productData);
      if ("data" in response && response.data) {
        setProducts((prev) =>
          prev.map((item) =>
            item.id === productData.id ? normalizeProduct(response.data) : item
          )
        );
        toast.success("Product updated successfully");
        return true;
      }
      toast.error(response.message || "Failed to update product");
      return false;
    } catch (err: any) {
      toast.error(err.message || "Failed to update product");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteProduct = useCallback(async (productId: number) => {
    setIsLoading(true);
    try {
      await productApi.delete(productId);
      setProducts((prev) => prev.filter((item) => item.id !== productId));
      toast.success("Product deleted successfully");
      return true;
    } catch (err: any) {
      toast.error(err.message || "Failed to delete product");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return {
    products,
    isLoading,
    error,
    loadProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
