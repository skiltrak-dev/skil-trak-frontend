import { useRouter } from 'next/router'

import { Card, EmptyData, LoadingAnimation, Table } from '@components'

import { TechnicalError } from '@components/ActionAnimations/TechnicalError'
import { useJoyRide } from '@hooks'
import { SubAdminApi } from '@queries'
import { useEffect, useState } from 'react'

import {
    activeAndCompleted,
    filterAwaitingAgreementBeyondSevenDays,
    findCallLogsUnanswered,
    findExpiringInNext45Days,
} from '@utils'
import { useColumns } from './hooks'

export const StudentScheduleEndedList = () => {
    const router = useRouter()

    const [mount, setMount] = useState(false)

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

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    const { isSuccess, isLoading, data, isError, isFetching, refetch } =
        SubAdminApi.Student.useList(
            {
                search: `schedule:${true}`,
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            {
                refetchOnMountOrArgChange: 30,
            }
        )

    const { columns } = useColumns()

    columns.splice(
        3,
        0,
        {
            accessorKey: 'user.schedules',
            header: () => <span>Total Hours</span>,
            cell: ({ row }) => (
                <div>
                    <ol>
                        {row.original?.user?.schedules?.map(
                            (schedule: any, index: number) => (
                                <li key={index}>{schedule?.hours ?? 'NA'}</li>
                            )
                        )}
                    </ol>
                </div>
            ),
        },
        {
            accessorKey: 'scheduleStartDate',
            header: () => <span>Schedule End Date</span>,
            cell: ({ row }) => (
                <div>
                    <div>
                        <ol>
                            {row.original?.user?.schedules?.map(
                                (schedule: any, index: number) => (
                                    <li
                                        className="whitespace-nowrap"
                                        key={index}
                                    >
                                        {schedule?.endDate?.slice(0, 10) ??
                                            'NA'}
                                    </li>
                                )
                            )}
                        </ol>
                    </div>
                </div>
            ),
        }
    )

    return (
        <div>
            {isError && <TechnicalError />}
            <Card noPadding>
                {isLoading || isFetching ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data.length && !isError ? (
                    <Table
                        columns={columns}
                        data={data?.data}
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
                        }: any) => {
                            return (
                                <div>
                                    <div className="p-6 mb-2 flex justify-between">
                                        {pageSize(
                                            itemPerPage,
                                            setItemPerPage,
                                            data?.data?.length
                                        )}
                                        <div className="flex gap-x-2">
                                            {quickActions}
                                            {pagination(
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
                                            {pageSize(
                                                itemPerPage,
                                                setItemPerPage,
                                                data?.data?.length
                                            )}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination(
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
