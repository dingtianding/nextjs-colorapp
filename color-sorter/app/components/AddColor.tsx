'use client';

import { Color } from '@/types/color';
import { useState } from 'react';

interface AddColorProps {
  handleColorAdded: (color: Color) => void;
}

export default function AddColor({ handleColorAdded }: AddColorProps) {
  const [name, setName] = useState('Red');
  const [hexCode, setHexCode] = useState('#FF0000');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleColorAdded({ name, hexCode });
    setName('Red');
    setHexCode('#FF0000');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-2">
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Color name"
          className="w-full p-2 border rounded text-black"
          required
        />
      </div>
      <div>
        <input
          type="text"
          value={hexCode}
          onChange={(e) => setHexCode(e.target.value)}
          placeholder="Hex code (e.g. #FF0000)"
          pattern="^#[0-9A-Fa-f]{6}$"
          className="w-full p-2 border rounded text-black"
          required
        />
      </div>
      <button 
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Add Color
      </button>
    </form>
  );
}
