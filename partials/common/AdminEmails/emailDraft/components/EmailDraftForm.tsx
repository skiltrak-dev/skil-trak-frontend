import { Button, Card, ShowErrorNotifications, TextInput, Typography } from '@components'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { BulkEmailEditor } from '../../bulkEmail'
import draftToHtml from 'draftjs-to-html'
import { convertToRaw } from 'draft-js'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { CommonApi } from '@queries'
import { Attachment } from '@partials/common/Notifications'
import { FileUpload } from '@hoc'
import { useNotification } from '@hooks'
import { useRouter } from 'next/router'
type Props = {}

export const EmailDraftForm = (props: Props) => {
    const router = useRouter()
    const id = router?.query?.id
    const { notification } = useNotification()
    const [attachmentFiles, setAttachmentFiles] = useState<any>([])
    const [createNewDraft, resultCreateNewDraft] = CommonApi.Messages.useCreateDraft()


    const validationSchema = yup.object().shape({
        subject: yup.string().required('Subject is required'),
        // content: yup.object()
        //     .test(
        //         'has text',
        //         'Cannot save an empty note',
        //         (value: any) => {
        //             console.log("value", value)
        //             let content = ''
        //             if (!value?.content) {
        //                 content = draftToHtml(
        //                     convertToRaw(value?.content?.getCurrentContent())
        //                 )
        //             }
        //         }
        //     ).required('This field is required.'),
    })
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
    const formMethods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })
    const onSubmit = (data: any) => {
        let content = ''
        if (data?.content) {
            content = draftToHtml(
                convertToRaw(data?.content?.getCurrentContent())
            )
        }
        const formData = new FormData()
        const {
            attachment,
            subject,
            ...rest
        } = data
        Object.entries(rest)?.forEach(([key, value]: any) => {
            formData.append(key, value)
        })
        attachment &&
            attachment?.length > 0 &&
            attachment?.forEach((attached: File) => {
                formData.append('attachment', attached)
            })
        formData.append('subject', subject)
        formData.append('content', content)

        createNewDraft(formData)

    }

    useEffect(() => {
        if (attachmentFiles) {
            formMethods.setValue('attachment', attachmentFiles)
        }
    }, [attachmentFiles])
    useEffect(() => {
        if (resultCreateNewDraft.isSuccess) {
            notification.success({
                title: 'Email Draft Created',
                description: 'Email Draft Created Successfully',
            })
            router.back()
            formMethods.reset()
        }
    }, [resultCreateNewDraft])
    return (
        <>
            <Card>
                <div className='px-2 py-4'>
                    <Typography variant="h4">
                        Create Email Draft
                    </Typography>
                </div>

                <FormProvider {...formMethods}>
                    <form
                        className="flex flex-col"
                        onSubmit={formMethods.handleSubmit(onSubmit)}
                    >
                        <TextInput label={'Subject'} name={'subject'} placeholder='Subject' />
                        <BulkEmailEditor
                            name={'content'}
                            label={'Email Content'}
                        />
                        <ShowErrorNotifications result={resultCreateNewDraft} />
                        <div className='flex justify-between items-center py-2'>
                            <FileUpload
                                onChange={(docs: FileList) => {
                                    setAttachmentFiles((preVal: any) => [
                                        ...preVal,
                                        ...docs,
                                    ])
                                }}
                                name={'attachment'}
                                component={onFileUpload}
                                multiple
                                limit={Number(1111111111)}
                            />
                            <Button disabled={resultCreateNewDraft?.isLoading} loading={resultCreateNewDraft?.isLoading} submit text="Create" />
                        </div>
                    </form>
                </FormProvider>
            </Card>
        </>
    )
}
