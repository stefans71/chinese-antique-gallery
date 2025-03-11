'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { Button } from './ui/button'
import { ShoppingCart, User } from 'lucide-react'

export function Header() {
  const { user, signOut } = useAuth()

  return (
    <header className="bg-white border-b border-stone-200">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-cormorant text-2xl font-medium text-[--primary-color]">
            Chinese Antique Gallery
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/collection" 
              className="text-stone-600 hover:text-[--primary-color] transition-colors"
            >
              Collection
            </Link>
            <Link 
              href="/dynasties" 
              className="text-stone-600 hover:text-[--primary-color] transition-colors"
            >
              Dynasties
            </Link>
            <Link 
              href="/about" 
              className="text-stone-600 hover:text-[--primary-color] transition-colors"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-stone-600 hover:text-[--primary-color] transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-[--accent-color] text-[--primary-color] w-5 h-5 rounded-full text-xs flex items-center justify-center font-medium">
                  0
                </span>
              </Button>
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <Link href="/account">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="primary">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
