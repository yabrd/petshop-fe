import { FiUser, FiChevronDown } from "react-icons/fi";
import { HiOutlineCube } from "react-icons/hi2";
import Modals from "../../Fragments/Home/User/Modals";
import type { NavbarProps } from '../../../types/navbarProps';

const Navbar = ({ 
  isDropdownOpen,
  setIsDropdownOpen,
  isOrdersOpen,
  setIsOrdersOpen,
  isSettingsOpen,
  setIsSettingsOpen,
  userSettings,
  orders
}: NavbarProps) => {
  return (
    <nav className="bg-white dark:bg-slate-900 shadow-sm py-3 border-b border-slate-200 dark:border-slate-800 relative">
      <div className="container mx-auto px-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <HiOutlineCube className="text-violet-600 dark:text-violet-400 text-2xl" />
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1 p-2 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm"
          >
            <FiUser className="text-lg" />
            <FiChevronDown className={`text-sm transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <Modals 
            isDropdownOpen={isDropdownOpen}
            isOrdersOpen={isOrdersOpen}
            isSettingsOpen={isSettingsOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            setIsOrdersOpen={setIsOrdersOpen}
            setIsSettingsOpen={setIsSettingsOpen}
            userSettings={userSettings}
            orders={orders}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;