import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// Icons
import { AiFillEye } from 'react-icons/ai'

// components
import {
  BackButton,
  Card,
  ReactTable,
  Typography,
  Button,
  // ActionDropDown,
} from 'components'
import { StudentsFilter } from './components'
import { RightSidebarData } from '../../components'

// query
import { useGetStudentsQuery } from '@queries'

// Context
import { useContextBar } from '@hooks'

// utils
import { ThemeColors, getAge } from '@utils'

// Filter
import { Filter } from '@hoc'

const Colors = ThemeColors

export const StudentList = () => {
  const router = useRouter()
  const { setContent } = useContextBar()
  const [queryFilters, setQueryFilters] = useState({})
  const [filterActionButton, setFilterActionButton] = useState(null)

  useEffect(() => {
    setContent(
      <>
        <RightSidebarData />
      </>
    )
  }, [setContent])
  //

  const TableActionOption = (id: string) => {
    const actions = [
      {
        text: 'View',
        Icon: AiFillEye,
        action: () => {
          router.push(`/portals/industry/students/${id}`)
        },
        color: Colors.secondary,
      },
    ]
    return actions
  }

  const Columns = [
    {
      Header: 'Student Name',
      accessor: 'name',
      Cell: ({ row }:any) => {
        const { name, email, image } = row.original.user
        return (
          <div className="flex items-center relative">
            <div className="flex items-center gap-x-2">
              <img
                className="rounded-full w-7 h-7"
                src={image || 'https://picsum.photos/400/400'}
                alt={name}
              />
              <div>
                <Typography color={'black'}> {name} </Typography>
                <Typography variant={'muted'} color={'gray'}>
                  {email}
                </Typography>
              </div>
            </div>
          </div>
        )
      },
    },
    {
      Header: 'Age',
      accessor: 'age',
      Cell: ({ row }:any) => {
        return getAge(row.original.dob)
      },
    },
    {
      Header: 'Phone',
      accessor: 'phone',
    },
    {
      Header: 'Location',
      accessor: 'location',
    },
    {
      Header: 'Action',
      accessor: 'Action',
      Cell: ({ row }:any) => {
        const action = TableActionOption(row.original.id)
        return 'More Action'
        // return <ActionDropDown title={'More'} dropDown={action} />
      },
    },
  ]

  const filterInitialValues = {
    name: '',
    email: '',
  }
  return (
    <div>
      <BackButton link={'Back To Students'} />
      <div className="flex justify-between items-center py-4">
        <div>
          <Typography variant={'title'}>All Students</Typography>
          <Typography variant={'muted'} color={'gray'}>
            You can find all Students here as well as requests
          </Typography>
        </div>
        <div className="flex items-center gap-x-2">
          {filterActionButton}
          <Button variant={'dark'}>Archived</Button>
        </div>
      </div>
      {/*  filters */}
      <div className="flex flex-col gap-y-4">
        <Filter
          component={StudentsFilter}
          setQueryFilters={setQueryFilters}
          setFilterAction={setFilterActionButton}
          filterInitialValues={filterInitialValues}
        />

        <ReactTable
          pagesize
          pagination
          Columns={Columns}
          action={useGetStudentsQuery}
          queryFilters={queryFilters}
        />
      </div>
    </div>
  )
}
