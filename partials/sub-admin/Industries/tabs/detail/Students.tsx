import { useRouter } from 'next/router'
import { ReactElement } from 'react'

// Icons
import { FaEye } from 'react-icons/fa'

// components
import {
    ActionButton,
    Card,
    EmptyData,
    InitialAvatar,
    LoadingAnimation,
    PlacementTableCell,
    Table,
    TableAction,
    TableActionOption,
} from '@components'
// import { StudentCellInfo } from './components'

import { TechnicalError } from '@components/ActionAnimations/TechnicalError'
// import { useGetSubAdminIndustryStudentsQuery, useGetSubAdminStudentsQuery } from '@queries'
import { useJoyRide } from '@hooks'
import { Student } from '@types'
import { useEffect, useState } from 'react'
import { MdBlock } from 'react-icons/md'

import { IndustryCell } from '@partials/admin/industry/components'
import { getActiveIndustry } from '@partials/student/utils'
import { StudentCellInfo } from '@partials/sub-admin/students'
import { AssignStudentModal } from '@partials/sub-admin/students/modals'

type Props = {
    itemPerPage: number
    setItemPerPage: (value: number) => void
    setPage: (value: number) => void
    student: any
}
export const Students = ({
    student,
    itemPerPage,
    setItemPerPage,
    setPage,
}: Props) => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)

    // WORKPLACE JOY RIDE - Start
    const joyride = useJoyRide()

    useEffect(() => {
        if (joyride.state.tourActive) {
            setTimeout(() => {
                joyride.setState({ ...joyride.state, run: true, stepIndex: 2 })
            }, 1200)
        }
    }, [])
    // STUDENT JOY RIDE - END

    const onModalCancelClicked = () => {
        setModal(null)
    }

    const tableActionOptions: TableActionOption<any>[] = [
        {
            text: 'View',
            onClick: (student: Student) => {
                router.push(
                    `/portals/sub-admin/students/${student.id}?tab=overview`
                )
            },
            Icon: FaEye,
        },
    ]

    const Columns = [
        {
            header: () => 'Name',
            accessorKey: 'user',
            sort: true,
            cell: ({ row }: any) => {
                return <StudentCellInfo student={row.original} />
            },
        },

        {
            header: () => 'RTO',
            accessorKey: 'rto',
            cell({ row }: any) {
                const { rto } = row.original
                return (
                    <div className="flex gap-x-2 items-center">
                        <InitialAvatar name={rto?.user?.name} small />
                        {rto?.user?.name}
                    </div>
                )
            },
        },
        {
            header: () => 'Industry',
            accessorKey: 'industry',
            cell({ row }: any) {
                const { workplace } = row.original
                const industry = getActiveIndustry(workplace)

                return (
                    <div className="flex justify-center">
                        {industry ? (
                            <IndustryCell industry={industry} />
                        ) : (
                            <div>N/A</div>
                        )}
                    </div>
                )
            },
        },
        {
            header: () => 'Progress',
            accessorKey: 'progress',
            cell: ({ row }: any) => {
                return (
                    <div className="flex justify-center">
                        <PlacementTableCell request={row.original.workplace} />
                    </div>
                )
            },
        },
        {
            header: () => 'Action',
            accessorKey: 'Action',
            cell: ({ row }: any) => {
                return (
                    <ActionButton
                        onClick={() => {
                            router.push(
                                `/portals/sub-admin/students/${row.original?.id}?tab=overview`
                            )
                        }}
                        variant="warning"
                        Icon={FaEye}
                    >
                        View
                    </ActionButton>
                )
                return (
                    <TableAction
                        options={tableActionOptions}
                        rowItem={row.original}
                    />
                )
            },
        },
    ]

    return (
        <div>
            {modal && modal}
            {student?.isError && <TechnicalError />}
            <Card noPadding>
                {student?.isLoading ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : student?.data?.data && student?.data?.data?.length ? (
                    <Table
                        columns={Columns}
                        data={student?.data?.data}
                        // quickActions={quickActionsElements}
                        enableRowSelection
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
                                            student?.data?.data?.length
                                        )}
                                        <div className="flex gap-x-2">
                                            {quickActions}
                                            {pagination(
                                                student?.data?.pagination,
                                                setPage
                                            )}
                                        </div>
                                    </div>
                                    <div id="add-note-student" className="px-6">
                                        {table}
                                    </div>
                                </div>
                            )
                        }}
                    </Table>
                ) : (
                    !student?.isError && (
                        <EmptyData
                            title={'No Students'}
                            description={
                                'You have not approved any Student yet'
                            }
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </div>
    )
}
