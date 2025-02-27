'use client';
import { Color } from '@/types/color';
import { useState } from 'react';
import SortToggle from './SortToggle';
import ColorCard from './ColorCard';
import AddColor from './AddColor';

export default function ColorList({ initialColors }: { initialColors: Color[] }) {
  const [colors, setColors] = useState<Color[]>(initialColors);
  const [sortByHex, setSortByHex] = useState(false);

  const sortColors = (colorsToSort: Color[], useHexSort: boolean) => {
    return [...colorsToSort].sort((a, b) => {
      return useHexSort
        ? a.hexCode.localeCompare(b.hexCode)
        : a.name.localeCompare(b.name);
    });
  };

  const handleColorAdded = async (color: Color) => {
    // Add the color through the API
    await fetch('/api/colors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(color),
    });

    // Fetch the updated list and sort it
    const response = await fetch('/api/colors');
    if (response.ok) {
      const updatedColors = await response.json();
      // Sort the colors before setting the state
      const sortedColors = sortColors(updatedColors, sortByHex);
      setColors(sortedColors);
    }
  };

  const toggleSort = () => {
    const newSortByHex = !sortByHex;
    setSortByHex(newSortByHex);
    setColors(sortColors(colors, newSortByHex));
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