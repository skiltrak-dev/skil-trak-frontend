import { useRouter } from 'next/router'

// Icons

// components
import {
    Card,
    EmptyData,
    LoadingAnimation,
    StudentStatusProgressCell,
    Table,
} from '@components'

import { TechnicalError } from '@components/ActionAnimations/TechnicalError'
import { useJoyRide } from '@hooks'
import { SubAdminApi } from '@queries'
import { SubAdmin } from '@types'
import { useEffect, useState } from 'react'

import {
    WorkplaceCurrentStatus,
    checkStudentStatus,
    getStudentWorkplaceAppliedIndustry,
} from '@utils'
import { useColumns } from './hooks'

export const CompletedStudents = () => {
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

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    const { isLoading, data, isError, isFetching } =
        SubAdminApi.Student.useCompletedStudents(
            {
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            {
                refetchOnMountOrArgChange: 30,
            }
        )

    const { modal, columns } = useColumns()

    columns.splice(5, 1, {
        accessorKey: 'progress',
        header: () => <span>Progress</span>,
        cell: ({ row }) => {
            const student = row.original
            const workplace = student?.workplace
                ?.filter(
                    (w: any) =>
                        w?.currentStatus !== WorkplaceCurrentStatus.Cancelled
                )
                ?.reduce(
                    (a: any, b: any) => (a?.createdAt > b?.createdAt ? a : b),
                    {
                        currentStatus: WorkplaceCurrentStatus.NotRequested,
                    }
                )

            const studentStatus = checkStudentStatus(student?.studentStatus)
            const appliedIndustry = getStudentWorkplaceAppliedIndustry(
                workplace?.industries
            )

            return (
                <StudentStatusProgressCell
                    assigned={student?.subadmin}
                    studentId={student?.id}
                    step={
                        workplace?.currentStatus ===
                        WorkplaceCurrentStatus.Cancelled
                            ? 4
                            : studentStatus
                    }
                    appliedIndustry={appliedIndustry}
                    studentProvidedWorkplace={
                        workplace?.studentProvidedWorkplace ||
                        workplace?.byExistingAbn
                    }
                />
            )
        },
    })

    return (
        <div>
            {modal}
            {isError && <TechnicalError />}
            <Card noPadding>
                {isLoading || isFetching ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data.length && !isError ? (
                    <Table columns={columns} data={data.data}>
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
