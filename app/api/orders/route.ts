import { NextRequest, NextResponse } from 'next/server'
import { executeQuery } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { items, name } = await request.json()

    const result = await executeQuery('INSERT INTO orders (created_at) VALUES (NOW())')
    const orderId = (result as any).insertId

    for (const item of items) {
      await executeQuery(
        'INSERT INTO order_items (order_id, menu_item_id, quantity) VALUES (?, ?, ?)',
        [orderId, item.id, item.quantity, name]
      )
    }

    return NextResponse.json({ success: true, orderId })
  } catch (error: any) {
    console.error('Order creation failed:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
