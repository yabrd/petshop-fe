import { useState, useEffect } from 'react';
import { categoryApi } from '../services/api/categoryApi';
import type { Category } from '../types/categoryTypes';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await categoryApi.getAll();
      if ('data' in response && Array.isArray(response.data)) {
        setCategories(response.data);
      } else {
        setError("Failed to load categories");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load categories");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return { categories, isLoading, error, loadCategories, setCategories };
};