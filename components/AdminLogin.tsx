import { useState, useEffect } from "react"

export default function adminLogin({ onLogin }: { onLogin: () => void }) {
    const [password, setPassword] = useState('')
    function handle(e: React.FormEvent) {
        e.preventDefault
        if(password === 'hooman') {
            onLogin()
        } else {
            alert('Wrong pw')
        }
    }
    return (
    <form onSubmit={handle} className="space-y-4">
      <input
        type="password"
        placeholder="Enter admin password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="px-4 py-2 rounded text-white bg-[#d4af37] mr-[20px]"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Login
      </button>
    </form>
  )
}