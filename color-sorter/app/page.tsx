import ColorList from './components/ColorList';

async function getColors() {
  const res = await fetch('http://localhost:3000/api/colors', {
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