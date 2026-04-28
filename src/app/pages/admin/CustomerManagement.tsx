import { motion } from "motion/react";
import { User, ShoppingBag, Star, Mail, Phone } from "lucide-react";
import AdminNav from "../../components/AdminNav";

const customers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 8900",
    orders: 24,
    spent: 12450,
    rating: 4.8,
    joinDate: "Jan 2025",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 234 567 8901",
    orders: 18,
    spent: 9200,
    rating: 4.9,
    joinDate: "Feb 2025",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+1 234 567 8902",
    orders: 31,
    spent: 15780,
    rating: 4.7,
    joinDate: "Dec 2024",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "+1 234 567 8903",
    orders: 12,
    spent: 6300,
    rating: 5.0,
    joinDate: "Mar 2025",
  },
];

export default function CustomerManagement() {
  return (
    <div className="flex min-h-screen bg-[#0D0D0D]">
      <AdminNav />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl text-[#F5F5F5] mb-2">
              Customer Management
            </h1>
            <p className="text-[#A0A0A0]">View customer details and insights</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {customers.map((customer, index) => (
              <motion.div
                key={customer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1A1A1A]/50 backdrop-blur-sm border border-[#D4AF37]/20 rounded-2xl p-6 hover:border-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8960F] flex items-center justify-center">
                    <User className="w-8 h-8 text-[#0D0D0D]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl text-[#F5F5F5] mb-1">
                      {customer.name}
                    </h3>
                    <p className="text-[#A0A0A0] text-sm mb-1">
                      Member since {customer.joinDate}
                    </p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                      <span className="text-[#D4AF37]">{customer.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-[#A0A0A0]">
                    <Mail className="w-4 h-4 text-[#D4AF37]" />
                    {customer.email}
                  </div>
                  <div className="flex items-center gap-2 text-[#A0A0A0]">
                    <Phone className="w-4 h-4 text-[#D4AF37]" />
                    {customer.phone}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0D0D0D]/50 border border-[#D4AF37]/10 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                      <span className="text-[#A0A0A0] text-sm">Orders</span>
                    </div>
                    <p className="text-[#F5F5F5] text-xl">{customer.orders}</p>
                  </div>
                  <div className="bg-[#0D0D0D]/50 border border-[#D4AF37]/10 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[#D4AF37] text-sm">₹</span>
                      <span className="text-[#A0A0A0] text-sm">Spent</span>
                    </div>
                    <p className="text-[#F5F5F5] text-xl">
                      ₹{customer.spent.toLocaleString()}
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] py-2 rounded-xl hover:bg-[#D4AF37]/30 transition-all"
                >
                  View Order History
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
