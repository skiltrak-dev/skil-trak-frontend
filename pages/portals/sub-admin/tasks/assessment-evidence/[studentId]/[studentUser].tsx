import { useRouter } from 'next/router'
import { NextPageWithLayout } from '@types'
import { ReactElement, useEffect, useState } from 'react'

//Layouts
import { SubAdminLayout } from '@layouts'
import { Detail } from '@partials/sub-admin'
import { useNavbar } from '@hooks'

type Props = {}

const AssessmentEvidenceDetails: NextPageWithLayout = (props: Props) => {
    const pathname = useRouter()
    const { studentId, studentUser } = pathname.query

    const navBar = useNavbar()

    useEffect(() => {
        setTimeout(() => {
            navBar.setSubTitle('Assessment Evidence Detail')
        }, 1000)
    }, [])

    return (
        <>
            <Detail studentId={studentId} studentUserId={studentUser} />
        </>
    )
}
AssessmentEvidenceDetails.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default AssessmentEvidenceDetails
