import ColorList from './components/ColorList';

async function getColors() {
  const isProduction = process.env.NODE_ENV === 'production';
  const baseUrl = isProduction 
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://localhost:3000";

  const url = `${baseUrl}/api/colors`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch colors from ${url}`);
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