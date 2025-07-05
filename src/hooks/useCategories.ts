// src/hooks/useCategories.ts
import { useState, useCallback } from "react";
import { categoryApi } from "../services/api/categoryApi";
import type { Category } from "../types/categoryTypes";
import { toast } from "react-toastify";

export const useCategories = () => {
  const [state, setState] = useState<{
    categories: Category[];
    isLoading: boolean;
    error: string | null;
  }>({
    categories: [],
    isLoading: false,
    error: null,
  });

  const handleError = (error: unknown, defaultMessage: string) => {
    const message = error instanceof Error ? error.message : defaultMessage;
    setState((prev) => ({ ...prev, error: message }));
    toast.error(message);
    return message;
  };

  const loadCategories = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await categoryApi.getAll();
      if ("data" in response && Array.isArray(response.data)) {
        setState((prev) => ({ ...prev, categories: response.data }));
      } else {
        handleError(response, "Failed to load categories");
      }
    } catch (err) {
      handleError(err, "Failed to load categories");
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const createCategory = useCallback(
    async (categoryData: Omit<Category, "id">) => {
      setState((prev) => ({ ...prev, isLoading: true }));
      try {
        const response = await categoryApi.create(categoryData);
        if ("data" in response) {
          setState((prev) => ({
            ...prev,
            categories: [...prev.categories, response.data],
          }));
          toast.success("Category created successfully");
          return { success: true, data: response.data };
        }
        throw new Error(response.message || "Failed to create category");
      } catch (err) {
        const message = handleError(err, "Failed to create category");
        return { success: false, message };
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    []
  );

  const updateCategory = useCallback(async (categoryData: Category) => {
      setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await categoryApi.update(categoryData.id, categoryData);
      if ("data" in response && response.data) {
        setState((prev) => ({
          ...prev,
          categories: prev.categories.map((item) =>
            item.id === categoryData.id ? response.data : item
          ),
        }))
        toast.success("Category updated successfully");
        return true;
      }
      toast.error(response.message || "Failed to update category");
      return false;
    } catch (err: any) {
      toast.error(err.message || "Failed to update category");
      return false;
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const deleteCategory = useCallback(async (categoryId: number) => {
    try {
      await categoryApi.delete(categoryId);
      setState((prev) => ({
        ...prev,
        categories: prev.categories.filter((item) => item.id !== categoryId),
      }))
      toast.success("Category deleted successfully");
      return true;
    } catch (err: any) {
      toast.error(err.message || "Failed to delete category");
      return false;
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  return {
    state,
    loadCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
