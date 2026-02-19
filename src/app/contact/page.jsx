"use client";
import React from "react";
import useAlert from "@/hooks/useAlert";

const ContactPage = () => {
  const { showSuccess } = useAlert();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const payload = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    console.log("Contact Payload:", payload);

    // Temporary success feedback (can connect API later)
    showSuccess(
        "Message Sent!",
        "We will get back to you as soon as possible."
    );

    form.reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Contact Us</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Have a question or need help? Feel free to reach out to us anytime.
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT — Contact Info */}
        <div className="space-y-6">
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>

            <div className="space-y-3 text-gray-700">
              <p>
                📍 <span className="font-medium">Address:</span> Dhaka,
                Bangladesh
              </p>
              <p>
                📞 <span className="font-medium">Phone:</span> +880 1900 000000
              </p>
              <p>
                ✉️ <span className="font-medium">Email:</span>{" "}
                support@example.com
              </p>
            </div>
          </div>

          <div className="bg-primary/10 rounded-xl p-6">
            <h3 className="font-semibold mb-2">Customer Support Hours</h3>
            <p className="text-sm text-gray-600">
              Saturday – Thursday: 9:00 AM – 9:00 PM
            </p>
          </div>
        </div>

        {/* RIGHT — Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-6 space-y-4"
        >
          <h2 className="text-xl font-semibold mb-3">Send Us a Message</h2>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="input input-bordered w-full"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="input input-bordered w-full"
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            className="textarea textarea-bordered w-full"
            rows={4}
            required
          />

          <button type="submit" className="btn btn-primary w-full">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
