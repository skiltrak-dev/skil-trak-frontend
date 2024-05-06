import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, TextInput, Typography } from '@components'
type KpisFilterModalProps = {
    onCancel: any
    setStartDate?: any
    setEndDate?: any
}
export const KpisFilterModal = ({
    onCancel,
    setStartDate,
    setEndDate,
}: KpisFilterModalProps) => {
    const validationSchema = yup.object().shape({
        from: yup.date(),
        to: yup
            .date()
            .min(yup.ref('from'), "end date can't be before start date"),
    })
    const methods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
        // defaultValues: { ...editValues, body: bodyData },
    })
    const onSubmit = (data: any) => {
        setStartDate(data?.from.toISOString().slice(0, 10))
        setEndDate(data?.to.toISOString().slice(0, 10))
        onCancel()
        methods.reset()
    }
    return (
        <div className="pb-9 pt-10 px-5">
            <div className="mb-12 flex justify-center">
                <Typography
                    variant="label"
                    color="text-primaryNew"
                    uppercase
                    bold
                >
                    Showing Result
                </Typography>
            </div>{' '}
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <TextInput
                        name="from"
                        label={'From'}
                        shadow="shadow-lg"
                        type="date"
                    />
                    <TextInput
                        name="to"
                        label={'To'}
                        shadow="shadow-lg"
                        type="date"
                    />
                    <div className="flex items-center justify-center gap-x-2">
                        <Button variant="primaryNew" text="save" submit />
                        <Button
                            variant="error"
                            text="cancel"
                            onClick={onCancel}
                        />
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
