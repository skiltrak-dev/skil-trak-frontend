import { InitialAvatar } from '@components/InitialAvatar'
import { Typography } from '@components/Typography'
import { Rto } from '@types'
import React from 'react'
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'

export const StudentRtoCellInfo = ({ rto }: { rto: Rto }) => {
    return (
        <div>
            <div className="flex items-center relative">
                <div className="flex items-center gap-x-2">
                    <div>
                        {rto?.user?.name && (
                            <InitialAvatar
                                name={rto?.user?.name}
                                imageUrl={rto?.user?.avatar}
                            />
                        )}
                    </div>

                    <div>
                        <Typography
                            variant={'subtitle'}
                            color={'text-gray-800'}
                        >
                            {rto?.user?.name}
                        </Typography>
                        <div className="flex items-center gap-x-2 text-sm">
                            <FaEnvelope className="text-gray-400" />
                            <Typography
                                variant={'label'}
                                color={'text-gray-500'}
                            >
                                {rto?.user?.email}
                            </Typography>
                        </div>
                        <div className="flex items-center gap-x-2 text-sm">
                            <FaPhone className="text-gray-400" />
                            <Typography
                                variant={'label'}
                                color={'text-gray-500'}
                            >
                                {rto?.phone}
                            </Typography>
                        </div>
                        <div className="flex items-center gap-x-2 text-sm">
                            <FaMapMarkerAlt className="text-gray-400" />
                            <Typography
                                variant={'label'}
                                color={'text-gray-500'}
                            >
                                {rto?.addressLine1} {rto?.suburb}, {rto?.state}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
