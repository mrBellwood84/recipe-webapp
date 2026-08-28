import { agentExternal } from "@/lib/agent/agentExternal";
import sessionManager, { OpenIddictTokenResponse } from "@/lib/session/sessionManager";
import { UserProfileResponse } from "@/lib/models/auth/userProfileResponse";
import {
  RegisterRequest,
  LoginRequest,
  RecoverRequest,
  UpdateProfileRequest,
  ChangePasswordRequest,
} from "@/lib/models/auth";

const BASE_URL = process.env.NEXT_PUBLIC_AUTH_API || "http://localhost:5000/api/auth";

export const agentAuth = {
  // --- INNLOGGING (OAuth2 Password Grant) ---
  login: async (data: LoginRequest): Promise<OpenIddictTokenResponse> => {
    const body = new URLSearchParams();
    body.append("grant_type", "password");
    body.append("username", data.email);
    body.append("password", data.password);
    body.append("client_id", "recipe-web-app");

    const response = await agentExternal.postForm(`${BASE_URL}/connect/token`, body);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error_description || errorData.error || "Innlogging mislyktes.");
    }

    return await response.json();
  },

  // --- REGISTRERING (Form-urlencoded mot backend) ---
  register: async (data: RegisterRequest): Promise<UserProfileResponse> => {
    const body = new URLSearchParams();
    body.append("Email", data.email);
    body.append("Password", data.password);
    body.append("FirstName", data.firstName);
    body.append("LastName", data.lastName);

    const response = await agentExternal.postForm(`${BASE_URL}/account/register`, body);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Registrering mislyktes.");
    }

    return await response.json();
  },

  // --- RECOVERY / GLEMT PASSORD ---
  recovery: async (data: RecoverRequest): Promise<{ message: string }> => {
    const response = await agentExternal.post(`${BASE_URL}/account/recover`, data);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Kunne ikke sende gjenopprettingslenke.");
    }

    return await response.json();
  },

  // --- TOKEN REFRESH (OAuth2 Refresh Token Grant) ---
  refresh: async (): Promise<OpenIddictTokenResponse> => {
    const refreshToken = await sessionManager.getRefreshToken();
    if (!refreshToken) {
      throw new Error("Ingen refresh token tilgjengelig.");
    }

    const body = new URLSearchParams();
    body.append("grant_type", "refresh_token");
    body.append("refresh_token", refreshToken);
    body.append("client_id", "recipe-web-app");

    const response = await agentExternal.postForm(`${BASE_URL}/connect/token`, body);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error_description || errorData.error || "Kunne ikke fornye token.");
    }

    return await response.json();
  },

  // --- OPPDATER PROFIL ---
  updateProfile: async (data: UpdateProfileRequest): Promise<UserProfileResponse> => {
    const response = await agentExternal.put(`${BASE_URL}/account/profile`, data);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Oppdatering av profil mislyktes.");
    }

    return await response.json();
  },

  // --- ENDRE PASSORD ---
  changePassword: async (data: ChangePasswordRequest): Promise<{ message: string }> => {
    const response = await agentExternal.post(`${BASE_URL}/account/change-password`, data);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Endring av passord mislyktes.");
    }

    return await response.json();
  },

  // --- SLETT PROFIL ---
  deleteProfile: async (): Promise<{ message: string }> => {
    const response = await agentExternal.delete(`${BASE_URL}/account/me`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Sletting av konto mislyktes.");
    }

    return await response.json();
  },
};