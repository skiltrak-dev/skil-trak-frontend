import { Button, TextInput, Typography } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { Course } from '@types'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

interface FormProps {
    result: any
    onSubmit: any
    edit?: boolean
    initialValues?: any
}

export const AddShiftForm = ({
    edit,
    result,
    onSubmit,
    initialValues,
}: any) => {
    const validationSchema = yup.object({
        openingTime: yup.string().required('Start Time is required!'),
        closingTime: yup.string().required('End Time is required!'),
        studentCapacity: yup.string().required('Student Capacity is required!'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues,
        mode: 'all',
    })

    useEffect(() => {
        if (result.isSuccess) {
            methods.reset()
        }
    }, [result])

    return (
        <FormProvider {...methods}>
            <form
                className="mt-2 w-full"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <div className={'flex flex-col'}>
                    <Typography variant={'muted'} color={'text-gray-400'}>
                        Add Shift
                    </Typography>

                    <TextInput
                        label={'Start Time'}
                        name={'openingTime'}
                        type={'time'}
                        placeholder={'Your Start Time Here...'}
                        validationIcons
                        required
                    />

                    <TextInput
                        label={'End Time'}
                        name={'closingTime'}
                        type={'time'}
                        placeholder={'Your End Time Here...'}
                        validationIcons
                        required
                    />

                    <TextInput
                        label={'Student Capacity'}
                        name={'studentCapacity'}
                        type={'number'}
                        placeholder={'Your Student Capacity Here...'}
                        validationIcons
                        required
                    />

                    <div className="flex">
                        <Button
                            submit
                            text="Save"
                            loading={result.isLoading}
                            disabled={result.isLoading}
                        />
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}
