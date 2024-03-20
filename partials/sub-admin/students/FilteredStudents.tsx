import {
    ActionButton,
    Card,
    EmptyData,
    InitialAvatar,
    LoadingAnimation,
    StudentExpiryDaysLeft,
    StudentSubAdmin,
    Table,
    TableAction,
    TableChildrenProps,
    Typography,
    UserCreatedAt,
} from '@components'
import { PageHeading } from '@components/headings'
import { useActionModal } from '@hooks'
import { ProgressCell, SectorCell } from '@partials/admin/student/components'
import { ColumnDef } from '@tanstack/react-table'
import { Student, UserStatus } from '@types'
import {
    WorkplaceCurrentStatus,
    checkWorkplaceStatus,
    getStudentWorkplaceAppliedIndustry,
    setLink,
    studentsListWorkplace,
} from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { FaEdit, FaEye, FaUsers } from 'react-icons/fa'
import { MdBlock } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import { WorkplaceWorkIndustriesType } from 'redux/queryTypes'
import { IndustryCellInfo, IndustrySubAdmin } from '../Industries'
import { InterviewModal } from '../workplace/modals'
import { StudentCellInfo } from './components'
import {
    AddToNonContactableStudents,
    AssignStudentModal,
    BlockModal,
    ChangeStudentStatusModal,
} from './modals'

export const FilteredStudents = ({
    filter,
    student,
    setPage,
    itemPerPage,
    setItemPerPage,
}: {
    filter: any
    student: any
    setPage: any
    itemPerPage: any
    setItemPerPage: any
}) => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)

    // hooks
    const { passwordModal, onViewPassword } = useActionModal()

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

    const onNonContactableStudents = (student: Student) => {
        setModal(
            <AddToNonContactableStudents
                student={student}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const onBlockClicked = (student: Student) => {
        setModal(<BlockModal item={student} onCancel={onModalCancelClicked} />)
    }

    const onChangeStatus = (student: Student) => {
        setModal(
            <ChangeStudentStatusModal
                student={student}
                onCancel={onModalCancelClicked}
            />
        )
    }

    const onInterviewClicked = (student: Student) => {
        setModal(
            <InterviewModal
                student={student}
                onCancel={onModalCancelClicked}
                workplace={Number(student?.workplace[0]?.id)}
                workIndustry={Number(
                    getStudentWorkplaceAppliedIndustry(
                        student?.workplace[0]
                            ?.industries as WorkplaceWorkIndustriesType[]
                    )?.id
                )}
            />
        )
    }

    const tableActionOptions = (student: any) => {
        return [
            {
                text: 'View',
                onClick: (student: Student) => {
                    router.push(
                        `/portals/sub-admin/students/${student?.id}/detail`
                    )

                    setLink('subadmin-student', router)
                },
                Icon: FaEye,
            },
            {
                text: 'Old Profile',
                onClick: (student: Student) => {
                    router.push(
                        `/portals/sub-admin/students/${student.id}?tab=overview`
                    )
                },
                Icon: FaEye,
            },
            {
                text: student?.subadmin ? 'Un Assign' : 'Assign to me',
                onClick: (student: Student) => onAssignStudentClicked(student),
                Icon: MdBlock,
            },
            {
                text: student?.nonContactable
                    ? 'Add to Contactable'
                    : 'Add to Not Contactable',
                onClick: (student: Student) =>
                    onNonContactableStudents(student),
                Icon: MdBlock,
            },
            {
                text: 'Interview',
                onClick: (student: Student) => onInterviewClicked(student),
                Icon: FaUsers,
            },
            {
                text: 'View Password',
                onClick: (student: Student) => onViewPassword(student),
                Icon: RiLockPasswordFill,
            },
            {
                text: 'Change Status',
                onClick: (student: Student) => onChangeStatus(student),
                Icon: FaEdit,
            },
            {
                text: 'Block',
                onClick: (student: Student) => onBlockClicked(student),
                Icon: MdBlock,
                color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
            },
        ]
    }

    const columns: ColumnDef<StudentSubAdmin>[] = [
        {
            header: () => 'Name',
            accessorKey: 'user',
            cell: ({ row }) => {
                return row.original?.user ? (
                    <StudentCellInfo student={row.original} call />
                ) : (
                    ''
                )
            },
        },
        {
            header: () => 'RTO Name',
            accessorKey: 'rto',
            cell({ row }) {
                const { rto } = row.original

                return (
                    <div className="flex gap-x-2 items-center">
                        {rto?.user?.name && (
                            <InitialAvatar name={rto?.user?.name} small />
                        )}
                        {rto.user.name}
                    </div>
                )
            },
        },
        {
            accessorKey: 'industry',
            header: () => <span>Industry</span>,
            cell: (info) => {
                const industry = info.row.original?.industries

                const appliedIndustry = studentsListWorkplace(
                    info.row.original?.workplace
                )

                return industry && industry?.length > 0 ? (
                    <IndustryCellInfo
                        industry={industry[0] as IndustrySubAdmin}
                    />
                ) : info.row.original?.workplace &&
                  info.row.original?.workplace?.length > 0 &&
                  appliedIndustry ? (
                    <IndustryCellInfo industry={appliedIndustry} />
                ) : (
                    <Typography center>N/A</Typography>
                )
            },
        },
        {
            accessorKey: 'sectors',
            header: () => <span>Sectors</span>,
            cell: ({ row }) => {
                return <SectorCell student={row.original} />
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
            cell: (info) => {
                const student = info.row.original
                const appliedIndustry = studentsListWorkplace(
                    student?.workplace
                )
                const workplace = student?.workplace?.reduce(
                    (a: any, b: any) => (a?.createdAt > b?.createdAt ? a : b),
                    {
                        currentStatus: WorkplaceCurrentStatus.NotRequested,
                    }
                )
                const steps = checkWorkplaceStatus(workplace?.currentStatus)

                return !student?.workplace?.length &&
                    student?.industries?.length ? (
                    <ProgressCell
                        appliedIndustry={appliedIndustry}
                        studentId={student?.id}
                        assigned={student?.subadmin || workplace?.assignedTo}
                        step={9}
                    />
                ) : student?.workplace && student?.workplace?.length > 0 ? (
                    <ProgressCell
                        appliedIndustry={appliedIndustry}
                        studentId={student?.id}
                        assigned={student?.subadmin || workplace?.assignedTo}
                        step={steps > 14 ? 14 : steps < 1 ? 1 : steps}
                    />
                ) : student?.subadmin ? (
                    <ProgressCell
                        appliedIndustry={appliedIndustry}
                        studentId={student?.id}
                        step={3}
                        assigned={student?.subadmin || workplace?.assignedTo}
                    />
                ) : (
                    <ProgressCell
                        appliedIndustry={appliedIndustry}
                        studentId={student?.id}
                        step={1}
                        assigned={student?.subadmin || workplace?.assignedTo}
                    />
                )
            },
            // cell: ({ row }) => (
            //     <CaseOfficerAssignedStudent
            //         student={row.original}
            //         workplaceFilter={filter?.currentStatus}
            //     />
            // ),
        },
        {
            accessorKey: 'user.status',
            header: () => <span>Status</span>,
            cell: (info) => (
                <Typography
                    uppercase
                    variant={'badge'}
                    color={
                        info.row.original?.user?.status === UserStatus.Blocked
                            ? 'text-error'
                            : 'text-black'
                    }
                >
                    <span className="font-bold">
                        {info.row.original?.user?.status}
                    </span>
                </Typography>
            ),
        },
        {
            accessorKey: 'createdAt',
            header: () => <span>Created At</span>,
            cell: ({ row }) => (
                <UserCreatedAt createdAt={row.original?.createdAt} />
            ),
        },
        {
            header: () => 'Action',
            accessorKey: 'Action',
            cell: ({ row }) => {
                const tableActionOption = tableActionOptions(row.original)
                return (
                    <TableAction
                        options={tableActionOption}
                        rowItem={row.original}
                    />
                )
            },
        },
    ]

    const quickActionsElements = {
        id: 'id',
        individual: (id: StudentSubAdmin) => (
            <div className="flex gap-x-2">
                <ActionButton Icon={FaEdit}>Edit</ActionButton>
                <ActionButton>Sub Admins</ActionButton>
                <ActionButton Icon={MdBlock} variant="error">
                    Block
                </ActionButton>
            </div>
        ),
        common: (ids: StudentSubAdmin[]) => (
            <ActionButton Icon={MdBlock} variant="error">
                Block
            </ActionButton>
        ),
    }

    const ind = student?.data?.data?.map((s: any) => s?.industries?.[0]?.id)
    const abc = student?.data?.data?.filter((s: any) =>
        ind?.includes(Number(filter?.industryId))
    )
    const wp = student?.data?.data
        ?.map((s: any) => s?.workplace)
        ?.flat()
        ?.map((s: any) => s?.industries?.filter((s: any) => s?.applied))
        ?.flat()

    // const ddd = filter?.industryId
    //     ? abc && abc?.length > 0
    //         ? abc
    //         : student?.data.filter((item: any) => {
    //               // Check if any of the industries have an ID of 32
    //               return item.industries.some(
    //                   (industry: any) =>
    //                       industry.id === Number(filter?.industryId)
    //               )
    //           })
    //     : student?.data?.data

    return (
        <>
            {modal && modal}
            {passwordModal}
            <div className="flex flex-col gap-y-4 p-4">
                <PageHeading
                    title={'Filtered Students'}
                    subtitle={'List of Filtered Students'}
                />

                <Card noPadding>
                    {student?.isLoading || student.isFetching ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : student?.data?.data && student?.data?.data?.length ? (
                        <Table
                            columns={columns}
                            data={student?.data.data}
                            quickActions={quickActionsElements}
                            enableRowSelection
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
                                            {pageSize
                                                ? pageSize(
                                                      itemPerPage,
                                                      setItemPerPage,
                                                      student?.data?.data
                                                          ?.length
                                                  )
                                                : null}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination
                                                    ? pagination(
                                                          student?.data
                                                              ?.pagination,
                                                          setPage
                                                      )
                                                    : null}
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
                                        {student?.data?.data?.length > 10 && (
                                            <div className="p-6 mb-2 flex justify-between">
                                                {pageSize
                                                    ? pageSize(
                                                          itemPerPage,
                                                          setItemPerPage,
                                                          student?.data?.data
                                                              ?.length
                                                      )
                                                    : null}
                                                <div className="flex gap-x-2">
                                                    {quickActions}
                                                    {pagination
                                                        ? pagination(
                                                              student?.data
                                                                  ?.pagination,
                                                              setPage
                                                          )
                                                        : null}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )
                            }}
                        </Table>
                    ) : (
                        <EmptyData
                            title={'No Students in your Search!'}
                            description={'No Students in your Search yet'}
                            height={'50vh'}
                        />
                    )}
                </Card>
            </div>
        </>
    )
}
