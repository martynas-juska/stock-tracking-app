import Link from "next/link"
import React from 'react'
import { NavItems } from "@/components/ui/NavItems"
import UserDropdown from "@/components/ui/UserDropdown"


const Header = () => {
  return (
    <header className="sticky top-0 header">
      <div className="container header-wrapper">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <p className="text-2xl font-bold text-gray-100">
            Fi<span className="text-yellow-500">Vector</span>
          </p>
        </Link>
        
        <nav className="hidden sm:block">
          <NavItems />
        </nav>

        <UserDropdown />
      </div>
    </header>
  )
}

export default Header