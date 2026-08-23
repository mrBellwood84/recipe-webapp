import {UserRoleType} from "@/lib/models/types";

export interface LoginResponseDTO {
  token: string
  userId: string
  userName: string
  role: UserRoleType
  email: string
  firstName: string
  lastName: string
  avatarUrl: string
}