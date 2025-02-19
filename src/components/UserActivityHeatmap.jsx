import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts";

const userActivityData = [
  {
    "12-16": 100,
    "16-20": 50,
    "20-24": 70,
  },
  {
    "12-16": 170,
    "16-20": 30,
    "20-24": 80,
  },
  {
    "12-16": 200,
    "16-20": 120,
    "20-24": 50,
  },
  {
    "12-16": 140,
    "16-20": 40,
    "20-24": 100,
  },
  {
    "12-16": 100,
    "16-20": 60,
    "20-24": 30,
  },
  {
    "12-16": 130,
    "16-20": 100,
    "20-24": 40,
  },
  {
    "12-16": 60,
    "16-20": 40,
    "20-24": 20,
  },
  {
    "12-16": 140,
    "16-20": 160,
    "20-24": 90,
  },
  {
    "12-16": 100,
    "16-20": 70,
    "20-24": 50,
  },
  {
    "12-16": 40,
    "16-20": 100,
    "20-24": 130,
  },
];

const UserActivityHeatmap = () => {
  return (
    <div className="bg-[#0B1739] bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 col-span-2 ">
      <h2 className="text-xl font-semibold text-gray-100 mb-4">
        Revenue by customer type
      </h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart barSize={10} data={userActivityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />

            <Legend />
            <Bar dataKey="12-16" stackId="a" fill="#054649" />
            <Bar dataKey="16-20" stackId="a" fill="#0E43FB" />
            <Bar dataKey="20-24" stackId="a" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default UserActivityHeatmap;
