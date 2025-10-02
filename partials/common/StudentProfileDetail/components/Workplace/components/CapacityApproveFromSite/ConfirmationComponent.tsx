import { Typography } from '@components'
import Image from 'next/image'
import { useEffect } from 'react'
import { FiCheckCircle } from 'react-icons/fi'

interface ConfirmationComponentProps {
    capacity: number
    isNoStudents?: boolean
}

export function ConfirmationComponent({
    capacity,
    isNoStudents = false,
}: ConfirmationComponentProps) {
    useEffect(() => {
        // Optional redirect after 3 seconds
        const timer = setTimeout(() => {
            console.log('Redirecting to dashboard...')
        }, 3000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="text-center relative z-10">
            <div className="animate-scale-in animate-delay-200">
                <Image
                    src="https://www.skiltrak.com.au/images/site/logo-light.webp"
                    alt="logo"
                    width={0}
                    height={0}
                    sizes="100vw 100vh"
                    className="h-16 w-auto mx-auto"
                />
            </div>

            <div className="mb-8 animate-success-scale">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 animate-icon-bounce animate-delay-200">
                    <FiCheckCircle className="w-8 h-8 text-green-600" />
                </div>

                <Typography variant="h3" center color="text-green-700">
                    {isNoStudents ? 'Thank You!' : 'Capacity Confirmed!'}
                </Typography>

                <Typography variant="body" center color="text-muted-foreground">
                    {isNoStudents
                        ? "We've noted your interest and will keep you updated on new opportunities."
                        : "We've successfully updated your availability"}
                </Typography>
            </div>

            <div className="mt-6 space-y-3 animate-slide-up animate-delay-500">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <Typography variant="small" center color="text-green-700">
                        {isNoStudents
                            ? "🎉 We'll notify you as soon as students become available in your area!"
                            : `🎉 You're all set! We'll start matching ${
                                  capacity === 1
                                      ? '1 student'
                                      : `${capacity} students`
                              } to your available capacity.`}
                    </Typography>
                </div>

                <Typography variant="xs" center color="text-muted-foreground">
                    Redirecting to your dashboard in a moment...
                </Typography>
            </div>
        </div>
    )
}
