import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

//components
import {
    TechnicalError,
    LoadingAnimation,
    EmptyData,
    SubAdminStudentProfile,
} from '@components'

// queries
import {
    useGetSubAdminStudentDetailQuery,
    useUpdateAssessmentToolArchiveMutation,
} from '@queries'

import { useContextBar } from '@hooks'

import { DetailTabs } from '@partials/sub-admin/students'

type Props = {}

const StudentsProfile: NextPageWithLayout = (props: Props) => {
    const contextBar = useContextBar()
    const router = useRouter()
    const { id } = router.query

    const { data, isLoading, isError, isSuccess } =
        useGetSubAdminStudentDetailQuery(String(id), {
            skip: !id,
        })

    useEffect(() => {
        if (isSuccess) {
            contextBar.setContent(<SubAdminStudentProfile student={data} />)
            contextBar.show(false)
        }
    }, [data])

    const [archiveAssessmentTool, archiveAssessmentToolResult] =
        useUpdateAssessmentToolArchiveMutation()

    return (
        <>
            {isError && <TechnicalError />}
            {isLoading ? (
                <LoadingAnimation />
            ) : data ? (
                <DetailTabs student={data} id={data?.id} />
            ) : (
                !isError && <EmptyData />
            )}
        </>
    )
}
StudentsProfile.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout
            pageTitle={{ title: 'Student Profile', backTitle: 'Students' }}
        >
            {page}
        </SubAdminLayout>
    )
}

export default StudentsProfile
