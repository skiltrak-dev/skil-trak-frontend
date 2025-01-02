import { Button, GlobalModal, Typography } from '@components'
import { useRouter } from 'next/router'
import React from 'react'
import { MdCancel } from 'react-icons/md'
import { PiWarningOctagonThin } from 'react-icons/pi'

export const UpdatePrvWPStatusModal = ({
    onCancel,
}: {
    onCancel: () => void
}) => {
    const router = useRouter()

    return (
        <GlobalModal>
            <div className="max-w-2xl p-5 relative flex flex-col gap-y-2 py-5">
                <MdCancel
                    onClick={onCancel}
                    className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90 absolute top-2 right-2"
                />
                <div className="flex flex-col gap-y-2 justify-between items-center">
                    <PiWarningOctagonThin className="text-primary text-8xl" />
                    <div className="mx-auto">
                        <Typography center semibold>
                            Update Previous workplace status to PLACEMENT
                            STARTED
                        </Typography>
                    </div>
                </div>
            </div>
        </GlobalModal>
    )
}
