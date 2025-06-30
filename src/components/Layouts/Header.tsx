interface HeaderProps {
  title?: string;
}

const Header = ({ title = 'Dashboard' }: HeaderProps) => {
  return (
    <header
      className="sticky top-0 z-40 w-full px-6 py-4 flex items-center justify-between bg-white shadow-sm border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="flex items-center space-x-4">
        <div className="flex items-center text-xl font-semibold text-gray-800 dark:text-gray-100">
          <span className="mr-2">📊</span>
          <h1>{title}</h1>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* User Profile */}
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
