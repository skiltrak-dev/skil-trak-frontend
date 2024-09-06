import { GlobalModal, LoogbookEditor } from '@components'
import React from 'react'

export const EditPdfModal = ({
    file,
    onCancel,
}: {
    file: any
    onCancel: () => void
}) => {
    return (
        <GlobalModal>
            <div className="">
                <LoogbookEditor file={file} onCancel={onCancel} />
            </div>
        </GlobalModal>
    )
}
