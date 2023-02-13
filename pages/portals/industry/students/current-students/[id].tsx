import { ReactElement } from 'react'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// query
import { IndustryApi } from '@queries'
import { useRouter } from 'next/router'
import { EmptyData, LoadingAnimation, TechnicalError } from '@components'
import { DetailTabs } from '@partials/industry'

const StudentDetail: NextPageWithLayout = () => {
    const router = useRouter()
    const detail = IndustryApi.Workplace.useWorkplaceDetail(
        Number(router.query.id),
        { skip: !router.query.id }
    )
    return (
        <>
            {detail.isError && <TechnicalError />}
            {detail.isLoading ? (
                <LoadingAnimation height={'h-[60vh]'} />
            ) : detail.data ? (
                <DetailTabs workplace={detail.data} id={detail.data?.id} />
            ) : (
                !detail.isError && (
                    <EmptyData
                        title={'Student Not found'}
                        description={'Student Does not exist!'}
                    />
                )
            )}
        </>
    )
}

StudentDetail.getLayout = (page: ReactElement) => {
    return (
        <IndustryLayout pageTitle={{ title: 'Student Detail' }}>
            {page}
        </IndustryLayout>
    )
}

export default StudentDetail
