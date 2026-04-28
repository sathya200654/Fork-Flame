import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { motion } from "motion/react";
import { Search, SlidersHorizontal, Star, ArrowLeft } from "lucide-react";

const allDishes = [
  {
    id: 1,
    name: "Butter Chicken",
    price: 450,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400",
    veg: false,
  },
  {
    id: 2,
    name: "Paneer Tikka",
    price: 380,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400",
    veg: true,
  },
  {
    id: 6,
    name: "Masala Dosa",
    price: 180,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400",
    veg: true,
  },
  {
    id: 7,
    name: "Chicken Tikka",
    price: 480,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400",
    veg: false,
  },
];

export default function SearchResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [filterVeg, setFilterVeg] = useState<"all" | "veg" | "nonveg">("all");
  const [priceRange, setPriceRange] = useState<"all" | "low" | "high">("all");

  const filteredDishes = allDishes.filter((dish) => {
    if (filterVeg === "veg" && !dish.veg) return false;
    if (filterVeg === "nonveg" && dish.veg) return false;
    if (priceRange === "low" && dish.price > 300) return false;
    if (priceRange === "high" && dish.price <= 300) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <nav className="bg-[#1A1A1A]/80 backdrop-blur-xl border-b border-[#D4AF37]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/customer/home")}
            className="p-2 hover:bg-[#D4AF37]/20 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#D4AF37]" />
          </button>
          <h1 className="text-2xl font-serif bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] bg-clip-text text-transparent">
            Search Results
          </h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <p className="text-[#A0A0A0] mb-4">
            Showing results for{" "}
            <span className="text-[#D4AF37]">"{query}"</span>
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-[#F5F5F5]">Filters:</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setFilterVeg("all")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  filterVeg === "all"
                    ? "bg-[#D4AF37] text-[#0D0D0D]"
                    : "bg-[#1A1A1A] text-[#A0A0A0] border border-[#D4AF37]/20 hover:border-[#D4AF37]"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterVeg("veg")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  filterVeg === "veg"
                    ? "bg-[#10B981] text-[#0D0D0D]"
                    : "bg-[#1A1A1A] text-[#A0A0A0] border border-[#D4AF37]/20 hover:border-[#D4AF37]"
                }`}
              >
                Veg
              </button>
              <button
                onClick={() => setFilterVeg("nonveg")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  filterVeg === "nonveg"
                    ? "bg-[#DC2626] text-[#F5F5F5]"
                    : "bg-[#1A1A1A] text-[#A0A0A0] border border-[#D4AF37]/20 hover:border-[#D4AF37]"
                }`}
              >
                Non-Veg
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setPriceRange("all")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  priceRange === "all"
                    ? "bg-[#D4AF37] text-[#0D0D0D]"
                    : "bg-[#1A1A1A] text-[#A0A0A0] border border-[#D4AF37]/20 hover:border-[#D4AF37]"
                }`}
              >
                All Prices
              </button>
              <button
                onClick={() => setPriceRange("low")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  priceRange === "low"
                    ? "bg-[#D4AF37] text-[#0D0D0D]"
                    : "bg-[#1A1A1A] text-[#A0A0A0] border border-[#D4AF37]/20 hover:border-[#D4AF37]"
                }`}
              >
                Under ₹300
              </button>
              <button
                onClick={() => setPriceRange("high")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  priceRange === "high"
                    ? "bg-[#D4AF37] text-[#0D0D0D]"
                    : "bg-[#1A1A1A] text-[#A0A0A0] border border-[#D4AF37]/20 hover:border-[#D4AF37]"
                }`}
              >
                Above ₹300
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDishes.map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => navigate(`/customer/food/${dish.id}`)}
              className="cursor-pointer bg-[#1A1A1A]/50 backdrop-blur-sm border border-[#D4AF37]/20 rounded-2xl overflow-hidden hover:border-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 px-3 py-1 bg-[#0D0D0D]/80 backdrop-blur-sm rounded-full border border-[#D4AF37]/30">
                  <span
                    className={`text-sm ${dish.veg ? "text-[#10B981]" : "text-[#DC2626]"}`}
                  >
                    {dish.veg ? "VEG" : "NON-VEG"}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg text-[#F5F5F5] mb-2">{dish.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-[#D4AF37] text-xl">₹{dish.price}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                    <span className="text-[#F5F5F5]">{dish.rating}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
