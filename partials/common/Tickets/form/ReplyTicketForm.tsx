import { Button, Card, InputContentEditor } from '@components'
import React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'

export const ReplyTicketForm = ({
    onSubmit,
}: {
    onSubmit: (values: any) => void
}) => {
    const methods = useForm({
        mode: 'all',
    })
    return (
        <Card>
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <InputContentEditor
                        name={'message'}
                        label={'Message'}
                        height={'h-44'}
                    />
                    <Button submit text={'Reply'} variant={'dark'} />
                </form>
            </FormProvider>
        </Card>
    )
}
