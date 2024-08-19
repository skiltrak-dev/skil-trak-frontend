import {
    Button,
    Card,
    EmptyData,
    InitialAvatar,
    LoadingAnimation,
    NoData,
    Table,
    TableAction,
    TableActionOption,
    TechnicalError,
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
import { Waypoint } from 'react-waypoint'

export const Supervisor = ({ industry }: { industry?: Industry }) => {
    const [isViewed, setIsViewed] = useState<boolean>(false)

    const [itemPerPage, setItemPerPage] = useState(10)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({})
    const [modal, setModal] = useState<ReactElement | null>(null)

    const contextBar = useContextBar()

    const supervisors = IndustryApi.Supervisor.useGetSupervisor(
        {
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
            industry: industry?.user?.id,
        },
        { skip: !isViewed }
    )

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
        <Waypoint
            onEnter={() => {
                setIsViewed(true)
            }}
        >
            <div className="">
                {modal}

                {/*  */}
                <Card fullHeight shadowType="profile" noPadding>
                    <div className="px-4 py-3 border-b border-secondary-dark flex justify-between items-center">
                        <Typography semibold>
                            <span className="text-[15px]">Supervisor</span>
                        </Typography>
                        <div id="add-admin">
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
                    </div>

                    <div className="max-h-80 overflow-auto custom-scrollbar">
                        {supervisors.isError ? (
                            <NoData simple text="There is technical issue!" />
                        ) : null}
                        {supervisors.isLoading ? (
                            <LoadingAnimation height="h-[60vh]" />
                        ) : supervisors.data &&
                          supervisors.data?.data?.length ? (
                            <Table
                                columns={columns}
                                data={supervisors.data?.data}
                            >
                                {({
                                    table,
                                    pagination,
                                    pageSize,
                                    quickActions,
                                }: any) => {
                                    return (
                                        <div>
                                            <div className="px-6 pt-3 pb-1 mb-2 flex justify-between">
                                                {pageSize(
                                                    itemPerPage,
                                                    setItemPerPage
                                                )}
                                                <div className="flex gap-x-2">
                                                    {quickActions}
                                                    {pagination(
                                                        supervisors.data
                                                            ?.pagination,
                                                        setPage
                                                    )}
                                                </div>
                                            </div>
                                            <div className="overflow-x-auto remove-scrollbar">
                                                <div className="px-6 w-full">
                                                    {table}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }}
                            </Table>
                        ) : (
                            <div className="text-center p-8">
                                <NoData
                                
                                    simple
                                    text="With SkilTrak's Supervisor feature, you can assign your industry's designated representative by providing their phone number, email, and contact details. Your appointed manager will act on behalf of your industry, ensuring seamless communication and collaboration with SkilTrak."
                                />
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </Waypoint>
    )
}
