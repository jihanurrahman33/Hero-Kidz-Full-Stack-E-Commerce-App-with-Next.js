import React from "react";
import { getAllUsers } from "@/features/admin/actions/admin.actions";
import UsersManager from "@/features/admin/components/UsersManager";

export const metadata = { title: "Users | Dashboard" };

const UsersPage = async ({ searchParams }) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const data = await getAllUsers(page);

  return <UsersManager data={data} />;
};

export default UsersPage;
