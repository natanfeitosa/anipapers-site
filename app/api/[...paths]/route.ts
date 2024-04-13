import { NextResponse } from "next/server";
import api from "@/lib/api";

export async function GET(req: Request) {
  const nextUrl = new URL(req.url);
  const pathname = nextUrl.pathname.replace(/^\/?api\//, "");
  // return NextResponse.json({ pathname }, { status: 200 });
  const res = await api.get(pathname, {
    params: Object.fromEntries(nextUrl.searchParams.entries()),
  });

  return NextResponse.json(res.data, { status: res.status });
}

export const dynamic = "force-dynamic"; // defaults to auto
