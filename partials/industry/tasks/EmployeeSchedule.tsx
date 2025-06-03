import moment from 'moment'
import { ReactElement, useEffect, useState } from 'react'

// Icons
import { AiFillDelete } from 'react-icons/ai'

// Components
import {
    ActionAlert,
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TableAction,
    TableChildrenProps,
    TechnicalError,
    Typography,
} from '@components'
import { EmployeeDetailForm } from './form'

//redux
import { useGetEmployeeQuery } from '@queries'

// Context
import { useContextBar } from '@hooks'

// Colors
import { MdEdit } from 'react-icons/md'
import { EditEmployeeCB } from './contextBar'
import { DeleteModal } from './modals'

export const EmployeeSchedule = () => {
    // hooks
    const { setContent, show } = useContextBar()

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
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
            header: () => 'Email',
            accessorKey: 'email',
            sort: true,
            cell: ({ row }: any) => {
                return `${row?.original?.email}`
            },
        },

        {
            header: () => 'Date',
            accessorKey: 'createdAt',
            cell: ({ row }: any) => {
                return moment(row.original.createdAt).format(
                    'DD-MM-yyyy [at] hh:mm a'
                )
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

    const onVolunteer = (values: any) => {}

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
                ) : data?.data && data?.data?.length ? (
                    <Table
                        columns={Columns}
                        data={data?.data}
                        // quickActions={quickActionsElements}
                        enableRowSelection
                    >
                        {({
                            quickActions,
                            pageSize,
                            pagination,
                            table,
                        }: TableChildrenProps) => {
                            return (
                                <div>
                                    <div className="p-6 mb-2 flex justify-between">
                                        {pageSize
                                            ? pageSize(
                                                  itemPerPage,
                                                  setItemPerPage,
                                                  data?.data?.length
                                              )
                                            : null}
                                        <div className="flex gap-x-2">
                                            {quickActions}
                                            {pagination
                                                ? pagination(
                                                      data?.pagination,
                                                      setPage
                                                  )
                                                : null}
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
