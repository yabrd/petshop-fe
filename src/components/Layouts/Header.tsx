import { Switch } from "@headlessui/react";
import { useState, useEffect } from "react";
import { storeApi } from "../../services/api/storeApi";
import { toast } from "react-toastify";

interface HeaderProps {
  title?: string;
}

const Header = ({ title = "Dashboard" }: HeaderProps) => {
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadStoreStatus = async () => {
    try {
      setIsLoading(true);
      const response: any = await storeApi.getAll();

      if (response.data && typeof response.data.isOpen === "boolean") {
        setIsStoreOpen(response.data.isOpen);
      } else if (response.data?.length > 0) {
        setIsStoreOpen(response.data[0].isOpen);
      }
    } catch (error) {
      toast.error("Failed to load store status");
      console.error("Error loading store status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStoreStatus = async (newStatus: boolean) => {
    try {
      setIsLoading(true);
      const response: any = await storeApi.update({ isOpen: newStatus });
      if (response.data) {
        setIsStoreOpen(newStatus);
        toast.success(`Store is now ${newStatus ? "open" : "closed"}`);
      }
    } catch (error) {
      toast.error("Failed to update store status");
      console.error("Error updating store status:", error);
      setIsStoreOpen(!newStatus);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStoreStatus();
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full px-6 py-4 flex items-center justify-between bg-white shadow-sm border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center space-x-4">
        <div className="flex items-center text-xl font-semibold text-gray-800 dark:text-gray-100">
          <span className="mr-2">📊</span>
          <h1>{title}</h1>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center gap-2">
          {/* Status Indicator */}
          <div
            className={`flex items-center px-3 py-1 rounded-sm text-xs font-medium ${
              isStoreOpen
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full mr-2 ${
                isStoreOpen ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
            {isStoreOpen ? "BUKA SEKARANG" : "SEDANG TUTUP"}
          </div>

          {/* Toggle Switch */}
          <Switch
            checked={isStoreOpen}
            onChange={updateStoreStatus}
            disabled={isLoading}
            className={`${
              isStoreOpen ? "bg-blue-600" : "bg-gray-400"
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            <span className="sr-only">Ubah status toko</span>
            <span
              className={`${
                isStoreOpen ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>

        <div className="flex items-center p-1 rounded-full cursor-pointer bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
          <div className="w-8 h-8 rounded-full flex items-center justify-center font-medium bg-blue-500 text-white">
            U
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
