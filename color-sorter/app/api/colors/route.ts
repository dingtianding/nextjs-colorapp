import { Color } from '@/types/color';
import { NextResponse } from 'next/server';

const colors: Color[] = [
  { name: "Red", hexCode: "#FF0000" },
  { name: "Orange", hexCode: "#FFA500" }, 
  { name: "Yellow", hexCode: "#FFFF00" },
  { name: "Green", hexCode: "#008000" },
  { name: "Blue", hexCode: "#0000FF" },
  { name: "Indigo", hexCode: "#4B0082" },
  { name: "Violet", hexCode: "#8F00FF" }
];

export async function GET() {
  return NextResponse.json(colors);
}