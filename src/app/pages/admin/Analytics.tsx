import { motion } from "motion/react";
import {
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
  Table2,
  ChefHat,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import AdminNav from "../../components/AdminNav";

const salesTrend = [
  { month: "Jan", sales: 45000, orders: 420 },
  { month: "Feb", sales: 52000, orders: 480 },
  { month: "Mar", sales: 48000, orders: 450 },
  { month: "Apr", sales: 61000, orders: 520 },
];

const categoryData = [
  { name: "Main Course", value: 45 },
  { name: "Appetizers", value: 25 },
  { name: "Desserts", value: 15 },
  { name: "Beverages", value: 15 },
];

const occupancyData = [
  { day: "Mon", rate: 65 },
  { day: "Tue", rate: 58 },
  { day: "Wed", rate: 72 },
  { day: "Thu", rate: 68 },
  { day: "Fri", rate: 85 },
  { day: "Sat", rate: 92 },
  { day: "Sun", rate: 88 },
];

const COLORS = ["#D4AF37", "#F4D03F", "#B8960F", "#FFD700"];

export default function Analytics() {
  return (
    <div className="flex min-h-screen bg-[#0D0D0D]">
      <AdminNav />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl text-[#F5F5F5] mb-2">Analytics</h1>
            <p className="text-[#A0A0A0]">
              Detailed insights and performance metrics
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              {
                label: "Avg Order Value",
                value: "₹1,245",
                icon: DollarSign,
                color: "from-[#D4AF37] to-[#F4D03F]",
              },
              {
                label: "Customer Retention",
                value: "78%",
                icon: Users,
                color: "from-[#10B981] to-[#34D399]",
              },
              {
                label: "Popular Item",
                value: "Biryani",
                icon: ChefHat,
                color: "from-[#F59E0B] to-[#FBBF24]",
              },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#1A1A1A]/50 backdrop-blur-sm border border-[#D4AF37]/20 rounded-2xl p-6"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-6 h-6 text-[#0D0D0D]" />
                  </div>
                  <h3 className="text-[#A0A0A0] mb-1">{stat.label}</h3>
                  <p className="text-3xl text-[#F5F5F5]">{stat.value}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#1A1A1A]/50 backdrop-blur-sm border border-[#D4AF37]/20 rounded-2xl p-6"
            >
              <h2 className="text-2xl text-[#F5F5F5] mb-6">
                Sales & Orders Trend
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                  <XAxis dataKey="month" stroke="#A0A0A0" />
                  <YAxis yAxisId="left" stroke="#A0A0A0" />
                  <YAxis yAxisId="right" orientation="right" stroke="#A0A0A0" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1A1A1A",
                      border: "1px solid rgba(212, 175, 55, 0.3)",
                      borderRadius: "12px",
                    }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="sales"
                    stroke="#D4AF37"
                    strokeWidth={3}
                    name="Sales (₹)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="orders"
                    stroke="#10B981"
                    strokeWidth={3}
                    name="Orders"
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#1A1A1A]/50 backdrop-blur-sm border border-[#D4AF37]/20 rounded-2xl p-6"
            >
              <h2 className="text-2xl text-[#F5F5F5] mb-6">
                Category Distribution
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1A1A1A",
                      border: "1px solid rgba(212, 175, 55, 0.3)",
                      borderRadius: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#1A1A1A]/50 backdrop-blur-sm border border-[#D4AF37]/20 rounded-2xl p-6"
          >
            <h2 className="text-2xl text-[#F5F5F5] mb-6">
              Table Occupancy Rate
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                <XAxis dataKey="day" stroke="#A0A0A0" />
                <YAxis stroke="#A0A0A0" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1A1A1A",
                    border: "1px solid rgba(212, 175, 55, 0.3)",
                    borderRadius: "12px",
                  }}
                />
                <Bar
                  dataKey="rate"
                  fill="#D4AF37"
                  radius={[8, 8, 0, 0]}
                  name="Occupancy %"
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
