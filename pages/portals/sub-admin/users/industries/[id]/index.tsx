import { EmptyData, LoadingAnimation, TechnicalError } from '@components'
import { SubAdminLayout } from '@layouts'
import { IndustryProfileDetail } from '@partials/common'
import { SubAdminApi, useGetSubAdminIndustryProfileQuery } from '@queries'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useMemo } from 'react'

const IndustryDetail: NextPageWithLayout = () => {
    const router = useRouter()
    // const id = useMemo(() => Number(router.query?.id), [router.query?.id])
    const id = router.query?.id

    const industry = useGetSubAdminIndustryProfileQuery(Number(id), {
        skip: id === null || id === undefined,
        // refetchOnMountOrArgChange: true,
    })
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
                <IndustryProfileDetail
                    isHod={profile?.data?.departmentMember?.isHod}
                    industry={industry?.data}
                />
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
