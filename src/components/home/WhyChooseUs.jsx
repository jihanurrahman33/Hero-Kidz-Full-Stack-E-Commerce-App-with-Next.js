import React from "react";
import { FaTruck, FaShieldAlt, FaHeadset, FaUndo } from "react-icons/fa";

const features = [
  {
    icon: FaTruck,
    title: "Fast Delivery",
    description: "Free shipping on orders over ৳500. Delivered within 3-5 business days.",
    color: "text-blue-500 bg-blue-50",
  },
  {
    icon: FaShieldAlt,
    title: "Safe & Certified",
    description: "All our toys meet international safety standards and are BPA-free.",
    color: "text-green-500 bg-green-50",
  },
  {
    icon: FaHeadset,
    title: "24/7 Support",
    description: "Our support team is always ready to help with any questions.",
    color: "text-purple-500 bg-purple-50",
  },
  {
    icon: FaUndo,
    title: "Easy Returns",
    description: "7-day hassle-free return policy on all products.",
    color: "text-orange-500 bg-orange-50",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-3xl font-bold mb-3">
          Why Choose <span className="text-primary">Hero Kidz</span>?
        </h2>
        <p className="text-center text-gray-500 mb-10 max-w-xl mx-auto">
          We are committed to providing the best learning toys with exceptional service.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="text-center p-6 rounded-2xl bg-base-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 ${feature.color}`}
              >
                <feature.icon size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
