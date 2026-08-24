import {NextResponse} from "next/server";
import {agentExternal} from "@/lib/agent/agentExternal";
import {HttpResponse} from "@/lib/models/httpResponse";
import sessionManager from "@/lib/session/sessionManager";
import {User} from "@/lib/models/user/user";
import {LoginResponse} from "@/lib/models/auth/loginResponse";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const url = `${process.env.AUTH_API}/api/login`;
    const response = await agentExternal.post(url, body);

    if (!response.ok) {
      const errorData = await response.json().catch(() => undefined);
      const errorResponse: HttpResponse<undefined> = {
        statusCode: response.status,
        message: errorData?.details || errorData?.message || "Internal Server Error",
        errors: errorData?.errors || undefined,
        timestamp: new Date().toISOString()
      }
      return NextResponse.json(errorResponse, {status: response.status})
    }

    const data: LoginResponse = await response.json()

    await sessionManager.setSession(data);
    const user = await sessionManager.getUserData() as User;

    const successResponse: HttpResponse<User> = {
      statusCode: 200,
      message: "Innlogging vellykket!",
      body: user,
      timestamp: new Date().toISOString()
    }

    return NextResponse.json(successResponse, {status: response.status});
  }
  catch {
    const errorResponse: HttpResponse<undefined> = {
      statusCode: 500,
      message: "Kunne ikke koble mot server...",
      timestamp: new Date().toISOString()
    }

    return NextResponse.json(errorResponse, { status: 500});
  }
}