"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import useAuth from "@/hooks/useAuth";

const AuthButtons = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div>
      {isAuthenticated ? (
        <button
          onClick={() => signOut()}
          className="btn btn-outline btn-primary"
        >
          Logout
        </button>
      ) : (
        <Link href="/login" className="btn btn-primary">
          Login
        </Link>
      )}
    </div>
  );
};

export default AuthButtons;
