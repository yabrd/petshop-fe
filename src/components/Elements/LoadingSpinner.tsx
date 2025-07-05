import { FaSpinner } from "react-icons/fa";

const LoadingSpinner = ({ size = 24 }: { size?: number }) => {
  return (
    <div className="flex justify-center items-center py-8">
      <FaSpinner 
        className="animate-spin text-blue-500" 
        size={size}
      />
    </div>
  );
};

export default LoadingSpinner;