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
            'auth-input',
            'w-full px-4 py-3',
            'transform transition-all duration-300',
            'hover:-translate-y-0.5',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          ref={ref}
          {...props}
        />
        {error ? (
          <p className="text-sm text-red-600 animate-fade-in pl-1">{error}</p>
        ) : helperText ? (
          <p className="text-sm text-stone-500 pl-1">{helperText}</p>
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
            className="block text-sm font-medium text-stone-700 pl-1 mb-1"
          >
            {label}
          </label>
        )}
        <textarea
          className={cn(
            'auth-input',
            'w-full px-4 py-3',
            'transform transition-all duration-300',
            'hover:-translate-y-0.5',
            'min-h-[80px] resize-y',
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
