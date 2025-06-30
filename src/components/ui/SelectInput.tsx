import type { SelectHTMLAttributes } from "react";

type SelectInputProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: { value: number | string; label: string }[];
  error?: string;
  emptyMessage?: string; // Tambahkan prop untuk pesan kosong
};

export const SelectInput = ({ 
  label, 
  options, 
  error, 
  emptyMessage = "Tidak ada data", 
  ...props 
}: SelectInputProps) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {label}
    </label>
    <select
      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
        error
          ? "border-red-500 focus:ring-red-200 dark:border-red-500"
          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
      } dark:bg-gray-700 dark:text-white`}
      disabled={options.length === 0 || props.disabled}
      {...props}
    >
      {options.length === 0 ? (
        <option value="">{emptyMessage}</option>
      ) : (
        options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))
      )}
    </select>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);