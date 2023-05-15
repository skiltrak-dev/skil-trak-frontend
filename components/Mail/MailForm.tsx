import { useCallback, useEffect, useRef, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { debounce } from 'lodash'

// icons
import { IoMdSend } from 'react-icons/io'
import { MdOutlineCancel } from 'react-icons/md'

// components
import {
    Card,
    TextInput,
    Select,
    Button,
    TextArea,
    ShowErrorNotifications,
} from '@components'
import { FileUpload } from '@hoc'

import { useContextBar, useNotification } from 'hooks'
import { ellipsisText } from '@utils'

// import { useMessage } from 'hooks'

// functions
import { AuthUtils, userStatus } from '@utils'
import { CommonApi } from '@queries'
import { Attachment } from '@partials/common'

export const MailForm = ({ action, receiverId, sender }: any) => {
    // const { replyMessage, setReplyMessage, setMessage } = useMessage()
    const { notification } = useNotification()
    const [isSendDraft, setIsSendDraft] = useState<boolean>(true)
    const [sendEmailDraft, setSendEmailDraft] = useState<boolean>(true)

    const ref = useRef<HTMLDivElement>(null)
    let activeDivRef = useRef<any>(null)

    // query
    const [to, setTo] = useState(false)
    const [cc, setCc] = useState(false)
    const [attachmentFiles, setAttachmentFiles] = useState<any>([])

    const [actionData, actionDataResult] = action()
    const [sendMessage, sendMessageResult] = CommonApi.Messages.useSendMessage()
    const [emailDraft, emailDraftResult] = CommonApi.Draft.useEmailDraft()
    const getEmailDraft = CommonApi.Draft.useGetEmailDraft(receiverId, {
        skip: !receiverId,
    })

    const validationSchema = yup.object({
        subject: yup.string().required('Must provide subject'),
        message: yup.string().required('Must provide message'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    useEffect(() => {
        if (getEmailDraft.isSuccess) {
            if (getEmailDraft?.data?.content) {
                methods.setValue('message', getEmailDraft?.data?.content)
            }
            if (getEmailDraft?.data?.title) {
                methods.setValue('subject', getEmailDraft?.data?.title)
            }
        }
    }, [getEmailDraft.isSuccess])

    useEffect(() => {
        if (attachmentFiles) {
            methods.setValue('attachment', attachmentFiles)
        }
    }, [attachmentFiles])

    useEffect(() => {
        if (sendMessageResult.isSuccess) {
            methods.reset()
            methods.setValue('attachment', null)
            setSendEmailDraft(true)
            notification.success({
                title: 'Email Sent',
                description: 'Email Sent Successfully',
            })
        }
        if (sendMessageResult.isError) {
            setSendEmailDraft(true)
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
        setIsSendDraft(false)
        setSendEmailDraft(false)
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
            <ShowErrorNotifications result={sendMessageResult} />
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
                                    onBlur={(e: any) => {
                                        if (
                                            !ref.current?.contains(
                                                e.relatedTarget
                                            )
                                        ) {
                                            emailDraft({
                                                receiver: receiverId,
                                                title: e.target.value,
                                            })
                                        }
                                    }}
                                />

                                <TextArea
                                    label={'Message'}
                                    name={'message'}
                                    required
                                    rows={4}
                                    placeholder={'Your Message ...'}
                                    onBlur={(e: any) => {
                                        if (
                                            !ref.current?.contains(
                                                e.relatedTarget
                                            )
                                        ) {
                                            emailDraft({
                                                receiver: receiverId,
                                                content: e.target.value,
                                            })
                                        }
                                    }}
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
                                    <div ref={ref} id={'submitButton'}>
                                        <Button
                                            submit
                                            loading={
                                                sendMessageResult?.isLoading
                                            }
                                            disabled={
                                                sendMessageResult?.isLoading
                                            }
                                        >
                                            <div className="flex items-center gap-x-2">
                                                <span>Send</span>
                                                <IoMdSend />
                                            </div>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </FormProvider>
                </Card>
            </div>
        </>
    )
}
