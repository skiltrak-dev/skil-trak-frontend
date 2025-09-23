import { Modal } from '@components'
import { RPLForm } from '@components/sections'
import { Industry } from '@types'
import React from 'react'

export const AddRplModal = ({
    industry,
    onCancel,
}: {
    industry: Industry
    onCancel: () => void
}) => {
    return (
        <Modal
            title="Add Rpl"
            subtitle=""
            showActions={false}
            onCancelClick={onCancel}
        >
            <div className="h-[75vh] overflow-auto custom-scrollbar w-full md:w-[900px]">
                <RPLForm
                    industryUserId={industry?.user?.id}
                    onBackClicked={onCancel}
                />
            </div>
        </Modal>
    )
}
