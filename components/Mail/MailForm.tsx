import { useEffect } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'

// icons
import { IoMdSend } from 'react-icons/io'
import { MdOutlineCancel } from 'react-icons/md'

// components
import { Card, TextInput, Select, Button, TextArea } from '@components'

import { useContextBar } from 'hooks'
import { elipiciseText } from '@utils'

// import { useMessage } from 'hooks'

// functions
import { AuthUtils, userStatus } from '@utils'

export const MailForm = ({ action, receiverId, sender }: any) => {
    // const { replyMessage, setReplyMessage, setMessage } = useMessage()
    const { isVisible } = useContextBar()
    // query
    const [actionData, actionDataResult] = action()

    const validationSchema = yup.object({
        subject: yup.string().required('Must provide subject'),
        message: yup.string().required('Must provide message'),
        templates: yup.object().required('Must provide tamplate'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })
    useEffect(() => {
        if (actionDataResult.isSuccess) {
            methods.reset()
        }
    }, [actionDataResult.isSuccess])

    const onSubmit = (values: any) => {
        // setResetFormData(resetForm)
        console.log('values', values)
        const userCredentials = AuthUtils.getUserCredentials()
        console.log('userCredentials', userCredentials)
        const date = new Date()
        const parent = -1
        // const parent = replyMessage?.id
        actionData({
            // parent,
            subject: values.subject,
            message: values.message,
            type: 'email',
            sender: userCredentials?.id,
            receiver: receiverId,
            // receiver: receiverId || 64,
        })
        // setReplyMessage(null)
    }

    const tamplates = [
        {
            label: 'Tamplate',
            value: 'tamplate',
        },
    ]

    return (
        <>
            <div className={`sticky ${isVisible ? 'bottom-0' : ' top-0'}`}>
                <Card>
                    <FormProvider {...methods}>
                        <form
                            className="mt-2 w-full"
                            onSubmit={methods.handleSubmit(onSubmit)}
                        >
                            {/* {replyMessage && (
                                <div className="mb-2 flex justify-between items-center">
                                    <span>
                                        Reply To :{' '}
                                        {elipiciseText(
                                            replyMessage?.message,
                                            55
                                        )}
                                    </span>
                                    <MdOutlineCancel
                                        className="cursor-pointer"
                                        onClick={() => setReplyMessage(null)}
                                    />
                                </div>
                            )} */}
                            <div
                                className={`grid gap-x-4 ${
                                    isVisible ? 'grid-cols-2' : 'grid-cols-1'
                                }`}
                            >
                                <TextInput
                                    label={'To (optional)'}
                                    name={'to'}
                                    type={'email'}
                                    placeholder={'Reciever Email...'}
                                    validationIcons
                                />
                                <TextInput
                                    label={'CC (optional)'}
                                    name={'cc'}
                                    type={'email'}
                                    placeholder={'CC Email...'}
                                    validationIcons
                                />
                                <TextInput
                                    label={'Subject'}
                                    name={'subject'}
                                    placeholder={'Your Subject...'}
                                    validationIcons
                                    required
                                />

                                <TextArea label={'Message'} name={'message'} />

                                <Select
                                    label={'Templates'}
                                    name={'templates'}
                                    defaultValue={tamplates}
                                    options={tamplates}
                                    validationIcons
                                    loading={false}
                                    disabled={false}
                                />

                                <div className="flex justify-between items-center gap-x-4 mt-2">
                                    {/* <UploadFile
                                        small
                                        name={'file'}
                                        touched={touched}
                                        fileupload={setFieldValue}
                                    /> */}
                                    <Button
                                        submit
                                        loading={actionDataResult?.isLoading}
                                        disabled={actionDataResult?.isLoading}
                                    >
                                        <span>Send</span>
                                        <IoMdSend />
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
