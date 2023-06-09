import {
    Button,
    Card,
    InputContentEditor,
    inputEditorErrorMessage,
} from '@components'
import { useNotification } from '@hooks'
import React, { useEffect } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const ReplyTicketForm = ({
    onSubmit,
    result,
    isOpened,
}: {
    onSubmit: (values: any) => void
    result: any
    isOpened: boolean
}) => {
    const { notification } = useNotification()

    const validationSchema = yup.object({
        message: yup
            .mixed()
            .test('Message', 'Must Provide Message', (value) =>
                inputEditorErrorMessage(value)
            ),
    })

    const methods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    useEffect(() => {
        if (result.isSuccess) {
            notification.success({
                title: 'Reply Added',
                description: 'Reply Added Successfully',
            })
            methods.reset()
        }
    }, [result])

    return (
        <Card fullHeight>
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <InputContentEditor
                        name={'message'}
                        label={'Message'}
                        height={'h-36'}
                    />
                    <div className="mt-1">
                        <Button
                            submit
                            text={isOpened ? 'Reply' : 'Re Open'}
                            variant={isOpened ? 'dark' : 'info'}
                            loading={result.isLoading}
                            disabled={result.isLoading}
                        />
                    </div>
                </form>
            </FormProvider>
        </Card>
    )
}
