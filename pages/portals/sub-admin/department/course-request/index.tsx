// useDepartmentCoursesRequestList
import {
    Button,
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TechnicalError,
    Typography,
} from '@components'
import { SubAdminLayout } from '@layouts'
import Modal from '@modals/Modal'
import {
    ApproveCourseModal,
    ApproveEditCourseModal,
    CourseRequestCard,
    RejectCourseModal,
    ViewCourseRequestDetailsModal,
} from '@partials/sub-admin'
import { SubAdminApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import { NextPageWithLayout } from '@types'
import { ellipsisText } from '@utils'
import { ReactElement, useState } from 'react'
import { FaRegDotCircle } from 'react-icons/fa'
import {
    EditCourseModal,
    EditIndustryCourseContent,
} from '@partials/common/IndustryProfileDetail/components/CourseManagement'
import { IoEyeOutline } from 'react-icons/io5'
import { Pencil } from 'lucide-react'
import { DataResponse } from 'redux/queryTypes'

export enum Status {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
}

const CourseRequest: NextPageWithLayout = () => {
    const [itemPerPage, setItemPerPage] = useState<any>(50)
    const [page, setPage] = useState(1)

    const { data, isError, isLoading } =
        SubAdminApi.SubAdmin.useDepartmentCoursesRequestList(
            {
                search: ``,
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            {
                refetchOnMountOrArgChange: true,
            }
        )

    const columns: ColumnDef<DataResponse>[] = [
        {
            accessorKey: 'industry.user',
            cell: (info) => {
                return (
                    <div>
                        <Typography variant="small">
                            {ellipsisText(
                                info?.row?.original?.industry?.user?.name,
                                15
                            )}
                        </Typography>
                    </div>
                )
            },
            header: () => <span>Industry</span>,
        },
        {
            accessorKey: 'addedBy',
            cell: (info) => {
                return (
                    <div>
                        <Typography variant="small">
                            {ellipsisText(
                                info?.row?.original?.addedBy?.name,
                                15
                            )}
                        </Typography>
                    </div>
                )
            },
            header: () => <span>Requested By</span>,
        },
        {
            accessorKey: 'course',
            cell: (info) => {
                return (
                    <div>
                        <Typography variant="small">
                            {info?.row.original?.course?.title ?? 'NA'} -{' '}
                            {info?.row.original?.course?.code ?? 'N/A'}
                        </Typography>
                    </div>
                )
            },
            header: () => <span>Course</span>,
        },
        {
            accessorKey: 'course.sector',
            cell: (info) => {
                return (
                    <div>
                        <Typography variant="small">
                            {info?.row.original?.course?.sector?.name ?? 'NA'} -{' '}
                            {info?.row.original?.course?.sector?.code ?? 'N/A'}
                        </Typography>
                    </div>
                )
            },
            header: () => <span>Sector</span>,
        },
        {
            accessorKey: 'description',
            cell: (info) => {
                return (
                    <div>
                        {info?.row?.original?.description !== null ||
                        info?.row?.original?.reference !== null ? (
                            <div className="flex items-center gap-x-2">
                                <Modal>
                                    <Modal.Open opens="approveCourseRequest">
                                        <Button
                                            variant="info"
                                            text="View"
                                            outline
                                        />
                                    </Modal.Open>
                                    <Modal.Window name="approveCourseRequest">
                                        <ViewCourseRequestDetailsModal
                                            description={
                                                info.row?.original?.description
                                            }
                                            reference={
                                                info.row?.original?.reference
                                            }
                                        />
                                    </Modal.Window>
                                </Modal>
                            </div>
                        ) : (
                            <Typography variant="small" color="text-red-400">
                                Not added yet
                            </Typography>
                        )}
                    </div>
                )
            },
            header: () => <span>Course Details</span>,
        },

        {
            accessorKey: 'status',
            cell: (info) => {
                return (
                    <div
                        className={`px-1.5 py-0.5 rounded-md border text-[10px] font-semibold text-center ${
                            info?.row.original?.status === Status.PENDING
                                ? 'bg-yellow-100 border-yellow-400 text-yellow-400'
                                : info?.row.original?.status === Status.APPROVED
                                ? 'bg-green-100 border-green-400 text-green-400'
                                : 'bg-red-100 border-red-400 text-red-400'
                        }`}
                    >
                        {info?.row.original?.status === Status.PENDING
                            ? 'PENDING'
                            : info?.row.original?.status === Status.APPROVED
                            ? 'APPROVED'
                            : 'REJECTED'}
                    </div>
                )
            },
            header: () => <span>Status</span>,
        },

        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info: any) => {
                return (
                    <div className="flex gap-x-1 items-center">
                        <Modal>
                            <Modal.Open opens="approveCourseRequest">
                                <Button
                                    disabled={
                                        info?.row?.original?.status !==
                                        Status.PENDING
                                    }
                                    variant="success"
                                    text="Approve"
                                />
                            </Modal.Open>
                            <Modal.Window name="approveCourseRequest">
                                <ApproveCourseModal
                                    request={info.row?.original}
                                />
                            </Modal.Window>
                        </Modal>
                        <Modal>
                            <Modal.Open opens="rejectCourseRequest">
                                <Button
                                    disabled={
                                        info?.row?.original?.status !==
                                        Status.PENDING
                                    }
                                    variant="error"
                                    text="Reject"
                                />
                            </Modal.Open>
                            <Modal.Window name="rejectCourseRequest">
                                <RejectCourseModal
                                    request={info?.row?.original}
                                />
                            </Modal.Window>
                        </Modal>
                    </div>
                )
            },
        },
    ]
    return (
        <div className="mb-5 ">
            <div className="pr-14 py-4 flex flex-col gap-y-2">
                <div className="mb-3">
                    <Typography variant="small" bold>
                        This page lists all course requests associated with your
                        department sectors. The requests may originate from two
                        scenarios:
                    </Typography>
                </div>
                <div className="flex gap-x-3">
                    <div>
                        <FaRegDotCircle className="text-red-400" />
                    </div>
                    <Typography variant="small">
                        New Industry Course Requests: These requests are from
                        courses submitted during the initial signup of a new
                        industry.
                    </Typography>
                </div>
                <div className="flex gap-x-3">
                    <div>
                        <FaRegDotCircle className="text-red-400" />
                    </div>
                    <Typography variant="small">
                        Existing Industry New Course Requests: These requests
                        are from courses recently added by a coordinator to an
                        existing industry under this sector.
                    </Typography>
                </div>
                <div className="flex gap-x-3">
                    <Typography variant="muted" color="text-red-400">
                        Note:
                    </Typography>
                    <Typography variant="muted" color="text-red-400">
                        Please review the courses carefully and approve or
                        reject them individually. Ensuring the accuracy of the
                        provided details is crucial for maintaining the quality
                        of industry partnerships.
                    </Typography>
                </div>
            </div>
            {isError && <TechnicalError />}
            <Card>
                {isLoading ? (
                    <LoadingAnimation />
                ) : data?.data && data?.data?.length ? (
                    <Table
                        columns={columns}
                        data={data?.data}
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
                                    <div className="px-6  overflow-auto remove-scrollbar">
                                        {table}
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
                            title="No Course Request"
                            description="No course request found yet"
                        />
                    )
                )}
            </Card>
        </div>
    )
}

CourseRequest.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'Courses Request List' }}>
            {page}
        </SubAdminLayout>
    )
}

export default CourseRequest
