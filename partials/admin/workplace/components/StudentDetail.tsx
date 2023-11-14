import { InitialAvatar } from '@components'
import { Typography } from '@components/Typography'
import { StudentCellInfo } from '@partials/admin/student/components'
import React from 'react'
import { FaPhoneSquareAlt } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'

export const StudentDetail = ({ data }: any) => {
    return (
        <div className="flex items-center gap-x-4">
            <StudentCellInfo student={data} />

            {/*  */}
            <div>
                <div className="flex items-center gap-x-2">
                    <FaPhoneSquareAlt className="text-gray-400 rounded-full" />
                    <Typography variant={'label'}>{data?.phone}</Typography>
                </div>
                <div className="flex items-center gap-x-2">
                    <MdLocationOn className="text-gray-400 rounded-full" />
                    <Typography variant={'label'}>
                        {data?.addressLine1},{data?.suburb}, {data?.state}
                    </Typography>
                </div>
            </div>
        </div>
    )
}
