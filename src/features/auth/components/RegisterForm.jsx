"use client";
import { postUser } from "../actions/auth.actions";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import SocialButton from "./SocialButton";
import { signIn } from "next-auth/react";
import useAlert from "@/hooks/useAlert";

const RegisterForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/";
  const { showSuccess, showError } = useAlert();

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
      //router.push("/login");
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });
      if (result.ok) {
        showSuccess(
            "Registration Successful",
            "You have been registered and logged in successfully."
        );
        form.reset();
        router.push(callbackUrl);
      }
    } else {
      showError(
        "Registration Failed",
        "An account with this email may already exist. Please try again."
      );
    }
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

export default RegisterForm;
