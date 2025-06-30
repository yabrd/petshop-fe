import type { InputHTMLAttributes } from "react";

type NumberInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  prefix?: string;
};

export const NumberInput = ({ label, prefix, error, ...props }: NumberInputProps) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {label}
    </label>
    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
          {prefix}
        </span>
      )}
      <input
        type="number"
        className={`w-full px-4 ${prefix ? 'pl-8' : 'pl-4'} py-2 border rounded-lg focus:ring-2 focus:outline-none ${
          error
            ? "border-red-500 focus:ring-red-200 dark:border-red-500"
            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
        } dark:bg-gray-700 dark:text-white`}
        {...props}
      />
    </div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);