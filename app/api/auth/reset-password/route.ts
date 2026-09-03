import { NextResponse } from "next/server";
import { agentAuth } from "@/lib/agent/agentAuth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await agentAuth.resetPassword(body);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Tilbakestilling av passord mislyktes." },
      { status: 400 }
    );
  }
}