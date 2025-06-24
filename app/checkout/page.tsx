"use client";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [name, setName] = useState("");
  return (
    <main className="p-6">
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-4 px-4 py-2 rounded text-black"
      />
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <p>Enter your delivery details and complete your order.</p>
    </main>
  );
}
