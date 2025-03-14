import { useState } from "react";
import AddTestModal from "../components/AddTest";
import OrdersTable from "../components/OrdersTable";

const Tests = () => {
  const [tasks, setTasks] = useState([]);
  const handleTestAdded = (newTest) => {
    setTasks((prev) => [newTest, ...prev]);
  };
  return (
    <div className="mx-auto min-w-[1200px]">
      <header className="bg-[#081028] bg-opacity-50 ">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-100">Analytics</h1>
          <AddTestModal onTestAdded={handleTestAdded} />
        </div>
      </header>
      <OrdersTable />
    </div>
  );
};

export default Tests;
