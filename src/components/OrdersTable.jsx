import { Edit, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { $axios } from "../https/api";
import { useTasks } from "../hooks/use-tasks";

const OrdersTable = () => {
  const { tasks, count, loading, setTasks, changeLoading, setCount } =
    useTasks();
  const [filters, setFilters] = useState({
    offset: 0,
    limit: 10,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setFilters((prev) => ({
      ...prev,
      offset: (newPage - 1) * prev.limit,
    }));
  };

  useEffect(() => {
    const getTasks = async () => {
      changeLoading(true);
      try {
        const res = await $axios.get(
          `/test/get/list?limit=${filters.limit}&offset=${filters.offset}`
        );
        console.log(res);
        setCount(res.data.count);
        setTasks(res.data.tests);
      } catch (error) {
        console.log(error);
      } finally {
        changeLoading(false);
      }
    };
    getTasks();
  }, [filters]);

  return (
    <div className="bg-[#0B1739] bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Orders Status</h2>
        <div className="flex items-center px-5 bg-gray-700 rounded-lg">
          <Search className="text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full text-white bg-transparent placeholder-gray-400 rounded-lg pl-2 pr-4 py-2 focus:outline-none"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-gray-400 uppercase tracking-wider">
                <div className="flex items-center font-bold space-x-2">
                  <span>Title</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-gray-400 uppercase tracking-wider">
                <div className="flex items-center font-bold space-x-2">
                  <span>Category</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-gray-400 uppercase tracking-wider">
                <div className="flex items-center font-bold space-x-2">
                  <span>Description</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-gray-400 uppercase tracking-wider">
                <div className="flex items-center font-bold space-x-2">
                  <span>Correct Answer</span>
                </div>
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-slate-900">
                <td className="px-6 py-4 max-w-[200px] whitespace-nowrap truncate text-sm text-gray-300">
                  {task.title.en}
                </td>
                <td className="px-6 py-4 max-w-[200px] whitespace-nowrap truncate text-sm text-gray-300">
                  {task.category.en}
                </td>
                <td className="px-6 py-4 max-w-[200px] whitespace-nowrap truncate text-sm text-gray-300">
                  {task.description.en}
                </td>
                <td className="px-6 py-4 max-w-[200px] whitespace-nowrap truncate text-sm text-gray-300">
                  {task.correct_answer.en}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <div className="flex items-center space-x-3">
                    <button className="text-indigo-400 hover:text-indigo-300">
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
      <div className="flex justify-center mt-6 text-white space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className={`px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-600 text-sm font-medium border border-blue-600 transition ${
            currentPage === 1 || loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Prev
        </button>

        <span className="px-5 py-2 rounded-md bg-blue-800 border border-blue-600 text-sm font-medium">
          Page {currentPage} of {Math.ceil(count / filters.limit)}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= Math.ceil(count / filters.limit) || loading}
          className={`px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-600 text-sm font-medium border border-blue-600 transition ${
            currentPage >= Math.ceil(count / filters.limit) || loading
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrdersTable;
