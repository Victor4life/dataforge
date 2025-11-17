export const WALRUS_ENDPOINT = "https://api.testnet.walrus.xyz/v1";

/**
 * Upload file to Walrus (Testnet)
 * Returns: { cid: string }
 */
export async function walrusUpload(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/walrus/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Walrus upload failed");
  return res.json(); // { cid: string }
}

/**
 * Download file (requires backend proxy due to CORS)
 */
export async function walrusDownload(cid: string): Promise<Uint8Array> {
  const res = await fetch(`/api/walrus/fetch/${cid}`);
  if (!res.ok) throw new Error("Walrus fetch failed");
  const buf = await res.arrayBuffer();
  return new Uint8Array(buf);
}
