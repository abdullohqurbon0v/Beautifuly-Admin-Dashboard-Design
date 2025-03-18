import {
  Calendar,
  ChevronsUpDown,
  Edit,
  PencilLine,
  Search,
  Trash2,
} from "lucide-react";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { $axios } from "../https/api";

Modal.setAppElement("#root");

const LessonsTable = () => {
  const [search, setSearch] = useState("");
  const [lessons, setLessons] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ offset: 0, limit: 10 });
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lessonToDelete, setLessonToDelete] = useState(null);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setFilters((prev) => ({
      ...prev,
      offset: (newPage - 1) * prev.limit,
    }));
  };

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      try {
        const res = await $axios.get(
          `/lesson/get/list?limit=${filters.limit}&offset=${filters.offset}`
        );
        setLessons(res.data.lessons);
        setCount(res.data.count || res.data.lessons.length);
      } catch (error) {
        console.error("Failed to fetch lessons:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, [filters]);

  const handleSearchLesson = (event) => {
    const query = event.target.value.trim().toLowerCase();
    setSearch(query);
  };

  const filteredLessons = lessons.filter((lesson) =>
    lesson.title?.en?.toLowerCase().includes(search)
  );

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        category_id: selectedLesson.category_id,
        description: {
          uz: selectedLesson.description.uz,
          ru: selectedLesson.description.ru,
          en: selectedLesson.description.en,
        },
        media_url: selectedLesson.media_url,
        title: {
          uz: selectedLesson.title.uz,
          ru: selectedLesson.title.ru,
          en: selectedLesson.title.en,
        },
      };
      const res = await $axios.put(
        `/lesson/update?id=${selectedLesson.id}`,
        payload
      );
      const updatedLessons = lessons.map((lesson) =>
        lesson.id === selectedLesson.id ? { ...lesson, ...payload } : lesson
      );
      setLessons(updatedLessons);
      setIsEditModalOpen(false);
      console.log(res.data);
    } catch (error) {
      console.error("Failed to update lesson:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const res = await $axios.delete(`/lesson/delete?id=${lessonToDelete.id}`);
      const filteredLessons = lessons.filter(
        (lesson) => lesson.id !== lessonToDelete.id
      );
      setLessons(filteredLessons);
      setCount((prev) => prev - 1);
      setIsDeleteModalOpen(false);
      setLessonToDelete(null);
      console.log(res.data);
    } catch (error) {
      console.error("Failed to delete lesson:", error);
    }
  };

  const truncateText = (text, maxLength = 20) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="bg-[#0B1739] bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 mb-8">
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
        className="bg-[#0B1739] rounded-lg p-6 max-w-lg mx-auto mt-20 shadow-xl z-50 relative"
      >
        {selectedLesson && (
          <>
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
              Edit Lesson
            </h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              {/* Title Fields */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Title (UZ)"
                  value={selectedLesson.title.uz}
                  onChange={(e) =>
                    setSelectedLesson({
                      ...selectedLesson,
                      title: {
                        ...selectedLesson.title,
                        uz: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none mb-2"
                />
                <input
                  type="text"
                  placeholder="Title (RU)"
                  value={selectedLesson.title.ru}
                  onChange={(e) =>
                    setSelectedLesson({
                      ...selectedLesson,
                      title: {
                        ...selectedLesson.title,
                        ru: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none mb-2"
                />
                <input
                  type="text"
                  placeholder="Title (EN)"
                  value={selectedLesson.title.en}
                  onChange={(e) =>
                    setSelectedLesson({
                      ...selectedLesson,
                      title: {
                        ...selectedLesson.title,
                        en: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none"
                />
              </div>

              {/* Description Fields */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="Description (UZ)"
                  value={selectedLesson.description.uz}
                  onChange={(e) =>
                    setSelectedLesson({
                      ...selectedLesson,
                      description: {
                        ...selectedLesson.description,
                        uz: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none mb-2"
                />
                <input
                  type="text"
                  placeholder="Description (RU)"
                  value={selectedLesson.description.ru}
                  onChange={(e) =>
                    setSelectedLesson({
                      ...selectedLesson,
                      description: {
                        ...selectedLesson.description,
                        ru: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none mb-2"
                />
                <input
                  type="text"
                  placeholder="Description (EN)"
                  value={selectedLesson.description.en}
                  onChange={(e) =>
                    setSelectedLesson({
                      ...selectedLesson,
                      description: {
                        ...selectedLesson.description,
                        en: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none"
                />
              </div>

              {/* Media URL */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Media URL
                </label>
                <input
                  type="text"
                  placeholder="Media URL"
                  value={selectedLesson.media_url[0] || ""}
                  onChange={(e) =>
                    setSelectedLesson({
                      ...selectedLesson,
                      media_url: [e.target.value],
                    })
                  }
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Category ID
                </label>
                <input
                  type="text"
                  placeholder="Category ID"
                  value={selectedLesson.category_id}
                  onChange={(e) =>
                    setSelectedLesson({
                      ...selectedLesson,
                      category_id: e.target.value,
                    })
                  }
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none"
                />
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </>
        )}
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
        className="bg-[#0B1739] rounded-lg p-6 max-w-md mx-auto mt-20 shadow-xl z-50 relative"
      >
        <div className="text-center">
          <Trash2 className="mx-auto text-red-400 mb-4" size={40} />
          <h2 className="text-xl font-semibold text-gray-100 mb-2">
            Delete Lesson
          </h2>
          <p className="text-gray-400 mb-6">
            Are you sure you want to delete {lessonToDelete?.title?.en}? This
            action cannot be undone.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-6 py-2 text-gray-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirm}
              className="px-6 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
      <div className="mb-4 flex items-center max-w-64 bg-gray-800 rounded-lg px-4 py-2">
        <Search className="text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search lessons..."
          value={search}
          onChange={handleSearchLesson}
          className="w-full bg-transparent text-white placeholder-gray-500 px-3 focus:outline-none"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-gray-400 uppercase tracking-wider">
                <div className="flex text-sm items-center font-bold space-x-2">
                  <PencilLine />
                  <span>Title</span>
                  <ChevronsUpDown />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-gray-400 uppercase tracking-wider">
                <div className="flex text-sm items-center font-bold space-x-2">
                  <PencilLine />
                  <span>Description</span>
                  <ChevronsUpDown />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-gray-400 uppercase tracking-wider">
                <div className="flex text-sm items-center font-bold space-x-2">
                  <Calendar />
                  <span>Media URL</span>
                  <ChevronsUpDown />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-gray-400 uppercase tracking-wider">
                <div className="flex text-sm items-center font-bold space-x-2">
                  <Calendar />
                  <span>Category ID</span>
                  <ChevronsUpDown />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-gray-400 uppercase tracking-wider">
                <div className="flex text-sm items-center font-bold space-x-2">
                  <span>Actions</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredLessons.map((lesson) => (
              <tr
                key={lesson.id}
                className="hover:bg-slate-900 cursor-pointer transition-all"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                  {truncateText(lesson.title?.en)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {truncateText(lesson.description?.en)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {lesson.media_url?.length > 0
                    ? truncateText(lesson.media_url[0])
                    : "No media"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {lesson.category_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <button
                    className="text-indigo-400 hover:text-indigo-300 mr-6"
                    onClick={() => {
                      setSelectedLesson(lesson);
                      setIsEditModalOpen(true);
                    }}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => {
                      setLessonToDelete(lesson);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
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

export default LessonsTable;
