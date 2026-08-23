import {UserRoleType} from "@/lib/models/types";

export interface User {
  userId: string;
  userName: string;
  role: UserRoleType
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
}