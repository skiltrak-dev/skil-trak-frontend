import { useRouter } from 'next/router'

// Icons

// components
import {
    Card,
    EmptyData,
    Filter,
    LoadingAnimation,
    MyStudentQuickFilters,
    MyStudentsFilters,
    Table,
    TableChildrenProps,
} from '@components'

import { TechnicalError } from '@components/ActionAnimations/TechnicalError'
import { useGetSubAdminMyStudentsQuery } from '@queries'
import { SubAdmin, SubAdminStudentsFilterType } from '@types'
import { useEffect, useState } from 'react'

import { useSubadminProfile } from '@hooks'
import {
    filterAwaitingAgreementBeyondSevenDays,
    findCallLogsUnanswered,
    findExpiringInNext45Days,
    getFilterQuery,
} from '@utils'
import { useColumns } from './hooks'

const filterKeys = [
    'nowp',
    'name',
    'email',
    'phone',
    'rtoId',
    'suburb',
    'status',
    'courseId',
    'completed',
    'studentId',
    'industryId',
    'currentStatus',
    'flagged',
    'snoozed',
    'nonContactable',
    'coordinator',
]

export const MyStudents = () => {
    const router = useRouter()
    const [filterAction, setFilterAction] = useState(null)
    const [filter, setFilter] = useState<SubAdminStudentsFilterType>(
        {} as SubAdminStudentsFilterType
    )
    const [snoozed, setSnoozed] = useState<boolean>(false)
    const [nonContactable, setNonContactable] = useState<boolean>(false)
    const [flagged, setFlagged] = useState<boolean>(false)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [isRouting, setIsRouting] = useState(true)
    const coordinatorProfile = useSubadminProfile()

    useEffect(() => {
        const query = getFilterQuery<SubAdminStudentsFilterType>({
            router,
            filterKeys,
        })
        setFilter(query as SubAdminStudentsFilterType)

        if (!isRouting) return
        const newPage = Number(router.query.page)
        const newItemPerPage = Number(router.query.pageSize)
        if (router.query.page) {
            setPage(newPage)
        }
        if (router.query.pageSize) {
            setItemPerPage(newItemPerPage)
        }
    }, [router.query.page, router.query.pageSize, isRouting])

    const { isLoading, isFetching, data, isError } =
        useGetSubAdminMyStudentsQuery(
            {
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
                search: `${JSON.stringify({
                    ...filter,
                    ...(flagged === true && { flagged }),
                    ...(snoozed === true && { snoozed }),
                    ...(nonContactable === true && { nonContactable }),
                })
                    .replaceAll('{', '')
                    .replaceAll('}', '')
                    .replaceAll('"', '')
                    .trim()}`,
            },
            {
                refetchOnMountOrArgChange: 30,
            }
        )

    const { columns, modal } = useColumns()

    return (
        <div>
            {modal}

            {!coordinatorProfile?.canViewAllStudents && (
                <div className="flex justify-end items-center gap-x-3 mb-4">
                    <MyStudentQuickFilters
                        setSnoozed={setSnoozed}
                        setFlagged={setFlagged}
                        setNonContactable={setNonContactable}
                        snoozed={snoozed}
                        flagged={flagged}
                        nonContactable={nonContactable}
                    />
                    {filterAction}
                </div>
            )}
            {!coordinatorProfile?.canViewAllStudents && (
                <div className="w-full py-4">
                    <Filter<SubAdminStudentsFilterType>
                        setFilter={(f: SubAdminStudentsFilterType) => {
                            // setStudentId(null)
                            setFilter(f)
                        }}
                        initialValues={filter}
                        filterKeys={filterKeys}
                        setFilterAction={setFilterAction}
                        component={MyStudentsFilters}
                    />
                </div>
            )}
            <Card noPadding>
                {isError && <TechnicalError />}

                {isLoading || isFetching ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data.length ? (
                    <Table
                        columns={columns}
                        data={data?.data}
                        // quickActions={quickActionsElements}
                        enableRowSelection
                        awaitingAgreementBeyondSevenDays={filterAwaitingAgreementBeyondSevenDays(
                            data?.data
                        )}
                        findCallLogsUnanswered={findCallLogsUnanswered(
                            data?.data
                        )}
                        findExpiringInNext45Days={findExpiringInNext45Days(
                            data?.data
                        )}
                    >
                        {({
                            table,
                            pagination,
                            pageSize,
                            quickActions,
                        }: TableChildrenProps) => {
                            return (
                                <div>
                                    <div className="p-6 mb-2 flex justify-between">
                                        {pageSize &&
                                            pageSize(
                                                itemPerPage,
                                                (e) => {
                                                    setItemPerPage(e)
                                                    setIsRouting(false)
                                                },
                                                data?.data?.length
                                            )}
                                        <div className="flex gap-x-2">
                                            {quickActions}
                                            {pagination &&
                                                pagination(
                                                    data?.pagination,
                                                    setPage
                                                )}
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto remove-scrollbar">
                                        <div
                                            className="px-6 w-full"
                                            id={'studentScrollId'}
                                        >
                                            {table}
                                        </div>
                                    </div>
                                    {data?.data?.length > 10 && (
                                        <div className="p-6 mb-2 flex justify-between">
                                            {pageSize &&
                                                pageSize(
                                                    itemPerPage,
                                                    (e) => {
                                                        setItemPerPage(e)
                                                        setIsRouting(false)
                                                    },
                                                    data?.data?.length
                                                )}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination &&
                                                    pagination(
                                                        data?.pagination,
                                                        setPage
                                                    )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        }}
                    </Table>
                ) : (
                    !isError && (
                        <EmptyData
                            title={'No Students'}
                            description={'You have not added any Student'}
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </div>
    )
}
