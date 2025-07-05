// api/categoryApi.ts
import { apiService } from "./apiService";

export interface Category {
  id: number;
  name: string;
  image?: string;
  description?: string;
}

export const categoryApi = {
  getAll: () => apiService.get<Category[]>("product-categories"),
  getById: (id: number) => apiService.get<Category>(`product-categories/${id}`),
  create: (category: Omit<Category, "id">) => apiService.post<Category>("product-categories", category),
  update: (id: number, category: Partial<Category>) => apiService.put<Category>(`product-categories/${id}`, category),
  delete: (id: number) => apiService.delete<void>(`product-categories/${id}`),
  search: (query: string) => apiService.get<Category[]>(`product-categories/search?query=${encodeURIComponent(query)}`),
};
