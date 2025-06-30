import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ icon, className = "", ...props }) => {
  return (
    <div className={`flex items-center border rounded-md px-3 py-2 bg-white ${className}`}>
      {icon && <i className={`${icon} mr-2 text-gray-400`} />}
      <input
        className="flex-1 outline-none text-sm text-gray-700"
        {...props}
      />
    </div>
  );
};

export default Input;
