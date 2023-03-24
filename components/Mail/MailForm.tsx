import { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'

// icons
import { IoMdSend } from 'react-icons/io'
import { MdOutlineCancel } from 'react-icons/md'

// components
import { Card, TextInput, Select, Button, TextArea } from '@components'
import { FileUpload } from '@hoc'

import { useContextBar } from 'hooks'
import { ellipsisText } from '@utils'

// import { useMessage } from 'hooks'

// functions
import { AuthUtils, userStatus } from '@utils'
import { CommonApi } from '@queries'
import { Attachment } from '@partials/common'

export const MailForm = ({ action, receiverId, sender }: any) => {
    // const { replyMessage, setReplyMessage, setMessage } = useMessage()
    // query
    const [to, setTo] = useState(false)
    const [cc, setCc] = useState(false)
    const [attachmentFiles, setAttachmentFiles] = useState<any>([])

    const [actionData, actionDataResult] = action()
    const [sendMessage, sendMessageResult] = CommonApi.Messages.useSendMessage()

    const validationSchema = yup.object({
        subject: yup.string().required('Must provide subject'),
        message: yup.string().required('Must provide message'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    useEffect(() => {
        if (attachmentFiles) {
            methods.setValue('attachment', attachmentFiles)
        }
    }, [attachmentFiles])

    useEffect(() => {
        if (sendMessageResult.isSuccess) {
            methods.reset()
            methods.setValue('attachment', null)
        }
    }, [sendMessageResult])

    const onRemoveFile = (fileId: number) => {
        setAttachmentFiles((preVal: any) => [
            ...preVal?.filter((file: File) => file?.lastModified !== fileId),
        ])
    }

    const onFileUpload = ({
        name,
        fileList,
    }: {
        name: string
        fileList: any
    }) => {
        return (
            <Attachment
                name={name}
                fileList={attachmentFiles}
                onRemoveFile={onRemoveFile}
            />
        )
    }

    const onSubmit = (values: any) => {
        console.log('Daad')
        const userCredentials = AuthUtils.getUserCredentials()
        const date = new Date()
        const parent = -1
        // const parent = replyMessage?.id
        const formData = new FormData()

        const { attachment, ...rest } = values
        const data = {
            subject: values.subject,
            message: values.message,
            type: 'email',
            sender: userCredentials?.id,
            receiver: receiverId,
            // receiver: receiverId || 64,
        }

        Object.entries(data)?.forEach(([key, value]: any) => {
            formData.append(key, value)
        })

        attachment &&
            attachment?.forEach((attached: File) => {
                formData.append('attachment', attached)
            })
        sendMessage(formData)
        // setReplyMessage(null)
    }

    const templates = [
        {
            label: 'Template',
            value: 'template',
        },
    ]

    return (
        <>
            <div className={`sticky top-4`}>
                <Card>
                    <div className="flex justify-end items-center gap-x-1">
                        <button
                            className="px-2 text-sm text-gray-400 hover:text-gray-600"
                            onClick={() => setTo(!to)}
                        >
                            To
                        </button>
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
                            <div>
                                {to ? (
                                    <TextInput
                                        label={'To (optional)'}
                                        name={'to'}
                                        type={'email'}
                                        placeholder={'Reciever Email...'}
                                        validationIcons
                                    />
                                ) : null}
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
                                    required
                                    rows={4}
                                    placeholder={'Your Message ...'}
                                />

                                {/* <Select
                                    label={'Templates'}
                                    name={'templates'}
                                    defaultValue={templates}
                                    options={templates}
                                    validationIcons
                                    loading={false}
                                    disabled={false}
                                /> */}

                                <div className="flex justify-between items-center gap-x-4 mt-2">
                                    {/* <UploadFile
                                        small
                                        name={'file'}
                                        touched={touched}
                                        fileupload={setFieldValue}
                                    /> */}
                                    <FileUpload
                                        onChange={(docs: FileList) => {
                                            setAttachmentFiles(
                                                (preVal: any) => [
                                                    ...preVal,
                                                    ...docs,
                                                ]
                                            )
                                        }}
                                        name={'attachment'}
                                        component={onFileUpload}
                                        multiple
                                        limit={Number(1111111111)}
                                    />
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
