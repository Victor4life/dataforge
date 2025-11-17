'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Users, Wallet, Eye } from 'lucide-react';
import { DashboardCard } from './dashboard-card';

interface CreatorStats {
  totalDatasets: number;
  totalRevenue: number;
  totalDownloads: number;
  totalRoyalties: number;
  datasets: Array<{
    id: string;
    name: string;
    price: number;
    sales: number;
    revenue: number;
  }>;
}

export function CreatorDashboard() {
  const [stats, setStats] = useState<CreatorStats | null>(null);

  useEffect(() => {
    // Mock data
    setStats({
      totalDatasets: 5,
      totalRevenue: 2450,
      totalDownloads: 3200,
      totalRoyalties: 1225,
      datasets: [
        { id: '1', name: 'ImageNet Subset 2024', price: 100, sales: 24, revenue: 2160 },
        { id: '2', name: 'Text Classification', price: 50, sales: 8, revenue: 360 },
        { id: '3', name: 'Audio Dataset', price: 75, sales: 12, revenue: 810 },
        { id: '4', name: 'Medical Imaging', price: 200, sales: 4, revenue: 1600 },
        { id: '5', name: 'NLP Training Set', price: 60, sales: 15, revenue: 810 },
      ],
    });
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Creator Dashboard</h1>
        <p className="text-muted-foreground">Manage your datasets and track your earnings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          icon={<Eye size={24} />}
          label="Total Datasets"
          value={stats.totalDatasets.toString()}
        />
        <DashboardCard
          icon={<Users size={24} />}
          label="Total Downloads"
          value={stats.totalDownloads.toString()}
          color="text-accent"
        />
        <DashboardCard
          icon={<TrendingUp size={24} />}
          label="Total Revenue"
          value={`${stats.totalRevenue} SUI`}
          color="text-success"
        />
        <DashboardCard
          icon={<Wallet size={24} />}
          label="Your Royalties"
          value={`${stats.totalRoyalties} SUI`}
          color="text-primary"
        />
      </div>

      {/* Datasets Table */}
      <div className="bg-card border border-border rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Your Datasets</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 font-semibold">Dataset Name</th>
                <th className="text-left py-3 font-semibold">Price</th>
                <th className="text-left py-3 font-semibold">Sales</th>
                <th className="text-left py-3 font-semibold">Revenue</th>
                <th className="text-left py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stats.datasets.map((dataset) => (
                <tr key={dataset.id} className="border-b border-border hover:bg-card transition">
                  <td className="py-4">{dataset.name}</td>
                  <td className="py-4">{dataset.price} SUI</td>
                  <td className="py-4">{dataset.sales}</td>
                  <td className="py-4 font-semibold text-success">{dataset.revenue} SUI</td>
                  <td className="py-4">
                    <button className="text-primary hover:underline text-sm">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
