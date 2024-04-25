import { ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { AvailabilityForm } from '@partials/common'
import {
    useSubAdminRequestWorkplaceMutation,
    useGetSubAdminStudentDetailQuery,
} from '@queries'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'

type AvailabilityProps = {
    setActive: any
    personalInfoData: any
    userId: number
    availabilities: any
    setAvailabilities: any
}
export const Availability = ({
    setActive,
    personalInfoData,
    userId,
    availabilities,
    setAvailabilities,
}: AvailabilityProps) => {
    // query
    const [workplaceRequest, workplaceRequestResult] =
        useSubAdminRequestWorkplaceMutation()

    const router = useRouter()

    const { notification } = useNotification()
    const notificationRef = useRef(notification)
    notificationRef.current = notification

    const onSubmit = async (daysAvailability: any) => {
        await workplaceRequest({
            userId,
            ...personalInfoData,
            generalAvailabilities: daysAvailability,
        }).then((res: any) => {
            if (res?.data) {
                setActive((active: number) => active + 1)
            }
            if (res?.error?.data) {
                const showErrorNotifications = async () => {
                    const errorTitle = res?.error?.data?.error
                    if (
                        errorTitle &&
                        Array.isArray(res?.error?.data?.message)
                    ) {
                        for (let msg of res?.error?.data?.message) {
                            await new Promise((resolve) =>
                                setTimeout(resolve, 100)
                            )
                            notificationRef.current['error']({
                                title: errorTitle,
                                description: msg,
                                autoDismiss: true,
                            })
                        }
                    } else {
                        notificationRef.current['error']({
                            title: errorTitle || 'Some thing is not right',
                            description:
                                res?.error?.data?.message ||
                                'Please check your network connection',
                            autoDismiss: true,
                        })
                    }
                }

                showErrorNotifications()
                setActive(1)
            }
        })

        // setActive((active: number) => active + 1)
    }

    return (
        <div>
            <ShowErrorNotifications result={workplaceRequestResult} />
            <AvailabilityForm
                setActive={setActive}
                onSubmit={onSubmit}
                result={workplaceRequestResult}
                availabilities={availabilities}
                setAvailabilities={setAvailabilities}
            />
        </div>
    )
}
