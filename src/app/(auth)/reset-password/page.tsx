'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoadingButton } from '@/components/ui/loading-spinner'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = async (data: ResetPasswordSchema) => {
    try {
      setIsLoading(true)
      setError('')

      const { error } = await supabase.auth.updateUser({
        password: data.password,
      })

      if (error) throw error

      // Password updated successfully
      router.push('/signin?message=Password updated successfully')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 animate-fade-in">
      <div className="bg-white rounded-[16px] shadow-elegant p-8 space-y-8 border border-stone-100/50">
        <div className="text-center space-y-2">
          <h1 className="font-cormorant text-4xl font-medium text-primary relative inline-block">
            Reset Password
            <span className="absolute left-1/2 -bottom-2 w-24 h-0.5 bg-accent transform -translate-x-1/2 opacity-80 transition-all duration-300"></span>
          </h1>
          <p className="text-stone-700 mt-6 font-light tracking-wide text-balance leading-relaxed">
            Enter your new password below
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
              label="New Password"
              type="password"
              {...register('password')}
              error={errors.password?.message}
              helperText="Must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number"
              placeholder="Enter your new password"
              disabled={isLoading}
              className="px-4 py-3 rounded-lg"
            />

            <Input
              label="Confirm New Password"
              type="password"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
              placeholder="Confirm your new password"
              disabled={isLoading}
              className="px-4 py-3 rounded-lg"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-primary text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-wood-frame hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? <LoadingButton /> : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  )
}

// Prevent page from being statically generated
export const dynamic = 'force-dynamic'
