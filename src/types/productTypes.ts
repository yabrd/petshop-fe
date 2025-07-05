export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: number;
  stock: number;
}

export type ProductModalMode = "create" | "edit" | "delete";