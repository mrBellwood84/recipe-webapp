"use client"

import {createContext, ReactNode, useContext, useState} from "react";
import {UserRoleType} from "@/lib/models/types";
import {User} from "@/lib/models/user/user";


interface SessionContextType {
  user?: User;
  setUser: (user: User | undefined) => void;
  role?: UserRoleType;
  setRole: (role: UserRoleType) => void;
}

interface Props {
  initialUser?: User | undefined;
  children?: ReactNode;
}

const SessionContext = createContext<SessionContextType | null>(null);

export const SessionProvider = ({initialUser, children}: Props) => {

  const [user, setUser] = useState<User | undefined>(initialUser);
  const [role, setRole] = useState<UserRoleType | undefined>(initialUser?.role);

  return <SessionContext.Provider value={{user, role, setUser, setRole}}>{children}</SessionContext.Provider>;
}

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}


