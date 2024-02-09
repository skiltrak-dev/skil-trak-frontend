import { Badge } from '@components/Badge'
import { TruncatedTextWithTooltip } from '@components/TruncatedTextWithTooltip'
import { Typography } from '@components/Typography'
import { ellipsisText } from '@utils'
import moment from 'moment'
import React from 'react'

export const VolunteerRequestsListCard = ({
    volunteer,
}: {
    volunteer: any
}) => {
    return (
        <div className="bg-gray-100 p-2 rounded-md grid grid-cols-5 items-center">
            <div className="">
                <Typography variant={'small'} color={'text-gray-500'}>
                    {volunteer?.course?.code}{' '}
                </Typography>
                <Typography variant="label" color={'text-gray-800'}>
                    {volunteer?.course?.title}{' '}
                </Typography>
            </div>

            <div className="col-span-2">
                <TruncatedTextWithTooltip
                    text={volunteer?.note}
                    maxLength={100}
                />
            </div>

            <div>
                <Badge
                    variant={volunteer.isClosed ? 'error' : 'primary'}
                    text={volunteer.isClosed ? 'Closed' : 'Active'}
                />
            </div>
            <div>
                <Typography variant="small" medium color={'text-gray-800'}>
                    {moment(volunteer?.createdAt).format('Do MMMM, YYYY')}
                </Typography>
            </div>
        </div>
    )
}
