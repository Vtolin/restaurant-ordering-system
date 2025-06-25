import { executeQuery } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const {status} = await request.json()
        const allowed = ['pending', 'preparing', 'ready', 'served', 'canceled']
        if(!allowed.includes(status)) {
            throw new Error('invalid status')
        }
        await executeQuery(
            'UPDATE orders SET status = ? WHERE id = ?',
            [status, params.id]
        )
        return NextResponse.json({success: true})
    } catch (err: any) {
        console.error('Status update failed:', err)
        return NextResponse.json({ success: false, error: err.message }, { status: 500 })
    }
}