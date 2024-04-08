import React from 'react'
import { GlobalModal, Typography } from '@components'
import { MdCancel } from 'react-icons/md'
import Image from 'next/image'
import { TbMail } from 'react-icons/tb'

export const LoginErrorAfterHoursModal = ({
    error,
    onCancel,
}: {
    error: any
    onCancel: () => void
}) => {
    return (
        <GlobalModal>
            <div className="relative max-w-[500px] py-8 px-3">
                <MdCancel
                    onClick={onCancel}
                    className="transition-all absolute top-2 right-2 duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                />

                <div className="px-5 flex flex-col items-center ">
                    <Image
                        src={'/images/timer-pause.png'}
                        alt={''}
                        width={35}
                        height={40}
                    />
                    <div className="mt-4 flex flex-col gap-y-2">
                        <Typography variant="label" center block medium italic>
                            The System is unavailable outside of business hours.
                        </Typography>
                        <Typography variant="small" center block>
                            Please come back later. if you have an urgent task
                            so you can contact the administration{' '}
                        </Typography>
                    </div>

                    <div className="mt-3.5">
                        <Typography variant="small" center block>
                            OR Email us at
                        </Typography>
                    </div>
                    <div className="mt-4 flex items-center gap-x-2">
                        <TbMail size={18} />
                        <Typography center block>
                            <span className="text-[15px] text-black block">
                                admin@skiltrak.com.au
                            </span>
                        </Typography>
                    </div>
                </div>
            </div>
        </GlobalModal>
    )
}
