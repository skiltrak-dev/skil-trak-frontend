import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

// Icons
import { FaEye, FaEnvelope } from 'react-icons/fa'

// components
import {
    Card,
    TableActionOption,
    Typography,
    TableAction,
    LoadingAnimation,
    Table,
    EmptyData,
    InitialAvatar,
    PlacementTableCell,
} from '@components'
import { StudentCellInfo } from './components'

import { Student } from '@types'
import { useState, ReactElement } from 'react'
import { useGetSubAdminMyStudentsQuery } from '@queries'
import { TechnicalError } from '@components/ActionAnimations/TechnicalError'
import { UnAssignStudentModal } from './modals'
import { MdBlock } from 'react-icons/md'

import { getActiveIndustry } from '@partials/student/utils'
import { IndustryCell } from '@partials/admin/industry/components'
import { IndustryCellInfo } from '../indestries/components'
import { ProgressCell, SectorCell } from '@partials/admin/student/components'
import { checkWorkplaceStatus } from '@utils'

export const MyStudents = () => {
    const router = useRouter()

    const [modal, setModal] = useState<ReactElement | null>(null)

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const { isLoading, data, isError } = useGetSubAdminMyStudentsQuery({
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    const onModalCancelClicked = () => {
        setModal(null)
    }
    const onAssignStudentClicked = (student: Student) => {
        setModal(
            <UnAssignStudentModal
                student={student}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (student: Student) => {
                router.push(
                    `/portals/sub-admin/users/students/${student.id}?tab=overview`
                )
            },
            Icon: FaEye,
        },
        {
            text: 'Un Assign',
            onClick: (student: Student) => onAssignStudentClicked(student),
            Icon: MdBlock,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
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
                        <InitialAvatar name={rto.user.name} small />
                        {rto.user.name}
                    </div>
                )
            },
        },
        {
            accessorKey: 'industry',
            header: () => <span>Industry</span>,
            cell: (info: any) => {
                const industry =
                    info.row.original?.workplace[0]?.industries?.find(
                        (i: any) => i.applied
                    )?.industry

                return industry ? (
                    <IndustryCellInfo industry={industry} />
                ) : (
                    <Typography center>N/A</Typography>
                )
            },
        },
        {
            accessorKey: 'sectors',
            header: () => <span>Sectors</span>,
            cell: ({row}:any) => {
                return <SectorCell student={row.original} />
            },
        },
        {
            header: () => 'Progress',
            accessorKey: 'progress',
            cell: ({ row }: any) => {
                const workplace = row.original.workplace[0]
                const steps = checkWorkplaceStatus(workplace?.currentStatus)
                return (
                    <ProgressCell
                        step={steps > 9 ? 9 : steps < 1 ? 1 : steps}
                    />
                )
            },
        },
        {
            header: () => 'Action',
            accessorKey: 'Action',
            cell: ({ row }: any) => {
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
            <Card noPadding>
                {isError && <TechnicalError />}
                {isLoading ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data.length ? (
                    <Table
                        columns={Columns}
                        data={data.data}
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
                                        {pageSize(itemPerPage, setItemPerPage)}
                                        <div className="flex gap-x-2">
                                            {quickActions}
                                            {pagination(
                                                data?.pagination,
                                                setPage
                                            )}
                                        </div>
                                    </div>
                                    <div className="px-6">{table}</div>
                                </div>
                            )
                        }}
                    </Table>
                ) : (
                    !isError && (
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
