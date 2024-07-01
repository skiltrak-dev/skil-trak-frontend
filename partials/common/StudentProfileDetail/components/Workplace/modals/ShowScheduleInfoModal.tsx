import { GlobalModal, Modal, Typography } from '@components'
import React from 'react'
import { MdCancel } from 'react-icons/md'

export const ShowScheduleInfoModal = ({
    onCancel,
}: {
    onCancel: () => void
}) => {
    return (
        <GlobalModal>
            <div className="max-w-2xl p-5 relative">
                <div className="flex justify-between items-center">
                    <Typography center semibold>
                        Add Schedule before start placement
                    </Typography>
                    <MdCancel
                        onClick={onCancel}
                        className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90 absolute top-2 right-2"
                    />
                </div>
                <div>
                    <Typography>
                        <span className="text-[13px] leading-4">
                            Before proceeding with the placement process, it is
                            essential to schedule and confirm the placement
                            timeline. Please ensure that the placement schedule
                            is added and finalized prior to initiating the
                            placement.
                        </span>
                    </Typography>
                </div>
            </div>
        </GlobalModal>
    )
}
