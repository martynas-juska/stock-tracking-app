'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type WatchlistItem = {
  _id: string
  symbol: string
  company: string
  addedAt: string
}

export default function WatchlistPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const hasAnimated = useRef(false)
  const hasFetched = useRef(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in")
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user?.id && !hasFetched.current) {
      hasFetched.current = true
      fetchWatchlist()
    }
  }, [session?.user?.id])

  useEffect(() => {
    if (watchlist.length > 0 && !hasAnimated.current) {
      hasAnimated.current = true
      
      requestAnimationFrame(() => {
        itemRefs.current.forEach((item, index) => {
          if (item) {
            const rect = item.getBoundingClientRect()
            const isBelow = rect.top > window.innerHeight
            
            if (isBelow) {
              // Items below viewport - animate on scroll
              gsap.fromTo(
                item,
                {
                  opacity: 0,
                  y: 60,
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: 'power3.out',
                  scrollTrigger: {
                    trigger: item,
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                    once: true,
                  },
                }
              )
            } else {
              // Items visible on load - staggered animation
              gsap.fromTo(
                item,
                {
                  opacity: 0,
                  y: 60,
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: 'power3.out',
                }
              )
            }
          }
        })
      })
    }
  }, [watchlist])

  const fetchWatchlist = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/watchlist")
      
      if (!response.ok) {
        throw new Error("Failed to fetch watchlist")
      }

      const data = await response.json()
      setWatchlist(data)
    } catch (err) {
      console.error(err)
      setError("Failed to load watchlist")
    } finally {
      setLoading(false)
    }
  }

  const removeFromWatchlist = async (symbol: string) => {
    try {
      const response = await fetch("/api/watchlist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol })
      })

      if (!response.ok) {
        throw new Error("Failed to remove stock")
      }

      setWatchlist(prev => prev.filter(item => item.symbol !== symbol))
    } catch (err) {
      console.error(err)
      alert("Failed to remove stock from watchlist")
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="container py-20">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="container py-10">
      <div className="mb-20">
        <h1 className="text-4xl font-bold text-gray-100 mb-4">My Watchlist</h1>
        <p className="text-gray-400 text-lg">Track your favorite stocks in one place</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {watchlist.length === 0 ? (
        <div className="bg-gray-800 rounded-lg border border-gray-600 mt-16 pt-24 pb-16 px-12 text-center">
            <div className="h-30 mt-10 mb-10">
                <br></br>
            </div>
            
          <h2 className="text-2xl font-bold text-gray-100 mb-4">
            Your watchlist is empty
          </h2>
          <p className="text-gray-400 mb-8">
            Start adding stocks to keep track of your investments
          </p>
          <Link href="/">
            <button className="yellow-btn px-6 py-3 mb-8">
              Explore Stocks
            </button>
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {watchlist.map((item, index) => (
            <div
              key={item._id}
              ref={el => itemRefs.current[index] = el}
              style={{ opacity: 0 }}
              className="bg-gray-800 rounded-lg border border-gray-600 p-8 flex items-center justify-between hover:border-yellow-500/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <Link href={`/stocks/${item.symbol}`}>
                    <h3 className="text-2xl font-bold text-yellow-500 hover:text-yellow-400 cursor-pointer transition-colors">
                      {item.symbol}
                    </h3>
                  </Link>
                  <span className="text-gray-400 text-lg">{item.company}</span>
                </div>
                <p className="text-sm text-gray-500">
                  Added {new Date(item.addedAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-4">
                <Link href={`/stocks/${item.symbol}`}>
                  <button className="px-6 py-3 bg-gray-700 hover:bg-yellow-500/10 hover:text-yellow-500 text-gray-100 rounded-lg transition-all font-medium">
                    View Details
                  </button>
                </Link>
                <button
                  onClick={() => removeFromWatchlist(item.symbol)}
                  className="px-6 py-3 bg-red-500/10 hover:bg-yellow-500/10 text-red-400 hover:text-yellow-500 border border-red-500/50 hover:border-yellow-500/50 rounded-lg transition-all font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}