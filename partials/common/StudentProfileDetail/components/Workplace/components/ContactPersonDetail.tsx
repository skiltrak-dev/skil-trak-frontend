import { ActionButton } from '@components'
import { ViewHistoryModal } from '../../../modals'
import React, { ReactElement, useState } from 'react'
import { ViewContactPersonDetail } from '../modals'

export const ContactPersonDetail = ({
    appliedIndustry,
}: {
    appliedIndustry: any
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancelClicked = () => setModal(null)

    const onWorkplaceView = () => {
        setModal(
            <ViewContactPersonDetail
                appliedIndustry={appliedIndustry}
                onCancel={onCancelClicked}
            />
        )
    }
    return (
        <div>
            {modal}
            <ActionButton variant="info" simple onClick={onWorkplaceView}>
                Contact Person{' '}
            </ActionButton>
        </div>
    )
}
