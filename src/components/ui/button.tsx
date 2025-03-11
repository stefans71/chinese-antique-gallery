'use client'

import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: [
          'bg-primary text-white',
          'hover:bg-wood-frame',
          'focus-visible:ring-primary',
          'shadow-sm hover:shadow-md hover:-translate-y-0.5'
        ].join(' '),
        primary: [
          'bg-gradient-to-r from-accent to-modern-gold text-primary',
          'hover:from-modern-gold hover:to-accent',
          'focus-visible:ring-accent',
          'shadow-[0_4px_20px_rgba(191,163,124,0.3)]',
          'hover:shadow-[0_4px_25px_rgba(191,163,124,0.5)]',
          'hover:-translate-y-0.5'
        ].join(' '),
        outline: [
          'border border-stone-200 bg-white/80',
          'hover:border-accent hover:bg-stone-50',
          'focus-visible:ring-accent',
          'shadow-sm hover:shadow-md hover:-translate-y-0.5'
        ].join(' '),
        ghost: [
          'text-stone-600',
          'hover:bg-stone-100 hover:text-primary',
          'shadow-none'
        ].join(' '),
        link: [
          'text-accent underline-offset-4',
          'hover:text-modern-gold hover:underline',
          'shadow-none'
        ].join(' '),
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-12 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
