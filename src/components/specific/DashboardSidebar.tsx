"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/libs/utils"
import { navItems } from "@/libs/data"



export function DashboardSidebar(){
    const pathname = usePathname()
    return (
        <nav className="grid items-start gap-2">
            { navItems.map((item, index)=>(
                <Link key={index} href = {item.href} >
                    <span className={cn("group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground", 
                    pathname === item.href ? "bg-accent": "bg-transparent")}>
                        <item.icon className="mr-2 h-4 w-4 text-primary"></item.icon>
                        <span>{item.name}</span>
                    </span>
                </Link>
            ))}
        </nav>
    )
}