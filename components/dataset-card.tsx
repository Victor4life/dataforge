'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Download, Check } from 'lucide-react';

interface Dataset {
  id: string;
  name: string;
  creator: string;
  price: number;
  description: string;
  tags: string[];
  downloads: number;
  verified: boolean;
}

export function DatasetCard({ dataset }: { dataset: Dataset }) {
  return (
    <Link href={`/dataset/${dataset.id}`}>
      <div className="bg-card border border-border rounded-lg shadow-lg p-6 hover:bg-card-hover transition cursor-pointer">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-semibold">{dataset.name}</h3>
              {dataset.verified && (
                <Check size={18} className="text-green-500" title="Verified with Seal" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">{dataset.creator}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{dataset.price}</div>
            <p className="text-xs text-muted-foreground">SUI</p>
          </div>
        </div>

        <p className="text-muted-foreground mb-4 line-clamp-2">{dataset.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {dataset.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Download size={16} />
            <span>{dataset.downloads} purchases</span>
          </div>
          <span className="text-primary hover:underline">View Details →</span>
        </div>
      </div>
    </Link>
  );
}
