'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoadingButton } from '@/components/ui/loading-spinner'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

const signUpSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    confirmPassword: z.string(),
    terms: z.literal(true, {
      errorMap: () => ({ message: 'You must accept the terms and conditions' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type SignUpSchema = z.infer<typeof signUpSchema>

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = async (data: SignUpSchema) => {
    try {
      setIsLoading(true)
      setError('')

      // Log the signup attempt
      console.log('Attempting signup with:', {
        email: data.email,
        fullName: `${data.firstName} ${data.lastName}`,
      })

      const { data: signUpData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            full_name: `${data.firstName} ${data.lastName}`,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        console.error('Signup error:', {
          message: error.message,
          status: error.status,
          details: error
        })
        throw error
      }

      console.log('Signup response:', signUpData)

      // Check if the user was created but needs to confirm their email
      if (signUpData?.user?.identities?.length === 0) {
        router.push('/verify-email')
      } else if (signUpData?.user) {
        // User was created and auto-confirmed
        router.push('/auth/callback')
      } else {
        throw new Error('Failed to create user account')
      }
    } catch (error) {
      console.error('Error details:', {
        error,
        type: typeof error,
        isError: error instanceof Error,
        keys: error && typeof error === 'object' ? Object.keys(error) : null
      })

      if (error instanceof Error) {
        setError(error.message)
      } else if (typeof error === 'object' && error !== null) {
        const errorObj = error as any
        setError(errorObj.message || errorObj.error_description || JSON.stringify(error))
      } else {
        setError('An unexpected error occurred during signup')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuthSignUp = async (provider: 'google' | 'github') => {
    try {
      setIsLoading(true)
      setError('')

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="heading-2 mb-3">Create an Account</h1>
          <p className="text-body text-stone-600">
            Join our community of art collectors
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                {...register('firstName')}
                error={errors.firstName?.message}
                placeholder="First name"
                disabled={isLoading}
                autoComplete="given-name"
              />
              <Input
                label="Last Name"
                {...register('lastName')}
                error={errors.lastName?.message}
                placeholder="Last name"
                disabled={isLoading}
                autoComplete="family-name"
              />
            </div>

            <Input
              label="Email"
              type="email"
              {...register('email')}
              error={errors.email?.message}
              placeholder="Enter your email"
              disabled={isLoading}
              autoComplete="email"
            />

            <Input
              label="Password"
              type="password"
              {...register('password')}
              error={errors.password?.message}
              helperText="Must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number"
              placeholder="Create a password"
              disabled={isLoading}
              autoComplete="new-password"
            />

            <Input
              label="Confirm Password"
              type="password"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
              placeholder="Confirm your password"
              disabled={isLoading}
              autoComplete="new-password"
            />
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                {...register('terms')}
                className="h-4 w-4 rounded border-stone-300 text-[--accent-color] focus:ring-[--accent-color]"
                disabled={isLoading}
              />
            </div>
            <div className="ml-3">
              <label className="text-sm text-stone-600">
                I agree to the{' '}
                <Link
                  href="/terms"
                  className="font-medium text-[--accent-color] hover:text-[--modern-gold]"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  href="/privacy"
                  className="font-medium text-[--accent-color] hover:text-[--modern-gold]"
                >
                  Privacy Policy
                </Link>
              </label>
              {errors.terms && (
                <p className="mt-1 text-sm text-red-600">{errors.terms.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? <LoadingButton /> : 'Create Account'}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-stone-50 px-2 text-stone-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => handleOAuthSignUp('google')}
                disabled={isLoading}
              >
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => handleOAuthSignUp('github')}
                disabled={isLoading}
              >
                GitHub
              </Button>
            </div>
          </div>
        </form>

        <p className="text-center text-sm text-stone-600">
          Already have an account?{' '}
          <Link
            href="/signin"
            className="font-medium text-[--accent-color] hover:text-[--modern-gold]"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
