import {
    Button,
    InputContentEditor,
    inputEditorErrorMessage,
    TextInput,
} from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { InputErrorMessage } from '@partials/common/MailsListing'
import { FileUpload } from '@hoc'
import { Attachment } from '@partials/common/Notifications'

type FormValues = {
    receiver: string
    subject: string
    body?: any
}
export const ComposeListingIndustryMailForm = ({
    result,
    onSubmit,
    industry,
}: {
    result: any
    onSubmit: (values: any) => void
    industry: any
}) => {
    const [attachmentFiles, setAttachmentFiles] = useState<any>([])
    const inputClasses =
        'placeholder:text-[#686868] border-b border-secondary-dark outline-none h-8 placeholder:text-[11px] px-1.5 text-[13px] text-gray-700'
    const validationSchema = Yup.object({
        receiver: Yup.string()
            .email('Invalid Email')
            .required('Must provide email'),
        subject: Yup.string().required('Must provide subject'),
        // body: Yup.mixed().test('body', 'Must Provide Body', (value) =>
        //     inputEditorErrorMessage(value)
        // ),
    })

    console.log({ industry })
    const methods = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
        mode: 'all',
        defaultValues: {
            receiver: industry?.email ?? 'NA',
        },
    })
    useEffect(() => {
        if (industry?.email) {
            methods.setValue('receiver', industry.email)
        }
    }, [industry?.email])

    useEffect(() => {
        if (result?.isSuccess) {
            methods.reset()
            setAttachmentFiles([])
        }
    }, [result])

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

    return (
        <div>
            <FormProvider {...methods}>
                <form
                    className="w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div className="flex flex-col px-3">
                        <input
                            // name={'receiver'}
                            {...methods.register('receiver')}
                            className={inputClasses}
                            placeholder="To"
                        />
                        <InputErrorMessage name="receiver" />
                        <input
                            {...methods.register('subject')}
                            className={inputClasses}
                            placeholder="Subject"
                        />
                        <InputErrorMessage name="subject" />

                        <div className="mt-2">
                            <InputContentEditor
                                name={'body'}
                                onChange={(e: any) => {
                                    const mail = draftToHtml(
                                        convertToRaw(e.getCurrentContent())
                                    )
                                    // setMailContent(mail)
                                }}
                                showError={false}
                                height="h-80"
                            />
                        </div>
                        <InputErrorMessage name="body" />

                        {/*  */}
                        <div className="mt-3 flex gap-x-3 items-center justify-between">
                            <div className="min-w-32">
                                <Button
                                    submit
                                    fullWidth
                                    loading={result.isLoading}
                                    disabled={result.isLoading}
                                >
                                    Send
                                </Button>
                            </div>
                            <FileUpload
                                onChange={(docs: FileList) => {
                                    setAttachmentFiles((preVal: any) => [
                                        ...preVal,
                                        ...docs,
                                    ])
                                }}
                                showError={false}
                                name={'attachments'}
                                component={onFileUpload}
                                multiple
                                limit={Number(1111111111)}
                            />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
