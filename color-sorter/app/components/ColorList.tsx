'use client';
import { Color } from '@/types/color';
import { useState } from 'react';
import SortToggle from './SortToggle';
import ColorCard from './ColorCard';

export default function ColorList({ initialColors }: { initialColors: Color[] }) {
  const [colors, setColors] = useState<Color[]>(initialColors);
  const [sortByHex, setSortByHex] = useState(false);

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
      <SortToggle sortByHex={sortByHex} onToggle={toggleSort} />
      <div className="space-y-2">
        {colors.map((color) => (
          <ColorCard key={color.name} color={color} />
        ))}
      </div>
    </div>
  );
}