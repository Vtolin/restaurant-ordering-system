'use client'
import Link from "next/link"
import { useCart } from "@/app/context/CartContext"

export default function Navbar() {
    const { items } = useCart()
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <nav className="bg-[#d4af37] text-white flex justify-between items-center px-6 py-4">
      <Link href="/" className="text-lg font-bold">ROSP</Link>

      <div className="space-x-6 flex items-center">
        <Link href="/menu" className="hover:underline">Menu</Link>
        <Link href="/cart" className="relative hover:underline">
          Cart
          {totalItems > 0 && (
            <span className="ml-1 bg-red-500 text-xs rounded-full px-2 py-0.5 absolute -top-2 -right-3">
              {totalItems}
            </span>
          )}
        </Link>
        <Link href="/admin" className="hover:underline">Admin</Link>
      </div>
    </nav>
    )
}