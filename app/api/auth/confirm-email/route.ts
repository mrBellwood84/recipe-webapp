import { NextResponse } from "next/server";
import { agentAuth } from "@/lib/agent/agentAuth";

export async function POST(request: Request) {
  try {
    const body = await request.json(); // Forventer { userId, token }

    if (!body.userId || !body.token) {
      return NextResponse.json(
        { message: "Mangler userId eller token." },
        { status: 400 }
      );
    }

    const result = await agentAuth.confirmEmail(body);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Kunne ikke bekrefte e-post." },
      { status: 400 }
    );
  }
}