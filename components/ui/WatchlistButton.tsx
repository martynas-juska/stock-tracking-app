'use client'

import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type WatchlistButtonProps = {
  symbol: string
  company: string
}

export default function WatchlistButton({ symbol, company }: WatchlistButtonProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (session?.user?.id) {
      checkWatchlistStatus()
    }
  }, [session, symbol])

  const checkWatchlistStatus = async () => {
    try {
      const response = await fetch("/api/watchlist")
      if (response.ok) {
        const data = await response.json()
        const exists = data.some((item: any) => item.symbol === symbol.toUpperCase())
        setIsInWatchlist(exists)
      }
    } catch (error) {
      console.error("Error checking watchlist:", error)
    }
  }

  const handleClick = async () => {
    if (!session) {
      router.push("/sign-in")
      return
    }

    setLoading(true)

    try {
      if (isInWatchlist) {
        // Remove from watchlist
        const response = await fetch("/api/watchlist", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ symbol: symbol.toUpperCase() })
        })

        if (response.ok) {
          setIsInWatchlist(false)
        }
      } else {
        // Add to watchlist
        const response = await fetch("/api/watchlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            symbol: symbol.toUpperCase(), 
            company 
          })
        })

        if (response.ok) {
          setIsInWatchlist(true)
        }
      }
    } catch (error) {
      console.error("Watchlist error:", error)
      alert("Failed to update watchlist")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 bg-gray-800 rounded-lg border border-gray-600">
      <button
        onClick={handleClick}
        disabled={loading}
        className={`w-full px-6 py-3 rounded-lg font-semibold transition-all ${
          isInWatchlist
            ? "bg-red-500/10 hover:bg-red-500/20 text-red-400 border-2 border-red-500/50 hover:border-red-500"
            : "bg-gradient-to-b from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-gray-900"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            {isInWatchlist ? "Removing..." : "Adding..."}
          </span>
        ) : (
          isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"
        )}
      </button>
    </div>
  )
}