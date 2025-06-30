import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiLogOut } from "react-icons/fi";
import { HiOutlineCube, HiOutlineSquares2X2 } from "react-icons/hi2";
import { authService } from "../../services/api/authService";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const linkClass = (path: string) => `
    group relative
    flex items-center gap-3
    w-full px-5 py-3 rounded-lg
    font-medium text-base
    transition-all duration-200
    text-gray-700 dark:text-gray-300
    hover:text-blue-600 dark:hover:text-blue-400
    hover:bg-gray-50 dark:hover:bg-gray-700
    ${
      location.pathname === path
        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700 font-semibold"
        : ""
    }
  `;

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className="
      w-64 min-h-screen
      flex flex-col justify-between
      py-6 px-2
      border-r border-gray-100 dark:border-gray-700
      bg-white dark:bg-gray-800
      shadow-sm dark:shadow-none
      transition-colors duration-200
    ">
      <div>
        {/* Enhanced Header */}
        <div className="flex flex-col items-center px-2 mb-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="
              w-10 h-10 rounded-lg
              flex items-center justify-center
              bg-gradient-to-br from-blue-500 to-blue-600
              text-white shadow-lg
            ">
              <FiShoppingCart className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <h1 className="
                text-xl font-bold
                text-gray-800 dark:text-white
                tracking-tight
              ">
                Fayruz Petshop
              </h1>
              <p className="
                text-xs font-medium
                text-blue-600 dark:text-blue-400
                -mt-0.5
              ">
                ADMIN PANEL
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-1 px-1">
          <Link to="/product" className="w-full">
            <div className={linkClass("/product")}>
              {location.pathname === "/product" && (
                <span className="
                  absolute left-0 top-0 h-full w-1
                  bg-gradient-to-b from-purple-500 to-purple-600
                  rounded-r
                "/>
              )}
              <HiOutlineCube className="w-5 h-5" />
              <span>Products</span>
              <span className="
                absolute inset-0 rounded-lg
                opacity-0 group-hover:opacity-100
                transition-opacity duration-200
                bg-blue-50 dark:bg-gray-700
                -z-10
              "/>
            </div>
          </Link>

          <Link to="/category" className="w-full">
            <div className={linkClass("/category")}>
              {location.pathname === "/category" && (
                <span className="
                  absolute left-0 top-0 h-full w-1
                  bg-gradient-to-b from-purple-500 to-purple-600
                  rounded-r
                "/>
              )}
              <HiOutlineSquares2X2 className="w-5 h-5" />
              <span>Categories</span>
              <span className="
                absolute inset-0 rounded-lg
                opacity-0 group-hover:opacity-100
                transition-opacity duration-200
                bg-blue-50 dark:bg-gray-700
                -z-10
              "/>
            </div>
          </Link>
        </nav>
      </div>

      {/* Logout Button */}
      <div className="px-2 mt-6">
        <button
          onClick={handleLogout}
          className="
            group relative
            flex items-center gap-3
            w-full px-5 py-3 rounded-lg
            font-medium text-base
            transition-all duration-200
            text-gray-700 dark:text-gray-300
            hover:text-red-600 dark:hover:text-red-400
            hover:bg-gray-50 dark:hover:bg-gray-700
          "
        >
          <FiLogOut className="w-5 h-5" />
          <span>Logout</span>
          <span className="
            absolute inset-0 rounded-lg
            opacity-0 group-hover:opacity-100
            transition-opacity duration-200
            bg-red-50 dark:bg-gray-700
            -z-10
          "/>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;