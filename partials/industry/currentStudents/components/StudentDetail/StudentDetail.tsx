import { InitialAvatar } from '@components'
import { Typography } from '@components/Typography'
import React from 'react'
import { FaPhoneSquareAlt } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'

export const StudentDetail = ({
    student,
    agreementSigned,
}: {
    student: any
    agreementSigned: boolean
}) => {
    return (
        <div className="flex flex-col gap-y-4 md:flex-row md:items-center md:gap-x-4">
            <div className="flex items-center gap-x-2">
                <InitialAvatar
                    name={student?.user?.name}
                    imageUrl={student?.user?.avatar}
                />
                <div>
                    <div className="flex items-center gap-x-2">
                        <Typography variant={'small'}>
                            <span className="font-semibold">{student?.id}</span>
                        </Typography>
                        {!agreementSigned && (
                            <Typography variant={'xs'} color={'text-primary'}>
                                . Agreement Pending
                            </Typography>
                        )}
                    </div>
                    <Typography variant={'label'}>
                        {student?.user?.name}
                    </Typography>
                    <Typography variant={'small'}>
                        {student?.user?.email}
                    </Typography>
                </div>
            </div>

            {/*  */}
            <div>
                <div className="flex md:items-center gap-x-2">
                    <FaPhoneSquareAlt className="text-gray-400 rounded-full" />
                    <Typography variant={'label'}>{student?.phone}</Typography>
                </div>
                <div className="flex items-center gap-x-2">
                    <MdLocationOn className="text-gray-400 rounded-full" />
                    <Typography variant={'label'}>
                        {student?.addressLine1}, {student?.addressLine2}
                    </Typography>
                </div>
            </div>
        </div>
    )
}
