// src/hooks/useProducts.ts
import { useState, useCallback } from "react";
import { productApi } from "../services/api/productApi";
import type { Product } from "../types/productTypes";
import { toast } from "react-toastify";

export const useProducts = () => {
  const [state, setState] = useState<{
    products: Product[];
    isLoading: boolean;
    error: string | null;
  }>({
    products: [],
    isLoading: false,
    error: null,
  });

  const handleError = (error: unknown, defaultMessage: string) => {
    const message = error instanceof Error ? error.message : defaultMessage;
    setState((prev) => ({ ...prev, error: message }));
    toast.error(message);
    return message;
  };

  const loadProducts = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await productApi.getAll();
      if ("data" in response && Array.isArray(response.data)) {
        setState((prev) => ({ ...prev, products: response.data }));
      } else {
        handleError(response, "Failed to load products");
      }
    } catch (err) {
      handleError(err, "Failed to load products");
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const createProduct = useCallback(
    async (productData: Omit<Product, "id">) => {
      setState((prev) => ({ ...prev, isLoading: true }));
      try {
        const response = await productApi.create(productData);
        if ("data" in response) {
          setState((prev) => ({
            ...prev,
            products: [...prev.products, response.data],
          }));
          toast.success("Product created successfully");
          return { success: true, data: response.data };
        }
        throw new Error(response.message || "Failed to create product");
      } catch (err) {
        const message = handleError(err, "Failed to create product");
        return { success: false, message };
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    []
  );

  const updateProduct = useCallback(async (productData: Product) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await productApi.update(productData.id, {
        ...productData,
        categoryName: String(productData.categoryId) || "",
      });
      if ("data" in response && response.data) {
        setState((prev) => ({
          ...prev,
          products: prev.products.map((item) =>
            item.id === productData.id ? response.data : item
          ),
        }));
        toast.success("Product updated successfully");
        return true;
      }
      throw new Error(response.message || "Failed to update product");
    } catch (err) {
      handleError(err, "Failed to update product");
      return false;
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const deleteProduct = useCallback(async (productId: number) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      await productApi.delete(productId);
      setState((prev) => ({
        ...prev,
        products: prev.products.filter((item) => item.id !== productId),
      }));
      toast.success("Product deleted successfully");
      return true;
    } catch (err) {
      handleError(err, "Failed to delete product");
      return false;
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  return {
    state,
    loadProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};