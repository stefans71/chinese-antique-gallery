'use client'

export function LoadingSpinner({ className = '' }: { className?: string }) {
  return (
    <div
      className={`inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${className}`}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  )
}

export function LoadingPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <LoadingSpinner className="h-12 w-12 border-4 text-[--accent-color]" />
      <p className="mt-4 text-stone-600">Loading...</p>
    </div>
  )
}

export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 flex flex-col items-center">
        <LoadingSpinner className="h-8 w-8 border-3 text-[--accent-color]" />
        <p className="mt-4 text-stone-600">Please wait...</p>
      </div>
    </div>
  )
}

export function LoadingButton({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <LoadingSpinner className="h-4 w-4 border-2" />
      <span>Loading...</span>
    </div>
  )
}
