// services/api/apiService.ts
const API_BASE_URL = "http://localhost:3000/api/v1";

interface ApiSuccessResponse<T> {
  status: "success";
  data: T;
  message?: string;
}

interface ApiErrorResponse {
  status: "error";
  message: string;
  code?: number;
  errors?: Array<{ field: string; message: string }>; // Sesuai format backend
}

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

class ApiService {
  private baseUrl: string;
  private authToken: string | null = null;
  private refreshTokenRequest: Promise<void> | null = null;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
    this.loadToken();
  }

  // Token management
  private loadToken() {
    this.authToken = localStorage.getItem("authToken");
  }

  setAuthToken(token: string) {
    this.authToken = token;
    localStorage.setItem("authToken", token);
  }

  clearAuthToken() {
    this.authToken = null;
    localStorage.removeItem("authToken");
  }

  hasAuthToken(): boolean {
    return !!this.authToken;
  }

  // Request handling
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      // Kembalikan struktur error asli dari backend
      const errorResponse: ApiErrorResponse = {
        status: responseData.status || "error",
        message:
          responseData.message ||
          `Request failed with status ${response.status}`,
        code: responseData.code || response.status,
        errors: responseData.errors, // Pertahankan array errors asli
      };

      if (response.status === 401) {
        this.clearAuthToken();
        errorResponse.message = responseData.message || "Unauthorized";
      }

      throw errorResponse; // Lempar object error lengkap
    }

    return {
      status: "success",
      data: responseData.data || responseData,
      message: responseData.message,
    };
  }

  private getHeaders(
    additionalHeaders: Record<string, string> = {}
  ): HeadersInit {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(this.authToken && { Authorization: `Bearer ${this.authToken}` }),
      ...additionalHeaders,
    };
  }

  private async refreshToken(): Promise<void> {
    if (!this.refreshTokenRequest) {
      this.refreshTokenRequest = (async () => {
        try {
          const response = await this.request<{ token: string }>(
            "POST",
            "auth/refresh"
          );
          if (response.status === "success") {
            this.setAuthToken(response.data.token);
          } else {
            throw new Error(response.message || "Token refresh failed");
          }
        } finally {
          this.refreshTokenRequest = null;
        }
      })();
    }
    return this.refreshTokenRequest;
  }

  async request<T>(
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    endpoint: string,
    data?: any,
    retry = true
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}/${endpoint.replace(/^\/+/, "")}`;

    const options: RequestInit = {
      method,
      headers: this.getHeaders(),
      credentials: "include",
      ...(data && { body: JSON.stringify(data) }),
    };

    try {
      const response = await fetch(url, options);
      return await this.handleResponse<T>(response);
    } catch (error) {
      if (retry && this.shouldRetryRequest(error)) {
        try {
          await this.refreshToken();
          return this.request<T>(method, endpoint, data, false);
        } catch (refreshError) {
          this.clearAuthToken();
          return this.buildErrorResponse(refreshError);
        }
      }

      if (this.isStructuredError(error)) {
        return error;
      }

      return this.buildErrorResponse(error);
    }
  }

  // Helper methods
  private shouldRetryRequest(error: unknown): boolean {
    return (
      this.authToken !== null &&
      error instanceof Error &&
      error.message.includes("Unauthorized")
    );
  }

  private isStructuredError(error: unknown): error is ApiErrorResponse {
    return (
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      "message" in error
    );
  }

  private buildErrorResponse(error: unknown): ApiErrorResponse {
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
      code: error instanceof DOMException ? 0 : 500,
    };
  }

  // HTTP Methods
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>("GET", endpoint);
  }

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>("POST", endpoint, data);
  }

  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>("PUT", endpoint, data);
  }

  async patch<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>("PATCH", endpoint, data);
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>("DELETE", endpoint);
  }
}

export const apiService = new ApiService();
