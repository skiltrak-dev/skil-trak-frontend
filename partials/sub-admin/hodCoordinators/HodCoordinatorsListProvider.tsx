import React, {
    createContext,
    ReactElement,
    useContext,
    useEffect,
    useState,
} from 'react'

import {
    ActionButton,
    TableAction,
    TruncatedTextWithTooltip,
    Typography,
} from '@components'
import { useActionModal, useContextBar } from '@hooks'
import { commonApi, SubAdminApi } from '@queries'
import { AdminSubadminFilter, Rto, SubAdmin, User } from '@types'
import { useRouter } from 'next/router'

// Modals
import { UserRoles } from '@constants'
import { RtoCellInfo } from '@partials/admin/rto/components'
import { RtoCell, SectorCell, SubAdminCell } from '@partials/admin/sub-admin'
import { AddSubAdminCB } from '@partials/admin/sub-admin/contextBar'
import {
    AllowPermissionModal,
    ArchiveModal,
    AssociatedWithRTOModal,
    BlockModal,
} from '@partials/admin/sub-admin/modals'
import { ColumnDef } from '@tanstack/react-table'
import {
    checkFilteredDataLength,
    checkListLength,
    getUserCredentials,
} from '@utils'
import { FaEdit, FaEye } from 'react-icons/fa'
import { PiCellSignalLowFill } from 'react-icons/pi'
import { RiLockPasswordFill } from 'react-icons/ri'
import { HodCoordinatorCell } from './HodCoordinatorCell'

// interface CoordinatorsList extends SubAdmin {
//     subadmin: SubAdmin
// }

interface ContextValuesProps {
    setPage: (page: number) => void
    itemPerPage: number
    setItemPerPage: (itemPerPage: number) => void
    setModal?: (modal: ReactElement | null) => void
    modal: ReactElement | null
    passwordModal: ReactElement | null
    quickActionsElements: any
    columns: ColumnDef<SubAdmin>[]
    data: any
    // isLoading: boolean
    // isFetching: boolean
    // isSuccess: boolean
    // isError: boolean
    filter: AdminSubadminFilter
    setFilter: (filter: AdminSubadminFilter) => void
    filterAction: any
    setFilterAction: (filterAction: any) => void
    filteredDataLength: any
}

const DepartmentCoordinatorsListContext =
    createContext<ContextValuesProps | null>(null)

export const useHodCoordinatorsList = () => {
    const context = useContext(DepartmentCoordinatorsListContext)
    if (context === null || context === undefined) {
        throw new Error(
            'useHodCoordinatorsList must be used within a DepartmentCoordinatorsListProvider'
        )
    }
    return context
}

export const HodCoordinatorsListProvider = ({ children }: any) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const router = useRouter()

    const contextBar = useContextBar()

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const [filterAction, setFilterAction] = React.useState(null)
    const [filter, setFilter] = useState<AdminSubadminFilter>(
        {} as AdminSubadminFilter
    )
    useEffect(() => {
        setPage(Number(router.query?.page || 1))
        setItemPerPage(Number(router.query?.pageSize || 50))
    }, [router])

    // hooks
    const { passwordModal, onViewPassword } = useActionModal()
    const data = SubAdminApi.SubAdmin.useHodCoordinatorsList({
        search: `${JSON.stringify(filter)
            .replaceAll('{', '')
            .replaceAll('}', '')
            .replaceAll('"', '')
            .trim()}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

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
    // const onChangeHODClicked = (subAdmin: any) => {
    //     setModal(
    //         <ChangeHodModal item={subAdmin} onCancel={onModalCancelClicked} />
    //     )
    // }

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
                        `/portals/sub-admin/department/${subAdmin?.id}?tab=notes`
                    )
                },
                Icon: FaEye,
            },
            {
                ...(role === UserRoles.ADMIN
                    ? {
                          text: 'Permissions',
                          onClick: (subAdmin: SubAdmin) =>
                              onAllowPermissionClicked(subAdmin),
                          Icon: PiCellSignalLowFill,
                      }
                    : {}),
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
        ]
    }

    const columns: ColumnDef<SubAdmin>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => {
                return <HodCoordinatorCell subAdmin={info.row.original} />
            },
            header: () => <span>Sub Admin</span>,
        },
        {
            accessorKey: 'studentsCount',
            header: () => <span>Assigned Students</span>,
        },
        {
            accessorKey: 'sector',
            header: () => <span>Sectors</span>,
            cell: (info) => <SectorCell subAdmin={info.row.original} />,
        },
        {
            accessorKey: 'rto',
            header: () => <span>RTOs</span>,
            cell: (info) => <RtoCell subAdmin={info.row.original} />,
        },
        {
            accessorKey: 'addressLine1',
            header: () => <span>Address</span>,
            // cell: (info) => info.getValue(),
            cell: (info) => (
                <TruncatedTextWithTooltip
                    text={info?.row?.original?.addressLine1}
                />
            ),
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
                                    id: info.row.original?.createdBy?.rto?.id,
                                    user: info.row.original?.createdBy as User,
                                } as Rto
                            }
                            short
                        />
                        <Typography variant={'small'} uppercase>
                            <span className="font-semibold">
                                {info.row.original?.createdBy?.role}
                            </span>
                        </Typography>
                    </>
                ) : info.row.original?.createdBy?.role ===
                  UserRoles.SUBADMIN ? (
                    <>
                        <SubAdminCell
                            subAdmin={
                                {
                                    id: info.row.original?.createdBy
                                        ?.coordinator?.id,
                                    phone: info.row.original?.createdBy
                                        ?.coordinator?.phone,
                                    user: info.row.original?.createdBy as User,
                                } as SubAdmin
                            }
                        />
                        <Typography variant={'small'} uppercase>
                            <span className="font-semibold">
                                {info.row.original?.createdBy?.role}
                            </span>
                        </Typography>
                    </>
                ) : (
                    <Typography variant={'small'} uppercase>
                        <span className="font-semibold">
                            {info.row.original?.createdBy?.role}
                        </span>
                    </Typography>
                ),
        },
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
                        rowItem={info.row.original}
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

    const filteredDataLength = checkFilteredDataLength(filter)

    const contextValues: ContextValuesProps = {
        modal,
        passwordModal,
        data,
        columns,
        quickActionsElements,
        itemPerPage,
        setItemPerPage,
        setPage,
        filter,
        setFilter,
        filterAction,
        setFilterAction,
        filteredDataLength,
    }

    return (
        <DepartmentCoordinatorsListContext.Provider value={contextValues}>
            {children}
        </DepartmentCoordinatorsListContext.Provider>
    )
}
