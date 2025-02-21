'use client';

import { Color } from '@/types/color';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
        return a.hexCode.localeCompare(b.hexCode);
      }
    }));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="mb-4 flex items-center gap-3">
        <span className="text-gray-600">Sorted by:</span>
        <span className={`${!sortByHex ? 'font-bold text-blue-600' : 'text-gray-600'}`}>
          Name
        </span>
        <button
          onClick={toggleSort}
          className="w-14 h-7 bg-gray-200 rounded-full p-1 duration-300 ease-in-out"
        >
          <div
            className={`bg-blue-600 w-5 h-5 rounded-full transform duration-300 ease-in-out ${
              sortByHex ? 'translate-x-7' : ''
            }`}
          />
        </button>
        <span className={`${sortByHex ? 'font-bold text-blue-600' : 'text-gray-600'}`}>
          Hex Code
        </span>
      </div>
      
      <div className="space-y-2">
        <AnimatePresence>
          {colors.map((color) => (
            <motion.div
              key={`${color.name}-${color.hexCode}`}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between p-3 border rounded"
            >
              <span>{color.name}</span>
              <div className="flex items-center gap-2">
                <span>{color.hexCode}</span>
                <div
                  className="w-6 h-6 border rounded"
                  style={{ backgroundColor: color.hexCode }}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}