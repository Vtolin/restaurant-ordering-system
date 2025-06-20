'use client'
import { useCart } from "../context/CartContext"

export default function CartPage() {
  const { items, removeFromCart, clearCart } = useCart()

  async function handleCheckout() {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      const result = await res.json()
      console.log('Order created:', result)
      clearCart()
      alert('Order placed successfully!')
    } catch (err) {
      console.error('Checkout failed', err)
      alert('Checkout failed. Try again.')
    }
  }

  return (
    <main className="p-4 text-white">
      <h1 className="text-2xl mb-4">Your Cart</h1>

      {items.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="bg-zinc-800 p-4 rounded">
              <h3>{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Total: {(item.price * item.quantity).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</p>
              <button onClick={() => removeFromCart(item.id)} className="text-red-400 cursor-pointer">
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <>
          <button onClick={clearCart} className="mt-4 bg-red-500 px-4 py-2 rounded cursor-pointer">
            Clear Cart
          </button>
          <button onClick={handleCheckout} className="bg-green-500 mt-4 px-4 py-2 rounded ml-4">
            Checkout
          </button>
        </>
      )}
    </main>
  )
}
