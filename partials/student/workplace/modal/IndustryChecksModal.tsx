import { GlobalModal, Typography } from '@components'
import React from 'react'
import { MdCancel } from 'react-icons/md'

export const IndustryChecksModal = ({ onCancel }: { onCancel: () => void }) => {
    return (
        <GlobalModal>
            <div className="relative max-w-[1076px] w-full">
                <MdCancel
                    onClick={onCancel}
                    className="absolute -top-3 -right-3 transition-all duration-500 text-black hover:text-black text-3xl cursor-pointer hover:rotate-90"
                />
                <div className="h-[80vh] md:h-[88vh]  overflow-auto custom-scrollbar">
                    <Typography variant="title" center>
                        Industry Checks
                    </Typography>
                </div>
            </div>
        </GlobalModal>
    )
}
