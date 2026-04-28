import { useState } from "react";
import { motion } from "motion/react";
import { Plus, Edit, Trash2, Upload, ToggleLeft, ToggleRight } from "lucide-react";
import { toast } from "sonner";
import AdminNav from "../../components/AdminNav";

const menuItems = [
  {
    id: 1,
    name: "Butter Chicken",
    price: 450,
    category: "Main Course",
    veg: false,
    available: true,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=200",
  },
  {
    id: 2,
    name: "Paneer Tikka",
    price: 380,
    category: "Appetizer",
    veg: true,
    available: true,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200",
  },
  {
    id: 3,
    name: "Biryani",
    price: 420,
    category: "Main Course",
    veg: false,
    available: false,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200",
  },
];

export default function MenuManagement() {
  const [items, setItems] = useState(menuItems);
  const [showModal, setShowModal] = useState(false);

  const toggleAvailability = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
    toast.success("Availability updated");
  };

  const deleteItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item deleted");
  };

  return (
    <div className="flex min-h-screen bg-[#0D0D0D]">
      <AdminNav />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl text-[#F5F5F5] mb-2">Menu Management</h1>
              <p className="text-[#A0A0A0]">Add and manage your menu items</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0D0D0D] px-6 py-3 rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Item
            </motion.button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1A1A1A]/50 backdrop-blur-sm border border-[#D4AF37]/20 rounded-2xl overflow-hidden hover:border-[#D4AF37] transition-all"
              >
                <div className="relative h-48">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-[#0D0D0D]/80 backdrop-blur-sm rounded-full">
                    <span
                      className={`text-sm ${item.veg ? "text-[#10B981]" : "text-[#DC2626]"}`}
                    >
                      {item.veg ? "VEG" : "NON-VEG"}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg text-[#F5F5F5] mb-1">
                        {item.name}
                      </h3>
                      <p className="text-[#A0A0A0] text-sm">{item.category}</p>
                    </div>
                    <span className="text-[#D4AF37] text-xl">₹{item.price}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <button
                      onClick={() => toggleAvailability(item.id)}
                      className={`flex-1 px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-all ${
                        item.available
                          ? "bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30"
                          : "bg-[#DC2626]/20 text-[#DC2626] border border-[#DC2626]/30"
                      }`}
                    >
                      {item.available ? (
                        <ToggleRight className="w-5 h-5" />
                      ) : (
                        <ToggleLeft className="w-5 h-5" />
                      )}
                      {item.available ? "Available" : "Unavailable"}
                    </button>
                    <button className="p-2 bg-[#D4AF37]/20 text-[#D4AF37] rounded-lg hover:bg-[#D4AF37]/30 transition-colors">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="p-2 bg-[#DC2626]/20 text-[#DC2626] rounded-lg hover:bg-[#DC2626]/30 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
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
            <h2 className="text-2xl text-[#F5F5F5] mb-6">Add New Item</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Item Name"
                className="w-full bg-[#0D0D0D]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-[#F5F5F5] placeholder:text-[#A0A0A0] focus:border-[#D4AF37] focus:outline-none"
              />
              <input
                type="number"
                placeholder="Price"
                className="w-full bg-[#0D0D0D]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-[#F5F5F5] placeholder:text-[#A0A0A0] focus:border-[#D4AF37] focus:outline-none"
              />
              <select className="w-full bg-[#0D0D0D]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-[#F5F5F5] focus:border-[#D4AF37] focus:outline-none">
                <option>Appetizer</option>
                <option>Main Course</option>
                <option>Dessert</option>
                <option>Beverages</option>
              </select>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-[#F5F5F5]">
                  <input type="checkbox" className="w-4 h-4" />
                  Vegetarian
                </label>
              </div>
              <button
                type="button"
                className="w-full bg-[#0D0D0D]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-[#A0A0A0] hover:border-[#D4AF37] transition-all flex items-center justify-center gap-2"
              >
                <Upload className="w-5 h-5" />
                Upload Image
              </button>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0D0D0D] py-3 rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all"
                >
                  Add Item
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
