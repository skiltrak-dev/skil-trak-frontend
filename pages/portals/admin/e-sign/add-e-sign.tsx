import { BackButton, Button, ShowErrorNotifications } from '@components'
import { PageHeading } from '@components/headings'
import { useNotification } from '@hooks'
import { AdminLayout } from '@layouts'
import { AddEsignForm } from '@partials'
import { CommonApi } from '@queries'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

const AddESign = () => {
    const router = useRouter()

    const [isSaveAndNext, setIsSaveAndNext] = useState<boolean | null>(null)

    const { notification } = useNotification()

    const [saveEsign, saveEsignResult] = CommonApi.ESign.useSaveEsign()

    useEffect(() => {
        if (saveEsignResult.isSuccess) {
            notification.success({
                title: 'Template Created',
                description: 'Template Created Successfully',
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

AddESign.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default AddESign
