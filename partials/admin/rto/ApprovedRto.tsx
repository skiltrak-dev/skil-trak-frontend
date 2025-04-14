import {
    ActionButton,
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TableAction,
    TechnicalError,
    TruncatedTextWithTooltip,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import {
    FaBook,
    FaEdit,
    FaEye,
    FaFileInvoiceDollar,
    FaHourglassHalf,
} from 'react-icons/fa'

import { UserRoles } from '@constants'
import { useActionModal, useContextBar, useModal } from '@hooks'
import { AdminApi, commonApi } from '@queries'
import { Rto, UserStatus } from '@types'
import { checkListLength, getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { MdBlock, MdIncompleteCircle, MdOutlineUpdate } from 'react-icons/md'
import { RtoCellInfo, SectorCell } from './components'
import { ViewSubAdminsCB } from './contextBar'
import { AdminRtoModalType, getAdminRtoModal } from './modals'

export const ApprovedRto = () => {
    const router = useRouter()

    // const [modal, setModal] = useState<ReactElement | null>(null)

    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(50)

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    // hooks
    const { modal, openModal, closeModal } = useModal()

    const handleOpenModal = (type: AdminRtoModalType, rto: Rto) => {
        openModal(getAdminRtoModal(type, rto, closeModal))
    }
    const { passwordModal, onViewPassword } = useActionModal()

    const { isLoading, isFetching, data, isError } = AdminApi.Rtos.useListQuery(
        {
            search: `status:${UserStatus.Approved}`,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        },
        {
            refetchOnMountOrArgChange: true,
        }
    )

    const [bulkAction, resultBulkAction] = commonApi.useBulkStatusMutation()

    const contextBar = useContextBar()
    const onViewSubAdminsClicked = (rto: Rto) => {
        contextBar.setTitle('Sub Admins')
        contextBar.setContent(<ViewSubAdminsCB rto={rto} />)
        contextBar.show()
    }

    const role = getUserCredentials()?.role

    const tableActionOptions = (rto: Rto) => [
        {
            text: 'View',
            onClick: (rto: any) => {
                router.push(`/portals/admin/rto/${rto.id}?tab=sectors`)
            },
            Icon: FaEye,
        },
        {
            text: 'New Profile',
            onClick: (rto: any) => {
                router.push(`/portals/admin/rto/${rto.id}/detail`)
            },
            Icon: FaEye,
        },
        {
            text: 'Edit',
            onClick: (rto: Rto) => {
                router.push(`/portals/admin/rto/${rto.id}/edit-profile`)
            },
            Icon: FaEdit,
        },
        {
            ...(role === UserRoles.ADMIN
                ? {
                      text: 'View Password',
                      onClick: (rto: Rto) => onViewPassword(rto),
                      Icon: FaEdit,
                  }
                : {}),
        },
        {
            ...(role === UserRoles.ADMIN
                ? {
                      text: rto?.autoReleaseLogBook
                          ? 'Remove Logbook'
                          : 'Allow Logbook',
                      onClick: (rto: Rto) =>
                          handleOpenModal(
                              AdminRtoModalType.RELEASE_LOG_BOOK,
                              rto
                          ),
                      Icon: FaBook,
                      color: rto?.autoReleaseLogBook
                          ? 'bg-error-light text-error-dark'
                          : '',
                  }
                : {}),
        },
        {
            ...(role === UserRoles.ADMIN
                ? {
                      text: 'Invoice Permission',
                      onClick: (rto: Rto) =>
                          handleOpenModal(
                              AdminRtoModalType.ALLOW_INVOICING,
                              rto
                          ),
                      Icon: FaFileInvoiceDollar,
                  }
                : {}),
        },
        {
            ...(role === UserRoles.ADMIN
                ? {
                      text: rto?.allowUpdate
                          ? 'Remove Updation'
                          : `Allow Updation`,
                      onClick: (rto: Rto) =>
                          handleOpenModal(
                              AdminRtoModalType.ALLOW_UPDATION,
                              rto
                          ),
                      Icon: MdOutlineUpdate,
                  }
                : {}),
        },
        {
            ...(role === UserRoles.ADMIN
                ? {
                      text: rto?.allowAutoComplete
                          ? 'Remove Auto Complete'
                          : `Allow Auto Complete`,
                      onClick: (rto: Rto) =>
                          handleOpenModal(
                              AdminRtoModalType.ALLOW_AUTO_COMPLETE,
                              rto
                          ),
                      Icon: MdIncompleteCircle,
                  }
                : {}),
        },
        {
            ...(role === UserRoles.ADMIN
                ? {
                      text: 'Allow Partial Submission',
                      onClick: (rto: Rto) =>
                          handleOpenModal(
                              AdminRtoModalType.ALLOW_PARTIAL_SUBMISSION,
                              rto
                          ),
                      Icon: FaHourglassHalf,
                  }
                : {}),
        },
        {
            ...(role === UserRoles.ADMIN
                ? {
                      text: 'Permissions',
                      onClick: (rto: Rto) =>
                          handleOpenModal(
                              AdminRtoModalType.ALLOW_PERMISSIONS,
                              rto
                          ),
                      Icon: MdIncompleteCircle,
                  }
                : {}),
        },
        {
            text: 'Sub Admins',
            onClick: (item: any) => onViewSubAdminsClicked(item),
            Icon: FaEdit,
        },
        {
            text: 'Archive',
            onClick: (rto: Rto) =>
                handleOpenModal(AdminRtoModalType.ARCHIVE, rto),
            Icon: MdBlock,
            color: 'text-primary hover:bg-primary-light hover:border-primary-dark',
        },
        {
            text: 'Block',
            onClick: (rto: Rto) =>
                handleOpenModal(AdminRtoModalType.BLOCK, rto),
            Icon: MdBlock,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
    ]

    const columns: ColumnDef<Rto>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => <RtoCellInfo rto={info.row.original} />,
            header: () => <span>Name</span>,
        },
        {
            accessorKey: 'rtoCode',
            header: () => <span>Code</span>,
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'students',
            header: () => <span>Students</span>,
            cell: (info) => info?.row?.original?.students,
        },
        {
            accessorKey: 'sectors',
            header: () => <span>Sectors</span>,
            cell: (info) => <SectorCell rto={info.row.original} />,
        },
        {
            accessorKey: 'suburb',
            header: () => <span>Address</span>,
            cell: (info) => (
                <TruncatedTextWithTooltip
                    text={info?.row?.original?.addressLine1}
                />
            ),
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: ({ row }: any) => {
                const tableActionOption = tableActionOptions(row.original)
                return (
                    <div className="flex gap-x-1 items-center">
                        <TableAction
                            options={tableActionOption}
                            rowItem={row.original}
                            lastIndex={checkListLength<Rto>(
                                data?.data as Rto[]
                            )?.includes(row?.index)}
                        />
                    </div>
                )
            },
        },
    ]

    const quickActionsElements = {
        id: 'id',
        individual: (item: Rto) => (
            <div className="flex gap-x-2">
                <ActionButton Icon={FaEdit}>Edit</ActionButton>
                <ActionButton>Sub Admins</ActionButton>
                <ActionButton
                    Icon={MdBlock}
                    variant="error"
                    onClick={() =>
                        handleOpenModal(AdminRtoModalType.BLOCK, item)
                    }
                >
                    Block
                </ActionButton>
            </div>
        ),
        common: (items: Rto[]) => (
            <ActionButton
                onClick={() => {
                    const arrayOfIds = items?.map((id: any) => id?.user.id)
                    const rtos: any = arrayOfIds
                    // onBlockClicked(items)
                    // onBulkBlockClicked(arrayOfIds)
                    handleOpenModal(AdminRtoModalType.BULK_BLOCK, rtos)
                    // bulkAction({ ids: arrayOfIds, status: 'blocked' })
                }}
                Icon={MdBlock}
                variant="error"
            >
                Block
            </ActionButton>
        ),
    }

    return (
        <>
            {modal && modal}
            {passwordModal && passwordModal}
            <div className="flex flex-col gap-y-4 mb-32">
                <PageHeading
                    title={'Approved RTOs'}
                    subtitle={'List of Approved RTOs'}
                >
                    {/* <Button
                        text="Export"
                        variant="action"
                        Icon={FaFileExport}
                    /> */}
                </PageHeading>

                <Card noPadding>
                    {isError && <TechnicalError />}
                    {isLoading || isFetching ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data && data?.data.length ? (
                        <Table<Rto>
                            columns={columns}
                            data={data.data}
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
                                                data.data.length
                                            )}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination(
                                                    data?.pagination,
                                                    setPage
                                                )}
                                            </div>
                                        </div>
                                        <div className="px-6 w-full overflow-x-scroll remove-scrollbar">
                                            {table}
                                        </div>
                                    </div>
                                )
                            }}
                        </Table>
                    ) : (
                        !isError && (
                            <EmptyData
                                title={'No Approved RTO!'}
                                description={
                                    'You have not approved any RTO request yet'
                                }
                                height={'50vh'}
                            />
                        )
                    )}
                </Card>
            </div>
        </>
    )
}
