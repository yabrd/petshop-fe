// src/pages/ProductCategoryPage.tsx
import { useState } from "react";
import { useCategories } from "../hooks/useCategories";
import { ContainerModal } from "../components/ContainerModal";
import { CategoryForm } from "../components/Fragments/CategoryForm";
import { DeleteConfirmation } from "../components/DeleteConfirmation";
import { CategoryCard } from "../components/Fragments/CategoryCard";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { EmptyState } from "../components/ui/EmptyState";
import type { Category, CategoryModalMode } from "../types/categoryTypes";

export const ProductCategoryPage = () => {
  const { 
    categories, 
    isLoading, 
    error, 
    loadCategories,
    createCategory,
    updateCategory,
    deleteCategory
  } = useCategories();
  
  const [modal, setModal] = useState({
    isOpen: false,
    mode: "create" as CategoryModalMode,
    selectedItem: null as Category | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (submittedData?: Category) => {
    if (!modal.selectedItem) return;

    let success = false;

    if (modal.mode === "create" && submittedData) {
      success = await createCategory(submittedData);
    } else if (modal.mode === "edit" && submittedData) {
      success = await updateCategory(submittedData);
    } else if (modal.mode === "delete") {
      success = await deleteCategory(modal.selectedItem.id);
    }

    if (success) {
      closeModal();
    }
  };

  // Modal handlers remain the same
  const openModal = (mode: CategoryModalMode, category?: Category) => {
    setModal({
      isOpen: true,
      mode,
      selectedItem: category || {
        id: 0,
        name: "",
        description: "",
        image: "",
      },
    });
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
    setErrors({});
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Category List
        </h1>
        <button
          onClick={() => openModal("create")}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "+ Add Category"}
        </button>
      </div>

      {error && <ErrorDisplay error={error} onRetry={loadCategories} />}

      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
        {categories.length > 0 ? (
          categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={() => openModal("edit", category)}
              onDelete={() => openModal("delete", category)}
            />
          ))
        ) : (
          <EmptyState dataName="Kategori Produk" />
        )}
      </div>

      <ContainerModal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={
          modal.mode === "create"
            ? "Add Category"
            : modal.mode === "edit"
            ? "Edit Category"
            : "Delete Category"
        }
      >
        {modal.mode !== "delete" ? (
          <CategoryForm
            initialData={modal.selectedItem!}
            onSubmit={handleSubmit}
            onCancel={closeModal}
            mode={modal.mode}
            errors={errors}
          />
        ) : (
          <DeleteConfirmation
            itemName={modal.selectedItem?.name || ""}
            onCancel={closeModal}
            onDelete={handleSubmit}
          />
        )}
      </ContainerModal>
    </>
  );
};

export default ProductCategoryPage;