// src/hooks/useProducts.ts
import { useState, useEffect } from 'react';
import { productApi } from '../services/api/productApi';
import type { Product } from '../types/productTypes';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await productApi.getAll();
      if ('data' in response) {
        setProducts(
          response.data.map((product: any) => ({
            ...product,
            categoryName: product.categoryName ?? ''
          }))
        );
      } else if ('message' in response) {
        setError(response.message || 'Failed to load products');
      } else {
        setError('Failed to load products');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return { products, isLoading, error, loadProducts, setProducts };
};