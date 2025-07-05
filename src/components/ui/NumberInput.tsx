import type { InputHTMLAttributes } from "react";
import { useState, useEffect } from "react";

type NumberInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  prefix?: string;
  value?: number | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const NumberInput = ({ 
  label, 
  prefix, 
  error, 
  value,
  onChange,
  ...props 
}: NumberInputProps) => {
  const [displayValue, setDisplayValue] = useState("");

  // Format nilai awal
  useEffect(() => {
    if (value !== undefined && value !== "") {
      const num = typeof value === 'string' 
        ? parseFloat(value.replace(/[^0-9]/g, '')) 
        : Number(value);
      setDisplayValue(num.toLocaleString('id-ID'));
    } else {
      setDisplayValue("");
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    const numValue = rawValue ? parseInt(rawValue) : 0;
    
    // Format tampilan
    setDisplayValue(numValue.toLocaleString('id-ID'));
    
    // Kirim nilai numerik asli ke parent component
    if (onChange) {
      const newEvent = {
        ...e,
        target: {
          ...e.target,
          value: numValue.toString(),
          name: props.name || ""
        }
      };
      onChange(newEvent);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 mr-2">
            {prefix}
          </span>
        )}
        <input
          type="text"
          inputMode="numeric"
          className={`w-full px-4 ${prefix ? 'pl-10' : 'pl-4'} py-2 border rounded-lg focus:ring-2 focus:outline-none ${
            error
              ? "border-red-500 focus:ring-red-200 dark:border-red-500"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
          } dark:bg-gray-700 dark:text-white`}
          value={displayValue}
          onChange={handleChange}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};