// src/types/productTypes.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: number;
  categoryName: string;
  stock: number;
}

export interface ProductCategory {
  id: number;
  name: string;
  image?: string;
  description?: string;
}

export type ProductModalMode = "create" | "edit" | "delete";