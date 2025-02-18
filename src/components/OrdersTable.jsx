import { useState } from "react";
import { Search, Edit, Trash2 } from "lucide-react";
import { GoPersonFill } from "react-icons/go";
import { BsCalendarDateFill } from "react-icons/bs";
import { FaCheckSquare } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaGripLines } from "react-icons/fa";

const orderData = [
  {
    id: "#ORD001",
    customer: "John Doe",
    country: "United States",
    total: 235.4,
    status: "Delivered",
    date: "2023-07-01",
  },
  {
    id: "#ORD002",
    customer: "Jane Smith",
    country: "United Kingdom",
    total: 412.0,
    status: "Processing",
    date: "2023-07-02",
  },
  {
    id: "#ORD003",
    customer: "Bob Johnson",
    country: "Australia",
    total: 162.5,
    status: "Shipped",
    date: "2023-07-03",
  },
  {
    id: "#ORD004",
    customer: "Alice Brown",
    country: "India",
    total: 750.2,
    status: "Pending",
    date: "2023-07-04",
  },
  {
    id: "#ORD005",
    customer: "Charlie Wilson",
    country: "Canada",
    total: 104.8,
    status: "Delivered",
    date: "2023-07-05",
  },
  {
    id: "#ORD006",
    customer: "Eva Martinez",
    country: "United States",
    total: 310.75,
    status: "Processing",
    date: "2023-07-06",
  },
];

const OrdersTable = () => {
  return (
    <div className="bg-[#0B1739] bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Orders Status</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search orders..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-gray-400 uppercase tracking-wider">
                <div className="flex items-center font-bold space-x-2">
                  <div className="w-5 h-5 flex items-center justify-center ">
                    <FaGripLines />
                  </div>
                  <span>Order</span>
                </div>
              </th>

              <th className="px-6 py-3 text-left text-gray-400 uppercase tracking-wider">
                <div className="flex items-center font-bold space-x-2">
                  <GoPersonFill />
                  <span>Client</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-gray-400 uppercase tracking-wider">
                <div className="flex items-center font-bold space-x-2">
                  <BsCalendarDateFill />
                  <span>Date</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-gray-400 uppercase tracking-wider">
                <div className="flex items-center font-bold space-x-2">
                  <FaCheckSquare />
                  <span>Status</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-gray-400 uppercase tracking-wider">
                <div className="flex items-center font-bold space-x-2">
                  <FaLocationDot />
                  <span>Country</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-gray-400 uppercase tracking-wider">
                <div className="flex items-center font-bold space-x-2">
                  <BsCalendarDateFill />
                  <span>Total</span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="divide divide-gray-700">
            {orderData.map((order) => (
              <tr
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                  {order.customer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                  {order.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Processing"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {order.country}
                </td>
                <td className="px-6 space-x-4 py-4 whitespace-nowrap text-sm flex text-gray-300">
                  <div>${order.total.toFixed(2)}</div>
                  <div>
                    <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                      <Edit size={18} />
                    </button>
                    <button className="text-red-400 hover:text-red-300">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OrdersTable;
