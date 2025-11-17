import { CreatorDashboard } from '@/components/creator-dashboard';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <CreatorDashboard />
        </div>
      </main>
      <Footer />
    </>
  );
}
