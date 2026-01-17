"use client"


interface DigitalWalletButtonsProps {
  amount: number
  currency?: string
  description?: string
  onSuccess?: (paymentIntent: any) => void
  onError?: (error: string) => void
  className?: string
}

export function DigitalWalletButtons({
  amount,
  currency = 'usd',
  description = 'Payment',
  onSuccess,
  onError,
  className
}: DigitalWalletButtonsProps) {
  // Temporarily disabled due to TypeScript compilation issues
  // This component needs proper Apple Pay and Google Pay integration
  return null;
}

// Standalone Apple Pay button
export function ApplePayButton({ 
  amount, 
  onSuccess, 
  onError,
  disabled = false 
}: {
  amount: number
  onSuccess?: (result: any) => void
  onError?: (error: string) => void
  disabled?: boolean
}) {
  // Temporarily disabled due to TypeScript compilation issues
  return null;
}

// Standalone Google Pay button
export function GooglePayButton({ 
  amount, 
  onSuccess, 
  onError,
  disabled = false 
}: {
  amount: number
  onSuccess?: (result: any) => void
  onError?: (error: string) => void
  disabled?: boolean
}) {
  // Temporarily disabled due to TypeScript compilation issues
  return null;
} 