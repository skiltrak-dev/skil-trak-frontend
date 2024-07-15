import { ReactElement, useRef, useState } from 'react'
import { useNotification } from '@hooks'
import { AvailabilityForm } from '@partials/common'
import { ShowErrorNotifications } from '@components'
import { useSubAdminRequestWorkplaceMutation } from '@queries'
import { useShowErrorNotification } from '@components/ShowErrorNotifications/useShowErrorNotification'
import { WorkplaceCreatedModal } from './modal'

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

    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancelModal = () => setModal(null)

    const showErrorNotifications = useShowErrorNotification()

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
                console.log('Bankaaa Success!!!!')
                setModal(<WorkplaceCreatedModal onCancel={onCancelModal} />)
                // setActive((active: number) => active + 1)
            }
            if (res?.error?.data) {
                showErrorNotifications(res)
                setActive(1)
            }
        })
    }

    return (
        <div
            className={`${workplaceRequestResult.isSuccess ? 'opacity-0' : ''}`}
        >
            {modal}
            <ShowErrorNotifications result={workplaceRequestResult} />
            <AvailabilityForm
                onSubmit={onSubmit}
                setActive={setActive}
                result={workplaceRequestResult}
                availabilities={availabilities}
                setAvailabilities={setAvailabilities}
            />
        </div>
    )
}
