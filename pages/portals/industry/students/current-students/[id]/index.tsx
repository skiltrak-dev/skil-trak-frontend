import { ReactElement, useEffect } from 'react'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// query
import { IndustryApi } from '@queries'
import { useRouter } from 'next/router'
import { EmptyData, LoadingAnimation, TechnicalError } from '@components'
import {
    DetailTabs,
    IndustryStudentsLayout,
    ViewStudentProfileCB,
} from '@partials/industry'
import { Actions } from '@partials/industry/currentStudents/components/Actions'
import { useContextBar } from '@hooks'

const StudentDetail: NextPageWithLayout = () => {
    const router = useRouter()
    const contextBar = useContextBar()

    const detail = IndustryApi.Workplace.useWorkplaceDetail(
        Number(router.query.id),
        { skip: !router.query.id }
    )

    // useEffect(() => {
    //     if (detail.isSuccess && detail.data?.student) {
    //         contextBar.show(false)
    //         contextBar.setContent(
    //             <ViewStudentProfileCB student={detail?.data?.student} />
    //         )
    //     }
    //     return () => {
    //         contextBar.hide()
    //         contextBar.setContent(null)
    //     }
    // }, [detail])

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
        <IndustryStudentsLayout pageTitle={{ title: 'Student Detail' }}>
            {page}
        </IndustryStudentsLayout>
    )
}

export default StudentDetail
