import ColorList from './components/ColorList';

async function getColors() {
  // Get the full URL for the API endpoint
  const isProduction = process.env.NODE_ENV === 'production';
  const protocol = isProduction ? 'https' : 'http';
  const host = isProduction ? process.env.RENDER_EXTERNAL_URL : 'localhost:3000';
  
  const url = `${protocol}://${host}/api/colors`;

  const res = await fetch(url, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch colors');
  }

  return res.json();
}

export default async function Home() {
  const colors = await getColors();

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Color Sorter</h1>
      <ColorList initialColors={colors} />
    </main>
  );
}