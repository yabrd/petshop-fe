// RegisterForm.tsx
import { useState } from "react";
import { FiUser, FiMail, FiLock, FiUserPlus } from "react-icons/fi";
import { useAuth } from "../../../hooks/useAuth";

interface RegisterFormProps {
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
  loading: boolean;
  setLoading: (val: boolean) => void;
}

const RegisterForm = ({ onSuccess, onError, loading, setLoading }: RegisterFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    onError("");
    onSuccess("");

    try {
      const { name, email, password, confirmPassword } = formData;

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      await register(name, email, password);
      onSuccess("Registration successful! You can now login.");
    } catch (err) {
      onError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Full Name
        </label>
        <div className="relative">
          <FiUser className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            id="name"
            placeholder="John Doe"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full pl-10 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            disabled={loading}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email
        </label>
        <div className="relative">
          <FiMail className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-10 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            disabled={loading}
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Password
        </label>
        <div className="relative">
          <FiLock className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            required
            minLength={6}
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-10 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            disabled={loading}
          />
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <FiLock className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
          <input
            type="password"
            id="confirmPassword"
            placeholder="••••••••"
            required
            minLength={6}
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full pl-10 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            disabled={loading}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full flex items-center justify-center gap-2 ${
          loading
            ? "bg-gray-500 dark:bg-gray-600 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
        } text-white font-medium py-3 px-4 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800`}
      >
        {loading ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </span>
        ) : (
          <>
            <FiUserPlus className="w-5 h-5" />
            Sign Up
          </>
        )}
      </button>
    </form>
  );
};

export default RegisterForm;