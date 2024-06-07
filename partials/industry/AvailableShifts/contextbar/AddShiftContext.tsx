import {
    ContextBarLoading,
    NoData,
    LoadingAnimation,
    Typography,
} from '@components'
import { useNotification, useContextBar } from '@hooks'
import { AdminApi, useAddShiftMutation, useGetShiftsQuery } from '@queries'

import { Fragment, useEffect } from 'react'
import { AddShiftForm } from '../form'

// components
import { ShiftCard } from '../components'

export const AddShiftContext = ({ availability }: { availability: any }) => {
    const { notification } = useNotification()
    const contextBar = useContextBar()

    const [addShift, addShiftResult] = useAddShiftMutation()
    const shifts = useGetShiftsQuery(availability?.id, {
        skip: !availability?.id,
    })

    useEffect(() => {
        if (addShiftResult.isSuccess) {
            notification.success({
                title: 'Shift Added',
                description: 'Shift Added Successfully',
            })
            contextBar.setContent(null)
            contextBar.hide()
        }

        if (addShiftResult.isError) {
            notification.error({
                title: 'Courses Assignment Failed',
                description: 'An error occurred while assigning course(s)',
            })
        }
    }, [addShiftResult])

    const onSubmit = (values: any) => {
        addShift({ workingHours: availability?.id, ...values })
    }

    return (
        <div className="flex flex-col gap-y-6">
            <div>
                <Typography variant={'muted'} color={'text-gray-400'}>
                    Day:
                </Typography>
                <Typography variant={'label'}>{availability?.day}</Typography>
            </div>

            <AddShiftForm onSubmit={onSubmit} result={addShiftResult} />

            <div className={'flex flex-col gap-y-2'}>
                <Typography variant={'muted'} color={'text-gray-400'}>
                    Shifts
                </Typography>
            </div>

            {shifts.isError && <NoData text={'Network Error'} />}
            {shifts?.isLoading ? (
                <LoadingAnimation size={70} />
            ) : shifts?.data && shifts?.data?.length > 0 ? (
                <div>
                    <div className="grid grid-cols-3 gap-x-1.5">
                        <Typography variant={'muted'}>Opening Time</Typography>
                        <Typography variant={'muted'}>Closing Time</Typography>
                        <Typography variant={'muted'}>
                            Student Capacity
                        </Typography>
                    </div>
                    <div className="flex flex-col gap-y-1.5 mt-1.5">
                        {shifts?.data?.map((shift: any) => (
                            <ShiftCard shift={shift} />
                        ))}
                    </div>
                </div>
            ) : (
                !shifts.isError && <NoData text={'No Shifts were found'} />
            )}
        </div>
    )
}
