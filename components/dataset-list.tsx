"use client";

import { useState, useEffect } from "react";
import { DatasetCard } from "./dataset-card";
import { Loader } from "lucide-react";

interface Dataset {
  id: string;
  name: string;
  creator: string;
  price: number;
  description: string;
  tags: string[];
  downloads: number;
  verified: boolean;
  walrusCid: string;
}

export function DatasetList() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const res = await fetch("/api/datasets");
        const data = await res.json();
        setDatasets(data);
      } catch (err) {
        console.error(err);
        setDatasets([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDatasets();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {datasets.map((d) => (
        <DatasetCard key={d.id} dataset={d} />
      ))}
    </div>
  );
}
