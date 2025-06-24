import { useEffect, useRef } from 'react'
import { StudentStatusEnum, UserStatus } from '@types'

export const useStudentAlerts = (
    profile: any,
    alertMessage: any,
    setAlerts: any
) => {
    // Use ref to track if alert has been shown
    const alertShownRef = useRef(false)

    useEffect(() => {
        // Only proceed if profile is successful and has data
        if (!profile?.isSuccess || !profile?.data) {
            return
        }

        // Prevent showing alert multiple times
        if (alertShownRef.current) {
            return
        }

        const showAlert = () => {
            switch (profile?.data?.user?.status) {
                case UserStatus.Pending:
                    alertMessage.warning({
                        title: 'Student is Pending',
                        description: 'Student is Pending',
                        autoDismiss: false,
                    })
                    break
                case UserStatus.Archived:
                    alertMessage[
                        profile?.data?.studentStatus ===
                        StudentStatusEnum.COMPLETED
                            ? 'success'
                            : 'warning'
                    ]({
                        title:
                            profile?.data?.studentStatus ===
                            StudentStatusEnum.COMPLETED
                                ? 'Student Placement Completed'
                                : 'Student is Archived',
                        description:
                            profile?.data?.studentStatus ===
                            StudentStatusEnum.COMPLETED
                                ? 'The student has successfully completed all required placement activities'
                                : 'Student is Archived',
                        autoDismiss: false,
                    })
                    break
                case UserStatus.Rejected:
                    alertMessage.error({
                        title: 'Student is Rejected',
                        description: 'Student is Rejected',
                        autoDismiss: false,
                    })
                    break
                case UserStatus.Blocked:
                    alertMessage.error({
                        title: 'Student is Blocked',
                        description: 'Student is Blocked',
                        autoDismiss: false,
                    })
                    break
                default:
                    break
            }

            // Mark alert as shown
            alertShownRef.current = true
        }

        // Only show alert if it hasn't been shown yet
        if (!alertShownRef.current) {
            showAlert()
        }

        // Remove the problematic cleanup function
        // The ref will handle preventing duplicate alerts
    }, [
        profile?.isSuccess,
        profile?.data?.user?.status,
        profile?.data?.studentStatus,
        alertMessage,
    ])

    // Reset the ref when component unmounts (optional)
    useEffect(() => {
        return () => {
            alertShownRef.current = false
            setAlerts([])
        }
    }, [])
}
