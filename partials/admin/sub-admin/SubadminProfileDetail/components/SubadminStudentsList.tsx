import {
    CaseOfficerAssignedStudent,
    EmptyData,
    GlobalModal,
    LoadingAnimation,
    Table,
    TableAction,
    TechnicalError,
    Typography,
} from '@components'
import { UserRoles } from '@constants'
import { AdminApi, SubAdminApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import { Student } from '@types'
import { getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { FaEye, FaTimes } from 'react-icons/fa'

import { EditTimer } from '@components/StudentTimer/EditTimer'
import { RtoCellInfo } from '@partials/admin/rto/components'
import { StudentCellInfo } from '@partials/admin/student/components'
import { ChangeStudentStatusModal } from '@partials/sub-admin/students/modals'
import moment from 'moment'

export const SubadminStudentsList = ({
    onCancel,
}: {
    onCancel: () => void
}) => {
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [modal, setModal] = useState<ReactElement | null>(null)

    const role = getUserCredentials()?.role

    const router = useRouter()

    const subadmin = SubAdminApi.SubAdmin.useProfile(undefined, {
        skip: !UserRoles.SUBADMIN,
    })
    const { isLoading, isSuccess, data, isError } =
        AdminApi.SubAdmins.subadminExtendedStudents(
            {
                limit: itemPerPage,
                id: Number(router?.query?.id),
                skip: itemPerPage * page - itemPerPage,
            },
            { skip: !router?.query?.id, refetchOnMountOrArgChange: true }
        )

    const tableActionOptions = (student: Student) => {
        return [
            {
                text: 'View',
                onClick: (student: Student) =>
                    router.push(`portals/admin/student/${student.id}/detail`),
                Icon: FaEye,
            },
        ]
    }

    const columns: ColumnDef<Student>[] = [
        {
            accessorKey: 'student',
            cell: (info) => (
                <StudentCellInfo student={info?.row?.original} call />
            ),
            header: () => <span>Student</span>,
        },
        {
            accessorKey: 'rto',
            header: () => <span>RTO</span>,
            cell: (info) => (
                <RtoCellInfo rto={info?.row?.original?.rto} short />
            ),
        },
        {
            accessorKey: 'days',
            header: () => <span>Days</span>,
            cell: (info) => {
                const today = moment()
                const compareDate = moment(
                    info?.row?.original?.workplace?.[0]?.createdAt
                )
                return today.diff(compareDate, 'days')
            },
        },
        {
            accessorKey: 'currentStatus',
            header: () => <span>Status</span>,
            cell: ({ row }) => (
                <Typography variant="small" uppercase>
                    {row?.original?.workplace?.[0]?.currentStatus}
                </Typography>
            ),
        },
        {
            accessorKey: 'createdAt',
            header: () => <span>Created At</span>,
            cell: (info) => {
                return (
                    <>
                        <Typography variant={'small'} color={'text-gray-600'}>
                            <span className="font-semibold whitespace-pre">
                                {moment(info?.row?.original?.createdAt).format(
                                    'Do MMM YYYY'
                                )}
                            </span>
                        </Typography>
                        <Typography variant={'small'} color={'text-gray-600'}>
                            <span className="font-semibold whitespace-pre">
                                {moment(info?.row?.original?.createdAt).format(
                                    'hh:mm:ss a'
                                )}
                            </span>
                        </Typography>
                    </>
                )
            },
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info) => {
                const tableActionOption = tableActionOptions(
                    info?.row?.original
                )
                return (
                    <div className="flex gap-x-1 items-center">
                        <TableAction
                            options={tableActionOption}
                            rowItem={info?.row?.original}
                        />
                    </div>
                )
            },
        },
    ]

    return (
        <GlobalModal>
            <div className="w-full lg:min-w-[650px] px-4 py-3.5 flex justify-between items-center border-b border-secondary-dark">
                <Typography variant="label" semibold>
                    Extended Workplace Requests
                </Typography>
                <FaTimes
                    onClick={onCancel}
                    className="transition-all duration-500 text-2xl cursor-pointer hover:rotate-90"
                />
            </div>

            <div className="flex flex-col gap-y-4">
                {isError && <TechnicalError />}
                {isLoading ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data?.data && data?.data.length && isSuccess ? (
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
                                    <div className="h-[60vh] custom-scrollbar px-6 overflow-auto custom-scrollbar">
                                        {table}
                                    </div>
                                    {data?.data?.length > 10 && (
                                        <div className="p-6 flex justify-between">
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
                    isSuccess && (
                        <EmptyData
                            title={'No Extended Students!'}
                            description={'You have not any Student yet'}
                            height={'50vh'}
                        />
                    )
                )}
            </div>
        </GlobalModal>
    )
}
