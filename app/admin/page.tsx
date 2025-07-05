"use client";
import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      loadOrders();
    }
  }, [session]);

  async function loadOrders() {
    try {
      const res = await fetch("/api/admin/orders");
      if (!res.ok) throw new Error("API error");
      const json = await res.json();
      setOrders(json.data);
    } catch (err) {
      console.error("Failed to load orders:", err);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: number, newStatus: string) {
    const res = await fetch(`/api/admin/orders/${id}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      setOrders((prev) => prev.filter((o) => o.orderId !== id));
    } else {
      const err = await res.json();
      alert("Failed: " + err.error);
    }
  }

  if (status === "loading") return <p>Checking session...</p>;
  if (!session) {
    return (
      <main className="p-6 text-white">
        <h1 className="text-2xl mb-4">Admin Dashboard</h1>
        <p>You must be logged in to view this page.</p>
        <button
          onClick={() => signIn("github")}
          className="bg-yellow-400 px-4 py-2 rounded text-black"
        >
          Sign in with GitHub
        </button>
      </main>
    );
  }

  return (
    <main className="p-6 text-white">
      <h1 className="text-2xl mb-4">Admin Dashboard</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        orders.map((order) => (
          <div key={order.orderId} className="bg-zinc-800 mb-6 p-4 rounded">
            <h2 className="text-xl font-bold">Order #{order.orderId}</h2>
            <p className="text-sm text-zinc-400">
              {new Date(order.createdAt).toLocaleString()}
            </p>
            <p className="text-sm text-yellow-300 font-semibold mb-2">
              👤 {order.customerName || "Anon" }
            </p>
            <ul className="mt-2 space-y-1">
              {order.items.map((item: any, index: number) => (
                <li key={index} className="text-sm">
                  {item.quantity}× {item.name} — Rp{" "}
                  {(item.quantity * item.price).toLocaleString("id-ID")}
                </li>
              ))}
            </ul>
            
            <button
              onClick={() => updateStatus(order.orderId, "served")}
              className="text-green-400 underline cursor-pointer mr-[20px]"
            >
              ✅ Mark as Served
            </button>

            <button
              onClick={() => updateStatus(order.orderId, "cancelled")}
              className="text-red-400 underline cursor-pointer"
            >
              ❌ Cancel Order
            </button>
          </div>
        ))
      )}
    </main>
  );
}
