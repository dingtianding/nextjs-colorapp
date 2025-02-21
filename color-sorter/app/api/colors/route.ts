import { Color } from '@/types/color';
import { NextResponse } from 'next/server';

const colors: Color[] = [
  { name: "Aqua", hexCode: "#00FFFF" },
  { name: "Azure", hexCode: "#F0FFFF" },
  { name: "Beige", hexCode: "#F5F5DC" },
  { name: "Brown", hexCode: "#A52A2A" },
  { name: "Crimson", hexCode: "#DC143C" },
  { name: "Cyan", hexCode: "#00FFFF" },
  { name: "DarkBlue", hexCode: "#00008B" },
  { name: "DarkGreen", hexCode: "#006400" },
  { name: "Ebony", hexCode: "#555D50" },
  { name: "Emerald", hexCode: "#50C878" }
];

export async function GET() {
  return NextResponse.json(colors);
}