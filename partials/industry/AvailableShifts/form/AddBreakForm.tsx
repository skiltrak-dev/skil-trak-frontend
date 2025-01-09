import { Button, TextInput, Typography, Modal } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { Course } from '@types'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useState } from 'react'

interface FormProps {
    result: any
    onSubmit: any
    edit?: boolean
    initialValues?: any
    onCancel: () => void
}

export const AddBreakForm = ({
    initialValues,
    onCancel,
    setIsBreak,
    setBreakStart,
    setBreakEnd,
}: {
    initialValues: any
    onCancel: any
    setIsBreak: any
    setBreakStart: any
    setBreakEnd: any
}) => {
    const validationSchema = yup.object({
        breakStart: yup.string().required('Start Time is required!'),
        breakEnd: yup.string().required('End Time is required!'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues,
        mode: 'all',
    })

    const onSubmit = () => {
        // if (startBreak && endBreak) {
        //     setIsBreak(true)
        //     setBreakStart(startBreak)
        //     setBreakEnd(endBreak)
        //     onCancel()
        // }
    }

    return (
        <Modal
            onCancelClick={onCancel}
            onConfirmClick={methods.handleSubmit((values) => {
                setIsBreak(true)
                setBreakStart(values.breakStart)
                setBreakEnd(values.breakEnd)
                onCancel()
            })}
            title={'Add Break'}
            subtitle={'Break Time'}
        >
            <FormProvider {...methods}>
                <form>
                    <div className={'flex flex-col gap-y-2'}>
                        <Typography variant={'muted'} color={'text-gray-400'}>
                            Add Shift
                        </Typography>

                        <TextInput
                            label={'Start Time'}
                            name={'breakStart'}
                            type={'time'}
                            placeholder={'Your Start Time Here...'}
                            validationIcons
                            required
                        />

                        <TextInput
                            label={'End Time'}
                            name={'breakEnd'}
                            type={'time'}
                            placeholder={'Your End Time Here...'}
                            validationIcons
                            required
                        />
                    </div>
                </form>
            </FormProvider>
        </Modal>
    )
}
