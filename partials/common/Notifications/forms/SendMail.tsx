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
import { FileUpload } from '@hoc'
import { useContextBar, useNotification } from '@hooks'
import { CommonApi } from '@queries'
import { Attachment } from './Attachment'

export const SendMail = () => {
    const [cc, setCc] = useState(false)
    const [attachmentFiles, setAttachmentFiles] = useState<any>([])

    const { notification } = useNotification()
    const contextBar = useContextBar()

    const [sendMessage, sendMessageResult] =
        CommonApi.Messages.sendCustomEmail()

    useEffect(() => {
        if (attachmentFiles) {
            methods.setValue('attachment', attachmentFiles)
        }
    }, [attachmentFiles])

    useEffect(() => {
        if (sendMessageResult.isSuccess) {
            notification.success({
                title: 'Email Sent',
                description: 'Email Sent Successfully',
            })
            contextBar.setContent(null)
            contextBar.hide()
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
        const formData = new FormData()

        const { attachment, ...rest } = values

        Object.entries(rest)?.forEach(([key, value]: any) => {
            formData.append(key, value)
        })

        attachment?.forEach((attched: File) => {
            formData.append('attachment', attched)
        })
        formData.append('type', 'email')

        sendMessage(formData)
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
