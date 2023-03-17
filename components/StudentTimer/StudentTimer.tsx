import { TimerItem } from './TimerItem'
import Countdown from 'react-countdown'
import { ActionButton, Button } from '@components/buttons'
import { ReactElement, useEffect, useState } from 'react'
import moment from 'moment'
import { AiFillEdit } from 'react-icons/ai'
import { EditTimer } from './EditTimer'
import { Typography } from '@components/Typography'

export const StudentTimer = ({
    studentId,
    date,
    studentStatus,
    changeExpiryData,
}: {
    studentId: number | undefined
    date: Date
    studentStatus: string
    changeExpiryData?: any
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    const countDownRendered = ({
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
                <div className="bg-red-500 rounded-md py-2 px-4">
                    <p className="text-sm font-semibold text-red-50">
                        Your account is expired
                    </p>
                    <button
                        onClick={onDateClick}
                        className="text-xs font-medium text-red-200 hover:text-white"
                    >
                        Click To Re-Activate
                    </button>
                    <Typography variant={'small'} color={'text-white'}>
                        Expired on {moment(date).format('MMM Do YYYY')}
                    </Typography>
                </div>
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

    const onCancelClicked = () => {
        setModal(null)
    }

    const onDateClick = () => {
        setModal(
            <EditTimer
                studentId={studentId}
                date={date}
                onCancel={onCancelClicked}
                changeExpiryData={changeExpiryData}
            />
        )
    }
    return (
        <>
            {modal}
            {mounted ? (
                // <div className='bg-gray-700 text-white py-1 px-2 rounded-md'>
                <div className="flex items-center justify-center gap-x-3">
                    <div className="relative group">
                        <Countdown date={date} renderer={countDownRendered} />
                        <div className="group-hover:block hidden text-xs whitespace-nowrap shadow-lg text-gray-100 bg-gray-700 px-2 py-1 rounded-md absolute z-10 right-0">
                            Expires At {moment(date).format('DD MMMM, YYYY')}
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <Typography variant={'muted'} color={'text-gray-500'}>
                            Expires on
                        </Typography>
                        <Typography variant={'label'}>
                            {moment(date).format('Do MMM YYYY')}
                        </Typography>
                    </div>
                    <ActionButton
                        rounded
                        Icon={AiFillEdit}
                        variant={'info'}
                        title="Edit Expiry Date"
                        onClick={onDateClick}
                    />
                </div>
            ) : null}
        </>
    )
}
