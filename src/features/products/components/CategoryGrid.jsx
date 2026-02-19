import React from "react";
import Link from "next/link";
import {
  FaChalkboard,
  FaPuzzlePiece,
  FaRobot,
  FaPaintBrush,
  FaMusic,
  FaFootballBall,
  FaCubes,
  FaGraduationCap,
  FaCar,
  FaBaby,
  FaDice,
  FaGamepad,
  FaMagic,
  FaGlobe,
  FaFlask,
  FaCalculator,
  FaChild,
  FaGift,
  FaStar,
  FaTshirt,
  FaShapes,
} from "react-icons/fa";
import {
  GiJigsawPiece,
  GiAbacus,
  GiDuck,
  GiWoodenSign,
  GiMusicalNotes,
  GiPaintBrush,
  GiLightBulb,
} from "react-icons/gi";
import {
  MdSmartToy,
  MdOutlineSportsSoccer,
  MdOutlineDraw,
} from "react-icons/md";
import {
  TbMathSymbols,
  TbAbc,
} from "react-icons/tb";
import { getCategories } from "../actions/product.actions";

// Map category names (case-insensitive partial match) to icons
const categoryIcons = {
  "learning board": FaChalkboard,
  "learning": GiLightBulb,
  "puzzle": GiJigsawPiece,
  "robot": MdSmartToy,
  "art": MdOutlineDraw,
  "drawing": FaPaintBrush,
  "music": GiMusicalNotes,
  "musical": GiMusicalNotes,
  "sports": MdOutlineSportsSoccer,
  "building": FaCubes,
  "block": FaCubes,
  "education": FaGraduationCap,
  "educational": FaGraduationCap,
  "car": FaCar,
  "vehicle": FaCar,
  "baby": FaBaby,
  "infant": FaBaby,
  "board game": FaDice,
  "game": FaGamepad,
  "magic": FaMagic,
  "science": FaFlask,
  "stem": FaFlask,
  "math": TbMathSymbols,
  "counting": GiAbacus,
  "alphabet": TbAbc,
  "language": FaGlobe,
  "doll": FaChild,
  "soft toy": GiDuck,
  "wooden": GiWoodenSign,
  "gift": FaGift,
  "dress": FaTshirt,
  "shape": FaShapes,
};

const categoryColors = [
  "bg-blue-50 text-blue-600 hover:bg-blue-100",
  "bg-pink-50 text-pink-600 hover:bg-pink-100",
  "bg-green-50 text-green-600 hover:bg-green-100",
  "bg-purple-50 text-purple-600 hover:bg-purple-100",
  "bg-orange-50 text-orange-600 hover:bg-orange-100",
  "bg-teal-50 text-teal-600 hover:bg-teal-100",
  "bg-red-50 text-red-600 hover:bg-red-100",
  "bg-yellow-50 text-yellow-600 hover:bg-yellow-100",
  "bg-indigo-50 text-indigo-600 hover:bg-indigo-100",
  "bg-cyan-50 text-cyan-600 hover:bg-cyan-100",
];

// Find the best matching icon for a category name
const getIcon = (categoryName) => {
  const lower = categoryName.toLowerCase();
  // Exact match first
  if (categoryIcons[lower]) return categoryIcons[lower];
  // Partial match
  const key = Object.keys(categoryIcons).find(
    (k) => lower.includes(k) || k.includes(lower)
  );
  return key ? categoryIcons[key] : FaStar;
};

const CategoryGrid = async () => {
  const categories = await getCategories();

  if (!categories || categories.length === 0) return null;

  return (
    <section className="py-12 px-4">
      <h2 className="text-center text-3xl font-bold mb-8">
        Shop by <span className="text-primary">Category</span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
        {categories.map((cat, i) => {
          const IconComponent = getIcon(cat);
          const colorClass = categoryColors[i % categoryColors.length];

          return (
            <Link
              key={cat}
              href={`/products?category=${encodeURIComponent(cat)}`}
              className={`flex flex-col items-center gap-3 p-5 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md ${colorClass}`}
            >
              <IconComponent size={28} />
              <span className="text-sm font-semibold text-center">{cat}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryGrid;
