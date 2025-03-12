import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { $axios } from "../https/api";

Modal.setAppElement("#root");

const AddTestModal = ({ onTestAdded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [newTest, setNewTest] = useState({
    title: { uz: "", ru: "", en: "" },
    description: { uz: "", ru: "", en: "" },
    correct_answer: { uz: "", ru: "", en: "" },
    answers: {
      a: { uz: "", ru: "", en: "" },
      b: { uz: "", ru: "", en: "" },
      c: { uz: "", ru: "", en: "" },
    },
    category_id: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await $axios.get("/category/get/list");
        setCategories(res.data.categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        title: {
          uz: newTest.title.uz,
          ru: newTest.title.ru,
          en: newTest.title.en,
        },
        description: {
          uz: newTest.description.uz,
          ru: newTest.description.ru,
          en: newTest.description.en,
        },
        correct_answer: {
          uz: newTest.correct_answer.uz,
          ru: newTest.correct_answer.ru,
          en: newTest.correct_answer.en,
        },
        answers: {
          uz: [
            newTest.answers.a.uz,
            newTest.answers.b.uz,
            newTest.answers.c.uz,
          ],
          ru: [
            newTest.answers.a.ru,
            newTest.answers.b.ru,
            newTest.answers.c.ru,
          ],
          en: [
            newTest.answers.a.en,
            newTest.answers.b.en,
            newTest.answers.c.en,
          ],
        },
        category_id: newTest.category_id,
      };
      console.log(payload);

      const res = await $axios.post("/test/create", payload);
      console.log(res);
      onTestAdded(res.data);
      setNewTest({
        title: { uz: "", ru: "", en: "" },
        description: { uz: "", ru: "", en: "" },
        correct_answer: { uz: "", ru: "", en: "" },
        answers: {
          a: { uz: "", ru: "", en: "" },
          b: { uz: "", ru: "", en: "" },
          c: { uz: "", ru: "", en: "" },
        },
        category_id: "",
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to create test:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
      >
        <Plus size={18} className="mr-2" />
        Add New Test
      </button>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="bg-slate-800 text-white p-6 rounded-2xl w-full max-w-3xl mx-auto mt-20 shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]"
      >
        <h3 className="text-2xl font-semibold mb-6 border-b border-slate-600 pb-3">
          Add New Test
        </h3>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Title
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["uz", "ru", "en"].map((lang) => (
                <input
                  key={lang}
                  type="text"
                  placeholder={`Title (${lang.toUpperCase()})`}
                  value={newTest.title[lang]}
                  onChange={(e) =>
                    setNewTest((prev) => ({
                      ...prev,
                      title: { ...prev.title, [lang]: e.target.value },
                    }))
                  }
                  className="w-full p-2 rounded-lg bg-slate-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Description
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["uz", "ru", "en"].map((lang) => (
                <input
                  key={lang}
                  type="text"
                  placeholder={`Description (${lang.toUpperCase()})`}
                  value={newTest.description[lang]}
                  onChange={(e) =>
                    setNewTest((prev) => ({
                      ...prev,
                      description: {
                        ...prev.description,
                        [lang]: e.target.value,
                      },
                    }))
                  }
                  className="w-full p-2 rounded-lg bg-slate-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Correct Answer
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["uz", "ru", "en"].map((lang) => (
                <input
                  key={lang}
                  type="text"
                  placeholder={`Correct (${lang.toUpperCase()})`}
                  value={newTest.correct_answer[lang]}
                  onChange={(e) =>
                    setNewTest((prev) => ({
                      ...prev,
                      correct_answer: {
                        ...prev.correct_answer,
                        [lang]: e.target.value,
                      },
                    }))
                  }
                  className="w-full p-2 rounded-lg bg-slate-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Answers
            </label>
            {["a", "b", "c"].map((key) => (
              <div key={key} className="mb-4">
                <p className="text-sm mb-1 text-gray-400">
                  Answer {key.toUpperCase()}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {["uz", "ru", "en"].map((lang) => (
                    <input
                      key={`${key}-${lang}`}
                      type="text"
                      placeholder={`Answer ${key.toUpperCase()} (${lang.toUpperCase()})`}
                      value={newTest.answers[key][lang]}
                      onChange={(e) =>
                        setNewTest((prev) => ({
                          ...prev,
                          answers: {
                            ...prev.answers,
                            [key]: {
                              ...prev.answers[key],
                              [lang]: e.target.value,
                            },
                          },
                        }))
                      }
                      className="w-full p-2 rounded-lg bg-slate-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Category
            </label>
            <select
              value={newTest.category_id}
              onChange={(e) =>
                setNewTest((prev) => ({
                  ...prev,
                  category_id: e.target.value,
                }))
              }
              className="w-full bg-slate-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select category
              </option>
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

export default AddTestModal;
