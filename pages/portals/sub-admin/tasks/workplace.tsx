import { ReactElement, useState, useEffect } from 'react'

import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import {
    Card,
    Filter,
    LoadingAnimation,
    Modal,
    SetDetaultQueryFilteres,
    TabNavigation,
    TabProps,
    TechnicalError,
    WorkplaceFilters,
} from '@components'

// query
import { useGetSubAdminFilteredWorkplacesQuery, SubAdminApi } from '@queries'

// components
import {
    MyWorkplaces,
    AllWorkplaces,
    CancelledWorkplaces,
    StudentAddedWorkplaces,
    FilteredWorkplaces,
} from '@partials/sub-admin'
import { checkFilteredDataLength } from '@utils'
import { useRouter } from 'next/router'

const filterKeys = [
    'studentId',
    'name',
    'email',
    'status',
    'rtoId',
    'industryId',
    'courseId',
]

type Props = {}

const Workplace: NextPageWithLayout = (props: Props) => {
    const [filterAction, setFilterAction] = useState(null)
    const [filter, setFilter] = useState({})
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(30)
    const [modal, setModal] = useState<any | null>(null)

    const router = useRouter()

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 30))
    }, [router])

    const count = SubAdminApi.Workplace.count()
    const profile = SubAdminApi.SubAdmin.useProfile(undefined, {
        refetchOnMountOrArgChange: true,
    })
    const filteredWorkplaces = useGetSubAdminFilteredWorkplacesQuery(
        {
            search: `${JSON.stringify(filter)
                .replaceAll('{', '')
                .replaceAll('}', '')
                .replaceAll('"', '')
                .trim()}`,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        },
        { skip: !Object.keys(filter).length, refetchOnMountOrArgChange: true }
    )

    const onCancel = () => {
        setModal(null)
    }
    useEffect(() => {
        if (
            profile?.isSuccess &&
            profile.data &&
            !profile.data?.receiveWorkplaceRequest
        ) {
            setModal(
                <Modal
                    onConfirmClick={onCancel}
                    title={'Workplace'}
                    subtitle={'Workplace'}
                    onCancelClick={onCancel}
                >
                    You need to enable recive workplace from Setting to recive
                    workplace
                </Modal>
            )
        }
        return () => {
            setModal(null)
        }
    }, [profile])

    const tabs: TabProps[] = [
        {
            label: 'Need Workplaces',
            href: { pathname: 'workplace', query: { tab: 'all' } },
            badge: {
                text: count?.data?.all,
                loading: count?.isLoading,
            },
            element: <AllWorkplaces />,
        },
        {
            label: 'My Requests',
            badge: {
                text: count?.data?.myWorkplace,
                loading: count?.isLoading,
            },
            href: { pathname: 'workplace', query: { tab: 'my-workplaces' } },
            element: <MyWorkplaces />,
        },
        {
            label: 'Student Provided Workplace',
            badge: {
                text: count?.data?.studentProvided,
                loading: count?.isLoading,
            },
            href: { pathname: 'workplace', query: { tab: 'student-added' } },
            element: <StudentAddedWorkplaces />,
        },
        {
            label: 'Cancelled Requests',
            badge: {
                text: count?.data?.cancelled,
                loading: count?.isLoading,
            },
            href: { pathname: 'workplace', query: { tab: 'cancelled' } },
            element: <CancelledWorkplaces />,
        },
    ]

    const filteredDataLength = checkFilteredDataLength(filter)

    return (
        <>
            {modal}
            <SetDetaultQueryFilteres
                filterKeys={filterKeys}
                setFilter={setFilter}
            />
            <div>
                <div>
                    <div className="flex justify-end mb-2">{filterAction}</div>
                    <Filter
                        component={WorkplaceFilters}
                        initialValues={filter}
                        setFilterAction={setFilterAction}
                        setFilter={setFilter}
                        filterKeys={filterKeys}
                    />
                </div>
                {filteredDataLength && filteredWorkplaces.isError && (
                    <TechnicalError />
                )}
                {filteredDataLength ? (
                    filteredWorkplaces.isLoading ? (
                        <LoadingAnimation />
                    ) : (
                        filteredWorkplaces.isSuccess && (
                            <FilteredWorkplaces
                                workplace={filteredWorkplaces}
                                setPage={setPage}
                                setItemPerPage={setItemPerPage}
                                itemPerPage={itemPerPage}
                            />
                        )
                    )
                ) : null}
                {!filteredDataLength && (
                    <TabNavigation tabs={tabs}>
                        {({ header, element }: any) => (
                            <div>
                                <div>{header}</div>
                                <div className="mt-3">{element}</div>
                            </div>
                        )}
                    </TabNavigation>
                )}
            </div>
        </>
    )
}
Workplace.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'Workplace' }}>
            {page}
        </SubAdminLayout>
    )
}

export default Workplace
