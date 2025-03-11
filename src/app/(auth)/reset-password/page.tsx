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
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="heading-2 mb-3">Reset Password</h1>
          <p className="text-body text-stone-600">
            Enter your new password below
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="New Password"
            type="password"
            {...register('password')}
            error={errors.password?.message}
            helperText="Must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number"
            placeholder="Enter your new password"
            disabled={isLoading}
          />

          <Input
            label="Confirm New Password"
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
            placeholder="Confirm your new password"
            disabled={isLoading}
          />

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? <LoadingButton /> : 'Reset Password'}
          </Button>
        </form>
      </div>
    </div>
  )
}

// Prevent page from being statically generated
export const dynamic = 'force-dynamic'
