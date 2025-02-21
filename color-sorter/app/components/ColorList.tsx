'use client';

import { Color } from '@/types/color';
import { useState } from 'react';

interface ColorListProps {
  initialColors: Color[];
}

export default function ColorList({ initialColors }: ColorListProps) {
  const [colors, setColors] = useState<Color[]>(initialColors);
  const [sortByHex, setSortByHex] = useState(false);

  const toggleSort = () => {
    setSortByHex(!sortByHex);
    setColors([...colors].sort((a, b) => {
      if (sortByHex) {
        return a.name.localeCompare(b.name);
      } else {
        return a.hex.localeCompare(b.hex);
      }
    }));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <button
        onClick={toggleSort}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Sort by {sortByHex ? 'Name' : 'Hex Code'}
      </button>
      
      <div className="space-y-2">
        {colors.map((color) => (
          <div
            key={color.hex}
            className="flex items-center justify-between p-3 border rounded"
          >
            <span>{color.name}</span>
            <div className="flex items-center gap-2">
              <span>{color.hex}</span>
              <div
                className="w-6 h-6 border rounded"
                style={{ backgroundColor: color.hex }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}