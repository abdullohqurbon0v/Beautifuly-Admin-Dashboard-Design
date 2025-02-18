import {
  BarChart2,
  DollarSign,
  Menu,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const SIDEBAR_ITEMS = [
  { name: "Features", icon: BarChart2, color: "#F59E0B", href: "/" },
  { name: "Users", icon: Users, color: "#3B82F6", href: "/products" },
  { name: "Pricing", icon: DollarSign, color: "#6EE7B7", href: "/settings" },
  {
    name: "Integrations",
    icon: TrendingUp,
    color: "#00C2FF",
    href: "/settings",
  },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="h-full bg-[#081028] p-4 flex flex-col shadow-2xl border-r border-[#263c7f6e]">
        <div className="flex justify-between my-7">
          {isSidebarOpen && (
            <div className="flex items-center space-x-2 text-2xl">
              <img src={"/Log.png"} alt="" />
              <span>Dashdark X</span>
            </div>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
          >
            <Menu size={24} />
          </button>
        </div>
        {isSidebarOpen && (
          <div className="relative">
            <input
              type="text"
              placeholder="Search for..."
              className="bg-[#0B1739] text-white placeholder-gray-400 rounded-lg pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
        )}

        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
                <item.icon
                  size={20}
                  style={{ color: item.color, minWidth: "20px" }}
                />

                {isSidebarOpen && (
                  <span
                    className="ml-4 whitespace-nowrap"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2, delay: 0.3 }}
                  >
                    {item.name}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};
export default Sidebar;
