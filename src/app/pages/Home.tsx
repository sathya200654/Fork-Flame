import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ChefHat, Flame, UtensilsCrossed, Star, Clock, Users } from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: ChefHat,
      title: "Expert Chefs",
      description: "Our culinary masters craft exquisite dishes with passion",
    },
    {
      icon: Flame,
      title: "Premium Quality",
      description: "Only the finest ingredients sourced from trusted suppliers",
    },
    {
      icon: UtensilsCrossed,
      title: "Diverse Menu",
      description: "From traditional to contemporary, explore culinary excellence",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D]">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-screen pt-20 flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_50%)]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-7xl md:text-8xl font-serif bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent mb-6 drop-shadow-[0_0_30px_rgba(212,175,55,0.5)]">
              Fork & Flame
            </h1>
            <p className="text-2xl md:text-3xl text-[#A0A0A0] mb-4 tracking-wide">
              Experience Fine Dining at Its Best
            </p>
            <p className="text-lg text-[#808080] max-w-2xl mx-auto mb-12">
              Welcome to Fork & Flame, where culinary artistry meets elegant ambiance. 
              We serve authentic flavors crafted with passion, in a setting designed for unforgettable dining experiences.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex gap-6 justify-center flex-wrap"
          >
            <button
              onClick={() => navigate("/login-selection")}
              className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0D0D0D] rounded-lg font-semibold text-lg hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-300 transform hover:scale-105"
            >
              Order Now
            </button>
            <button
              onClick={() => {
                const element = document.querySelector("#about");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 border-2 border-[#D4AF37] text-[#D4AF37] rounded-lg font-semibold text-lg hover:bg-[#D4AF37]/10 transition-all duration-300"
            >
              Learn More
            </button>
          </motion.div>
        </div>

        {/* Decorative Icons */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Flame className="w-8 h-8 text-[#D4AF37]" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-[#0D0D0D]/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-serif text-[#D4AF37] mb-6">
              About Us
            </h2>
            <p className="text-xl text-[#A0A0A0] leading-relaxed">
              Fork & Flame is a premium fine dining restaurant dedicated to delivering 
              exceptional gastronomic experiences. Our team of renowned chefs combines 
              traditional techniques with innovative presentations to create dishes that 
              delight the senses and nourish the soul.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border border-[#D4AF37]/20 rounded-xl p-8 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.2)]"
                >
                  <Icon className="w-12 h-12 text-[#D4AF37] mb-4" />
                  <h3 className="text-xl font-semibold text-[#F5F5F5] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[#A0A0A0]">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-serif text-[#D4AF37] mb-6">Why Choose Us?</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                <Star className="w-10 h-10 text-[#D4AF37]" />
              </div>
              <h3 className="text-2xl font-semibold text-[#F5F5F5] mb-3">Excellence</h3>
              <p className="text-[#A0A0A0]">
                Award-winning cuisine prepared with meticulous attention to detail
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                <Clock className="w-10 h-10 text-[#D4AF37]" />
              </div>
              <h3 className="text-2xl font-semibold text-[#F5F5F5] mb-3">Convenient</h3>
              <p className="text-[#A0A0A0]">
                Easy online ordering and table reservations at your fingertips
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                <Users className="w-10 h-10 text-[#D4AF37]" />
              </div>
              <h3 className="text-2xl font-semibold text-[#F5F5F5] mb-3">Community</h3>
              <p className="text-[#A0A0A0]">
                Join our loyal customers enjoying unforgettable dining moments
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#1A1A1A] to-[#0D0D0D] border border-[#D4AF37]/30 rounded-2xl p-12 text-center"
          >
            <h2 className="text-4xl font-serif text-[#D4AF37] mb-6">Ready to Dine with Us?</h2>
            <p className="text-[#A0A0A0] text-lg mb-8">
              Reserve your table or explore our menu today and discover why Fork & Flame is the premier choice for fine dining.
            </p>
            <button
              onClick={() => navigate("/login-selection")}
              className="px-12 py-4 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0D0D0D] rounded-lg font-semibold text-lg hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
