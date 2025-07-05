// api/productApi.ts
import { apiService } from "./apiService";

export interface Store {
  id: number;
  name: string;
  address: string;
  mapsUrl: string;
  logo?: string;
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  isOpen: boolean;
}

export const storeApi = {
  getAll: () => apiService.get<Store[]>("store"),
  update: (store: Partial<Store>) => apiService.patch<Store>(`store`, store),
};
