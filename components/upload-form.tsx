"use client";

import { useState } from "react";

const ALLOWED_FILE_TYPES = ["csv", "json", "zip"];

export function UploadForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    tags: "",
    license: "cc-by-4.0",
    price: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const ext = selected.name.split(".").pop()?.toLowerCase();
    if (!ext || !ALLOWED_FILE_TYPES.includes(ext)) {
      setError(
        `Invalid file type. Only ${ALLOWED_FILE_TYPES.join(", ")} are allowed.`
      );
      setFile(null);
      return;
    }

    setError("");
    setFile(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!file) {
      setError("Please select a file");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("tags", formData.tags);
      data.append("license", formData.license);
      data.append("price", formData.price);

      const res = await fetch("/api/walrus/upload", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Upload failed");

      const result = await res.json();
      alert(`Upload successful! CID: ${result.cid}`);
      setFormData({
        name: "",
        description: "",
        tags: "",
        license: "cc-by-4.0",
        price: "",
      });
      setFile(null);
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-card p-6 rounded-lg shadow-md"
    >
      {error && <p className="text-red-500 font-medium">{error}</p>}

      <input
        type="text"
        placeholder="Dataset Name"
        className="w-full p-2 border border-border rounded"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />

      <textarea
        placeholder="Description"
        className="w-full p-2 border border-border rounded"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        required
      />

      <input
        type="text"
        placeholder="Tags (comma separated)"
        className="w-full p-2 border border-border rounded"
        value={formData.tags}
        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
      />

      <input
        type="number"
        placeholder="Price in SUI"
        className="w-full p-2 border border-border rounded"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        required
        min={0}
        step={0.01}
      />

      <input
        type="file"
        accept={ALLOWED_FILE_TYPES.map((t) => `.${t}`).join(",")}
        onChange={handleFileChange}
        className="w-full p-2 border border-border rounded"
      />

      {file && (
        <p className="text-sm text-muted-foreground">
          Selected file: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition"
      >
        {loading ? "Uploading..." : "Upload Dataset"}
      </button>
    </form>
  );
}
