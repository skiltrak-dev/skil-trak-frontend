import { Typography } from '@components'
import moment from 'moment'
import React from 'react'
import { CgFileDocument } from 'react-icons/cg'

export const RtoReportDateCard = ({
    dateObject,
    onClick,
    active,
}: {
    active: boolean
    dateObject: any
    onClick: () => void
}) => {
    return (
        <div
            onClick={onClick}
            className={`border cursor-pointer border-[#6B7280] rounded-[5px] p-2 flex items-center gap-x-3.5 ${
                active ? 'bg-primaryNew' : 'bg-white'
            }`}
        >
            <div>
                <CgFileDocument
                    className={`${active ? 'text-white' : 'text-[#374151]'}`}
                />
            </div>
            <Typography
                variant="small"
                color={active ? 'text-white' : 'text-[#374151]'}
            >
                <span className="whitespace-pre">
                    {moment(dateObject?.startDate).format('DD MMMM, YYYY')}
                </span>
            </Typography>
        </div>
    )
}
