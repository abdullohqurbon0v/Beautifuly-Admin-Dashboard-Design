import { Plus, Trash2 } from "lucide-react";
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
    answers: [
      { id: "a", uz: "", ru: "", en: "" },
      { id: "b", uz: "", ru: "", en: "" },
    ],
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

  const addAnswerOption = () => {
    const newId = String.fromCharCode(97 + newTest.answers.length);
    setNewTest((prev) => ({
      ...prev,
      answers: [...prev.answers, { id: newId, uz: "", ru: "", en: "" }],
    }));
  };

  const removeAnswerOption = (index) => {
    if (newTest.answers.length > 2) {
      setNewTest((prev) => ({
        ...prev,
        answers: prev.answers
          .filter((_, i) => i !== index)
          .map((answer, i) => ({
            ...answer,
            id: String.fromCharCode(97 + i),
          })),
      }));
    }
  };
  const updateAnswer = (index, lang, value) => {
    setNewTest((prev) => ({
      ...prev,
      answers: prev.answers.map((answer, i) =>
        i === index ? { ...answer, [lang]: value } : answer
      ),
    }));
  };

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
          uz: newTest.answers.map((answer) => answer.uz),
          ru: newTest.answers.map((answer) => answer.ru),
          en: newTest.answers.map((answer) => answer.en),
        },
        category_id: newTest.category_id,
      };

      const res = await $axios.post("/test/create", payload);
      console.log(res);
      onTestAdded(res.data);
      setNewTest({
        title: { uz: "", ru: "", en: "" },
        description: { uz: "", ru: "", en: "" },
        correct_answer: { uz: "", ru: "", en: "" },
        answers: [
          { id: "a", uz: "", ru: "", en: "" },
          { id: "b", uz: "", ru: "", en: "" },
        ],
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
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-300">
                Answers
              </label>
              <button
                type="button"
                onClick={addAnswerOption}
                className="flex items-center px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition text-sm"
              >
                <Plus size={14} className="mr-1" />
                Add Option
              </button>
            </div>
            {newTest.answers.map((answer, index) => (
              <div key={answer.id} className="mb-4 relative">
                <p className="text-sm mb-1 text-gray-400">
                  Answer {answer.id.toUpperCase()}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {["uz", "ru", "en"].map((lang) => (
                    <input
                      key={`${answer.id}-${lang}`}
                      type="text"
                      placeholder={`Answer ${answer.id.toUpperCase()} (${lang.toUpperCase()})`}
                      value={answer[lang]}
                      onChange={(e) =>
                        updateAnswer(index, lang, e.target.value)
                      }
                      className="w-full p-2 rounded-lg bg-slate-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  ))}
                </div>
                {newTest.answers.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeAnswerOption(index)}
                    className="absolute -top-2 right-0 text-red-400 hover:text-red-300 text-sm"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
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
