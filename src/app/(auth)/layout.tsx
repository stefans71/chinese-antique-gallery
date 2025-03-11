import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Content Side */}
      <div className="flex flex-col min-h-screen bg-secondary">
        <div className="px-8 py-6">
          <Link href="/" className="font-cormorant text-2xl font-medium text-primary hover:text-accent transition-colors">
            Chinese Antique Gallery
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center">
          {children}
        </div>
      </div>

      {/* Decorative Side */}
      <div className="hidden lg:block relative bg-gradient-to-br from-primary to-wood-frame overflow-hidden">
        {/* Pattern overlay similar to the reference design */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,theme(colors.accent)_25%,transparent_25%,transparent_50%,theme(colors.accent)_50%,theme(colors.accent)_75%,transparent_75%,transparent)] bg-[length:40px_40px] animate-[slideUp_1s_ease-out]" />
        
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-md text-center animate-[fadeIn_1s_ease-out]">
            <h2 className="font-cormorant text-4xl font-medium text-white mb-6 relative inline-block">
              Discover Authentic Chinese Art
              <span className="absolute left-1/2 -bottom-2 w-24 h-0.5 bg-accent transform -translate-x-1/2 opacity-80"></span>
            </h2>
            <p className="text-lg text-stone-200/90 font-light tracking-wide mt-8">
              Each piece in our collection tells a unique story of China's rich artistic heritage,
              carefully curated for discerning collectors.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
