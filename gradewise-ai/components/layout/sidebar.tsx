import Link from 'next/link'
import { LayoutDashboard } from 'lucide-react'

const NAV_ITEMS = [{ href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }]

export function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 border-r border-border/40 bg-background/60 backdrop-blur-lg md:block">
      <nav className="flex flex-col gap-1 p-4">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
