import { useRouter } from 'next/router'
import { NextPageWithLayout } from '@types'
import { ReactElement, useEffect, useState } from 'react'

//Layouts
import { SubAdminLayout } from '@layouts'
import { Detail } from '@partials/sub-admin'

type Props = {}

const AssessmentEvidenceDetails: NextPageWithLayout = (props: Props) => {
    const pathname = useRouter()
    const { courseId, studentId, studentUser } = pathname.query

    return (
        <>
            {/* Assessment Courses */}
            <Detail studentId={studentId} studentUserId={studentUser} />
        </>
    )
}
AssessmentEvidenceDetails.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout
            pageTitle={{
                title: 'Assessment Evidence Detail',
                navigateBack: true,
                backTitle: 'Back',
            }}
        >
            {page}
        </SubAdminLayout>
    )
}

export default AssessmentEvidenceDetails
