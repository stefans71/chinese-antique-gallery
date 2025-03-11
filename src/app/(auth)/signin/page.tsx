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

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
})

type SignInSchema = z.infer<typeof signInSchema>

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = async (data: SignInSchema) => {
    try {
      setIsLoading(true)
      setError('')

      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) throw error

      router.push('/')
      router.refresh()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
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
    <div className="w-full max-w-md mx-auto px-4 animate-fade-in">
      <div className="bg-white rounded-[16px] shadow-elegant p-8 space-y-8 border border-stone-100/50">
        <div className="text-center space-y-2">
          <h1 className="font-cormorant text-4xl font-medium text-primary relative inline-block">
            Welcome Back
            <span className="absolute left-1/2 -bottom-2 w-24 h-0.5 bg-accent transform -translate-x-1/2 opacity-80 transition-all duration-300"></span>
          </h1>
          <p className="text-stone-700 mt-6 font-light tracking-wide text-balance leading-relaxed">
            Sign in to your account to continue your art journey
          </p>
        </div>

        {error && (
          <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-600 p-4 rounded-lg text-sm animate-fade-in shadow-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              {...register('email')}
              error={errors.email?.message}
              placeholder="Enter your email"
              disabled={isLoading}
              autoComplete="email"
              className="px-4 py-3 rounded-lg"
            />

            <Input
              label="Password"
              type="password"
              {...register('password')}
              error={errors.password?.message}
              placeholder="Enter your password"
              disabled={isLoading}
              autoComplete="current-password"
              className="px-4 py-3 rounded-lg"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                {...register('rememberMe')}
                className="rounded border-stone-300 text-accent shadow-sm transition-all duration-300 focus:border-accent focus:ring-1 focus:ring-accent/20 focus:ring-opacity-50 hover:border-accent/50"
                disabled={isLoading}
              />
              <label htmlFor="remember-me" className="ml-2 text-stone-600 select-none">
                Remember me
              </label>
            </div>

            <Link
              href="/forgot-password"
              className="font-medium text-accent hover:text-modern-gold transition-all duration-300 hover:-translate-y-0.5 inline-block"
            >
              Forgot password?
            </Link>
          </div>

          <div className="space-y-6">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-primary text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-wood-frame hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? <LoadingButton /> : 'Sign In'}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-200/50" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-6 text-stone-500 font-light">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => handleOAuthSignIn('google')}
                disabled={isLoading}
                className="border border-stone-200 hover:border-accent transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => handleOAuthSignIn('github')}
                disabled={isLoading}
                className="border border-stone-200 hover:border-accent transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </Button>
            </div>
          </div>
        </form>

        <p className="text-center text-sm text-stone-600 font-light">
          Don't have an account?{' '}
          <Link
            href="/signup"
            className="font-medium text-accent hover:text-modern-gold transition-all duration-300 hover:-translate-y-0.5 inline-block"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
