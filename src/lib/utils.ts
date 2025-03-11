import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export function generateItemNumber() {
  const prefix = 'CAP' // Chinese Antique Painting
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

export function formatDimensions(width: number, height: number, unit: 'cm' | 'in' = 'cm') {
  if (unit === 'cm') {
    return `${width} × ${height} cm`
  }
  // Convert to inches with 1 decimal place
  const widthIn = (width / 2.54).toFixed(1)
  const heightIn = (height / 2.54).toFixed(1)
  return `${widthIn} × ${heightIn} in`
}
