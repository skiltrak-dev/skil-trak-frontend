import { useState } from 'react'
import { InitialComponent } from './InitialComponent'
import { ConfirmationComponent } from './ConfirmationComponent'

export const CapacityApproveFromSite = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [confirmedCapacity, setConfirmedCapacity] = useState(0)
    const [isNoStudents, setIsNoStudents] = useState(false)

    // This would come from the email link or API
    const availableStudents = 5 // Change this to test different scenarios: 0, 1, or >1

    const handleConfirm = (capacity: number) => {
        setConfirmedCapacity(capacity)
        setIsSubmitted(true)
        setIsNoStudents(false)
    }

    const handleNoStudentsConfirm = () => {
        setIsSubmitted(true)
        setIsNoStudents(true)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl mx-auto animate-slide-up">
                <div className="p-8 md:p-12 shadow-xl border-0 bg-white/80 backdrop-blur-sm rounded-3xl relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/10 to-transparent rounded-full translate-y-12 -translate-x-12" />

                    {!isSubmitted ? (
                        <InitialComponent
                            availableStudents={availableStudents}
                            onConfirm={handleConfirm}
                            onNoStudentsConfirm={handleNoStudentsConfirm}
                        />
                    ) : (
                        <ConfirmationComponent
                            capacity={confirmedCapacity}
                            isNoStudents={isNoStudents}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
