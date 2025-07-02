import { GlobalModal, Typography } from '@components'
import React from 'react'
import { MdCancel } from 'react-icons/md'
import { CancelledWPCard } from '../Cards'

export const AllCancelleWorkplaceModal = ({
    onCancel,
    rejectedWorkplaces,
}: {
    onCancel: () => void
    rejectedWorkplaces: any
}) => {
    return (
        <GlobalModal>
            <div className="max-w-4xl px-5 py-6 relative flex flex-col gap-y-2 ">
                <MdCancel
                    onClick={onCancel}
                    className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90 absolute top-2 right-2"
                />
                <div className="max-h-44">
                    <Typography variant="small" semibold>
                        Cancelled Workplaces
                    </Typography>

                    <div className="divide-y divide-gray-100 flex flex-col gap-y-2">
                        {rejectedWorkplaces?.data.map((item: any) => (
                            <CancelledWPCard key={item?.id} workplace={item} />
                        ))}
                    </div>
                </div>
            </div>
        </GlobalModal>
    )
}
