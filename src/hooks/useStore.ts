import { useState, useCallback } from "react";
import { storeApi } from "../services/api/storeApi";
import type { Store } from "../types/storeTypes";
import { toast } from "react-toastify";

export const useStore = () => {
  const [state, setState] = useState<{
    store: Store[],
    isLoading: boolean,
    error: string | null,
    fieldErrors: Record<string, string>,
  }>({
    store: [],
    isLoading: false,
    error: null,
    fieldErrors: {},
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      store: { ...prev.store, [name]: value },
    }));
  };

  const loadStore = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      const response: any = await storeApi.getAll();
      const storesData = Array.isArray(response.data)
        ? response.data
        : [response.data];

      setState((prev) => ({
        ...prev,
        stores: storesData,
        store: storesData[0],
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to load store",
      }));
    }
  }, []);

  const updateStore = async (store: Store) => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
      fieldErrors: {},
    }));
    try {
      const response: any = await storeApi.update(store);
      if (response.status !== false && response.data) {
        setState((prev) => ({
          ...prev,
          store: response.data,
          isLoading: false,
        }));
        toast.success(response.message || "Store updated successfully");
        return true;
      }
      if (response.errors) {
        const fieldErrors = response.errors.reduce(
          (
            acc: Record<string, string>,
            err: { field: string; message: string }
          ) => ({
            ...acc,
            [err.field]: err.message,
          }),
          {}
        );

        setState((prev) => ({
          ...prev,
          fieldErrors,
          isLoading: false,
        }));

        toast.error(response.message || "Validation error");
        return false;
      }
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Update failed";
      setState((prev) => ({
        ...prev,
        error: message,
        isLoading: false,
      }));
      toast.error(message);
      return false;
    }
  };

  return {
    state,
    handleChange,
    loadStore,
    updateStore,
  };
};
