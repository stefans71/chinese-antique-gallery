'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[--primary-color] text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-cormorant text-2xl">Chinese Antique Gallery</h3>
            <p className="text-stone-300 text-sm">
              Curating authentic Chinese paintings and preserving cultural heritage through art.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/collection" className="text-stone-300 hover:text-white transition-colors">
                  Collection
                </Link>
              </li>
              <li>
                <Link href="/dynasties" className="text-stone-300 hover:text-white transition-colors">
                  Dynasties
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-stone-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-stone-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-medium mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shipping" className="text-stone-300 hover:text-white transition-colors">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-stone-300 hover:text-white transition-colors">
                  Returns Policy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-stone-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-stone-300 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium mb-4">Contact Us</h4>
            <ul className="space-y-2 text-stone-300">
              <li>Email: info@chineseantiquegallery.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Location: San Francisco, CA</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-700 mt-12 pt-8 text-center text-stone-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Chinese Antique Gallery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
