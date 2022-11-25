import React, { ReactElement, useEffect, useState } from 'react'
import moment from 'moment'

// Icons
import { BsCheckCircleFill, BsFillCheckCircleFill } from 'react-icons/bs'
import { MdEdit } from 'react-icons/md'
import { AiFillDelete } from 'react-icons/ai'

// Components
import {
    TableAction,
    Card,
    ReactTable,
    Typography,
    ActionAlert,
    // Alerts,
    // DeleteActionPopup,
    // ActionDropDown,
    Popup,
} from 'components'
import { RightSidebarData, EmployeeDetailForm } from './components'

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
import { DeleteModal } from '@components/sections/industry/MyTasks/modals'

const Colors = ThemeColors

export const EmployeeSchedule = () => {
    // hooks
    const { setContent } = useContextBar()

    const { notification } = useNotification()

    const [modal, setModal] = useState<ReactElement | null>(null)
    const [employeeDetail, setEmployeeDetail] = useState<any | null>(null)

    // isSuccessed
    const [isSuccessed, setIsSuccessed] = useState(false)

    useEffect(() => {
        setContent(
            <>
                <RightSidebarData />
            </>
        )
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
        // {
        //     text: 'Edit',
        //     Icon: MdEdit,
        //     onClick: (employee: any) => {
        //         setEmployeeDetail({
        //             id: employee?.id,
        //             employee: [
        //                 {
        //                     firstName: employee?.firstName,
        //                     lastName: employee?.lastName,
        //                     mobileNo: employee?.mobileNo,
        //                     email: employee?.email,
        //                 },
        //             ],
        //             isEditing: true,
        //         })
        //     },
        // },
        {
            text: 'Delete',
            Icon: AiFillDelete,
            onClick: (employee: any) => onDeleteClicked(employee),
        },
    ]

    const Columns = [
        {
            Header: 'Name',
            accessor: 'name',
            sort: true,
            Cell: ({ row }: any) => {
                return `${row.original.firstName} ${row.original.lastName}`
            },
        },
        {
            Header: 'Type',
            accessor: 'type',
            disableFilters: true,
            Cell: () => {
                return `meeting`
            },
        },
        {
            Header: 'Date',
            accessor: 'createdAt',
            Cell: ({ row }: any) => {
                return moment(row.original.createdAt).format('DD-MM-yyyy')
            },
        },
        {
            Header: 'Time',
            accessor: 'time',
            disableFilters: true,
            Cell: ({ row }: any) => {
                return moment(row.original.createdAt).format('hh:mm a')
            },
        },
        {
            Header: 'Action',
            accessor: 'action',
            Cell: ({ row }: any) => {
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

            <ReactTable
                pagesize
                pagination
                Columns={Columns}
                querySort={'name'}
                action={useGetEmployeeQuery}
            />
        </div>
    )
}
