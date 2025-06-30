// src/App.tsx
import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "./components/Layouts/Sidebar";
import Header from "./components/Layouts/Header";
import ProductPage from "./pages/Product";
import ProductCategoryPage from "./pages/ProductCategory";
import AuthPage from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import ToggleTheme from "./contexts/ToggleTheme";
import { AuthProvider } from "./contexts/AuthContext";

function MainLayout() {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/product":
        return "Product Management";
      case "/category":
        return "Category Management";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="flex">
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col min-h-screen">
        <ToggleTheme />
        <Header title={getTitle()} />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto p-4 sm:p-6 w-full">
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-xs sm:shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
              <div className="p-4 sm:p-6">
                <Outlet />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <ToastContainer />
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/product" element={<ProductPage />} />
              <Route path="/category" element={<ProductCategoryPage />} />
              <Route path="/" element={<div>Dashboard Content</div>} />
            </Route>
          </Route>
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;