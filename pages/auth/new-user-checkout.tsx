import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js'
import { Button } from '@components/buttons'
import { ShowErrorNotifications } from '@components/ShowErrorNotifications'
import { uuid } from 'uuidv4'
import { useRouter } from 'next/router'

// Load Stripe - replace with your publishable key
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_...'
)

// Card element styling
const cardElementOptions = {
    style: {
        base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
                color: '#aab7c4',
            },
            padding: '12px',
        },
        invalid: {
            color: '#9e2146',
        },
    },
    hidePostalCode: true, // Remove if you want postal code
}

// Payment Form Component
const PaymentForm = ({ onCancel, onSuccess, onError }: any) => {
    const stripe = useStripe()
    const elements = useElements()
    const router = useRouter()

    const [isProcessing, setIsProcessing] = useState(false)
    const [paymentError, setPaymentError] = useState(null)
    const [cardComplete, setCardComplete] = useState(false)
    const [cardError, setCardError] = useState(null)
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        phone: '',
    })

    // Handle card element changes
    const handleCardChange = (event: any) => {
        setCardComplete(event.complete)
        setCardError(event.error ? event.error.message : null)
    }

    // Handle customer info changes
    const handleCustomerInfoChange = (field: any, value: any) => {
        setCustomerInfo((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    // Validate form
    const isFormValid = () => {
        return (
            customerInfo.name &&
            customerInfo.email &&
            cardComplete &&
            !cardError
        )
    }

    // Handle payment submission
    const handleSubmit = async (event: any) => {
        event.preventDefault()

        if (!stripe || !elements || !isFormValid()) {
            return
        }

        setIsProcessing(true)
        setPaymentError(null)

        try {
            const cardElement: any = elements.getElement(CardElement)

            // Step 1: Create payment intent on your backend
            const idempotency = uuid()
            const paymentIntentResponse = await fetch(
                '/api/create-payment-intent',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idempotency,
                        customer: customerInfo,
                        // Add any other data you need (amount, currency, etc.)
                        amount: 2999, // $29.99 in cents
                        currency: 'usd',
                    }),
                }
            )

            const { client_secret, error: backendError } =
                await paymentIntentResponse.json()

            if (backendError) {
                throw new Error(backendError.message)
            }

            // Step 2: Confirm payment with Stripe
            const { error: stripeError, paymentIntent }: any =
                await stripe.confirmCardPayment(client_secret, {
                    payment_method: {
                        card: cardElement,
                        billing_details: {
                            name: customerInfo.name,
                            email: customerInfo.email,
                            phone: customerInfo.phone,
                        },
                    },
                })

            if (stripeError) {
                throw new Error(stripeError.message)
            }

            // Step 3: Handle successful payment
            if (paymentIntent.status === 'succeeded') {
                // Update your backend about successful payment
                await fetch('/api/payment-success', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        paymentIntentId: paymentIntent.id,
                        customerId: paymentIntent.customer,
                    }),
                })

                onSuccess?.(paymentIntent)
                // You might want to redirect or show success message
                router.push('/payment-success')
            }
        } catch (error: any) {
            setPaymentError(error.message)
            onError?.(error)
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <div className="p-6 max-w-md mx-auto">
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                    Reactivate Your Account
                </h2>
                <p className="text-gray-600">
                    Complete your payment to reactivate your Skiltrak account
                    for one month.
                </p>
            </div>

            {/* Terms & Conditions */}
            <div className="border rounded-md border-dashed px-6 py-4 mb-6">
                <p className="font-semibold mb-3">Terms & Conditions</p>
                <ul className="list-disc text-sm space-y-2 ml-4">
                    <li>
                        I understand that my Skiltrak account will be
                        reactivated for one month from the date of payment.
                        Please note there will be no reimbursement if WBT is
                        completed prior to this new timeline end date.
                    </li>
                    <li>
                        I understand that this timeline extension request is
                        applicable to my Skiltrak account (only) and not
                        applicable to any course extension.
                    </li>
                    <li>
                        I understand that if I am an international student, I
                        will need to contact my school to ensure that I am in
                        accordance with my COE end date prior to proceeding with
                        the WBT course extension timeline.
                    </li>
                </ul>
            </div>

            {/* Payment Form */}
            <div className="space-y-4">
                {/* Customer Information */}
                <div className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            value={customerInfo.name}
                            onChange={(e) =>
                                handleCustomerInfoChange('name', e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            value={customerInfo.email}
                            onChange={(e) =>
                                handleCustomerInfoChange(
                                    'email',
                                    e.target.value
                                )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="john@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number (Optional)
                        </label>
                        <input
                            type="tel"
                            value={customerInfo.phone}
                            onChange={(e) =>
                                handleCustomerInfoChange(
                                    'phone',
                                    e.target.value
                                )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="+1 (555) 123-4567"
                        />
                    </div>
                </div>

                {/* Card Element */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Information *
                    </label>
                    <div className="border border-gray-300 rounded-md p-3 focus-within:ring-2 focus-within:ring-blue-500">
                        <CardElement
                            options={cardElementOptions}
                            onChange={handleCardChange}
                        />
                    </div>
                    {cardError && (
                        <p className="text-red-500 text-sm mt-1">{cardError}</p>
                    )}
                </div>

                {/* Payment Error */}
                {paymentError && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-3">
                        <p className="text-red-700 text-sm">{paymentError}</p>
                    </div>
                )}

                {/* Amount */}
                <div className="bg-gray-50 rounded-md p-3">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                            Account Reactivation (1 month)
                        </span>
                        <span className="font-semibold">$29.99</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                    <Button
                        onClick={handleSubmit}
                        disabled={!isFormValid() || isProcessing}
                        loading={isProcessing}
                        text={
                            isProcessing ? 'Processing...' : 'Pay & Reactivate'
                        }
                    />
                    <Button
                        text="Cancel"
                        variant="error"
                        onClick={onCancel}
                        disabled={isProcessing}
                    />
                </div>
            </div>

            {/* Security Notice */}
            <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                    🔒 Your payment information is secure and encrypted
                </p>
            </div>
        </div>
    )
}

// Main Payment Modal Component
export const PaymentModal = ({ onCancel }: any) => {
    const [paymentSuccess, setPaymentSuccess] = useState(false)
    const [paymentError, setPaymentError] = useState(null)

    const handlePaymentSuccess = (paymentIntent: any) => {
        setPaymentSuccess(true)
        console.log('Payment successful:', paymentIntent)
    }

    const handlePaymentError = (error: any) => {
        setPaymentError(error.message)
        console.error('Payment error:', error)
    }

    if (paymentSuccess) {
        return (
            <div className="p-6 text-center">
                <div className="mb-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                            className="w-8 h-8 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-green-800">
                        Payment Successful!
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Your account has been reactivated for one month.
                    </p>
                </div>
                <Button
                    text="Continue"
                    onClick={() => window.location.reload()}
                />
            </div>
        )
    }

    return (
        <Elements stripe={stripePromise}>
            <PaymentForm
                onCancel={onCancel}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
            />
        </Elements>
    )
}
