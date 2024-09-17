import React from 'react'
import { GlobalModal } from '@components'
import { MdCancel } from 'react-icons/md'
import { WorkplaceApproval } from '../components'

export const WorkplaceApprovalModal = ({
    onCancel,
    wpApprovalRequest,
}: {
    onCancel: () => void
    wpApprovalRequest: any
}) => {
    return (
        <GlobalModal>
            <div className="relative max-w-5xl w-full">
                <MdCancel
                    onClick={onCancel}
                    className="absolute -top-3 -right-3 transition-all duration-500 text-black hover:text-black text-3xl cursor-pointer hover:rotate-90"
                />
                <div className="h-[90vh] md:h-[85vh] xl:h-auto overflow-auto custom-scrollbar">
                    <WorkplaceApproval
                        wpApprovalData={wpApprovalRequest}
                        onCancel={onCancel}
                    />
                </div>
            </div>
        </GlobalModal>
    )
}
