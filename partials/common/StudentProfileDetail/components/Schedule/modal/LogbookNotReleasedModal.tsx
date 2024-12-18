import { Button, GlobalModal, Typography } from '@components'
import { MdCancel } from 'react-icons/md'
import { PiWarningOctagonThin } from 'react-icons/pi'

import React from 'react'
import Image from 'next/image'

export const LogbookNotReleasedModal = ({
    onCancel,
}: {
    onCancel: () => void
}) => {
    return (
        <GlobalModal className="!max-w-5xl !w-full">
            <div className="w-full px-7 sm:px-16 md:px-32 xl:px-44 relative flex flex-col gap-y-5 py-10">
                <MdCancel
                    onClick={onCancel}
                    className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90 absolute top-2 right-2"
                />
                <div className="flex flex-col gap-y-2 justify-between items-center">
                    <Image
                        alt={''}
                        width={50}
                        height={50}
                        src={'/images/students/schedule.png'}
                    />
                    <div className="mx-auto">
                        <Typography center semibold>
                            Logbook Not Released
                        </Typography>
                    </div>
                </div>
                <div>
                    <Typography center>
                        <span className="text-[15px] leading-4 text-center">
                            The logbook has not been released. Therefore, the
                            student's placement cannot start. This message will
                            remain until the logbook is made available.
                        </span>
                    </Typography>
                </div>

                {/*  */}
                <div className="flex justify-center">
                    <Button text="Release LOGBOOK" />
                </div>
            </div>
        </GlobalModal>
    )
}
