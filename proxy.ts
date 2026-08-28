import { NextRequest, NextResponse } from "next/server";
import sessionManager from "@/lib/session/sessionManager";

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/user/:path*',
    '/admin/:path*',
  ],
}

// OpenIddict standard respons-modell
interface OpenIddictTokenResponse {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  expires_in: number;
  scope?: string;
}

const proxy = async (req: NextRequest): Promise<NextResponse<unknown>> => {
  const token = req.cookies.get("token")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  const exp = sessionManager.getRemainingExpTime(token);

  // Omdiriger til login dersom tokenet er utløpt og vi ikke har refresh token
  if (exp < 0 && !refreshToken) {
    await sessionManager.removeSession();
    const loginUrl = new URL("/login?expired=true", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Forny token dersom det er mindre enn 5 minutter (300s) igjen til utløp
  if (exp < 300 && refreshToken) {
    try {
      const refreshUrl = `${process.env.AUTH_API || "http://localhost:5000"}/api/auth/connect/token`;

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

        // Oppdater access_token (og ev. ny refresh_token dersom OpenIddict roterte den)
        await sessionManager.setToken(body.access_token);
        if (body.refresh_token) {
          await sessionManager.setRefreshToken?.(body.refresh_token);
        }
      } else {
        // Hvis refresh feiler (f.eks. invalid_grant / utløpt refresh_token)
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

  // Tilgangskontroll for admin-ruter (rollenavnet er nå i små bokstaver "admin")
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const role = sessionManager.getUserRole(token);
    if (role?.toLowerCase() !== "admin") {
      const newUrl = new URL("/404", req.url);
      return NextResponse.redirect(newUrl);
    }
  }

  return NextResponse.next();
}

export default proxy;