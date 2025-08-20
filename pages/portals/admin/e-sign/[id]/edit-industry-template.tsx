import {
    EmptyData,
    LoadingAnimation,
    ShowErrorNotifications,
    TechnicalError,
} from '@components'
import { PageHeading } from '@components/headings'
import { useNotification } from '@hooks'
import { AdminLayout } from '@layouts'
import { CreateIndustryESignTemp } from '@partials/admin/eSign/components/CreateIndustryESignTemp'
import { CommonApi } from '@queries'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'

const EditIndustryTemplate = () => {
    const { notification } = useNotification()

    const router = useRouter()

    const [saveEsign, saveEsignResult] = CommonApi.ESign.updateIndustryEsign()
    const getIndustryEsignDetail = CommonApi.ESign.getIndustryEsignDetail(
        Number(router?.query?.id),
        {
            skip: !router?.query?.id,
        }
    )

    const onSave = async (values: any) => {
        // return null
        const formData = new FormData()
        Object.entries({
            ...values,
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
        const res: any = await saveEsign({
            body: formData,
            id: Number(router?.query?.id),
        })
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
                subtitle="Edit and manage e-sign templates for industry documents"
            />

            {getIndustryEsignDetail?.isError ? <TechnicalError /> : null}
            {getIndustryEsignDetail?.isLoading ? (
                <LoadingAnimation />
            ) : getIndustryEsignDetail?.data &&
              getIndustryEsignDetail?.isSuccess ? (
                <CreateIndustryESignTemp
                    onSubmit={onSave}
                    result={saveEsignResult}
                    edit
                    esignData={getIndustryEsignDetail?.data}
                />
            ) : getIndustryEsignDetail?.isSuccess ? (
                <EmptyData />
            ) : null}
        </div>
    )
}
EditIndustryTemplate.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}
export default EditIndustryTemplate
