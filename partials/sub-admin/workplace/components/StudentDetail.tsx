import { InitialAvatar } from '@components'
import { Typography } from '@components/Typography'
import React from 'react'
import { FaPhoneSquareAlt } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'

export const StudentDetail = ({ data }: any) => {
    return (
        <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-2">
                <InitialAvatar
                    name={data?.user?.name}
                    imageUrl={data?.user?.avatar}
                />
                <div>
                    <Typography variant={'xs'} color={'text-gray-500'}>
                        <span className="font-semibold">{data?.studentId}</span>
                    </Typography>
                    <Typography variant={'label'}>
                        {data?.user?.name}
                    </Typography>
                    <Typography variant={'small'}>
                        {data?.user?.email}
                    </Typography>
                </div>
            </div>

            {/*  */}
            <div>
                <div className="flex items-center gap-x-2">
                    <FaPhoneSquareAlt className="text-gray-400 rounded-full" />
                    <Typography variant={'label'}>{data?.phone}</Typography>
                </div>
                <div className="flex items-center gap-x-2">
                    <MdLocationOn className="text-gray-400 rounded-full" />
                    <Typography variant={'label'}>
                        {data?.addressLine1}, {data?.addressLine2}
                    </Typography>
                </div>
            </div>
        </div>
    )
}
