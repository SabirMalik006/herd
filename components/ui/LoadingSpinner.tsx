"use client"

import { cn } from "@/shared/lib/utils"

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'payment' | 'success' | 'error'
  className?: string
  text?: string
}

export function LoadingSpinner({ 
  size = 'md', 
  variant = 'default', 
  className,
  text 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  const variantClasses = {
    default: 'border-blue-600',
    payment: 'border-green-600',
    success: 'border-green-500',
    error: 'border-red-500'
  }

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-2 border-gray-300",
          sizeClasses[size],
          variantClasses[variant]
        )}
        style={{
          borderTopColor: 'transparent'
        }}
      />
      {text && (
        <span className="text-sm text-gray-600 animate-pulse">
          {text}
        </span>
      )}
    </div>
  )
}

export function PaymentProcessingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative">
        <div className="w-8 h-8 border-4 border-green-200 rounded-full animate-spin">
          <div className="absolute top-0 left-0 w-8 h-8 border-4 border-green-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-900">Processing Payment</span>
        <span className="text-xs text-gray-500">Please wait, do not refresh...</span>
      </div>
    </div>
  )
}

export function StripeLoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <div className="relative">
        {/* Outer ring */}
        <div className="w-12 h-12 border-4 border-blue-100 rounded-full animate-spin">
          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        
        {/* Inner ring */}
        <div className="absolute top-2 left-2 w-8 h-8 border-2 border-purple-100 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}>
          <div className="absolute top-0 left-0 w-8 h-8 border-2 border-purple-500 rounded-full border-t-transparent animate-spin" style={{ animationDirection: 'reverse' }}></div>
        </div>
        
        {/* Center dot */}
        <div className="absolute top-4 left-4 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  )
} 