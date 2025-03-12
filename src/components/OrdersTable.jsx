import { Edit, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { $axios } from "../https/api";
import { useTasks } from "../hooks/use-tasks";

Modal.setAppElement("#root");

const OrdersTable = () => {
  const { tasks, count, loading, setTasks, changeLoading, setCount } =
    useTasks();

  const [filters, setFilters] = useState({ offset: 0, limit: 10 });
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [editData, setEditData] = useState({
    title: { uz: "", ru: "", en: "" },
    description: { uz: "", ru: "", en: "" },
    correct_answer: { uz: "", ru: "", en: "" },
    answers: { uz: "", ru: "", en: "" },
    category_id: "",
  });

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setFilters((prev) => ({
      ...prev,
      offset: (newPage - 1) * prev.limit,
    }));
  };

  const handleEditData = async (e) => {
    e.preventDefault();
    try {
      const res = await $axios.put(`/test/update?id=${selectedTask.id}`, {
        answers: {
          additionalProp1: editData.answers.uz,
          additionalProp2: editData.answers.ru,
          additionalProp3: editData.answers.en,
        },
        category_id: editData.category_id,
        correct_answer: {
          additionalProp1: editData.correct_answer.uz,
          additionalProp2: editData.correct_answer.ru,
          additionalProp3: editData.correct_answer.en,
        },
        description: {
          additionalProp1: editData.description.uz,
          additionalProp2: editData.description.ru,
          additionalProp3: editData.description.en,
        },
        title: {
          additionalProp1: editData.title.uz,
          additionalProp2: editData.title.ru,
          additionalProp3: editData.title.en,
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    console.log(editData);
  };

  useEffect(() => {
    const getTasks = async () => {
      changeLoading(true);
      try {
        const res = await $axios.get(
          `/test/get/list?limit=${filters.limit}&offset=${filters.offset}`
        );
        console.log(res);
        const categoriyes = await $axios.get(`/category/get/list`);
        setCategories(categoriyes.data.categories);
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

  const handleDelete = async () => {
    try {
      await $axios.delete(`/test/delete/${selectedTask.id}`);
      setTasks((prev) => prev.filter((task) => task.id !== selectedTask.id));
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleEditOpen = async (task) => {
    try {
      const res = await $axios.get(`/category/get?id=${task.category_id}`);
      console.log(res);
      setSelectedTask(task);
      setEditData({
        title: task.title,
        description: task.description,
        correct_answer: task.correct_answer,
        answers: task.answers,
        category_id: res.data.name.en,
      });
    } catch (error) {
      console.log(error);
    }
    setEditModalOpen(true);
  };

  const handleEditChange = (section, lang, value) => {
    setEditData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [lang]: value,
      },
    }));
  };

  const handleCategoryChange = (value) => {
    setEditData((prev) => ({
      ...prev,
      category_id: value,
    }));
  };

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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              {["Title", "Category", "Description", "Correct Answer", ""].map(
                (h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-gray-400 uppercase tracking-wider"
                  >
                    <div className="flex items-center font-bold space-x-2">
                      <span>{h}</span>
                    </div>
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-slate-900">
                <td className="px-6 py-4 truncate text-sm text-gray-300 max-w-[200px]">
                  {task.title.en}
                </td>
                <td className="px-6 py-4 truncate text-sm text-gray-300 max-w-[200px]">
                  {task.category.en}
                </td>
                <td className="px-6 py-4 truncate text-sm text-gray-300 max-w-[200px]">
                  {task.description.en}
                </td>
                <td className="px-6 py-4 truncate text-sm text-gray-300 max-w-[200px]">
                  {task.correct_answer.en}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleEditOpen(task)}
                      className="text-indigo-400 hover:text-indigo-300"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedTask(task);
                        setDeleteModalOpen(true);
                      }}
                      className="text-red-400 hover:text-red-300"
                    >
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
      <Modal
        isOpen={editModalOpen}
        onRequestClose={() => setEditModalOpen(false)}
        className="bg-slate-800 text-white p-6 rounded-2xl w-full max-w-3xl mx-auto mt-20 shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]"
      >
        <h3 className="text-2xl font-semibold mb-6 border-b border-slate-600 pb-3">
          Edit Task
        </h3>

        <form className="space-y-6" onSubmit={handleEditData}>
          {["title", "description", "correct_answer", "answers"].map(
            (section) => (
              <div key={section}>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  {section.replace("_", " ").toUpperCase()}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {["uz", "ru", "en"].map((lang) => (
                    <input
                      key={lang}
                      type="text"
                      placeholder={`${section} (${lang.toUpperCase()})`}
                      value={editData[section][lang]}
                      onChange={(e) =>
                        handleEditChange(section, lang, e.target.value)
                      }
                      className="w-full p-2 rounded-lg bg-slate-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ))}
                </div>
              </div>
            )
          )}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Category
            </label>
            <select
              value={editData.category_id}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full bg-slate-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name.en}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-4 pt-4 border-t border-slate-600">
            <button
              type="button"
              onClick={() => setEditModalOpen(false)}
              className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-500 transition text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition text-sm"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={deleteModalOpen}
        onRequestClose={() => setDeleteModalOpen(false)}
        className="bg-slate-800 p-6 rounded-lg max-w-md mx-auto mt-20 text-white"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]"
      >
        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
        <p className="mb-6">
          Are you sure you want to delete{" "}
          <strong>{selectedTask?.title?.en}</strong>?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setDeleteModalOpen(false)}
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default OrdersTable;
