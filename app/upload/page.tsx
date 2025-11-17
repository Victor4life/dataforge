import { UploadForm } from '@/components/upload-form';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function UploadPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Upload Dataset</h1>
            <p className="text-muted-foreground">Share your AI training data with the community and earn SUI</p>
          </div>
          <UploadForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
