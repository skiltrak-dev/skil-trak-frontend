import { ReactElement } from 'react'

import { NextPageWithLayout } from '@types'

// query
import { EmptyData, LoadingAnimation, TechnicalError } from '@components'
import { useContextBar } from '@hooks'
import { DetailTabs, IndustryStudentsLayout } from '@partials/industry'
import { Actions } from '@partials/industry/currentStudents/components/Actions'
import { IndustryApi } from '@queries'
import { useRouter } from 'next/router'
import { IndustryLayout } from '@layouts'

const StudentDetail: NextPageWithLayout = () => {
    const router = useRouter()
    const contextBar = useContextBar()

    const detail = IndustryApi.Workplace.useWorkplaceDetail(
        Number(router.query.id),
        { skip: !router.query.id }
    )

    return (
        <>
            {detail?.isSuccess && detail.data && (
                <div className="flex justify-end">
                    <Actions
                        student={detail?.data?.workplace?.student}
                        workplace={detail?.data}
                        industry={detail?.data?.industries?.find(
                            (industry: any) => industry?.applied
                        )}
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
