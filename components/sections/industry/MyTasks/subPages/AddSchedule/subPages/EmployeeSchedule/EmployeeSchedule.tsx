import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment'

// Icons
import { BsCheckCircleFill, BsFillCheckCircleFill } from 'react-icons/bs'
import { MdEdit } from 'react-icons/md'
import { AiFillDelete } from 'react-icons/ai'

// Components
import {
  Action,
  Card,
  ReactTable,
  Typography,
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

const Colors = ThemeColors

export const EmployeeSchedule = () => {
  // hooks
  const { setContent } = useContextBar()

  const { notification } = useNotification()

  //

  // add Employee
  const [addEmployee, addEmployeeData] = useAddEmployeeMutation()

  //remove employee
  let [employeeRemove, employeeRemoveData] = useRemoveEmployeeMutation()

  // isSuccessed
  const [isSuccessed, setIsSuccessed] = useState(false)

  useEffect(() => {
    setContent(
      <>
        <RightSidebarData />
      </>
    )
  }, [setContent])

  //employee remove alert
  useEffect(() => {
    if (employeeRemoveData.isSuccess) {
      notification.error({
        title: 'Your Employee Deleted Successfully',
        description: 'Some description for notification',
        secondaryAction: {
          text: 'Undo',
          onClick: () => {
            alert('This will undo the Employee')
          },
        },
      })
    }
  }, [employeeRemoveData.isSuccess])

  const deleteEmployee = async (id) => {
    setRemoveEmployee({
      isRemove: false,
      id: '',
    })
    await employeeRemove(id)
  }

  // for Delete Popup
  const [removeEmployee, setRemoveEmployee] = useState({
    isRemove: false,
    id: '',
  })
  const TableActionOption = (row) => {
    const actions = [
      {
        text: 'Edit',
        Icon: MdEdit,
        action: () => {
          //   setEmployeeData({
          //     id: row.original?.id,
          //     employee: [
          //       {
          //         firstName: row.original?.firstName,
          //         lastName: row.original?.lastName,
          //         mobileNo: row.original?.mobileNo,
          //         email: row.original?.email,
          //       },
          //     ],
          //     isEditing: true,
          //   })
        },
      },
      {
        text: 'Delete',
        style: 'error',
        Icon: AiFillDelete,
        color: Colors.error,
        action: () =>
          setRemoveEmployee({
            isRemove: true,
            id: row.original.id,
          }),
      },
    ]
    return actions
  }

  const Columns = [
    {
      Header: 'Name',
      accessor: 'name',
      sort: true,
      Cell: ({ row }) => {
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
      Cell: ({ row }) => {
        return moment(row.original.createdAt).format('DD-MM-yyyy')
      },
    },
    {
      Header: 'Time',
      accessor: 'time',
      disableFilters: true,
      Cell: ({ row }) => {
        return moment(row.original.createdAt).format('hh:mm a')
      },
    },
    {
      Header: 'Action',
      accessor: 'ABCD',
      Cell: ({ row }) => {
        const Action = TableActionOption(row)
        return 'More Action'
        // return <ActionDropDown dropDown={Action} />
      },
    },
  ]

  const onVolunteer = (values) => {
    // Console('values', values)
  }

  return (
    <div className="flex flex-col gap-y-5 my-5">
      {/* Showing Alert on Any Action */}

      {/* {employeeUpdated && (
        // <Alerts
          title={'Employee Updated'}
          description={'Click here to view'}
          color={'info'}
          Icon={BsCheckCircleFill}
        />
      )} */}
      {/*  */}
      <Card>
        {isSuccessed ? (
          <Action
            Icon={BsFillCheckCircleFill}
            title={'Successfully Invited Employees'}
            iconsColor={'success'}
          />
        ) : (
          <>
            <Typography variant={'subtitle'}>
              Add your employees details
            </Typography>
            <EmployeeDetailForm
              onVolunteer={onVolunteer}
              addEmployee={addEmployee}
              addEmployeeData={addEmployeeData}
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

      {/* delete popup */}
      {/* {removeEmployee.isRemove && (
        <DeleteActionPopup
          title={'Employee Data'}
          description={
            'Your Employee Data will be deleted permanently. Do you want to continue'
          }
          onCancel={() =>
            setRemoveEmployee({
              isRemove: false,
              id: '',
            })
          }
          onConfirm={() => {
            deleteEmployee(removeEmployee.id)
          }}
        />
      )} */}
      {/* showing Popup when employee delete is in progress */}
      {/* {employeeRemoveData.isLoading && (
        <div className="fixed top-1/2 left-1/2 w-465 -translate-x-1/2 -translate-y-1/2">
          <Popup
            title={'Deleting Employee'}
            subtitle={'Please wait for a moment'}
          />
        </div>
      )} */}
    </div>
  )
}
