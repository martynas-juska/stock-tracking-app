'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function UserDropdown() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push("/")
    router.refresh()
  }

  if (status === "loading") {
    return <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse" />
  }

  if (!session) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/sign-in">
          <button className="px-5 py-2 text-gray-400 border-2 border-transparent hover:border-yellow-500 hover:text-yellow-500 hover:bg-yellow-500/10 rounded-lg font-medium text-base transition-all">
            Sign In
          </button>
        </Link>
        <Link href="/sign-up">
          <button className="px-6 py-2 bg-gradient-to-b from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-gray-900 font-semibold text-sm rounded-lg transition-all">
            Sign Up
          </button>
        </Link>
      </div>
    )
  }

  const userInitials = session.user?.name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase() || 'U'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer hover:opacity-80 transition-opacity">
          <AvatarImage src="" alt={session.user?.name || ''} />
          <AvatarFallback className="bg-yellow-500 text-gray-900 font-bold">
            {userInitials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-800 border-gray-600 text-gray-100">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="font-semibold">{session.user?.name}</span>
            <span className="text-sm text-gray-400 font-normal">
              {session.user?.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-600" />
        <DropdownMenuItem 
          onClick={() => router.push('/watchlist')}
          className="cursor-pointer text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-500 focus:bg-yellow-500/10 focus:text-yellow-500 transition-colors"
        >
          My Watchlist
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="cursor-pointer text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-500 focus:bg-yellow-500/10 focus:text-yellow-500 transition-colors"
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}