export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

const BACKEND = process.env.BACKEND_URL || "http://localhost:4402";

export async function GET() {
  try {
    const res = await fetch(`${BACKEND}/wallet/balances`, {
      cache: "no-store",
      signal: AbortSignal.timeout(15000),  // RPC calls can be slow
    });
    if (!res.ok) return NextResponse.json([], { status: 200 });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
