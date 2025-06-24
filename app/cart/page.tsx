'use client'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

export default function CartPage() {
  const { items, removeFromCart, clearCart } = useCart()
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleCheckout() {
    try {
      setLoading(true)
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, name })
      })

      const result = await res.json()

      if (!res.ok) throw new Error(result.error || 'Checkout failed')

      alert('Order placed successfully!')
      clearCart()
      setName('')
    } catch (err: any) {
      console.error('Checkout failed:', err)
      alert('Checkout failed: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="p-4 text-white">
      <h1 className="text-2xl mb-4">Your Cart</h1>

      {items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="bg-zinc-800 p-4 rounded">
              <h3>{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Total: {(item.price * item.quantity).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
              <button onClick={() => removeFromCart(item.id)} className="text-red-400">Remove</button>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-4 w-full px-4 py-2 rounded text-white bg-[#d4af37]"
          />

          <button
            onClick={handleCheckout}
            disabled={loading || !name}
            className="bg-green-500 mt-4 px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? 'Placing Order...' : 'Checkout'}
          </button>
        </>
      )}
    </main>
  )
}
