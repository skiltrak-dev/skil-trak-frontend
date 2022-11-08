import { Typography } from '@components/Typography'
import React from 'react'
import { FaPhoneSquareAlt } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'

export const StudentDetail = ({ data }: any) => {
    return (
        <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-2">
                <img
                    className="w-16 h-16 rounded-full"
                    src="https://picsum.photos/200/200"
                    alt=""
                />
                <div>
                    <Typography variant={'small'}>
                        <span className="font-semibold">
                            {data?.phone || '123456'}
                        </span>
                    </Typography>
                    <Typography variant={'label'}>
                        {data?.user?.name || 'Raminder Kaur Sharma'}
                    </Typography>
                    <Typography variant={'small'}>
                        {data?.user?.email || 'k_thabal@yahoo.co.in'}
                    </Typography>
                </div>
            </div>

            {/*  */}
            <div>
                <div className="flex items-center gap-x-2">
                    <FaPhoneSquareAlt className="text-gray-400 rounded-full" />
                    <Typography variant={'label'}>
                        {data?.phone || '123456'}
                    </Typography>
                </div>
                <div className="flex items-center gap-x-2">
                    <MdLocationOn className="text-gray-400 rounded-full" />
                    <Typography variant={'label'}>
                        {data?.addressLine1},{' '}
                        {data?.addressLine2 || 'Wallan, Vic 3756'}
                    </Typography>
                </div>
            </div>
        </div>
    )
}
