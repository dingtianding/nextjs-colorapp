import { Color } from '@/types/color';
import { NextResponse } from 'next/server';

const colors: Color[] = [
  { name: "Azure", hexCode: "#F0FFFF" },
  { name: "Beige", hexCode: "#F5F5DC" },
  { name: "Crimson", hexCode: "#DC143C" },
  { name: "DarkBlue", hexCode: "#00008B" },
  { name: "Emerald", hexCode: "#50C878" },
  { name: "Aqua", hexCode: "#00FFFF" },
  { name: "Brown", hexCode: "#A52A2A" },
  { name: "Cyan", hexCode: "#00FFFF" },
  { name: "DarkGreen", hexCode: "#006400" },
  { name: "Ebony", hexCode: "#555D50" }
];

export async function GET() {
  return NextResponse.json(colors);
}

export async function POST(request: Request) {
  const { name, hexCode } = await request.json();

  if (!name || !hexCode) {
    return NextResponse.json({ error: "Name and hex code are required" }, { status: 400 });
  }

  const existingColorIndex = colors.findIndex(color => color.name.toLowerCase() === name.toLowerCase());
  if (existingColorIndex !== -1) {
    colors[existingColorIndex].hexCode = hexCode;
    return NextResponse.json(colors[existingColorIndex]);
  }

  const newColor: Color = { name, hexCode };
  colors.push(newColor);
  return NextResponse.json(newColor);
}