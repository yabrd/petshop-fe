// api/productApi.ts
import { apiService } from "./apiService";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: number;
  categoryName?: string; // Optional as it might come from join
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}

export const productApi = {
  getAll: () => apiService.get<Product[]>("products"),
  getById: (id: number) => apiService.get<Product>(`products/${id}`),
  getByCategory: (categoryId: number) => apiService.get<Product[]>(`products/category/${categoryId}`),
  create: (product: Omit<Product, "id">) => apiService.post<Product>("products", product),
  update: (id: number, product: Partial<Product>) => apiService.put<Product>(`products/${id}`, product),
  delete: (id: number) => apiService.delete<void>(`products/${id}`),
  search: (query: string) => apiService.get<Product[]>(`products/search?query=${encodeURIComponent(query)}`),
  getFeatured: () => apiService.get<Product[]>("products/featured"),
  getRelated: (productId: number) =>apiService.get<Product[]>(`products/${productId}/related`),
};
