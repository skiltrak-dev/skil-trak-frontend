import { Typography } from '@components'
import moment from 'moment'
import React from 'react'
import { CgFileDocument } from 'react-icons/cg'

export const InvoiceDateCard = ({
    dateObject,
    active,
    onClick,
}: {
    onClick: () => void
    dateObject: { startDate: string; endDate: string }
    active?: boolean
}) => {
    return (
        <div
            onClick={() => onClick()}
            className={`border cursor-pointer border-[#6B7280] rounded-[5px] p-2 flex items-center gap-x-3.5 shadow-[0px_1px_16px_0px_rgba(0,0,0,0.10)] ${
                active ? 'bg-primaryNew' : 'bg-white'
            }`}
        >
            <div>
                <CgFileDocument
                    className={`${active ? 'text-white' : 'text-[#374151]'}`}
                />
            </div>
            <div className="flex items-center gap-x-1.5">
                <Typography
                    variant="small"
                    color={active ? 'text-white' : 'text-[#374151]'}
                >
                    <span className="whitespace-pre">
                        {moment(dateObject?.startDate).format('DD MMMM, YYYY')}
                    </span>
                </Typography>

                <Typography
                    variant="small"
                    color={active ? 'text-white' : 'text-[#374151]'}
                >
                    -
                </Typography>
                <Typography
                    variant="small"
                    color={active ? 'text-white' : 'text-[#374151]'}
                >
                    <span className="whitespace-pre">
                        {moment(dateObject?.endDate).format('DD MMMM, YYYY')}
                    </span>
                </Typography>
            </div>
        </div>
    )
}
