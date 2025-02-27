'use client';
import { Color } from '@/types/color';
import { useState } from 'react';
import SortToggle from './SortToggle';
import ColorCard from './ColorCard';
import AddColor from './AddColor';

export default function ColorList({ initialColors }: { initialColors: Color[] }) {
  const [colors, setColors] = useState<Color[]>(initialColors);
  const [sortByHex, setSortByHex] = useState(false);

  const handleColorAdded = async (color: Color) => {
    // Add the color through the API
    await fetch('/api/colors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(color),
    });

    // Fetch the updated list
    const response = await fetch('/api/colors');
    if (response.ok) {
      const updatedColors = await response.json();
      // Apply current sorting to the new list
      const sortedColors = [...updatedColors].sort((a, b) => {
        return sortByHex 
          ? a.hexCode.localeCompare(b.hexCode)
          : a.name.localeCompare(b.name);
      });
      setColors(sortedColors);
    }
  };

  const toggleSort = () => {
    setSortByHex(!sortByHex);
    setColors([...colors].sort((a, b) => {
      return sortByHex 
        ? a.hexCode.localeCompare(b.hexCode)
        : a.name.localeCompare(b.name);
    }));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <AddColor handleColorAdded={handleColorAdded} />
      <SortToggle sortByHex={sortByHex} onToggle={toggleSort} />
      <div className="space-y-2">
        {colors.map((color) => (
          <ColorCard key={color.name.toLowerCase()} color={color} />
        ))}
      </div>
    </div>
  );
}