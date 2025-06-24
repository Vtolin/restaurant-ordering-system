import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function GET() {
    try {
         const rows = await executeQuery(`
      SELECT
        o.id AS order_id,
        o.created_at,
        oi.menu_item_id,
        oi.quantity,
        mi.name AS item_name,
        mi.price
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN menu_items mi ON oi.menu_item_id = mi.id
      ORDER BY o.created_at DESC
    `)
    const orders: Record<number, any> = {}
    for (const row of rows) {
        if(!orders[row.order_id]) {
            orders[row.order_id] = {
                orderId: row.order_id,
                createdAt: row.created_at,
                items: []
            }
        }

    orders[row.order_id].items.push({
        name: row.item_name,
        quantity: row.quantity,
        price: row.price
        })
    }
    return NextResponse.json({
        success: true,
        data: Object.values(orders)
    })
    } catch (err: any) {
        console.error('error fetching orders:', err)
        return NextResponse.json({
            succsess: false,
            error: err.message}),
            {status: 500}
    }
}