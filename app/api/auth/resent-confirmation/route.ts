import { NextResponse } from "next/server";
import { agentAuth } from "@/lib/agent/agentAuth";

export async function POST() {
  try {
    const result = await agentAuth.resendConfirmation();
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Kunne ikke sende bekreftelses-epost på nytt." },
      { status: 400 }
    );
  }
}