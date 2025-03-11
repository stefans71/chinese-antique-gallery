'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, type = 'text', ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-stone-700"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'w-full px-4 py-3 rounded-lg',
            'border border-stone-200 bg-white/80',
            'shadow-sm hover:shadow-form-hover focus:shadow-form-focus',
            'focus:border-accent focus:ring-2 focus:ring-accent/20 focus:ring-opacity-50 focus:bg-white',
            'outline-none transition-all duration-300',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          ref={ref}
          {...props}
        />
        {error ? (
          <p className="text-sm text-red-600 animate-fade-in">{error}</p>
        ) : helperText ? (
          <p className="text-sm text-stone-500">{helperText}</p>
        ) : null}
      </div>
    )
  }
)
Input.displayName = 'Input'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-stone-700"
          >
            {label}
          </label>
        )}
        <textarea
          className={cn(
            'w-full px-4 py-3 rounded-lg',
            'border border-stone-200 bg-white/80',
            'shadow-sm hover:shadow-form-hover focus:shadow-form-focus',
            'focus:border-accent focus:ring-2 focus:ring-accent/20 focus:ring-opacity-50 focus:bg-white',
            'outline-none transition-all duration-300 min-h-[80px]',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          ref={ref}
          {...props}
        />
        {error ? (
          <p className="text-sm text-red-600 animate-fade-in">{error}</p>
        ) : helperText ? (
          <p className="text-sm text-stone-500">{helperText}</p>
        ) : null}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Input, Textarea }
