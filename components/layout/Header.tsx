"use client"

import {GuestHeader} from "@/components/header/GuestHeader";
import {useSession} from "@/lib/session/SessionProvider";
import {AdminHeader} from "@/components/header/AdminHeader";
import {UserHeader} from "@/components/header/UserHeader";

export const Header = () => {
  const session = useSession();
  const role = session.role;

  if (role === "Admin") return <AdminHeader />;
  if (role === "User") return <UserHeader />;
  return <GuestHeader />;

}