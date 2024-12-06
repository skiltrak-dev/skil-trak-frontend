import { Button, Typography } from '@components'
import moment from 'moment'
import React from 'react'

export const RtoDocumentCard = ({
    insDocument,
    onViewDocument,
}: {
    onViewDocument: () => void
    insDocument: any
}) => {
    const isExpired = moment(insDocument?.expiryDate).isBefore(moment(), 'day')
    return (
        <div
            className={`${
                isExpired ? 'bg-primary-light' : 'bg-[#24556D0D]'
            } py-3 px-3.5 rounded-md border-dashed border-[#24556D] grid grid-cols-11`}
        >
            <div className="col-span-5">
                <Typography variant="xxs" color="text-[#4A4A4A]">
                    RTO Detail
                </Typography>
                <Typography variant="xxs" medium>
                    {insDocument?.rto?.user?.name}
                </Typography>
                <Typography variant="xxs" color="text-[#24556D]">
                    {insDocument?.rto?.phone}
                </Typography>
                <Typography variant="xxs" color="text-[#24556D]">
                    {insDocument?.rto?.user?.email}
                </Typography>
            </div>
            <div className="col-span-2">
                <Typography variant="xxs" color="text-[#4A4A4A]">
                    Confirm By
                </Typography>
                <Typography variant="xxs" medium>
                    {insDocument?.confirmedBy}
                </Typography>
            </div>
            <div className="col-span-2">
                {isExpired ? (
                    <>
                        <Typography variant="xxs" color="text-[#4A4A4A]">
                            Expired
                        </Typography>
                        <Typography variant="xxs" color="text-[#24556D]" medium>
                            {moment(insDocument?.expiryDate).format(
                                'DD-MM-YYYY'
                            )}
                        </Typography>
                    </>
                ) : (
                    <>
                        <Typography variant="xxs" color="text-[#4A4A4A]">
                            Expiry
                        </Typography>
                        <Typography variant="xxs" color="text-[#24556D]" medium>
                            {moment(insDocument?.expiryDate).format(
                                'DD-MM-YYYY'
                            )}
                        </Typography>
                    </>
                )}
            </div>
            <div className="col-span-2 flex justify-end items-center">
                <Button text="View" variant="info" onClick={onViewDocument} />
            </div>
        </div>
    )
}
