import type { TextareaHTMLAttributes } from "react";

type TextareaInputProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export const TextareaInput = ({ label, error, ...props }: TextareaInputProps) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {label}
    </label>
    <textarea
      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
        error
          ? "border-red-500 focus:ring-red-200 dark:border-red-500"
          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
      } dark:bg-gray-700 dark:text-white`}
      {...props}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);