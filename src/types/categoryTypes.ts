export interface Category {
  id: number;
  name: string;
  description?: string;
  image?: string;
}

export type CategoryModalMode = 'create' | 'edit' | 'delete';