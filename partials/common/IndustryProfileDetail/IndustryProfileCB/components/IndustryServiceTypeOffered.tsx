import React, { ReactElement, useState } from 'react'
import { AddServicesOfferedModal } from '../../modal'
import { Badge } from '@components'
import { MealTypes } from '@types'

export const IndustryServiceTypeOffered = ({
    industryId,
    serviceOffered,
}: {
    industryId: number
    serviceOffered: MealTypes[]
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancel = () => setModal(null)

    const onServeceOfferedClicked = () => {
        setModal(
            <AddServicesOfferedModal
                onCancel={onCancel}
                industryId={industryId}
                serviceOffered={serviceOffered}
            />
        )
    }

    return (
        <div>
            {modal}

            <Badge
                variant="info"
                text="Service Offered"
                onClick={onServeceOfferedClicked}
            />
        </div>
    )
}
