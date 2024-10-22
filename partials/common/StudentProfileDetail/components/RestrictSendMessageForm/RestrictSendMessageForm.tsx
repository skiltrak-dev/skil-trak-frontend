import { Typography } from '@components'
import Image from 'next/image'
import React from 'react'
import { GrStatusWarning } from 'react-icons/gr'

export const RestrictSendMessageForm = () => {
    return (
        <div className="flex flex-col gap-y-3 mt-1">
            <Typography semibold>
                <span className="text-[15px]">Message</span>{' '}
            </Typography>

            <div className="flex flex-col gap-y-2">
                <GrStatusWarning size={30} className="text-primary" />
                <div>
                    <Typography>Message Limit Exceeded</Typography>
                    <Typography variant="small">
                        You have reached the maximum limit of 3 messages for
                        this student. You cannot send additional messages at
                        this time.
                    </Typography>
                </div>
            </div>
        </div>
    )
}
