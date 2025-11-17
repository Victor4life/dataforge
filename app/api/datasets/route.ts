export async function GET() {
  // Mock datasets endpoint
  const datasets = [
    {
      id: '1',
      name: 'ImageNet Subset 2024',
      creator: '0x123...456',
      price: 100,
      description: 'High-quality subset of ImageNet with verified labels',
      tags: ['images', 'vision', 'classification'],
      downloads: 1250,
      verified: true,
    },
    {
      id: '2',
      name: 'Common Crawl Text',
      creator: '0x789...012',
      price: 50,
      description: 'Web-scraped text data for language models',
      tags: ['text', 'nlp', 'language'],
      downloads: 856,
      verified: true,
    },
  ];

  return Response.json(datasets);
}

export async function POST(request: Request) {
  // Mock upload endpoint
  const formData = await request.formData();
  
  const dataset = {
    id: Math.random().toString(36).substr(2, 9),
    name: formData.get('name'),
    walrusCid: 'Qm' + Math.random().toString(36).substr(2, 44),
    sealProof: '0x' + Math.random().toString(16).substr(2, 64),
    metadata: {
      size: '2.5 GB',
      fileType: formData.get('file') ? 'ZIP' : 'Unknown',
      uploadedAt: new Date().toISOString(),
    },
  };

  return Response.json(dataset);
}
