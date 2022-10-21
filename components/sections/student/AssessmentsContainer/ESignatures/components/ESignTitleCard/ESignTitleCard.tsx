import { Typography } from '@components/Typography'
import React from 'react'
import { FaFileSignature } from 'react-icons/fa'
type ESignTitleCardProps = {
    courseName: string
    status: string
}

export const ESignTitleCard = ({ courseName, status }: ESignTitleCardProps) => {
    return (
        <div
            className={`${
                status === 'Signed' ? 'bg-white' : 'bg-[#FEE1B2]'
            } px-2 py-4`}
        >
            <div className={`flex justify-between items-center`}>
                <div className="flex items-center gap-x-2">
                    <div>
                        <FaFileSignature className="text-orange-400" />
                    </div>
                    <div>
                        <Typography variant="label">{courseName}</Typography>
                    </div>
                </div>
                <div
                    className={`${
                        status === 'Signed' ? 'bg-green-100' : 'bg-[#E8F2FA]'
                    } px-1 whitespace-nowrap`}
                >
                    <Typography
                        variant="xs"
                        color={
                            status === 'Signed'
                                ? 'text-green-500'
                                : 'text-neutral-500'
                        }
                    >
                        {status}
                    </Typography>
                </div>
            </div>
        </div>
    )
}
