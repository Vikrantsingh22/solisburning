import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block">
          Solana Security Dashboard
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/exploits"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/exploits"
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Exploits
        </Link>
        <Link
          href="/audits"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/audits"
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Audits
        </Link>
        <Link
          href="/reports"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/reports"
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Reports
        </Link>
      </nav>
    </div>
  )
} 