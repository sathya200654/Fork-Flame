import { useState } from "react";
import { motion } from "motion/react";
import { Calendar, Clock, Users, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import AdminNav from "../../components/AdminNav";

const bookingsData = [
  {
    id: 1,
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "+1 234 567 8900",
    table: 5,
    seats: 4,
    date: "2026-04-22",
    time: "19:00",
    status: "pending",
  },
  {
    id: 2,
    customer: "David Brown",
    email: "david@example.com",
    phone: "+1 234 567 8901",
    table: 7,
    seats: 8,
    date: "2026-04-23",
    time: "20:00",
    status: "approved",
  },
  {
    id: 3,
    customer: "Emily Davis",
    email: "emily@example.com",
    phone: "+1 234 567 8902",
    table: 2,
    seats: 4,
    date: "2026-04-21",
    time: "18:30",
    status: "pending",
  },
];

export default function BookingManagement() {
  const [bookings, setBookings] = useState(bookingsData);

  const updateStatus = (id: number, newStatus: string) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: newStatus } : booking
      )
    );
    toast.success(`Booking ${newStatus}`);
  };

  return (
    <div className="flex min-h-screen bg-[#0D0D0D]">
      <AdminNav />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl text-[#F5F5F5] mb-2">
              Booking Management
            </h1>
            <p className="text-[#A0A0A0]">
              Review and manage table reservations
            </p>
          </div>

          <div className="space-y-4">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1A1A1A]/50 backdrop-blur-sm border border-[#D4AF37]/20 rounded-2xl p-6 hover:border-[#D4AF37] transition-all"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl text-[#F5F5F5] mb-2">
                      {booking.customer}
                    </h3>
                    <div className="space-y-1">
                      <p className="text-[#A0A0A0]">{booking.email}</p>
                      <p className="text-[#A0A0A0]">{booking.phone}</p>
                    </div>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full ${
                      booking.status === "approved"
                        ? "bg-[#10B981]/20 text-[#10B981]"
                        : booking.status === "pending"
                          ? "bg-[#F59E0B]/20 text-[#F59E0B]"
                          : "bg-[#DC2626]/20 text-[#DC2626]"
                    }`}
                  >
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </span>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-3 bg-[#0D0D0D]/50 border border-[#D4AF37]/10 rounded-xl p-3">
                    <Calendar className="w-5 h-5 text-[#D4AF37]" />
                    <div>
                      <p className="text-[#A0A0A0] text-sm">Date</p>
                      <p className="text-[#F5F5F5]">{booking.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-[#0D0D0D]/50 border border-[#D4AF37]/10 rounded-xl p-3">
                    <Clock className="w-5 h-5 text-[#D4AF37]" />
                    <div>
                      <p className="text-[#A0A0A0] text-sm">Time</p>
                      <p className="text-[#F5F5F5]">{booking.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-[#0D0D0D]/50 border border-[#D4AF37]/10 rounded-xl p-3">
                    <Users className="w-5 h-5 text-[#D4AF37]" />
                    <div>
                      <p className="text-[#A0A0A0] text-sm">Guests</p>
                      <p className="text-[#F5F5F5]">{booking.seats} people</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-[#0D0D0D]/50 border border-[#D4AF37]/10 rounded-xl p-3">
                    <div className="w-5 h-5 flex items-center justify-center text-[#D4AF37]">
                      T
                    </div>
                    <div>
                      <p className="text-[#A0A0A0] text-sm">Table</p>
                      <p className="text-[#F5F5F5]">Table {booking.table}</p>
                    </div>
                  </div>
                </div>

                {booking.status === "pending" && (
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => updateStatus(booking.id, "approved")}
                      className="flex-1 bg-[#10B981]/20 border border-[#10B981]/30 text-[#10B981] py-3 rounded-xl hover:bg-[#10B981]/30 transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Approve
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => updateStatus(booking.id, "rejected")}
                      className="flex-1 bg-[#DC2626]/20 border border-[#DC2626]/30 text-[#DC2626] py-3 rounded-xl hover:bg-[#DC2626]/30 transition-all flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-5 h-5" />
                      Reject
                    </motion.button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
