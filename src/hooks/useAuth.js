"use client";

import { useSession } from "next-auth/react";

const useAuth = () => {
  const session = useSession();

  return {
    session,
    data: session.data,
    user: session.data?.user,
    isAuthenticated: session.status === "authenticated",
    isLoading: session.status === "loading",
    role: session.data?.role, // Assuming role is added to session in authOptions
  };
};

export default useAuth;
