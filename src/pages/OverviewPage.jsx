import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";

import Header from "../components/Header";
import StatCard from "../components/StatCard";
import OrdersTable from "../components/OrdersTable";
import UserActivityHeatmap from "../components/UserActivityHeatmap";
import SalesOverviewChart from "../components/SalesOverviewChart";
import CategoryDistributionChart from "../components/CategoryDistributionChart";
import Products from "../components/Products";

const OverviewPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Analytics" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Save Products"
            icon={Zap}
            value="50.8K"
            color="#6366F1"
            arrow={true}
            status={true}
          />
          <StatCard
            name="Stock Products"
            icon={Users}
            value="23.6K"
            color="#8B5CF6"
            arrow={false}
            status={true}
          />
          <StatCard
            name="Sale Products"
            icon={ShoppingBag}
            value="756K"
            color="#EC4899"
            arrow={true}
            status={true}
          />
          <StatCard
            name="Average Revenue"
            icon={BarChart2}
            value="2.3K"
            color="#10B981"
            arrow={false}
            status={true}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <CategoryDistributionChart />
          <UserActivityHeatmap />
          <Products />
          <SalesOverviewChart />
        </div>
        <OrdersTable />
      </main>
    </div>
  );
};
export default OverviewPage;
