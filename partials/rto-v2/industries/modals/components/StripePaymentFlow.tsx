import React, { useState } from 'react'
import {
    PaymentElement,
    useStripe,
    useElements,
    Elements,
} from '@stripe/react-stripe-js'
import { getStripe } from '@utils'
import { Button } from '@components'
import { Loader2, Lock } from 'lucide-react'
import { useNotification } from '@hooks'

interface StripePaymentFlowProps {
    clientSecret: string
    onSuccess: () => void
    onCancel: () => void
    amount: number
}

const CheckoutForm = ({
    onSuccess,
    onCancel,
    amount,
}: {
    onSuccess: () => void
    onCancel: () => void
    amount: number
}) => {
    const stripe = useStripe()
    const elements = useElements()
    const [isProcessing, setIsProcessing] = useState(false)
    const { notification } = useNotification()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!stripe || !elements) return

        setIsProcessing(true)

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.href,
            },
            redirect: 'if_required',
        })

        if (error) {
            notification.error({
                title: 'Payment Failed',
                description: error.message || 'An unexpected error occurred.',
            })
            setIsProcessing(false)
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            onSuccess()
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement
                options={{
                    layout: 'tabs',
                }}
            />

            <div className="flex flex-col gap-3 pt-4">
                <Button
                    submit
                    variant="primaryNew"
                    className="w-full h-11 font-bold shadow-premium"
                    disabled={isProcessing || !stripe || !elements}
                    loading={isProcessing}
                >
                    Pay ${amount} Securely
                </Button>
                <Button
                    variant="secondary"
                    outline
                    className="w-full h-11"
                    onClick={onCancel}
                    disabled={isProcessing}
                >
                    Cancel & Go Back
                </Button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                <Lock className="h-3 w-3" />
                Secure SSL Encrypted Payment
            </div>
        </form>
    )
}

export const StripePaymentFlow = ({
    clientSecret,
    onSuccess,
    onCancel,
    amount,
}: StripePaymentFlowProps) => {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Elements
                stripe={getStripe()}
                options={{
                    clientSecret,
                    appearance: {
                        theme: 'stripe',
                        variables: {
                            colorPrimary: '#0ea5e9', // Matches primaryNew
                        },
                    },
                }}
            >
                <CheckoutForm
                    onSuccess={onSuccess}
                    onCancel={onCancel}
                    amount={amount}
                />
            </Elements>
        </div>
    )
}
