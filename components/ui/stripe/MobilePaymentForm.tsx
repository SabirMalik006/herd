"use client"

import { useState, useEffect } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { Smartphone, CreditCard, Shield, Lock, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PaymentProcessingSpinner } from '@/components/ui/LoadingSpinner'
import { PaymentErrorDisplay } from '@/components/ui/ErrorBoundary'
import { useToast } from '@/hooks/use-toast'

interface MobilePaymentFormProps {
  clientSecret: string
  onSuccess?: (paymentIntent: any) => void
  onError?: (error: string) => void
  amount?: number
  currency?: string
  description?: string
  showBillingAddress?: boolean
  className?: string
}

export function MobilePaymentForm({
  clientSecret,
  onSuccess,
  onError,
  amount,
  currency = 'usd',
  description,
  showBillingAddress = true,
  className
}: MobilePaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const { toast } = useToast()

  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Payment element options optimized for mobile
  const paymentElementOptions = {
    layout: isMobile ? 'accordion' as const : 'tabs' as const,
    defaultValues: {
      billingDetails: {
        name: '',
        email: '',
      }
    },
    fields: {
      billingDetails: showBillingAddress ? 'auto' as const : 'never' as const,
    },
    terms: {
      card: 'auto' as const,
    },
    wallets: {
      applePay: 'auto' as const,
      googlePay: 'auto' as const,
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      setError('Stripe has not loaded yet. Please try again.')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const { error: submitError } = await elements.submit()
      if (submitError) {
        throw new Error(submitError.message)
      }

      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
        redirect: 'if_required'
      })

      if (confirmError) {
        throw new Error(confirmError.message)
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        toast({
          title: 'Payment Successful!',
          description: 'Your payment has been processed successfully.',
        })
        onSuccess?.(paymentIntent)
      }
    } catch (err: any) {
      const errorMessage = err.message || 'An unexpected error occurred'
      setError(errorMessage)
      onError?.(errorMessage)
      
      toast({
        title: 'Payment Failed',
        description: errorMessage,
        variant: 'destructive',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleRetry = () => {
    setError(null)
    setIsProcessing(false)
  }

  if (!stripe || !elements) {
    return (
      <Card className={className}>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-8">
            <PaymentProcessingSpinner />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isMobile ? (
              <Smartphone className="h-5 w-5 text-blue-600" />
            ) : (
              <CreditCard className="h-5 w-5 text-blue-600" />
            )}
            <CardTitle className="text-lg">
              {isMobile ? 'Mobile Payment' : 'Payment Details'}
            </CardTitle>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            Secure
          </Badge>
        </div>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
        {amount && (
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm text-gray-600">Amount:</span>
            <span className="text-lg font-semibold">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency.toUpperCase(),
              }).format(amount / 100)}
            </span>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {error && (
          <PaymentErrorDisplay 
            error={error} 
            onRetry={handleRetry}
          />
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Payment Element */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Payment Method
            </label>
            <div className={`border rounded-lg p-1 ${isMobile ? 'min-h-[200px]' : 'min-h-[120px]'}`}>
              <PaymentElement 
                options={paymentElementOptions}
                onReady={() => setIsReady(true)}
              />
            </div>
          </div>

          {/* Mobile-specific features */}
          {isMobile && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Smartphone className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">
                    Mobile Payment Options
                  </h4>
                  <p className="text-sm text-blue-700">
                    Use Apple Pay, Google Pay, or tap to enter card details. 
                    All payments are secured with 256-bit encryption.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Security indicators */}
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Lock className="h-3 w-3" />
              <span>SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              <span>PCI Compliant</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              <span>Stripe Secured</span>
            </div>
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            disabled={!stripe || !isReady || isProcessing}
            className={`w-full h-12 text-lg font-medium ${
              isMobile ? 'h-14 text-xl' : ''
            }`}
          >
            {isProcessing ? (
              <PaymentProcessingSpinner />
            ) : (
              <>
                {isMobile ? '📱 ' : '💳 '}
                {amount 
                  ? `Pay ${new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: currency.toUpperCase(),
                    }).format(amount / 100)}`
                  : 'Complete Payment'
                }
              </>
            )}
          </Button>

          {/* Mobile-specific help text */}
          {isMobile && (
            <p className="text-xs text-gray-500 text-center">
              Having trouble? Rotate your device or try using a different payment method.
            </p>
          )}
        </form>

        {/* Trust indicators */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-center gap-6 text-xs text-gray-400">
            <span>Powered by Stripe</span>
            <span>•</span>
            <span>Bank-level security</span>
            <span>•</span>
            <span>No card details stored</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Mobile-optimized payment method selector
export function MobilePaymentMethodSelector({ 
  onMethodSelect 
}: { 
  onMethodSelect: (method: string) => void 
}) {
  const [selectedMethod, setSelectedMethod] = useState<string>('')

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: '💳', description: 'Visa, Mastercard, Amex' },
    { id: 'apple_pay', name: 'Apple Pay', icon: '🍎', description: 'Touch ID or Face ID' },
    { id: 'google_pay', name: 'Google Pay', icon: '🟢', description: 'Quick & secure' },
  ]

  const handleSelect = (methodId: string) => {
    setSelectedMethod(methodId)
    onMethodSelect(methodId)
  }

  return (
    <div className="space-y-3">
      <h3 className="font-medium text-gray-900 mb-4">Choose Payment Method</h3>
      {paymentMethods.map((method) => (
        <button
          key={method.id}
          onClick={() => handleSelect(method.id)}
          className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
            selectedMethod === method.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{method.icon}</span>
            <div className="flex-1">
              <div className="font-medium text-gray-900">{method.name}</div>
              <div className="text-sm text-gray-500">{method.description}</div>
            </div>
            {selectedMethod === method.id && (
              <CheckCircle className="h-5 w-5 text-blue-600" />
            )}
          </div>
        </button>
      ))}
    </div>
  )
} 