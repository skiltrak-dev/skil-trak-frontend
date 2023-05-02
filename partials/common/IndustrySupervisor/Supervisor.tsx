import {
    Button,
    Card,
    EmptyData,
    InitialAvatar,
    LoadingAnimation,
    Table,
    TableAction,
    TableActionOption,
    Typography,
} from '@components'
import { useContextBar } from '@hooks'
import { IndustryApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import React, { ReactElement, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { AddSupervisor } from './form'
import { Industry } from '@types'
import { DeleteModal } from './modal'

export const Supervisor = ({ industry }: { industry?: Industry }) => {
    const [itemPerPage, setItemPerPage] = useState(10)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({})
    const [modal, setModal] = useState<ReactElement | null>(null)

    const contextBar = useContextBar()

    const supervisors = IndustryApi.Supervisor.useGetSupervisor({
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
        industry: industry?.user?.id,
    })

    const onCancelClicked = () => {
        setModal(null)
    }

    const onEditSupervisor = (supervisor: Industry) => {
        contextBar.setTitle('Edit Supervisor')
        contextBar.show()
        contextBar.setContent(
            <AddSupervisor
                initialValues={supervisor}
                industry={industry}
                edit
            />
        )
    }

    const onDeleteClicked = (supervisor: any) => {
        setModal(
            <DeleteModal onCancel={onCancelClicked} supervisor={supervisor} />
        )
    }

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'Edit',
            onClick: (supervisor: any) => {
                onEditSupervisor(supervisor)
            },
            Icon: FaEdit,
        },
        {
            text: 'Delete',
            onClick: async (supervisor: any) => {
                onDeleteClicked(supervisor)
            },
            Icon: FaTrash,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
    ]

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'name',
            cell: (info) => (
                <div className="flex items-center gap-x-1">
                    {info.row.original?.name && (
                        <InitialAvatar name={info.row.original?.name} />
                    )}
                    <Typography variant={'label'}>
                        {info.row.original.name}
                    </Typography>
                </div>
            ),
            header: () => <span>Name</span>,
        },
        {
            accessorKey: 'email',
            header: () => <span>Email</span>,
            cell: (info) => info.getValue(),
        },

        {
            accessorKey: 'phone',
            header: () => <span>Phone Number</span>,
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info: any) => {
                return (
                    <div className="flex gap-x-1 items-center">
                        <TableAction
                            options={tableActionOptions}
                            rowItem={info.row.original}
                        />
                    </div>
                )
            },
        },
    ]
    return (
        <div className="mb-10">
            {modal}
            <div id="add-admin" className="flex justify-end mb-2">
                <Button
                    text={'+ Add Supervisor'}
                    onClick={() => {
                        contextBar.setTitle('Add Supervisor')
                        contextBar.show()
                        contextBar.setContent(
                            <AddSupervisor industry={industry} />
                        )
                    }}
                />
            </div>

            {/*  */}
            <Card noPadding>
                {supervisors.isLoading ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : supervisors.data && supervisors.data?.data?.length ? (
                    <Table columns={columns} data={supervisors.data?.data}>
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
                                                supervisors.data?.pagination,
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
                        title={'No Contact Persons!'}
                        description={'You have no contact persons yet'}
                        height={'50vh'}
                    />
                )}
            </Card>
        </div>
    )
}
