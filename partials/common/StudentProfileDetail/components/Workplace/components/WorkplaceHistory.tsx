import { ActionButton } from '@components'
import { ViewHistoryModal } from '../../../modals'
import React, { ReactElement, useState } from 'react'

export const WorkplaceHistory = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancelClicked = () => setModal(null)

    const onWorkplaceView = () => {
        setModal(<ViewHistoryModal onCancel={onCancelClicked} />)
    }
    return (
        <div>
            {modal}
            <ActionButton variant="info" simple onClick={onWorkplaceView}>
                WORKPLACE HISTORY
            </ActionButton>
        </div>
    )
}
