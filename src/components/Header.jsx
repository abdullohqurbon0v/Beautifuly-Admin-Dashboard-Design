import { Plus } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-[#081028] bg-opacity-50 ">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-100">Analytics</h1>
        <button className="px-3 py-1.5 text-sm bg-[#0B1739] text-white rounded-md hover:bg-indigo-600 transition-colors duration-150 font-medium inline-flex items-center gap-1.5">
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>
    </header>
  );
};
export default Header;
