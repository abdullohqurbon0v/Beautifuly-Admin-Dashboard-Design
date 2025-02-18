import { PieChart, Pie, Cell } from "recharts";

const organicData = [{ name: "Direct", value: 20, color: "#00C2FF" }];
const socialData = [{ name: "Social", value: 50, color: "#0E43FB" }];
const directData = [{ name: "Organic", value: 30, color: "#054649" }];

const CategoryDistributionChart = () => {
  return (
    <div
      className="bg-[#0B1739] bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">
        Website Visitors
      </h2>
      <div className="relative flex justify-center">
        <PieChart width={200} height={200}>
          <Pie
            data={organicData}
            dataKey="value"
            innerRadius={55}
            outerRadius={65}
            startAngle={180}
            endAngle={-0}
            paddingAngle={3}
          >
            <Cell fill={organicData[0].color} stroke="none" />
          </Pie>
          <Pie
            data={socialData}
            dataKey="value"
            innerRadius={70}
            outerRadius={80}
            startAngle={180}
            endAngle={-55}
            paddingAngle={3}
          >
            <Cell fill={socialData[0].color} stroke="none" />
          </Pie>
          <Pie
            data={directData}
            dataKey="value"
            innerRadius={85}
            outerRadius={95}
            startAngle={180}
            endAngle={-130}
            paddingAngle={3}
          >
            <Cell fill={directData[0].color} stroke="none" />
          </Pie>
        </PieChart>
        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
          150k
        </div>
      </div>
      <ul className="mt-4 space-y-1">
        {[...organicData, ...socialData, ...directData].map((entry, index) => (
          <li key={index} className="flex justify-between text-sm">
            <span className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: entry.color }}
              ></span>
              {entry.name}
            </span>
            <span>{entry.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default CategoryDistributionChart;
