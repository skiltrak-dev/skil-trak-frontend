import { Modal } from '@components'
import React from 'react'

export const ViewIndustryAnswersModal = ({
    onCancel,
    industryId,
}: {
    industryId: number
    onCancel: () => void
}) => {
    return (
        <Modal
            title="View Industry Answers"
            subtitle="View Industry"
            onCancelClick={onCancel}
        >
            Saad
        </Modal>
    )
}
