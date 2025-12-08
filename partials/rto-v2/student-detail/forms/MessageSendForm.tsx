import React from 'react'
import { Button, TextArea } from '@components'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

export const MessageSendForm = ({
    result,
    onSubmit,
}: {
    result: any
    onSubmit: (values: any) => void
}) => {
    const validationSchema = Yup.object({
        message: Yup.string().required('Message is required!'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })
    return (
        <div>
            {' '}
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div className="">
                        <TextArea
                            label={'Message'}
                            name={'message'}
                            placeholder={'Your Messages Here...'}
                            validationIcons
                            required
                            showError={true}
                            rows={4}
                        />
                    </div>

                    <div className="w-[168px]">
                        <Button
                            submit
                            fullWidth
                            // disabled={!(isValid && dirty)}
                            loading={result.isLoading}
                            disabled={result.isLoading}
                        >
                            SEND
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
