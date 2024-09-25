import { Button, GlobalModal, Typography } from '@components'
import React from 'react'
import { MdCancel } from 'react-icons/md'
import { PiWarningOctagonThin } from 'react-icons/pi'

export const WorkplaceCancelInfoModal = ({
    onCancel,
}: {
    onCancel: () => void
}) => {
    return (
        <GlobalModal>
            <div className="max-w-2xl p-5 relative flex flex-col gap-y-2 py-5">
                {onCancel ? (
                    <MdCancel
                        onClick={() => {
                            if (onCancel) {
                                onCancel()
                            }
                        }}
                        className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90 absolute top-2 right-2"
                    />
                ) : null}
                <div className="flex flex-col gap-y-2 justify-between items-center">
                    <PiWarningOctagonThin className="text-primary text-8xl" />
                    <div className="mx-auto">
                        <Typography center semibold>
                            Cancel the workplace before blocking the student
                        </Typography>
                    </div>
                </div>
                <div>
                    <Typography center>
                        <span className="text-[15px] leading-4 text-center">
                            Before blocking the student, cancel their workplace.
                            This helps avoid confusion or issues.
                        </span>
                    </Typography>
                </div>
            </div>
        </GlobalModal>
    )
}
