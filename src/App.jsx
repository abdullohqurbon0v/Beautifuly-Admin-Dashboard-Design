import { Route, Routes, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import { useEffect, useState } from "react";
import { $axios } from "./https/api";
import { useUsers } from "./hooks/user-users";
import Tests from "./pages/Tests";
import Lessons from "./pages/Lessons";
import SignIn from "./pages/SignIn";
import Category from "./pages/Category";
import Video from "./pages/Video";

function App() {
  const navigate = useNavigate();
  const [pagination] = useState({
    limit: 10,
    offset: 0,
  });
  const { changeLoading, setUsers, setCount } = useUsers();

  useEffect(() => {
    const checkAuthAndFetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }
      changeLoading();
      try {
        const res = await $axios.get(
          `/user/get/list?offset=${pagination.offset}&limit=${pagination.limit}`
        );
        setUsers(res.data.users);
        setCount(res.data.count);
      } catch (error) {
        console.error(error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem("token");
          navigate("/signin");
        }
      } finally {
        changeLoading();
      }
    };

    checkAuthAndFetchUsers();
  }, [
    navigate,
    pagination.offset,
    pagination.limit,
    changeLoading,
    setUsers,
    setCount,
  ]);

  return (
    <div className="flex h-screen bg-[#081028] text-gray-100 overflow-hidden">
      <Sidebar />
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/users" element={<ProductsPage />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/categorys" element={<Category />} />
        <Route path="/videos" element={<Video />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
