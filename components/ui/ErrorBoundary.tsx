"use client"

import React, { Component, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Mail, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: null
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo
    })

    // Call the onError callback if provided
    this.props.onError?.(error, errorInfo)

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <Card className="max-w-lg mx-auto mt-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-red-500" />
              <div>
                <CardTitle className="text-red-700">Something went wrong</CardTitle>
                <CardDescription>
                  An unexpected error occurred. Please try again.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm font-medium text-red-800 mb-2">Error Details:</p>
                <p className="text-xs text-red-700 font-mono">
                  {this.state.error.message}
                </p>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={this.handleRetry} className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/dashboard'}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Go to Dashboard
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.open('mailto:support@farmdigits.com', '_blank')}
                className="flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      )
    }

    return this.props.children
  }
}

// Payment-specific error component
export function PaymentErrorDisplay({ 
  error, 
  onRetry, 
  onContactSupport 
}: { 
  error: string
  onRetry?: () => void
  onContactSupport?: () => void 
}) {
  const getErrorType = (errorMessage: string) => {
    if (errorMessage.includes('card_declined')) return 'declined'
    if (errorMessage.includes('insufficient_funds')) return 'funds'
    if (errorMessage.includes('authentication')) return 'auth'
    if (errorMessage.includes('network')) return 'network'
    return 'general'
  }

  const getErrorDetails = (type: string) => {
    switch (type) {
      case 'declined':
        return {
          title: 'Card Declined',
          description: 'Your card was declined. Please try a different payment method or contact your bank.',
          icon: '💳'
        }
      case 'funds':
        return {
          title: 'Insufficient Funds',
          description: 'Your card has insufficient funds. Please try a different payment method.',
          icon: '💰'
        }
      case 'auth':
        return {
          title: 'Authentication Required',
          description: 'Additional authentication is required. Please complete the verification process.',
          icon: '🔐'
        }
      case 'network':
        return {
          title: 'Connection Error',
          description: 'Network connection failed. Please check your internet connection and try again.',
          icon: '🌐'
        }
      default:
        return {
          title: 'Payment Error',
          description: 'An error occurred while processing your payment. Please try again.',
          icon: '⚠️'
        }
    }
  }

  const errorType = getErrorType(error)
  const errorDetails = getErrorDetails(errorType)

  return (
    <Card className="border-red-200 bg-red-50">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="text-2xl">{errorDetails.icon}</div>
          <div className="flex-1">
            <h3 className="font-semibold text-red-800 mb-1">
              {errorDetails.title}
            </h3>
            <p className="text-sm text-red-700 mb-4">
              {errorDetails.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2">
              {onRetry && (
                <Button 
                  size="sm" 
                  onClick={onRetry}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Button>
              )}
              <Button 
                size="sm" 
                variant="outline"
                onClick={onContactSupport || (() => window.open('mailto:support@farmdigits.com', '_blank'))}
                className="flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Get Help
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Network error component
export function NetworkErrorDisplay({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="text-center py-8">
      <div className="text-6xl mb-4">📡</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Connection Lost
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Unable to connect to our servers. Please check your internet connection and try again.
      </p>
      {onRetry && (
        <Button onClick={onRetry} className="flex items-center gap-2 mx-auto">
          <RefreshCw className="h-4 w-4" />
          Retry Connection
        </Button>
      )}
    </div>
  )
} 