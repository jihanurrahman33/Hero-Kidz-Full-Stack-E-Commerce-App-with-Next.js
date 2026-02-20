import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import AdminSidebar from "@/features/admin/components/AdminSidebar";

const DashboardLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login?callbackUrl=/dashboard");
  if (session.role !== "admin") redirect("/");

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <AdminSidebar />
      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 max-w-6xl">{children}</main>
    </div>
  );
};

export default DashboardLayout;
