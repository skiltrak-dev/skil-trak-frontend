import {
    BackButton,
    Button,
    EmptyData,
    LoadingAnimation,
    ShowErrorNotifications,
    TechnicalError,
} from '@components'
import { PageHeading } from '@components/headings'
import { useNotification } from '@hooks'
import { AdminLayout } from '@layouts'
import { AddEsignForm } from '@partials'
import { CommonApi } from '@queries'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

const EditESign = () => {
    const router = useRouter()

    const [isSaveAndNext, setIsSaveAndNext] = useState<boolean | null>(null)

    const { notification } = useNotification()

    const [updateEsign, updateEsignResult] =
        CommonApi.ESign.useUpdateEsignDetail()

    const detail = CommonApi.ESign.useEsignTemplateDetail(
        Number(router.query.id),
        {
            skip: !router.query?.id,
        }
    )

    useEffect(() => {
        if (updateEsignResult.isSuccess) {
            notification.success({
                title: 'Template Updated',
                description: 'Template Updated Successfully',
            })
            if (isSaveAndNext) {
                router.push(
                    `/portals/admin/e-sign/${updateEsignResult?.data?.id}/document-template`
                )
            } else if (isSaveAndNext === false) {
                router.push(
                    `/portals/admin/e-sign?tab=approved&page=1&pageSize=50`
                )
            }
        }
    }, [updateEsignResult, isSaveAndNext])

    const onSave = (values: any) => {
        const { file, ...data } = values
        const formData = new FormData()
        Object.entries({
            ...data,
            ...(values?.file?.[0]
                ? {
                      file: Array.isArray(values?.file)
                          ? values?.file?.[0]
                          : values?.file,
                  }
                : {}),
        }).forEach(([key, value]: any) => {
            formData.append(key, value)
        })
        updateEsign({
            id: detail?.data?.id,
            body: formData,
        })
    }

    const onSubmit = (values: any) => {
        setIsSaveAndNext(true)
        onSave(values)
    }

    const Actions = () => (
        <div className="mt-4 flex gap-x-4 items-center justify-end">
            <Button
                onClick={() => {
                    router.push(
                        `/portals/admin/e-sign/${router.query?.id}/document-template`
                    )
                }}
                outline
                variant={'info'}
                loading={updateEsignResult.isLoading && Boolean(!isSaveAndNext)}
                disabled={
                    updateEsignResult.isLoading && Boolean(!isSaveAndNext)
                }
            >
                Next
            </Button>
            <Button
                submit
                variant={'info'}
                loading={updateEsignResult.isLoading && Boolean(isSaveAndNext)}
                disabled={updateEsignResult.isLoading && Boolean(isSaveAndNext)}
            >
                Update & Next
            </Button>
        </div>
    )

    return (
        <div className="p-4">
            <ShowErrorNotifications result={updateEsignResult} />
            <BackButton link={'/portals/admin'} text="Back To Dashboard" />
            <div className="flex">
                <PageHeading
                    title={'E-Sign Templates'}
                    subtitle={'Create and manage e-sign templates'}
                />
            </div>
            {detail.isError && <TechnicalError />}
            {detail.isLoading ? (
                <LoadingAnimation />
            ) : detail?.data && detail.isSuccess ? (
                <AddEsignForm
                    actions={Actions}
                    onSubmit={onSubmit}
                    data={detail?.data}
                    edit
                />
            ) : (
                detail.isSuccess && <EmptyData />
            )}
        </div>
    )
}

EditESign.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default EditESign
