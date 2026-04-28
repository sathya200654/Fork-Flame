import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "motion/react";

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] border-t border-[#D4AF37]/30 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="text-[#D4AF37] font-semibold mb-2">Address</h3>
              <p className="text-[#A0A0A0]">
                123 Marina Beach Road<br />
                Chennai, Tamil Nadu 600001<br />
                India
              </p>
            </div>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="text-[#D4AF37] font-semibold mb-2">Email</h3>
              <a
                href="mailto:hello@forkandflame.com"
                className="text-[#A0A0A0] hover:text-[#D4AF37] transition-colors"
              >
                hello@forkandflame.com
              </a>
            </div>
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="text-[#D4AF37] font-semibold mb-2">Phone</h3>
              <a
                href="tel:+918450006000"
                className="text-[#A0A0A0] hover:text-[#D4AF37] transition-colors"
              >
                +91 8450 006 000
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#D4AF37]/20 pt-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-[#A0A0A0] text-sm"
          >
            © 2024 Fork & Flame. All rights reserved. | Experience Fine Dining
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
