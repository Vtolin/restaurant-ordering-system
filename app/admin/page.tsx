'use client'
import { useEffect, useState } from "react"

export default function AdminPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

useEffect(() => {
  async function loadOrders() {
    try {
      const res = await fetch('/api/admin/orders')
      if (!res.ok) throw new Error('API error')

      const json = await res.json()
      setOrders(json.data)
    } catch (err) {
      console.error('Failed to load orders:', err)
      setOrders([]) // Set to empty so UI shows “no orders”
    } finally {
      setLoading(false)
    }
  }

  loadOrders()
}, [])

  return (
    <main className="p-6 text-white">
      <h1 className="text-2xl mb-4">Admin Orders</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        orders.map(order => (
          <div key={order.orderId} className="bg-zinc-800 mb-6 p-4 rounded">
            <h2 className="text-xl font-bold">Order #{order.orderId}</h2>
            <p className="text-sm text-zinc-400">{new Date(order.createdAt).toLocaleString()}</p>
            <ul className="mt-2 space-y-1">
              {order.items.map((item: any, index: number) => (
                <li key={index} className="text-sm">
                  {item.quantity}× {item.name} — Rp {(item.quantity * item.price).toLocaleString('id-ID')}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </main>
  )
}