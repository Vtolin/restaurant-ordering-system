'use client'

import { useEffect, useState } from 'react'
import MenuItem from '@/components/MenuItem'

type Item = {
  id: number
  name: string
  price: number
  description: string
  image?: string
}

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch('/api/menu')
  .then(res => {
    if (!res.ok) {
      throw new Error('Failed to fetch')
    }
    return res.json()
  })
  .then(response => {
    console.log('API returned:', response)
    if(response.success) {
    setMenuItems(response.data)
    } else {
        throw new Error(response.error)
    }
    setLoading(false)
  })
  .catch(error => {
    setError(error.message)
    setLoading(false)
  })
  }, [])

    if (loading) {
        return <div className="text-center text-white">Loading menu...</div>
    }
    if (error) {
        return <div className="text-center text-red-500">Error loading menu: {error}</div>
    }
    if (menuItems.length === 0) {
        return <div className="text-center text-white">No menu items available.</div>
    }

  return (
    <main className="min-h-screen bg-[#0e0e0e] text-white px-4 py-8">
      <h1 className="text-4xl font-serif text-center text-[#d4af37] mb-8">Menu</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {menuItems.map(item => (
          <MenuItem key={item.id} {...item} />
        ))}
      </div>
    </main>
  )
}