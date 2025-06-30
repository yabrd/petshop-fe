// src/components/Fragments/ProductForm.tsx
import { useState, useEffect } from "react";
import { categoryApi } from "../../services/api/categoryApi";
import { TextInput } from "../ui/TextInput";
import { TextareaInput } from "../ui/TextareaInput";
import { NumberInput } from "../ui/NumberInput";
import { SelectInput } from "../ui/SelectInput";
import type { Product } from "../../types/productTypes";
import type { Category } from "../../types/categoryTypes";

interface ProductFormProps {
  initialData: Product;
  onSubmit: (data: Product) => void;
  onCancel: () => void;
  mode: "create" | "edit";
  errors?: Record<string, string>;
}

export const ProductForm = ({
  initialData,
  onSubmit,
  onCancel,
  mode,
  errors = {},
}: ProductFormProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Product>(initialData);

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const response = await categoryApi.getAll();
      if ("data" in response) {
        setCategories(response.data);
      } else {
        console.error("Failed to load categories", response);
        setCategories([]);
      }
    } catch (err) {
      console.error("Failed to load categories", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock" || name === "categoryId"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData); // This now passes the complete form data
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
          label="Product Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />
        <NumberInput
          label="Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          error={errors.price}
          required
          min={0}
        />
        <NumberInput
          label="Stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          error={errors.stock}
          required
          min={0}
        />
        <SelectInput
          label="Category"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          options={categories.map((cat) => ({
            value: cat.id,
            label: cat.name,
          }))}
          error={errors.categoryId}
          required
          disabled={isLoading}
        />
      </div>
      <TextInput
        label="Image URL"
        name="image"
        value={formData.image}
        onChange={handleChange}
        error={errors.image}
        placeholder="https://example.com/image.jpg"
      />
      <TextareaInput
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows={4}
        error={errors.description}
      />
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {mode === "create" ? "Create Product" : "Update Product"}
        </button>
      </div>
    </form>
  );
};
