import { NextResponse } from "next/server";
import { agentAuth } from "@/lib/agent/agentAuth";

export async function GET() {
  const externalUrl = agentAuth.getExternalLoginUrl("Google");
  return NextResponse.redirect(externalUrl);
}