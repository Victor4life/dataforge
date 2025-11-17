"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Download, Check, Loader, AlertCircle } from "lucide-react";

import { walrusDownload } from "../lib/walrus-client";

interface DatasetDetailData {
  id: string;
  name: string;
  creator: string;
  price: number;
  description: string;
  tags: string[];
  downloads: number;
  verified: boolean;
  walrusCid: string;
  sealProof: string;
  size: string;
  fileType: string;
  createdAt: string;
  license: string;
  metadata: Record<string, string>;
}

export function DatasetDetail({ datasetId }: { datasetId: string }) {
  const [dataset, setDataset] = useState<DatasetDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    const fetchDataset = async () => {
      try {
        const response = await fetch(`/api/datasets/${datasetId}`);
        if (!response.ok) throw new Error("Dataset not found");
        const data = await response.json();
        setDataset(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dataset");
        // Mock data fallback
        setDataset({
          id: datasetId,
          name: "ImageNet Subset 2024",
          creator: "0x1234567890abcdef",
          price: 100,
          description:
            "High-quality subset of ImageNet with verified labels and metadata",
          tags: ["images", "vision", "classification", "ml", "ai"],
          downloads: 1250,
          verified: true,
          walrusCid: "Qm1234567890abcdefghijklmnopqrstuvwxyz",
          sealProof: "0xsealproof1234567890",
          size: "2.5 GB",
          fileType: "ZIP (JPG + JSON)",
          createdAt: "2024-01-15",
          license: "CC-BY-4.0",
          metadata: {
            "Total Images": "50,000",
            "Image Resolution": "224x224 to 500x500",
            Classes: "1,000",
            "Train/Val Split": "80/20",
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDataset();
  }, [datasetId]);

  const handlePurchase = async () => {
    setPurchasing(true);
    try {
      const response = await fetch(`/api/datasets/${datasetId}/purchase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: "0x..." }),
      });

      if (!response.ok) throw new Error("Purchase failed");

      alert("Purchase successful! You can now download the dataset.");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Purchase failed");
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (error || !dataset) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-lg p-8 border-red-500/50 bg-red-500/10">
        <div className="flex gap-3">
          <AlertCircle size={24} className="text-red-500 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-red-500 mb-1">Error</h3>
            <p className="text-red-500/90">{error || "Dataset not found"}</p>
          </div>
        </div>
      </div>
    );
  }

  const handleDownload = async () => {
    if (!dataset?.walrusCid) return;
    try {
      const data = await walrusDownload(dataset.walrusCid);
      const blob = new Blob([data], {
        type: dataset.fileType || "application/octet-stream",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = dataset.name;
      a.click();
    } catch (err) {
      alert("Failed to download dataset");
      console.error(err);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2">
        <div className="bg-card border border-border rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-4xl font-bold">{dataset.name}</h1>
                {dataset.verified && (
                  <Check
                    size={24}
                    className="text-green-500"
                    title="Verified with Seal"
                  />
                )}
              </div>
              <p className="text-muted-foreground">by {dataset.creator}</p>
            </div>
          </div>

          <p className="text-lg mb-6 leading-relaxed">{dataset.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {dataset.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-6 p-4 bg-card rounded-lg border border-border">
            <div>
              <p className="text-sm text-muted-foreground">File Size</p>
              <p className="font-semibold">{dataset.size}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">File Type</p>
              <p className="font-semibold">{dataset.fileType}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">License</p>
              <p className="font-semibold">{dataset.license}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Downloads</p>
              <p className="font-semibold">{dataset.downloads}</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-4">Dataset Specifications</h3>
          <div className="space-y-3">
            {Object.entries(dataset.metadata).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between py-2 border-b border-border"
              >
                <span className="text-muted-foreground">{key}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Verification Details</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Walrus CID (Storage)
              </p>
              <p className="font-mono text-sm break-all bg-background p-3 rounded border border-border">
                {dataset.walrusCid}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Seal Proof (Verification)
              </p>
              <p className="font-mono text-sm break-all bg-background p-3 rounded border border-border">
                {dataset.sealProof}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-1">
        <div className="bg-card border border-border rounded-lg shadow-lg p-8 sticky top-24">
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-1">Price</p>
            <div className="text-4xl font-bold text-primary">
              {dataset.price}
            </div>
            <p className="text-muted-foreground">SUI</p>
          </div>

          <button
            onClick={handlePurchase}
            disabled={purchasing}
            className="px-4 py-2 rounded-lg font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity w-full mb-4 disabled:opacity-50"
          >
            {purchasing ? "Processing..." : "Purchase Dataset"}
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 w-full mb-4"
          >
            Download Dataset
          </button>

          <button className="px-4 py-2 rounded-lg font-medium bg-card border border-border text-foreground hover:bg-muted transition w-full">
            Add to Favorites
          </button>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm font-medium mb-3">Created</p>
            <p className="text-muted-foreground">{dataset.createdAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
