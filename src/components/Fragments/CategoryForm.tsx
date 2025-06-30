import { useState } from 'react';
import { TextInput } from "../ui/TextInput";
import { TextareaInput } from "../ui/TextareaInput";
import type { Category } from "../../types/categoryTypes";

type CategoryFormProps = {
  initialData: Category;
  onSubmit: (data: Category) => void;
  onCancel: () => void;
  mode: 'create' | 'edit';
  errors?: Record<string, string>;
  // Hapus onChange dari props karena kita akan menanganinya di dalam komponen
};

export const CategoryForm = ({
  initialData: initialPropData,
  onSubmit,
  onCancel,
  mode,
  errors = {}
}: CategoryFormProps) => {
  const [formData, setFormData] = useState<Category>(initialPropData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextInput
        label="Nama Kategori"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
        autoFocus
      />

      <TextareaInput
        label="Deskripsi"
        name="description"
        value={formData.description || ''}
        onChange={handleChange}
        rows={3}
      />

      <TextInput
        label="URL Gambar (Opsional)"
        name="image"
        type="url"
        value={formData.image || ''}
        onChange={handleChange}
        error={errors.image}
        placeholder="https://example.com/image.jpg"
      />

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Batal
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          {mode === 'create' ? 'Simpan' : 'Perbarui'}
        </button>
      </div>
    </form>
  );
};