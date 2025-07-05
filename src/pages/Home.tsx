import { FiSearch } from "react-icons/fi";
import { HiOutlineCube } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/Fragments/Home/ProductCard";
import LoadingSpinner from "../components/Elements/LoadingSpinner";
import ErrorMessage from "../components/Elements/ErrorMessage";
import Navbar from "../components/Layouts/Home/Navbar";
import Header from "../components/Layouts/Home/Header";
import Footer from "../components/Layouts/Home/Footer";

const HomePage = () => {
  const {state, loadProducts } = useProducts();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const orders = [
    { id: 1, product: "Premium Widget", date: "2023-05-15", status: "Delivered" },
    { id: 2, product: "Standard Widget", date: "2023-06-20", status: "Shipped" },
    { id: 3, product: "Basic Widget", date: "2023-07-01", status: "Processing" },
  ];
  
  const userSettings = {
    name: "Guest User",
    email: "guest@example.com",
    joinedDate: "January 2023",
    notification: true,
    theme: "System Default"
  };

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  if (state.isLoading) {
    return <LoadingSpinner />;
  }

  if (state.error) {
    return <ErrorMessage message={state.error} onRetry={loadProducts} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar 
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        isOrdersOpen={isOrdersOpen}
        setIsOrdersOpen={setIsOrdersOpen}
        isSettingsOpen={isSettingsOpen}
        setIsSettingsOpen={setIsSettingsOpen}
        userSettings={userSettings}
        orders={orders}
      />
      
      <Header />
      <main className="flex-grow container mx-auto px-5 py-10">
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Cari produk..."
              className="w-full py-3 pl-11 pr-5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-all shadow-sm"
            />
            <FiSearch className="absolute left-3.5 top-3.5 text-slate-500 dark:text-slate-500" />
          </div>

          <button className="flex items-center gap-2 px-5 py-3 rounded-lg bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
            <HiOutlineCube size={20} />
            <span>Filter Kategori</span>
          </button>
        </div>

        {state.products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {state.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-14">
            <div className="mx-auto w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-5 shadow-sm">
              <HiOutlineCube
                size={36}
                className="text-slate-500 dark:text-slate-500"
              />
            </div>
            <h3 className="text-xl font-medium text-slate-800 dark:text-slate-200 mb-2">
              Produk tidak tersedia
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Saat ini tidak ada produk yang dapat ditampilkan
            </p>
            <button
              onClick={loadProducts}
              className="px-7 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors shadow-md"
            >
              Coba Lagi
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;