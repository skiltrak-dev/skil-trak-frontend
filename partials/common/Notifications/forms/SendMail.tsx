import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

// icons
import { IoMdSend } from 'react-icons/io'

// components
import {
    Button,
    Card,
    ShowErrorNotifications,
    TextArea,
    TextInput,
} from '@components'

// import { useMessage } from 'hooks'

// functions
import { CommonApi } from '@queries'
import { AuthUtils } from '@utils'
import { useContextBar, useNotification } from '@hooks'

export const SendMail = () => {
    const [cc, setCc] = useState(false)

    const { notification } = useNotification()
    const contextBar = useContextBar()

    const [sendMessage, sendMessageResult] =
        CommonApi.Messages.sendCustomEmail()

    useEffect(() => {
        if (sendMessageResult.isSuccess) {
            notification.success({
                title: 'Email Sent',
                description: 'Email Sent Successfully',
            })
            // contextBar.setContent(null)
            // contextBar.hide()
        }
    }, [sendMessageResult])

    const validationSchema = yup.object({
        receiver: yup.string().email().required('Must provide Receiver Email'),
        subject: yup.string().required('Must provide subject'),
        message: yup.string().required('Must provide message'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onSubmit = (values: any) => {
        sendMessage({ ...values, type: 'email' })
    }

    return (
        <>
            <ShowErrorNotifications result={sendMessageResult} />
            <div className={`sticky top-4`}>
                <Card>
                    <div className="flex justify-end items-center gap-x-1">
                        <button
                            className="px-2 text-sm text-gray-400 hover:text-gray-600"
                            onClick={() => setCc(!cc)}
                        >
                            CC
                        </button>
                    </div>
                    <FormProvider {...methods}>
                        <form
                            className="mt-2 w-full"
                            onSubmit={methods.handleSubmit(onSubmit)}
                        >
                            <div>
                                <TextInput
                                    label={'To'}
                                    name={'receiver'}
                                    required
                                    type={'email'}
                                    placeholder={'Reciever Email...'}
                                    validationIcons
                                />

                                {cc ? (
                                    <TextInput
                                        label={'CC (optional)'}
                                        name={'cc'}
                                        type={'email'}
                                        placeholder={'CC Email...'}
                                        validationIcons
                                    />
                                ) : null}
                                <TextInput
                                    label={'Subject'}
                                    name={'subject'}
                                    placeholder={'Your Subject...'}
                                    validationIcons
                                    required
                                />

                                <TextArea
                                    label={'Message'}
                                    name={'message'}
                                    rows={4}
                                    placeholder={'Your Message ...'}
                                />

                                <div className="flex justify-between items-center gap-x-4 mt-2">
                                    <Button
                                        submit
                                        loading={sendMessageResult?.isLoading}
                                        disabled={sendMessageResult?.isLoading}
                                    >
                                        <div className="flex items-center gap-x-2">
                                            <span>Send</span>
                                            <IoMdSend />
                                        </div>
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </FormProvider>
                </Card>
            </div>
        </>
    )
}
