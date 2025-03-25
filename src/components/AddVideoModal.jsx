import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Modal from "react-modal";
import { $axios } from "../https/api";

Modal.setAppElement("#root");

const AddVideoModal = ({ onVideoAdded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [mediaUrls, setMediaUrls] = useState([]);
  const [newVideo, setNewVideo] = useState({
    category_id: "",
    media_url: [],
  });

  // Загрузка категорий из API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await $axios.get("/category/get/list");
        setCategories(res.data.categories || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // Обработка выбора файлов и их загрузка через Promise.all
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);

    const uploadedUrls = await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
          const res = await $axios.post("/file-upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return res.data.url; // Предполагаем, что API возвращает { url: "string" }
        } catch (error) {
          console.error(`Failed to upload ${file.name}:`, error);
          return null;
        }
      })
    );

    const validUrls = uploadedUrls.filter((url) => url !== null);
    setMediaUrls((prev) => [...prev, ...validUrls]);
  };

  // Удаление файла из списков
  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setMediaUrls((prev) => prev.filter((_, i) => i !== index));
  };

  // Обработка отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        category_id: newVideo.category_id,
        media_url: mediaUrls, // Используем уже загруженные URL-адреса
      };

      console.log("Отправляемые данные:", payload);

      const res = await $axios.post("/video/create", payload);
      console.log("Response:", res);

      if (typeof onVideoAdded === "function") {
        onVideoAdded(res.data); // Передаем новый видеоурок в родительский компонент
      }

      // Сбрасываем форму
      setNewVideo({
        category_id: "",
        media_url: [],
      });
      setSelectedFiles([]);
      setMediaUrls([]);
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to create video lesson:", error);
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
        Add New Video
      </button>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="bg-slate-800 text-white p-6 rounded-2xl w-full max-w-3xl mx-auto mt-20 shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]"
      >
        <h3 className="text-2xl font-semibold mb-6 border-b border-slate-600 pb-3">
          Add New Video Lesson
        </h3>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Category
            </label>
            <select
              value={newVideo.category_id}
              onChange={(e) =>
                setNewVideo((prev) => ({
                  ...prev,
                  category_id: e.target.value,
                }))
              }
              className="w-full bg-slate-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            >
              <option value="" disabled>
                Select category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name.en}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Upload Videos
            </label>
            <input
              type="file"
              multiple
              accept="video/*"
              onChange={handleFileChange}
              className="w-full p-2 rounded-lg bg-slate-700 text-gray-300 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-500"
              disabled={loading}
            />
            {selectedFiles.length > 0 && (
              <div className="mt-2 space-y-2">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-slate-700 rounded-lg"
                  >
                    <span className="text-sm truncate max-w-[70%]">
                      {file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="px-2 py-1 bg-red-600 rounded hover:bg-red-500 transition text-sm"
                      disabled={loading}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
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
              disabled={loading || mediaUrls.length === 0}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddVideoModal;
