'use client'

import { useEffect, useState } from 'react'

interface MenuItem {
  id: number
  name: string
  price: number
  description: string
}

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => setMenuItems(data))
  }, [])

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Menu</h1>
      <ul className="grid gap-4">
        {menuItems.map(item => (
          <li key={item.id} className="border rounded p-4">
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-600">{item.description}</p>
            <p className="font-bold mt-2">Rp {item.price.toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
