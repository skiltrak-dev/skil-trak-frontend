import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { ReactElement, useEffect, useMemo, useState } from 'react'

import {
    BackButton,
    LoadingAnimation,
    Select,
    TabNavigation,
    TabProps,
    TechnicalError,
} from '@components'
import { FigureCard } from '@components/sections/subAdmin'
import {
    DepartmentPendingStudents,
    DepartmentPlacementStartedStudentList,
    DepartmentStudentList,
    FilterDepartmentStudents,
    FlaggedDepartmentStudentList,
    NonContactableDepartmentStudentList,
    SnoozedDepartmentStudentList,
} from '@partials/sub-admin'
import { SubAdminApi } from '@queries'
import { getFilterQuery, removeEmptyValues } from '@utils'
import { useRouter } from 'next/router'
import { BiSolidAlarmSnooze } from 'react-icons/bi'
import { FaFlag, FaUserFriends } from 'react-icons/fa'
import { FiPhoneOff } from 'react-icons/fi'

interface StudentCounts {
    active: number
    flagged: number
    snoozed: number
    nonContactable: number
}

const filterKeys = ['subadminId']

const DepartmentStudents: NextPageWithLayout = () => {
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState<any>({} as any)
    const [coordinatorId, setCoordinatorId] = useState<string | null>(null)
    const router = useRouter()

    const filteredStudents = SubAdminApi.SubAdmin.useDepartmentStudents(
        {
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
            search: coordinatorId
                ? `${JSON.stringify(
                      removeEmptyValues({
                          subadminId: coordinatorId,
                      })
                  )
                      .replaceAll('{', '')
                      .replaceAll('}', '')
                      .replaceAll('"', '')
                      .trim()}`
                : '',
        },
        {
            // Only fetch filtered results when we have a coordinatorId
            skip: !coordinatorId,
        }
    )
    // Memoized student counts calculation
    const studentCounts = useMemo((): StudentCounts => {
        if (!filteredStudents?.data?.data) {
            return {
                active: 0,
                flagged: 0,
                snoozed: 0,
                nonContactable: 0,
            }
        }

        // Single pass through the data to calculate all counts
        return filteredStudents.data.data.reduce(
            (counts: any, student: any) => {
                if (student.hasIssue) counts.flagged++
                else if (student.isSnoozed) counts.snoozed++
                else if (student.nonContactable) counts.nonContactable++
                else counts.active++

                return counts
            },
            {
                active: 0,
                flagged: 0,
                snoozed: 0,
                nonContactable: 0,
            }
        )
    }, [filteredStudents?.data?.data])

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
        const query = getFilterQuery<any>({
            router,
            filterKeys,
        })
        setFilter(query as any)
    }, [router])

    const { data: departmentCoordinators } =
        SubAdminApi.SubAdmin.useCoordinatorsDropDown()

    const coordinatorsOptions = departmentCoordinators?.map(
        (coordinator: any) => ({
            label: coordinator?.user?.name,
            value: coordinator?.id,
        })
    )

    const { data, isLoading, isError } =
        SubAdminApi.SubAdmin.useDepartmentStudentsCount()

    const tabs: TabProps[] = [
        {
            label: 'Pending Students',
            href: {
                pathname: 'students',
                query: { tab: 'pending-students' },
            },
            badge: {
                text: data?.pendingStudents,
                loading: isLoading,
            },
            element: <DepartmentPendingStudents />,
        },
        {
            label: 'Department Students',
            href: {
                pathname: 'students',
                query: { tab: 'all-students' },
            },
            badge: {
                text: data?.allStudents,
                loading: isLoading,
            },
            element: <DepartmentStudentList />,
        },
        // DepartmentPlacementStartedStudentList
        {
            label: 'Placement Started Students',
            href: {
                pathname: 'students',
                query: { tab: 'placement-started-students' },
            },
            badge: {
                text: data?.placementStarted,
                loading: isLoading,
            },
            element: <DepartmentPlacementStartedStudentList />,
        },
        {
            label: 'Snoozed Students',
            href: {
                pathname: 'students',
                query: { tab: 'snoozed-students' },
            },
            badge: {
                text: data?.snoozedStudents,
                loading: isLoading,
            },
            element: <SnoozedDepartmentStudentList />,
        },
        {
            label: 'Flagged Students',
            href: {
                pathname: 'students',
                query: { tab: 'flagged-students' },
            },
            badge: {
                text: data?.flaggedStudents,
                loading: isLoading,
            },
            element: <FlaggedDepartmentStudentList />,
        },
        {
            label: 'Non-Contactable Students',
            href: {
                pathname: 'students',
                query: { tab: 'non-contactable-students' },
            },
            badge: {
                text: data?.notContactableStudents,
                loading: isLoading,
            },
            element: <NonContactableDepartmentStudentList />,
        },
    ]

    const onFilterByCoordinator = (value: string) => {
        setCoordinatorId(value || null)
    }

    const StudentStats = useMemo(
        () => (
            <div className="flex gap-x-4 gap-y-2 mb-5">
                <FigureCard
                    count={studentCounts?.active}
                    title="Active Students"
                    Icon={FaUserFriends}
                    iconClassName="text-green-400"
                    loading={filteredStudents.isLoading}
                />
                <FigureCard
                    count={studentCounts?.flagged}
                    title="Flagged Students"
                    Icon={FaFlag}
                    iconClassName="text-red-500"
                    loading={filteredStudents.isLoading}
                />
                <FigureCard
                    count={studentCounts?.snoozed}
                    title="Snoozed Students"
                    Icon={BiSolidAlarmSnooze}
                    iconClassName="text-indigo-400"
                    loading={filteredStudents.isLoading}
                />
                <FigureCard
                    count={studentCounts?.nonContactable}
                    title="Non-Contactable Students"
                    Icon={FiPhoneOff}
                    iconClassName="text-red-400"
                    loading={filteredStudents.isLoading}
                />
            </div>
        ),
        [studentCounts]
    )

    return (
        <div className="">
            <div className="w-full flex justify-end">
                <div className="min-w-64">
                    <Select
                        label={'Filter by Coordinator'}
                        name={'coordinator'}
                        placeholder={'Filter by Coordinator...'}
                        options={coordinatorsOptions}
                        onlyValue
                        onChange={(e: any) => {
                            onFilterByCoordinator(e)
                        }}
                    />
                </div>
            </div>
            <BackButton text={'Go Back'} />

            {/* Show filtered view only when we have a coordinator selected */}
            {coordinatorId && (
                <>
                    {filteredStudents.isError && <TechnicalError />}
                    {filteredStudents.isLoading ? (
                        <LoadingAnimation />
                    ) : (
                        filteredStudents.isSuccess && (
                            <>
                                {StudentStats}
                                <FilterDepartmentStudents
                                    data={filteredStudents}
                                    setPage={setPage}
                                    itemPerPage={itemPerPage}
                                    setItemPerPage={setItemPerPage}
                                />
                            </>
                        )
                    )}
                </>
            )}

            {/* Show tab navigation when no coordinator is selected */}
            {!coordinatorId && (
                <TabNavigation tabs={tabs}>
                    {({ header, element }: any) => (
                        <div>
                            <div>{header}</div>
                            <div className="p-4">{element}</div>
                        </div>
                    )}
                </TabNavigation>
            )}
        </div>
    )
}

DepartmentStudents.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default DepartmentStudents
