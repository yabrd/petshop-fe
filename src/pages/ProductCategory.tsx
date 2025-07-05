// src/pages/ProductCategoryPage.tsx
import { useState, useEffect } from "react";
import { useCategories } from "../hooks/useCategories";
import { ContainerModal } from "../components/Elements/ContainerModal";
import { CategoryForm } from "../components/Fragments/Category/CategoryForm";
import { DeleteConfirmation } from "../components/Elements/DeleteConfirmation";
import { CategoryCard } from "../components/Fragments/Category/CategoryCard";
import { EmptyState } from "../components/ui/EmptyState";
import type { Category, CategoryModalMode } from "../types/categoryTypes";

export const ProductCategoryPage = () => {
  const {
    state,
    loadCategories,
    createCategory,
    updateCategory,
    deleteCategory,
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...createData } = submittedData;
      const result = await createCategory(createData);
      success = result.success;
    } else if (modal.mode === "edit" && submittedData) {
      success = await updateCategory(submittedData);
    } else if (modal.mode === "delete") {
      success = await deleteCategory(modal.selectedItem.id);
    }

    if (success) {
      closeModal();
    }
  };

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

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Category List
        </h1>
        <button
          onClick={() => openModal("create")}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          disabled={state.isLoading}
        >
          {state.isLoading ? "Loading..." : "+ Add Category"}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
        {state.categories.length > 0 ? (
          state.categories.map((category) => (
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
