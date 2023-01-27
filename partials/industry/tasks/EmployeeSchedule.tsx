import React, { ReactElement, useEffect, useState } from 'react'
import moment from 'moment'

// Icons
import { AiFillDelete } from 'react-icons/ai'

// Components
import {
    TableAction,
    Card,
    Typography,
    ActionAlert,
    Table,
    TechnicalError,
    EmptyData,
    LoadingAnimation,
    // Alerts,
    // DeleteActionPopup,
    // ActionDropDown,
} from 'components'
import { EmployeeDetailForm } from './form'

// Context
// import { EmployeeDataContext } from "context";

//redux
import {
    useRemoveEmployeeMutation,
    useGetEmployeeQuery,
    useAddEmployeeMutation,
} from '@queries'

// Context
import { useNotification, useContextBar } from 'hooks'

// Colors
import { ThemeColors } from '@utils'
import { DeleteModal } from './modals'
import { MdEdit } from 'react-icons/md'
import { EditEmployeeCB } from './contextBar'

const Colors = ThemeColors

export const EmployeeSchedule = () => {
    // hooks
    const { setContent, show } = useContextBar()

    const { notification } = useNotification()

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({})
    const [filterActionButton, setFilterActionButton] = useState(null)
    const [modal, setModal] = useState<ReactElement | null>(null)

    // query
    const { data, isLoading, isError } = useGetEmployeeQuery({
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    const [employeeDetail, setEmployeeDetail] = useState<any | null>(null)

    // isSuccessed
    const [isSuccessed, setIsSuccessed] = useState(false)

    useEffect(() => {
        setContent(null)
    }, [setContent])

    const onModalCancelClicked = () => {
        setModal(null)
    }

    const onDeleteClicked = (employee: any) => {
        setModal(
            <DeleteModal
                employee={employee}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const TableActionOption = [
        {
            text: 'Edit',
            Icon: MdEdit,
            onClick: (employee: any) => {
                setContent(<EditEmployeeCB values={employee} />)
                show()
            },
        },
        {
            text: 'Delete',
            Icon: AiFillDelete,
            onClick: (employee: any) => onDeleteClicked(employee),
        },
    ]

    const Columns = [
        {
            header: () => 'Name',
            accessorKey: 'name',
            sort: true,
            cell: ({ row }: any) => {
                return `${row.original.firstName} ${row.original.lastName}`
            },
        },
        {
            header: () => 'Type',
            accessorKey: 'type',
            disableFilters: true,
            cell: () => {
                return `meeting`
            },
        },
        {
            header: () => 'Date',
            accessorKey: 'createdAt',
            cell: ({ row }: any) => {
                return moment(row.original.createdAt).format('DD-MM-yyyy')
            },
        },
        {
            header: () => 'Time',
            accessorKey: 'time',
            disableFilters: true,
            cell: ({ row }: any) => {
                return moment(row.original.createdAt).format('hh:mm a')
            },
        },
        {
            header: () => 'Action',
            accessorKey: 'action',
            cell: ({ row }: any) => {
                return (
                    <TableAction
                        options={TableActionOption}
                        rowItem={row.original}
                    />
                )
            },
        },
    ]

    const onVolunteer = (values: any) => {
        // Console('values', values)
    }

    return (
        <div className="flex flex-col gap-y-5 my-5">
            {modal}

            {/*  */}
            <Card>
                {isSuccessed ? (
                    <ActionAlert
                        title={'Successfully Invited Employees'}
                        description={'Successfully Invited Employees'}
                    />
                ) : (
                    <>
                        <Typography variant={'subtitle'}>
                            Add your employees details
                        </Typography>
                        <EmployeeDetailForm
                            onVolunteer={onVolunteer}
                            employeeDetail={employeeDetail}
                        />
                    </>
                )}
            </Card>

            <Card noPadding>
                {isError && <TechnicalError />}
                {isLoading ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data.length ? (
                    <Table
                        columns={Columns}
                        data={data.data}
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
                                        {pageSize(itemPerPage, setItemPerPage)}
                                        <div className="flex gap-x-2">
                                            {quickActions}
                                            {pagination(
                                                data?.pagination,
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
                    !isError && (
                        <EmptyData
                            title={'No Employee Schedule!'}
                            description={'There is no any Employee Schedule!'}
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </div>
    )
}
