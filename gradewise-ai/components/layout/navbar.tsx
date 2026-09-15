'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { cn } from 'cn'

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-foreground">
          GradeWise AI
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
          <Link href="/login" className={cn(buttonVariants(), 'rounded-full px-5')}>
            Sign in
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={buttonVariants({ variant: 'ghost', size: 'icon' })}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right">
              <div className="mt-8 flex flex-col gap-4">
                <Link
                  href="/login"
                  className={cn(buttonVariants(), 'rounded-full')}
                  onClick={() => setOpen(false)}
                >
                  Sign in
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
