import { Route, Routes } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import { useEffect, useState } from "react";
import { $axios } from "./https/api";
import { useUsers } from "./hooks/user-users";
import Tests from "./pages/Tests";
import Lessons from "./pages/Lessons";

function App() {
  const [pagination] = useState({
    limit: 10,
    offset: 0,
  });
  const { changeLoading, setUsers, setCount } = useUsers();

  useEffect(() => {
    changeLoading();
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDI1Njc2MDUsImlhdCI6MTc0MjMwODQwNSwicm9sZSI6ImFkbWluIiwidXNlcl9pZCI6ImY3YjNiM2I0LTNiM2ItNGIzYi1iM2IzLWIzYjNiM2IzYjNiMyJ9.xdSgaq53EumPejTE5Wg1gl5hvKdMebrEvHhVxGqVjmE"
    );
    async function getListUsers() {
      try {
        const res = await $axios.get(
          `/user/get/list?offset=${pagination.offset}&limit=${pagination.limit}`
        );
        console.log(res);
        setUsers(res.data.users);
        setCount(res.data.count);
      } catch (error) {
        console.error(error);
      } finally {
        changeLoading();
      }
    }
    getListUsers();
  }, []);

  return (
    <div className="flex h-screen bg-[#081028] text-gray-100 overflow-hidden">
      <Sidebar />
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/users" element={<ProductsPage />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/lessons" element={<Lessons />} />
      </Routes>
    </div>
  );
}

export default App;
