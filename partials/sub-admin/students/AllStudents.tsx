import { useRouter } from 'next/router'

// Icons
import { FaEdit, FaUsers } from 'react-icons/fa'

// components
import {
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TableActionOption,
    TableChildrenProps,
} from '@components'
import { AssignCoordinator } from './components'

import { TechnicalError } from '@components/ActionAnimations/TechnicalError'
import { useJoyRide, useSubadminProfile } from '@hooks'
import { SubAdminApi } from '@queries'
import { Student, UserStatus } from '@types'
import { useEffect, useState } from 'react'

import {
    activeAndCompleted,
    filterAwaitingAgreementBeyondSevenDays,
    findCallLogsUnanswered,
    findExpiringInNext45Days,
} from '@utils'
import { useColumns } from './hooks'

export const AllStudents = () => {
    const router = useRouter()

    const [mount, setMount] = useState(false)

    const subadmin = useSubadminProfile()

    useEffect(() => {
        if (!mount) {
            setMount(true)
        }
    }, [])

    // WORKPLACE JOY RIDE - Start
    const joyride = useJoyRide()
    useEffect(() => {
        if (joyride.state.tourActive && mount) {
            setTimeout(() => {
                joyride.setState({ ...joyride.state, run: true, stepIndex: 1 })
            }, 1200)
        }
    }, [mount])

    // STUDENT JOY RIDE - END

    const {
        modal,
        columnsWithCustomActions,
        onInterviewClicked,
        onChangeStatus,
        onDateClick,
    } = useColumns()

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [isRouting, setIsRouting] = useState(true)

    useEffect(() => {
        if (!isRouting) return
        const newPage = Number(router.query.page)
        const newItemPerPage = Number(router.query.pageSize)
        if (router.query.page) {
            setPage(newPage)
        }
        if (router.query.pageSize) {
            setItemPerPage(newItemPerPage)
        }
    }, [router])

    const coordinatorProfile = SubAdminApi.SubAdmin.useProfile()
    const checkIsHod = coordinatorProfile?.data?.departmentMember?.isHod

    // useSubAdminFlaggedStudents
    const { isLoading, data, isError, isFetching, refetch } =
        SubAdminApi.Student.useList(
            {
                search: `status:${UserStatus.Approved}`,
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            {
                refetchOnMountOrArgChange: 30,
            }
        )

    const tableActionOptions: TableActionOption<Student>[] = [
        {
            text: 'Interview',
            onClick: (student) => onInterviewClicked(student),
            Icon: FaUsers,
        },
        {
            text: 'Change Status',
            onClick: (student) => onChangeStatus(student),
            Icon: FaEdit,
        },

        {
            text: 'Change Expiry',
            onClick: (student) => onDateClick(student),
            Icon: FaEdit,
        },
    ]

    const updatedColumns = columnsWithCustomActions(tableActionOptions)

    if (!subadmin?.isAssociatedWithRto) {
        updatedColumns.splice(6, 0, {
            accessorKey: 'assignCoordinator',
            header: () => <span>Assign Coordinator</span>,
            cell: ({ row }) => {
                if (!checkIsHod) return <p>---</p>
                return <AssignCoordinator student={row?.original} />
            },
        })
    }

    return (
        <div>
            {modal}
            {isError && <TechnicalError />}
            <Card noPadding>
                {isLoading || isFetching ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data.length && !isError ? (
                    <Table
                        columns={updatedColumns}
                        data={data.data}
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
                        activeAndCompleted={activeAndCompleted(data?.data)}
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
                            description={'You have not approved Students yet'}
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </div>
    )
}
