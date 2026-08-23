import sessionManager from "@/lib/session/sessionManager";
import {NextResponse} from "next/server";

export const GET = async () => {
  await sessionManager.removeSession()
  return NextResponse.json({status: 200})
}