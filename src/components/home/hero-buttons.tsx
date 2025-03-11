'use client'

import { Button } from '@/components/ui/button'

export function HeroButtons() {
  return (
    <div className="flex justify-center gap-4 animate-fade-in [animation-delay:400ms]">
      <Button variant="primary" size="lg">
        View Collection
      </Button>
      <Button variant="outline" size="lg">
        Learn More
      </Button>
    </div>
  )
}
