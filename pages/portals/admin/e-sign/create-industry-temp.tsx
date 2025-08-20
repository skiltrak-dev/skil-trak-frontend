import { ShowErrorNotifications } from '@components'
import { PageHeading } from '@components/headings'
import { useNotification } from '@hooks'
import { AdminLayout } from '@layouts'
import { CreateIndustryESignTemp } from '@partials/admin/eSign/components/CreateIndustryESignTemp'
import { CommonApi } from '@queries'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'

const CreateIndustryTemplate = () => {
    const { notification } = useNotification()

    const router = useRouter()

    const [saveEsign, saveEsignResult] = CommonApi.ESign.saveIndustryEsign()

    const onSave = async (values: any) => {
        // return null
        const formData = new FormData()
        Object.entries({ ...values, file: values?.file?.[0] }).forEach(
            ([key, value]: any) => {
                formData.append(key, value)
            }
        )
        const res: any = await saveEsign(formData)

        if (res?.data) {
            notification.success({
                title: 'Template Added',
                description: 'Template Added Successfully',
            })
            router.push({
                pathname: `/portals/admin/e-sign/${res?.data?.id}/document-template`,
                query: { tab: 'industry-esign' },
            })
        }
    }

    return (
        <div className="p-5 flex flex-col gap-y-4">
            <ShowErrorNotifications result={saveEsignResult} />
            <PageHeading
                title="E-Sign Templates"
                subtitle="Create and manage e-sign templates for industry documents"
            />
            <CreateIndustryESignTemp
                onSubmit={onSave}
                result={saveEsignResult}
            />
        </div>
    )
}
CreateIndustryTemplate.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}
export default CreateIndustryTemplate
