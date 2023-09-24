import { TimerItem } from './TimerItem'
import Countdown from 'react-countdown'
import { ActionButton, Button } from '@components/buttons'
import { ReactElement, useEffect, useState } from 'react'
import moment from 'moment'
import { AiFillEdit } from 'react-icons/ai'
import { EditTimer } from './EditTimer'
import { Typography } from '@components/Typography'
import { UserRoles } from '@constants'
import { AuthorizedUserComponent } from '@components/AuthorizedUserComponent'
import { useCountDownRendered } from './useCountDownRendered'

export const StudentTimer = ({
    studentId,
    date,
    changeExpiryData,
    oldExpiry,
}: {
    studentId: number | undefined
    date: Date
    changeExpiryData?: any
    oldExpiry: Date | null
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

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
    const CountDownRendered = useCountDownRendered({
        onDateClick,
        date,
        oldExpiry,
    })

    return (
        <>
            {modal}
            {mounted ? (
                // <div className='bg-gray-700 text-white py-1 px-2 rounded-md'>
                <div className="flex items-center justify-center gap-x-3">
                    {oldExpiry && (
                        <div className="flex flex-col gap-y-1">
                            <Typography
                                variant={'muted'}
                                color={'text-gray-500'}
                            >
                                New Expiry date
                            </Typography>
                            <Typography variant={'label'}>
                                {moment(date).format('Do MMM YYYY')}
                            </Typography>
                        </div>
                    )}
                    <div className="relative group">
                        <Countdown date={date} renderer={CountDownRendered} />
                        <div className="group-hover:block hidden text-xs whitespace-nowrap shadow-lg text-gray-100 bg-gray-700 px-2 py-1 rounded-md absolute z-10 right-0">
                            Expires At {moment(date).format('DD MMMM, YYYY')}
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <Typography variant={'muted'} color={'text-gray-500'}>
                            Expires on
                        </Typography>
                        <Typography variant={'label'}>
                            {moment(oldExpiry ? oldExpiry : date).format(
                                'Do MMM YYYY'
                            )}
                        </Typography>
                    </div>
                    <AuthorizedUserComponent
                        roles={[
                            UserRoles.ADMIN,
                            UserRoles.RTO,
                            UserRoles.SUBADMIN,
                        ]}
                    >
                        <ActionButton
                            rounded
                            Icon={AiFillEdit}
                            variant={'info'}
                            title="Edit Expiry Date"
                            onClick={onDateClick}
                        />
                    </AuthorizedUserComponent>
                </div>
            ) : null}
        </>
    )
}
