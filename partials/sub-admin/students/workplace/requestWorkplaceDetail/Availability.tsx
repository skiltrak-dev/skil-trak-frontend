import { ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { AvailabilityForm } from '@partials/common'
import {
    useSubAdminRequestWorkplaceMutation,
    useGetSubAdminStudentDetailQuery,
} from '@queries'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

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

    useEffect(() => {
        if (workplaceRequestResult.isSuccess) {
            setActive((active: number) => active + 1)
        }
        if (workplaceRequestResult.isError) {
            setActive(1)
        }
    }, [workplaceRequestResult])

    const onSubmit = async (daysAvailability: any) => {
        await workplaceRequest({
            userId,
            ...personalInfoData,
            generalAvailabilities: daysAvailability,
        })
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
