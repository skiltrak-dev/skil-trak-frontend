import {
    Button,
    Card,
    CaseOfficerAssignedStudent,
    EmptyData,
    LoadingAnimation,
    StudentExpiryDaysLeft,
    Table,
    TableAction,
    TechnicalError,
    Typography,
    UserCreatedAt,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEye } from 'react-icons/fa'

export const Students = () => {
    return <div>Students</div>
}

import { EditTimer } from '@components/StudentTimer/EditTimer'
import {
    IndustryCell,
    SectorCell,
    StudentCellInfo,
} from '@partials/rto/student/components'
import { ArchiveModal, BlockModal } from '@partials/rto/student/modals'
import { ChangeStudentStatusModal } from '@partials/sub-admin/students/modals'
import { RtoApi, useGetRtoStudentsQuery } from '@queries'
import { Student, UserStatus } from '@types'
import { getUserCredentials, studentsListWorkplace } from '@utils'
import { saveAs } from 'file-saver'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { MdBlock } from 'react-icons/md'
import Link from 'next/link'

export const RtoDashboardStudents = () => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [changeExpiryData, setChangeExpiryData] = useState(false)
    const [isExcelDownload, setIsExcelDownload] = useState<boolean>(false)
    const userId = getUserCredentials()?.id

    const exportList = RtoApi.Students.useExportStudentList(
        {
            status: `active`,
            userId,
        },
        { skip: !isExcelDownload }
    )

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const { isLoading, data, isError, refetch } = useGetRtoStudentsQuery({
        search: `status:${UserStatus.Approved}`,
        skip: 0,
        limit: 5,
    })

    // Download excel
    useEffect(() => {
        if (exportList?.data?.file?.data && exportList?.isSuccess) {
            const buffer = Buffer.from(exportList.data.file.data)
            const blob = new Blob([buffer], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            })
            saveAs(blob)
            setIsExcelDownload(false)
        }
    }, [exportList?.data, exportList?.isSuccess])

    const onModalCancelClicked = () => setModal(null)

    const onBlockClicked = (student: Student) => {
        setModal(
            <BlockModal
                item={student}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const onArchiveClicked = (student: Student) => {
        setModal(
            <ArchiveModal
                item={student}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const onChangeStatus = (student: Student) => {
        setModal(
            <ChangeStudentStatusModal
                student={student}
                onCancel={onModalCancelClicked}
            />
        )
    }

    const onDateClick = (student: Student) => {
        setModal(
            <EditTimer
                studentId={student?.user?.id}
                date={student?.expiryDate}
                onCancel={onModalCancelClicked}
            />
        )
    }

    const tableActionOptions = (student: Student) => {
        return [
            {
                text: 'View',
                onClick: (student: Student) =>
                    router.push(
                        `/portals/rto/students/${student.id}?tab=overview`
                    ),
                Icon: FaEye,
            },
            {
                text: 'Edit',
                onClick: (student: Student) =>
                    router.push(
                        `portals/rto/students/${student.id}/edit-student`
                    ),
                Icon: FaEye,
            },
            {
                text: 'Archive',
                onClick: (student: Student) => onArchiveClicked(student),
                Icon: MdBlock,
                color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
            },
            {
                text: 'Block',
                onClick: (student: Student) => onBlockClicked(student),
                Icon: MdBlock,
                color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
            },
        ]
    }

    const columns: ColumnDef<Student>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => {
                return <StudentCellInfo student={info.row.original} call />
            },
            header: () => <span>Student</span>,
        },
        {
            accessorKey: 'industry',
            header: () => <span>Industry</span>,
            cell: (info: any) => {
                const industry = info.row.original?.industries

                const appliedIndustry = studentsListWorkplace(
                    info.row.original?.workplace
                )

                return industry && industry?.length > 0 ? (
                    <IndustryCell industry={industry[0]} />
                ) : info.row.original?.workplace &&
                  info.row.original?.workplace?.length > 0 &&
                  appliedIndustry ? (
                    <IndustryCell industry={appliedIndustry} />
                ) : (
                    <Typography center>N/A</Typography>
                )
            },
        },
        {
            accessorKey: 'sectors',
            header: () => <span>Sectors</span>,
            cell: (info) => {
                return <SectorCell student={info.row.original} />
            },
        },
        {
            accessorKey: 'expiry',
            header: () => <span>Expiry Date</span>,
            cell: (info) => (
                <StudentExpiryDaysLeft
                    expiryDate={info.row.original?.expiryDate}
                />
            ),
        },
        {
            accessorKey: 'progress',
            header: () => <span>Progress</span>,
            cell: ({ row }) => (
                <CaseOfficerAssignedStudent student={row.original} />
            ),
        },
        {
            accessorKey: 'assigned',
            header: () => <span>Assigned Coordinator</span>,
            cell: ({ row }: any) =>
                row.original?.rtoCoordinator ? (
                    <div>
                        <Typography variant="label">
                            {row.original?.rtoCoordinator?.user?.name}
                        </Typography>
                        <Typography variant="small" color={'text-gray-400'}>
                            {row.original?.rtoCoordinator?.user?.email}
                        </Typography>
                        <Typography variant="small" color={'text-gray-400'}>
                            {row.original?.rtoCoordinator?.phone}
                        </Typography>
                    </div>
                ) : (
                    '----'
                ),
        },
        {
            accessorKey: 'createdAt',
            header: () => <span>Created At</span>,
            cell: ({ row }: any) => (
                <UserCreatedAt createdAt={row.original?.createdAt} />
            ),
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info) => {
                const tableActionOption = tableActionOptions(info.row.original)
                return (
                    <div className="flex gap-x-1 items-center">
                        <TableAction
                            options={tableActionOption}
                            rowItem={info.row.original}
                        />
                    </div>
                )
            },
        },
    ]

    const links = [
        {
            text: 'Assessment Tools',
            link: '/portals/rto/tasks/assessment-tools',
        },
        {
            text: 'Appointments',
            link: '/portals/rto/tasks/appointments',
        },
        {
            text: 'E-Sign',
            link: '/portals/rto/tasks/e-sign',
        },
    ]

    return (
        <>
            {modal && modal}
            <Card fullHeight shadowType="profile" noPadding>
                <div className="px-4 py-3 flex justify-between items-center border-b border-secondary-dark">
                    <Typography semibold>
                        <span className="text-[15px]">Active Students</span>
                    </Typography>
                    <div className="flex items-center gap-x-14">
                        {links?.map((link) => (
                            <Link href={link?.link}>
                                <span className="text-[15px] font-medium underline text-[#007AFF]">
                                    {link?.text}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="relative">
                    <div
                        className={
                            'group flex justify-center absolute top-0 left-0 w-full h-full z-20 bg-gradient-black-to-white'
                        }
                    >
                        <div
                            className={
                                'transition-all mt-9 hidden group-hover:block'
                            }
                        >
                            <Button
                                text={'View All Students'}
                                onClick={() => {
                                    router.push(
                                        `/portals/rto/students?tab=active`
                                    )
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-4">
                        <div>
                            {isError && <TechnicalError />}
                            {isLoading ? (
                                <LoadingAnimation height="h-[60vh]" />
                            ) : data && data?.data.length ? (
                                <Table columns={columns} data={data.data}>
                                    {({ table, pagination, pageSize }: any) => {
                                        return (
                                            <div className="px-6 overflow-auto custom-scrollbar">
                                                {table}
                                            </div>
                                        )
                                    }}
                                </Table>
                            ) : (
                                !isError && (
                                    <EmptyData
                                        title={'No Approved Student!'}
                                        description={
                                            'You have not approved any Student request yet'
                                        }
                                        height={'50vh'}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
}
