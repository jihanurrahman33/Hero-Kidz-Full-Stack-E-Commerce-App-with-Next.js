import { LoginForm } from "@/features/auth";
import React from "react";
import { Suspense } from "react";

export const metadata = {
  title: "Login",
  description: "Login to your Hero Kidz account",
};

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
