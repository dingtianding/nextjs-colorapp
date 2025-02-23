import { Color } from '@/types/color';

interface SortToggleProps {
  sortByHex: boolean;
  onToggle: () => void;
}

export default function SortToggle({ sortByHex, onToggle }: SortToggleProps) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="text-gray-600">Sorted by:</span>
      <span className={`${!sortByHex ? 'font-bold text-blue-600' : 'text-gray-600'}`}>
        Name
      </span>
      <button
        onClick={onToggle}
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
  );
}

