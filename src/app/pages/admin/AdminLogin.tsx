import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Mail, Lock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    toast.success("Login successful!");
    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-[#1A1A1A]/50 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl p-8 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8960F] flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                <ShieldCheck className="w-10 h-10 text-[#0D0D0D]" />
              </div>
            </div>
            <h1 className="text-4xl font-serif bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] bg-clip-text text-transparent mb-2">
              Admin Portal
            </h1>
            <p className="text-[#A0A0A0]">Sign in to access dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]" />
              <input
                type="email"
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#0D0D0D]/50 border border-[#D4AF37]/20 rounded-xl pl-12 pr-4 py-3 text-[#F5F5F5] placeholder:text-[#A0A0A0] focus:border-[#D4AF37] focus:outline-none focus:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#0D0D0D]/50 border border-[#D4AF37]/20 rounded-xl pl-12 pr-4 py-3 text-[#F5F5F5] placeholder:text-[#A0A0A0] focus:border-[#D4AF37] focus:outline-none focus:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0D0D0D] py-3 rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all"
            >
              Sign In
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
