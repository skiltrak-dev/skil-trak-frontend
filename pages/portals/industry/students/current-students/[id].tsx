import { ReactElement } from 'react'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// query
import { IndustryApi } from '@queries'
import { useRouter } from 'next/router'
import { EmptyData, LoadingAnimation, TechnicalError } from '@components'
import { DetailTabs } from '@partials/industry'
import { Actions } from '@partials/industry/currentStudents/components/Actions'

const StudentDetail: NextPageWithLayout = () => {
    const router = useRouter()
    const detail = IndustryApi.Workplace.useWorkplaceDetail(
        Number(router.query.id),
        { skip: !router.query.id }
    )
    return (
        <>
            {detail?.isSuccess && (
                <div className="flex justify-end">
                    <Actions
                        student={detail?.data?.workplace?.student}
                        workplace={detail?.data}
                        industry={detail?.data?.industries[0]}
                    />
                </div>
            )}
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
