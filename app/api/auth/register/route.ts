import {RegisterRequest} from "@/lib/models/auth/registerRequest";
import {agentExternal} from "@/lib/agent/agentExternal";
import {HttpResponse} from "@/lib/models/httpResponse";
import {NextResponse} from "next/server";
import {LoginResponse} from "@/lib/models/auth/loginResponse";
import sessionManager from "@/lib/session/sessionManager";
import {User} from "@/lib/models/user/user";

export const POST = async (request: Request) => {
  try {
    const body: RegisterRequest = await request.json()
    const registerUrl = `${process.env.AUTH_API}/api/register`
    const response = await agentExternal.post(registerUrl, body);

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
      message: "Registering vellykket",
      body: user,
      timestamp: new Date().toISOString()
    }

    return NextResponse.json(successResponse, {status: response.status})
  } catch {
    const errorResponse: HttpResponse<undefined> = {
      statusCode: 500,
      message: "Kunne ikke koble mot server...",
      timestamp: new Date().toISOString()
    }
    return NextResponse.json(errorResponse, { status: 500});
  }
}