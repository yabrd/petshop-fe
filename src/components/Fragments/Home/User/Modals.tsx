import { FiSettings, FiShoppingBag, FiLogOut, FiArrowLeft } from "react-icons/fi";
import type { NavbarProps } from '../../../../types/navbarProps';

const Modals = ({ 
  isDropdownOpen,
  setIsDropdownOpen,
  isOrdersOpen,
  setIsOrdersOpen,
  isSettingsOpen,
  setIsSettingsOpen,
  userSettings,
  orders
}: NavbarProps) => {
  const handleBackToDropdown = () => {
    setIsOrdersOpen(false);
    setIsSettingsOpen(false);
    setIsDropdownOpen(true);
  };

  return (
    <>
      {/* User Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 z-50 border border-slate-200 dark:border-slate-700">
          <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
            <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{userSettings.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{userSettings.email}</p>
          </div>
          
          <button
            onClick={() => {
              setIsSettingsOpen(true);
              setIsDropdownOpen(false);
            }}
            className="w-full flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <FiSettings className="mr-2" /> Settings
          </button>
          
          <button
            onClick={() => {
              setIsOrdersOpen(true);
              setIsDropdownOpen(false);
            }}
            className="w-full flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <FiShoppingBag className="mr-2" /> Orders
          </button>
          
          <a 
            href="#" 
            className="flex items-center px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/50"
          >
            <FiLogOut className="mr-2" /> Sign Out
          </a>
        </div>
      )}
      
      {/* Orders Modal */}
      {isOrdersOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 z-50 border border-slate-200 dark:border-slate-700">
          <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700 flex items-center">
            <button 
              onClick={handleBackToDropdown}
              className="mr-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            >
              <FiArrowLeft className="text-lg" />
            </button>
            <h3 className="text-sm font-medium text-slate-800 dark:text-slate-100 flex-1">Your Orders</h3>
            <button 
              onClick={() => setIsOrdersOpen(false)}
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            >
              Close
            </button>
          </div>
          
          <div className="max-h-64 overflow-y-auto">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.id} className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{order.product}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === "Delivered" 
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300" 
                        : order.status === "Shipped" 
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300" 
                          : "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Order #{order.id}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{order.date}</p>
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">No orders found</p>
              </div>
            )}
          </div>
          
          <a 
            href="#" 
            className="block px-4 py-2 text-sm text-center text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/10 border-t border-slate-200 dark:border-slate-700"
          >
            View all orders
          </a>
        </div>
      )}
      
      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 z-50 border border-slate-200 dark:border-slate-700">
          <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700 flex items-center">
            <button 
              onClick={handleBackToDropdown}
              className="mr-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            >
              <FiArrowLeft className="text-lg" />
            </button>
            <h3 className="text-sm font-medium text-slate-800 dark:text-slate-100 flex-1">User Settings</h3>
            <button 
              onClick={() => setIsSettingsOpen(false)}
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            >
              Close
            </button>
          </div>
          
          <div className="max-h-64 overflow-y-auto p-4">
            <div className="mb-4">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Name</p>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{userSettings.name}</p>
            </div>
            
            <div className="mb-4">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Email</p>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{userSettings.email}</p>
            </div>
            
            <div className="mb-4">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Member since</p>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{userSettings.joinedDate}</p>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <p className="text-xs text-slate-500 dark:text-slate-400">Notifications</p>
                <div className={`w-10 h-5 rounded-full flex items-center transition-colors duration-300 ${
                  userSettings.notification ? 'bg-violet-600 justify-end' : 'bg-slate-300 dark:bg-slate-600 justify-start'
                }`}>
                  <div className="w-4 h-4 bg-white rounded-full mx-0.5"></div>
                </div>
              </div>
            </div>
            
            <div className="mb-2">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Theme</p>
              <select 
                className="w-full text-sm bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-violet-500"
                value={userSettings.theme}
              >
                <option>System Default</option>
                <option>Light</option>
                <option>Dark</option>
              </select>
            </div>
          </div>
          
          <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-700">
            <button className="w-full text-sm bg-violet-600 hover:bg-violet-700 text-white py-1.5 px-3 rounded">
              Save Changes
            </button>
          </div>
        </div>
      )}
      
      {/* Click outside to close */}
      {(isDropdownOpen || isOrdersOpen || isSettingsOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setIsDropdownOpen(false);
            setIsOrdersOpen(false);
            setIsSettingsOpen(false);
          }}
        />
      )}
    </>
  );
};

export default Modals;