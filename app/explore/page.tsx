import { DatasetList } from '@/components/dataset-list';
import { DatasetFilters } from '@/components/dataset-filters';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function ExplorePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Explore Datasets</h1>
            <p className="text-muted-foreground">Browse and purchase AI training datasets from our community</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <DatasetFilters />
            </div>
            <div className="lg:col-span-3">
              <DatasetList />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
