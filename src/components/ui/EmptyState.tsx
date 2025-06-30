// src/components/EmptyState.tsx
import React from "react";

interface EmptyStateProps {
  dataName: string;
  icon?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  dataName,
  icon,
  className = "",
}) => {
  const defaultIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-full h-full"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
      />
    </svg>
  );

  return (
    <div
      className={`col-span-full flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg ${className}`}
    >
      <div className="w-24 h-24 mb-5 text-gray-300 dark:text-gray-500">
        {icon || defaultIcon}
      </div>
      <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
        Belum Ada {dataName}
      </h3>
      <p className="text-gray-400 dark:text-gray-500 text-sm max-w-xs mx-auto">
        {dataName} akan muncul di sini setelah Anda membuatnya
      </p>
    </div>
  );
};
