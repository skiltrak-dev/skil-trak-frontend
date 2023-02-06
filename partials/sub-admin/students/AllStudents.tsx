import { ReactElement } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

// Icons
import { FaEnvelope, FaEye } from 'react-icons/fa'

// components
import {
    Card,
    EmptyData,
    InitialAvatar,
    LoadingAnimation,
    PlacementTableCell,
    ProgressStep,
    Table,
    TableAction,
    TableActionOption,
    Typography,
} from '@components'
import { StudentCellInfo } from './components'

import { TechnicalError } from '@components/ActionAnimations/TechnicalError'
import { useGetSubAdminStudentsQuery } from '@queries'
import { Student } from '@types'
import { useEffect, useState } from 'react'
import { useJoyRide } from '@hooks'
import { MdBlock } from 'react-icons/md'
import { AssignStudentModal } from './modals'

import { IndustryCellInfo } from '../indestries/components'
import { IndustryCell } from '@partials/admin/industry/components'
import { getActiveIndustry } from '@partials/student/utils'
import { checkWorkplaceStatus } from '@utils'
import { ProgressCell, SectorCell } from '@partials/admin/student/components'

export const AllStudents = () => {

    const router = useRouter()

    // WORKPLACE JOY RIDE - Start
    const joyride = useJoyRide()

    useEffect(() => {
        if (joyride.state.tourActive) {
            console.log('tour active', joyride.state.tourActive)
            setTimeout(() => {
                joyride.setState({ ...joyride.state, run: true, stepIndex: 1 })
            }, 1200)
        }
    }, [router])
    
    // STUDENT JOY RIDE - END





    const [modal, setModal] = useState<ReactElement | null>(null)

    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({})
    const { isLoading, data, isError } = useGetSubAdminStudentsQuery({
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })




    const onModalCancelClicked = () => {
        setModal(null)
    }
    const onAssignStudentClicked = (student: Student) => {
        setModal(
            <AssignStudentModal
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
                    `/portals/sub-admin/students/${student.id}?tab=overview`
                )
            },
            Icon: FaEye,
        },
        {
            text: 'Assign to me',
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
                return (
                    <div id="student-profile">
                        <StudentCellInfo student={row.original} />
                    </div>
                )
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
            accessorKey: 'sectors',
            header: () => <span>Sectors</span>,
            cell: ({ row }: any) => {
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
            {isError && <TechnicalError />}
            <Card noPadding>
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
                                    <div id="students-list" className="px-6">{table}</div>
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