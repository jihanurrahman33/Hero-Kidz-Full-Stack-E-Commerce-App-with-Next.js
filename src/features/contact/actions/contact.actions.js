"use server";

import { sendEmail } from "@/lib/sendEmail";

export const submitContactForm = async (payload) => {
  const { name, email, message } = payload;

  if (!name || !email || !message) {
    return { success: false, message: "All fields are required." };
  }

  try {
    await sendEmail({
      to: process.env.EMAIL_USER, // Send to your own inbox
      subject: `New Contact Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-line; background: #f5f5f5; padding: 15px; border-radius: 8px;">${message}</p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Contact form error:", error);
    return { success: false, message: "Failed to send message. Please try again." };
  }
};
