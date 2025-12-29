"use client";
import { postUser } from "@/actions/server/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import SocialButton from "../buttons/SocialButton";

const Register = () => {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const registrationData = {
      name,
      email,
      password,
    };
    const result = await postUser(registrationData);
    if (result.acknowledged) {
      alert("Registration successful! Please login.");
      router.push("/login");
    }

    // Handle registration logic here
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-sm shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center text-primary">
            Create Account
          </h2>
          <p className="text-center text-sm text-gray-500">
            Join Hero Kidz and start learning today
          </p>

          {/* Google Login */}
          <SocialButton></SocialButton>

          <div className="divider">OR</div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <label className="input input-bordered flex items-center gap-2">
              <FaUser className="text-gray-400" />
              <input
                type="text"
                className="grow"
                placeholder="Full Name"
                required
                name="name"
              />
            </label>

            {/* Email */}
            <label className="input input-bordered flex items-center gap-2">
              <FaEnvelope className="text-gray-400" />
              <input
                type="email"
                className="grow"
                placeholder="Email"
                name="email"
                required
              />
            </label>

            {/* Password */}
            <label className="input input-bordered flex items-center gap-2">
              <FaLock className="text-gray-400" />
              <input
                type="password"
                className="grow"
                placeholder="Password"
                name="password"
                required
              />
            </label>

            {/* Submit */}
            <button type="submit" className={`btn btn-primary w-full `}>
              Register
            </button>
          </form>

          {/* Login Redirect */}
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login" className="link link-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
