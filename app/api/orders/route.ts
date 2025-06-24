import { NextRequest, NextResponse } from 'next/server'
import { executeQuery } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { items, name } = await request.json()
    if (!name || !Array.isArray(items)) {
      throw new Error('Missing name or items')
    }
    
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const result = await executeQuery(
      'INSERT INTO orders (customer_name, total_amount, created_at) VALUES (?, ?, NOW())',
       [name, totalAmount]
    )
    
    const orderId = (result as any).insertId


    for (const item of items) {
      await executeQuery(
        'INSERT INTO order_items (order_id, menu_item_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.id, item.quantity, item.price]
      )
    }

    return NextResponse.json({ success: true, orderId })
  } catch (error: any) {
    console.error('Order creation failed:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
