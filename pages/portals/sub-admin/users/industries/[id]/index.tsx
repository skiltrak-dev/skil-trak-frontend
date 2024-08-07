import { EmptyData, LoadingAnimation, TechnicalError } from '@components'
import { SubAdminLayout } from '@layouts'
import { IndustryProfileDetail } from '@partials/common'
import { SubAdminApi, useGetSubAdminIndustriesProfileQuery } from '@queries'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

const IndustryDetail: NextPageWithLayout = () => {
    const router = useRouter()
    const industry = useGetSubAdminIndustriesProfileQuery(
        Number(router.query?.id),
        {
            skip: !router.query?.id,
            refetchOnMountOrArgChange: true,
        }
    )
    const profile = SubAdminApi.SubAdmin.useProfile()

    useEffect(() => {
        if (
            profile?.data?.isAssociatedWithRto &&
            profile?.isSuccess &&
            profile?.data
        ) {
            router.back()
        }
    }, [profile])

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
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default IndustryDetail
