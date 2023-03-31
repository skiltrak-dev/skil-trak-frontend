import { Button, Card, Checkbox, Select, TextArea, TextInput } from '@components'
import { FileUpload } from '@hoc'
import { Attachment } from '@partials/common/Notifications'
import { CommonApi } from '@queries'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'



export const ActiveRtos = () => {
    const [attachmentFiles, setAttachmentFiles] = useState<any>([])
    const [template, setTemplate] = useState<any | null>(null)
    const [templateId, setTemplateId] = useState<any | null>(null)
    const [templateBody, setTemplateBody] = useState<any | null>(null)
    const [selectAll, setSelectAll] = useState<any | null>(null)
    const [isChecked, setIsChecked] = useState(false)

    const checkAllRtos = () => {
        if (isChecked) {
            setSelectAll(null)
            setIsChecked(false)
        } else {
            setSelectAll(rtoOptions)
            setIsChecked(true)
        }
    }

    const rtoResponse = CommonApi.Rtos.useRtosList()
    const [sendBulk, resultSendBulk] = CommonApi.Messages.useSendBulkMail()
    const getTemplates = CommonApi.Messages.useAllTemplates()


    const templateOptions = getTemplates.data?.length ? getTemplates?.data?.map((template: any) => ({
        label: template.subject,
        value: template.id,
    })) : []

    const findTemplate = (id: any) => {
        const template = getTemplates?.data?.find((template: any) => template.id === id)
        setTemplateBody(template?.content)
    }
    const rtoOptions = rtoResponse.data?.length
        ? rtoResponse?.data?.map((rto: any) => ({
            label: rto.user.name,
            value: rto.id,
        }))
        : []

    const getRtosIds = selectAll?.map((rto: any) => rto?.value)
    const RtosIds = getRtosIds?.map((rtoId: any) => {
        const rto = rtoResponse?.data?.find((rto: any) => rto.id === rtoId)
        return rto?.user?.id
    })


    const formMethods = useForm({
        mode: 'all',
        // resolver: yupResolver(validationSchema),
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
    const onSubmit = (data: any) => {
        const formData = new FormData()
        const { attachment, ...rest } = data
        Object.entries(rest)?.forEach(([key, value]: any) => {
            formData.append(key, value)
        })
        attachment?.forEach((attached: File) => {
            formData.append('attachment', attached)
        })
        formData.append('users', RtosIds)
        formData.append('template', templateId)
        sendBulk(formData)
    }
    useEffect(() => {
        if (selectAll && selectAll?.length > 0) {
            formMethods.setValue('rto', selectAll)
        }
    }, [selectAll])
    useEffect(() => {
        if (template && template?.length > 0) {
            formMethods.setValue('subject', template)
        }
    }, [template])
    useEffect(() => {
        if (templateBody && templateBody?.length > 0) {
            formMethods.setValue('message', templateBody)
        }
    }, [templateBody])

    useEffect(() => {
        if (attachmentFiles) {
            formMethods.setValue('attachment', attachmentFiles)
        }
    }, [attachmentFiles])

    return (
        <>

            <FormProvider {...formMethods}>
                <form
                    className="flex flex-col"
                    onSubmit={formMethods.handleSubmit(onSubmit)}>
                    <div>
                        <Select
                            label={`Select RTO`}
                            name={'rto'}
                            defaultValue={selectAll}
                            value={selectAll}
                            onChange={(e: any) => {
                                setSelectAll(e)
                            }}
                            options={rtoOptions}
                            multi
                        // loading={courseLoading}
                        />
                        <Checkbox name="rtos" label={'Select all RTOs'} onChange={checkAllRtos} />
                    </div>

                    <Card>
                        {/* <div className="flex justify-between items-center"> */}
                        <Select
                            label={'Select Email Template'}
                            name={'template'}
                            // defaultValue={courseOptions}
                            // value={""}
                            options={templateOptions}
                            placeholder="Select Email Template"
                            // loading={courseLoading}
                            onChange={(e: any) => {
                                setTemplate(e.label)
                                setTemplateId(e.value)
                                findTemplate(e.value)
                            }}
                        />
                        {/* <Button text={'All Templates'} /> */}
                        {/* </div> */}
                        <TextInput value={template} label={'Subject'} name={'subject'} />
                        <TextArea value={templateBody} label={'Message'} name={'message'} />
                        <div className='mb-4 flex justify-between items-center'>
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
                            <Button text={'Send'} submit />
                        </div>
                    </Card>
                </form>
            </FormProvider>
        </>
    )
}
