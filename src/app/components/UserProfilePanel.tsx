import { motion, AnimatePresence } from "motion/react";
import { X, Camera, MapPin, Edit, ShoppingBag, Calendar, User as UserIcon } from "lucide-react";
import { useApp } from "../context/AppContext";
import { useState } from "react";

interface UserProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserProfilePanel({ isOpen, onClose }: UserProfilePanelProps) {
  const { user } = useApp();
  const [isEditing, setIsEditing] = useState(false);

  const orderHistory = [
    { id: "ORD-001", items: "Butter Chicken x2, Naan x4", total: 980, date: "Apr 20, 2026" },
    { id: "ORD-002", items: "Paneer Tikka x1", total: 380, date: "Apr 18, 2026" },
    { id: "ORD-003", items: "Biryani x2", total: 840, date: "Apr 15, 2026" },
  ];

  const bookingHistory = [
    { id: "BK-001", table: 5, seats: 4, date: "Apr 22, 2026", time: "19:00" },
    { id: "BK-002", table: 3, seats: 2, date: "Apr 10, 2026", time: "20:30" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0D0D0D]/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed right-0 top-0 h-full w-full max-w-lg bg-[#1A1A1A] border-l border-[#D4AF37]/30 z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] bg-clip-text text-transparent">
                  Profile
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-[#D4AF37]/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-[#D4AF37]" />
                </button>
              </div>

              <div className="bg-[#0D0D0D]/50 border border-[#D4AF37]/20 rounded-2xl p-6 mb-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8960F] flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                      {user?.profilePicture ? (
                        <img
                          src={user.profilePicture}
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <UserIcon className="w-12 h-12 text-[#0D0D0D]" />
                      )}
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all">
                      <Camera className="w-4 h-4 text-[#0D0D0D]" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl text-[#F5F5F5] mb-1">
                      {user?.name || "Guest User"}
                    </h3>
                    <p className="text-[#A0A0A0] mb-3">{user?.email || "guest@forkandflame.com"}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEditing(!isEditing)}
                      className="px-4 py-2 bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] rounded-lg hover:bg-[#D4AF37]/30 transition-all flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </motion.button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-[#1A1A1A] rounded-xl">
                    <div className="text-[#D4AF37]">📱</div>
                    <div>
                      <p className="text-[#A0A0A0] text-sm">Phone</p>
                      <p className="text-[#F5F5F5]">{user?.phone || "+1 234 567 8900"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#1A1A1A] rounded-xl">
                    <MapPin className="w-5 h-5 text-[#D4AF37]" />
                    <div>
                      <p className="text-[#A0A0A0] text-sm">Address</p>
                      <p className="text-[#F5F5F5]">
                        {user?.address || "123 Royal Street, Downtown"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#1A1A1A] rounded-xl">
                    <div className="text-[#D4AF37]">🍽️</div>
                    <div>
                      <p className="text-[#A0A0A0] text-sm">Preferred Dining</p>
                      <p className="text-[#F5F5F5] capitalize">
                        {user?.preferredDining || "Dine-in"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="text-xl text-[#F5F5F5]">Order History</h3>
                </div>
                <div className="space-y-3">
                  {orderHistory.map((order) => (
                    <div
                      key={order.id}
                      className="bg-[#0D0D0D]/50 border border-[#D4AF37]/10 rounded-xl p-4"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-[#F5F5F5] mb-1">{order.id}</p>
                          <p className="text-[#A0A0A0] text-sm">{order.items}</p>
                        </div>
                        <p className="text-[#D4AF37]">₹{order.total}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-[#A0A0A0] text-xs">{order.date}</p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] rounded-lg text-sm hover:bg-[#D4AF37]/30 transition-all"
                        >
                          Reorder
                        </motion.button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="text-xl text-[#F5F5F5]">Booking History</h3>
                </div>
                <div className="space-y-3">
                  {bookingHistory.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-[#0D0D0D]/50 border border-[#D4AF37]/10 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[#F5F5F5]">{booking.id}</p>
                        <p className="text-[#D4AF37]">Table {booking.table}</p>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <p className="text-[#A0A0A0]">{booking.seats} guests</p>
                        <p className="text-[#A0A0A0]">
                          {booking.date} • {booking.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
