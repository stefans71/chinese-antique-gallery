'use client'

import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section className="bg-[--primary-color] text-white py-20">
      <div className="container-custom text-center">
        <h2 className="heading-2 mb-6">Start Your Collection Today</h2>
        <p className="text-body text-stone-200 max-w-2xl mx-auto mb-10">
          Whether you're a seasoned collector or just beginning your journey into Chinese art,
          we're here to help you find the perfect piece.
        </p>
        <Button variant="primary" size="lg">
          View All Paintings
        </Button>
      </div>
    </section>
  )
}
