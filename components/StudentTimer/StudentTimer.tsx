import { TimerItem } from './TimerItem'
import Countdown from 'react-countdown'
import { Button } from '@components/buttons'
import { useEffect, useState } from 'react'
import moment from 'moment'

export const StudentTimer = ({ date }: { date: Date }) => {
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
                    <button className="text-xs font-medium text-red-200 hover:text-white">
                        Click To Re-Activate
                    </button>
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

    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])
    return mounted ? (
        // <div className='bg-gray-700 text-white py-1 px-2 rounded-md'>
        <div className="relative group">
            <Countdown date={date} renderer={countDownRendered} />
            <div className="group-hover:block hidden text-xs whitespace-nowrap shadow-lg text-gray-100 bg-gray-700 px-2 py-1 rounded-md absolute z-10 right-0">
                Expires At {moment(date).format('DD MMMM, YYYY')}
            </div>
        </div>
    ) : null
}
