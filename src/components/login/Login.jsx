"use client";
import Link from "next/link";
import React from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import SocialButton from "../buttons/SocialButton";
import useAlert from "@/hooks/useAlert";

const Login = () => {
  const params = useSearchParams();
  const router = useRouter();
  const callBack = params.get("callbackUrl") || "/";
  const { showSuccess, showError } = useAlert();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;
    const userData = { email, password };
    // Handle login logic here
    const result = await signIn("credentials", {
      email: userData.email,
      password: userData.password,
      redirect: false,
      callbackUrl: params.get("callbackUrl") || "/",
    });
    if (!result.ok) {
      showError("Login Failed. Try Google Login / Register", "Invalid email or password. Please try again.");
    } else {
      showSuccess("Login Successful", "You have been logged in successfully.");
      router.push(callBack);
      form.reset();
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-sm shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center text-primary">
            Login to Hero Kidz
          </h2>
          <p className="text-center text-sm text-gray-500">
            Welcome back! Please login to your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4 ">
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
            <label className="input input-bordered flex items-center gap-2 ">
              <FaLock className="text-gray-400" />
              <input
                type="password"
                className="grow"
                placeholder="Password"
                name="password"
                required
              />
            </label>

            {/* Forgot */}
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="link link-primary text-sm"
              >
                Forgot password?
              </Link>
            </div>

            {/* Button */}
            <button type="submit" className={`btn btn-primary w-full `}>
              Login
            </button>
          </form>

          <SocialButton></SocialButton>
          {/* Divider */}
          <div className="divider">OR</div>

          {/* Register */}
          <p className="text-center text-sm">
            Don’t have an account?{" "}
            <Link
              href={`register?callbackUrl=${callBack.slice(1)}`}
              className="link link-primary"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
