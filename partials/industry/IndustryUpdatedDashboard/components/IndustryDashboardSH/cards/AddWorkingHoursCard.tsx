import { Button, Switch, TextInput, Typography } from '@components'
import { AddBreakForm } from '@partials/industry/AvailableShifts/form'
import moment from 'moment'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { AddShiftModal } from '../modal'

export const AddWorkingHoursCard = ({
    availability,
    onScheduleChange,
}: {
    availability: any
    onScheduleChange: (values: any) => any
}) => {
    const [modal, setModal] = useState<any | null>(null)
    const [isAvailable, setIsAvailable] = useState<boolean>(availability?.dayOn)

    const [openingTime, setOpeningTime] = useState<any>(
        availability?.openingTime
    )
    const [closingTime, setClosingTime] = useState<any>(
        availability?.closingTime
    )

    const [isBreak, setIsBreak] = useState<any>(availability?.break)
    const [breakStart, setBreakStart] = useState<any>(availability?.breakStart)
    const [breakEnd, setBreakEnd] = useState<any>(availability?.breakEnd)

    useEffect(() => {
        setIsAvailable(availability?.dayOn)
    }, [availability?.dayOn])

    useEffect(() => {
        onScheduleChange({
            day: availability.day,
            openingTime,
            closingTime,
            breakStart,
            breakEnd,
            break: isBreak,
            dayOn: isAvailable,
        })
    }, [isAvailable, openingTime, closingTime, breakStart, breakEnd, isBreak])

    const onCancel = () => {
        setModal(null)
    }

    const onAddBreak = () => {
        setModal(
            <AddBreakForm
                initialValues={{
                    breakStart: availability?.breakStart,
                    breakEnd: availability?.breakEnd,
                }}
                onCancel={onCancel}
                setIsBreak={setIsBreak}
                setBreakStart={setBreakStart}
                setBreakEnd={setBreakEnd}
            />
        )
    }

    const onAddShift = () => {
        setModal(
            <AddShiftModal availability={availability} onCancel={onCancel} />
        )
    }

    return (
        <>
            {modal}
            <div className="bg-gray-100 rounded-md p-2 shadow flex flex-col gap-y-2">
                <div className="flex justify-between items-center">
                    <Typography
                        color="text-gray-600"
                        capitalize
                        variant="label"
                    >
                        {availability?.day}
                    </Typography>
                    <Switch
                        name={availability?.day}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setIsAvailable(e.target.checked)
                        }}
                        defaultChecked={isAvailable}
                    />
                </div>

                {/*  */}
                <div className="flex gap-x-2.5  col-span-3">
                    <TextInput
                        label={'Opening'}
                        type={'time'}
                        name={'openingTime'}
                        disabled={!isAvailable}
                        onChange={(e: any) => {
                            setOpeningTime(e.target.value)
                        }}
                        value={openingTime}
                        showError={false}
                    />
                    <TextInput
                        label={'Closing'}
                        type={'time'}
                        name={'closingTime'}
                        disabled={!isAvailable}
                        onChange={(e: any) => {
                            setClosingTime(e.target.value)
                        }}
                        value={closingTime}
                        showError={false}
                    />
                </div>

                {/*  */}
                {isBreak ? (
                    <div className="flex flex-col gap-x-2.5 col-span-3">
                        <Typography variant={'small'} color={'text-gray-500'}>
                            Break
                        </Typography>
                        <div className="flex items-center gap-x-2">
                            <div className="flex items-center gap-x-2">
                                <Typography
                                    variant={'small'}
                                    color={'text-gray-700'}
                                >
                                    Break Start:
                                </Typography>
                                <Typography variant={'label'}>
                                    {moment(breakStart, 'hh:mm').format(
                                        'hh:mm a'
                                    )}
                                </Typography>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <Typography
                                    variant={'small'}
                                    color={'text-gray-700'}
                                >
                                    Break End:
                                </Typography>
                                <Typography variant={'label'}>
                                    {moment(breakEnd, 'hh:mm').format(
                                        'hh:mm a'
                                    )}
                                </Typography>
                            </div>
                        </div>
                    </div>
                ) : null}

                {/*  */}
                <div className="flex items-center gap-x-3  justify-between  col-span-2">
                    <Button
                        fullWidth
                        text={'Break'}
                        variant={'info'}
                        onClick={onAddBreak}
                        disabled={!isAvailable}
                    />
                    <Button
                        fullWidth
                        text={'Add Placement Shifts'}
                        onClick={onAddShift}
                        disabled={!isAvailable || !availability?.id}
                    />
                </div>
            </div>
        </>
    )
}
