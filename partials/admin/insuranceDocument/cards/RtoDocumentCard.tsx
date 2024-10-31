import { Button, Typography } from '@components'
import moment from 'moment'
import React from 'react'

export const RtoDocumentCard = () => {
    return (
        <div className="bg-[#24556D0D] py-3 px-3.5 rounded-md border-dashed border-[#24556D] grid grid-cols-11">
            <div className="col-span-5">
                <Typography variant="xxs" color="text-[#4A4A4A]">
                    RTO Detail
                </Typography>
                <Typography variant="xxs" medium>
                    Education Training and Employment Australia ETEA
                </Typography>
                <Typography variant="xxs" color="text-[#24556D]">
                    +6182118126126
                </Typography>
                <Typography variant="xxs" color="text-[#24556D]">
                    mail@mymail.com
                </Typography>
            </div>
            <div className="col-span-2">
                <Typography variant="xxs" color="text-[#4A4A4A]">
                    Confirm By
                </Typography>
                <Typography variant="xxs" medium>
                    John Doe
                </Typography>
            </div>
            <div className="col-span-2">
                <Typography variant="xxs" color="text-[#4A4A4A]">
                    Expiry
                </Typography>
                <Typography variant="xxs" color="text-[#24556D]" medium>
                    {moment(new Date()).format('DD-MM-YYYY')}
                </Typography>
            </div>
            <div className="col-span-2 flex justify-end items-center">
                <Button text="View" variant="info" />
            </div>
        </div>
    )
}
