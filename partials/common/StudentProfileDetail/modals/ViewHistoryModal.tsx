import { Modal } from '@components'
import React from 'react'
import { WorkplaceHistoryView } from '../components'

export const ViewHistoryModal = ({
    wpId,
    onCancel,
}: {
    wpId: number
    onCancel: () => void
}) => {
   
    return (
        <Modal
            showActions={false}
            onCancelClick={onCancel}
            title="Workplace History"
            subtitle="Workplace history view"
        >
            <div className="max-h-[70vh] overflow-y-auto overflow-x-hidden custom-scrollbar w-full">
                <WorkplaceHistoryView wpId={wpId} />
            </div>
        </Modal>
    )
}
