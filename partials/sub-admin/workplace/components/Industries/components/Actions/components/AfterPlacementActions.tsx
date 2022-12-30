import React, { useEffect, useState } from 'react'

// components
import { Button, ShowErrorNotifications } from '@components'

import {
    CompleteWorkplaceModal,
    TerminateWorkplaceModal,
} from '@partials/sub-admin/workplace/modals'

export const AfterPlacementActions = ({ appliedIndustry }: any) => {
    const [modal, setModal] = useState<any | null>(null)

    const onCancel = () => {
        setModal(null)
    }

    const onCompleteClicked = (id: number) => {
        setModal(
            <CompleteWorkplaceModal
                appliedIndustryId={id}
                onCancel={onCancel}
            />
        )
    }

    const onTerminateClicked = (id: number) => {
        setModal(
            <TerminateWorkplaceModal
                appliedIndustryId={id}
                onCancel={onCancel}
            />
        )
    }

    return (
        <div className="flex items-center gap-x-2">
            {modal && modal}
            <Button
                text={'TERMINATE'}
                variant={'error'}
                onClick={() => {
                    onTerminateClicked(appliedIndustry?.id)
                }}
            />
            <Button
                text={'COMPLETE'}
                variant={'success'}
                onClick={() => {
                    onCompleteClicked(appliedIndustry?.id)
                }}
            />
        </div>
    )
}
