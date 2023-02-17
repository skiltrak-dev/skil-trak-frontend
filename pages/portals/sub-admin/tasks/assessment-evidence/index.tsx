import { ReactElement, useState, useEffect } from 'react'
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
    Filter,
    SubAdminAssessmentsFilters,
    PageTitle,
} from '@components'
// queries
import {
    useGetAssessmentEvidenceQuery,
    useAssessmentCountQuery,
} from '@queries'
import { FaEnvelope, FaEye, FaPhoneSquareAlt } from 'react-icons/fa'
import Image from 'next/image'
import {
    CompetentAssessment,
    FilteredAssessments,
    NonCompetentAssessment,
    PendingAssessment,
    ReOpenedAssessment,
} from '@partials/sub-admin'

type Props = {}

const AssessmentEvidence: NextPageWithLayout = (props: Props) => {
    const router = useRouter()

    const [filterAction, setFilterAction] = useState(null)
    const [filter, setFilter] = useState({})
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(50)

    const [assessMentCount, setAssessMentCount] = useState<any>({})

    const count = useAssessmentCountQuery()
    const filteredAssessments = useGetAssessmentEvidenceQuery({
        search: `${JSON.stringify(filter)
            .replaceAll('{', '')
            .replaceAll('}', '')
            .replaceAll('"', '')
            .trim()}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    useEffect(() => {
        if (count?.isSuccess && count?.data) {
            count?.data?.forEach((count: any) =>
                Object.entries(count).map(([key, value]) => {
                    setAssessMentCount((preVal: any) => ({
                        ...preVal,
                        [key]: value,
                    }))
                })
            )
        }
    }, [count])

    const tabs: TabProps[] = [
        {
            label: 'Pending',
            href: {
                pathname: 'assessment-evidence',
                query: { tab: 'pending' },
            },
            badge: {
                text: assessMentCount?.pending,
                loading: count.isLoading,
            },
            element: <PendingAssessment />,
        },
        {
            label: 'Competent',
            href: {
                pathname: 'assessment-evidence',
                query: { tab: 'competent' },
            },
            badge: {
                text: assessMentCount?.competent,
                loading: count.isLoading,
            },
            element: <CompetentAssessment />,
        },
        {
            label: 'Non-Competent',
            href: {
                pathname: 'assessment-evidence',
                query: { tab: 'non-competent' },
            },
            badge: {
                text: assessMentCount?.notCompetent,
                loading: count.isLoading,
            },
            element: <NonCompetentAssessment />,
        },
        {
            label: 'Re-Opened',
            href: {
                pathname: 'assessment-evidence',
                query: { tab: 're-opened' },
            },
            badge: {
                text: assessMentCount?.reOpened,
                loading: count.isLoading,
            },
            element: <ReOpenedAssessment />,
        },
    ]

    return (
        <>
            <div className="flex justify-between items-end">
                <PageTitle
                    title={'Assessment Submissions'}
                    backTitle={'Back'}
                    navigateBack
                />

                <div className="">{filterAction}</div>
            </div>
            <div className="py-4">
                <Filter
                    component={SubAdminAssessmentsFilters}
                    initialValues={{}}
                    setFilterAction={setFilterAction}
                    setFilter={setFilter}
                />
            </div>

            <div>
                {filteredAssessments.isError && <TechnicalError />}
                {filteredAssessments.isLoading ? (
                    <div className="px-4 mt-4">
                        <Card>
                            <LoadingAnimation />
                        </Card>
                    </div>
                ) : Object.keys(filter).length &&
                  filteredAssessments.isSuccess ? (
                    <FilteredAssessments
                        setPage={setPage}
                        itemPerPage={itemPerPage}
                    assessments={filteredAssessments}
                        setItemPerPage={setItemPerPage}
                    />
                ) : (
                    !filteredAssessments.isError && (
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
                    )
                )}
            </div>
        </>
    )
}
AssessmentEvidence.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default AssessmentEvidence
