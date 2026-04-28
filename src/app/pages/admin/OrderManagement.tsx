import { useState } from "react";
import { motion } from "motion/react";
import { Clock, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import AdminNav from "../../components/AdminNav";

const ordersData = [
  {
    id: "ORD-001",
    customer: "John Doe",
    items: ["Butter Chicken x2", "Naan x4"],
    total: 980,
    status: "preparing",
    time: "10 mins ago",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    items: ["Paneer Tikka x1", "Dal Makhani x1"],
    total: 700,
    status: "ready",
    time: "25 mins ago",
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    items: ["Biryani x2", "Raita x2"],
    total: 900,
    status: "preparing",
    time: "5 mins ago",
  },
];

export default function OrderManagement() {
  const [orders, setOrders] = useState(ordersData);

  const updateStatus = (id: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
    toast.success(`Order ${id} marked as ${newStatus}`);
  };

  const cancelOrder = (id: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
    toast.success(`Order ${id} cancelled`);
  };

  return (
    <div className="flex min-h-screen bg-[#0D0D0D]">
      <AdminNav />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl text-[#F5F5F5] mb-2">Order Management</h1>
            <p className="text-[#A0A0A0]">
              Track and manage customer orders
            </p>
          </div>

          <div className="space-y-4">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1A1A1A]/50 backdrop-blur-sm border border-[#D4AF37]/20 rounded-2xl p-6 hover:border-[#D4AF37] transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl text-[#F5F5F5] mb-1">{order.id}</h3>
                    <p className="text-[#A0A0A0]">{order.customer}</p>
                    <p className="text-[#A0A0A0] text-sm">{order.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#D4AF37] text-2xl mb-2">
                      ₹{order.total}
                    </p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm ${
                        order.status === "ready"
                          ? "bg-[#10B981]/20 text-[#10B981]"
                          : order.status === "preparing"
                            ? "bg-[#F59E0B]/20 text-[#F59E0B]"
                            : "bg-[#DC2626]/20 text-[#DC2626]"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-[#A0A0A0] mb-2">Items:</h4>
                  {order.items.map((item, i) => (
                    <p key={i} className="text-[#F5F5F5]">
                      • {item}
                    </p>
                  ))}
                </div>

                <div className="flex gap-3">
                  {order.status === "preparing" && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => updateStatus(order.id, "ready")}
                      className="flex-1 bg-[#10B981]/20 border border-[#10B981]/30 text-[#10B981] py-2 rounded-xl hover:bg-[#10B981]/30 transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Mark Ready
                    </motion.button>
                  )}
                  {order.status === "ready" && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => updateStatus(order.id, "completed")}
                      className="flex-1 bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] py-2 rounded-xl hover:bg-[#D4AF37]/30 transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Complete
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => cancelOrder(order.id)}
                    className="flex-1 bg-[#DC2626]/20 border border-[#DC2626]/30 text-[#DC2626] py-2 rounded-xl hover:bg-[#DC2626]/30 transition-all flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-5 h-5" />
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[#2A2A2A] border border-[#D4AF37]/20 text-[#D4AF37] px-4 py-2 rounded-xl hover:border-[#D4AF37] transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Refund
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
