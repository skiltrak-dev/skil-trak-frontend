import { Typography } from '@components/Typography'
import { calculateRemainingDays } from '@utils'
import moment from 'moment'
import React from 'react'
import { AiOutlineWarning } from 'react-icons/ai'

export const StudentExpiryDaysLeft = ({ expiryDate }: { expiryDate: Date }) => {
    const remainingDays = calculateRemainingDays(expiryDate)
    return expiryDate ? (
        <div className="relative group">
            <div className="flex items-center gap-x-2">
                {remainingDays < 20 && (
                    <AiOutlineWarning className="text-primary" />
                )}
                <Typography
                    variant={'small'}
                    color={
                        remainingDays < 20
                            ? 'text-primary'
                            : 'text-success-dark'
                    }
                >
                    <span className="font-semibold whitespace-pre">
                        {remainingDays} Days left
                    </span>
                </Typography>
            </div>
            <div className="group-hover:block hidden text-xs whitespace-nowrap shadow-lg text-gray-100 bg-gray-700 px-2 py-1 rounded-md absolute z-10 right-0">
                Expires At {moment(expiryDate).format('DD MMMM, YYYY')}
            </div>
        </div>
    ) : (
        <Typography variant="muted" color={'text-error-dark'}>
            <span className="font-semibold">Expiry Date Not Provided</span>
        </Typography>
    )
}
