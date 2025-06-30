import { apiService } from "./apiService";

export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
  [key: string]: any;
}

class AuthService {
  private user: User | null = null;
  private refreshPromise: Promise<void> | null = null;

  constructor() {
    this.loadUser();
  }

  // Session management
  private loadUser() {
    try {
      const user = localStorage.getItem("user");
      this.user = user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Failed to parse user data:", error);
      this.clearSession();
    }
  }

  private async setSession(authResponse: { token: string; user: User }) {
    apiService.setAuthToken(authResponse.token);
    this.user = authResponse.user;
    localStorage.setItem("user", JSON.stringify(authResponse.user));
  }

  private clearSession() {
    apiService.clearAuthToken();
    this.user = null;
    localStorage.removeItem("user");
  }

  // Auth operations
  async login(email: string, password: string): Promise<User> {
    try {
      const response = await apiService.post<{ token: string; user: User }>(
        "auth/login", 
        { email, password }
      );

      if (response.status === "success") {
        await this.setSession(response.data);
        return response.data.user;
      }
      throw new Error(response.message || "Login failed");
    } catch (error) {
      this.clearSession();
      throw error;
    }
  }

  async register(name: string, email: string, password: string): Promise<User> {
    try {
      const response = await apiService.post<{ token: string; user: User }>(
        "auth/register",
        { name, email, password, password_confirmation: password }
      );

      if (response.status === "success") {
        await this.setSession(response.data);
        return response.data.user;
      }
      throw new Error(response.message || "Registration failed");
    } catch (error) {
      this.clearSession();
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await apiService.post("auth/logout", {});
    } finally {
      this.clearSession();
    }
  }

  async refreshToken(): Promise<void> {
    if (!this.refreshPromise) {
      this.refreshPromise = (async () => {
        try {
          const response = await apiService.post<{ token: string }>("auth/refresh", {});
          if (response.status === "success") {
            apiService.setAuthToken(response.data.token);
          } else {
            throw new Error(response.message || "Token refresh failed");
          }
        } finally {
          this.refreshPromise = null;
        }
      })();
    }
    return this.refreshPromise;
  }

  // User state
  async getCurrentUser(forceRefresh = false): Promise<User | null> {
    if (!this.isAuthenticated()) return null;

    if (forceRefresh) {
      try {
        const response = await apiService.get<{ user: User }>("auth/me");
        if (response.status === "success") {
          this.user = response.data.user;
          localStorage.setItem("user", JSON.stringify(this.user));
        }
      } catch {
        this.clearSession();
        return null;
      }
    }
    return this.user;
  }

  isAuthenticated(): boolean {
    return apiService.hasAuthToken();
  }

  getUser(): User | null {
    return this.user;
  }

  async ensureAuthenticated(): Promise<boolean> {
    return this.isAuthenticated() && !!(await this.getCurrentUser(true));
  }
}

export const authService = new AuthService();