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
}
export const Availability = ({
    setActive,
    personalInfoData,
    userId,
}: AvailabilityProps) => {
    // query
    const [workplaceRequest, workplaceRequestResult] =
        useSubAdminRequestWorkplaceMutation()

    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (workplaceRequestResult.isSuccess) {
            setActive((active: number) => active + 1)
        }
    }, [workplaceRequestResult.isSuccess])

    const onSubmit = async (daysAvailability: any) => {
        await workplaceRequest({
            userId,
            ...personalInfoData,
            generalAvailabilities: daysAvailability,
        })
    }

    return (
        <div>
            <AvailabilityForm
                setActive={setActive}
                onSubmit={onSubmit}
                result={workplaceRequestResult}
            />
        </div>
    )
}
