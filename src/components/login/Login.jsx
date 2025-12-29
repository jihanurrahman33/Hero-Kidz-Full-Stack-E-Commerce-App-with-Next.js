"use client";
import Link from "next/link";
import React from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
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
    });
    if (!result.ok) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password. Please try again.",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You have been logged in successfully.",
      });
      form.reset();
      router.push("/");
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

          <button className="btn bg-white text-black border-[#e5e5e5] w-full">
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
            Login with Google
          </button>

          {/* Divider */}
          <div className="divider">OR</div>

          {/* Register */}
          <p className="text-center text-sm">
            Don’t have an account?{" "}
            <Link href="/register" className="link link-primary">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
