import { FiAlertCircle } from "react-icons/fi";

type ErrorMessageProps = {
  message: string;
  onRetry?: () => void;
};

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <FiAlertCircle className="text-red-500 mb-2" size={32} />
      <p className="text-red-600 font-medium mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Coba Lagi
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;