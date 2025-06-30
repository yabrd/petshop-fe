// src/pages/ProductPage.tsx
import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { ContainerModal } from "../components/ContainerModal";
import { ProductForm } from "../components/Fragments/ProductForm";
import { DeleteConfirmation } from "../components/DeleteConfirmation";
import { ProductTable } from "../components/Fragments/ProductTable";
import { productApi } from "../services/api/productApi";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { toast } from "react-toastify";
import type { Product, ProductModalMode } from "../types/productTypes";

export const ProductPage = () => {
  const { products, isLoading, error, loadProducts, setProducts } =
    useProducts();
  const [modal, setModal] = useState({
    isOpen: false,
    mode: "create" as ProductModalMode,
    selectedItem: null as Product | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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
        categoryName: "",
        stock: 0,
      },
    });
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
    setErrors({});
  };

  const handleSubmit = async (submittedData?: Product) => {
    try {
      if (!modal.selectedItem) return;

      if (modal.mode === "create") {
        if (!submittedData) {
          toast.error("No product data submitted");
          return;
        }

        const newProduct: Omit<Product, "id"> = {
          name: submittedData.name,
          description: submittedData.description,
          price: submittedData.price,
          image: submittedData.image,
          categoryId: submittedData.categoryId,
          categoryName: submittedData.categoryName,
          stock: submittedData.stock,
        };
        const response = await productApi.create(newProduct);
        if ("data" in response && response.data) {
          setProducts((prev: Product[]) => [...prev, response.data as Product]);
          toast.success("Product created successfully");
        } else {
          toast.error("Failed to create product");
        }
      } else if (modal.mode === "edit") {
        const response = await productApi.update(
          submittedData!.id,
          submittedData!
        );
        if ("data" in response && response.data) {
          setProducts((prev) =>
            prev.map((item) =>
              item.id === submittedData!.id ? response.data as Product : item
            )
          );
          toast.success("Product updated successfully");
        } else {
          toast.error("Failed to update product");
        }
      } else if (modal.mode === "delete") {
        await productApi.delete(modal.selectedItem.id);
        setProducts((prev) =>
          prev.filter((item) => item.id !== modal.selectedItem?.id)
        );
        toast.success("Product deleted successfully");
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
          Product List
        </h1>
        <button
          onClick={() => openModal("create")}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "+ Add Product"}
        </button>
      </div>

      {error && <ErrorDisplay error={error} onRetry={loadProducts} />}

      <ProductTable
        products={products}
        isLoading={isLoading}
        onEdit={(product) => openModal("edit", product)}
        onDelete={(product) => openModal("delete", product)}
      />

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
