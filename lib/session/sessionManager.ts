import {cookies} from "next/headers";
import {LoginResponse} from "@/lib/models/auth/loginResponse";
import {User} from "@/lib/models/user/user";

const token_key = "token";
const user_key = "user_data";

const sessionManager = {
  setSession: async (data: LoginResponse): Promise<void> => {
    const expiresAt = new Date(Date.now() + (1000 * 60 * 60 * 24 * 3) + 60);
    const cookieStore = await cookies();

    const user: User = {
      userId: data.userId,
      userName: data.userName,
      role: data.role,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      avatarUrl: data.avatarUrl
    }

    cookieStore.set(token_key, data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: expiresAt,
      sameSite: "lax",
      path: "/"
    });

    cookieStore.set(user_key, JSON.stringify(user), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      expires: expiresAt,
      sameSite: "lax",
      path: "/"
    });
  },

  removeSession: async (): Promise<void> => {
    const cookieStore = await cookies();
    cookieStore.delete(token_key);
    cookieStore.delete(user_key);
  },

  setToken: async (token: string): Promise<void> => {
    const cookieStore = await cookies();
    const expiresAt = new Date(Date.now() + (1000 * 60 * 60 * 24 * 3) + 60);

    cookieStore.set(token_key, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: expiresAt,
      sameSite: "lax",
      path: "/"
    });
  },

  getToken: async (): Promise<string | undefined> => {
    const cookieStore = await cookies();
    return cookieStore.get(token_key)?.value;
  },

  getUserData: async (): Promise<User | undefined> => {
    const cookieStore = await cookies();
    const userString = cookieStore.get(user_key)?.value;
    if (!userString) return undefined
    return JSON.parse(userString) as User;
  },

  // return remaining valid time for token!
  getRemainingExpTime: (token: string): number => {
    try {
      const payloadBase64 = token.split(".")[1];
      const decoded = Buffer.from(payloadBase64, "base64").toString("utf-8");
      const claims = JSON.parse(decoded);
      const exp = claims.exp;

      return (exp) - (Date.now() / 1000);
    } catch {
      return -1
    }
  },

  getUserRole: (token: string) => {
    const payloadBase64 = token.split(".")[1];
    const decoded = Buffer.from(payloadBase64, "base64").toString("utf-8");
    const claims = JSON.parse(decoded);
    return claims.role;
  }
}

export default sessionManager;