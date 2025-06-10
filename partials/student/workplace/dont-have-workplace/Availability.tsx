import { ShowErrorNotifications, useShowErrorNotification } from '@components'
import { useNotification } from '@hooks'
import { AvailabilityForm } from '@partials/common'
import { SubAdminApi, useWorkPlaceRequestMutation } from '@queries'
import { useEffect } from 'react'

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
    const [createAutoWp, createAutoWpResult] =
        SubAdminApi.Student.createAutomatedWp()

    const { notification } = useNotification()

    const showErrorNotifications = useShowErrorNotification()

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

    const onSubmitBeta = async (daysAvailability: any) => {
        await createAutoWp({
            ...personalInfoData,
            generalAvailabilities: daysAvailability,
            date1: null,
            date2: null,
        }).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: 'Workplace Added',
                    description: 'Workplace Added Successfully!',
                })
            }
            if (res?.error?.data) {
                showErrorNotifications(res)
                setActive(1)
            }
        })
    }

    return (
        <div>
            <ShowErrorNotifications result={createAutoWpResult} />
            <AvailabilityForm
                setActive={setActive}
                onSubmit={onSubmit}
                onSubmitBeta={onSubmitBeta}
                autoResult={createAutoWpResult}
                result={workplaceRequestResult}
                availabilities={availabilities}
                setAvailabilities={setAvailabilities}
            />
        </div>
    )
}
