import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactElement,
} from 'react'

import { useActionModal, useContextBar } from '@hooks'
import { AdminApi, commonApi } from '@queries'
import {
    ActionButton,
    Badge,
    Button,
    Card,
    EmptyData,
    TableAction,
    TableSkeleton,
    TechnicalError,
    TruncatedTextWithTooltip,
    Typography,
} from '@components'
import { DepartmentListSkeleton } from '../skeletonLoader'
import { Rto, SubAdmin, User } from '@types'
import { useRouter } from 'next/router'

// Modals
import {
    BlockModal,
    ArchiveModal,
    AssociatedWithRTOModal,
    AllowPermissionModal,
} from '@partials/admin/sub-admin/modals'

import { AddSubAdminCB } from '@partials/admin/sub-admin/contextBar'
import { checkListLength, getUserCredentials } from '@utils'
import { FaEdit, FaEye } from 'react-icons/fa'
import { UserRoles } from '@constants'
import { PiCellSignalLowFill } from 'react-icons/pi'
import { RiLockPasswordFill } from 'react-icons/ri'
import { BsArchiveFill } from 'react-icons/bs'
import { ColumnDef } from '@tanstack/react-table'
import { RtoCell, SectorCell, SubAdminCell } from '@partials/admin/sub-admin'
import { RtoCellInfo } from '@partials/admin/rto/components'
import { ChangeHodModal, RemoveCoordinatorModal } from '../modal'

interface CoordinatorsList extends SubAdmin {
    subadmin: SubAdmin
}

interface ContextValuesProps {
    setPage: (page: number) => void
    itemPerPage: number
    setItemPerPage: (itemPerPage: number) => void
    setModal?: (modal: ReactElement | null) => void
    modal: ReactElement | null
    passwordModal: ReactElement | null
    quickActionsElements: any
    columns: ColumnDef<CoordinatorsList>[]
    data: any
    isLoading: boolean
    isFetching: boolean
    isError: boolean
}

const DepartmentCoordinatorsListContext =
    createContext<ContextValuesProps | null>(null)

export const useDepartmentCoordinatorsList = () => {
    const context = useContext(DepartmentCoordinatorsListContext)
    if (context === null || context === undefined) {
        throw new Error(
            'useDepartmentCoordinatorsList must be used within a DepartmentCoordinatorsListProvider'
        )
    }
    return context
}

export const DepartmentCoordinatorsListProvider = ({ children }: any) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const router = useRouter()

    const contextBar = useContextBar()

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(Number(router.query?.page || 1))
        setItemPerPage(Number(router.query?.pageSize || 50))
    }, [router])

    // hooks
    const { passwordModal, onViewPassword } = useActionModal()
    const { data, isError, isLoading, isFetching, refetch } =
        AdminApi.Department.useDeptCoordinatorsList(
            {
                id: router.query.id,
                params: {
                    skip: !router.query?.id
                        ? 0
                        : itemPerPage * page - itemPerPage,
                    limit: itemPerPage,
                },
            },
            {
                skip: !router.query.id,
                refetchOnMountOrArgChange: true,
            }
        )

    const [bulkAction, resultBulkAction] = commonApi.useBulkStatusMutation()

    const onModalCancelClicked = () => {
        setModal(null)
    }
    const onBlockedClicked = (subAdmin: SubAdmin) => {
        setModal(
            <BlockModal
                subAdmin={subAdmin}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }
    // const onMarkAsHODClicked = (subAdmin: any) => {
    //     setModal(
    //         <MarkAsHodModal item={subAdmin} onCancel={onModalCancelClicked} />
    //     )
    // }
    const onChangeHODClicked = (subAdmin: any) => {
        setModal(
            <ChangeHodModal item={subAdmin} onCancel={onModalCancelClicked} />
        )
    }
    const onRemoveCoordinator = (subAdmin: any) => {
        setModal(
            <RemoveCoordinatorModal
                item={subAdmin}
                onCancel={onModalCancelClicked}
            />
        )
    }
    const onArchivedClicked = (subAdmin: SubAdmin) => {
        setModal(
            <ArchiveModal
                item={subAdmin}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const onEditSubAdmin = (subAdmin: SubAdmin) => {
        contextBar.setContent(<AddSubAdminCB edit subAdmin={subAdmin} />)
        contextBar.setTitle('Edit SubAdmin')
        contextBar.show()
    }

    const onAssociatedWithRtoClicked = (subadminId: number, rtos: Rto[]) => {
        setModal(
            <AssociatedWithRTOModal
                rtos={rtos}
                subadminId={subadminId}
                onCancel={onModalCancelClicked}
            />
        )
    }
    const onAllowPermissionClicked = (subadmin: SubAdmin) => {
        setModal(
            <AllowPermissionModal
                subadmin={subadmin}
                onCancel={onModalCancelClicked}
            />
        )
    }
    const role = getUserCredentials()?.role

    const tableActionOptions = (subAdmin: any) => {
        return [
            {
                text: 'View',
                onClick: (subAdmin: any) => {
                    router.push(
                        `/portals/admin/sub-admin/${subAdmin?.id}?tab=notes`
                    )
                },
                Icon: FaEye,
            },
            {
                text: 'Edit',
                onClick: (subadmin: SubAdmin) => {
                    onEditSubAdmin(subadmin)
                },
                Icon: FaEdit,
            },
            // {
            //     ...(role === UserRoles.ADMIN
            //         ? {
            //               text: 'Permissions',
            //               onClick: (subAdmin: SubAdmin) =>
            //                   onAllowPermissionClicked(subAdmin),
            //               Icon: PiCellSignalLowFill,
            //           }
            //         : {}),
            // },
            {
                text: 'Permissions',
                onClick: (subAdmin: SubAdmin) =>
                    onAllowPermissionClicked(subAdmin),
                Icon: PiCellSignalLowFill,
            },
            {
                ...(role === UserRoles.ADMIN
                    ? {
                          text: 'View Password',
                          onClick: (subAdmin: SubAdmin) =>
                              onViewPassword(subAdmin),
                          Icon: RiLockPasswordFill,
                      }
                    : {}),
            },

            {
                ...(!subAdmin?.isHod
                    ? {
                          text: 'Remove Coordinator',
                          onClick: (subAdmin: SubAdmin) =>
                              onRemoveCoordinator(subAdmin),
                          Icon: BsArchiveFill,
                          color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
                      }
                    : {}),
            },
        ]
    }

    const hodColumn: any =
        role === UserRoles.ADMIN
            ? {
                  accessorKey: 'isHod',
                  header: () => <span>HOD</span>,
                  cell: (info: any) => {
                      return !info?.row?.original?.isHod ? (
                          <div className="whitespace-nowrap">
                              <Button
                                  text="Change HOD"
                                  variant="info"
                                  onClick={() => {
                                      onChangeHODClicked(info?.row?.original)
                                  }}
                              />
                          </div>
                      ) : (
                          info?.row?.original?.isHod && (
                              <Badge text="HOD" variant="success" />
                          )
                      )
                  },
              }
            : null // Render null if not admin

    const columns: ColumnDef<CoordinatorsList>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => {
                return <SubAdminCell subAdmin={info.row.original?.subadmin} />
            },
            header: () => <span>Sub Admin</span>,
        },
        {
            accessorKey: 'sector',
            header: () => <span>Sectors</span>,
            cell: (info) => (
                <SectorCell subAdmin={info.row.original?.subadmin} />
            ),
        },
        {
            accessorKey: 'rto',
            header: () => <span>RTOs</span>,
            cell: (info) => <RtoCell subAdmin={info.row.original?.subadmin} />,
        },
        {
            accessorKey: 'subadmin.studentCount',
            header: () => <span>Assigned Students</span>,
        },
        {
            accessorKey: 'addressLine1',
            header: () => <span>Address</span>,
            // cell: (info) => info.getValue(),
            cell: (info) => (
                <TruncatedTextWithTooltip
                    text={info?.row?.original?.subadmin?.addressLine1}
                />
            ),
        },
        {
            accessorKey: 'associated',
            header: () => <span>associated</span>,
            cell: (info: any) => {
                return (
                    <ActionButton
                        onClick={() => {
                            onAssociatedWithRtoClicked(
                                info?.row?.original?.subadmin?.id,
                                info?.row?.original?.subadmin?.rtos
                            )
                        }}
                    >
                        Associated With Rto
                    </ActionButton>
                )
            },
        },
        {
            accessorKey: 'createdBy.role',
            header: () => <span>Created By</span>,
            cell: (info) =>
                info.row.original?.createdBy?.role === UserRoles.RTO ? (
                    <>
                        <RtoCellInfo
                            rto={
                                {
                                    id: info.row.original?.subadmin?.createdBy
                                        ?.rto?.id,
                                    user: info.row.original?.subadmin
                                        ?.createdBy as User,
                                } as Rto
                            }
                            short
                        />
                        <Typography variant={'small'} uppercase>
                            <span className="font-semibold">
                                {info.row.original?.subadmin?.createdBy?.role}
                            </span>
                        </Typography>
                    </>
                ) : info.row.original?.subadmin?.createdBy?.role ===
                  UserRoles.SUBADMIN ? (
                    <>
                        <SubAdminCell
                            subAdmin={
                                {
                                    id: info.row.original?.subadmin?.createdBy
                                        ?.coordinator?.id,
                                    phone: info.row.original?.subadmin
                                        ?.createdBy?.coordinator?.phone,
                                    user: info.row.original?.subadmin
                                        ?.createdBy as User,
                                } as SubAdmin
                            }
                        />
                        <Typography variant={'small'} uppercase>
                            <span className="font-semibold">
                                {info.row.original?.subadmin?.createdBy?.role}
                            </span>
                        </Typography>
                    </>
                ) : (
                    <Typography variant={'small'} uppercase>
                        <span className="font-semibold">
                            {info.row.original?.subadmin?.createdBy?.role}
                        </span>
                    </Typography>
                ),
        },
        // ...(hodColumn ? [hodColumn] : []),
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info: any) => {
                const actions = tableActionOptions(info?.row?.original)
                const length = checkListLength<SubAdmin>(
                    data?.data as SubAdmin[]
                )
                return (
                    <TableAction
                        options={actions}
                        rowItem={info.row.original?.subadmin}
                        lastIndex={length.includes(info?.row?.index)}
                    />
                )
            },
        },
    ]

    const quickActionsElements = {
        id: 'id',
        individual: (id: SubAdmin) => (
            <div className="flex gap-x-2">
                <ActionButton variant="success" onClick={() => {}}>
                    Accept
                </ActionButton>
                <ActionButton variant="error" onClick={() => {}}>
                    Reject
                </ActionButton>
            </div>
        ),
        common: (ids: SubAdmin[]) => (
            <ActionButton
                onClick={() => {
                    const arrayOfIds = ids.map((id: any) => id?.user.id)
                    bulkAction({ ids: arrayOfIds, status: 'archived' })
                }}
                variant="error"
            >
                Archive
            </ActionButton>
        ),
    }

    const contextValues: ContextValuesProps = {
        modal,
        passwordModal,
        data,
        columns,
        quickActionsElements,
        itemPerPage,
        setItemPerPage,
        setPage,
        isLoading,
        isFetching,
        isError,
    }

    return (
        <DepartmentCoordinatorsListContext.Provider value={contextValues}>
            {children}
        </DepartmentCoordinatorsListContext.Provider>
    )
}
