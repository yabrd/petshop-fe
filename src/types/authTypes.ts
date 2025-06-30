// types/auth.ts (note .ts extension instead of .d.ts)
export type User = {
  id: number;  // Change to number to match authService
  name: string;
  email: string;
  role?: string;  // Add optional role to match authService
  [key: string]: any;  // Add index signature to match authService
};

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

export type AuthProviderProps = {
  children: React.ReactNode;
};