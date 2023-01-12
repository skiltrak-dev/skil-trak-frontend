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
    onCancel: Function
}

export const AddBreakForm = ({
    edit,
    result,
    initialValues,
    onCancel,
    setIsBreak,
    setBreakStart,
    setBreakEnd,
}: any) => {
    const [startBreak, setStartBreak] = useState<any | null>(null)
    const [endBreak, setEndBreak] = useState<any | null>(null)
    const validationSchema = yup.object({
        breakStart: yup.string().required('Start Time is required!'),
        breakEnd: yup.string().required('End Time is required!'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues,
        mode: 'all',
    })

    // useEffect(() => {
    //     if (result.isSuccess) {
    //         methods.reset()
    //     }
    // }, [result])

    const onSubmit = () => {
        setIsBreak(true)
        setBreakStart(startBreak)
        setBreakEnd(endBreak)
        onCancel()
    }

    return (
        <Modal
            onCancelClick={onCancel}
            onConfirmClick={onSubmit}
            title={''}
            subtitle={''}
        >
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
                    onChange={(e: any) => {
                        setStartBreak(e.target.value)
                    }}
                    required
                />

                <TextInput
                    label={'End Time'}
                    name={'breakEnd'}
                    type={'time'}
                    placeholder={'Your End Time Here...'}
                    validationIcons
                    onChange={(e: any) => {
                        setEndBreak(e.target.value)
                    }}
                    required
                />
            </div>
        </Modal>
    )
}
