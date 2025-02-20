import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const StatCard = ({ name, icon: Icon, value, color, arrow, status }) => {
  return (
    <div
      className="bg-[#0B1739] bg-opacity-50 backdrop-blur-md overflow-hidden hover:bg-slate-800 cursor-pointer transition-all shadow-lg rounded-xl"
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="flex items-center text-sm font-medium text-gray-400">
          <Icon size={20} className="mr-2" style={{ color }} />
          {name}
        </span>
        <div className="flex justify-between items-center mt-4">
          <p className=" text-3xl font-semibold text-gray-100">{value}</p>

          {status && (
            <div
              className={`flex items-center px-3 py-1 rounded-md text-sm font-semibold
    ${arrow ? "bg-green-900 text-green-400" : "bg-red-900 text-red-400"}`}
            >
              {value}%
              {arrow ? (
                <ArrowUpRight className="ml-1 w-4 h-4" />
              ) : (
                <ArrowDownRight className="ml-1 w-4 h-4" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default StatCard;
