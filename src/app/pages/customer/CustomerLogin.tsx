import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Mail, Lock, User, Phone, MapPin, Home, Package, Upload } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { toast } from "sonner";

export default function CustomerLogin() {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    preferredDining: "dine-in" as "dine-in" | "takeaway",
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!isLogin) {
      setUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        preferredDining: formData.preferredDining,
      });
      toast.success("Account created successfully!");
    } else {
      setUser({
        name: "Customer",
        email: formData.email,
        phone: "",
        address: "",
        preferredDining: "dine-in",
      });
      toast.success("Logged in successfully!");
    }
    navigate("/customer/home");
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
            <h1 className="text-4xl font-serif bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] bg-clip-text text-transparent mb-2">
              {isLogin ? "Welcome Back" : "Join Us"}
            </h1>
            <p className="text-[#A0A0A0]">
              {isLogin ? "Sign in to continue" : "Create your account"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-[#0D0D0D]/50 border border-[#D4AF37]/20 rounded-xl pl-12 pr-4 py-3 text-[#F5F5F5] placeholder:text-[#A0A0A0] focus:border-[#D4AF37] focus:outline-none focus:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]" />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full bg-[#0D0D0D]/50 border border-[#D4AF37]/20 rounded-xl pl-12 pr-4 py-3 text-[#F5F5F5] placeholder:text-[#A0A0A0] focus:border-[#D4AF37] focus:outline-none focus:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all"
              />
            </div>

            {!isLogin && (
              <>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]" />
                  <input
                    type="tel"
                    placeholder="Phone Number (OTP will be sent)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full bg-[#0D0D0D]/50 border border-[#D4AF37]/20 rounded-xl pl-12 pr-4 py-3 text-[#F5F5F5] placeholder:text-[#A0A0A0] focus:border-[#D4AF37] focus:outline-none focus:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all"
                  />
                </div>

                <div className="relative">
                  <MapPin className="absolute left-4 top-4 w-5 h-5 text-[#D4AF37]" />
                  <textarea
                    placeholder="Delivery Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                    rows={3}
                    className="w-full bg-[#0D0D0D]/50 border border-[#D4AF37]/20 rounded-xl pl-12 pr-4 py-3 text-[#F5F5F5] placeholder:text-[#A0A0A0] focus:border-[#D4AF37] focus:outline-none focus:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[#A0A0A0] text-sm">Preferred Dining Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, preferredDining: "dine-in" })}
                      className={`p-3 rounded-xl border transition-all flex items-center justify-center gap-2 ${
                        formData.preferredDining === "dine-in"
                          ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]"
                          : "bg-[#0D0D0D]/50 border-[#D4AF37]/20 text-[#A0A0A0]"
                      }`}
                    >
                      <Home className="w-4 h-4" />
                      Dine-In
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, preferredDining: "takeaway" })}
                      className={`p-3 rounded-xl border transition-all flex items-center justify-center gap-2 ${
                        formData.preferredDining === "takeaway"
                          ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]"
                          : "bg-[#0D0D0D]/50 border-[#D4AF37]/20 text-[#A0A0A0]"
                      }`}
                    >
                      <Package className="w-4 h-4" />
                      Takeaway
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full bg-[#0D0D0D]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-[#A0A0A0] hover:border-[#D4AF37] transition-all flex items-center justify-center gap-2"
                >
                  <Upload className="w-5 h-5" />
                  Upload Profile Picture (Optional)
                </button>
              </>
            )}

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]" />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
              {isLogin ? "Sign In" : "Create Account"}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#D4AF37] hover:text-[#F4D03F] transition-colors"
            >
              {isLogin
                ? "Don't have an account? Register"
                : "Already have an account? Sign In"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
