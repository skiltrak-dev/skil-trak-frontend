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
    PageTitle,
    StudentTimer,
    Button,
} from '@components'

// queries
import {
    useGetSubAdminStudentDetailQuery,
    // useUpdateAssessmentToolArchiveMutation,
} from '@queries'

import { useContextBar } from '@hooks'

import { DetailTabs } from '@partials/sub-admin/students'

const StudentsProfile: NextPageWithLayout = () => {
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

    // const [archiveAssessmentTool, archiveAssessmentToolResult] =
    //     useUpdateAssessmentToolArchiveMutation()

    return (
        <div className='mb-16'>
            <div className="flex justify-between items-end mb-4">
                <PageTitle title="Student Profile" backTitle="Students" />
                <div className='flex flex-col items-end gap-y-2'>
                    <div className="pl-4">
                        <StudentTimer date={new Date('12/30/2022')} />
                    </div>
                    <div className="flex items-end gap-x-2">
                        <Button text="Add Workplace" />
                        <Button text="Book Appointment" variant="info" />
                        <Button text="More" variant="action" />
                    </div>
                </div>
            </div>

            {isError && <TechnicalError />}
            {isLoading ? (
                <LoadingAnimation />
            ) : data ? (
                <DetailTabs student={data} id={data?.id} />
            ) : (
                !isError && <EmptyData />
            )}
        </div>
    )
}
StudentsProfile.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default StudentsProfile
