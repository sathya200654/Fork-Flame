import { useState } from "react";
import { motion } from "motion/react";
import { Plus, Edit, AlertTriangle, TrendingUp, TrendingDown, Package } from "lucide-react";
import { toast } from "sonner";
import AdminNav from "../../components/AdminNav";
import { useApp } from "../../context/AppContext";

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  threshold: number;
  category: string;
  lastUpdated: string;
}

const inventoryData: InventoryItem[] = [
  {
    id: 1,
    name: "Chicken",
    quantity: 15,
    unit: "kg",
    threshold: 20,
    category: "Meat",
    lastUpdated: "2 hours ago",
  },
  {
    id: 2,
    name: "Paneer",
    quantity: 8,
    unit: "kg",
    threshold: 10,
    category: "Dairy",
    lastUpdated: "1 hour ago",
  },
  {
    id: 3,
    name: "Basmati Rice",
    quantity: 50,
    unit: "kg",
    threshold: 30,
    category: "Grains",
    lastUpdated: "5 hours ago",
  },
  {
    id: 4,
    name: "Tomatoes",
    quantity: 3,
    unit: "kg",
    threshold: 15,
    category: "Vegetables",
    lastUpdated: "30 mins ago",
  },
  {
    id: 5,
    name: "Onions",
    quantity: 25,
    unit: "kg",
    threshold: 20,
    category: "Vegetables",
    lastUpdated: "1 hour ago",
  },
  {
    id: 6,
    name: "Cooking Oil",
    quantity: 2,
    unit: "liters",
    threshold: 10,
    category: "Oil",
    lastUpdated: "3 hours ago",
  },
];

export default function InventoryManagement() {
  const [inventory, setInventory] = useState(inventoryData);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const { addNotification } = useApp();

  const lowStockItems = inventory.filter((item) => item.quantity < item.threshold);

  const addStock = (id: number, amount: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + amount } : item
      )
    );
    toast.success("Stock updated");
  };

  const reduceStock = (id: number, amount: number) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity - amount);
          if (newQuantity < item.threshold) {
            addNotification({
              title: "Low Stock Alert",
              message: `${item.name} is running low (${newQuantity}${item.unit} remaining)`,
              type: "inventory",
            });
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
    toast.success("Stock reduced");
  };

  return (
    <div className="flex min-h-screen bg-[#0D0D0D]">
      <AdminNav />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl text-[#F5F5F5] mb-2">
                Inventory Management
              </h1>
              <p className="text-[#A0A0A0]">Track and manage stock levels</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setEditingItem(null);
                setShowModal(true);
              }}
              className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0D0D0D] px-6 py-3 rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Item
            </motion.button>
          </div>

          {lowStockItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#DC2626]/10 border border-[#DC2626]/30 rounded-2xl p-6 mb-8"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-[#DC2626] mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl text-[#DC2626] mb-2">
                    Low Stock Alerts ({lowStockItems.length})
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {lowStockItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#0D0D0D]/50 border border-[#DC2626]/20 rounded-xl p-3"
                      >
                        <p className="text-[#F5F5F5] mb-1">{item.name}</p>
                        <p className="text-[#DC2626] text-sm">
                          {item.quantity}{item.unit} / {item.threshold}{item.unit} threshold
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inventory.map((item, index) => {
              const isLowStock = item.quantity < item.threshold;
              const stockPercentage = (item.quantity / item.threshold) * 100;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-[#1A1A1A]/50 backdrop-blur-sm border rounded-2xl p-6 transition-all ${
                    isLowStock
                      ? "border-[#DC2626]/50 shadow-[0_0_20px_rgba(220,38,38,0.2)]"
                      : "border-[#D4AF37]/20 hover:border-[#D4AF37]"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isLowStock
                            ? "bg-[#DC2626]/20"
                            : "bg-gradient-to-br from-[#D4AF37] to-[#B8960F]"
                        }`}
                      >
                        <Package
                          className={`w-6 h-6 ${isLowStock ? "text-[#DC2626]" : "text-[#0D0D0D]"}`}
                        />
                      </div>
                      <div>
                        <h3 className="text-lg text-[#F5F5F5]">{item.name}</h3>
                        <p className="text-[#A0A0A0] text-sm">{item.category}</p>
                      </div>
                    </div>
                    {isLowStock && (
                      <AlertTriangle className="w-5 h-5 text-[#DC2626] animate-pulse" />
                    )}
                  </div>

                  <div className="mb-4">
                    <div className="flex items-end justify-between mb-2">
                      <span className="text-3xl text-[#F5F5F5]">
                        {item.quantity}
                        <span className="text-lg text-[#A0A0A0] ml-1">{item.unit}</span>
                      </span>
                      <span className="text-[#A0A0A0] text-sm">
                        Threshold: {item.threshold}{item.unit}
                      </span>
                    </div>
                    <div className="h-2 bg-[#0D0D0D] rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          isLowStock
                            ? "bg-gradient-to-r from-[#DC2626] to-[#EF4444]"
                            : "bg-gradient-to-r from-[#D4AF37] to-[#F4D03F]"
                        }`}
                        style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-[#A0A0A0] text-sm mb-4">
                    Last updated: {item.lastUpdated}
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addStock(item.id, 10)}
                      className="bg-[#10B981]/20 border border-[#10B981]/30 text-[#10B981] py-2 rounded-xl hover:bg-[#10B981]/30 transition-all flex items-center justify-center gap-2"
                    >
                      <TrendingUp className="w-4 h-4" />
                      Add Stock
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => reduceStock(item.id, 5)}
                      className="bg-[#F59E0B]/20 border border-[#F59E0B]/30 text-[#F59E0B] py-2 rounded-xl hover:bg-[#F59E0B]/30 transition-all flex items-center justify-center gap-2"
                    >
                      <TrendingDown className="w-4 h-4" />
                      Use Stock
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-[#0D0D0D]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-2xl p-6 max-w-md w-full"
          >
            <h2 className="text-2xl text-[#F5F5F5] mb-6">
              {editingItem ? "Edit Item" : "Add New Item"}
            </h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Item Name"
                defaultValue={editingItem?.name}
                className="w-full bg-[#0D0D0D]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-[#F5F5F5] placeholder:text-[#A0A0A0] focus:border-[#D4AF37] focus:outline-none"
              />
              <select
                defaultValue={editingItem?.category}
                className="w-full bg-[#0D0D0D]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-[#F5F5F5] focus:border-[#D4AF37] focus:outline-none"
              >
                <option>Vegetables</option>
                <option>Meat</option>
                <option>Dairy</option>
                <option>Spices</option>
                <option>Grains</option>
                <option>Oil</option>
              </select>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Quantity"
                  defaultValue={editingItem?.quantity}
                  className="w-full bg-[#0D0D0D]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-[#F5F5F5] placeholder:text-[#A0A0A0] focus:border-[#D4AF37] focus:outline-none"
                />
                <select
                  defaultValue={editingItem?.unit}
                  className="w-full bg-[#0D0D0D]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-[#F5F5F5] focus:border-[#D4AF37] focus:outline-none"
                >
                  <option>kg</option>
                  <option>liters</option>
                  <option>pieces</option>
                  <option>grams</option>
                </select>
              </div>
              <input
                type="number"
                placeholder="Threshold Level"
                defaultValue={editingItem?.threshold}
                className="w-full bg-[#0D0D0D]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-[#F5F5F5] placeholder:text-[#A0A0A0] focus:border-[#D4AF37] focus:outline-none"
              />
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0D0D0D] py-3 rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all"
                >
                  {editingItem ? "Update" : "Add"} Item
                </motion.button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-[#2A2A2A] text-[#F5F5F5] py-3 rounded-xl hover:bg-[#333] transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
