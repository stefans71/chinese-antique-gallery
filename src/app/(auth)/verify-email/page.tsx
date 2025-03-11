'use client'

import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import { useState } from 'react'

export default function VerifyEmail() {
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const resendVerificationEmail = async () => {
    try {
      setIsResending(true)
      setError('')
      setSuccess('')

      // Get the current session to get the user's email
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session?.user?.email) {
        throw new Error('No email found. Please try signing up again.')
      }

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: session.user.email,
      })

      if (error) throw error

      setSuccess('Verification email has been resent')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[--accent-color]/10 text-[--accent-color]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          </div>

          <h1 className="heading-2">Check Your Email</h1>
          <p className="text-body text-stone-600 max-w-sm mx-auto">
            We've sent you a verification email. Please click the link in the email to verify your account.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm">
            {success}
          </div>
        )}

        <div className="space-y-4">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            size="lg"
            onClick={resendVerificationEmail}
            disabled={isResending}
          >
            {isResending ? (
              <div className="flex items-center gap-2">
                <LoadingSpinner className="h-4 w-4" />
                <span>Resending...</span>
              </div>
            ) : (
              'Resend Verification Email'
            )}
          </Button>

          <p className="text-sm text-stone-600">
            Back to{' '}
            <Link
              href="/signin"
              className="font-medium text-[--accent-color] hover:text-[--modern-gold]"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
