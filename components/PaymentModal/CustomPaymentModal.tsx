import React, { useEffect, useState } from 'react'
import {
    useStripe,
    useElements,
    PaymentElement,
    CardElement,
} from '@stripe/react-stripe-js'

import { Button } from '@components/buttons'
import { ShowErrorNotifications } from '@components/ShowErrorNotifications'
import { useNotification } from '@hooks'

export const CustomPaymentModal = ({
    onCancel,
    setPaymentConfirmed,
    paymentConfirmed,
    onSuccess,
}: any) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { notification } = useNotification()
    const stripe = useStripe()
    const elements = useElements()

    const handlePay = async () => {
        if (!stripe || !elements) return

        setLoading(true)
        setError(null)

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.href, // or custom thank-you page
            },
            redirect: 'if_required', // prevents full redirect for card payments
        })

        if (result.error) {
            setError(result.error.message || 'Payment failed')
        } else if (result.paymentIntent?.status === 'succeeded') {
            // You can show success UI or trigger success logic
            setPaymentConfirmed(true)
            onSuccess()
            onCancel()
        }

        setLoading(false)
    }
    useEffect(() => {
        if (error) {
            notification.error({
                title: 'Payment Error',
                description:
                    'Payment could not be processed. Please try again.',
            })
        } else if (paymentConfirmed) {
            notification.success({
                title: 'Payment Successful',
                description: 'Your payment has been processed successfully.',
            })
        }
    }, [error, paymentConfirmed])

    return (
        <div className="p-4 w-[500px] max-h-[400px] overflow-y-auto remove-scrollbar">
            <h2 className="text-xl font-semibold text-center mb-2">
                Activate Your Account
            </h2>
            <p className="text-sm text-gray-600 text-center mb-4">
                To complete your registration and gain full access to your
                student account, please make the one-time activation payment.
                Once the payment is successful, you will be granted access
                immediately.
            </p>

            <PaymentElement
                className="mb-4"
                options={{
                    layout: 'tabs',
                    paymentMethodOrder: ['card'], // ✅
                }}
            />

            <div className="flex gap-3 mt-4">
                <Button
                    text="Pay Now"
                    onClick={handlePay}
                    loading={loading}
                    disabled={!stripe}
                />
                {/* <Button text="Cancel" variant="error" onClick={onCancel} /> */}
            </div>
        </div>
    )
}
