import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  ChefHat,
  Package,
} from "lucide-react";

const orders = [
  {
    id: "ORD-001",
    items: ["Butter Chicken x2", "Paneer Tikka x1"],
    total: 1280,
    status: "preparing",
    time: "15 mins ago",
  },
  {
    id: "ORD-002",
    items: ["Biryani x1", "Dal Makhani x1"],
    total: 740,
    status: "ready",
    time: "Today, 12:30 PM",
  },
];

const orderSteps = [
  { label: "Order Placed", icon: CheckCircle, status: "completed" },
  { label: "Preparing", icon: ChefHat, status: "active" },
  { label: "Ready", icon: Package, status: "pending" },
  { label: "Completed", icon: CheckCircle, status: "pending" },
];

export default function OrderTracking() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <nav className="bg-[#1A1A1A]/80 backdrop-blur-xl border-b border-[#D4AF37]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/customer/home")}
            className="p-2 hover:bg-[#D4AF37]/20 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#D4AF37]" />
          </button>
          <h1 className="text-2xl font-serif bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] bg-clip-text text-transparent">
            Order Tracking
          </h1>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1A1A1A]/50 backdrop-blur-sm border border-[#D4AF37]/30 rounded-2xl p-6"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl text-[#F5F5F5] mb-1">{order.id}</h3>
                  <p className="text-[#A0A0A0] text-sm">{order.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#D4AF37] text-2xl">₹{order.total}</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm mt-2 ${
                      order.status === "ready"
                        ? "bg-[#10B981]/20 text-[#10B981]"
                        : "bg-[#F59E0B]/20 text-[#F59E0B]"
                    }`}
                  >
                    {order.status === "ready" ? "Ready" : "Preparing"}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-[#A0A0A0] mb-2">Items:</h4>
                {order.items.map((item, i) => (
                  <p key={i} className="text-[#F5F5F5]">
                    • {item}
                  </p>
                ))}
              </div>

              <div className="relative">
                <div className="flex justify-between items-center">
                  {orderSteps.map((step, i) => {
                    const Icon = step.icon;
                    const isActive =
                      step.status === "active" ||
                      step.status === "completed" ||
                      (order.status === "ready" && i <= 2);
                    const isCompleted =
                      step.status === "completed" ||
                      (order.status === "ready" && i <= 2);

                    return (
                      <div key={i} className="flex flex-col items-center z-10">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                            isCompleted
                              ? "bg-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                              : isActive
                                ? "bg-[#F59E0B] shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                                : "bg-[#2A2A2A]"
                          }`}
                        >
                          <Icon
                            className={`w-6 h-6 ${
                              isCompleted || isActive
                                ? "text-[#0D0D0D]"
                                : "text-[#A0A0A0]"
                            }`}
                          />
                        </div>
                        <span
                          className={`text-sm ${
                            isCompleted || isActive
                              ? "text-[#F5F5F5]"
                              : "text-[#A0A0A0]"
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="absolute top-6 left-0 right-0 h-0.5 bg-[#2A2A2A] -z-0">
                  <div
                    className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] transition-all duration-500"
                    style={{
                      width:
                        order.status === "ready"
                          ? "66%"
                          : order.status === "preparing"
                            ? "33%"
                            : "0%",
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
