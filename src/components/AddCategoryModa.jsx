import { Plus } from "lucide-react";
import { useState } from "react";
import Modal from "react-modal";
import { $axios } from "../https/api";

Modal.setAppElement("#root");

const AddCategoryModal = ({ onCategoryAdded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: { uz: "", ru: "", en: "" },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: {
          uz: newCategory.name.uz,
          ru: newCategory.name.ru,
          en: newCategory.name.en,
        },
      };
      const res = await $axios.post("/category/create", payload);
      console.log(res);
      onCategoryAdded(res.data);
      setNewCategory({
        name: { uz: "", ru: "", en: "" },
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to create category:", error);
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
      >
        <Plus size={18} className="mr-2" />
        Add New Category
      </button>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="bg-slate-800 text-white p-6 rounded-2xl w-full max-w-3xl mx-auto mt-20 shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]"
      >
        <h3 className="text-2xl font-semibold mb-6 border-b border-slate-600 pb-3">
          Add New Category
        </h3>

        <form className="space-y-6" onSubmit={handleSubmit}>
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
                  value={newCategory.name[lang]}
                  onChange={(e) =>
                    setNewCategory((prev) => ({
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
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-500 transition text-sm disabled:opacity-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition text-sm disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddCategoryModal;
