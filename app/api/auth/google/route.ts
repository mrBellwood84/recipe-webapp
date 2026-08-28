import { NextResponse } from "next/server";

export const GET = async () => {
  const backendAuthApi = process.env.NEXT_PUBLIC_AUTH_API || "http://localhost:5000/api/auth";

  // Omdirigerer brukeren direkte til backend for å starte Google OAuth Challenge
  const googleLoginUrl = `${backendAuthApi}/external/login?provider=Google`;

  return NextResponse.redirect(googleLoginUrl);
};