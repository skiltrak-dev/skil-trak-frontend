import { Button, Typography } from '@components'
import Image from 'next/image'
import { useState } from 'react'

import { FiCheckCircle, FiClock, FiUsers } from 'react-icons/fi'
import { CapacityStepper } from './CapacityStepper'

interface InitialComponentProps {
    availableStudents: number
    onConfirm: (capacity: number) => void
    onNoStudentsConfirm: () => void
}

export function InitialComponent({
    availableStudents,
    onConfirm,
    onNoStudentsConfirm,
}: InitialComponentProps) {
    const [capacity, setCapacity] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    const isValidCapacity = capacity > 0 && capacity <= availableStudents

    const handleConfirm = async () => {
        if (isValidCapacity) {
            setIsLoading(true)

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1200))

            setIsLoading(false)
            onConfirm(capacity)
        }
    }

    const handleNoStudentsConfirm = async () => {
        setIsLoading(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        setIsLoading(false)
        onNoStudentsConfirm()
    }

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

            {availableStudents === 1 ? (
                <div className="animate-fade-in">
                    <Typography variant="h3" center color="text-primaryNew">
                        Capacity Confirmation
                    </Typography>

                    <Typography
                        variant="label"
                        center
                        color="text-muted-foreground"
                    >
                        Thank you for clicking "Capacity Available"
                    </Typography>
                </div>
            ) : (
                <div className="animate-fade-in">
                    <Typography variant="h1" center color="text-primaryNew">
                        Capacity Confirmation
                    </Typography>

                    <Typography
                        variant="body"
                        center
                        color="text-muted-foreground"
                    >
                        Help us match students with the right opportunities
                    </Typography>
                </div>
            )}

            {availableStudents === 0 && (
                <div className="space-y-6 animate-slide-up animate-delay-500">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                        <FiClock className="w-6 h-6 text-primary" />
                    </div>

                    <div className="space-y-3">
                        <Typography variant="h3" center color="text-primary">
                            No students available right now
                        </Typography>
                        <Typography
                            variant="body"
                            center
                            color="text-muted-foreground"
                        >
                            Thanks for confirming! We'll notify you as soon as
                            opportunities arise in your area.
                        </Typography>
                    </div>

                    <div className="button-hover-scale">
                        <Button
                            // className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-200"
                            onClick={handleNoStudentsConfirm}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Processing...
                                </div>
                            ) : (
                                'Got it, thanks!'
                            )}
                        </Button>
                    </div>
                </div>
            )}

            {availableStudents === 1 && (
                <div className="space-y-6 animate-slide-up animate-delay-500">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 animate-icon-bounce animate-delay-600">
                        <FiCheckCircle className="w-8 h-8 text-green-600" />
                    </div>

                    <div className="space-y-4">
                        <Typography variant="h3" center color="text-green-700">
                            Thank you for your confirmation!
                        </Typography>
                        <Typography
                            variant="body"
                            center
                            color="text-muted-foreground"
                        >
                            We've noted your availability for 1 student
                            placement. We'll be in touch soon with the next
                            steps.
                        </Typography>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <Typography
                            variant="small"
                            center
                            color="text-green-700"
                        >
                            🎉 Perfect! We'll start the matching process and
                            contact you with student details shortly.
                        </Typography>
                    </div>
                </div>
            )}

            {availableStudents > 1 && (
                <div className="space-y-6 animate-slide-up animate-delay-500">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4 animate-bounce-in animate-delay-600">
                        <FiUsers className="w-6 h-6 text-primary" />
                    </div>

                    <div className="space-y-3">
                        <Typography variant="h3" center color="text-primaryNew">
                            Great! We have {availableStudents} students ready
                        </Typography>
                        <Typography
                            variant="body"
                            center
                            color="text-muted-foreground"
                        >
                            These students are eager to start their placements.
                            How many can you accommodate?
                        </Typography>
                    </div>

                    <div className="space-y-4 animate-fade-in animate-delay-700">
                        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-6 border border-primary/10">
                            <CapacityStepper
                                value={capacity}
                                onChange={setCapacity}
                                max={availableStudents}
                                disabled={isLoading}
                            />

                            <div className="mt-4 space-y-2">
                                <Typography
                                    variant="small"
                                    center
                                    color="text-muted-foreground"
                                >
                                    Choose between 1 and {availableStudents}{' '}
                                    students
                                </Typography>

                                {!isValidCapacity && capacity > 0 && (
                                    <Typography
                                        variant="small"
                                        center
                                        color="text-destructive"
                                        // role="alert"
                                    >
                                        Please enter a number between 1 and{' '}
                                        {availableStudents}
                                    </Typography>
                                )}

                                {isValidCapacity && (
                                    <Typography
                                        variant="small"
                                        center
                                        color="text-green-600"
                                    >
                                        Perfect! You can accommodate {capacity}{' '}
                                        student{capacity !== 1 ? 's' : ''}
                                    </Typography>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div
                            className={
                                isValidCapacity ? 'button-hover-scale' : ''
                            }
                        >
                            <Button
                                // className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleConfirm}
                                disabled={!isValidCapacity || isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Confirming capacity...
                                    </div>
                                ) : (
                                    `Confirm ${capacity} student${
                                        capacity !== 1 ? 's' : ''
                                    }`
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {availableStudents > 1 && (
                <Typography
                    variant="small"
                    center
                    color="text-muted-foreground"
                    // className="mt-8 animate-fade-in animate-delay-800"
                >
                    💡 You can update your capacity anytime from your SkilTrak
                    dashboard
                </Typography>
            )}

            {availableStudents === 1 && (
                <Typography
                    variant="small"
                    center
                    color="text-muted-foreground"
                    // className="mt-8 animate-fade-in animate-delay-800"
                >
                    💡 You can update your availability anytime from your
                    SkilTrak dashboard
                </Typography>
            )}
        </div>
    )
}
