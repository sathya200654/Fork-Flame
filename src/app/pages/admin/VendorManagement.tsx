import { useState } from "react";
import { motion } from "motion/react";
import { Plus, Edit, Trash2, Truck, Phone, Mail, Package } from "lucide-react";
import { toast } from "sonner";
import AdminNav from "../../components/AdminNav";

interface Vendor {
  id: number;
  name: string;
  category: string;
  email: string;
  phone: string;
  supplyFrequency: string;
  status: "active" | "inactive";
}

const vendorsData: Vendor[] = [
  {
    id: 1,
    name: "Fresh Farm Vegetables",
    category: "Vegetables",
    email: "contact@freshfarm.com",
    phone: "+91 98765 11111",
    supplyFrequency: "Daily",
    status: "active",
  },
  {
    id: 2,
    name: "Royal Meat Suppliers",
    category: "Meat",
    email: "info@royalmeat.com",
    phone: "+91 98765 22222",
    supplyFrequency: "Weekly",
    status: "active",
  },
  {
    id: 3,
    name: "Dairy Express",
    category: "Dairy",
    email: "sales@dairyexpress.com",
    phone: "+91 98765 33333",
    supplyFrequency: "Daily",
    status: "active",
  },
  {
    id: 4,
    name: "Spice Kingdom",
    category: "Spices",
    email: "orders@spicekingdom.com",
    phone: "+91 98765 44444",
    supplyFrequency: "Monthly",
    status: "active",
  },
];

export default function VendorManagement() {
  const [vendors, setVendors] = useState(vendorsData);
  const [showModal, setShowModal] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);

  const deleteVendor = (id: number) => {
    setVendors((prev) => prev.filter((vendor) => vendor.id !== id));
    toast.success("Vendor removed");
  };

  return (
    <div className="flex min-h-screen bg-[#0D0D0D]">
      <AdminNav />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl text-[#F5F5F5] mb-2">
                Vendor Management
              </h1>
              <p className="text-[#A0A0A0]">Manage suppliers and vendors</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setEditingVendor(null);
                setShowModal(true);
              }}
              className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0D0D0D] px-6 py-3 rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Vendor
            </motion.button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {vendors.map((vendor, index) => (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1A1A1A]/50 backdrop-blur-sm border border-[#D4AF37]/20 rounded-2xl p-6 hover:border-[#D4AF37] transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8960F] flex items-center justify-center">
                    <Truck className="w-8 h-8 text-[#0D0D0D]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl text-[#F5F5F5] mb-1">{vendor.name}</h3>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-[#D4AF37]" />
                      <span className="text-[#A0A0A0]">{vendor.category}</span>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      vendor.status === "active"
                        ? "bg-[#10B981]/20 text-[#10B981]"
                        : "bg-[#DC2626]/20 text-[#DC2626]"
                    }`}
                  >
                    {vendor.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-[#A0A0A0]">
                    <Mail className="w-4 h-4 text-[#D4AF37]" />
                    {vendor.email}
                  </div>
                  <div className="flex items-center gap-2 text-[#A0A0A0]">
                    <Phone className="w-4 h-4 text-[#D4AF37]" />
                    {vendor.phone}
                  </div>
                  <div className="flex items-center gap-2 text-[#A0A0A0]">
                    <span className="text-[#D4AF37]">📅</span>
                    Supply: {vendor.supplyFrequency}
                  </div>
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setEditingVendor(vendor);
                      setShowModal(true);
                    }}
                    className="flex-1 bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] py-2 rounded-xl hover:bg-[#D4AF37]/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => deleteVendor(vendor.id)}
                    className="flex-1 bg-[#DC2626]/20 border border-[#DC2626]/30 text-[#DC2626] py-2 rounded-xl hover:bg-[#DC2626]/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </motion.button>
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
            <h2 className="text-2xl text-[#F5F5F5] mb-6">
              {editingVendor ? "Edit Vendor" : "Add New Vendor"}
            </h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Vendor Name"
                defaultValue={editingVendor?.name}
                className="w-full bg-[#0D0D0D]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-[#F5F5F5] placeholder:text-[#A0A0A0] focus:border-[#D4AF37] focus:outline-none"
              />
              <select
                defaultValue={editingVendor?.category}
                className="w-full bg-[#0D0D0D]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-[#F5F5F5] focus:border-[#D4AF37] focus:outline-none"
              >
                <option>Vegetables</option>
                <option>Meat</option>
                <option>Dairy</option>
                <option>Spices</option>
                <option>Beverages</option>
                <option>Grains</option>
              </select>
              <input
                type="email"
                placeholder="Email"
                defaultValue={editingVendor?.email}
                className="w-full bg-[#0D0D0D]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-[#F5F5F5] placeholder:text-[#A0A0A0] focus:border-[#D4AF37] focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                defaultValue={editingVendor?.phone}
                className="w-full bg-[#0D0D0D]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-[#F5F5F5] placeholder:text-[#A0A0A0] focus:border-[#D4AF37] focus:outline-none"
              />
              <select
                defaultValue={editingVendor?.supplyFrequency}
                className="w-full bg-[#0D0D0D]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-[#F5F5F5] focus:border-[#D4AF37] focus:outline-none"
              >
                <option>Daily</option>
                <option>Weekly</option>
                <option>Bi-weekly</option>
                <option>Monthly</option>
              </select>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0D0D0D] py-3 rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all"
                >
                  {editingVendor ? "Update" : "Add"} Vendor
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
