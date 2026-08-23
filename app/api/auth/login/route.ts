import {NextResponse} from "next/server";
import {agentExternal} from "@/lib/agent/agentExternal";
import {HttpResponse} from "@/lib/models/httpResponse";
import {cookies} from "next/headers";

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

    const data: LoginResponseDTO = await response.json()
    const user: User = {
      userId: data.userId,
      userName: data.userName,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      avatarUrl: data.avatarUrl,
    }

    const cookieStore = await cookies();

    cookieStore.set('token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    cookieStore.set("user_info", JSON.stringify(user), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7
    });



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