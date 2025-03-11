'use client'

import { LoadingPage } from '@/components/ui/loading-spinner'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const next = searchParams?.get('next') || '/'
    const error = searchParams?.get('error')
    const errorDescription = searchParams?.get('error_description')

    if (error) {
      router.push(`/signin?error=${encodeURIComponent(errorDescription || error)}`)
      return
    }

    // If there's no error, assume success and redirect
    router.push(next)
  }, [searchParams, router])

  return <LoadingPage />
}

// Prevent page from being statically generated
export const dynamic = 'force-dynamic'
