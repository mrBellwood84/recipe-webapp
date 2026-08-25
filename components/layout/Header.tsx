"use client"

import {GuestHeader} from "@/components/layout/header/GuestHeader";
import {useSession} from "@/lib/session/SessionProvider";
import {AdminHeader} from "@/components/layout/header/AdminHeader";
import {UserHeader} from "@/components/layout/header/UserHeader";

export const Header = () => {
  const session = useSession();
  const role = session.role;

  if (role === "Admin") return <AdminHeader/>;
  if (role === "User") return <UserHeader/>;
  return <GuestHeader/>;

}