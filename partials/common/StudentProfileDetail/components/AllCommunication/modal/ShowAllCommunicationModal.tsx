import { GlobalModal, Typography } from '@components'
import React from 'react'
import { MdCancel } from 'react-icons/md'
import { AllCommunicationComponent } from '../components'
import { User } from '@types'

export const ShowAllCommunicationModal = ({
    user,
    onCancel,
}: {
    user: User
    onCancel: () => void
}) => {
    return (
        <GlobalModal>
            <div className="w-[99vw] h-[99vh]">
                <div className="px-4 border-b border-secondary-dark flex justify-between items-center">
                    <div className="flex items-center justify-between p-1 bg-white">
                        <Typography
                            variant="body"
                            semibold
                            color="text-gray-900"
                        >
                            Recent Communications
                        </Typography>
                    </div>
                    <MdCancel
                        onClick={onCancel}
                        className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                    />
                </div>

                <AllCommunicationComponent user={user} />
            </div>
        </GlobalModal>
    )
}
