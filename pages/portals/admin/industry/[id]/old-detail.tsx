import { EmptyData, LoadingAnimation, TechnicalError } from '@components'
import { AdminLayout } from '@layouts'
import { IndustryProfileDetail } from '@partials/common'
import { AdminApi } from '@queries'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'

const IndustryDetail: NextPageWithLayout = () => {
    const router = useRouter()
    const industry = AdminApi.Industries.useDetail(Number(router.query.id), {
        skip: !router.query?.id,
        refetchOnMountOrArgChange: true,
    })
    return (
        <div>
            {industry.isError && <TechnicalError />}
            {industry.isLoading || industry?.isFetching ? (
                <LoadingAnimation height={'h-[70vh]'} />
            ) : industry.data ? (
                <IndustryProfileDetail industry={industry?.data} />
            ) : (
                !industry.isError &&
                industry.isSuccess && (
                    <EmptyData
                        title={'No Industry Found'}
                        description={'No Industry Found on your request'}
                    />
                )
            )}
        </div>
    )
}

IndustryDetail.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default IndustryDetail
