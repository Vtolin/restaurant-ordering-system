import { NextResponse } from 'next/server'
import { executeQuery } from '@/lib/db'



export async function GET() {
  try {
    const menuItems = await executeQuery(`
      SELECT 
        mi.id,
        mi.name,
        mi.description,
        mi.price,
        mi.image_url,
        mi.is_available,
        c.name as category_name,
        c.id as category_id
      FROM menu_items mi
      LEFT JOIN categories c ON mi.category_id = c.id
      WHERE mi.is_available = TRUE
      ORDER BY c.name, mi.name
    `)

    return NextResponse.json({
      success: true,
      data: menuItems
    })
    
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch menu items' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { name, description, price, category_id, image_url } = await request.json()

    const result = await executeQuery(
      'INSERT INTO menu_items (name, description, price, category_id, image_url) VALUES (?, ?, ?, ?, ?)',
      [name, description, price, category_id, image_url || null]
    )

    return NextResponse.json({
      success: true,
      message: 'Menu item created successfully',
      id: (result as any).insertId
    })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create menu item' },
      { status: 500 }
    )
  }
}