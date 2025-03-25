import React, { useEffect, useState } from "react";
import { Edit, Search, Trash2 } from "lucide-react";
import Modal from "react-modal";
import { $axios } from "../https/api";

Modal.setAppElement("#root");

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ offset: 0, limit: 10 });
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [editedCategory, setEditedCategory] = useState({
    name: { uz: "", ru: "", en: "" },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await $axios.get(
          `/category/get/list?limit=${filters.limit}&offset=${filters.offset}`
        );
        setCategories(res.data.categories || []);
        setCount(res.data.count || 0);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([]);
        setCount(0);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [filters]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setFilters((prev) => ({
      ...prev,
      offset: (newPage - 1) * prev.limit,
    }));
  };

  const handleEditOpen = (category) => {
    setSelectedCategory(category);
    setEditedCategory({
      name: {
        uz: category.name?.uz || "",
        ru: category.name?.ru || "",
        en: category.name?.en || "",
      },
    });
    setEditModalOpen(true);
  };

  const handleEditData = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: editedCategory.name,
      };
      const res = await $axios.put(
        `/category/update?id=${selectedCategory.id}`,
        payload
      );
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === selectedCategory.id ? { ...cat, ...res.data } : cat
        )
      );
      setEditModalOpen(false);
    } catch (error) {
      console.error("Edit failed:", error);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    try {
      await $axios.delete(`/category/delete?id=${selectedCategory.id}`);
      setCategories((prev) =>
        prev.filter((cat) => cat.id !== selectedCategory.id)
      );
      setCount((prev) => prev - 1);
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="bg-[#0B1739] bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Categories</h2>
        <div className="flex items-center px-5 bg-gray-700 rounded-lg">
          <Search className="text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full text-white bg-transparent placeholder-gray-400 rounded-lg pl-2 pr-4 py-2 focus:outline-none"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              {["ID", "Name (UZ)", "Name (RU)", "Name (EN)", "Actions"].map(
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
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-slate-900">
                <td className="px-6 py-4 truncate text-sm text-gray-300 max-w-[200px]">
                  {category.id}
                </td>
                <td className="px-6 py-4 truncate text-sm text-gray-300 max-w-[200px]">
                  {category.name?.uz}
                </td>
                <td className="px-6 py-4 truncate text-sm text-gray-300 max-w-[200px]">
                  {category.name?.ru}
                </td>
                <td className="px-6 py-4 truncate text-sm text-gray-300 max-w-[200px]">
                  {category.name?.en}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleEditOpen(category)}
                      className="text-indigo-400 hover:text-indigo-300"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCategory(category);
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

      {/* Edit Modal */}
      <Modal
        isOpen={editModalOpen}
        onRequestClose={() => setEditModalOpen(false)}
        className="bg-slate-800 text-white p-6 rounded-2xl w-full max-w-3xl mx-auto mt-20 shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]"
      >
        <h3 className="text-2xl font-semibold mb-6 border-b border-slate-600 pb-3">
          Edit Category
        </h3>
        <form className="space-y-6" onSubmit={handleEditData}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Name
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["uz", "ru", "en"].map((lang) => (
                <input
                  key={lang}
                  type="text"
                  placeholder={`Name (${lang.toUpperCase()})`}
                  value={editedCategory.name[lang]}
                  onChange={(e) =>
                    setEditedCategory((prev) => ({
                      ...prev,
                      name: { ...prev.name, [lang]: e.target.value },
                    }))
                  }
                  className="w-full p-2 rounded-lg bg-slate-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              ))}
            </div>
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

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onRequestClose={() => setDeleteModalOpen(false)}
        className="bg-slate-800 p-6 rounded-lg max-w-md mx-auto mt-20 text-white"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]"
      >
        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
        <p className="mb-6">
          Are you sure you want to delete{" "}
          <strong>{selectedCategory?.name?.en}</strong>?
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

export default CategoryTable;
