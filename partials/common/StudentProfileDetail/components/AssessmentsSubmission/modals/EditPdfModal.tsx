import { GlobalModal, LoogbookEditor } from '@components'
import React from 'react'

export const EditPdfModal = ({ onCancel }: { onCancel: () => void }) => {
    return (
        <GlobalModal>
            <div className="">
                <LoogbookEditor onCancel={onCancel} />
            </div>
        </GlobalModal>
    )
}
