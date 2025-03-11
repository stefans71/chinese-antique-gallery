'use client'

import { Button } from '@/components/ui/button'

interface DynastyCardProps {
  era: string
}

export function DynastyCard({ era }: DynastyCardProps) {
  return (
    <div className="group card p-6 text-center hover:bg-[--primary-color] hover:text-white transition-all duration-300">
      <h3 className="heading-3 mb-4">{era}</h3>
      <p className="text-body group-hover:text-stone-200 mb-6">
        Discover authentic paintings from the {era} period
      </p>
      <Button
        variant="ghost"
        className="group-hover:text-white group-hover:border-white"
      >
        Explore {era}
      </Button>
    </div>
  )
}
