// src/pages/ProductPage.tsx
import { useEffect, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { ContainerModal } from "../components/Elements/ContainerModal";
import { ProductForm } from "../components/Fragments/Product/ProductForm";
import { DeleteConfirmation } from "../components/Elements/DeleteConfirmation";
import { ProductTable } from "../components/Fragments/Product/ProductTable";
import { EmptyState } from "../components/ui/EmptyState";
import type { Product, ProductModalMode } from "../types/productTypes";

export const ProductPage = () => {
  const { state, loadProducts, createProduct, updateProduct, deleteProduct } =
    useProducts();

  const [modal, setModal] = useState({
    isOpen: false,
    mode: "create" as ProductModalMode,
    selectedItem: null as Product | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (submittedData?: Product) => {
    if (!modal.selectedItem) return;

    let success = false;

    if (modal.mode === "create" && submittedData) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...createData } = submittedData;
      const result = await createProduct(createData);
      success = result.success;
    } else if (modal.mode === "edit" && submittedData) {
      success = await updateProduct(submittedData);
    } else if (modal.mode === "delete") {
      success = await deleteProduct(modal.selectedItem.id);
    }

    if (success) {
      closeModal();
    }
  };

  const openModal = (mode: ProductModalMode, product?: Product) => {
    setModal({
      isOpen: true,
      mode,
      selectedItem: product || {
        id: 0,
        name: "",
        description: "",
        price: 0,
        image: "",
        categoryId: 0,
        stock: 0,
      },
    });
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
    setErrors({});
  };

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Product List
        </h1>
        <button
          onClick={() => openModal("create")}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          disabled={state.isLoading}
        >
          {state.isLoading ? "Loading..." : "+ Add Product"}
        </button>
      </div>

      {state.products.length > 0 ? (
        <ProductTable
          products={state.products}
          isLoading={state.isLoading}
          onEdit={(product) => openModal("edit", product)}
          onDelete={(product) => openModal("delete", product)}
        />
      ) : (
        <EmptyState dataName="Produk" />
      )}

      <ContainerModal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={
          modal.mode === "create"
            ? "Add Product"
            : modal.mode === "edit"
            ? "Edit Product"
            : "Delete Product"
        }
      >
        {modal.mode !== "delete" ? (
          <ProductForm
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

export default ProductPage;
