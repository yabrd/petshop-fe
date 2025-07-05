// components/DeleteConfirmation.tsx
type DeleteConfirmationProps = {
  itemName: string;
  onCancel: () => void;
  onDelete: () => void;
};

export const DeleteConfirmation = ({
  itemName,
  onCancel,
  onDelete
}: DeleteConfirmationProps) => (
  <div className="space-y-6">
    <p className="text-gray-600 dark:text-gray-300">
      Apakah Anda yakin ingin menghapus <span className="font-semibold text-gray-900 dark:text-white">"{itemName}"</span>?
    </p>
    
    <div className="flex justify-end space-x-3 pt-4">
      <button
        onClick={onCancel}
        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        Batal
      </button>
      <button
        onClick={onDelete}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
      >
        Ya, Hapus
      </button>
    </div>
  </div>
);