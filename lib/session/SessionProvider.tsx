"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { UserProfileResponse } from "@/lib/models/auth/userProfileResponse";

interface SessionContextType {
  user?: UserProfileResponse;
  setUser: (user: UserProfileResponse | undefined) => void;
  role?: string;
  setRole: (role: string | undefined) => void;
}

interface Props {
  initialUser?: UserProfileResponse;
  children?: ReactNode;
}

const SessionContext = createContext<SessionContextType | null>(null);

export const SessionProvider = ({ initialUser, children }: Props) => {
  const [user, setUserState] = useState<UserProfileResponse | undefined>(initialUser);
  const [role, setRole] = useState<string | undefined>(initialUser?.role);

  // Oppdaterer både bruker og synkroniserer rolle automatisk når setUser kalles
  const setUser = (newUser: UserProfileResponse | undefined) => {
    setUserState(newUser);
    setRole(newUser?.role);
  };

  return (
    <SessionContext.Provider value={{ user, role, setUser, setRole }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};