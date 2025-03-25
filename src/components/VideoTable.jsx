import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { $axios } from "../https/api";

const VideoTable = () => {
  const [videos, setVideos] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ offset: 0, limit: 10 });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const res = await $axios.get(`/video-lesson/get/list`);
        console.log(res);
        setVideos(res.data.video_lessons || []);
        setCount(res.data.count || 0);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
        setVideos([]);
        setCount(0);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [filters]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setFilters((prev) => ({
      ...prev,
      offset: (newPage - 1) * prev.limit,
    }));
  };

  return (
    <div className="bg-[#0B1739] bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Video Lessons</h2>
        <div className="flex items-center px-5 bg-gray-700 rounded-lg">
          <Search className="text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search videos..."
            className="w-full text-white bg-transparent placeholder-gray-400 rounded-lg pl-2 pr-4 py-2 focus:outline-none"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              {["ID", "Category ID", "Media URL", "Additional Prop 1"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-gray-400 uppercase tracking-wider"
                  >
                    <div className="flex items-center font-bold space-x-2">
                      <span>{header}</span>
                    </div>
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-300">
                  Loading...
                </td>
              </tr>
            ) : videos.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-300">
                  No videos found
                </td>
              </tr>
            ) : (
              videos.map((video) => (
                <tr key={video.id} className="hover:bg-slate-900">
                  <td className="px-6 py-4 truncate text-sm text-gray-300 max-w-[200px]">
                    {video.id}
                  </td>
                  <td className="px-6 py-4 truncate text-sm text-gray-300 max-w-[200px]">
                    {video.category_id}
                  </td>
                  <td className="px-6 py-4 truncate text-sm text-gray-300 max-w-[200px]">
                    {video.media_url[0] || "No URL"}
                  </td>
                  <td className="px-6 py-4 truncate text-sm text-gray-300 max-w-[200px]">
                    {video.category.additionalProp1 || "N/A"}
                  </td>
                </tr>
              ))
            )}
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

export default VideoTable;
