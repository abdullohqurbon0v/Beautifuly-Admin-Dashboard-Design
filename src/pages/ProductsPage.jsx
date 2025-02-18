import Header from "../components/Header";
import StatCard from "../components/StatCard";

import { Layout, Heart, User, UserCircle2 } from "lucide-react";

import ProductsTable from "../components/ProductsTable";

const ProductsPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Users" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Users"
            icon={UserCircle2}
            value={250}
            color="#054649"
            status={false}
          />
          <StatCard
            name="New Users"
            icon={User}
            value={15}
            color="#FDB52A"
            status={false}
          />
          <StatCard
            name="Top Users"
            icon={Heart}
            value={200}
            color="#05C168"
            status={false}
          />
          <StatCard
            name="Other Users"
            icon={Layout}
            value={35}
            color="#086CD9"
            status={false}
          />
        </div>

        <ProductsTable />

        <div className="grid grid-col-1 lg:grid-cols-2 gap-8"></div>
      </main>
    </div>
  );
};
export default ProductsPage;
