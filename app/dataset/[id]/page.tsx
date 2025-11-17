import { DatasetDetail } from '@/components/dataset-detail';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { notFound } from 'next/navigation';

interface Params {
  params: Promise<{ id: string }>;
}

export default async function DatasetPage({ params }: Params) {
  const { id } = await params;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <DatasetDetail datasetId={id} />
        </div>
      </main>
      <Footer />
    </>
  );
}
