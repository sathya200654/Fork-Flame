import { useState } from "react";
import { motion } from "motion/react";
import { Plus, Edit, Trash2, Users, Clock, Phone, Mail } from "lucide-react";
import { toast } from "sonner";
import AdminNav from "../../components/AdminNav";

interface Employee {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  shift: string;
  status: "active" | "inactive";
}

const employeesData: Employee[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Head Chef",
    email: "rajesh@forkandflame.com",
    phone: "+91 98765 43210",
    shift: "10:00 AM - 6:00 PM",
    status: "active",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Waiter",
    email: "priya@forkandflame.com",
    phone: "+91 98765 43211",
    shift: "12:00 PM - 8:00 PM",
    status: "active",
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Manager",
    email: "amit@forkandflame.com",
    phone: "+91 98765 43212",
    shift: "9:00 AM - 5:00 PM",
    status: "active",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    role: "Sous Chef",
    email: "sneha@forkandflame.com",
    phone: "+91 98765 43213",
    shift: "11:00 AM - 7:00 PM",
    status: "active",
  },
];

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState(employeesData);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const deleteEmployee = (id: number) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    toast.success("Employee removed");
  };

  return (
    <div className="flex min-h-screen bg-[#0D0D0D]">
      <AdminNav />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl text-[#F5F5F5] mb-2">
                Employee Management
              </h1>
              <p className="text-[#A0A0A0]">Manage your staff and their shifts</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setEditingEmployee(null);
                setShowModal(true);
              }}
              className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0D0D0D] px-6 py-3 rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Employee
            </motion.button>
          </div>

          <div className="bg-[#1A1A1A]/50 backdrop-blur-sm border border-[#D4AF37]/20 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-[#D4AF37]/10 to-[#F4D03F]/10 border-b border-[#D4AF37]/20">
                    <th className="px-6 py-4 text-left text-[#D4AF37]">Name</th>
                    <th className="px-6 py-4 text-left text-[#D4AF37]">Role</th>
                    <th className="px-6 py-4 text-left text-[#D4AF37]">Contact</th>
                    <th className="px-6 py-4 text-left text-[#D4AF37]">Shift</th>
                    <th className="px-6 py-4 text-left text-[#D4AF37]">Status</th>
                    <th className="px-6 py-4 text-left text-[#D4AF37]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee, index) => (
                    <motion.tr
                      key={employee.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-[#D4AF37]/10 hover:bg-[#D4AF37]/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8960F] flex items-center justify-center">
                            <Users className="w-5 h-5 text-[#0D0D0D]" />
                          </div>
                          <span className="text-[#F5F5F5]">{employee.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#A0A0A0]">{employee.role}</td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[#A0A0A0] text-sm">
                            <Mail className="w-4 h-4 text-[#D4AF37]" />
                            {employee.email}
                          </div>
                          <div className="flex items-center gap-2 text-[#A0A0A0] text-sm">
                            <Phone className="w-4 h-4 text-[#D4AF37]" />
                            {employee.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-[#A0A0A0]">
                          <Clock className="w-4 h-4 text-[#D4AF37]" />
                          {employee.shift}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            employee.status === "active"
                              ? "bg-[#10B981]/20 text-[#10B981]"
                              : "bg-[#DC2626]/20 text-[#DC2626]"
                          }`}
                        >
                          {employee.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingEmployee(employee);
                              setShowModal(true);
                            }}
                            className="p-2 bg-[#D4AF37]/20 text-[#D4AF37] rounded-lg hover:bg-[#D4AF37]/30 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteEmployee(employee.id)}
                            className="p-2 bg-[#DC2626]/20 text-[#DC2626] rounded-lg hover:bg-[#DC2626]/30 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
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
              {editingEmployee ? "Edit Employee" : "Add New Employee"}
            </h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                defaultValue={editingEmployee?.name}
                className="w-full bg-[#0D0D0D]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-[#F5F5F5] placeholder:text-[#A0A0A0] focus:border-[#D4AF37] focus:outline-none"
              />
              <select className="w-full bg-[#0D0D0D]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-[#F5F5F5] focus:border-[#D4AF37] focus:outline-none">
                <option>Head Chef</option>
                <option>Sous Chef</option>
                <option>Waiter</option>
                <option>Manager</option>
                <option>Cashier</option>
              </select>
              <input
                type="email"
                placeholder="Email"
                defaultValue={editingEmployee?.email}
                className="w-full bg-[#0D0D0D]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-[#F5F5F5] placeholder:text-[#A0A0A0] focus:border-[#D4AF37] focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                defaultValue={editingEmployee?.phone}
                className="w-full bg-[#0D0D0D]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-[#F5F5F5] placeholder:text-[#A0A0A0] focus:border-[#D4AF37] focus:outline-none"
              />
              <input
                type="text"
                placeholder="Shift Timing (e.g., 10:00 AM - 6:00 PM)"
                defaultValue={editingEmployee?.shift}
                className="w-full bg-[#0D0D0D]/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-[#F5F5F5] placeholder:text-[#A0A0A0] focus:border-[#D4AF37] focus:outline-none"
              />
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0D0D0D] py-3 rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all"
                >
                  {editingEmployee ? "Update" : "Add"} Employee
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
