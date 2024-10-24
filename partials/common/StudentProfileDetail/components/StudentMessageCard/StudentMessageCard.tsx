import { Typography } from '@components'
import moment from 'moment'
import React from 'react'

export const StudentMessageCard = ({
    studentMessage,
}: {
    studentMessage: any
}) => {
    return (
        <div className="w-full p-4 rounded-md bg-[#6971DD24] flex flex-col gap-y-[5px]">
            <Typography color="text-[#77757F]" variant="small">
                {studentMessage?.message}
            </Typography>

            {/*  */}
            <div>
                <Typography medium variant="xxs">
                    Message By:{' '}
                    <span className="font-bold">
                        {studentMessage?.sender?.name}
                    </span>{' '}
                </Typography>
            </div>
            <Typography medium variant="xxs" color="text-black">
                {moment(studentMessage?.createdAt).format(
                    'ddd DD, MMM, YYYY [at] hh:mm a'
                )}
            </Typography>
        </div>
    )
}
