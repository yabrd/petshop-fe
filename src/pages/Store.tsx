import { StoreFormFields } from "../components/Fragments/Store/StoreFormFields";
import { useStore } from "../hooks/useStore";
import { useEffect, useCallback } from "react";
import { toast } from "react-toastify";

const StoreSettingsPage = () => {
  const { state, handleChange, loadStore, updateStore } = useStore();

  const loadStoreData = useCallback(async () => {
    if (state.store.length === 0 && !state.isLoading) {
      try {
        await loadStore();
      } catch (err) {
        console.error("Failed to load store data:", err);
      }
    }
  }, [state.store.length, state.isLoading, loadStore]);

  useEffect(() => {
    loadStoreData();
  }, [loadStoreData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Tambahkan ini untuk mencegah refresh

    try {
      const success = await updateStore(state.store);
      if (!success && Object.keys(state.fieldErrors).length > 0) {
        const firstErrorField = Object.keys(state.fieldErrors)[0];
        const errorElement = document.querySelector(
          `[name="${firstErrorField}"]`
        );

        if (errorElement) {
          errorElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
    } catch (error: any) {
      console.error("Update store error:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Gagal menyimpan pengaturan toko";

      toast.error(errorMessage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      {state.error && !state.isLoading && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          <div className="flex items-center justify-between">
            <span>{state.error}</span>
            <button
              onClick={loadStoreData}
              className="ml-4 px-3 py-1 bg-red-50 text-red-700 rounded hover:bg-red-200 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <StoreFormFields
          store={state.store}
          onChange={handleChange}
          errors={state.fieldErrors}
        />

        <div className="mt-8 flex justify-end gap-4">
          <button
            type="button"
            onClick={loadStoreData}
            disabled={state.isLoading}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={state.isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            {state.isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Menyimpan...
              </span>
            ) : (
              "Simpan Perubahan"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StoreSettingsPage;
