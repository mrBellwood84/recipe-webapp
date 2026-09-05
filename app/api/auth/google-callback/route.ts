import { NextRequest, NextResponse } from "next/server";
import sessionManager, { OpenIddictTokenResponse } from "@/lib/session/sessionManager";
import { UserProfileResponse } from "@/lib/models/auth/userProfileResponse";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const error = searchParams.get("error");

  // 1. Håndter feil fra backend/Google
  if (error) {
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(error)}`, request.url)
    );
  }

  // 2. Les ut parametere fra URL
  const accessToken = searchParams.get("access_token");
  const refreshToken = searchParams.get("refresh_token");
  const userId = searchParams.get("user_id");
  const email = searchParams.get("email");
  const role = searchParams.get("role");

  // 3. Valider at vi har minimum av nødvendig data
  if (!accessToken || !refreshToken || !userId) {
    return NextResponse.redirect(
      new URL("/login?error=Ugyldig+sesjonsdata+fra+Google", request.url)
    );
  }

  // 4. Bygg token-objektet
  const tokens: OpenIddictTokenResponse = {
    access_token: accessToken,
    refresh_token: refreshToken,
    token_type: "Bearer",
    expires_in: 3600,
  };

  const welcomeCompleted = searchParams.get("welcome_completed") === "true";

  // 5. Bygg brukerprofil-objektet
  const userProfile: UserProfileResponse = {
    userId: userId,
    userName: email || "",
    email: email || "",
    firstName: searchParams.get("first_name") || "",
    lastName: searchParams.get("last_name") || "",
    role: role || "user",
    hasPassword: searchParams.get("has_password") === "true",
    isGoogleAccount: true,
    isEmailConfirmed: true,
    welcomeCompleted: welcomeCompleted,
    isLocked: false,
    createdAt: new Date().toISOString(),
    lastModifiedAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  };

  // 6. Lagre i HttpOnly session cookies
  await sessionManager.setSession(tokens, userProfile);

  // 7. Rute brukeren til dashboard (eller velkomstskjerm dersom ikke fullført)
  const targetPath = welcomeCompleted ? "/dashboard" : "/user/welcome";

  return NextResponse.redirect(new URL(targetPath, request.url));
}