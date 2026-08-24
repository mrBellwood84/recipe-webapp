import {NextRequest, NextResponse} from "next/server";
import sessionManager from "@/lib/session/sessionManager";
import {agentExternal} from "@/lib/agent/agentExternal";
import {RefreshTokenResponse} from "@/lib/models/auth/refreshTokenResponse";

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/user/:path*',
    '/admin/:path*',
  ],
}

const proxy = async (req: NextRequest): Promise<NextResponse<unknown>> => {

  const token = req.cookies.get("token")?.value;
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  const exp = sessionManager.getRemainingExpTime(token)

  // sign out if user session has expired
  if (exp < 0) {
    await sessionManager.removeSession()
    const loginUrl = new URL("/login?expired=true", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // refresh if token is less than 1 day from expiring
  if (exp < 60 * 60 * 24) {
    const refreshUrl = `${process.env.AUTH_API}/api/refreshtoken`
    const response = await agentExternal.get(refreshUrl);
    const body: RefreshTokenResponse = await response.json();
    const token = body.token;
    await sessionManager.setToken(token);
  }

  if (req.nextUrl.pathname.startsWith("/admin")) {
    const role = sessionManager.getUserRole(token);
    if (role !== "Admin") {
      const newUrl = new URL("/404", req.url);
      return NextResponse.redirect(newUrl);
    }
  }

  return NextResponse.next();
}

export default proxy;