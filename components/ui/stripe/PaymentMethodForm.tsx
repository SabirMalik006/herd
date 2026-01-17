'use client';

import React, { useState, useEffect } from 'react';
import { 
  useStripe, 
  useElements, 
  PaymentElement,
  CardElement,
  Elements 
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Lock, AlertTriangle, Loader2 } from 'lucide-react';
import { stripeService } from '@/services/api/stripe';
import { useToast } from '@/hooks/use-toast';
import { STRIPE_CONFIG } from '@/config/stripe';

interface PaymentMethodFormProps {
  onSuccess?: (paymentMethod: any) => void;
  onError?: (error: string) => void;
  showBillingAddress?: boolean;
  className?: string;
}

/**
 * Payment Method Collection Component (Internal)
 * Uses PaymentElement with proper setup intent integration
 */
function PaymentMethodCollectionForm({ 
  onSuccess, 
  onError,
  showBillingAddress = true,
  className = '' 
}: PaymentMethodFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    email: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'US',
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      const error = 'Stripe not loaded';
      onError?.(error);
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // Confirm the setup intent with the payment element
      const result = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/dashboard/billing?setup=success`,
        },
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      // TypeScript workaround: if no error, setupIntent should exist
      const setupIntent = (result as any).setupIntent;
      if (setupIntent && setupIntent.status === 'succeeded') {
        onSuccess?.(setupIntent.payment_method);
        toast({
          title: 'Success',
          description: 'Payment method added successfully',
        });
      }

    } catch (error: any) {
      const errorMessage = error.message || 'Failed to add payment method';
      onError?.(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Element */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Lock className="h-4 w-4" />
          Payment Details
        </Label>
        <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
          <PaymentElement 
            options={{
              layout: 'tabs',
            }}
          />
        </div>
      </div>

      {/* Billing Address */}
      {showBillingAddress && (
        <div className="space-y-4">
          <Label className="text-sm font-medium">Billing Address</Label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={billingDetails.name}
                onChange={(e) => setBillingDetails(prev => ({
                  ...prev,
                  name: e.target.value
                }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={billingDetails.email}
                onChange={(e) => setBillingDetails(prev => ({
                  ...prev,
                  email: e.target.value
                }))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address-line1">Address</Label>
            <Input
              id="address-line1"
              type="text"
              value={billingDetails.address.line1}
              onChange={(e) => setBillingDetails(prev => ({
                ...prev,
                address: { ...prev.address, line1: e.target.value }
              }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="address-line2">Address Line 2 (Optional)</Label>
            <Input
              id="address-line2"
              type="text"
              value={billingDetails.address.line2}
              onChange={(e) => setBillingDetails(prev => ({
                ...prev,
                address: { ...prev.address, line2: e.target.value }
              }))}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                type="text"
                value={billingDetails.address.city}
                onChange={(e) => setBillingDetails(prev => ({
                  ...prev,
                  address: { ...prev.address, city: e.target.value }
                }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                type="text"
                value={billingDetails.address.state}
                onChange={(e) => setBillingDetails(prev => ({
                  ...prev,
                  address: { ...prev.address, state: e.target.value }
                }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="postal-code">Postal Code</Label>
              <Input
                id="postal-code"
                type="text"
                value={billingDetails.address.postal_code}
                onChange={(e) => setBillingDetails(prev => ({
                  ...prev,
                  address: { ...prev.address, postal_code: e.target.value }
                }))}
                required
              />
            </div>
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
        <div className="text-sm text-blue-700 dark:text-blue-300">
          <p className="font-medium">Your payment is secure</p>
          <p>All payment information is encrypted and processed securely by Stripe.</p>
        </div>
      </div>

      {/* Submit Button */}
      <Button 
        type="submit" 
        className="w-full"
        disabled={!stripe || loading}
        size="lg"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Add Payment Method
          </div>
        )}
      </Button>
    </form>
  );
}

/**
 * Payment Method Form Component
 * Handles setup intent creation and provides proper Elements context
 */
export function PaymentMethodForm({ 
  onSuccess, 
  onError,
  showBillingAddress = true,
  className = '' 
}: PaymentMethodFormProps) {
  const { toast } = useToast();
  const [setupIntent, setSetupIntent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stripePromise] = useState(() => stripeService.getStripe());

  // Create setup intent when component mounts
  useEffect(() => {
    const createSetupIntent = async () => {
      try {
        console.log('🔧 Creating setup intent for payment method...');
        const intent = await stripeService.createSetupIntent();
        console.log('✅ Setup intent created:', intent);
        setSetupIntent(intent);
      } catch (error) {
        console.error('❌ Failed to create setup intent:', error);
        onError?.('Failed to initialize payment form. Please try again.');
        toast({
          title: 'Error',
          description: 'Failed to initialize payment form. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    // Only create setup intent if Stripe is configured
    if (STRIPE_CONFIG.PUBLISHABLE_KEY) {
      createSetupIntent();
    } else {
      setLoading(false);
    }
  }, [onError, toast]);

  // Check if Stripe is available
  if (!STRIPE_CONFIG.PUBLISHABLE_KEY) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Configuration Required
          </CardTitle>
          <CardDescription>
            Stripe payment processing is not configured. Please contact your administrator.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              <div>
                <h3 className="font-medium text-yellow-800 dark:text-yellow-200">
                  Payment System Not Available
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                  To enable payment processing, configure the Stripe publishable key in your environment variables.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Loading state
  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Add Payment Method
          </CardTitle>
          <CardDescription>
            Your payment information is secure and encrypted
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
              <span className="text-gray-600 dark:text-gray-400">Initializing payment form...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Error state - no setup intent
  if (!setupIntent) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Payment Form Error
          </CardTitle>
          <CardDescription>
            Unable to initialize payment form
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              <div>
                <h3 className="font-medium text-red-800 dark:text-red-200">
                  Unable to Initialize Payment Form
                </h3>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  Please refresh the page or contact support if the problem persists.
                </p>
              </div>
            </div>
          </div>
          <Button 
            onClick={() => window.location.reload()} 
            variant="outline" 
            className="mt-4"
          >
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Elements options with client secret
  const elementsOptions = {
    clientSecret: setupIntent.client_secret,
    appearance: STRIPE_CONFIG.APPEARANCE,
    loader: 'auto' as const,
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Add Payment Method
        </CardTitle>
        <CardDescription>
          Your payment information is secure and encrypted
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Elements stripe={stripePromise} options={elementsOptions}>
          <PaymentMethodCollectionForm
            onSuccess={onSuccess}
            onError={onError}
            showBillingAddress={showBillingAddress}
          />
        </Elements>
      </CardContent>
    </Card>
  );
}

/**
 * Simple Card Element Component for basic use cases
 */
export function SimpleCardForm({ onSuccess, onError, className = '' }: PaymentMethodFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      const cardElement = elements.getElement(CardElement);
      
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        throw new Error(error.message);
      }

      onSuccess?.(paymentMethod);
      toast({
        title: 'Success',
        description: 'Payment method created successfully',
      });

    } catch (error: any) {
      const errorMessage = error.message || 'Failed to create payment method';
      onError?.(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={className}>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 border rounded-lg">
            <CardElement options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  fontFamily: 'Inter, system-ui, sans-serif',
                },
              },
            }} />
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={!stripe || loading}
          >
            {loading ? 'Processing...' : 'Add Card'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 