import { Color } from '@/types/color';

interface ColorCardProps {
  color: Color;
}

export default function ColorCard({ color }: ColorCardProps) {
  return (
    <div className="flex items-center justify-between p-3 border rounded">
      <span>{color.name}</span>
      <div className="flex items-center gap-2">
        <span>{color.hexCode}</span>
        <div
          className="w-6 h-6 border rounded"
          style={{ backgroundColor: color.hexCode }}
        />
      </div>
    </div>
  );
}
