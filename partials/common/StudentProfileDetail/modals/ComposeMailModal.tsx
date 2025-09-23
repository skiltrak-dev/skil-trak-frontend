import { GlobalModal, MailForm, Typography } from '@components'
import { User } from '@types'
import React from 'react'
import { MdCancel } from 'react-icons/md'

export const ComposeMailModal = ({
    userId,
    onCancel,
    user,
    workplaceId,
}: {
    user: User
    userId: number
    onCancel: () => void
    workplaceId?: number
}) => {
    return (
        <GlobalModal>
            <div className=" w-full md:w-[700px]">
                <div className="p-4 flex justify-between items-center w-full md:w-[700px]">
                    <Typography variant="small">
                        To{' '}
                        <span className="text-[14px] font-semibold">
                            {user?.name}
                        </span>{' '}
                        <span>({user?.role})</span>
                    </Typography>
                    <MdCancel
                        onClick={onCancel}
                        className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                    />
                </div>
                <div className="max-h-[80vh] overflow-auto custom-scrollbar w-[700px]">
                    <MailForm
                        receiverId={Number(userId)}
                        workplaceId={workplaceId}
                        onCancel={onCancel}
                    />
                </div>
            </div>
        </GlobalModal>
    )
}
