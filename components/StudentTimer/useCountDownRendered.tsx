import { AuthorizedUserComponent } from '@components/AuthorizedUserComponent'
import { Typography } from '@components/Typography'
import { UserRoles } from '@constants'
import moment from 'moment'
import React from 'react'
import { TimerItem } from './TimerItem'

export const useCountDownRendered = ({
    date,
    oldExpiry,
    onDateClick,
}: {
    date: Date
    oldExpiry: Date | null
    onDateClick?: any
}) => {
    const CountDownRendered = ({
        days,
        hours,
        minutes,
        seconds,
        completed,
    }: {
        days: number
        hours: number
        minutes: number
        seconds: number
        completed: boolean
    }) => {
        if (completed) {
            return (
                <>
                    <div className="bg-red-500 rounded-md py-2 px-4">
                        <p className="text-sm font-semibold text-red-50">
                            Your account is expired
                        </p>
                        <AuthorizedUserComponent
                            roles={[
                                UserRoles.ADMIN,
                                UserRoles.SUBADMIN,
                                UserRoles.RTO,
                            ]}
                        >
                            <button
                                onClick={onDateClick}
                                className="text-xs font-medium text-red-200 hover:text-white"
                            >
                                Click To Re-Activate
                            </button>
                        </AuthorizedUserComponent>
                        <Typography variant={'small'} color={'text-white'}>
                            Expired on{' '}
                            {moment(oldExpiry ? oldExpiry : date).format(
                                'MMM Do YYYY'
                            )}
                        </Typography>
                    </div>
                </>
            )
        } else {
            return (
                <div className="flex items-center gap-x-2">
                    <TimerItem value={days} title={'days'} />
                    <TimerItem value={hours} title={'hours'} />
                    <TimerItem value={minutes} title={'minutes'} />
                    <TimerItem value={seconds} title={'seconds'} />
                </div>
            )
        }
    }

    return CountDownRendered
}
