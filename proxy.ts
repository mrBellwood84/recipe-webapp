import { NextRequest, NextResponse } from "next/server";
import sessionManager, { OpenIddictTokenResponse } from "@/lib/session/sessionManager";

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/user/:path*',
    '/admin/:path*',
  ],
};

const proxy = async (req: NextRequest): Promise<NextResponse<unknown>> => {
  const token = req.cookies.get("token")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  // 1. Ingen token funnet -> send til innlogging
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  const exp = sessionManager.getRemainingExpTime(token);

  // 2. Token utløpt og ingen refresh token -> slett sesjon og omdiriger
  if (exp < 0 && !refreshToken) {
    await sessionManager.removeSession();
    const loginUrl = new URL("/login?expired=true", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Forny token dersom det gjenstår mindre enn 5 minutter (300 sekunder)
  if (exp < 300 && refreshToken) {
    try {
      const refreshUrl = `${process.env.NEXT_PUBLIC_AUTH_API || "http://localhost:5000/api/auth"}/connect/token`;

      const bodyParams = new URLSearchParams();
      bodyParams.append("grant_type", "refresh_token");
      bodyParams.append("refresh_token", refreshToken);
      bodyParams.append("client_id", "recipe-web-app");

      const response = await fetch(refreshUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: bodyParams.toString(),
      });

      if (response.ok) {
        const body: OpenIddictTokenResponse = await response.json();

        // Oppdater access_token og eventuell ny refresh_token ved token-rotasjon
        await sessionManager.setToken(body.access_token, body.expires_in);
        if (body.refresh_token) {
          await sessionManager.setRefreshToken(body.refresh_token);
        }
      } else {
        // Ugyldig eller utløpt refresh_token (f.eks. invalid_grant)
        await sessionManager.removeSession();
        const loginUrl = new URL("/login?expired=true", req.url);
        return NextResponse.redirect(loginUrl);
      }
    } catch {
      await sessionManager.removeSession();
      const loginUrl = new URL("/login?expired=true", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 4. Rolleretningslinjer for admin-ruter ("admin" i små bokstaver)
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const role = sessionManager.getUserRole(token);
    if (role?.toLowerCase() !== "admin") {
      const newUrl = new URL("/404", req.url);
      return NextResponse.redirect(newUrl);
    }
  }

  return NextResponse.next();
};

export default proxy;