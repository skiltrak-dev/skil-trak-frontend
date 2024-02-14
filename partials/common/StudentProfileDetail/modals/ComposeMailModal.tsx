import { GlobalModal, MailForm, Typography } from '@components'
import React from 'react'
import { MdCancel } from 'react-icons/md'

export const ComposeMailModal = ({
    userId,
    onCancel,
}: {
    userId: number
    onCancel: () => void
}) => {
    return (
        <GlobalModal>
            <div className="p-4 flex justify-between items-center">
                <Typography variant="label" semibold>
                    Email
                </Typography>
                <MdCancel
                    onClick={onCancel}
                    className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                />
            </div>
            <div className="max-h-[80vh] max-w-[60vh] overflow-auto custom-scrollbar">
                <MailForm receiverId={Number(userId)} />
            </div>
        </GlobalModal>
    )
}
