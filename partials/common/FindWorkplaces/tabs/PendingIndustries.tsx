// import {
//     Card,
//     EmptyData,
//     LoadingAnimation,
//     Table,
//     TechnicalError,
// } from '@components'
// import { PageHeading } from '@components/headings'

// import { SubAdminApi } from '@queries'
// import { useRouter } from 'next/router'
// import { useEffect, useState } from 'react'

// // hooks
// import { useColumns } from '../hooks'

// export const PendingIndustries = ({
//     onSetIndustryData,
// }: {
//     onSetIndustryData: (val: any) => void
// }) => {
//     const router = useRouter()
//     const [itemPerPage, setItemPerPage] = useState(50)
//     const [page, setPage] = useState(1)

//     useEffect(() => {
//         setPage(Number(router.query.page || 1))
//         setItemPerPage(Number(router.query.pageSize || 50))
//     }, [router])

//     const { isLoading, data, isError } =
//         SubAdminApi.SubAdmin.useDepartmentPendingIndustries(
//             {
//                 search: '',
//                 skip: itemPerPage * page - itemPerPage,
//                 limit: itemPerPage,
//             },
//             {
//                 refetchOnMountOrArgChange: true,
//             }
//         )

//     const notContactedMoreThan7Days = data?.paginatedResults?.data?.filter(
//         (industry: any) => {
//             const created = new Date(industry?.createdAt)
//             const currentDate = new Date()
//             const timeDiff = currentDate.getTime() - created.getTime()
//             const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
//             return industry?.status === 'favourite' && daysDiff >= 7
//         }
//     )

//     const { columns, modal, actionsModal, quickActionsElements } = useColumns({
//         data,
//         onSetIndustryData,
//         isPending: true,
//     })

//     return (
//         <>
//             {modal}
//             {actionsModal}
//             <div className="flex flex-col gap-y-4 mb-32">
//                 <PageHeading
//                     title={'All Industries'}
//                     subtitle={'List of all Industries'}
//                 ></PageHeading>

//                 <Card noPadding>
//                     {isError && <TechnicalError />}
//                     {isLoading ? (
//                         <LoadingAnimation height="h-[60vh]" />
//                     ) : data?.paginatedResults?.data &&
//                       data?.paginatedResults?.data?.length ? (
//                         <Table
//                             columns={columns as any}
//                             data={data?.paginatedResults?.data}
//                             quickActions={quickActionsElements}
//                             enableRowSelection
//                             findCallLogsUnanswered={notContactedMoreThan7Days}
//                         >
//                             {({
//                                 table,
//                                 pagination,
//                                 pageSize,
//                                 quickActions,
//                             }: any) => (
//                                 <div>
//                                     <div className="p-6 mb-2 flex justify-between">
//                                         {pageSize(
//                                             itemPerPage,
//                                             setItemPerPage,
//                                             data?.paginatedResults?.data?.length
//                                         )}
//                                         <div className="flex gap-x-2">
//                                             {quickActions}
//                                             {pagination(
//                                                 data?.paginatedResults
//                                                     ?.pagination,
//                                                 setPage
//                                             )}
//                                         </div>
//                                     </div>
//                                     <div className=" overflow-x-scroll remove-scrollbar">
//                                         <div className="px-6 w-full">
//                                             {table}
//                                         </div>
//                                     </div>
//                                     {data?.paginatedResults?.data?.length >
//                                         10 && (
//                                         <div className="px-6 py-2 mb-2 flex justify-between">
//                                             {pageSize(
//                                                 itemPerPage,
//                                                 setItemPerPage,
//                                                 data?.paginatedResults?.data
//                                                     ?.length
//                                             )}
//                                             <div className="flex gap-x-2">
//                                                 {quickActions}
//                                                 {pagination(
//                                                     data?.paginatedResults
//                                                         ?.pagination,
//                                                     setPage
//                                                 )}
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             )}
//                         </Table>
//                     ) : (
//                         !isError && (
//                             <EmptyData
//                                 title={'No All Industry!'}
//                                 description={
//                                     'You have not all any Industry request yet'
//                                 }
//                                 height={'50vh'}
//                             />
//                         )
//                     )}
//                 </Card>
//             </div>
//         </>
//     )
// }

import {
    ActionButton,
    Button,
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TableAction,
    TableActionOption,
    TechnicalError,
    TruncatedTextWithTooltip,
    Typography,
    UserCreatedAt,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaEye, FaFileExport } from 'react-icons/fa'

import { UserRoles } from '@constants'
import { useActionModal, useNotification } from '@hooks'
import { AdminApi, SubAdminApi } from '@queries'
import { Industry, PendingIndustry, UserStatus } from '@types'
import { getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { RiLockPasswordFill } from 'react-icons/ri'
import {
    CourseDot,
    IndustryCell,
    SectorCell,
} from '@partials/admin/industry/components'
import {
    ApproveIndustryWithQuestionsModal,
    MultiAcceptModal,
    MultiRejectModal,
} from '@partials/admin/industry/modals'
import { useChangeStatus } from '@partials/admin/industry/hooks'
import { AcceptModal, RejectModal, ViewIndustryReviewAnswers } from '../modal'
import { CoursesCell } from '@partials/rto/coordinators'
import Modal from '@modals/Modal'

export const PendingIndustries = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const router = useRouter()
    const role = getUserCredentials()?.role
    const { notification } = useNotification()

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    // hooks
    const { passwordModal, onViewPassword } = useActionModal()

    const { isLoading, data, isError } =
        SubAdminApi.SubAdmin.useDepartmentPendingIndustries({
            // search: `status:${UserStatus.Pending}`,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        })

    const { changeStatusResult } = useChangeStatus()
    const onModalCancelClicked = () => {
        setModal(null)
    }

    const onAcceptClicked = (industry: Industry) => {
        setModal(
            <AcceptModal
                industry={industry}
                onCancel={() => onModalCancelClicked()}
            />
        )
        // setModal(
        //     <ApproveIndustryWithQuestionsModal
        //         industry={industry}
        //         onCancel={() => onModalCancelClicked()}
        //     />
        // )
    }

    const onRejectClicked = (industry: Industry) => {
        setModal(
            <RejectModal
                industry={industry}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const onMultiAcceptClicked = (industries: Industry[]) => {
        setModal(
            <MultiAcceptModal
                industries={industries}
                onCancel={() => {
                    onModalCancelClicked()
                }}
            />
        )
    }

    const onMultiRejectClicked = (industries: Industry[]) => {
        setModal(
            <MultiRejectModal
                industries={industries}
                onCancel={() => {
                    onModalCancelClicked()
                }}
            />
        )
    }

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (industry: any) => {
                router.push(`/portals/admin/industry/${industry.id}`)
            },
            Icon: FaEye,
        },
        {
            text: 'Old Profile',
            onClick: (industry: any) =>
                router.push(
                    `/portals/admin/industry/${industry?.id}/detail?tab=students`
                ),
            Icon: FaEye,
        },
        {
            ...(role === UserRoles.ADMIN
                ? {
                      text: 'View Password',
                      onClick: (industry: Industry) => onViewPassword(industry),
                      Icon: RiLockPasswordFill,
                  }
                : {}),
        },
        {
            text: 'Edit',
            onClick: (row: any) => {
                router.push(`/portals/admin/industry/edit-industry/${row.id}`)
            },
            Icon: FaEdit,
        },
    ]

    const columns: ColumnDef<PendingIndustry>[] = [
        {
            accessorKey: 'industry.user',
            cell: (info) => {
                return <IndustryCell industry={info?.row?.original?.industry} />
            },
            header: () => <span>Industry</span>,
        },
        {
            accessorKey: 'industry.abn',
            header: () => <span>ABN</span>,
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'contactPerson',
            header: () => <span>Contact Person</span>,
            cell: (info) => {
                return (
                    <div>
                        <p>{info.row.original?.industry?.contactPerson}</p>
                        <p className="text-xs text-gray-500">
                            {info.row.original.industry?.contactPersonNumber}
                        </p>
                    </div>
                )
            },
        },
        {
            accessorKey: 'courses',
            header: () => <span>Courses</span>,
            cell: (info) => {
                return (
                    <div className="flex gap-x-1">
                        {info?.row?.original?.courses?.map((c: any) => (
                            <CourseDot key={c?.id} course={c} />
                        ))}
                    </div>
                )
            },
        },
        {
            accessorKey: 'sector',
            header: () => <span>Sector</span>,
            cell: (info) => {
                return (
                    <div className="flex items-center gap-x-1">
                        <Typography variant={'muted'}>
                            {info?.row?.original?.sector?.name ?? 'NA'}
                        </Typography>{' '}
                        -{' '}
                        <Typography variant={'muted'}>
                            {info?.row?.original?.sector?.code}
                        </Typography>
                    </div>
                )
            },
        },
        {
            accessorKey: 'addressLine1',
            header: () => <span>Address</span>,
            cell: (info) => (
                <TruncatedTextWithTooltip
                    text={`${
                        info?.row?.original?.industry?.addressLine1
                    },${' '} 
            ${info?.row?.original?.industry?.suburb}`}
                />
            ),
        },
        {
            accessorKey: 'channel',
            header: () => <span>Created By</span>,
            cell: (info) => (
                <div>
                    {info.row.original?.industry?.createdBy !== null ? (
                        <p>{info?.row?.original?.industry?.createdBy?.name}</p>
                    ) : (
                        <p>{info?.row?.original?.industry?.channel}</p>
                    )}
                </div>
            ),
        },
        {
            accessorKey: 'createdAt',
            header: () => <span>Created At</span>,
            cell: (info) => (
                <UserCreatedAt
                    createdAt={info.row.original?.industry?.createdAt}
                />
            ),
        },
        {
            accessorKey: 'industry.approvalReviewQuestions',
            header: () => <span>Industry Answer </span>,
            cell: (info) => (
                <Modal>
                    <Modal.Open opens="viewIndustryAnswers">
                        <Button variant="info" text="VIEW" outline />
                    </Modal.Open>
                    <Modal.Window name="viewIndustryAnswers">
                        <ViewIndustryReviewAnswers
                            industryQuestions={
                                info?.row?.original?.industry
                                    ?.approvalReviewQuestion
                            }
                        />
                    </Modal.Window>
                </Modal>
            ),
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info: any) => {
                return (
                    <div className="flex gap-x-2 items-center">
                        <ActionButton
                            variant="success"
                            onClick={() => onAcceptClicked(info.row?.original)}
                            loading={changeStatusResult.isLoading}
                            disabled={changeStatusResult.isLoading}
                        >
                            Accept
                        </ActionButton>
                        <ActionButton
                            variant="error"
                            onClick={() => onRejectClicked(info.row?.original)}
                            loading={changeStatusResult.isLoading}
                            disabled={changeStatusResult.isLoading}
                        >
                            Reject
                        </ActionButton>

                        {/* <TableAction
                            options={tableActionOptions}
                            rowItem={info.row.original?.industry}
                        /> */}
                    </div>
                )
            },
        },
    ]

    const quickActionsElements = {
        id: 'id',
        individual: (id: Industry) => (
            <div className="flex gap-x-2">
                <ActionButton variant="success" onClick={() => {}}>
                    Accept
                </ActionButton>
                <ActionButton variant="error" onClick={() => {}}>
                    Reject
                </ActionButton>
            </div>
        ),
        common: (industries: Industry[]) => (
            <div className="flex gap-x-2">
                <ActionButton
                    onClick={() => {
                        onMultiAcceptClicked(industries)
                    }}
                    variant="success"
                >
                    Accept
                </ActionButton>
                <ActionButton
                    onClick={() => {
                        onMultiRejectClicked(industries)
                        // const arrayOfIds = ids.map((id: any) => id?.user.id)
                        // bulkAction({ ids: arrayOfIds, status: 'rejected' })
                    }}
                    variant="error"
                >
                    Reject
                </ActionButton>
            </div>
        ),
    }

    return (
        <>
            {modal && modal}
            {passwordModal && passwordModal}

            <div className="flex flex-col gap-y-4 mb-32">
                <PageHeading
                    title={'Pending Industries'}
                    subtitle={'List of Pending Industries'}
                >
                    {data && data?.data.length ? (
                        <>
                            <Button
                                text="Export"
                                variant="action"
                                Icon={FaFileExport}
                            />
                        </>
                    ) : null}
                </PageHeading>

                <Card noPadding>
                    {isError && <TechnicalError />}
                    {isLoading ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data && data?.data?.length ? (
                        <Table
                            columns={columns}
                            data={data?.data}
                            quickActions={quickActionsElements}
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
                                        <div className="px-6">{table}</div>
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
                                title={'No Pending Industry!'}
                                description={'You have no pending Industry'}
                                height={'50vh'}
                            />
                        )
                    )}
                </Card>
            </div>
        </>
    )
}
