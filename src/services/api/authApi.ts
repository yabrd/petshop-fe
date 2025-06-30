// services/api/authApi.ts
import { apiService } from "./apiService";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation?: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role?: string;
  };
}

interface RefreshTokenResponse {
  token: string;
}

export const authApi = {
  login: (payload: LoginPayload) => apiService.post<AuthResponse>("auth/login", payload),
  register: (payload: RegisterPayload) => apiService.post<AuthResponse>("auth/register", payload),
  logout: () => apiService.post<void>("auth/logout", {}),
  refreshToken: () => apiService.post<RefreshTokenResponse>("auth/refresh", {}),
  getMe: () => apiService.get<AuthResponse["user"]>("auth/me")
};
