import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout, Student } from '@types'

import { TabsView } from '@components/sections/rto'
//components
import {
    Card,
    Table,
    ReactTable,
    Typography,
    EmptyData,
    TechnicalError,
    LoadingAnimation,
    TableActionOption,
    TableAction,
    TabProps,
    TabNavigation,
} from '@components'
// queries
import { useGetAssessmentEvidenceQuery } from '@queries'
import { FaEnvelope, FaEye, FaPhoneSquareAlt } from 'react-icons/fa'
import Image from 'next/image'
import {
    CompetentAssessment,
    NonCompetentAssessment,
    PendingAssessment,
    ReOpenedAssessment,
} from '@partials/sub-admin'

type Props = {}

const AssessmentEvidence: NextPageWithLayout = (props: Props) => {
    const router = useRouter()

    const tabs: TabProps[] = [
        {
            label: 'Pending',
            href: {
                pathname: 'assessment-evidence',
                query: { tab: 'pending' },
            },
            element: <PendingAssessment />,
        },
        {
            label: 'Competent',
            href: {
                pathname: 'assessment-evidence',
                query: { tab: 'competent' },
            },
            element: <CompetentAssessment />,
        },
        {
            label: 'Non-Competent',
            href: {
                pathname: 'assessment-evidence',
                query: { tab: 'non-competent' },
            },
            element: <NonCompetentAssessment />,
        },
        {
            label: 'Re-Opened',
            href: {
                pathname: 'assessment-evidence',
                query: { tab: 're-opened' },
            },
            element: <ReOpenedAssessment />,
        },
    ]

    return (
        <>
            <div>
                <TabNavigation tabs={tabs}>
                    {({ header, element }: any) => {
                        return (
                            <div>
                                <div>{header}</div>
                                <div className="p-4">{element}</div>
                            </div>
                        )
                    }}
                </TabNavigation>
            </div>
        </>
    )
}
AssessmentEvidence.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout
            pageTitle={{
                title: 'Assessment Submissions',
                navigateBack: true,
                backTitle: 'Back',
            }}
        >
            {page}
        </SubAdminLayout>
    )
}

export default AssessmentEvidence
