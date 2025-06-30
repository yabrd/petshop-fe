import { useState } from "react";
import LoginForm from "../components/Fragments/LoginForm";
import RegisterForm from "../components/Fragments/RegisterForm";
import AuthLayout from "../components/Layouts/AuthLayout";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setSuccess("");
  };

  return (
    <AuthLayout>
      <div className="space-y-8 max-w-md mx-auto p-8 rounded-lg shadow-[6px_6px_12px_rgba(0,0,0,0.08)] bg-white dark:bg-gray-800">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl font-light text-gray-800 dark:text-white tracking-wide">
            {isLogin ? "Welcome back" : "Create account"}
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {isLogin ? "Sign in to continue" : "Get started with your account"}
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 rounded-md">
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-md">
            {error}
          </div>
        )}

        {/* Form */}
        {isLogin ? (
          <LoginForm
            onSuccess={setSuccess}
            onError={setError}
            loading={loading}
            setLoading={setLoading}
          />
        ) : (
          <RegisterForm
            onSuccess={setSuccess}
            onError={setError}
            loading={loading}
            setLoading={setLoading}
          />
        )}

        {/* Toggle */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={toggleMode}
              className="text-blue-500 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300 font-medium focus:outline-none"
              disabled={loading}
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default AuthPage;
