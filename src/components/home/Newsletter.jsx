"use client";

import React from "react";
import useAlert from "@/hooks/useAlert";

const Newsletter = () => {
  const { showSuccess } = useAlert();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    // In production, connect to a mailing list API
    showSuccess("Subscribed!", `We'll send updates to ${email}`);
    e.target.reset();
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 sm:p-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          Stay Updated with Hero Kidz
        </h2>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Subscribe to get exclusive deals, new arrivals, and parenting tips straight to your inbox.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="input input-bordered flex-1"
            required
          />
          <button type="submit" className="btn btn-primary">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
