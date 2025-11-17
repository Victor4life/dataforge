import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowRight, Upload, Database, Zap } from "lucide-react";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance mb-6 leading-tight">
                Decentralized AI{" "}
                <span className="text-primary">Training Data</span> Marketplace
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance mb-8">
                Upload datasets, verify with Seal, store on Walrus, index with
                Nautilus, and earn SUI while contributing to the future of AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/upload"
                  className="px-6 py-3 rounded-lg font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
                >
                  Upload Dataset <ArrowRight size={20} />
                </Link>
                <Link
                  href="/explore"
                  className="px-6 py-3 rounded-lg font-medium bg-card border border-border text-foreground hover:bg-muted transition inline-flex items-center justify-center gap-2"
                >
                  Explore Datasets
                </Link>
              </div>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mt-20">
              <div className="bg-card border border-border rounded-lg shadow-lg p-8">
                <Upload className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-2">Upload & Store</h3>
                <p className="text-muted-foreground">
                  Store your datasets on Walrus for decentralized, secure
                  storage
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg shadow-lg p-8">
                <Database className="text-accent mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-2">Verify & Index</h3>
                <p className="text-muted-foreground">
                  Verify integrity with Seal, index with Nautilus for
                  discoverability
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg shadow-lg p-8">
                <Zap className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-2">Monetize</h3>
                <p className="text-muted-foreground">
                  Earn SUI through purchases and collect royalties on your
                  datasets
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Connect Wallet",
                  desc: "Link your Sui wallet to get started",
                },
                {
                  step: "2",
                  title: "Upload Dataset",
                  desc: "Upload files and configure metadata",
                },
                {
                  step: "3",
                  title: "Verify & Store",
                  desc: "Seal verifies integrity, Walrus stores your data",
                },
                {
                  step: "4",
                  title: "List for Sale",
                  desc: "Set price and share with the community",
                },
                {
                  step: "5",
                  title: "Earn Revenue",
                  desc: "Get paid in SUI when developers purchase",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
