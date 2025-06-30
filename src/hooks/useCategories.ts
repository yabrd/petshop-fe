// src/hooks/useCategories.ts
import { useState, useEffect, useCallback } from "react";
import { categoryApi } from "../services/api/categoryApi";
import type { Category } from "../types/categoryTypes";
import { toast } from "react-toastify";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await categoryApi.getAll();
      if ("data" in response && Array.isArray(response.data)) {
        setCategories(response.data);
      } else {
        setError("Failed to load categories");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load categories"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createCategory = useCallback(
    async (categoryData: Omit<Category, "id">) => {
      setIsLoading(true);
      try {
        const { id, ...dataWithoutId } = categoryData as any;
        const response = await categoryApi.create(dataWithoutId);
        if ("data" in response && response.data) {
          setCategories((prev) => [...prev, response.data]);
          toast.success("Category created successfully");
          return true;
        }
        toast.error(response.message || "Failed to create category");
        return false;
      } catch (err: any) {
        toast.error(err.message || "Failed to create category");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const updateCategory = useCallback(async (categoryData: Category) => {
    setIsLoading(true);
    try {
      const response = await categoryApi.update(categoryData.id, categoryData);
      if ("data" in response && response.data) {
        setCategories((prev) =>
          prev.map((item) =>
            item.id === categoryData.id ? response.data : item
          )
        );
        toast.success("Category updated successfully");
        return true;
      }
      toast.error(response.message || "Failed to update category");
      return false;
    } catch (err: any) {
      toast.error(err.message || "Failed to update category");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteCategory = useCallback(async (categoryId: number) => {
    setIsLoading(true);
    try {
      await categoryApi.delete(categoryId);
      setCategories((prev) => prev.filter((item) => item.id !== categoryId));
      toast.success("Category deleted successfully");
      return true;
    } catch (err: any) {
      toast.error(err.message || "Failed to delete category");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    categories,
    isLoading,
    error,
    loadCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    setCategories, // Only include if still needed
  };
};
