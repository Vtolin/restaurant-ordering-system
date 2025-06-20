'use client'
import { createContext, useContext, useState, ReactNode } from "react"

type CartItem = {
    id: number
    name: string
    price: number
    quantity: number
    image?: string
}

type CartContextType = {
    items: CartItem[]
    addToCart: (item: CartItem) => void
    removeFromCart: (id: number) => void
    clearCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function useCart() {
    const ctx = useContext(CartContext) 
    if(!ctx) throw new Error('CartContext not available')
    return ctx
}

export function CartProvider({children}: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])

    function addToCart(newItem: CartItem) {
        setItems(prev => {
            const existing = prev.find(item => item.id === newItem.id)
            if(existing) {
                return prev.map(item => item.id === newItem.id ? 
                    {...item, quantity: item.quantity + newItem.quantity} 
                    : item
                )
            }
            return [...prev, newItem]
        })
    }


function removeFromCart(id: number) {
    setItems(prev => prev.filter(item => item.id !== id))
}

function clearCart() {
    setItems([])
}

return (
    <CartContext.Provider value ={{items, addToCart, removeFromCart, clearCart}}>   
        {children} 
    </CartContext.Provider>
)
}