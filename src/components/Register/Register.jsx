"use client";
import { postUser } from "@/actions/server/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

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
          <button className="btn bg-white text-black border border-[#e5e5e5] w-full flex gap-3">
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Continue with Google
          </button>

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
