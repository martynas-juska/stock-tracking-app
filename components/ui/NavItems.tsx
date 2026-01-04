'use client'
import { NAV_ITEMS } from "@/lib/constants"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from 'react'
import SearchCommand from "./SearchCommand"

type IsActiveFn = (path: string) => boolean

export const NavItems = () => {
    const pathname: string = usePathname()

    const isActive: IsActiveFn = (path) => {
        if (path === '/') return pathname === '/'      
        return pathname.startsWith(path) 
    }   

    return (
        <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
            {NAV_ITEMS.map((item) => {
                if(item.title === 'Search') return (
                    <li key="search-trigger">
                        <SearchCommand 
                            renderAs="text"
                            label="Search"
                        />
                    </li>
                )

                return (
                    <li key={item.href}>
                        <Link 
                            href={item.href}
                            className={`hover:text-yellow-500 transition-colors ${
                                isActive(item.href) ? 'text-gray-100' : ''
                            }`}
                        >
                            {item.title}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}