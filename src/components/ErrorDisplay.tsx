// components/ErrorDisplay.tsx
interface ErrorDisplayProps {
  error: string;
  onRetry: () => void;
}

export const ErrorDisplay = ({ error, onRetry }: ErrorDisplayProps) => (
  <div className="p-4 bg-red-100 text-red-700 rounded-lg">
    Error: {error}
    <button onClick={onRetry}>
      Coba Lagi
    </button>
  </div>
);