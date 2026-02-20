import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import ProfileDetails from "@/features/profile/components/ProfileDetails";

export const metadata = {
  title: "Profile | Hero Kidz",
  description: "Manage your Hero Kidz account",
};

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login?callbackUrl=/profile");

  const user = session.user;

  return <ProfileDetails user={user} session={session} />;
};

export default ProfilePage;
