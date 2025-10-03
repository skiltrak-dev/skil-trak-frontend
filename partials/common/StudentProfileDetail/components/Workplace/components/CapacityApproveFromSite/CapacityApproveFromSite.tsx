import { useState } from 'react'
import { InitialComponent } from './InitialComponent'
import { ConfirmationComponent } from './ConfirmationComponent'
import { SubAdminApi } from '@queries'
import { LoadingAnimation, ShowErrorNotifications } from '@components'
import { useRouter } from 'next/router'
import { useNotification } from '@hooks'

export const CapacityApproveFromSite = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isNoStudents, setIsNoStudents] = useState(false)
    const [confirmedCapacity, setConfirmedCapacity] = useState(0)

    const router = useRouter()
    const { notification } = useNotification()

    const getStdCapacity = SubAdminApi.Student.getStdCapacity(
        Number(router?.query?.id),
        {
            skip: !router?.query?.id,
        }
    )

    const [acceptStdCapacityBuInd, acceptStdCapacityBuIndResult] =
        SubAdminApi.Student.acceptStdCapacityBuInd()

    // This would come from the email link or API
    const availableStudents = getStdCapacity?.data || 0

    console.log({ availableStudents })

    const handleConfirm = async (capacity: number) => {
        const res: any = await acceptStdCapacityBuInd({
            approvalId: Number(router?.query?.id),
            capacity,
        })
        if (res?.data) {
            notification.success({
                title: 'Student Accepted',
                description: 'Student Accepted Successfully',
            })
            router.push('/')
        }
        setConfirmedCapacity(capacity)
        setIsSubmitted(true)
        setIsNoStudents(false)
    }

    const handleNoStudentsConfirm = () => {
        setIsSubmitted(true)
        setIsNoStudents(true)
    }

    return (
        <>
            <ShowErrorNotifications result={acceptStdCapacityBuIndResult} />
            <div className="bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
                {
                    <div className="w-full max-w-2xl mx-auto animate-slide-up relative">
                        {getStdCapacity?.isLoading ? (
                            <div className="w-full h-full bg-white/70 absolute top-0 left-0 z-20 flex justify-center items-center">
                                <LoadingAnimation />
                            </div>
                        ) : null}
                        <div className="p-6 md:p-10 shadow-xl border-0 bg-white/80 backdrop-blur-sm rounded-3xl relative overflow-hidden">
                            {/* Background decoration */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/10 to-transparent rounded-full translate-y-12 -translate-x-12" />

                            {!isSubmitted ? (
                                <InitialComponent
                                    availableStudents={availableStudents}
                                    onConfirm={handleConfirm}
                                    onNoStudentsConfirm={
                                        handleNoStudentsConfirm
                                    }
                                    result={acceptStdCapacityBuIndResult}
                                />
                            ) : (
                                <ConfirmationComponent
                                    capacity={confirmedCapacity}
                                    isNoStudents={isNoStudents}
                                />
                            )}
                        </div>
                    </div>
                }
            </div>
        </>
    )
}
