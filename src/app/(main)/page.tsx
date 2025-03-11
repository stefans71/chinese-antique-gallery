import { HeroButtons } from '@/components/home/hero-buttons'
import { DynastyCard } from '@/components/home/dynasty-card'
import { CTASection } from '@/components/home/cta-section'

const DYNASTIES = ['Ming Dynasty', 'Qing Dynasty', 'Republic Era'] as const

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[--primary-color] to-[--accent-color] text-white py-20">
        <div className="container-custom relative z-10">
          <h1 className="heading-1 max-w-3xl mx-auto text-center mb-6 animate-fade-in">
            Discover Rare Chinese Antique Paintings
          </h1>
          <p className="text-body text-stone-200 max-w-2xl mx-auto text-center mb-10 animate-fade-in [animation-delay:200ms]">
            Explore our curated collection of authentic Chinese paintings from various dynasties,
            each piece telling a unique story of China's rich artistic heritage.
          </p>
          <HeroButtons />
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-stone-50">
        <div className="container-custom">
          <h2 className="heading-2 text-center mb-16">Browse by Dynasty</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DYNASTIES.map((era) => (
              <DynastyCard key={era} era={era} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  )
}
