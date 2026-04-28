import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { User, ShieldCheck } from "lucide-react";

export default function LoginSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.2),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-serif bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent mb-4">
            Fork & Flame
          </h1>
          <p className="text-[#A0A0A0] text-lg">Select your portal to continue</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -10 }}
            onClick={() => navigate("/customer/login")}
            className="cursor-pointer"
          >
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border border-[#D4AF37]/30 rounded-2xl p-12 text-center hover:border-[#D4AF37] hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all duration-300 backdrop-blur-sm">
              <div className="mb-6 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8960F] flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                  <User className="w-12 h-12 text-[#0D0D0D]" />
                </div>
              </div>
              <h2 className="text-3xl mb-3 text-[#F5F5F5]">Customer Login</h2>
              <p className="text-[#A0A0A0]">
                Browse menu, order food, and book tables
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05, y: -10 }}
            onClick={() => navigate("/admin/login")}
            className="cursor-pointer"
          >
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border border-[#D4AF37]/30 rounded-2xl p-12 text-center hover:border-[#D4AF37] hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all duration-300 backdrop-blur-sm">
              <div className="mb-6 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8960F] flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                  <ShieldCheck className="w-12 h-12 text-[#0D0D0D]" />
                </div>
              </div>
              <h2 className="text-3xl mb-3 text-[#F5F5F5]">Admin Login</h2>
              <p className="text-[#A0A0A0]">
                Manage menu, orders, tables, and analytics
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
