import {
    BackButton,
    Button,
    Card,
    Checkbox,
    Select,
    ShowErrorNotifications,
    TextInput,
    Typography,
    UploadFile,
} from '@components'
import { PageHeading } from '@components/headings'
import { AdminLayout } from '@layouts'
import { AddCommentEnum, Course, Folder, Rto } from '@types'
import React, { ReactElement, useEffect, useState } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { FileUpload } from '@hoc'
import { UserRoles } from '@constants'
import { useRouter } from 'next/router'
import { AdminApi } from '@queries'
import { useNotification } from '@hooks'
import { AddEsignForm } from '@partials'

const EditESign = () => {
    const router = useRouter()

    const [isSaveAndNext, setIsSaveAndNext] = useState<boolean | null>(null)

    const { notification } = useNotification()

    const [saveEsign, saveEsignResult] = AdminApi.ESign.useSaveEsign()

    const detail = AdminApi.ESign.useEsignTemplateDetail(
        Number(router.query.id),
        {
            skip: !router.query?.id,
        }
    )

    useEffect(() => {
        if (saveEsignResult.isSuccess) {
            notification.success({
                title: 'Teplate Updated',
                description: 'Template Updated Successfully',
            })
            if (isSaveAndNext) {
                router.push(
                    `/portals/admin/e-sign/${saveEsignResult?.data?.id}/document-template`
                )
            } else if (isSaveAndNext === false) {
                router.push(
                    `/portals/admin/e-sign?tab=approved&page=1&pageSize=50`
                )
            }
        }
    }, [saveEsignResult, isSaveAndNext])

    const onSave = (values: any) => {
        // return null
        const formData = new FormData()
        Object.entries({ ...values, file: values?.file?.[0] }).forEach(
            ([key, value]: any) => {
                formData.append(key, value)
            }
        )
        saveEsign(formData)
    }

    const onSubmit = (values: any) => {
        setIsSaveAndNext(true)
        onSave(values)
    }

    const onHandleSave = (values: any) => {
        setIsSaveAndNext(false)
        onSave(values)
    }

    const Actions = (methods: any) => (
        <div className="mt-4 flex gap-x-4 items-center justify-end">
            <Button
                submit
                loading={saveEsignResult.isLoading && Boolean(isSaveAndNext)}
                disabled={saveEsignResult.isLoading && Boolean(isSaveAndNext)}
            >
                Save & Next
            </Button>
            <Button
                onClick={() => {
                    onHandleSave(methods.getValues())
                }}
                loading={saveEsignResult.isLoading && Boolean(!isSaveAndNext)}
                disabled={saveEsignResult.isLoading && Boolean(!isSaveAndNext)}
            >
                Save
            </Button>
        </div>
    )

    return (
        <div className="p-4">
            <ShowErrorNotifications result={saveEsignResult} />
            <BackButton link={'/portals/admin'} text="Back To Dashboard" />
            <div className="flex">
                <PageHeading
                    title={'E-Sign Templates'}
                    subtitle={'Create and manage e-sign templates'}
                />
            </div>
            <AddEsignForm actions={Actions} onSubmit={onSubmit} />
        </div>
    )
}

EditESign.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default EditESign
