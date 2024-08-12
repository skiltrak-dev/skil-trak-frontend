import { GlobalModal, Typography } from '@components'
import React from 'react'
import { MdCancel } from 'react-icons/md'

export const ViewWpRequestNoteModal = ({
    note,
    onCancel,
}: {
    note: string
    onCancel: () => void
}) => {
    return (
        <GlobalModal>
            <div className="relative p-3">
                <div className={'flex items-center justify-between'}>
                    <Typography variant="title">View Request Note</Typography>
                    <MdCancel
                        onClick={onCancel}
                        className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                    />
                </div>

                <div className="p-2 bg-gray-200 mt-3 rounded-md">
                    <Typography variant="small">{note}</Typography>
                </div>
            </div>
        </GlobalModal>
    )
}
