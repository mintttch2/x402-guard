export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

const BACKEND = process.env.BACKEND_URL || "http://localhost:4402";

export async function GET() {
  try {
    const res = await fetch(`${BACKEND}/onchain/stats`, {
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return NextResponse.json({ error: "Backend error" }, { status: 200 });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ approved: 0, soft_alerts: 0, blocked: 0 }, { status: 200 });
  }
}
