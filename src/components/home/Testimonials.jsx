import React from "react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

const testimonials = [
  {
    name: "Ayesha Begum",
    role: "Mother of 2",
    image: "https://i.ibb.co.com/MkSD2N6V/person1.jpg",
    text: "My kids absolutely love the learning board! It has made studying fun for them. The quality is amazing and delivery was super fast.",
    rating: 5,
  },
  {
    name: "Rahim Uddin",
    role: "Father",
    image: "https://i.ibb.co.com/whSvg6Kb/person2.jpg",
    text: "Best educational toys in Bangladesh. I've ordered multiple times and the quality has always been consistent. Highly recommended!",
    rating: 5,
  },
  {
    name: "Sabrina Akter",
    role: "Teacher",
    image: "https://i.ibb.co.com/zhGhR1yS/person3.jpg",
    text: "As a teacher, I recommend Hero Kidz to all parents. These toys genuinely help with early childhood development and learning.",
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 px-4 bg-base-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-3xl font-bold mb-3">
          What Parents <span className="text-primary">Say</span>
        </h2>
        <p className="text-center text-gray-500 mb-10 max-w-xl mx-auto">
          Trusted by thousands of happy parents across Bangladesh.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-base-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={14}
                    className={i < t.rating ? "text-warning" : "text-gray-300"}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Person */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden relative">
                  <Image src={t.image} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
