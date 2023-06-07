import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

//components
import {
    Card,
    Filter,
    LoadingAnimation,
    Modal,
    PageTitle,
    SubAdminAssessmentsFilters,
    TabNavigation,
    TabProps,
    TechnicalError,
} from '@components'
// queries
import {
    ArchivedAssessment,
    CompetentAssessment,
    FilteredAssessments,
    NonCompetentAssessment,
    PendingAssessment,
    ReOpenedAssessment,
} from '@partials/sub-admin'
import {
    SubAdminApi,
    useAssessmentCountQuery,
    useGetAssessmentEvidenceQuery,
} from '@queries'
import { getCountData, getFilterQuery } from '@utils'
import { Result } from '@constants'

type Props = {}

const filterKeys = [
    'name',
    'email',
    'phone',
    'studentId',
    'result',
    'rtoId',
    'courseId',
]

const AssessmentEvidence: NextPageWithLayout = (props: Props) => {
    const router = useRouter()

    const [filterAction, setFilterAction] = useState(null)
    const [filter, setFilter] = useState({})
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [modal, setModal] = useState<any | null>(null)

    const query = getFilterQuery({ router, filterKeys })
    useEffect(() => {
        setFilter(query)
    }, [router])

    const count = useAssessmentCountQuery()
    const profile = SubAdminApi.SubAdmin.useProfile(undefined, {
        refetchOnMountOrArgChange: true,
    })
    const filteredAssessments = useGetAssessmentEvidenceQuery(
        {
            search: `${JSON.stringify(filter)
                .replaceAll('{', '')
                .replaceAll('}', '')
                .replaceAll('"', '')
                .trim()}`,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        },
        { refetchOnMountOrArgChange: true }
    )

    const onCancel = () => {
        setModal(null)
    }

    useEffect(() => {
        if (
            profile?.isSuccess &&
            profile.data &&
            !profile.data?.receiveStudentAssessment
        ) {
            setModal(
                <Modal
                    onConfirmClick={onCancel}
                    title={'Student Assessments'}
                    subtitle={'Student Assessments'}
                    onCancelClick={onCancel}
                >
                    You need to enable Student Assessments from Setting to
                    recive Student Assessments
                </Modal>
            )
        }
        return () => {
            setModal(null)
        }
    }, [profile])

    const assessMentCount = getCountData(count?.data)

    const tabs: TabProps[] = [
        {
            label: 'Pending',
            href: {
                pathname: 'assessment-evidence',
                query: { tab: Result.Pending },
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
                query: { tab: Result.Competent },
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
        {
            label: 'Archive',
            href: {
                pathname: 'assessment-evidence',
                query: { tab: 'archived' },
            },
            badge: {
                text: assessMentCount?.archived,
                loading: count.isLoading,
            },
            element: <ArchivedAssessment />,
        }
        // {
        //     label: 'Archive',
        //     href: {
        //         pathname: 'assessment-evidence',
        //         query: { tab: 'archive' },
        //     },
        //     badge: {
        //         text: assessMentCount?.reOpened,
        //         loading: count.isLoading,
        //     },
        //     element: <ReOpenedAssessment />,
        // },
    ]

    return (
        <>
            {modal}
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
                    initialValues={filter}
                    setFilterAction={setFilterAction}
                    setFilter={setFilter}
                    filterKeys={filterKeys}
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
