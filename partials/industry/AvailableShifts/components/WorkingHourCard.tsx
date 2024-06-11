import React, { useState, ChangeEvent, useEffect } from 'react'

// components
import {
    Typography,
    TextInput,
    ActionButton,
    Switch,
    Button,
} from '@components'
import { AddShiftContext } from '../contextbar'
import { useContextBar } from '@hooks'
import { AddBreakForm } from '../form'
import { getDate } from '@utils'
import moment from 'moment'

export const WorkingHourCard = ({
    availability,
    setScheduleTime,
    onScheduleChange,
}: {
    availability?: any
    setScheduleTime?: any
    onScheduleChange: Function
}) => {
    const contextBar = useContextBar()

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

    const onAddShift = () => {
        contextBar.setContent(<AddShiftContext availability={availability} />)
        contextBar.show()
        contextBar.setTitle('Free Shift')
    }

    const onBreakSubmit = (values: any) => {
        setBreakStart(values?.breakStart)
        setBreakEnd(values?.breakEnd)
        setIsBreak(true)
        contextBar.hide()
    }

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

    return (
        <>
            {modal && modal}
            <div className="bg-gray-100 rounded-lg px-6 grid grid-cols-1 md:grid-cols-10 gap-x-3 gap-y-1.5 py-2.5 items-center">
                <div className="col-span-2 flex flex-col justify-start items-sart gap-y-2">
                    <div className="flex items-center gap-x-2">
                        <Switch
                            name={availability?.day}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setIsAvailable(e.target.checked)
                            }}
                            defaultChecked={isAvailable}
                        />
                        <Typography capitalize>{availability?.day}</Typography>
                    </div>
                </div>
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

                <div className="flex flex-col gap-x-2.5 col-span-3">
                    {isBreak && (
                        <>
                            <Typography
                                variant={'small'}
                                color={'text-gray-500'}
                            >
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
                        </>
                    )}
                    {/* <Switch
                        name={availability?.day}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setIsBreak(e.target.checked)
                        }}
                        defaultChecked={isBreak}
                    /> */}
                    {/* <TextInput
                        label={'Break Start'}
                        name={'breakStart'}
                        type={'time'}
                        placeholder={'Your Break Start Here...'}
                        validationIcons
                        required
                        disabled={!isAvailable}
                    />

                    <TextInput
                        label={'Break End'}
                        name={'breakEnd'}
                        type={'time'}
                        placeholder={'Your Break End Here...'}
                        validationIcons
                        required
                        disabled={!isAvailable}
                    /> */}
                </div>

                <div className="flex items-center gap-x-4  justify-end  col-span-2">
                    <Button
                        text={'Break'}
                        variant={'info'}
                        onClick={onAddBreak}
                        disabled={!isAvailable}
                    />
                    <Button
                        text={'Free Shift'}
                        onClick={onAddShift}
                        disabled={!isAvailable || !availability?.id}
                    />
                </div>
            </div>
        </>
    )
}
