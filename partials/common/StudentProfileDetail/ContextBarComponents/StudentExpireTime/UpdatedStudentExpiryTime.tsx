import Countdown from 'react-countdown'
import { ActionButton, Button } from '@components/buttons'
import { ReactElement, useEffect, useState } from 'react'
import moment from 'moment'
import { AiFillEdit } from 'react-icons/ai'
import { Typography } from '@components/Typography'
import { UserRoles } from '@constants'
import { AuthorizedUserComponent } from '@components/AuthorizedUserComponent'
import { EditTimer } from '@components/StudentTimer/EditTimer'
import { useCountDownRendered } from '@components/StudentTimer/useCountDownRendered'

export const UpdatedStudentExpiryTime = ({
    studentId,
    date,
    oldExpiry,
}: {
    studentId: number | undefined
    date: Date
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
                <div className="flex flex-col items-center justify-center gap-x-3 gap-y-2 w-full">
                    <div className="relative group flex justify-center gap-x-2.5 w-full bg-[#e6f3ff] rounded-md p-1.5">
                        <Countdown date={date} renderer={CountDownRendered} />
                        <div className="w-full flex flex-col gap-y-0.5">
                            <Typography
                                variant={'xxs'}
                                color={'text-gray-500'}
                                medium
                            >
                                Expires on
                            </Typography>
                            <Typography variant={'xs'} semibold>
                                <span className="whitespace-pre">
                                    {moment(
                                        oldExpiry ? oldExpiry : date
                                    ).format('Do MMM YYYY')}
                                </span>
                            </Typography>
                        </div>
                        <div className="group-hover:block hidden text-xs whitespace-nowrap shadow-lg text-gray-100 bg-gray-700 px-2 py-1 rounded-md absolute z-10 right-0">
                            Expires At {moment(date).format('DD MMMM, YYYY')}
                        </div>
                    </div>
                    <div className="flex justify-between gap-x-2 w-full">
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
                        {oldExpiry && (
                            <div className="flex flex-col gap-y-0.5 w-full rounded-md bg-slate-300 py-1.5 px-2">
                                <Typography
                                    variant={'xxs'}
                                    color={'text-gray-500'}
                                    medium
                                >
                                    New Expiry date
                                </Typography>
                                <Typography variant={'xs'} semibold>
                                    {moment(date).format('Do MMM YYYY')}
                                </Typography>
                            </div>
                        )}
                    </div>
                    {/*  */}
                </div>
            ) : null}
        </>
    )
}
