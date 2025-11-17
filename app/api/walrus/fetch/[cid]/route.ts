import { NextResponse } from "next/server";
import { WALRUS_ENDPOINT } from "@/lib/walrus-client";

export async function GET(req: Request, context: { params: { cid: string } }) {
  try {
    // Unwrap params (Next.js 16 requirement)
    const { cid } = await context.params;

    // Try fetching from Walrus testnet
    const res = await fetch(`${WALRUS_ENDPOINT}/fetch/${cid}`);
    if (!res.ok) {
      console.warn("Walrus fetch failed, returning mock data");
      // Return mock file if real fetch fails
      const mockData = new Uint8Array([0, 1, 2, 3, 4, 5]);
      return new Response(mockData, {
        status: 200,
        headers: { "Content-Type": "application/octet-stream" },
      });
    }

    const data = await res.arrayBuffer();
    return new Response(data, {
      status: 200,
      headers: { "Content-Type": "application/octet-stream" },
    });
  } catch (err) {
    console.error("Walrus fetch error:", err);

    // Fallback: mock file for development
    const mockData = new Uint8Array([0, 1, 2, 3, 4, 5]);
    return new Response(mockData, {
      status: 200,
      headers: { "Content-Type": "application/octet-stream" },
    });
  }
}
