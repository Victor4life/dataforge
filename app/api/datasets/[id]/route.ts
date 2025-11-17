export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Mock dataset detail endpoint
  const dataset = {
    id,
    name: 'ImageNet Subset 2024',
    creator: '0x1234567890abcdef',
    price: 100,
    description: 'High-quality subset of ImageNet with verified labels',
    tags: ['images', 'vision', 'classification'],
    downloads: 1250,
    verified: true,
    walrusCid: 'Qm1234567890abcdefghijklmnopqrstuvwxyz',
    sealProof: '0xsealproof1234567890',
    size: '2.5 GB',
    fileType: 'ZIP (JPG + JSON)',
    createdAt: '2024-01-15',
    license: 'CC-BY-4.0',
    metadata: {
      'Total Images': '50,000',
      'Image Resolution': '224x224 to 500x500',
      'Classes': '1,000',
      'Train/Val Split': '80/20',
    },
  };

  return Response.json(dataset);
}
