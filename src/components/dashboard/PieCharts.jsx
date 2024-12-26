import {
  Pie,
  Tooltip,
  Legend,
  PieChart,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Speaking", value: 20, fill:"#336CFB" },
  { name: "Writing", value: 30, fill:"#ff8f00" },
  { name: "Reading", value: 10, fill:"#dc143c" },
  { name: "Listening", value: 10, fill:"#00d800" },
];
const COLORS = ["#336CFB", "#ff8f00", "#dc143c", "#336CFB"];
const PieChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart width={350} height={350}>
        <Pie
          dataKey="value"
          isAnimationActive={true}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={75}
          label
        />
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
export default PieChartComponent;
