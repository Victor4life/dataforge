import { ReactNode } from 'react';

interface DashboardCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  color?: string;
}

export function DashboardCard({ icon, label, value, color = 'text-primary' }: DashboardCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg shadow-lg p-6">
      <div className={`${color} mb-3`}>{icon}</div>
      <p className="text-muted-foreground text-sm mb-1">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
