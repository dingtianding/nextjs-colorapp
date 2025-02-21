'use client';

import { Color } from '@/types/color';
import { useState, useEffect } from 'react';

interface ColorListProps {
  initialColors: Color[];
}

export default function ColorList({ initialColors }: ColorListProps) {
  const [colors, setColors] = useState<Color[]>([]);
  const [sortByHex, setSortByHex] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setColors(initialColors);
      setLoading(false);
      // Add a small delay before showing content to ensure smooth transition animation
      setTimeout(() => {
        setShowContent(true);
      }, 100);
    }, 2000);
  }, [initialColors]);

  const toggleSort = () => {
    const newSortByHex = !sortByHex;
    setSortByHex(newSortByHex);
    setColors([...colors].sort((a, b) => {
      if (newSortByHex) {
        return a.hexCode.localeCompare(b.hexCode);
      } else {
        return a.name.localeCompare(b.name);
      }
    }));
  };

  return (
    <div className="max-w-md mx-auto p-4">
        {/* Sorting Button */}
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
      
      {/* Color List */}
      <div className="space-y-2">
        <p className={`text-gray-500 italic text-center mb-4 transition-colors duration-300 whitespace-nowrap mx-auto ${loading ? 'text-white' : ''}`}>
          {loading ? 'Simulated 2 second loading delay...' : '\u00A0'}
        </p>
        {[...Array(10)].map((_, i) => (
          <div 
            key={`color-${i}`}
            className={`flex items-center justify-between p-3 border rounded ${
              loading ? 'animate-pulse' : ''
            }`}
          >
            {loading ? (
              <>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  <div className="w-6 h-6 bg-gray-200 rounded"></div>
                </div>
              </>
            ) : (
              colors[i] && (
                <>
                  <span className={`transition-all duration-500 ${
                    showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>{colors[i].name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`transition-all duration-500 ${
                      showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>{colors[i].hexCode}</span>
                    <div
                      className={`w-6 h-6 border rounded transition-all duration-500 ${
                        showContent ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{ backgroundColor: colors[i].hexCode }}
                    />
                  </div>
                </>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}