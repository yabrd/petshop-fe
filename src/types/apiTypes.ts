export type ApiResponse<T = any> = {
  status: 'success' | 'error';
  message?: string;
  data?: T;
  errors?: Record<string, string>;
};