'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0e0e0e] text-[#f8f5f0] px-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl sm:text-6xl font-serif font-bold mb-6 text-[#d4af37] tracking-wide">
          Busso Ristorante
        </h1>

        <p className="text-lg sm:text-xl text-[#dcdcdc] mb-10">
          Experience the taste of authentic Italian cuisine crafted with passion. Dine with elegance — where tradition meets refinement.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/menu"
            className="bg-[#d4af37] text-[#0e0e0e] font-semibold px-6 py-3 rounded-full hover:bg-[#e0c565] transition"
          >
            Explore Menu
          </Link>
          <Link
            href="/cart"
            className="border border-[#d4af37] text-[#d4af37] px-6 py-3 rounded-full hover:bg-[#1a1a1a] transition"
          >
            View Cart
          </Link>
        </div>
      </div>
    </main>
  )
}
