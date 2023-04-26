import { AvailabilityForm } from '@partials/common'
import { useWorkPlaceRequestMutation } from '@queries'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

type AvailabilityProps = {
    setActive: any
    personalInfoData: any
    availabilities: any
    setAvailabilities: any
}
export const Availability = ({
    setActive,
    personalInfoData,
    availabilities,
    setAvailabilities,
}: AvailabilityProps) => {
    // query
    const [workplaceRequest, workplaceRequestResult] =
        useWorkPlaceRequestMutation()

    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (workplaceRequestResult.isSuccess) {
            setActive((active: number) => active + 1)
        }
    }, [workplaceRequestResult.isSuccess])

    const onSubmit = async (daysAvailability: any) => {
        await workplaceRequest({
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
                availabilities={availabilities}
                setAvailabilities={setAvailabilities}
            />
        </div>
    )
}
