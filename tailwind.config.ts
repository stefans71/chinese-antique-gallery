import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/(auth)/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        accent: 'var(--accent-color)',
        'modern-gold': 'var(--modern-gold)',
        'wood-frame': 'var(--wood-frame)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        cormorant: ['var(--font-cormorant)', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'elegant': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'elegant-hover': '0 12px 40px rgba(0, 0, 0, 0.15)',
        'form': '0 2px 4px rgba(0, 0, 0, 0.05)',
        'form-hover': '0 4px 6px rgba(0, 0, 0, 0.07)',
        'form-focus': '0 0 0 2px rgba(212, 184, 140, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'var(--text-color)',
            h1: {
              fontFamily: 'var(--font-cormorant)',
            },
            h2: {
              fontFamily: 'var(--font-cormorant)',
            },
            h3: {
              fontFamily: 'var(--font-cormorant)',
            },
            h4: {
              fontFamily: 'var(--font-cormorant)',
            },
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
  safelist: [
    'form-input',
    'form-checkbox',
    'form-textarea',
    'form-select',
    'form-multiselect',
    {
      pattern: /^(bg|text|border|ring|shadow)-(primary|secondary|accent|modern-gold|wood-frame)/,
      variants: ['hover', 'focus', 'active'],
    },
    {
      pattern: /^(backdrop-blur)/,
      variants: ['hover', 'focus'],
    },
  ],
}

export default config
