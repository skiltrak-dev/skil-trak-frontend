import {
    ActionButton,
    Badge,
    Button,
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TableAction,
    TableActionOption,
    TableSkeleton,
    TruncatedTextWithTooltip,
    Typography,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaEye } from 'react-icons/fa'

import { useActionModal, useContextBar } from '@hooks'
import { Rto, SubAdmin, User } from '@types'
import { useRouter } from 'next/router'
import { MdBlock } from 'react-icons/md'

import { RiLockPasswordFill } from 'react-icons/ri'
import { UserRoles } from '@constants'
import { checkListLength, getUserCredentials } from '@utils'
import {
    AddSubAdminCB,
    ViewRtosCB,
    ViewSectorsCB,
} from '@partials/admin/sub-admin/contextBar'
import { RtoCell, SectorCell, SubAdminCell } from '@partials/admin/sub-admin'
import { RtoCellInfo } from '@partials/admin/rto/components'
import { ChangeHodModal } from '../modal/ChangeHodModal'
import { ReactElement, useState } from 'react'
import { useDepartmentCoordinatorsList } from '../hooks'

interface CoordinatorsList extends SubAdmin {
    subadmin: SubAdmin
}
export const FilterDepartmentCoordinators = ({
    subAdmin,
    setPage,
    itemPerPage,
    setItemPerPage,
}: {
    subAdmin: any
    setPage: any
    itemPerPage: any
    setItemPerPage: any
}) => {
    const { modal, passwordModal, columns, quickActionsElements } =
        useDepartmentCoordinatorsList()

    return (
        <>
            {modal && modal}
            {passwordModal && passwordModal}
            <div className="flex flex-col gap-y-4 p-4">
                {/* <PageHeading
                    title={'Filtered Sub Admins'}
                    subtitle={'List of Filtered Sub Admins'}
                /> */}

                <Card noPadding>
                    {subAdmin?.isLoading || subAdmin?.isFetching ? (
                        <TableSkeleton
                            arrayLength={subAdmin?.data?.length || 0}
                        />
                    ) : subAdmin?.data && subAdmin?.data?.length ? (
                        <Table
                            columns={columns}
                            data={subAdmin?.data}
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
                                                setItemPerPage
                                            )}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination(
                                                    subAdmin?.data?.pagination,
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
                        <EmptyData
                            title={'No Sub Admins in your Search!'}
                            description={'No Sub Admins in your Search yet'}
                            height={'50vh'}
                        />
                    )}
                </Card>
            </div>
        </>
    )
}
