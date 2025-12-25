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
import { RtoV2Api } from '@redux'
import { Rto, WorkplaceTokenPlan } from '@types'

interface StripePaymentFlowProps {
    clientSecret: string
    onSuccess: () => void
    onCancel: () => void
    amount: number
    rto: Rto
    credits: string
    plan: WorkplaceTokenPlan
}

const CheckoutForm = ({
    rto,
    amount,
    onCancel,
    onSuccess,
    credits,
    plan,
}: {
    rto: Rto
    amount: number
    onCancel: () => void
    onSuccess: () => void
    credits: string
    plan: WorkplaceTokenPlan
}) => {
    const stripe = useStripe()
    const elements = useElements()
    const [isProcessing, setIsProcessing] = useState(false)
    const { notification } = useNotification()
    const [confirmPayment] = RtoV2Api.RtoCredits.confirmPayment()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!stripe || !elements) return

        setIsProcessing(true)

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.href,
                payment_method_data: {
                    billing_details: {
                        name: rto.user.name,
                        email: rto.user.email,
                        phone: rto.phone,
                        address: {
                            line1: rto.addressLine1,
                            state: rto.state,
                            postal_code: rto.zipCode,
                        },
                    },
                },
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
            try {
                const res: any = await confirmPayment({
                    paymentId: paymentIntent.id,
                    token: credits,
                    plan,
                })
                if (res?.data) {
                    onSuccess()
                }
            } catch (err) {
                notification.error({
                    title: 'Sync Failed',
                    description:
                        "Payment was successful but we couldn't sync your credits. Please contact support.",
                })
            } finally {
                setIsProcessing(false)
            }
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
    rto,
    credits,
    plan,
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
                    rto={rto}
                    credits={credits}
                    plan={plan}
                />
            </Elements>
        </div>
    )
}
