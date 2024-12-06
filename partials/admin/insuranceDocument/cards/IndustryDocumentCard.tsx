import React from 'react'
import moment from 'moment'
import { Button, Typography } from '@components'

export const IndustryDocumentCard = ({ industries }: { industries: any }) => {
    return (
        <div className="bg-[#6971DD1A] py-3 px-3.5 rounded-md border-dashed border-[#24556D] grid grid-cols-4">
            <div className="">
                <Typography variant="xxs" color="text-[#767F8C]">
                    Name
                </Typography>
                <Typography variant="xxs" medium>
                    {industries?.industry?.user?.name}
                </Typography>
            </div>
            <div className="">
                <Typography variant="xxs" color="text-[#767F8C]">
                    Email
                </Typography>
                <Typography variant="xxs" medium>
                    {industries?.industry?.user?.email}
                </Typography>
            </div>
            <div className="">
                <Typography variant="xxs" color="text-[#767F8C]">
                    Phone
                </Typography>
                <Typography variant="xxs" medium>
                    {industries?.industry?.phoneNumber}
                </Typography>
            </div>
            <div className="">
                <Typography variant="xxs" color="text-[#767F8C]">
                    Status
                </Typography>
                <Typography variant="xxs" medium>
                    Required
                </Typography>
            </div>
        </div>
    )
}
