import { NextResponse } from "next/server";

export const runtime = "nodejs";

const WALRUS_ENDPOINT = "https://api.testnet.walrus.xyz/v1/store";

export async function POST(req: Request) {
  try {
    // Receive multipart/form-data from client
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) throw new Error("No file uploaded");

    const buf = await file.arrayBuffer();

    const res = await fetch(WALRUS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
      },
      body: buf,
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Walrus API error:", text);
      return NextResponse.json({ error: text }, { status: 500 });
    }

    const json = await res.json();
    return NextResponse.json(json);
  } catch (err: any) {
    console.error("Server upload error:", err);
    return NextResponse.json(
      { error: err.message || "Upload failed" },
      { status: 500 }
    );
  }
}
