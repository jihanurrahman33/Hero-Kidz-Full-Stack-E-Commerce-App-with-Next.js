import { RegisterForm } from "@/features/auth";
import React from "react";
import { Suspense } from "react";

export const metadata = {
  title: "Register",
  description: "Create a new account on Hero Kidz",
};

const RegisterPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
};

export default RegisterPage;
