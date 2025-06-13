import { NextResponse } from 'next/server'
import db from '@/lib/db' // Adjust the import based on your DB setup

export async function GET() {
  // Replace with DB fetch later
  const mockMenu = [
    { id: 1, name: "Spaghetti Carbonara", price: 45000, description: "Classic creamy pasta with pancetta" },
    { id: 2, name: "Margherita Pizza", price: 60000, description: "Fresh basil, mozzarella & tomato sauce" },
  ]

  return NextResponse.json(mockMenu)
}
