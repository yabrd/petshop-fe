// src/pages/ProductCategoryPage.tsx
import { useState } from "react";
import { useCategories } from "../hooks/useCategories";
import { ContainerModal } from "../components/ContainerModal";
import { CategoryForm } from "../components/Fragments/CategoryForm";
import { DeleteConfirmation } from "../components/DeleteConfirmation";
import { CategoryCard } from "../components/Fragments/CategoryCard";
import { categoryApi } from "../services/api/categoryApi";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { toast } from "react-toastify";
import type { Category, CategoryModalMode } from "../types/categoryTypes";

export const ProductCategoryPage = () => {
  const { categories, isLoading, error, loadCategories, setCategories } =
    useCategories();
  const [modal, setModal] = useState({
    isOpen: false,
    mode: "create" as CategoryModalMode,
    selectedItem: null as Category | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handleSubmit = async (submittedData?: Category) => {
    try {
      if (!modal.selectedItem) return;

      if (modal.mode === "create") {
        if (!submittedData) {
          toast.error("No category data submitted");
          return;
        }

        const newCategory: Omit<Category, "id"> = {
          name: submittedData.name,
          description: submittedData.description,
          image: submittedData.image,
        };
        const response = await categoryApi.create(newCategory);
        if ("data" in response && response.data) {
          setCategories((prev) => [...prev, response.data as Category]);
          toast.success("Category created successfully");
        } else {
          throw new Error((response as any).message || "Failed to create category");
        }
      } else if (modal.mode === "edit") {
        const response = await categoryApi.update(
          submittedData!.id,
          submittedData!
        );
        if ("data" in response && response.data) {
          setCategories((prev) =>
            prev.map((item) =>
              item.id === submittedData!.id ? response.data as Category : item
            )
          );
          toast.success("Category updated successfully");
        } else {
          throw new Error((response as any).message || "Failed to update category");
        }
      } else if (modal.mode === "delete") {
        await categoryApi.delete(modal.selectedItem.id);
        setCategories((prev) =>
          prev.filter((item) => item.id !== modal.selectedItem?.id)
        );
        toast.success("Category deleted successfully");
      }

      closeModal();
    } catch (err: any) {
      toast.error(err.message || "Operation failed");
      console.error("API Error:", err);
    }
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
          <CategoryCard isEmptyState />
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
