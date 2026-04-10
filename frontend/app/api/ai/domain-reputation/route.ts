import { NextRequest, NextResponse } from "next/server";

const BACKEND = process.env.BACKEND_URL || "http://localhost:4402";

export async function GET(req: NextRequest) {
  const domain = req.nextUrl.searchParams.get("domain") || "";
  try {
    const res = await fetch(`${BACKEND}/ai/domain-reputation?domain=${encodeURIComponent(domain)}`);
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
