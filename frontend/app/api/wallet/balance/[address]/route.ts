export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

const BACKEND = process.env.BACKEND_URL || "https://x402-guard.fly.dev";

export async function GET(_: Request, { params }: { params: { address: string } }) {
  try {
    const res = await fetch(`${BACKEND}/wallet/balance/${params.address}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return NextResponse.json({ error: "RPC error" }, { status: res.status });
    return NextResponse.json(await res.json());
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
